import React, { useState, useEffect } from 'react';
import { Activity, Zap, AlertCircle } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

interface PerformanceMetrics {
  fps: number;
  memory: number;
  renderTime: number;
  networkLatency: number;
}

export const PerformanceMonitor: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: 0,
    renderTime: 0,
    networkLatency: 0,
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const updateMetrics = () => {
      const currentTime = performance.now();
      frameCount++;

      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;

        // Get memory usage (if available)
        const memory = (performance as any).memory?.usedJSHeapSize
          ? Math.round(((performance as any).memory.usedJSHeapSize / 1048576) * 100) / 100
          : 0;

        // Get render time from PerformanceObserver
        const perfEntries = performance.getEntriesByType('measure');
        const renderTime = perfEntries.length > 0
          ? Math.round(perfEntries[perfEntries.length - 1].duration * 100) / 100
          : 0;

        setMetrics(prev => ({
          ...prev,
          fps,
          memory,
          renderTime,
        }));
      }

      requestAnimationFrame(updateMetrics);
    };

    const animationId = requestAnimationFrame(updateMetrics);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const getHealthStatus = () => {
    if (metrics.fps >= 50) return 'healthy';
    if (metrics.fps >= 30) return 'warning';
    return 'critical';
  };

  const healthColor = {
    healthy: 'text-green-400 bg-green-500/10',
    warning: 'text-yellow-400 bg-yellow-500/10',
    critical: 'text-red-400 bg-red-500/10',
  }[getHealthStatus()];

  return (
    <>
      {/* Performance Monitor Toggle */}
      <button
        onClick={() => setShow(!show)}
        className="fixed top-6 right-20 z-40 p-2 hover:bg-slate-900 rounded-none transition-all"
        title="Performance Monitor"
      >
        <Activity className={`h-5 w-5 ${healthColor.split(' ')[0]}`} />
      </button>

      {/* Performance Panel */}
      {show && (
        <div className={`fixed top-20 right-6 w-64 bg-slate-900 border ${
          getHealthStatus() === 'healthy' ? 'border-green-500/30' :
          getHealthStatus() === 'warning' ? 'border-yellow-500/30' :
          'border-red-500/30'
        } rounded-none p-4 space-y-3 z-40 font-mono text-[9px]`}>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 uppercase">Performance</span>
            <span className={`px-2 py-0.5 rounded-none text-[8px] uppercase font-bold ${healthColor}`}>
              {getHealthStatus()}
            </span>
          </div>

          {/* FPS */}
          <div className="space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>FPS</span>
              <span className={metrics.fps >= 50 ? 'text-green-400' : metrics.fps >= 30 ? 'text-yellow-400' : 'text-red-400'}>
                {metrics.fps}
              </span>
            </div>
            <div className="h-1 bg-slate-800 rounded-none overflow-hidden">
              <div
                className={`h-full transition-all ${
                  metrics.fps >= 50 ? 'bg-green-500' : metrics.fps >= 30 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(metrics.fps / 60 * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Memory */}
          {metrics.memory > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Memory</span>
                <span className="text-blue-400">{metrics.memory} MB</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-none overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${Math.min(metrics.memory / 100 * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Render Time */}
          {metrics.renderTime > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Render</span>
                <span className="text-purple-400">{metrics.renderTime.toFixed(2)}ms</span>
              </div>
            </div>
          )}

          {/* Status */}
          {getHealthStatus() !== 'healthy' && (
            <div className="flex items-center gap-2 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-none">
              <AlertCircle className="h-3 w-3 text-yellow-400 flex-shrink-0" />
              <span className="text-[8px] text-yellow-400">
                {getHealthStatus() === 'warning' ? 'Performance degrading' : 'Critical performance issues'}
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PerformanceMonitor;
