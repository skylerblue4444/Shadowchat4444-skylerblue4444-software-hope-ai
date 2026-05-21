import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  User,
  Shield,
  Zap,
  ChevronRight,
  CheckCircle,
  Globe,
  Coins,
  Star,
  Sparkles,
  ArrowRight,
  Copy,
  Eye,
  EyeOff,
  Lock,
  Smartphone,
  Bell,
  Gift,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const STEPS = [
  {
    id: 1,
    title: "Welcome to ShadowChat",
    icon: Sparkles,
    color: "text-blue-400",
  },
  { id: 2, title: "Create Your Profile", icon: User, color: "text-purple-400" },
  {
    id: 3,
    title: "Set Up Your Wallet",
    icon: Wallet,
    color: "text-yellow-400",
  },
  { id: 4, title: "Security Setup", icon: Shield, color: "text-green-400" },
  { id: 5, title: "Choose Your Interests", icon: Star, color: "text-pink-400" },
  { id: 6, title: "Claim Your Rewards", icon: Gift, color: "text-orange-400" },
];

const INTERESTS = [
  { id: "crypto", label: "Crypto Trading", emoji: "📈" },
  { id: "nft", label: "NFT Collecting", emoji: "🎨" },
  { id: "defi", label: "DeFi & Yield", emoji: "🌾" },
  { id: "gaming", label: "Crypto Gaming", emoji: "🎮" },
  { id: "social", label: "Social & Chat", emoji: "💬" },
  { id: "music", label: "Web3 Music", emoji: "🎵" },
  { id: "metaverse", label: "Metaverse", emoji: "🌐" },
  { id: "dao", label: "DAO & Governance", emoji: "🏛️" },
  { id: "charity", label: "Charity Gaming", emoji: "❤️" },
  { id: "it", label: "IT Services", emoji: "💻" },
];

