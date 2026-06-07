import React, { useState, useEffect } from 'react';
import { HopeEngine, HopeState, HopeOutfit } from '@/lib/hope/HopeCompanion';
import { MessageCircle, Volume2, VolumeX, Zap, Heart, Settings, X, ChevronDown } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

export const HopeCompanion: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [state, setState] = useState<HopeState>(HopeEngine.getState());
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [outfits, setOutfits] = useState<HopeOutfit[]>(HopeEngine.getOutfits());
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = HopeEngine.subscribe(msg => {
      setMessages(prev => [...prev, msg.text]);
      setState(HopeEngine.getState());
    });
    return unsubscribe;
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    await HopeEngine.sendMessage(input, 'general');
    setInput('');
  };

  const handleOutfitChange = (outfitId: string) => {
    if (HopeEngine.setOutfit(outfitId)) {
      setState(HopeEngine.getState());
      setOutfits(HopeEngine.getOutfits());
    }
  };

  const moodEmoji = {
    happy: '😊',
    excited: '🤩',
    focused: '🎯',
    supportive: '🤝',
    playful: '😄',
    thinking: '🤔',
  };

  return (
    <>
      {/* Hope Companion Widget */}
      <div className="fixed bottom-24 right-6 z-40">
        {/* Expanded Panel */}
        {open && (
          <div className="absolute bottom-0 right-0 w-80 bg-slate-900 border border-slate-800 rounded-none shadow-2xl flex flex-col h-96 animate-in fade-in slide-in-from-bottom-2">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-pink-500/10 to-purple-500/10">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{moodEmoji[state.mood]}</div>
                <div>
                  <p className="text-sm font-black text-white">Hope</p>
                  <p className="text-[8px] text-slate-500 font-mono uppercase">{state.outfit.name}</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-slate-800 rounded-none transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="text-center text-slate-500 text-xs space-y-2 py-8">
                  <p className="text-2xl">{moodEmoji[state.mood]}</p>
                  <p>Hi! I'm Hope. What would you like to talk about?</p>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div key={i} className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-none">
                    <p className="text-xs text-white leading-relaxed">{msg}</p>
                  </div>
                ))
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-800 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Talk to Hope..."
                  className="flex-1 bg-black border border-slate-800 px-3 py-2 text-xs text-white outline-none focus:border-pink-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-3 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold uppercase transition-all"
                >
                  Send
                </button>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white text-[9px] font-mono uppercase flex items-center justify-center gap-1"
                >
                  <Settings className="h-3 w-3" /> Settings
                </button>
                <button
                  onClick={() => HopeEngine.toggleVoice(!state.voiceEnabled)}
                  className="flex-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white text-[9px] font-mono uppercase flex items-center justify-center gap-1"
                >
                  {state.voiceEnabled ? (
                    <Volume2 className="h-3 w-3" />
                  ) : (
                    <VolumeX className="h-3 w-3" />
                  )}
                  Voice
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Settings Panel */}
        {showSettings && open && (
          <div className="absolute bottom-0 right-80 w-72 bg-slate-900 border border-slate-800 rounded-none shadow-2xl p-4 space-y-4">
            <h3 className="text-sm font-black text-white uppercase">Outfits</h3>
            <div className="grid grid-cols-2 gap-2">
              {outfits.map(outfit => (
                <button
                  key={outfit.id}
                  onClick={() => handleOutfitChange(outfit.id)}
                  disabled={!outfit.unlocked}
                  className={`p-3 text-center text-[10px] font-mono uppercase border transition-all ${
                    state.outfit.id === outfit.id
                      ? 'bg-pink-500/20 border-pink-500/50 text-pink-400'
                      : outfit.unlocked
                      ? 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                      : 'bg-slate-900 border-slate-800 text-slate-600 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="text-lg mb-1">{outfit.emoji}</div>
                  <div>{outfit.name}</div>
                </button>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-3">
              <div>
                <label className="text-[9px] font-mono text-slate-500 uppercase">Voice Pitch</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  defaultValue={state.voicePitch}
                  onChange={e => HopeEngine.setVoiceParams(parseFloat(e.target.value), state.voiceSpeed)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-[9px] font-mono text-slate-500 uppercase">Voice Speed</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  defaultValue={state.voiceSpeed}
                  onChange={e => HopeEngine.setVoiceParams(state.voicePitch, parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Floating Button */}
        <button
          onClick={() => setOpen(!open)}
          className={`h-16 w-16 rounded-none flex items-center justify-center font-bold text-white transition-all shadow-lg ${
            open
              ? 'bg-pink-600 hover:bg-pink-700'
              : 'bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
          }`}
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>

      {/* Hope Status Bar (always visible) */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3 px-4 py-2 bg-slate-900 border border-slate-800 rounded-none">
        <div className="text-2xl animate-pulse">{moodEmoji[state.mood]}</div>
        <div className="space-y-0.5">
          <p className="text-[9px] font-black text-white uppercase">Hope</p>
          <p className="text-[8px] font-mono text-slate-500">{state.outfit.name}</p>
        </div>
        <div className="h-6 w-px bg-slate-800" />
        <div className="flex items-center gap-1">
          <Heart className="h-3 w-3 text-pink-500" />
          <span className="text-[9px] font-mono text-slate-400">{state.totalInteractions} chats</span>
        </div>
      </div>
    </>
  );
};

export default HopeCompanion;
