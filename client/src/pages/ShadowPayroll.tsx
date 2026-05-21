import { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  Users,
  Coins,
  Send,
  CheckCircle,
  Clock,
  Plus,
  Download,
  Settings,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const EMPLOYEES = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Lead Developer",
    salary: "$8,000/mo",
    crypto: "50% SKY4444",
    wallet: "0xAlex...1234",
    status: "paid",
    lastPaid: "May 1",
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "UI/UX Designer",
    salary: "$5,500/mo",
    crypto: "100% SKY4444",
    wallet: "0xMaria...5678",
    status: "paid",
    lastPaid: "May 1",
  },
  {
    id: 3,
    name: "David Chen",
    role: "IT Technician",
    salary: "$4,400/mo",
    crypto: "25% TRUMP",
    wallet: "0xDavid...9012",
    status: "pending",
    lastPaid: "Apr 1",
  },
  {
    id: 4,
    name: "Sarah Williams",
    role: "Marketing",
    salary: "$4,000/mo",
    crypto: "75% BTC",
    wallet: "0xSarah...3456",
    status: "paid",
    lastPaid: "May 1",
  },
  {
    id: 5,
    name: "James Brown",
    role: "Support Lead",
    salary: "$3,800/mo",
    crypto: "0% (USD only)",
    wallet: "—",
    status: "paid",
    lastPaid: "May 1",
  },
];

const PAYROLL_HISTORY = [
  {
    date: "May 1, 2026",
    total: "$25,700",
    employees: 5,
    txHash: "0x4444...May",
    status: "completed",
  },
  {
    date: "Apr 1, 2026",
    total: "$25,700",
    employees: 5,
    txHash: "0x4444...Apr",
    status: "completed",
  },
  {
    date: "Mar 1, 2026",
    total: "$24,200",
    employees: 4,
    txHash: "0x4444...Mar",
    status: "completed",
  },
];

export default function ShadowPayroll() {
  const [tab, setTab] = useState<"employees" | "history" | "settings">(
    "employees"
  );
  const [running, setRunning] = useState(false);

  const runPayroll = async () => {
    setRunning(true);
    await new Promise(r => setTimeout(r, 2000));
    setRunning(false);
    toast.success(
      "✅ Payroll processed! $25,700 sent to 5 employees via crypto + fiat"
    );
  };

  const totalMonthly = "$25,700";
  const cryptoPct = "62%";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-green-400" />
            ShadowPayroll
          </h1>
          <p className="text-sm text-muted-foreground">
            Crypto-native payroll — pay employees in SKY4444, BTC, TRUMP, or USD
          </p>
        </div>
        <Button
          size="sm"
          className="h-8 text-xs bg-green-600 text-white border-0 font-bold"
          onClick={() => toast.success("Adding new employee...")}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add Employee
        </Button>
      </div>

      {/* Payroll Summary */}
      <Card className="border-green-500/20 bg-green-900/5">
        <CardContent className="py-4 px-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              {
                label: "Monthly Total",
                value: totalMonthly,
                icon: DollarSign,
                color: "text-green-400",
              },
              {
                label: "Employees",
                value: EMPLOYEES.length.toString(),
                icon: Users,
                color: "text-blue-400",
              },
              {
                label: "Paid in Crypto",
                value: cryptoPct,
                icon: Coins,
                color: "text-purple-400",
              },
            ].map(s => (
              <div key={s.label}>
                <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
                <p className={`font-black text-lg ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <Button
            className="w-full h-10 mt-3 text-sm bg-green-600 text-white border-0 font-bold"
            onClick={runPayroll}
            disabled={running}
          >
            {running ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-spin" />
                Processing Payroll...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Run June Payroll
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {(["employees", "history", "settings"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "employees" && (
        <div className="space-y-2">
          {EMPLOYEES.map((emp, i) => (
            <motion.div
              key={emp.id}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4 flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center font-black text-sm text-green-400 shrink-0">
                    {emp.name
                      .split(" ")
                      .map(n => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{emp.name}</p>
                    <p className="text-xs text-muted-foreground">{emp.role}</p>
                    <p className="text-xs text-green-400 font-bold">
                      {emp.salary} · {emp.crypto}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge
                      className={`text-xs ${emp.status === "paid" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                    >
                      {emp.status === "paid" ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-0.5" />
                          Paid
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3 mr-0.5" />
                          Pending
                        </>
                      )}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {emp.lastPaid}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "history" && (
        <div className="space-y-2">
          {PAYROLL_HISTORY.map((run, i) => (
            <Card key={run.date} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{run.date}</p>
                  <p className="text-xs text-muted-foreground">
                    {run.employees} employees · {run.txHash}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm text-green-400">
                    {run.total}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 text-xs px-2 mt-1 font-bold"
                    onClick={() =>
                      toast.success("Downloading payroll report...")
                    }
                  >
                    <Download className="h-3 w-3 mr-0.5" />
                    PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "settings" && (
        <div className="space-y-2">
          {[
            {
              label: "Default Payment Currency",
              value: "SKY4444 + USD",
              icon: Coins,
            },
            {
              label: "Payroll Schedule",
              value: "1st of every month",
              icon: Clock,
            },
            { label: "Auto-Run Payroll", value: "Enabled", icon: Zap },
            {
              label: "Tax Withholding",
              value: "22% Federal",
              icon: DollarSign,
            },
            {
              label: "Payroll Notifications",
              value: "Email + Push",
              icon: Settings,
            },
          ].map(s => (
            <Card key={s.label} className="border-border/50">
              <CardContent className="py-2.5 px-4 flex items-center gap-3">
                <s.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex-1">
                  <p className="font-bold text-sm">{s.label}</p>
                </div>
                <p className="text-xs text-green-400 font-bold">{s.value}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs font-bold"
                  onClick={() => toast.success(`Editing ${s.label}...`)}
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
