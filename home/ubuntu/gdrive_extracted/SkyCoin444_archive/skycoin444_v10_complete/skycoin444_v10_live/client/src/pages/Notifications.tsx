import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Trash2, Archive, Check } from "lucide-react";

interface Notification {
  id: string;
  type: "trade" | "price" | "social" | "system" | "achievement";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "trade",
      title: "Trade Executed",
      message: "Your buy order for 1000 SKY @ $0.0450 has been executed",
      timestamp: "2 minutes ago",
      read: false,
      icon: "📈",
    },
    {
      id: "2",
      type: "price",
      title: "Price Alert",
      message: "SKY has reached your target price of $0.0500",
      timestamp: "15 minutes ago",
      read: false,
      icon: "🔔",
    },
    {
      id: "3",
      type: "social",
      title: "New Like",
      message: "CryptoKing liked your post about market trends",
      timestamp: "1 hour ago",
      read: true,
      icon: "❤️",
    },
    {
      id: "4",
      type: "achievement",
      title: "Achievement Unlocked!",
      message: "You've earned the 'Day Trader' badge! +500 XP",
      timestamp: "3 hours ago",
      read: true,
      icon: "🏆",
    },
    {
      id: "5",
      type: "system",
      title: "Maintenance Alert",
      message: "Scheduled maintenance on Tuesday 2-4 AM UTC",
      timestamp: "1 day ago",
      read: true,
      icon: "⚙️",
    },
    {
      id: "6",
      type: "trade",
      title: "Order Cancelled",
      message: "Your sell order for 500 SKY has been cancelled",
      timestamp: "2 days ago",
      read: true,
      icon: "❌",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const typeColors: Record<string, string> = {
    trade: "bg-blue-600",
    price: "bg-green-600",
    social: "bg-pink-600",
    achievement: "bg-yellow-600",
    system: "bg-gray-600",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-400 mt-1">
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button onClick={handleMarkAllAsRead} variant="outline" size="sm">
            Mark all as read
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">{notifications.length}</div>
            <p className="text-xs text-gray-500 mt-1">All notifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Unread</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">{unreadCount}</div>
            <p className="text-xs text-gray-500 mt-1">Waiting for you</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">3</div>
            <p className="text-xs text-gray-500 mt-1">New today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">12</div>
            <p className="text-xs text-gray-500 mt-1">This week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
          <CardDescription>Your recent alerts and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  notification.read
                    ? "border-gray-700 bg-gray-900/30"
                    : "border-purple-500/50 bg-purple-900/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl flex-shrink-0 ${
                      typeColors[notification.type]
                    }`}
                  >
                    {notification.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{notification.title}</h3>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          notification.type === "trade"
                            ? "border-blue-500 text-blue-400"
                            : notification.type === "price"
                              ? "border-green-500 text-green-400"
                              : notification.type === "social"
                                ? "border-pink-500 text-pink-400"
                                : notification.type === "achievement"
                                  ? "border-yellow-500 text-yellow-400"
                                  : "border-gray-500 text-gray-400"
                        }`}
                      >
                        {notification.type.toUpperCase()}
                      </Badge>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-300 mb-1">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.timestamp}</p>
                  </div>

                  <div className="flex gap-1 flex-shrink-0">
                    {!notification.read && (
                      <Button
                        onClick={() => handleMarkAsRead(notification.id)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-gray-300"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDelete(notification.id)}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Customize what notifications you receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
            <div>
              <p className="text-sm font-semibold">Trade Notifications</p>
              <p className="text-xs text-gray-400">Get alerts on order execution</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
            <div>
              <p className="text-sm font-semibold">Price Alerts</p>
              <p className="text-xs text-gray-400">Notify when prices reach targets</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
            <div>
              <p className="text-sm font-semibold">Social Updates</p>
              <p className="text-xs text-gray-400">Likes, replies, and mentions</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
            <div>
              <p className="text-sm font-semibold">Achievement Unlocks</p>
              <p className="text-xs text-gray-400">Badge and XP milestones</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
            <div>
              <p className="text-sm font-semibold">System Alerts</p>
              <p className="text-xs text-gray-400">Maintenance and important updates</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <Button className="w-full bg-purple-600 hover:bg-purple-700 mt-4">
            Save Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
