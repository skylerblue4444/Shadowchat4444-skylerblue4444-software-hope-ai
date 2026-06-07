import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { i18n, Language } from '@/lib/i18n/localization';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

export const LanguageSelector: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = React.useState<Language>(i18n.getLanguage());

  const languages: { code: Language; name: string; flag: string; nativeName: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
  ];

  const handleLanguageChange = (lang: Language) => {
    i18n.setLanguage(lang);
    setCurrent(lang);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-white text-[9px] font-mono uppercase transition-all rounded-none"
      >
        <Globe className="h-3 w-3" />
        {languages.find(l => l.code === current)?.flag}
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-slate-900 border border-slate-800 rounded-none shadow-xl z-50">
          <div className="p-2 space-y-1">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center justify-between px-3 py-2 text-[10px] font-mono uppercase border transition-all ${
                  current === lang.code
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{lang.flag}</span>
                  <div className="text-left">
                    <div className="text-[9px] font-bold">{lang.name}</div>
                    <div className="text-[8px] opacity-60">{lang.nativeName}</div>
                  </div>
                </div>
                {current === lang.code && <Check className="h-3 w-3" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
