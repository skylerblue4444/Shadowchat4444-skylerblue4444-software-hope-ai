import React, { useState } from 'react';
import { Settings, Moon, Volume2, Zap, Palette, X } from 'lucide-react';
import { PolishEngine } from '@/lib/polish/GlobalPolishEngine';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

export const SettingsPanel: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState(PolishEngine.getConfig());

  const handleToggle = (key: keyof typeof config) => {
    const newConfig = { ...config, [key]: !config[key] };
    setConfig(newConfig);
    PolishEngine.updateConfig(newConfig);
  };

  const handleAnimationSpeed = (speed: 'slow' | 'normal' | 'fast') => {
    const newConfig = { ...config, animationSpeed: speed };
    setConfig(newConfig);
    PolishEngine.updateConfig(newConfig);
  };

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-6 right-6 z-40 p-2 hover:bg-slate-900 rounded-none transition-all"
      >
        <Settings className="h-5 w-5 text-slate-400 hover:text-amber-500" />
      </button>

      {/* Settings Panel */}
      {open && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-none max-w-md w-full p-6 space-y-6 max-h-96 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-white uppercase">Settings</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-slate-800 rounded-none transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase">Language</label>
              <LanguageSelector />
            </div>

            {/* Animations */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-slate-400 uppercase flex items-center gap-2">
                <Zap className="h-3 w-3" /> Animations
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.enableAnimations}
                    onChange={() => handleToggle('enableAnimations')}
                    className="w-4 h-4"
                  />
                  <span className="text-[10px] text-slate-400">Enable Animations</span>
                </label>
                {config.enableAnimations && (
                  <div className="flex gap-2">
                    {['slow', 'normal', 'fast'].map(speed => (
                      <button
                        key={speed}
                        onClick={() => handleAnimationSpeed(speed as any)}
                        className={`flex-1 px-2 py-1 text-[9px] font-mono uppercase border transition-all ${
                          config.animationSpeed === speed
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        {speed}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sound Effects */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.enableSoundEffects}
                onChange={() => handleToggle('enableSoundEffects')}
                className="w-4 h-4"
              />
              <Volume2 className="h-3 w-3 text-slate-400" />
              <span className="text-[10px] text-slate-400">Sound Effects</span>
            </label>

            {/* Particles */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.enableParticles}
                onChange={() => handleToggle('enableParticles')}
                className="w-4 h-4"
              />
              <Palette className="h-3 w-3 text-slate-400" />
              <span className="text-[10px] text-slate-400">Particle Effects</span>
            </label>

            {/* Visual Effects */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.enableGlassEffect}
                  onChange={() => handleToggle('enableGlassEffect')}
                  className="w-4 h-4"
                />
                <span className="text-[10px] text-slate-400">Glass Effect</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.enableBlur}
                  onChange={() => handleToggle('enableBlur')}
                  className="w-4 h-4"
                />
                <span className="text-[10px] text-slate-400">Blur Effects</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.enableShadows}
                  onChange={() => handleToggle('enableShadows')}
                  className="w-4 h-4"
                />
                <span className="text-[10px] text-slate-400">Shadows</span>
              </label>
            </div>

            {/* Theme */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase flex items-center gap-2">
                <Moon className="h-3 w-3" /> Theme
              </label>
              <div className="flex gap-2">
                {['dark', 'light', 'auto'].map(theme => (
                  <button
                    key={theme}
                    onClick={() => PolishEngine.setTheme(theme as any)}
                    className={`flex-1 px-2 py-1 text-[9px] font-mono uppercase border transition-all ${
                      config.theme === theme
                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsPanel;
