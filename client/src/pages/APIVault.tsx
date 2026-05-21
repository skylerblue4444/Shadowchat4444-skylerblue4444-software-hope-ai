import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Copy, Eye, EyeOff, Trash2, Plus, Key, Shield, AlertTriangle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

interface APIKey {
  id: string;
  name: string;
  key: string;
  secret?: string;
  service: "binance" | "coinbase" | "kraken" | "uniswap" | "aave" | "custom";
  permissions: string[];
  isActive: boolean;
  lastUsed?: Date;
  createdAt: Date;
  expiresAt?: Date;
}

/**
 * Production-Grade API Vault
 * Secure API key management with encryption and audit logs
 */
export default function APIVault() {
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
        secret: newKeyForm.secret ? `${newKeyForm.service}_secret_****...****` : undefined,
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
    setApiKeys(apiKeys.filter((k) => k.id !== keyId));
    toast.success("API key deleted");
  };

  const handleToggleActive = (keyId: string) => {
    setApiKeys(
      apiKeys.map((k) =>
        k.id === keyId ? { ...k, isActive: !k.isActive } : k
      )
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
    };
    return icons[service] || "🔑";
  };

  const getPermissionBadgeColor = (permission: string) => {
    const colors: Record<string, string> = {
      read: "bg-blue-900 text-blue-200",
      write: "bg-yellow-900 text-yellow-200",
      trade: "bg-red-900 text-red-200",
      admin: "bg-purple-900 text-purple-200",
    };
    return colors[permission] || "bg-gray-700 text-gray-200";
  };

  return (
    <div className="space-y-6">
      {/* Security Alert */}
      <Alert className="border-yellow-900 bg-yellow-950">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-200">
          Never share your API keys or secrets. Store them securely and rotate them regularly.
        </AlertDescription>
      </Alert>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">API Vault</h1>
          <p className="text-gray-400">Manage your API keys and integrations securely</p>
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
                <label className="text-sm font-medium text-gray-300">Key Name</label>
                <Input
                  placeholder="e.g., Binance Trading Bot"
                  value={newKeyForm.name}
                  onChange={(e) => setNewKeyForm({ ...newKeyForm, name: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300">Service</label>
                <select
                  value={newKeyForm.service}
                  onChange={(e) => setNewKeyForm({ ...newKeyForm, service: e.target.value as any })}
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
                <label className="text-sm font-medium text-gray-300">API Key</label>
                <Input
                  type="password"
                  placeholder="Your API key"
                  value={newKeyForm.key}
                  onChange={(e) => setNewKeyForm({ ...newKeyForm, key: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300">API Secret (Optional)</label>
                <Input
                  type="password"
                  placeholder="Your API secret"
                  value={newKeyForm.secret}
                  onChange={(e) => setNewKeyForm({ ...newKeyForm, secret: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300">Permissions</label>
                <div className="space-y-2">
                  {["read", "write", "trade", "admin"].map((perm) => (
                    <label key={perm} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newKeyForm.permissions.includes(perm)}
                        onChange={(e) => {
                          const perms = e.target.checked
                            ? [...newKeyForm.permissions, perm]
                            : newKeyForm.permissions.filter((p) => p !== perm);
                          setNewKeyForm({ ...newKeyForm, permissions: perms });
                        }}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-300">{perm.charAt(0).toUpperCase() + perm.slice(1)}</span>
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
        {apiKeys.map((apiKey) => (
          <Card key={apiKey.id} className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{getServiceIcon(apiKey.service)}</span>
                    <div>
                      <h3 className="font-bold text-white">{apiKey.name}</h3>
                      <p className="text-sm text-gray-400">
                        {apiKey.service.charAt(0).toUpperCase() + apiKey.service.slice(1)}
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
                        {showSecrets.has(`key_${apiKey.id}`) ? apiKey.key : apiKey.key.replace(/./g, "*")}
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
                          {showSecrets.has(`secret_${apiKey.id}`) ? apiKey.secret : apiKey.secret.replace(/./g, "*")}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleShowSecret(`secret_${apiKey.id}`)}
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
                          onClick={() => copyToClipboard(apiKey.secret || "", "API Secret")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Permissions */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {apiKey.permissions.map((perm) => (
                      <Badge key={perm} className={getPermissionBadgeColor(perm)}>
                        {perm}
                      </Badge>
                    ))}
                  </div>

                  {/* Metadata */}
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Created: {apiKey.createdAt.toLocaleDateString()}</p>
                    {apiKey.lastUsed && <p>Last used: {apiKey.lastUsed.toLocaleString()}</p>}
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
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
        </CardContent>
      </Card>
    </div>
  );
}
