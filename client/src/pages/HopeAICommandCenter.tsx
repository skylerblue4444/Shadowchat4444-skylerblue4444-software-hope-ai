import React, { useMemo, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { Mic, MicOff, Navigation, ShieldCheck, Sparkles, TrendingUp, WalletCards } from 'lucide-react';
import { trpc } from '@/lib/trpc';

type BrowserSpeechRecognitionEvent = {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
};

type BrowserSpeechRecognition = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  onresult: ((event: BrowserSpeechRecognitionEvent) => void) | null;
  start: () => void;
  stop: () => void;
};

type ParsedCommand = {
  intent: 'navigate' | 'trade_prepare' | 'tip_prepare' | 'market_scan' | 'portfolio_summary' | 'payment_prepare' | 'unknown';
  payload: {
    raw: string;
    path?: string;
    symbol?: string;
    side?: 'buy' | 'sell';
    amount?: string;
    price?: string;
    recipientId?: number;
    tipAmount?: number;
    message?: string;
  };
  requiresConfirmation: boolean;
  spokenResponse: string;
};

function speak(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.96;
  utterance.pitch = 1.02;
  window.speechSynthesis.speak(utterance);
}

function getSpeechRecognition() {
  if (typeof window === 'undefined') return null;
  const browserWindow = window as typeof window & {
    SpeechRecognition?: new () => BrowserSpeechRecognition;
    webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
  };
  return browserWindow.SpeechRecognition ?? browserWindow.webkitSpeechRecognition ?? null;
}

