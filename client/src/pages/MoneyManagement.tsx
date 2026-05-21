import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowRight,
  Plus,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function MoneyManagement() {
  const [metrics, setMetrics] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("50");
  const [loading, setLoading] = useState(true);

  // Fetch financial metrics
  const { data: metricsData } = trpc.payments.getMetrics.useQuery();

  // Fetch payment history
  const { data: historyData } = trpc.payments.getPaymentHistory.useQuery({
    limit: 10,
    offset: 0,
  });

  // Fetch subscription
  const { data: subscriptionData } = trpc.payments.getSubscription.useQuery();

  // Mutations
  const createPaymentMutation = trpc.payments.createPayment.useMutation();
  const createSubscriptionMutation =
    trpc.payments.createSubscription.useMutation();
  const cancelSubscriptionMutation =
    trpc.payments.cancelSubscription.useMutation();

  useEffect(() => {
    if (metricsData) {
      setMetrics(metricsData);
      setLoading(false);
    }
  }, [metricsData]);

  useEffect(() => {
    if (historyData) {
      setPaymentHistory(historyData);
    }
  }, [historyData]);

  useEffect(() => {
    if (subscriptionData) {
      setSubscription(subscriptionData);
    }
  }, [subscriptionData]);

  async function handleCreatePayment() {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) return;
    try {
      const result = await createPaymentMutation.mutateAsync({
        amount: parseFloat(paymentAmount),
        currency: "USD",
        description: "Platform deposit",
      });

      // In a real app, you'd open Stripe Elements here
      alert(`Payment intent created: ${result.paymentIntentId}`);
      setPaymentAmount("50");
      setShowPaymentForm(false);
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  }

  async function handleCreateSubscription(plan: string, priceId: string) {
    try {
      await createSubscriptionMutation.mutateAsync({
        priceId,
        plan: plan as any,
      });
      alert(`Subscription created: ${plan}`);
    } catch (error) {
      console.error("Error creating subscription:", error);
    }
  }

  async function handleCancelSubscription() {
    if (!subscription) return;
    try {
      await cancelSubscriptionMutation.mutateAsync({
        subscriptionId: subscription.stripeSubscriptionId,
      });
      alert("Subscription canceled");
    } catch (error) {
      console.error("Error canceling subscription:", error);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1a2a3a,#09090b_45%)] p-6 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-zinc-400">Loading wallet...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1a2a3a,#09090b_45%)] p-6 text-white">
      <section className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-blue-400/30 bg-black/45 p-8 shadow-2xl shadow-blue-500/10">
          <Badge className="mb-4 border-blue-400/40 bg-blue-400/10 text-blue-200">
            Money Management
          </Badge>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            Financial Dashboard
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-zinc-300 md:text-base">
            Manage payments, subscriptions, and track your financial activity
            with secure Stripe integration.
          </p>
        </div>

        {/* Financial Overview */}
        {metrics && (
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-green-400/20 bg-green-950/30 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Total Earned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black text-green-400">
                  ${parseFloat(metrics.totalEarned).toFixed(2)}
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-400/20 bg-red-950/30 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <TrendingDown className="h-5 w-5 text-red-400" />
                  Total Spent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black text-red-400">
                  ${parseFloat(metrics.totalSpent).toFixed(2)}
                </p>
              </CardContent>
            </Card>

            <Card className="border-yellow-400/20 bg-yellow-950/30 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Wallet className="h-5 w-5 text-yellow-400" />
                  Refunded
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black text-yellow-400">
                  ${parseFloat(metrics.totalRefunded).toFixed(2)}
                </p>
              </CardContent>
            </Card>

            <Card className="border-cyan-400/20 bg-cyan-950/30 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <CreditCard className="h-5 w-5 text-cyan-400" />
                  Subscription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black text-cyan-400">
                  {metrics.activeSubscription ? "Active" : "None"}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Payment */}
        {showPaymentForm && (
          <Card className="border-blue-400/20 bg-blue-950/30 text-white">
            <CardHeader>
              <CardTitle>Make a Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={e => setPaymentAmount(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
                  placeholder="50.00"
                  min="0.50"
                  step="0.01"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleCreatePayment}
                  disabled={createPaymentMutation.isPending}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {createPaymentMutation.isPending
                    ? "Processing..."
                    : "Create Payment"}
                </Button>
                <Button
                  onClick={() => setShowPaymentForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-blue-400/20 bg-blue-950/30 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-400" />
                Make Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-300 mb-4">
                Add funds to your account with secure Stripe payment processing.
              </p>
              <Button
                onClick={() => setShowPaymentForm(true)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <DollarSign className="mr-2 h-4 w-4" /> Add Funds
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-400/20 bg-purple-950/30 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-purple-400" />
                Subscriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {subscription ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-zinc-400">Current Plan</p>
                    <p className="text-lg font-bold capitalize">
                      {subscription.plan}
                    </p>
                  </div>
                  <Button
                    onClick={handleCancelSubscription}
                    disabled={cancelSubscriptionMutation.isPending}
                    variant="outline"
                    className="w-full text-red-400 border-red-400/30 hover:bg-red-950/30"
                  >
                    {cancelSubscriptionMutation.isPending
                      ? "Canceling..."
                      : "Cancel Subscription"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-zinc-300 mb-3">
                    Choose a subscription plan:
                  </p>
                  <Button
                    onClick={() =>
                      handleCreateSubscription("starter", "price_starter_test")
                    }
                    size="sm"
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Starter - $9.99/mo
                  </Button>
                  <Button
                    onClick={() =>
                      handleCreateSubscription("pro", "price_pro_test")
                    }
                    size="sm"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Pro - $29.99/mo
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Payment History */}
        {paymentHistory.length > 0 && (
          <Card className="border-gray-400/20 bg-gray-950/30 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5 text-gray-400" />
                Payment History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {paymentHistory.map(payment => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between rounded-lg border border-gray-400/20 bg-gray-400/5 p-3"
                  >
                    <div>
                      <p className="font-semibold text-gray-300">
                        ${parseFloat(payment.amount).toFixed(2)}{" "}
                        {payment.currency}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      className={
                        payment.status === "succeeded"
                          ? "bg-green-600"
                          : payment.status === "failed"
                            ? "bg-red-600"
                            : "bg-yellow-600"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Notice */}
        <Card className="border-amber-400/20 bg-amber-950/30 text-white">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <div className="text-amber-400">⚠️</div>
              <div>
                <p className="font-semibold text-amber-300 mb-1">
                  Secure Payment Processing
                </p>
                <p className="text-sm text-amber-100">
                  All payments are processed securely through Stripe. Your
                  payment information is never stored on our servers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
