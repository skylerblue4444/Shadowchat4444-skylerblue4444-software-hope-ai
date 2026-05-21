import { useMemo, useState } from "react";
import { AlertTriangle, Copy, Key, LockKeyhole, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { SafeCryptoCompliancePanel } from "@/components/SafeCryptoCompliancePanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface APIKey {
  id: string;
  name: string;
  publicRef: string;
  secretEnvVar: string;
  vaultRef: string;
  scopes: string[];
  created: string;
  lastUsed: string;
  active: boolean;
  rotation: "current" | "rotate-soon" | "disabled";
}

const INITIAL_KEYS: APIKey[] = [
  {
    id: "1",
    name: "Trading Bot",
    publicRef: "vault_pub_trading_bot",
    secretEnvVar: "SKY_TRADING_BOT_SECRET",
    vaultRef: "vault://skycoin444/trading-bot",
    scopes: ["trading", "portfolio", "orders"],
    created: "2 weeks ago",
    lastUsed: "5 minutes ago",
    active: true,
    rotation: "current",
  },
  {
    id: "2",
    name: "Analytics Dashboard",
    publicRef: "vault_pub_analytics_dash",
    secretEnvVar: "SKY_ANALYTICS_DASHBOARD_SECRET",
    vaultRef: "vault://skycoin444/analytics-dashboard",
    scopes: ["portfolio", "analytics"],
    created: "1 month ago",
    lastUsed: "2 hours ago",
    active: true,
    rotation: "rotate-soon",
  },
  {
    id: "3",
    name: "Old Integration",
    publicRef: "vault_pub_legacy_disabled",
    secretEnvVar: "SKY_LEGACY_INTEGRATION_SECRET",
    vaultRef: "vault://skycoin444/legacy-disabled",
    scopes: ["trading"],
    created: "3 months ago",
    lastUsed: "Never",
    active: false,
    rotation: "disabled",
  },
];

function normalizeEnvName(name: string) {
  return `SKY_${name.trim().replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "").toUpperCase()}_SECRET`;
}

