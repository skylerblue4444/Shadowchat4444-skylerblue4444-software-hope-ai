import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Bell, Lock, Eye, Zap, LogOut, Download } from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    twoFactorEnabled: true,
    darkMode: true,
    orderNotifications: true,
    priceAlerts: true,
    socialNotifications: false,
  });

  const [profile, setProfile] = useState({
    name: "John Trader",
    email: "john@example.com",
    bio: "Crypto trader and analyst",
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Manage your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">Full Name</label>
            <Input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="bg-gray-900 border-gray-700"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Email</label>
            <Input
              value={profile.email}
              disabled
              className="bg-gray-900 border-gray-700 opacity-50"
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Bio</label>
            <Input
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Tell us about yourself..."
              className="bg-gray-900 border-gray-700"
            />
          </div>

          <Button className="bg-purple-600 hover:bg-purple-700 w-full">Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription>Control how you receive updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
            <div>
              <p className="text-sm font-semibold">Email Notifications</p>
              <p className="text-xs text-gray-400">Receive updates via email</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={() => handleToggle("emailNotifications")}
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
            <div>
              <p className="text-sm font-semibold">Push Notifications</p>
              <p className="text-xs text-gray-400">Browser push alerts</p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={() => handleToggle("pushNotifications")}
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
            <div>
              <p className="text-sm font-semibold">Order Notifications</p>
              <p className="text-xs text-gray-400">Get notified on trade execution</p>
            </div>
            <Switch
              checked={settings.orderNotifications}
              onCheckedChange={() => handleToggle("orderNotifications")}
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
            <div>
              <p className="text-sm font-semibold">Price Alerts</p>
              <p className="text-xs text-gray-400">Notify on price movements</p>
            </div>
            <Switch
              checked={settings.priceAlerts}
              onCheckedChange={() => handleToggle("priceAlerts")}
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
            <div>
              <p className="text-sm font-semibold">Social Notifications</p>
              <p className="text-xs text-gray-400">Updates on posts and messages</p>
            </div>
            <Switch
              checked={settings.socialNotifications}
              onCheckedChange={() => handleToggle("socialNotifications")}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security
          </CardTitle>
          <CardDescription>Protect your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
            <div>
              <p className="text-sm font-semibold">Two-Factor Authentication</p>
              <p className="text-xs text-gray-400">
                {settings.twoFactorEnabled ? "Enabled" : "Disabled"}
              </p>
            </div>
            <Badge className={settings.twoFactorEnabled ? "bg-green-600" : "bg-gray-600"}>
              {settings.twoFactorEnabled ? "Active" : "Inactive"}
            </Badge>
          </div>

          <Button variant="outline" className="w-full">
            <Lock className="w-4 h-4 mr-2" />
            Change Password
          </Button>

          <Button variant="outline" className="w-full">
            <Eye className="w-4 h-4 mr-2" />
            View Active Sessions
          </Button>

          <Button variant="outline" className="w-full">
            <Zap className="w-4 h-4 mr-2" />
            Manage API Keys
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
            <div>
              <p className="text-sm font-semibold">Dark Mode</p>
              <p className="text-xs text-gray-400">Use dark theme</p>
            </div>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={() => handleToggle("darkMode")}
            />
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Chart Theme</p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="border-purple-500 bg-purple-600/20">
                Dark
              </Button>
              <Button variant="outline">Light</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data & Privacy</CardTitle>
          <CardDescription>Manage your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download My Data
          </Button>

          <Button variant="outline" className="w-full">
            <Zap className="w-4 h-4 mr-2" />
            View Privacy Policy
          </Button>

          <Button variant="outline" className="w-full">
            <Zap className="w-4 h-4 mr-2" />
            View Terms of Service
          </Button>
        </CardContent>
      </Card>

      <Card className="border-red-500/30 bg-red-900/10">
        <CardHeader>
          <CardTitle className="text-red-400">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full text-red-400 border-red-500/50 hover:bg-red-900/20">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out All Devices
          </Button>

          <Button variant="outline" className="w-full text-red-400 border-red-500/50 hover:bg-red-900/20">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
