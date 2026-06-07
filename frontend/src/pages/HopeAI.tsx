import React, { useState, useRef, useEffect } from 'react';
import { Mic, Settings, Brain, Zap, MessageSquare, BarChart3, AlertCircle, Send, Volume2, Pause, Play } from 'lucide-react';

interface PersonalityState {
  mode: 'engineer' | 'free_will' | 'polish' | 'strategic_advisor' | 'high_agency_experimental';
  stressLevel: 'calm' | 'focused' | 'stressed' | 'overwhelmed' | 'critical';
  autonomyLevel: number;
  trustScore: number;
  emotionalSync: number;
}

interface VoiceCommand {
  id: string;
  transcript: string;
  intent: string;
  timestamp: number;
  status: 'processing' | 'completed' | 'failed';
}

interface Agent {
  name: string;
  status: 'active' | 'inactive' | 'monitoring';
  description: string;
  icon: React.ReactNode;
}

const HopeAI: React.FC = () => {
  const [personality, setPersonality] = useState<PersonalityState>({
    mode: 'polish',
    stressLevel: 'calm',
    autonomyLevel: 70,
    trustScore: 85,
    emotionalSync: 78,
  });

  const [isListening, setIsListening] = useState(false);
  const [voiceCommands, setVoiceCommands] = useState<VoiceCommand[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'ai'; content: string; timestamp: number }>>([
    { role: 'ai', content: 'Hello! I\'m Hope AI. I\'m here to assist you with engineering, trading, marketplace management, and more. What would you like to do today?', timestamp: Date.now() },
  ]);
  const [messageInput, setMessageInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const agents: Agent[] = [
    { name: 'Orchestrator Bot', status: 'active', description: 'Route registration & coordination', icon: <Zap className="h-5 w-5" /> },
    { name: 'Security Bot', status: 'active', description: 'Security hardening & monitoring', icon: <AlertCircle className="h-5 w-5" /> },
    { name: 'Marketplace Bot', status: 'active', description: 'Commerce & transaction flow', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Analytics Bot', status: 'active', description: 'Real-time data & insights', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Multi-Coin Bot', status: 'active', description: 'Crypto infrastructure', icon: <Zap className="h-5 w-5" /> },
    { name: 'Privacy Bot', status: 'monitoring', description: 'Privacy & encryption', icon: <AlertCircle className="h-5 w-5" /> },
    { name: 'QA Bot', status: 'active', description: 'Quality assurance', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Deployment Bot', status: 'active', description: 'Live deployment', icon: <Zap className="h-5 w-5" /> },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleVoiceStart = () => {
    setIsListening(true);
    setCurrentTranscript('Listening...');
  };

  const handleVoiceStop = () => {
    setIsListening(false);
    if (currentTranscript && currentTranscript !== 'Listening...') {
      const command: VoiceCommand = {
        id: `cmd-${Date.now()}`,
        transcript: currentTranscript,
        intent: 'general_query',
        timestamp: Date.now(),
        status: 'completed',
      };
      setVoiceCommands([...voiceCommands, command]);
      setChatMessages([
        ...chatMessages,
        { role: 'user', content: currentTranscript, timestamp: Date.now() },
        { role: 'ai', content: `I understood: "${currentTranscript}". Processing your request...`, timestamp: Date.now() + 100 },
      ]);
      setCurrentTranscript('');
    }
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    setChatMessages([
      ...chatMessages,
      { role: 'user', content: messageInput, timestamp: Date.now() },
      { role: 'ai', content: 'Processing your request. Analyzing context and generating response...', timestamp: Date.now() + 100 },
    ]);
    setMessageInput('');
  };

  const switchMode = (newMode: PersonalityState['mode']) => {
    setPersonality({ ...personality, mode: newMode });
  };

  const updateStress = (level: PersonalityState['stressLevel']) => {
    setPersonality({ ...personality, stressLevel: level });
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'engineer':
        return 'from-blue-500 to-cyan-500';
      case 'free_will':
        return 'from-red-500 to-pink-500';
      case 'polish':
        return 'from-purple-500 to-pink-500';
      case 'strategic_advisor':
        return 'from-green-500 to-emerald-500';
      case 'high_agency_experimental':
        return 'from-yellow-500 to-orange-500';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const getStressColor = (level: string) => {
    switch (level) {
      case 'calm':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'focused':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'stressed':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'overwhelmed':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getModeColor(personality.mode)} flex items-center justify-center`}>
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-5xl font-black">Hope AI</h1>
                  <p className="text-slate-400">Enterprise AI Orchestration & Voice Navigation</p>
                </div>
              </div>
            </div>
            <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </button>
          </div>

          {/* Personality Status */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-xs uppercase tracking-wider">Mode</p>
              <p className="text-lg font-bold mt-2 capitalize">{personality.mode.replace('_', ' ')}</p>
              <div className={`w-full h-1 rounded-full mt-3 bg-gradient-to-r ${getModeColor(personality.mode)}`} />
            </div>
            <div className={`bg-slate-800/50 backdrop-blur border rounded-lg p-4 ${getStressColor(personality.stressLevel)}`}>
              <p className="text-xs uppercase tracking-wider">Stress Level</p>
              <p className="text-lg font-bold mt-2 capitalize">{personality.stressLevel}</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-xs uppercase tracking-wider">Autonomy</p>
              <p className="text-lg font-bold mt-2">{personality.autonomyLevel}%</p>
              <div className="w-full bg-slate-700 rounded-full h-1 mt-3">
                <div className="h-1 rounded-full bg-blue-500" style={{ width: `${personality.autonomyLevel}%` }} />
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-xs uppercase tracking-wider">Trust Score</p>
              <p className="text-lg font-bold mt-2">{personality.trustScore}/100</p>
              <div className="w-full bg-slate-700 rounded-full h-1 mt-3">
                <div className="h-1 rounded-full bg-emerald-500" style={{ width: `${personality.trustScore}%` }} />
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-xs uppercase tracking-wider">Emotional Sync</p>
              <p className="text-lg font-bold mt-2">{personality.emotionalSync}%</p>
              <div className="w-full bg-slate-700 rounded-full h-1 mt-3">
                <div className="h-1 rounded-full bg-pink-500" style={{ width: `${personality.emotionalSync}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg flex flex-col h-[600px]">
            <div className="p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold">Conversation</h2>
              <p className="text-slate-400 text-sm mt-1">Real-time voice & text interaction</p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs px-4 py-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-purple-600 text-white rounded-br-none'
                        : 'bg-slate-700 text-slate-100 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs mt-1 opacity-70">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-slate-700 space-y-4">
              {/* Voice Input */}
              <div className="flex gap-3">
                <button
                  onClick={isListening ? handleVoiceStop : handleVoiceStart}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                    isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  <Mic className="h-5 w-5" />
                  {isListening ? 'Stop Listening' : 'Start Voice Command'}
                </button>
              </div>

              {isListening && (
                <div className="bg-slate-700/50 border border-purple-500/50 rounded-lg p-3">
                  <p className="text-sm text-slate-300">{currentTranscript}</p>
                </div>
              )}

              {/* Text Input */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message or voice command..."
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition flex items-center gap-2"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Mode & Control Panel */}
          <div className="space-y-6">
            {/* Mode Selector */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Operational Modes</h3>
              <div className="space-y-2">
                {(['engineer', 'free_will', 'polish', 'strategic_advisor', 'high_agency_experimental'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => switchMode(mode)}
                    className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition text-left ${
                      personality.mode === mode
                        ? `bg-gradient-to-r ${getModeColor(mode)} text-white`
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                    }`}
                  >
                    <span className="capitalize">{mode.replace('_', ' ')}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stress Level */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Stress Level</h3>
              <div className="space-y-2">
                {(['calm', 'focused', 'stressed', 'overwhelmed', 'critical'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => updateStress(level)}
                    className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition text-left ${
                      personality.stressLevel === level
                        ? `${getStressColor(level)} border`
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                    }`}
                  >
                    <span className="capitalize">{level}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Agent Coordination */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">12-Bot Swarm Coordination</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {agents.map((agent, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${
                  agent.status === 'active'
                    ? 'bg-green-500/10 border-green-500/30'
                    : agent.status === 'monitoring'
                    ? 'bg-yellow-500/10 border-yellow-500/30'
                    : 'bg-slate-700/30 border-slate-600/30'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {agent.icon}
                    <div>
                      <p className="font-semibold text-sm">{agent.name}</p>
                      <p className="text-xs text-slate-400">{agent.description}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${
                      agent.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : agent.status === 'monitoring'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-slate-600/20 text-slate-400'
                    }`}
                  >
                    {agent.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HopeAI;
