import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  CheckCircle,
  Clock,
  Upload,
  User,
  Globe,
  Fingerprint,
  Camera,
  FileText,
  Star,
  Lock,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const KYC_LEVELS = [
  {
    level: 1,
    name: "Basic",
    limits: "$1,000/day",
    features: ["Send/Receive crypto", "Basic trading", "Community access"],
    requirements: ["Email verification", "Phone number"],
    status: "completed",
    icon: "📧",
  },
  {
    level: 2,
    name: "Standard",
    limits: "$10,000/day",
    features: ["Full trading access", "P2P exchange", "Fiat on/off ramp"],
    requirements: ["Government ID", "Selfie photo"],
    status: "completed",
    icon: "🪪",
  },
  {
    level: 3,
    name: "Advanced",
    limits: "$100,000/day",
    features: ["Futures trading", "ICO participation", "Institutional tools"],
    requirements: ["Address proof", "Video verification"],
    status: "in-progress",
    icon: "📋",
  },
  {
    level: 4,
    name: "Professional",
    limits: "$1,000,000/day",
    features: ["OTC trading", "API access", "Priority support"],
    requirements: ["Source of funds", "Business docs"],
    status: "locked",
    icon: "💼",
  },
  {
    level: 5,
    name: "Institutional",
    limits: "Unlimited",
    features: ["White-label access", "Custom limits", "Dedicated manager"],
    requirements: ["Full AML review", "Legal entity docs"],
    status: "locked",
    icon: "🏛️",
  },
];

