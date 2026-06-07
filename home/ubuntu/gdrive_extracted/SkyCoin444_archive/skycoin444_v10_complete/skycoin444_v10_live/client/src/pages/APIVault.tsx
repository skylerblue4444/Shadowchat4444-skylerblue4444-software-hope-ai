import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, Eye, EyeOff, Trash2, Plus, Key } from "lucide-react";

interface APIKey {
  id: string;
  name: string;
  key: string;
  secret: string;
  scopes: string[];
  created: string;
  lastUsed: string;
  active: boolean;
}

export default function APIVault() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: "1",
      name: "Trading Bot",
      key: "sk_live_abc123def456",
      secret: "sk_secret_xyz789uvw012",
      scopes: ["trading", "portfolio", "orders"],
      created: "2 weeks ago",
      lastUsed: "5 minutes ago",
      active: true,
    },
    {
      id: "2",
      name: "Analytics Dashboard",
      key: "sk_live_ghi345jkl678",
      secret: "sk_secret_mno234pqr567",
      scopes: ["portfolio", "analytics"],
      created: "1 month ago",
      lastUsed: "2 hours ago",
      active: true,
    },
    {
      id: "3",
      name: "Old Integration",
      key: "sk_live_stu901vwx234",
      secret: "sk_secret_yza567bcd890",
      scopes: ["trading"],
      created: "3 months ago",
      lastUsed: "Never",
      active: false,
    },
  ]);

  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [newKeyName, setNewKeyName] = useState("");

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;
    const newKey: APIKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `sk_live_${Math.random().toString(36).substr(2, 12)}`,
      secret: `sk_secret_${Math.random().toString(36).substr(2, 12)}`,
      scopes: ["trading", "portfolio"],
      created: "just now",
      lastUsed: "Never",
      active: true,
    };
    setApiKeys([newKey, ...apiKeys]);
    setNewKeyName("");
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id));
  };

  const handleCopyKey = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Keys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">
              {apiKeys.filter((k) => k.active).length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Ready to use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Keys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">{apiKeys.length}</div>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Rate Limit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">10K</div>
            <p className="text-xs text-gray-500 mt-1">Requests/hour</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New API Key</CardTitle>
          <CardDescription>Generate a new API key for your application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Key name (e.g., Trading Bot, Analytics)"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className="bg-gray-900 border-gray-700"
            />
            <Button
              onClick={handleCreateKey}
              disabled={!newKeyName.trim()}
              className="bg-purple-600 hover:bg-purple-700 px-4"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            API keys provide programmatic access to your SkyCoin444 account. Keep them secret!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>Manage and monitor your API keys</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="p-4 border border-gray-700 rounded-lg hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-purple-400" />
                    <h3 className="font-semibold text-sm">{apiKey.name}</h3>
                    <Badge
                      className={`text-xs ${
                        apiKey.active
                          ? "bg-green-600 text-white"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {apiKey.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => handleDeleteKey(apiKey.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2 mb-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Public Key</p>
                    <div className="flex gap-2">
                      <Input
                        value={apiKey.key}
                        readOnly
                        className="bg-gray-900 border-gray-700 text-xs"
                      />
                      <Button
                        onClick={() => handleCopyKey(apiKey.key)}
                        variant="outline"
                        size="sm"
                        className="px-3"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 mb-1">Secret Key</p>
                    <div className="flex gap-2">
                      <Input
                        type={showSecrets[apiKey.id] ? "text" : "password"}
                        value={apiKey.secret}
                        readOnly
                        className="bg-gray-900 border-gray-700 text-xs"
                      />
                      <Button
                        onClick={() =>
                          setShowSecrets({
                            ...showSecrets,
                            [apiKey.id]: !showSecrets[apiKey.id],
                          })
                        }
                        variant="outline"
                        size="sm"
                        className="px-3"
                      >
                        {showSecrets[apiKey.id] ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        onClick={() => handleCopyKey(apiKey.secret)}
                        variant="outline"
                        size="sm"
                        className="px-3"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 p-3 bg-gray-900/50 rounded border border-gray-700">
                  <div>
                    <p className="text-xs text-gray-400">Scopes</p>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {apiKey.scopes.map((scope) => (
                        <Badge key={scope} variant="outline" className="text-xs">
                          {scope}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Created</p>
                    <p className="text-xs font-semibold mt-1">{apiKey.created}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Last Used</p>
                    <p className="text-xs font-semibold mt-1">{apiKey.lastUsed}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm font-semibold mb-1">Base URL</p>
            <code className="text-xs bg-gray-900 p-2 rounded block">
              https://api.skycoin444.com/v1
            </code>
          </div>
          <div>
            <p className="text-sm font-semibold mb-1">Authentication</p>
            <code className="text-xs bg-gray-900 p-2 rounded block">
              Authorization: Bearer YOUR_API_KEY
            </code>
          </div>
          <Button variant="outline" className="w-full">
            View Full Documentation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
