import React, { useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";
import {
  Brain,
  Compass,
  Lightbulb,
  Mic,
  MicOff,
  Navigation,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  WalletCards,
  Wand2,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

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

type DisplayCard = {
  title: string;
  body: string;
  action?: string;
  path?: string;
};

type ParsedCommand = {
  intent:
    | "navigate"
    | "trade_prepare"
    | "tip_prepare"
    | "market_scan"
    | "portfolio_summary"
    | "payment_prepare"
    | "explain"
    | "beginner_mode"
    | "hands_free_mode"
    | "workflow_guide"
    | "mission_plan"
    | "command_chain"
    | "proactive_suggest"
    | "unknown";
  payload: {
    raw: string;
    path?: string;
    symbol?: string;
    side?: "buy" | "sell";
    amount?: string;
    price?: string;
    recipientId?: number;
    tipAmount?: number;
    message?: string;
    currency?: string;
    confidence?: number;
    topic?: string;
    mode?: "beginner" | "pro" | "guardian";
    actionLabel?: string;
    safetyLevel?: "safe" | "confirm" | "blocked";
    goal?: string;
    missionId?: string;
    chainCommands?: string[];
    plannedStepCount?: number;
  };
  requiresConfirmation: boolean;
  spokenResponse: string;
  displayTitle?: string;
  displayCards?: DisplayCard[];
};

type AssistantMode = "beginner" | "pro" | "guardian";

type MissionStep = {
  id: string;
  title: string;
  description: string;
  intent: ParsedCommand["intent"];
  path?: string;
  safetyLevel: "safe" | "confirm" | "blocked";
  requiresConfirmation: boolean;
  voicePrompt: string;
  status: "queued" | "ready" | "needs_confirmation";
};

type MissionPlan = {
  id: string;
  goal: string;
  summary: string;
  mode: AssistantMode;
  estimatedMinutes: number;
  safetyNotice: string;
  steps: MissionStep[];
  suggestedVoiceCommands: string[];
};

type ProactiveSuggestion = {
  id: string;
  title: string;
  body: string;
  command: string;
  path?: string;
  priority: "low" | "medium" | "high";
  safetyLevel: "safe" | "confirm" | "blocked";
};

type TimelineEvent = {
  role: "user" | "hope";
  text: string;
  detail?: string;
};

const QUICK_COMMANDS = [
  "Hope beginner mode",
  "What can I do?",
  "Make it hands free",
  "Scan Bitcoin",
  "Teach me trading",
  "Open wallet",
  "Summarize my money",
  "Open marketplace",
  "Plan my ICO launch",
  "Plan charity casino safeguards",
  "Plan a money mission for Bitcoin",
  "Open compliance",
];

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.94;
  utterance.pitch = 1.04;
  window.speechSynthesis.speak(utterance);
}

function getSpeechRecognition() {
  if (typeof window === "undefined") return null;
  const browserWindow = window as typeof window & {
    SpeechRecognition?: new () => BrowserSpeechRecognition;
    webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
  };
  return (
    browserWindow.SpeechRecognition ??
    browserWindow.webkitSpeechRecognition ??
    null
  );
}

function modeLabel(mode: AssistantMode) {
  if (mode === "beginner") return "Beginner mode";
  if (mode === "pro") return "Pro mode";
  return "Guardian mode";
}

function modeDescription(mode: AssistantMode) {
  if (mode === "beginner")
    return "Simple words, starter actions, and step-by-step coaching.";
  if (mode === "pro") return "Faster command handling for experienced users.";
  return "Hands-free control with confirmation gates for money and trading actions.";
}

export default function HopeAICommandCenter() {
  const [, setLocation] = useLocation();
  const [isListening, setIsListening] = useState(false);
  const [autoListen, setAutoListen] = useState(false);
  const [autonomousMode, setAutonomousMode] = useState(false);
  const [assistantMode, setAssistantMode] = useState<AssistantMode>("guardian");
  const [transcript, setTranscript] = useState("");
  const [lastResponse, setLastResponse] = useState(
    "Hope AI is ready. Say: Hope beginner mode, what can I do, scan Bitcoin, open wallet, or teach me trading."
  );
  const [pendingCommand, setPendingCommand] = useState<ParsedCommand | null>(
    null
  );
  const [displayCards, setDisplayCards] = useState<DisplayCard[]>([
    {
      title: "Start hands-free",
      body: "Tap the mic and speak naturally. Hope AI can navigate, explain, scan markets, prepare trades, and prepare tips.",
      action: "Try: Hope beginner mode",
      path: "/dashboard/hope-ai",
    },
    {
      title: "Beginner safe mode",
      body: "Hope uses simple language and asks for confirmation before any money, trade, payment, or account-impacting record.",
      action: "Try: What can I do?",
      path: "/dashboard/hope-ai",
    },
  ]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([
    {
      role: "hope",
      text: "Hope AI online.",
      detail: "Voice-first command center with safe execution gates.",
    },
  ]);
  const [missionBoard, setMissionBoard] = useState<MissionPlan | null>(null);
  const [suggestionCards, setSuggestionCards] = useState<ProactiveSuggestion[]>(
    []
  );
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);

  const parseVoice = trpc.hopeAi.parseVoice.useMutation();
  const executeCommand = trpc.hopeAi.executeCommand.useMutation();
  const generateSignal = trpc.aiFeed.generateSignal.useMutation();
  const signals = trpc.aiFeed.latest.useQuery({ limit: 5 });
  const financeSummary = trpc.finance.summary.useQuery();
  const commands = trpc.hopeAi.recentCommands.useQuery({ limit: 5 });
  const catalog = trpc.hopeAi.actionCatalog.useQuery();
  const proactiveSuggestions = trpc.hopeAi.getProactiveSuggestions.useQuery({
    currentPath: "/dashboard/hope-ai",
    mode: assistantMode,
  });

  const supported = useMemo(() => Boolean(getSpeechRecognition()), []);
  const groupedCatalog = useMemo(() => {
    const items = catalog.data ?? [];
    return items.reduce<Record<string, typeof items>>((groups, item) => {
      const key = item.category;
      groups[key] = groups[key] ?? [];
      groups[key].push(item);
      return groups;
    }, {});
  }, [catalog.data]);

  const addTimeline = (event: TimelineEvent) => {
    setTimeline(current => [event, ...current].slice(0, 10));
  };

  const applyAssistantMode = (mode?: AssistantMode) => {
    if (!mode) return;
    setAssistantMode(mode);
  };

  const executeParsedCommand = async (
    parsed: ParsedCommand,
    confirmed: boolean
  ) => {
    const result = await executeCommand.mutateAsync({
      intent: parsed.intent,
      payload: parsed.payload,
      confirmed,
      displayCards: parsed.displayCards,
    });

    const resultAny = result as any;
    if (resultAny.mission) setMissionBoard(resultAny.mission as MissionPlan);
    if (resultAny.suggestions)
      setSuggestionCards(resultAny.suggestions as ProactiveSuggestion[]);

    const response = result.spokenResponse ?? parsed.spokenResponse ?? "Done.";
    setLastResponse(response);
    speak(response);
    addTimeline({
      role: "hope",
      text: response,
      detail: parsed.displayTitle ?? parsed.intent.replace("_", " "),
    });
    setDisplayCards(
      (result.displayCards as DisplayCard[] | undefined) ??
        parsed.displayCards ??
        displayCards
    );
    applyAssistantMode(parsed.payload.mode);

    if ("path" in result && result.path) {
      setLocation(result.path);
    }

    if (parsed.intent === "market_scan" && parsed.payload.symbol) {
      await generateSignal.mutateAsync({
        symbol: parsed.payload.symbol,
        timeframe: "intraday",
      });
      await signals.refetch();
    }

    await Promise.all([commands.refetch(), financeSummary.refetch()]);
  };

  const processCommand = async (spokenText: string) => {
    const normalized = spokenText.trim();
    if (!normalized) return;

    setTranscript(normalized);
    addTimeline({ role: "user", text: normalized });
    const lowered = normalized.toLowerCase();

    if (pendingCommand && /\b(cancel|stop|never mind|clear)\b/.test(lowered)) {
      const response = "Canceled. I cleared the pending command.";
      setPendingCommand(null);
      setLastResponse(response);
      speak(response);
      addTimeline({
        role: "hope",
        text: response,
        detail: "Pending action canceled",
      });
      return;
    }

    if (
      pendingCommand &&
      /\b(confirm|yes|execute|send it|place it|confirm trade|confirm tip|confirm payment)\b/.test(
        lowered
      )
    ) {
      await executeParsedCommand(pendingCommand, true);
      setPendingCommand(null);
      return;
    }

    try {
      const parsed = await parseVoice.mutateAsync({ transcript: normalized });
      setLastResponse(parsed.spokenResponse);
      setDisplayCards(parsed.displayCards ?? []);
      if (parsed.intent === "mission_plan") {
        setMissionBoard({
          id: parsed.payload.missionId ?? `local-${Date.now()}`,
          goal: parsed.payload.goal ?? normalized,
          summary: parsed.spokenResponse,
          mode: parsed.payload.mode ?? assistantMode,
          estimatedMinutes: Math.max(
            2,
            (parsed.payload.plannedStepCount ??
              parsed.displayCards?.length ??
              1) * 3
          ),
          safetyNotice:
            "Hope can keep moving through safe steps hands-free, but money, trading, payment, admin, ICO, and casino-impacting steps require confirmation.",
          steps: (parsed.displayCards ?? []).map((card, index) => ({
            id: `${parsed.payload.missionId ?? "mission"}-${index}`,
            title: card.title,
            description: card.body,
            intent: "navigate",
            path: card.path,
            safetyLevel: /confirm|payment|trade|admin|compliance/i.test(
              `${card.title} ${card.body}`
            )
              ? "confirm"
              : "safe",
            requiresConfirmation:
              /confirm|payment|trade|admin|compliance/i.test(
                `${card.title} ${card.body}`
              ),
            voicePrompt: card.action ?? "Say next step.",
            status: /confirm|payment|trade|admin|compliance/i.test(
              `${card.title} ${card.body}`
            )
              ? "needs_confirmation"
              : "ready",
          })),
          suggestedVoiceCommands: [
            "Start mission",
            "Read next step",
            "Open recommended page",
            "Pause mission",
          ],
        });
      }
      applyAssistantMode(parsed.payload.mode);
      speak(parsed.spokenResponse);
      addTimeline({
        role: "hope",
        text: parsed.spokenResponse,
        detail: parsed.displayTitle ?? parsed.intent.replace("_", " "),
      });

      if (parsed.requiresConfirmation) {
        setPendingCommand(parsed);
        return;
      }

      await executeParsedCommand(parsed, false);
    } catch (error) {
      const response =
        error instanceof Error
          ? error.message
          : "Hope AI could not process that command.";
      setLastResponse(response);
      speak(response);
      addTimeline({ role: "hope", text: response, detail: "Command error" });
    }
  };

  const startListening = () => {
    const Recognition = getSpeechRecognition();
    if (!Recognition) {
      const response =
        "Voice recognition is not supported in this browser. You can type commands instead.";
      setLastResponse(response);
      speak(response);
      return;
    }

    const recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      setIsListening(false);
      if (autoListen) {
        window.setTimeout(() => startListening(), 650);
      }
    };
    recognition.onerror = () => {
      setIsListening(false);
      const response = "I could not hear clearly. Please try again.";
      setLastResponse(response);
      speak(response);
    };
    recognition.onresult = (event: BrowserSpeechRecognitionEvent) => {
      const spoken = Array.from(event.results)
        .map(result => Array.from(result)[0]?.transcript ?? "")
        .join(" ");
      void processCommand(spoken);
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const handleTypedCommand = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const command = String(form.get("command") ?? "");
    event.currentTarget.reset();
    await processCommand(command);
  };

  const toggleAutoListen = () => {
    setAutoListen(enabled => !enabled);
    const response = autoListen
      ? "Continuous hands-free listening is off."
      : "Continuous hands-free listening is on. I will keep listening after each command until you turn it off.";
    setLastResponse(response);
    speak(response);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#164e63_0,#020617_32%,#020617_100%)] text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <section className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-900/95 via-slate-950 to-cyan-950/40 p-6 md:p-8 shadow-2xl shadow-cyan-950/30">
          <div className="absolute right-[-8rem] top-[-8rem] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute bottom-[-10rem] left-[-8rem] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200">
                <Sparkles className="h-4 w-4" /> Hope AI Hands-Free OS
              </div>
              <h1 className="text-3xl md:text-6xl font-black tracking-tight">
                Beginner-friendly voice control for everything.
              </h1>
              <p className="max-w-3xl text-slate-300 leading-7">
                Speak naturally and let Hope AI navigate, explain, scan, coach,
                and prepare actions. Safe operations run instantly; trades,
                tips, payments, and account-impacting records require clear
                confirmation.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-100">
                  {modeLabel(assistantMode)}
                </span>
                <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-100">
                  {modeDescription(assistantMode)}
                </span>
                <span
                  className={`rounded-full border px-3 py-1 text-sm ${autonomousMode ? "border-fuchsia-300/40 bg-fuchsia-400/15 text-fuchsia-100" : "border-white/10 bg-white/5 text-slate-300"}`}
                >
                  {autonomousMode
                    ? "Autonomous mission assist on"
                    : "Autonomous mission assist standby"}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`flex h-32 w-32 items-center justify-center rounded-full border text-white transition ${isListening ? "border-red-300 bg-red-500/30 shadow-lg shadow-red-500/30 animate-pulse" : "border-cyan-300 bg-cyan-500/20 shadow-lg shadow-cyan-500/20 hover:scale-105"}`}
              >
                {isListening ? (
                  <MicOff className="h-14 w-14" />
                ) : (
                  <Mic className="h-14 w-14" />
                )}
              </button>
              <button
                onClick={toggleAutoListen}
                className={`rounded-xl px-4 py-2 text-sm font-bold transition ${autoListen ? "bg-emerald-400 text-slate-950" : "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"}`}
              >
                {autoListen
                  ? "Continuous listening on"
                  : "Enable continuous listening"}
              </button>
              <button
                onClick={() => {
                  setAutonomousMode(value => !value);
                  const response = autonomousMode
                    ? "Autonomous mission assist is standing by."
                    : "Autonomous mission assist is on. I will plan safe next steps and pause at confirmation gates.";
                  setLastResponse(response);
                  speak(response);
                }}
                className={`rounded-xl px-4 py-2 text-sm font-bold transition ${autonomousMode ? "bg-fuchsia-400 text-slate-950" : "border border-fuchsia-300/20 bg-fuchsia-400/10 text-fuchsia-100 hover:bg-fuchsia-400/15"}`}
              >
                {autonomousMode ? "Mission assist on" : "Enable mission assist"}
              </button>
            </div>
          </div>
          {!supported && (
            <p className="relative mt-4 rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-100">
              Browser speech recognition is unavailable here. Typed commands
              still work.
            </p>
          )}
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-2 text-cyan-200">
              <Navigation className="h-5 w-5" /> Last transcript
            </div>
            <p className="mt-3 min-h-16 text-lg font-semibold">
              {transcript || "Say a command or type below."}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 lg:col-span-2">
            <div className="flex items-center gap-2 text-emerald-200">
              <ShieldCheck className="h-5 w-5" /> Hope response
            </div>
            <p className="mt-3 min-h-16 text-lg text-slate-200">
              {lastResponse}
            </p>
            {pendingCommand && (
              <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-500/10 p-4 text-amber-100">
                Pending confirmation for{" "}
                <strong>{pendingCommand.intent.replace("_", " ")}</strong>. Say
                or type <strong>confirm</strong> to continue, or{" "}
                <strong>cancel</strong> to clear it.
              </div>
            )}
          </div>
        </section>

        <form
          onSubmit={handleTypedCommand}
          className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4 md:flex-row"
        >
          <input
            name="command"
            placeholder="Type a command, e.g. Hope beginner mode, scan Bitcoin, teach me trading, open marketplace, prepare buy 2 SKY"
            className="min-h-12 flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 text-slate-100 outline-none focus:border-cyan-300"
          />
          <button className="rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 hover:bg-cyan-300">
            Send to Hope
          </button>
        </form>

        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-2 text-fuchsia-200">
            <Wand2 className="h-5 w-5" /> Instant voice shortcuts
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {QUICK_COMMANDS.map(command => (
              <button
                key={command}
                onClick={() => void processCommand(command)}
                className="rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm text-slate-200 hover:border-cyan-300/60 hover:text-cyan-100"
              >
                {command}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-5">
          <div className="rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/[0.06] p-5 lg:col-span-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-fuchsia-200">
                  <Rocket className="h-5 w-5" /> Mission Board
                </div>
                <h2 className="mt-2 text-2xl font-black text-white">
                  {missionBoard?.goal ?? "No mission staged yet"}
                </h2>
              </div>
              <button
                onClick={() =>
                  void processCommand(
                    "Plan a mission for my next SkyCoin444 goal"
                  )
                }
                className="rounded-xl bg-fuchsia-400 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-fuchsia-300"
              >
                Auto-plan mission
              </button>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {missionBoard?.summary ??
                "Say “plan my ICO launch,” “plan charity casino safeguards,” or “plan a money mission for Bitcoin.” Hope will create a safe step sequence and stop at confirmation gates."}
            </p>
            {missionBoard && (
              <p className="mt-2 text-xs uppercase tracking-[0.22em] text-fuchsia-200">
                Estimated {missionBoard.estimatedMinutes} minutes ·{" "}
                {missionBoard.steps.length} steps
              </p>
            )}
            <div className="mt-4 space-y-3">
              {(missionBoard?.steps ?? []).map((missionStep, index) => (
                <button
                  key={missionStep.id}
                  onClick={() =>
                    missionStep.path && setLocation(missionStep.path)
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 p-4 text-left hover:border-fuchsia-300/50"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <strong className="text-white">
                      {index + 1}. {missionStep.title}
                    </strong>
                    <span
                      className={`rounded-full px-2 py-1 text-[0.65rem] uppercase tracking-[0.18em] ${missionStep.requiresConfirmation ? "bg-amber-400/15 text-amber-100" : "bg-emerald-400/15 text-emerald-100"}`}
                    >
                      {missionStep.requiresConfirmation
                        ? "confirmation gate"
                        : "safe step"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {missionStep.description}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
                    {missionStep.voicePrompt}
                  </p>
                </button>
              ))}
              {!missionBoard && (
                <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
                  Mission planner is ready. It can chain navigation,
                  explanations, scans, payment prep, ICO review, privacy review,
                  and charity-casino controls while preserving safety gates.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/[0.05] p-5 lg:col-span-2">
            <div className="flex items-center gap-2 text-cyan-200">
              <Sparkles className="h-5 w-5" /> Proactive Suggestions
            </div>
            <div className="mt-4 space-y-3">
              {(suggestionCards.length
                ? suggestionCards
                : ((proactiveSuggestions.data ?? []) as ProactiveSuggestion[])
              ).map(suggestion => (
                <button
                  key={suggestion.id}
                  onClick={() => void processCommand(suggestion.command)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 p-4 text-left hover:border-cyan-300/50"
                >
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-white">{suggestion.title}</strong>
                    <span
                      className={`rounded-full px-2 py-1 text-[0.65rem] uppercase ${suggestion.safetyLevel === "confirm" ? "bg-amber-400/15 text-amber-100" : "bg-emerald-400/15 text-emerald-100"}`}
                    >
                      {suggestion.safetyLevel}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {suggestion.body}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
                    Say: {suggestion.command}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {displayCards.map(card => (
            <button
              key={`${card.title}-${card.body}`}
              onClick={() => card.path && setLocation(card.path)}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left transition hover:border-cyan-300/50 hover:bg-white/[0.07]"
            >
              <div className="flex items-center gap-2 text-cyan-200">
                <Lightbulb className="h-5 w-5" /> {card.title}
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {card.body}
              </p>
              {card.action && (
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">
                  {card.action}
                </p>
              )}
            </button>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-2 text-emerald-200">
              <WalletCards className="h-5 w-5" /> Money snapshot
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-300">
              <p>
                Net worth:{" "}
                <strong className="text-white">
                  ${financeSummary.data?.netWorth?.toLocaleString?.() ?? "0"}
                </strong>
              </p>
              <p>
                Assets:{" "}
                <strong className="text-white">
                  ${financeSummary.data?.totalAssets?.toLocaleString?.() ?? "0"}
                </strong>
              </p>
              <p>
                Cash flow:{" "}
                <strong className="text-white">
                  $
                  {financeSummary.data?.monthlyCashFlow?.toLocaleString?.() ??
                    "0"}
                </strong>
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 lg:col-span-2">
            <div className="flex items-center gap-2 text-fuchsia-200">
              <TrendingUp className="h-5 w-5" /> Latest informational signals
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {signals.data?.map((signal: any, index: number) => (
                <div
                  key={`${signal.symbol}-${signal.createdAt ?? index}`}
                  className="rounded-xl border border-white/10 bg-slate-950/70 p-4"
                >
                  <div className="flex items-center justify-between">
                    <strong>{signal.symbol}</strong>
                    <span className="rounded-full bg-cyan-400/10 px-2 py-1 text-xs uppercase text-cyan-200">
                      {signal.action}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">
                    Confidence {signal.confidence}% · Risk {signal.riskLevel}
                  </p>
                  <p className="mt-2 line-clamp-3 text-xs text-slate-400">
                    {signal.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-2 text-cyan-200">
              <Compass className="h-5 w-5" /> App-wide route launcher
            </div>
            <div className="mt-4 space-y-4">
              {Object.entries(groupedCatalog).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
                    {category}
                  </h3>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {items.map(item => (
                      <button
                        key={item.id}
                        onClick={() => setLocation(item.path)}
                        className="rounded-xl border border-white/10 bg-slate-950/70 p-3 text-left hover:border-cyan-300/50"
                      >
                        <strong className="text-sm text-white">
                          {item.label}
                        </strong>
                        <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                          {item.beginnerTip}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-2 text-fuchsia-200">
              <Brain className="h-5 w-5" /> Live assistant timeline
            </div>
            <div className="mt-4 space-y-3">
              {timeline.map((event, index) => (
                <div
                  key={`${event.role}-${index}-${event.text}`}
                  className={`rounded-xl border p-3 ${event.role === "hope" ? "border-cyan-300/20 bg-cyan-400/5" : "border-white/10 bg-slate-950/70"}`}
                >
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                    {event.role === "hope" ? (
                      <Rocket className="h-3 w-3" />
                    ) : (
                      <Mic className="h-3 w-3" />
                    )}
                    {event.role}
                  </div>
                  <p className="mt-2 text-sm text-slate-200">{event.text}</p>
                  {event.detail && (
                    <p className="mt-1 text-xs text-slate-500">
                      {event.detail}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-xl font-bold">Recent Hope AI commands</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="py-2">Intent</th>
                  <th>Transcript</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {commands.data?.map((command: any) => (
                  <tr key={command.id} className="border-t border-white/10">
                    <td className="py-2">{command.intent}</td>
                    <td>{command.transcript}</td>
                    <td>{command.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
