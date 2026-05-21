import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  BarChart3,
  AlertCircle,
  Shield,
  Trash2,
  CheckCircle,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function AdminDashboardLive() {
  const [metrics, setMetrics] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [moderationQueue, setModerationQueue] = useState([]);
  const [auditLog, setAuditLog] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch metrics
  const { data: metricsData } = trpc.admin.getMetrics.useQuery();

  // Fetch users
  const { data: usersData } = trpc.admin.getUsers.useQuery({
    limit: 50,
    offset: 0,
  });

  // Fetch moderation queue
  const { data: modQueueData } = trpc.admin.getModerationQueue.useQuery({
    status: "pending",
    limit: 50,
  });

  // Fetch audit log
  const { data: auditLogData } = trpc.admin.getAuditLog.useQuery({
    limit: 100,
    offset: 0,
  });

  // Mutations
  const updateRoleMutation = trpc.admin.updateUserRole.useMutation();
  const updateModerationMutation =
    trpc.admin.updateModerationStatus.useMutation();
  const banUserMutation = trpc.admin.banUser.useMutation();

  useEffect(() => {
    if (metricsData) {
      setMetrics(metricsData);
      setLoading(false);
    }
  }, [metricsData]);

  useEffect(() => {
    if (usersData) {
      setAllUsers(usersData);
    }
  }, [usersData]);

  useEffect(() => {
    if (modQueueData) {
      setModerationQueue(modQueueData);
    }
  }, [modQueueData]);

  useEffect(() => {
    if (auditLogData) {
      setAuditLog(auditLogData);
    }
  }, [auditLogData]);

  async function handleBanUser(userId, reason) {
    try {
      await banUserMutation.mutateAsync({
        userId,
        reason,
      });
      alert("User banned successfully");
    } catch (error) {
      console.error("Error banning user:", error);
    }
  }

  async function handleUpdateModeration(reportId, status) {
    try {
      await updateModerationMutation.mutateAsync({
        reportId,
        status,
      });
    } catch (error) {
      console.error("Error updating moderation:", error);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1a1a2e,#09090b_45%)] p-6 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-zinc-400">Loading admin dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1a1a2e,#09090b_45%)] p-6 text-white">
      <section className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-red-400/30 bg-black/45 p-8 shadow-2xl shadow-red-500/10">
          <Badge className="mb-4 border-red-400/40 bg-red-400/10 text-red-200">
            Admin Only
          </Badge>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            Platform Admin Dashboard
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-zinc-300 md:text-base">
            Monitor platform metrics, manage users, review moderation queue, and
            audit all admin actions.
          </p>
        </div>

        {/* Platform Metrics */}
        {metrics && (
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-blue-400/20 bg-blue-950/30 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Users className="h-5 w-5 text-blue-400" />
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black text-blue-400">
                  {metrics.totalUsers}
                </p>
              </CardContent>
            </Card>

            <Card className="border-pink-400/20 bg-pink-950/30 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <BarChart3 className="h-5 w-5 text-pink-400" />
                  Dating Profiles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black text-pink-400">
                  {metrics.activeDatingProfiles}
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-400/20 bg-emerald-950/30 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <BarChart3 className="h-5 w-5 text-emerald-400" />
                  Marketplace Listings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black text-emerald-400">
                  {metrics.activeMarketplaceListings}
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-400/20 bg-purple-950/30 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <BarChart3 className="h-5 w-5 text-purple-400" />
                  Livestream Channels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black text-purple-400">
                  {metrics.livestreamChannels}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Moderation Queue */}
        {moderationQueue.length > 0 && (
          <Card className="border-orange-400/20 bg-orange-950/30 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-orange-400" />
                Moderation Queue ({moderationQueue.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {moderationQueue.slice(0, 10).map(report => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between rounded-lg border border-orange-400/20 bg-orange-400/5 p-4"
                  >
                    <div>
                      <p className="font-semibold text-orange-300">
                        Report #{report.id}
                      </p>
                      <p className="text-sm text-zinc-400">
                        User {report.reportedUserId} -{" "}
                        {report.reportedContentType}
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        {report.reason}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() =>
                          handleUpdateModeration(report.id, "actioned")
                        }
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4" /> Action
                      </Button>
                      <Button
                        onClick={() =>
                          handleUpdateModeration(report.id, "dismissed")
                        }
                        size="sm"
                        variant="outline"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* User Management */}
        {allUsers.length > 0 && (
          <Card className="border-cyan-400/20 bg-cyan-950/30 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-cyan-400" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-cyan-400/20">
                      <th className="text-left py-2 px-3">User ID</th>
                      <th className="text-left py-2 px-3">Name</th>
                      <th className="text-left py-2 px-3">Email</th>
                      <th className="text-left py-2 px-3">Role</th>
                      <th className="text-left py-2 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.slice(0, 10).map(user => (
                      <tr
                        key={user.id}
                        className="border-b border-cyan-400/10 hover:bg-cyan-400/5"
                      >
                        <td className="py-2 px-3">{user.id}</td>
                        <td className="py-2 px-3">{user.name || "—"}</td>
                        <td className="py-2 px-3 text-xs">
                          {user.email || "—"}
                        </td>
                        <td className="py-2 px-3">
                          <Badge
                            className={
                              user.role === "admin"
                                ? "bg-red-600"
                                : "bg-zinc-600"
                            }
                          >
                            {user.role}
                          </Badge>
                        </td>
                        <td className="py-2 px-3">
                          <div className="flex gap-2">
                            <Button
                              onClick={() =>
                                handleBanUser(user.id, "Admin action")
                              }
                              size="sm"
                              variant="outline"
                              className="text-xs"
                            >
                              Ban
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Audit Log */}
        {auditLog.length > 0 && (
          <Card className="border-gray-400/20 bg-gray-950/30 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-gray-400" />
                Audit Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {auditLog.slice(0, 20).map(entry => (
                  <div
                    key={entry.id}
                    className="text-xs border-l-2 border-gray-400/20 pl-3 py-1"
                  >
                    <p className="font-semibold text-gray-300">
                      {entry.action}
                    </p>
                    <p className="text-zinc-500">
                      Admin {entry.adminId} {entry.details}
                    </p>
                    <p className="text-zinc-600">
                      {new Date(entry.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
}
