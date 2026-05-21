<<<<<<< HEAD
import { useMemo, useState } from "react";
import { AlertTriangle, Copy, Key, LockKeyhole, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { SafeCryptoCompliancePanel } from "@/components/SafeCryptoCompliancePanel";
=======
import { useState, useEffect } from "react";
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
<<<<<<< HEAD
=======
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import {
  Copy,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Key,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498

interface APIKey {
  id: string;
  name: string;
<<<<<<< HEAD
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
=======
  key: string;
  secret?: string;
  service: "binance" | "coinbase" | "kraken" | "uniswap" | "aave" | "custom";
  permissions: string[];
  isActive: boolean;
  lastUsed?: Date;
  createdAt: Date;
  expiresAt?: Date;
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
}

/**
 * Production-Grade API Vault
 * Secure API key management with encryption and audit logs
 */
export default function APIVault() {
<<<<<<< HEAD
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
=======
  const { user } = useAuth();
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [showSecrets, setShowSecrets] = useState<Set<string>>(new Set());
  const [newKeyForm, setNewKeyForm] = useState({
    name: "",
    service: "binance" as APIKey["service"],
    key: "",
    secret: "",
    permissions: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load API keys
  useEffect(() => {
    if (user) {
      // Simulate loading API keys
      setApiKeys([
        {
          id: "key_1",
          name: "Binance Trading Bot",
          key: "binance_key_****...****",
          secret: "binance_secret_****...****",
          service: "binance",
          permissions: ["read", "write", "trade"],
          isActive: true,
          lastUsed: new Date(Date.now() - 3600000),
          createdAt: new Date(Date.now() - 86400000 * 30),
        },
        {
          id: "key_2",
          name: "Uniswap Analytics",
          key: "uniswap_key_****...****",
          service: "uniswap",
          permissions: ["read"],
          isActive: true,
          lastUsed: new Date(Date.now() - 7200000),
          createdAt: new Date(Date.now() - 86400000 * 60),
        },
        {
          id: "key_3",
          name: "Old Kraken Key",
          key: "kraken_key_****...****",
          service: "kraken",
          permissions: ["read", "write"],
          isActive: false,
          createdAt: new Date(Date.now() - 86400000 * 180),
          expiresAt: new Date(Date.now() - 86400000 * 30),
        },
      ]);
    }
  }, [user]);

  const toggleShowSecret = (keyId: string) => {
    const newShowSecrets = new Set(showSecrets);
    if (newShowSecrets.has(keyId)) {
      newShowSecrets.delete(keyId);
    } else {
      newShowSecrets.add(keyId);
    }
    setShowSecrets(newShowSecrets);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const handleAddKey = async () => {
    if (!newKeyForm.name || !newKeyForm.key) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const newKey: APIKey = {
        id: `key_${Date.now()}`,
        name: newKeyForm.name,
        key: `${newKeyForm.service}_key_****...****`,
        secret: newKeyForm.secret
          ? `${newKeyForm.service}_secret_****...****`
          : undefined,
        service: newKeyForm.service,
        permissions: newKeyForm.permissions,
        isActive: true,
        createdAt: new Date(),
      };

      setApiKeys([newKey, ...apiKeys]);
      setNewKeyForm({
        name: "",
        service: "binance",
        key: "",
        secret: "",
        permissions: [],
      });
      setIsDialogOpen(false);
      toast.success("API key added successfully");
    } catch (error) {
      toast.error("Failed to add API key");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteKey = (keyId: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== keyId));
    toast.success("API key deleted");
  };

  const handleToggleActive = (keyId: string) => {
    setApiKeys(
      apiKeys.map(k => (k.id === keyId ? { ...k, isActive: !k.isActive } : k))
    );
  };

  const getServiceIcon = (service: string) => {
    const icons: Record<string, string> = {
      binance: "🟡",
      coinbase: "🔵",
      kraken: "⚪",
      uniswap: "🦄",
      aave: "🟣",
      custom: "⚙️",
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    };
    return icons[service] || "🔑";
  };

<<<<<<< HEAD
  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.map((k) => (k.id === id ? { ...k, active: false, rotation: "disabled" } : k)));
  };

  const handleCopyKey = (value: string) => {
    void navigator.clipboard.writeText(value);
=======
  const getPermissionBadgeColor = (permission: string) => {
    const colors: Record<string, string> = {
      read: "bg-blue-900 text-blue-200",
      write: "bg-yellow-900 text-yellow-200",
      trade: "bg-red-900 text-red-200",
      admin: "bg-purple-900 text-purple-200",
    };
    return colors[permission] || "bg-gray-700 text-gray-200";
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  };

  return (
    <div className="space-y-6">
<<<<<<< HEAD
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
=======
      {/* Security Alert */}
      <Alert className="border-yellow-900 bg-yellow-950">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-200">
          Never share your API keys or secrets. Store them securely and rotate
          them regularly.
        </AlertDescription>
      </Alert>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">API Vault</h1>
          <p className="text-gray-400">
            Manage your API keys and integrations securely
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add API Key
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800">
            <DialogHeader>
              <DialogTitle>Add New API Key</DialogTitle>
              <DialogDescription>
                Add your API credentials from external services
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300">
                  Key Name
                </label>
                <Input
                  placeholder="e.g., Binance Trading Bot"
                  value={newKeyForm.name}
                  onChange={e =>
                    setNewKeyForm({ ...newKeyForm, name: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300">
                  Service
                </label>
                <select
                  value={newKeyForm.service}
                  onChange={e =>
                    setNewKeyForm({
                      ...newKeyForm,
                      service: e.target.value as any,
                    })
                  }
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded px-3 py-2"
                >
                  <option value="binance">Binance</option>
                  <option value="coinbase">Coinbase</option>
                  <option value="kraken">Kraken</option>
                  <option value="uniswap">Uniswap</option>
                  <option value="aave">Aave</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300">
                  API Key
                </label>
                <Input
                  type="password"
                  placeholder="Your API key"
                  value={newKeyForm.key}
                  onChange={e =>
                    setNewKeyForm({ ...newKeyForm, key: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300">
                  API Secret (Optional)
                </label>
                <Input
                  type="password"
                  placeholder="Your API secret"
                  value={newKeyForm.secret}
                  onChange={e =>
                    setNewKeyForm({ ...newKeyForm, secret: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300">
                  Permissions
                </label>
                <div className="space-y-2">
                  {["read", "write", "trade", "admin"].map(perm => (
                    <label key={perm} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newKeyForm.permissions.includes(perm)}
                        onChange={e => {
                          const perms = e.target.checked
                            ? [...newKeyForm.permissions, perm]
                            : newKeyForm.permissions.filter(p => p !== perm);
                          setNewKeyForm({ ...newKeyForm, permissions: perms });
                        }}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-300">
                        {perm.charAt(0).toUpperCase() + perm.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleAddKey}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Adding..." : "Add API Key"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* API Keys List */}
      <div className="space-y-4">
        {apiKeys.map(apiKey => (
          <Card key={apiKey.id} className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">
                      {getServiceIcon(apiKey.service)}
                    </span>
                    <div>
                      <h3 className="font-bold text-white">{apiKey.name}</h3>
                      <p className="text-sm text-gray-400">
                        {apiKey.service.charAt(0).toUpperCase() +
                          apiKey.service.slice(1)}
                      </p>
                    </div>
                    <Badge variant={apiKey.isActive ? "default" : "secondary"}>
                      {apiKey.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  {/* Key Display */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 bg-gray-800 p-2 rounded">
                      <span className="text-xs text-gray-400 flex-1 font-mono">
                        {showSecrets.has(`key_${apiKey.id}`)
                          ? apiKey.key
                          : apiKey.key.replace(/./g, "*")}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleShowSecret(`key_${apiKey.id}`)}
                      >
                        {showSecrets.has(`key_${apiKey.id}`) ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(apiKey.key, "API Key")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>

                    {apiKey.secret && (
                      <div className="flex items-center gap-2 bg-gray-800 p-2 rounded">
                        <span className="text-xs text-gray-400 flex-1 font-mono">
                          {showSecrets.has(`secret_${apiKey.id}`)
                            ? apiKey.secret
                            : apiKey.secret.replace(/./g, "*")}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            toggleShowSecret(`secret_${apiKey.id}`)
                          }
                        >
                          {showSecrets.has(`secret_${apiKey.id}`) ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            copyToClipboard(apiKey.secret || "", "API Secret")
                          }
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Permissions */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {apiKey.permissions.map(perm => (
                      <Badge
                        key={perm}
                        className={getPermissionBadgeColor(perm)}
                      >
                        {perm}
                      </Badge>
                    ))}
                  </div>

                  {/* Metadata */}
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Created: {apiKey.createdAt.toLocaleDateString()}</p>
                    {apiKey.lastUsed && (
                      <p>Last used: {apiKey.lastUsed.toLocaleString()}</p>
                    )}
                    {apiKey.expiresAt && (
                      <p className="text-red-400">
                        Expires: {apiKey.expiresAt.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant={apiKey.isActive ? "outline" : "default"}
                    onClick={() => handleToggleActive(apiKey.id)}
                  >
                    {apiKey.isActive ? "Disable" : "Enable"}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteKey(apiKey.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

<<<<<<< HEAD
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><LockKeyhole className="h-5 w-5 text-cyan-300" />API Documentation</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div><p className="mb-1 text-sm font-semibold">Base URL</p><code className="block rounded bg-gray-900 p-2 text-xs">https://api.skycoin444.com/v1</code></div>
          <div><p className="mb-1 text-sm font-semibold">Authentication</p><code className="block rounded bg-gray-900 p-2 text-xs">Authorization: Bearer $SKY_INTEGRATION_TOKEN</code></div>
          <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3 text-sm text-cyan-100"><ShieldCheck className="mr-2 inline h-4 w-4" />Use server-side environment variables only. Never paste private API tokens into chat, browser forms, or public repositories.</div>
          <Button variant="outline" className="w-full">View Full Documentation</Button>
=======
      {/* Best Practices */}
      <Card className="bg-blue-950 border-blue-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-200 space-y-2">
          <p>• Use read-only keys for analytics and monitoring</p>
          <p>• Rotate API keys every 90 days</p>
          <p>• Use IP whitelisting when available</p>
          <p>• Enable 2FA on your exchange accounts</p>
          <p>• Never commit API keys to version control</p>
          <p>• Monitor API key usage regularly</p>
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
        </CardContent>
      </Card>
    </div>
  );
}