export default function APIVault() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>(INITIAL_KEYS);
  const [newKeyName, setNewKeyName] = useState("");

  const stats = useMemo(() => {
    const active = apiKeys.filter((k) => k.active).length;
    const rotateSoon = apiKeys.filter((k) => k.rotation === "rotate-soon").length;
    return { active, rotateSoon, total: apiKeys.length, score: Math.max(74, 100 - rotateSoon * 8) };
  }, [apiKeys]);

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;
    const slug = newKeyName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "integration";
    const newKey: APIKey = {
      id: Date.now().toString(),
      name: newKeyName.trim(),
      publicRef: `vault_pub_${slug}`,
      secretEnvVar: normalizeEnvName(newKeyName),
      vaultRef: `vault://skycoin444/${slug}`,
      scopes: ["portfolio", "read"],
      created: "just now",
      lastUsed: "Never",
      active: true,
      rotation: "current",
    };
    setApiKeys([newKey, ...apiKeys]);
    setNewKeyName("");
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.map((k) => (k.id === id ? { ...k, active: false, rotation: "disabled" } : k)));
  };

  const handleCopyKey = (value: string) => {
    void navigator.clipboard.writeText(value);
  };

  return (
    <div className="space-y-6">
      <SafeCryptoCompliancePanel focus="api" compact />

      <Card className="border-amber-500/20 bg-amber-500/5">
        <CardContent className="flex flex-col gap-3 pt-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-300" />
            <div>
              <p className="font-bold text-amber-100">Secret-safe vault mode</p>
              <p className="text-sm text-amber-100/80">This screen stores only public references, environment variable names, scopes, and rotation status. Real secrets must stay in server-side environment variables or an external secret manager.</p>
            </div>
          </div>
          <Badge className="w-fit bg-emerald-500/15 text-emerald-100">No plaintext secrets</Badge>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-400">Active Integrations</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-green-400">{stats.active}</div><p className="mt-1 text-xs text-gray-500">Vault references ready</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-400">Total References</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-purple-400">{stats.total}</div><p className="mt-1 text-xs text-gray-500">No secret values stored</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-400">Rotation Due</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-amber-300">{stats.rotateSoon}</div><p className="mt-1 text-xs text-gray-500">Needs review</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-400">Security Score</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-blue-400">{stats.score}</div><p className="mt-1 text-xs text-gray-500">Vault hygiene</p></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Vault Reference</CardTitle>
          <CardDescription>Create a reference for an integration without generating or displaying a secret in the browser.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Integration name, for example Trading Bot or Analytics" value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} className="bg-gray-900 border-gray-700" />
            <Button onClick={handleCreateKey} disabled={!newKeyName.trim()} className="bg-purple-600 px-4 hover:bg-purple-700"><Plus className="mr-2 h-4 w-4" />Create</Button>
          </div>
          <p className="text-xs text-gray-500">After creating the reference, add the matching environment variable on the server. Hope AI can explain setup, but it will not reveal secret values.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Vault References</CardTitle>
          <CardDescription>Manage integration references, scopes, rotation, and last-used metadata.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="rounded-lg border border-gray-700 p-4 transition-colors hover:border-purple-500/50">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-purple-400" />
                    <h3 className="text-sm font-semibold">{apiKey.name}</h3>
                    <Badge className={`text-xs ${apiKey.active ? "bg-green-600 text-white" : "bg-gray-700 text-gray-300"}`}>{apiKey.active ? "Active" : "Inactive"}</Badge>
                    <Badge variant="outline" className={apiKey.rotation === "rotate-soon" ? "border-amber-400 text-amber-300" : "border-gray-600 text-gray-300"}>{apiKey.rotation}</Badge>
                  </div>
                  <Button onClick={() => handleDeleteKey(apiKey.id)} variant="ghost" size="sm" className="text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /></Button>
                </div>

                <div className="mb-3 grid gap-3 md:grid-cols-3">
                  {[{ label: "Public Reference", value: apiKey.publicRef }, { label: "Secret Environment Variable", value: apiKey.secretEnvVar }, { label: "Vault URI", value: apiKey.vaultRef }].map((field) => (
                    <div key={field.label}>
                      <p className="mb-1 text-xs text-gray-400">{field.label}</p>
                      <div className="flex gap-2">
                        <Input value={field.value} readOnly className="border-gray-700 bg-gray-900 text-xs" />
                        <Button onClick={() => handleCopyKey(field.value)} variant="outline" size="sm" className="px-3"><Copy className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 rounded border border-gray-700 bg-gray-900/50 p-3 md:grid-cols-3">
                  <div><p className="text-xs text-gray-400">Scopes</p><div className="mt-1 flex flex-wrap gap-1">{apiKey.scopes.map((scope) => <Badge key={scope} variant="outline" className="text-xs">{scope}</Badge>)}</div></div>
                  <div><p className="text-xs text-gray-400">Created</p><p className="mt-1 text-xs font-semibold">{apiKey.created}</p></div>
                  <div><p className="text-xs text-gray-400">Last Used</p><p className="mt-1 text-xs font-semibold">{apiKey.lastUsed}</p></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><LockKeyhole className="h-5 w-5 text-cyan-300" />API Documentation</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div><p className="mb-1 text-sm font-semibold">Base URL</p><code className="block rounded bg-gray-900 p-2 text-xs">https://api.skycoin444.com/v1</code></div>
          <div><p className="mb-1 text-sm font-semibold">Authentication</p><code className="block rounded bg-gray-900 p-2 text-xs">Authorization: Bearer $SKY_INTEGRATION_TOKEN</code></div>
          <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3 text-sm text-cyan-100"><ShieldCheck className="mr-2 inline h-4 w-4" />Use server-side environment variables only. Never paste private API tokens into chat, browser forms, or public repositories.</div>
          <Button variant="outline" className="w-full">View Full Documentation</Button>
        </CardContent>
      </Card>
    </div>
  );
}
