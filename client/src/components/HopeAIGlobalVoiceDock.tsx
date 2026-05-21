import { trpc } from '@/lib/trpc';
import { Brain, CheckCircle2, Compass, Loader2, Mic, MicOff, ShieldCheck, Sparkles, X, Zap } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { useLocation } from 'wouter';

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
  intent:
    | 'navigate'
    | 'trade_prepare'
    | 'tip_prepare'
    | 'market_scan'
    | 'portfolio_summary'
    | 'payment_prepare'
    | 'explain'
    | 'beginner_mode'
    | 'hands_free_mode'
    | 'workflow_guide'
    | 'mission_plan'
    | 'command_chain'
    | 'proactive_suggest'
    | 'unknown';
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
    currency?: string;
    confidence?: number;
    topic?: string;
    mode?: 'beginner' | 'pro' | 'guardian';
    actionLabel?: string;
    safetyLevel?: 'safe' | 'confirm' | 'blocked';
    goal?: string;
    missionId?: string;
    chainCommands?: string[];
    plannedStepCount?: number;
  };
  requiresConfirmation: boolean;
  spokenResponse: string;
  displayTitle?: string;
  displayCards?: Array<{ title: string; body: string; action?: string; path?: string }>;
};

type TimelineEntry = {
  role: 'user' | 'hope' | 'system';
  text: string;
};

const QUICK_COMMANDS = ['Hope beginner mode', 'Plan my ICO launch', 'Plan charity casino safeguards', 'Open wallet', 'Scan Bitcoin', 'Open compliance'];

function getSpeechRecognition() {
  if (typeof window === 'undefined') return null;
  const browserWindow = window as typeof window & {
    SpeechRecognition?: new () => BrowserSpeechRecognition;
    webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
  };
  return browserWindow.SpeechRecognition ?? browserWindow.webkitSpeechRecognition ?? null;
}

function speak(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.96;
  utterance.pitch = 1.02;
  window.speechSynthesis.speak(utterance);
}