const WALLET_TYPES = [
  {
    id: "new",
    label: "Create New Wallet",
    desc: "Generate a fresh wallet on ShadowChain",
    emoji: "✨",
    recommended: true,
  },
  {
    id: "import",
    label: "Import Existing",
    desc: "Import with seed phrase or private key",
    emoji: "📥",
    recommended: false,
  },
  {
    id: "connect",
    label: "Connect MetaMask",
    desc: "Use your existing MetaMask wallet",
    emoji: "🦊",
    recommended: false,
  },
  {
    id: "walletconnect",
    label: "WalletConnect",
    desc: "Connect any WalletConnect wallet",
    emoji: "🔗",
    recommended: false,
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [walletType, setWalletType] = useState("new");
  const [showSeed, setShowSeed] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [notifications, setNotifications] = useState(true);
  const [twoFA, setTwoFA] = useState(false);

  const mockSeedPhrase =
    "shadow chain crypto moon diamond hands wagmi sky blue spiller innovative";
  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const nextStep = () => {
    if (step < STEPS.length) setStep(s => s + 1);
    else
      toast.success(
        "Welcome to ShadowChat! 🚀 444 SKY4444 credited to your wallet!"
      );
  };

  const currentStep = STEPS[step - 1];
  const StepIcon = currentStep.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>
              Step {step} of {STEPS.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2">
            {STEPS.map(s => (
              <div
                key={s.id}
                className={`h-2 w-2 rounded-full transition-colors ${s.id <= step ? "bg-blue-500" : "bg-muted"}`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step Header */}
            <div className="text-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-3">
                <StepIcon className={`h-8 w-8 ${currentStep.color}`} />
              </div>
              <h2 className="text-xl font-black">{currentStep.title}</h2>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm text-center">
                  The world's first Web3 super-platform combining social media,
                  crypto trading, NFTs, gaming, IT services, and more.
                </p>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {[
                    { emoji: "💬", label: "ShadowChat" },
                    { emoji: "📈", label: "Trading" },
                    { emoji: "🎨", label: "NFTs" },
                    { emoji: "🎮", label: "Gaming" },
                    { emoji: "💻", label: "IT Services" },
                    { emoji: "⚡", label: "SKY4444" },
                  ].map(({ emoji, label }) => (
                    <div
                      key={label}
                      className="p-3 rounded-xl bg-muted/20 border border-border/30 text-center"
                    >
                      <span className="text-2xl">{emoji}</span>
                      <p className="text-xs text-muted-foreground mt-1">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 mt-4 text-center">
                  <p className="text-xs font-bold text-yellow-400">
                    🎁 New User Bonus: 444 SKY4444 tokens on completion!
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div
                    className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-4xl cursor-pointer"
                    onClick={() =>
                      toast.info("Upload profile photo coming soon!")
                    }
                  >
                    {username ? username[0].toUpperCase() : "⚡"}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">
                    Username
                  </label>
                  <Input
                    placeholder="@your_username"
                    value={username}
                    onChange={e =>
                      setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""))
                    }
                    className="mt-1"
                  />
                  {username && (
                    <p className="text-xs text-green-400 mt-1">
                      ✓ @{username} is available
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">
                    Display Name
                  </label>
                  <Input
                    placeholder="Your Name"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">
                    Country
                  </label>
                  <select className="w-full mt-1 px-3 py-2 rounded-xl bg-muted border border-border/50 text-sm">
                    <option>🇺🇸 United States</option>
                    <option>🇨🇳 China</option>
                    <option>🇬🇧 United Kingdom</option>
                    <option>🇯🇵 Japan</option>
                    <option>🇩🇪 Germany</option>
                    <option>🌍 Other</option>
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3">
                {WALLET_TYPES.map(wt => (
                  <button
                    key={wt.id}
                    onClick={() => setWalletType(wt.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${walletType === wt.id ? "border-yellow-500/40 bg-yellow-500/5" : "border-border/30"}`}
                  >
                    <span className="text-2xl">{wt.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold">{wt.label}</p>
                        {wt.recommended && (
                          <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{wt.desc}</p>
                    </div>
                    {walletType === wt.id && (
                      <CheckCircle className="h-5 w-5 text-yellow-400 shrink-0" />
                    )}
                  </button>
                ))}
                {walletType === "new" && (
                  <div className="p-3 rounded-xl bg-muted/20 border border-border/30">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold">Your Seed Phrase</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowSeed(!showSeed)}
                          className="text-muted-foreground"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(mockSeedPhrase);
                            toast.success(
                              "Seed phrase copied — store it safely!"
                            );
                          }}
                          className="text-muted-foreground"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div
                      className={`grid grid-cols-3 gap-1 ${!showSeed ? "blur-sm select-none" : ""}`}
                    >
                      {mockSeedPhrase.split(" ").map((word, i) => (
                        <div
                          key={i}
                          className="px-2 py-1 rounded-lg bg-muted text-xs font-mono"
                        >
                          <span className="text-muted-foreground">
                            {i + 1}.
                          </span>{" "}
                          {word}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-red-400 mt-2">
                      ⚠️ Never share your seed phrase with anyone!
                    </p>
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/30">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-sm font-bold">Push Notifications</p>
                      <p className="text-xs text-muted-foreground">
                        Price alerts, messages, trades
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`h-6 w-11 rounded-full transition-colors ${notifications ? "bg-blue-600" : "bg-muted"} relative`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white absolute top-1 transition-all ${notifications ? "right-1" : "left-1"}`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/30">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-sm font-bold">Two-Factor Auth (2FA)</p>
                      <p className="text-xs text-muted-foreground">
                        Extra security for your account
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setTwoFA(!twoFA);
                      if (!twoFA)
                        toast.success(
                          "2FA enabled! +50 SKY4444 security bonus"
                        );
                    }}
                    className={`h-6 w-11 rounded-full transition-colors ${twoFA ? "bg-green-600" : "bg-muted"} relative`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white absolute top-1 transition-all ${twoFA ? "right-1" : "left-1"}`}
                    />
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-muted/20 border border-border/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Lock className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-bold">Set PIN</p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    {[0, 1, 2, 3, 4, 5].map(i => (
                      <div
                        key={i}
                        className="h-10 w-10 rounded-xl bg-muted border border-border/50 flex items-center justify-center text-lg font-black"
                      >
                        •
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground text-center">
                  Select at least 3 to personalize your feed
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {INTERESTS.map(interest => (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left ${selectedInterests.includes(interest.id) ? "border-pink-500/40 bg-pink-500/5" : "border-border/30"}`}
                    >
                      <span className="text-2xl">{interest.emoji}</span>
                      <span className="text-sm font-medium">
                        {interest.label}
                      </span>
                      {selectedInterests.includes(interest.id) && (
                        <CheckCircle className="h-4 w-4 text-pink-400 ml-auto shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
                {selectedInterests.length > 0 && (
                  <p className="text-xs text-center text-green-400">
                    {selectedInterests.length} selected{" "}
                    {selectedInterests.length < 3
                      ? `— pick ${3 - selectedInterests.length} more`
                      : "✓ Great!"}
                  </p>
                )}
              </div>
            )}

            {step === 6 && (
              <div className="space-y-4 text-center">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border border-yellow-500/20">
                  <span className="text-6xl">🎁</span>
                  <p className="font-black text-2xl mt-3 text-yellow-400">
                    444 SKY4444
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Welcome Bonus Unlocked!
                  </p>
                </div>
                <div className="space-y-2">
                  {[
                    {
                      label: "Profile Created",
                      reward: "+100 SKY4444",
                      done: !!username,
                    },
                    {
                      label: "Wallet Connected",
                      reward: "+100 SKY4444",
                      done: true,
                    },
                    {
                      label: "2FA Enabled",
                      reward: "+50 SKY4444",
                      done: twoFA,
                    },
                    {
                      label: "Interests Selected",
                      reward: "+100 SKY4444",
                      done: selectedInterests.length >= 3,
                    },
                    {
                      label: "First Trade",
                      reward: "+94 SKY4444",
                      done: false,
                    },
                  ].map(({ label, reward, done }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between p-2 rounded-xl bg-muted/20"
                    >
                      <div className="flex items-center gap-2">
                        {done ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border border-border/50" />
                        )}
                        <span className="text-xs">{label}</span>
                      </div>
                      <span
                        className={`text-xs font-bold ${done ? "text-yellow-400" : "text-muted-foreground"}`}
                      >
                        {reward}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              className="w-full mt-6 bg-blue-600 text-white border-0 font-black h-12 text-base"
              onClick={nextStep}
              disabled={step === 5 && selectedInterests.length < 3}
            >
              {step === STEPS.length ? (
                <>
                  <Zap className="h-5 w-5 mr-2" />
                  Enter ShadowChat
                </>
              ) : (
                <>
                  Continue <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </Button>
            {step > 1 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="w-full mt-2 text-xs text-muted-foreground hover:text-white transition-colors"
              >
                ← Back
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
