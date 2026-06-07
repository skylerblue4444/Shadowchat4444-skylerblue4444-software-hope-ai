import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Lock, Gift, Zap } from "lucide-react";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  locked: boolean;
  action: string;
}

export default function Onboarding() {
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 1,
      title: "Complete Profile",
      description: "Add your profile picture and bio to personalize your account",
      reward: 100,
      completed: true,
      locked: false,
      action: "View Profile",
    },
    {
      id: 2,
      title: "First Trade",
      description: "Execute your first buy or sell order on the trading dashboard",
      reward: 250,
      completed: true,
      locked: false,
      action: "Trade Now",
    },
    {
      id: 3,
      title: "Join Community",
      description: "Create your first post on the social feed to share insights",
      reward: 150,
      completed: true,
      locked: false,
      action: "Post Now",
    },
    {
      id: 4,
      title: "Enable 2FA",
      description: "Secure your account with two-factor authentication",
      reward: 200,
      completed: false,
      locked: false,
      action: "Enable",
    },
    {
      id: 5,
      title: "Deposit Funds",
      description: "Add funds to your account to start trading with real capital",
      reward: 300,
      completed: false,
      locked: false,
      action: "Deposit",
    },
    {
      id: 6,
      title: "Refer a Friend",
      description: "Invite a friend to join SkyCoin444 and earn rewards",
      reward: 500,
      completed: false,
      locked: false,
      action: "Refer",
    },
    {
      id: 7,
      title: "Stake Tokens",
      description: "Lock your tokens in a vault to earn staking rewards",
      reward: 400,
      completed: false,
      locked: true,
      action: "Stake",
    },
    {
      id: 8,
      title: "Reach Top 100",
      description: "Climb the leaderboard to the top 100 traders",
      reward: 1000,
      completed: false,
      locked: true,
      action: "Compete",
    },
  ]);

  const completedCount = steps.filter((s) => s.completed).length;
  const totalRewards = steps.filter((s) => s.completed).reduce((sum, s) => sum + s.reward, 0);
  const progress = (completedCount / steps.length) * 100;

  const handleCompleteStep = (id: number) => {
    setSteps(
      steps.map((step) =>
        step.id === id ? { ...step, completed: true } : step
      )
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle>Welcome to SkyCoin444!</CardTitle>
          <CardDescription>Complete tasks to unlock features and earn rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold">Progress</span>
                <span className="text-sm text-gray-400">
                  {completedCount} of {steps.length} completed
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-400">XP Earned</p>
                <p className="text-2xl font-bold text-purple-400">{totalRewards}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Tasks Completed</p>
                <p className="text-2xl font-bold text-green-400">{completedCount}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Remaining</p>
                <p className="text-2xl font-bold text-blue-400">{steps.length - completedCount}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <Card
            key={step.id}
            className={`transition-all ${
              step.completed
                ? "bg-green-900/10 border-green-500/30"
                : step.locked
                  ? "bg-gray-900/50 border-gray-700/50 opacity-60"
                  : "hover:border-purple-500/50"
            }`}
          >
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {step.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  ) : step.locked ? (
                    <Lock className="w-6 h-6 text-gray-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-500" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">
                      {index + 1}. {step.title}
                    </h3>
                    {step.completed && <Badge className="bg-green-600 text-white text-xs">Done</Badge>}
                    {step.locked && <Badge variant="outline" className="text-xs">Locked</Badge>}
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{step.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Gift className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs font-semibold text-yellow-400">+{step.reward} XP</span>
                    </div>

                    {!step.completed && (
                      <Button
                        onClick={() => handleCompleteStep(step.id)}
                        disabled={step.locked}
                        size="sm"
                        className={`${
                          step.locked
                            ? "bg-gray-700 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-700"
                        }`}
                      >
                        {step.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Pro Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-300">
            💡 Complete all onboarding tasks to unlock premium features and earn bonus XP
          </p>
          <p className="text-sm text-gray-300">
            🎯 Locked tasks will unlock as you progress through the earlier steps
          </p>
          <p className="text-sm text-gray-300">
            🏆 Your XP contributes to your leaderboard ranking and unlocks exclusive rewards
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