export default function ShadowKYC() {
  const [tab, setTab] = useState<"status" | "verify" | "documents">("status");
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("United States");
  const [submitting, setSubmitting] = useState(false);

  const currentLevel = 2;

  const submit = async () => {
    if (!firstName || !lastName || !dob) {
      toast.error("Fill in all fields");
      return;
    }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 2500));
    setSubmitting(false);
    toast.success("✅ KYC Level 3 submitted! Review takes 1-2 business days.");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Shield className="h-6 w-6 text-indigo-400" />
            Identity Verification
          </h1>
          <p className="text-sm text-muted-foreground">
            KYC/AML compliance center
          </p>
        </div>
        <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 font-bold">
          Level {currentLevel} Verified
        </Badge>
      </div>

      {/* Current Level Card */}
      <Card className="border-indigo-500/20 bg-gradient-to-br from-indigo-900/20 to-purple-900/10">
        <CardContent className="py-4 px-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <p className="font-black text-lg">
                Level {currentLevel} — Standard
              </p>
              <p className="text-xs text-muted-foreground">
                Verified · Daily limit: $10,000
              </p>
            </div>
          </div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progress to Level 3</span>
            <span className="font-bold text-indigo-400">In Review</span>
          </div>
          <Progress value={66} className="h-2" />
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {(["status", "verify", "documents"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-indigo-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "status" && (
        <div className="space-y-3">
          {KYC_LEVELS.map((lvl, i) => (
            <motion.div
              key={lvl.level}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card
                className={`border ${lvl.status === "completed" ? "border-green-500/20 bg-green-900/5" : lvl.status === "in-progress" ? "border-indigo-500/20 bg-indigo-900/5" : "border-border/30 opacity-60"}`}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center text-lg shrink-0 ${lvl.status === "completed" ? "bg-green-500/10" : lvl.status === "in-progress" ? "bg-indigo-500/10" : "bg-muted"}`}
                    >
                      {lvl.status === "locked" ? (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        lvl.icon
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-black text-sm">
                          Level {lvl.level} — {lvl.name}
                        </p>
                        <Badge
                          className={`text-xs ${lvl.status === "completed" ? "bg-green-500/10 text-green-400 border-green-500/20" : lvl.status === "in-progress" ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" : "bg-muted text-muted-foreground"}`}
                        >
                          {lvl.status === "completed"
                            ? "✓ Verified"
                            : lvl.status === "in-progress"
                              ? "⏳ In Review"
                              : "🔒 Locked"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Daily limit: {lvl.limits}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {lvl.features.map(f => (
                          <span
                            key={f}
                            className="text-xs bg-muted rounded-full px-2 py-0.5"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    {lvl.status === "locked" &&
                      lvl.level === currentLevel + 1 && (
                        <Button
                          size="sm"
                          className="h-8 text-xs bg-indigo-600 text-white border-0 shrink-0"
                          onClick={() => setTab("verify")}
                        >
                          Unlock
                        </Button>
                      )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "verify" && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${step >= s ? "bg-indigo-600 text-white" : "bg-muted text-muted-foreground"}`}
                >
                  {step > s ? "✓" : s}
                </div>
                <p
                  className={`text-xs ${step >= s ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {s === 1 ? "Personal Info" : s === 2 ? "Upload ID" : "Selfie"}
                </p>
                {s < 3 && (
                  <div
                    className={`flex-1 h-0.5 ${step > s ? "bg-indigo-600" : "bg-muted"}`}
                  />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <Card className="border-indigo-500/20 bg-indigo-900/5">
              <CardContent className="py-4 px-4 space-y-3">
                <p className="font-bold text-sm">Personal Information</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      First Name
                    </p>
                    <Input
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      placeholder="Skyler"
                      className="h-9 text-xs"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Last Name
                    </p>
                    <Input
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      placeholder="Blue"
                      className="h-9 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Date of Birth
                  </p>
                  <Input
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    type="date"
                    className="h-9 text-xs"
                  />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Country of Residence
                  </p>
                  <select
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none"
                  >
                    {[
                      "United States",
                      "United Kingdom",
                      "Germany",
                      "Japan",
                      "Singapore",
                      "UAE",
                      "Canada",
                      "Australia",
                    ].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <Button
                  className="w-full h-10 text-xs bg-indigo-600 text-white border-0 font-bold"
                  onClick={() => {
                    if (!firstName || !lastName || !dob) {
                      toast.error("Fill in all fields");
                      return;
                    }
                    setStep(2);
                  }}
                >
                  Next: Upload ID →
                </Button>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="border-indigo-500/20 bg-indigo-900/5">
              <CardContent className="py-4 px-4 space-y-3">
                <p className="font-bold text-sm">Upload Government ID</p>
                <p className="text-xs text-muted-foreground">
                  Accepted: Passport, Driver's License, National ID
                </p>
                <div
                  className="border-2 border-dashed border-indigo-500/30 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-500/50 transition-colors"
                  onClick={() => toast.info("Opening file picker...")}
                >
                  <Upload className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
                  <p className="text-sm font-bold">Upload Front of ID</p>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG, PDF up to 10MB
                  </p>
                </div>
                <div
                  className="border-2 border-dashed border-indigo-500/30 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-500/50 transition-colors"
                  onClick={() => toast.info("Opening file picker...")}
                >
                  <Upload className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
                  <p className="text-sm font-bold">Upload Back of ID</p>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG, PDF up to 10MB
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 h-10 text-xs"
                    onClick={() => setStep(1)}
                  >
                    ← Back
                  </Button>
                  <Button
                    className="flex-1 h-10 text-xs bg-indigo-600 text-white border-0 font-bold"
                    onClick={() => setStep(3)}
                  >
                    Next: Selfie →
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="border-indigo-500/20 bg-indigo-900/5">
              <CardContent className="py-4 px-4 space-y-3">
                <p className="font-bold text-sm">Selfie Verification</p>
                <p className="text-xs text-muted-foreground">
                  Take a live selfie holding your ID to verify your identity.
                </p>
                <div
                  className="h-48 rounded-xl bg-black/20 flex flex-col items-center justify-center gap-2 cursor-pointer"
                  onClick={() => toast.info("Opening camera...")}
                >
                  <Camera className="h-12 w-12 text-indigo-400" />
                  <p className="text-sm font-bold">Open Camera</p>
                  <p className="text-xs text-muted-foreground">
                    Or upload a photo
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 h-10 text-xs"
                    onClick={() => setStep(2)}
                  >
                    ← Back
                  </Button>
                  <Button
                    className="flex-1 h-10 text-xs bg-indigo-600 text-white border-0 font-bold"
                    onClick={submit}
                    disabled={submitting}
                  >
                    {submitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Submit for Review
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {tab === "documents" && (
        <div className="space-y-2">
          {[
            {
              name: "Passport Scan",
              status: "verified",
              date: "Jan 15, 2026",
              type: "ID Document",
            },
            {
              name: "Selfie Photo",
              status: "verified",
              date: "Jan 15, 2026",
              type: "Biometric",
            },
            {
              name: "Proof of Address",
              status: "pending",
              date: "May 14, 2026",
              type: "Address Proof",
            },
          ].map((doc, i) => (
            <Card key={doc.name} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <FileText className="h-8 w-8 text-indigo-400 shrink-0" />
                <div className="flex-1">
                  <p className="font-bold text-sm">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.type} · {doc.date}
                  </p>
                </div>
                <Badge
                  className={`text-xs ${doc.status === "verified" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                >
                  {doc.status === "verified" ? "✓ Verified" : "⏳ Pending"}
                </Badge>
              </CardContent>
            </Card>
          ))}
          <Button
            className="w-full h-10 text-xs bg-indigo-600 text-white border-0 font-bold"
            onClick={() => toast.info("Opening document upload...")}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload New Document
          </Button>
        </div>
      )}
    </div>
  );
}
