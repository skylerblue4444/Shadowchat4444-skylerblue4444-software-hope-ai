import { BadgeCheck, CircleDollarSign, HeartHandshake, LockKeyhole, ShieldCheck } from "lucide-react";

type FocusArea = "ico" | "casino" | "charity" | "compliance" | "wallet" | "api" | "general";

type SafeCryptoCompliancePanelProps = {
  focus?: FocusArea;
  compact?: boolean;
};

const RAILS = [
  { symbol: "BTC", label: "Bitcoin", use: "treasury tracking", status: "live-ready" },
  { symbol: "USDT", label: "Tether", use: "stable contribution rail", status: "review" },
  { symbol: "TRUMP", label: "TRUMP", use: "charity campaign accounting", status: "live-ready" },
  { symbol: "XMR", label: "Monero", use: "privacy education only", status: "restricted" },
  { symbol: "SKY4444", label: "SkyCoin444", use: "platform and ICO planning", status: "live-ready" },
  { symbol: "SHADOW", label: "Shadow Coin", use: "ecosystem planning", status: "draft" },
];

const FOCUS_COPY: Record<FocusArea, { title: string; body: string }> = {
  ico: {
    title: "ICO safety rail",
    body: "Fundraising screens must keep no-profit-guarantee language, disclosure review, KYC/AML readiness, and explicit contribution confirmation before launch.",
  },
  casino: {
    title: "Charity casino guardrail",
    body: "Casino experiences stay entertainment-only, charity-directed, jurisdiction-aware, limit-controlled, and never promise real-money gambling outcomes.",
  },
  charity: {
    title: "Charity impact guardrail",
    body: "Donation and game-impact flows keep beneficiary visibility, audit logs, transparent proceeds language, and admin review before public campaigns.",
  },
  compliance: {
    title: "Global compliance rail",
    body: "Payments, crypto, ICO, privacy, and casino workflows are grouped behind review queues, audit exports, and confirmation gates.",
  },
  wallet: {
    title: "Multi-coin wallet rail",
    body: "Wallet actions support BTC, USDT, TRUMP, XMR, SKY4444, and SHADOW context while sensitive transfers remain confirmation-only.",
  },
  api: {
    title: "API vault security rail",
    body: "Secrets are referenced by environment variable or vault reference only. The UI never stores or displays real secret values.",
  },
  general: {
    title: "SkyCoin444 compliance rail",
    body: "Hope AI, wallets, ICO, marketplace, charity, and casino flows use explicit safety gates for regulated or account-impacting actions.",
  },
};

export function SafeCryptoCompliancePanel({ focus = "general", compact = false }: SafeCryptoCompliancePanelProps) {
  const copy = FOCUS_COPY[focus];
  return (
    <section className={`rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-slate-950 via-slate-950 to-cyan-950/30 ${compact ? "p-4" : "p-5"}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-cyan-200">
            <ShieldCheck className="h-4 w-4" /> {copy.title}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{copy.body}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [LockKeyhole, "No secrets in UI"],
              [BadgeCheck, "KYC/AML ready"],
              [CircleDollarSign, "Confirm funds movement"],
              [HeartHandshake, "Charity audit trail"],
            ].map(([Icon, label]) => {
              const TypedIcon = Icon as typeof ShieldCheck;
              return (
                <div key={label as string} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-200">
                  <TypedIcon className="mr-2 inline h-3.5 w-3.5 text-cyan-200" /> {label as string}
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid min-w-[18rem] grid-cols-2 gap-2 text-xs">
          {RAILS.map((rail) => (
            <div key={rail.symbol} className="rounded-xl border border-white/10 bg-slate-950/70 p-3">
              <div className="flex items-center justify-between gap-2">
                <strong className="text-white">{rail.symbol}</strong>
                <span className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-[0.65rem] uppercase text-cyan-100">{rail.status}</span>
              </div>
              <p className="mt-1 text-slate-400">{rail.use}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
