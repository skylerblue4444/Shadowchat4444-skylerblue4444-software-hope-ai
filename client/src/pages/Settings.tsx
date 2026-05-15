import { useState } from "react";
import {
  Settings as SettingsIcon, User, Shield, Bell, Eye, Palette,
  Globe, CreditCard, LogOut, Trash2, Camera, Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const SECTIONS = [
  { id: "account", label: "Account", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy", icon: Eye },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "language", label: "Language & Region", icon: Globe },
  { id: "billing", label: "Billing", icon: CreditCard },
];

const LANGUAGES = ["English", "中文 (Chinese)", "Español", "Français", "Deutsch", "日本語", "한국어", "Русский", "العربية", "हिन्दी"];
const THEMES = ["Dark", "Light", "Midnight", "Cyber", "ShadowBlue", "TRUMP Red"];

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={`relative h-6 w-11 rounded-full transition-colors ${value ? "bg-blue-600" : "bg-muted"}`}>
      <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

export default function Settings() {
  const [activeSection, setActiveSection] = useState("account");
  const [profile, setProfile] = useState({ username: "SkyBlue_Trader", email: "skylerblue4444@gmail.com", phone: "479-406-7123", bio: "Founder of SkyBlue IT Resolutions & ShadowChat" });
  const [notifications, setNotifications] = useState({ push: true, email: true, sms: false, trades: true, messages: true, news: false, charity: true, nft: true });
  const [privacy, setPrivacy] = useState({ profilePublic: true, showPortfolio: false, showActivity: true, allowDMs: true, twoFactor: true });
  const [appearance, setAppearance] = useState({ theme: "Dark", fontSize: "Medium", animations: true, compactMode: false });
  const [language, setLanguage] = useState("English");

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2"><SettingsIcon className="h-6 w-6 text-gray-400" />Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your ShadowChat account and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Sidebar */}
        <div className="space-y-1">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveSection(id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${activeSection === id ? "bg-blue-600 text-white" : "text-muted-foreground hover:bg-muted"}`}>
              <Icon className="h-4 w-4 shrink-0" />{label}
            </button>
          ))}
          <div className="pt-2 border-t border-border/30">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors" onClick={() => toast.error("Logging out...")}>
              <LogOut className="h-4 w-4" />Sign Out
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          {activeSection === "account" && (
            <Card className="border-border/50">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">Account Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-4xl">⚡</div>
                    <button className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-blue-600 flex items-center justify-center" onClick={() => toast.info("Upload photo")}>
                      <Camera className="h-3.5 w-3.5 text-white" />
                    </button>
                  </div>
                  <div>
                    <p className="font-black">{profile.username}</p>
                    <p className="text-sm text-muted-foreground">SKY4444 Holder · Genesis Pass #1337</p>
                    <Badge className="mt-1 text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">💎 Diamond Member</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Username</label>
                    <Input value={profile.username} onChange={e => setProfile(p => ({ ...p, username: e.target.value }))} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Email</label>
                    <Input value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} className="mt-1" type="email" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Phone</label>
                  <Input value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} className="mt-1" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Bio</label>
                  <Input value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} className="mt-1" />
                </div>
                <Button className="bg-blue-600 text-white border-0 font-bold" onClick={() => toast.success("Profile updated!")}>Save Changes</Button>
              </CardContent>
            </Card>
          )}

          {activeSection === "security" && (
            <div className="space-y-4">
              <Card className="border-border/50">
                <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">Security Settings</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: "Two-Factor Authentication", desc: "Protect your account with 2FA", action: () => setPrivacy(p => ({ ...p, twoFactor: !p.twoFactor })), toggle: true, value: privacy.twoFactor },
                    { label: "Biometric Login", desc: "Use Face ID or fingerprint", action: () => toast.info("Setting up biometrics..."), toggle: false },
                    { label: "Change Password", desc: "Last changed 30 days ago", action: () => toast.info("Sending password reset email..."), toggle: false },
                    { label: "Active Sessions", desc: "3 devices logged in", action: () => toast.success("All other sessions terminated"), toggle: false },
                  ].map(({ label, desc, action, toggle, value }) => (
                    <div key={label} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                      <div><p className="font-medium text-sm">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
                      {toggle ? <Toggle value={value as boolean} onChange={action} /> : <Button size="sm" variant="outline" className="h-7 text-xs" onClick={action}>Manage</Button>}
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="border-red-500/20 bg-red-500/3">
                <CardContent className="py-4">
                  <p className="font-bold text-sm text-red-400 mb-2">Danger Zone</p>
                  <Button className="bg-red-600 text-white border-0 text-xs" size="sm" onClick={() => toast.error("Account deletion requires email confirmation")}>
                    <Trash2 className="h-3.5 w-3.5 mr-1.5" />Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "notifications" && (
            <Card className="border-border/50">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">Notification Preferences</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {([
                  { key: "push", label: "Push Notifications", desc: "Browser and mobile push" },
                  { key: "email", label: "Email Notifications", desc: "Sent to skylerblue4444@gmail.com" },
                  { key: "sms", label: "SMS Notifications", desc: "Sent to 479-406-7123" },
                  { key: "trades", label: "Trade Alerts", desc: "Order fills and price alerts" },
                  { key: "messages", label: "New Messages", desc: "DMs and group chats" },
                  { key: "news", label: "Crypto News", desc: "Market updates and news" },
                  { key: "charity", label: "Charity Updates", desc: "Donation milestones and campaigns" },
                  { key: "nft", label: "NFT Activity", desc: "Drops, bids, and sales" },
                ] as const).map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                    <div><p className="font-medium text-sm">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
                    <Toggle value={notifications[key]} onChange={() => setNotifications(p => ({ ...p, [key]: !p[key] }))} />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeSection === "privacy" && (
            <Card className="border-border/50">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">Privacy Controls</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {([
                  { key: "profilePublic", label: "Public Profile", desc: "Anyone can view your profile" },
                  { key: "showPortfolio", label: "Show Portfolio", desc: "Display your crypto holdings publicly" },
                  { key: "showActivity", label: "Show Activity", desc: "Show your trading and social activity" },
                  { key: "allowDMs", label: "Allow Direct Messages", desc: "Let anyone send you messages" },
                ] as const).map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                    <div><p className="font-medium text-sm">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
                    <Toggle value={privacy[key] as boolean} onChange={() => setPrivacy(p => ({ ...p, [key]: !p[key as keyof typeof p] }))} />
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2" onClick={() => toast.info("Downloading your data...")}>
                  <Download className="h-4 w-4 mr-2" />Download My Data
                </Button>
              </CardContent>
            </Card>
          )}

          {activeSection === "appearance" && (
            <Card className="border-border/50">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">Appearance</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Theme</p>
                  <div className="grid grid-cols-3 gap-2">
                    {THEMES.map(theme => (
                      <button key={theme} onClick={() => { setAppearance(p => ({ ...p, theme })); toast.success(`Theme: ${theme}`); }} className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${appearance.theme === theme ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-border/30 text-muted-foreground"}`}>{theme}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Font Size</p>
                  <div className="flex gap-2">
                    {["Small", "Medium", "Large"].map(size => (
                      <button key={size} onClick={() => setAppearance(p => ({ ...p, fontSize: size }))} className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-all ${appearance.fontSize === size ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-border/30 text-muted-foreground"}`}>{size}</button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div><p className="font-medium text-sm">Animations</p><p className="text-xs text-muted-foreground">Enable motion effects</p></div>
                  <Toggle value={appearance.animations} onChange={() => setAppearance(p => ({ ...p, animations: !p.animations }))} />
                </div>
                <div className="flex items-center justify-between">
                  <div><p className="font-medium text-sm">Compact Mode</p><p className="text-xs text-muted-foreground">Denser layout</p></div>
                  <Toggle value={appearance.compactMode} onChange={() => setAppearance(p => ({ ...p, compactMode: !p.compactMode }))} />
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "language" && (
            <Card className="border-border/50">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">Language & Region</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">Display Language</label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {LANGUAGES.map(lang => (
                      <button key={lang} onClick={() => { setLanguage(lang); toast.success(`Language: ${lang}`); }} className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all text-left ${language === lang ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-border/30 text-muted-foreground"}`}>{lang}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Timezone</label>
                  <select className="w-full mt-1 px-3 py-2 rounded-xl bg-muted border border-border/50 text-sm">
                    <option>America/Chicago (CDT)</option>
                    <option>America/New_York (EDT)</option>
                    <option>UTC</option>
                    <option>Asia/Shanghai (CST)</option>
                    <option>Europe/London (BST)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Currency Display</label>
                  <select className="w-full mt-1 px-3 py-2 rounded-xl bg-muted border border-border/50 text-sm">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                    <option>CNY (¥)</option>
                    <option>BTC (₿)</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "billing" && (
            <div className="space-y-4">
              <Card className="border-border/50">
                <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">Current Plan</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                    <span className="text-3xl">💎</span>
                    <div className="flex-1">
                      <p className="font-black">Diamond Plan</p>
                      <p className="text-xs text-muted-foreground">All features unlocked · Genesis Pass holder</p>
                    </div>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Active</Badge>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">Payment Methods</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { type: "Visa", last4: "4444", expiry: "12/27", isDefault: true },
                    { type: "SKY4444 Wallet", last4: "...4444", expiry: "N/A", isDefault: false },
                  ].map((pm, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-muted/20">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{pm.type} ···· {pm.last4}</p>
                        <p className="text-xs text-muted-foreground">Expires {pm.expiry}</p>
                      </div>
                      {pm.isDefault && <Badge className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/20">Default</Badge>}
                    </div>
                  ))}
                  <Button variant="outline" className="w-full h-8 text-xs mt-2" onClick={() => toast.info("Adding payment method...")}>+ Add Payment Method</Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