export default function HopeAICommandCenter() {
  const [, setLocation] = useLocation();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lastResponse, setLastResponse] = useState('Hope AI is ready. Say: Hope, scan Bitcoin, open trading, buy one SKY, or tip user 2 five.');
  const [pendingCommand, setPendingCommand] = useState<ParsedCommand | null>(null);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);

  const parseVoice = trpc.hopeAi.parseVoice.useMutation();
  const executeCommand = trpc.hopeAi.executeCommand.useMutation();
  const generateSignal = trpc.aiFeed.generateSignal.useMutation();
  const signals = trpc.aiFeed.latest.useQuery({ limit: 5 });
  const financeSummary = trpc.finance.summary.useQuery();
  const commands = trpc.hopeAi.recentCommands.useQuery({ limit: 5 });

  const supported = useMemo(() => Boolean(getSpeechRecognition()), []);

  const processCommand = async (spokenText: string) => {
    const normalized = spokenText.trim();
    if (!normalized) return;
    setTranscript(normalized);

    const lowered = normalized.toLowerCase();
    if (pendingCommand && /\b(confirm|yes|execute|send it|place it)\b/.test(lowered)) {
      const result = await executeCommand.mutateAsync({
        intent: pendingCommand.intent,
        payload: pendingCommand.payload,
        confirmed: true,
      });
      const response = result.spokenResponse ?? 'Confirmed.';
      setLastResponse(response);
      speak(response);
      setPendingCommand(null);
      if ('path' in result && result.path) setLocation(result.path);
      await Promise.all([signals.refetch(), commands.refetch(), financeSummary.refetch()]);
      return;
    }

    const parsed = await parseVoice.mutateAsync({ transcript: normalized });
    setLastResponse(parsed.spokenResponse);
    speak(parsed.spokenResponse);

    if (parsed.requiresConfirmation) {
      setPendingCommand(parsed);
      return;
    }

    const result = await executeCommand.mutateAsync({ intent: parsed.intent, payload: parsed.payload, confirmed: false });
    if ('path' in result && result.path) setLocation(result.path);
    if (parsed.intent === 'market_scan' && parsed.payload.symbol) {
      await generateSignal.mutateAsync({ symbol: parsed.payload.symbol, timeframe: 'intraday' });
      await signals.refetch();
    }
  };

  const startListening = () => {
    const Recognition = getSpeechRecognition();
    if (!Recognition) {
      const response = 'Voice recognition is not supported in this browser. You can type commands instead.';
      setLastResponse(response);
      speak(response);
      return;
    }

    const recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => {
      setIsListening(false);
      const response = 'I could not hear clearly. Please try again.';
      setLastResponse(response);
      speak(response);
    };
    recognition.onresult = (event: BrowserSpeechRecognitionEvent) => {
      const spoken = Array.from(event.results)
        .map((result) => Array.from(result)[0]?.transcript ?? '')
        .join(' ');
      void processCommand(spoken);
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const handleTypedCommand = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const command = String(form.get('command') ?? '');
    event.currentTarget.reset();
    await processCommand(command);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <section className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/30 p-6 md:p-8 shadow-2xl shadow-cyan-950/30">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200">
                <Sparkles className="h-4 w-4" /> Hope AI Voice Upgrade
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">Hands-free trading, tipping, navigation, and money management.</h1>
              <p className="max-w-3xl text-slate-300 leading-7">
                Speak naturally to Hope AI. Safe actions such as navigation execute immediately, while trade and tip commands are staged first and require spoken confirmation before the backend records anything.
              </p>
            </div>
            <button
              onClick={isListening ? stopListening : startListening}
              className={`flex h-28 w-28 items-center justify-center rounded-full border text-white transition ${isListening ? 'border-red-300 bg-red-500/30 shadow-lg shadow-red-500/30' : 'border-cyan-300 bg-cyan-500/20 shadow-lg shadow-cyan-500/20'}`}
            >
              {isListening ? <MicOff className="h-12 w-12" /> : <Mic className="h-12 w-12" />}
            </button>
          </div>
          {!supported && <p className="mt-4 rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-100">Browser speech recognition is unavailable here. Typed commands still work.</p>}
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-2 text-cyan-200"><Navigation className="h-5 w-5" /> Last transcript</div>
            <p className="mt-3 min-h-16 text-lg font-semibold">{transcript || 'Say a command or type below.'}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 lg:col-span-2">
            <div className="flex items-center gap-2 text-emerald-200"><ShieldCheck className="h-5 w-5" /> Hope response</div>
            <p className="mt-3 min-h-16 text-lg text-slate-200">{lastResponse}</p>
            {pendingCommand && (
              <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-500/10 p-4 text-amber-100">
                Pending confirmation for <strong>{pendingCommand.intent.replace('_', ' ')}</strong>. Say or type <strong>confirm</strong> to continue.
              </div>
            )}
          </div>
        </section>

        <form onSubmit={handleTypedCommand} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4 md:flex-row">
          <input
            name="command"
            placeholder="Type a command, e.g. Hope scan Bitcoin, open marketplace, buy 2 SKY at 1.25, tip user 2 five"
            className="min-h-12 flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 text-slate-100 outline-none focus:border-cyan-300"
          />
          <button className="rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 hover:bg-cyan-300">Send to Hope</button>
        </form>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-2 text-emerald-200"><WalletCards className="h-5 w-5" /> Money snapshot</div>
            <div className="mt-4 space-y-2 text-sm text-slate-300">
              <p>Net worth: <strong className="text-white">${financeSummary.data?.netWorth?.toLocaleString?.() ?? '0'}</strong></p>
              <p>Assets: <strong className="text-white">${financeSummary.data?.totalAssets?.toLocaleString?.() ?? '0'}</strong></p>
              <p>Cash flow: <strong className="text-white">${financeSummary.data?.monthlyCashFlow?.toLocaleString?.() ?? '0'}</strong></p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 lg:col-span-2">
            <div className="flex items-center gap-2 text-fuchsia-200"><TrendingUp className="h-5 w-5" /> Latest informational signals</div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {signals.data?.map((signal: any, index: number) => (
                <div key={`${signal.symbol}-${signal.createdAt ?? index}`} className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
                  <div className="flex items-center justify-between">
                    <strong>{signal.symbol}</strong>
                    <span className="rounded-full bg-cyan-400/10 px-2 py-1 text-xs uppercase text-cyan-200">{signal.action}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">Confidence {signal.confidence}% · Risk {signal.riskLevel}</p>
                  <p className="mt-2 line-clamp-3 text-xs text-slate-400">{signal.rationale}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-xl font-bold">Recent Hope AI commands</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-400"><tr><th className="py-2">Intent</th><th>Transcript</th><th>Status</th></tr></thead>
              <tbody>
                {commands.data?.map((command: any) => (
                  <tr key={command.id} className="border-t border-white/10"><td className="py-2">{command.intent}</td><td>{command.transcript}</td><td>{command.status}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