export default function HopeAIGlobalVoiceDock() {
  const [, setLocation] = useLocation();
  const [open, setOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [input, setInput] = useState('');
  const [pendingCommand, setPendingCommand] = useState<ParsedCommand | null>(null);
  const [lastResponse, setLastResponse] = useState('Hope AI is ready anywhere in the dashboard. Say open wallet, scan Bitcoin, teach me trading, or beginner mode.');
  const [timeline, setTimeline] = useState<TimelineEntry[]>([
    { role: 'hope', text: 'Global Hope AI voice is online with safe confirmation gates.' },
  ]);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);

  const parseVoice = trpc.hopeAi.parseVoice.useMutation();
  const executeCommand = trpc.hopeAi.executeCommand.useMutation();
  const catalog = trpc.hopeAi.actionCatalog.useQuery(undefined, { staleTime: 1000 * 60 * 10 });

  const supported = useMemo(() => Boolean(getSpeechRecognition()), []);
  const isBusy = parseVoice.isPending || executeCommand.isPending;

  const addTimeline = (entry: TimelineEntry) => {
    setTimeline((current) => [entry, ...current].slice(0, 8));
  };

  const handleExecutionResult = (result: any, fallback?: ParsedCommand) => {
    const response = result?.spokenResponse ?? fallback?.spokenResponse ?? 'Hope AI handled that command.';
    const path = result?.path ?? fallback?.payload?.path;
    setLastResponse(response);
    addTimeline({ role: 'hope', text: response });
    speak(response);
    if (path) setLocation(path);
  };

  const executeParsed = async (parsed: ParsedCommand, confirmed = false) => {
    const result = await executeCommand.mutateAsync({
      intent: parsed.intent,
      payload: parsed.payload,
      confirmed,
      displayCards: parsed.displayCards ?? [],
    });
    handleExecutionResult(result, parsed);
    if (confirmed) setPendingCommand(null);
  };

  const processCommand = async (command: string) => {
    const trimmed = command.trim();
    if (!trimmed || isBusy) return;
    setOpen(true);
    setInput('');
    addTimeline({ role: 'user', text: trimmed });

    const confirmIntent = /^confirm\b/i.test(trimmed);
    if (confirmIntent && pendingCommand) {
      await executeParsed(pendingCommand, true);
      return;
    }

    try {
      const parsed = await parseVoice.mutateAsync({ transcript: trimmed });
      setLastResponse(parsed.spokenResponse);
      addTimeline({ role: 'hope', text: parsed.spokenResponse });
      speak(parsed.spokenResponse);

      if (parsed.requiresConfirmation) {
        setPendingCommand(parsed);
        return;
      }

      await executeParsed(parsed, false);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Hope AI could not process that command yet.';
      setLastResponse(message);
      addTimeline({ role: 'system', text: message });
      speak('I could not complete that command. Try beginner mode or open the Hope AI page.');
    }
  };

  const startListening = () => {
    if (!supported || isListening) return;
    const Recognition = getSpeechRecognition();
    if (!Recognition) return;
    const recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: BrowserSpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? '')
        .join(' ')
        .trim();
      if (transcript) void processCommand(transcript);
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3">
      {open && (
        <section className="w-[min(26rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-cyan-300/25 bg-slate-950/95 text-white shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
          <div className="border-b border-white/10 bg-gradient-to-r from-cyan-500/15 via-fuchsia-500/10 to-blue-500/15 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-cyan-100">
                  <Sparkles className="h-4 w-4" /> Hope AI global voice
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-300">Hands-free beginner mode for navigation, mission planning, command chains, scans, and safe action preparation.</p>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full border border-white/10 p-2 text-slate-300 hover:bg-white/10 hover:text-white" aria-label="Close Hope AI voice dock">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4 p-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">
                <ShieldCheck className="h-4 w-4" /> Safe response
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-200">{lastResponse}</p>
              {pendingCommand && (
                <div className="mt-3 rounded-xl border border-amber-300/30 bg-amber-400/10 p-3 text-xs text-amber-100">
                  Pending confirmation: {pendingCommand.payload.actionLabel ?? pendingCommand.intent}. Say or type <strong>confirm</strong> only if the details are correct.
                </div>
              )}
            </div>

            <form
              className="flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                void processCommand(input);
              }}
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask Hope to open, scan, teach, prepare, or confirm..."
                className="min-h-11 flex-1 rounded-xl border border-white/10 bg-slate-900 px-3 text-sm text-white outline-none focus:border-cyan-300"
              />
              <button disabled={isBusy || !input.trim()} className="rounded-xl bg-cyan-400 px-4 text-sm font-bold text-slate-950 disabled:opacity-50">
                {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Go'}
              </button>
            </form>

            <div className="flex flex-wrap gap-2">
              {QUICK_COMMANDS.map((command) => (
                <button key={command} onClick={() => void processCommand(command)} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-200 hover:border-cyan-300/60 hover:text-cyan-100">
                  {command}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {(catalog.data ?? []).slice(0, 6).map((item) => (
                <button key={item.id} onClick={() => setLocation(item.path)} className="rounded-xl border border-white/10 bg-slate-900/80 p-3 text-left hover:border-cyan-300/50">
                  <div className="font-semibold text-white">{item.label}</div>
                  <div className="mt-1 line-clamp-2 text-slate-400">{item.beginnerTip}</div>
                </button>
              ))}
            </div>

            <div className="max-h-40 space-y-2 overflow-auto pr-1">
              {timeline.map((entry, index) => (
                <div key={`${entry.role}-${index}-${entry.text}`} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs">
                  <div className="mb-1 flex items-center gap-1 uppercase tracking-[0.18em] text-slate-500">
                    {entry.role === 'hope' ? <Brain className="h-3 w-3" /> : entry.role === 'user' ? <Mic className="h-3 w-3" /> : <Compass className="h-3 w-3" />}
                    {entry.role}
                  </div>
                  <p className="leading-5 text-slate-200">{entry.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="flex items-center gap-2">
        {pendingCommand && (
          <button onClick={() => void executeParsed(pendingCommand, true)} className="hidden rounded-full border border-emerald-300/30 bg-emerald-400 px-4 py-3 text-sm font-bold text-emerald-950 shadow-lg shadow-emerald-950/30 sm:flex">
            <CheckCircle2 className="mr-2 h-4 w-4" /> Confirm Hope action
          </button>
        )}
        <button
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border border-cyan-300/30 bg-slate-950 px-4 py-3 text-sm font-bold text-cyan-100 shadow-2xl shadow-cyan-950/40 hover:bg-slate-900"
        >
          <Zap className="mr-2 inline h-4 w-4" /> Hope AI
        </button>
        <button
          onClick={isListening ? stopListening : startListening}
          disabled={!supported || isBusy}
          className={`rounded-full p-4 shadow-2xl transition ${isListening ? 'bg-red-500 text-white shadow-red-950/40' : 'bg-cyan-400 text-slate-950 shadow-cyan-950/40 hover:bg-cyan-300'} disabled:cursor-not-allowed disabled:opacity-50`}
          aria-label={isListening ? 'Stop Hope AI voice listening' : 'Start Hope AI voice listening'}
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
