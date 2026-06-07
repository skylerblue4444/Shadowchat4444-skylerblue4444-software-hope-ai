/**
 * 🛠️ FREE ENGINEER DEV MODE
 * Real-time system orchestration, swarm monitoring, and production controls
 */

import React, { useState, useEffect } from 'react';
import { trpc } from '../_core/trpc';

interface SwarmAgent {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'error';
  cpuUsage: number;
  memoryUsage: number;
  tasksCompleted: number;
}

interface SystemMetrics {
  uptime: number;
  requestsPerSecond: number;
  errorRate: number;
  activeUsers: number;
  databaseLatency: number;
}

export const EngineerDevMode: React.FC = () => {
  const [agents, setAgents] = useState<SwarmAgent[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(true);

  // Wire to backend tRPC endpoint
  const { data: swarmStatus } = trpc.swarm.getStatus.useQuery(undefined, {
    enabled: isMonitoring,
    refetchInterval: 1000, // Real-time updates every 1s
  });

  const { data: systemMetrics } = trpc.system.getMetrics.useQuery(undefined, {
    enabled: isMonitoring,
    refetchInterval: 2000,
  });

  useEffect(() => {
    if (swarmStatus) {
      setAgents(swarmStatus.agents);
    }
  }, [swarmStatus]);

  useEffect(() => {
    if (systemMetrics) {
      setMetrics(systemMetrics);
    }
  }, [systemMetrics]);

  const triggerNuclearCleanup = async () => {
    if (window.confirm('🚨 NUCLEAR CLEANUP: This will reset the repository to a clean state. Continue?')) {
      try {
        await trpc.admin.triggerNuclearCleanup.mutate();
        alert('✅ Nuclear cleanup initiated. Repository will be restored to clean state.');
      } catch (error) {
        alert('❌ Error: ' + (error as Error).message);
      }
    }
  };

  const toggleSwarmAgent = async (agentId: string) => {
    try {
      await trpc.swarm.toggleAgent.mutate({ agentId });
    } catch (error) {
      console.error('Failed to toggle agent:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🛠️ Engineer Dev Mode</h1>
          <p className="text-slate-400">Real-time system orchestration and production controls</p>
        </div>

        {/* System Metrics */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <MetricCard label="Uptime" value={`${(metrics.uptime / 3600).toFixed(2)}h`} />
            <MetricCard label="RPS" value={metrics.requestsPerSecond.toFixed(2)} />
            <MetricCard label="Error Rate" value={`${(metrics.errorRate * 100).toFixed(2)}%`} />
            <MetricCard label="Active Users" value={metrics.activeUsers.toString()} />
            <MetricCard label="DB Latency" value={`${metrics.databaseLatency.toFixed(0)}ms`} />
          </div>
        )}

        {/* Swarm Agents */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">🤖 12-Bot Swarm Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onToggle={() => toggleSwarmAgent(agent.id)}
              />
            ))}
          </div>
        </div>

        {/* Production Controls */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">⚙️ Production Controls</h2>
          <div className="space-y-3">
            <button
              onClick={triggerNuclearCleanup}
              className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition"
            >
              🚨 Nuclear Cleanup (Reset Repository)
            </button>
            <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition">
              📊 Export System Logs
            </button>
            <button className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition">
              ✅ Trigger Self-Healing Protocol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  label: string;
  value: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value }) => (
  <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
    <p className="text-slate-400 text-sm mb-1">{label}</p>
    <p className="text-white text-2xl font-bold">{value}</p>
  </div>
);

interface AgentCardProps {
  agent: SwarmAgent;
  onToggle: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onToggle }) => {
  const statusColor = {
    active: 'bg-green-500',
    idle: 'bg-yellow-500',
    error: 'bg-red-500',
  }[agent.status];

  return (
    <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-bold">{agent.name}</h3>
        <div className={`w-3 h-3 rounded-full ${statusColor}`} />
      </div>
      <div className="space-y-2 text-sm text-slate-300">
        <p>CPU: {agent.cpuUsage.toFixed(1)}%</p>
        <p>Memory: {agent.memoryUsage.toFixed(1)}%</p>
        <p>Tasks: {agent.tasksCompleted}</p>
      </div>
      <button
        onClick={onToggle}
        className="w-full mt-3 px-2 py-1 bg-slate-600 hover:bg-slate-500 text-white text-sm rounded transition"
      >
        Toggle
      </button>
    </div>
  );
};
