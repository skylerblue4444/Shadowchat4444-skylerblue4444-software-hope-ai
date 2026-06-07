import React, { useState } from 'react';
import {
  BookOpen,
  Play,
  Award,
  Clock,
  CheckCircle,
  TrendingUp,
  Search,
  Filter,
  Star,
  Users,
  ChevronRight,
  Zap,
  Shield,
  Wallet,
  Code,
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  students: number;
  image: string;
  category: 'Crypto' | 'Trading' | 'Development' | 'AI';
  progress?: number;
}

const Academy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'my-learning' | 'certifications'>('courses');

  const courses: Course[] = [
    { id: '1', title: 'Web3 Development Masterclass', instructor: '@skylerblue', duration: '12h 45m', level: 'Intermediate', rating: 4.9, students: 12450, image: '💻', category: 'Development' },
    { id: '2', title: 'Hope AI Orchestration Guide', instructor: '@hope_ai', duration: '5h 20m', level: 'Advanced', rating: 5.0, students: 8934, image: '🧠', category: 'AI' },
    { id: '3', title: 'Advanced Trading Strategies', instructor: '@whale_01', duration: '8h 15m', level: 'Advanced', rating: 4.8, students: 15678, image: '📈', category: 'Trading' },
    { id: '4', title: 'Crypto Fundamentals', instructor: '@edu_team', duration: '4h 30m', level: 'Beginner', rating: 4.7, students: 45230, image: '🪙', category: 'Crypto' },
  ];

  const stats = [
    { label: 'Courses', value: '124', icon: <BookOpen className="h-5 w-5" /> },
    { label: 'Students', value: '1.2M', icon: <Users className="h-5 w-5" /> },
    { label: 'Instructors', value: '450', icon: <Award className="h-5 w-5" /> },
    { label: 'Certificates', value: '85K', icon: <CheckCircle className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-5xl font-black mb-2">Sky Academy</h1>
            <p className="text-slate-400">Master the future of technology, finance, and AI</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition flex items-center gap-2">
              Become Instructor
            </button>
          </div>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 text-center">
              <div className="flex justify-center mb-2 text-purple-400">{stat.icon}</div>
              <p className="text-slate-400 text-xs font-bold uppercase mb-1">{stat.label}</p>
              <p className="text-2xl font-black">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, instructors, topics..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex gap-2">
            {(['All', 'Development', 'AI', 'Trading', 'Crypto'] as const).map((cat) => (
              <button key={cat} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition whitespace-nowrap">
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-700">
          {(['courses', 'my-learning', 'certifications'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-bold transition border-b-2 ${
                activeTab === tab
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {courses.map((course) => (
            <div key={course.id} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden hover:border-purple-500 transition group cursor-pointer">
              <div className="relative aspect-video bg-slate-700/50 flex items-center justify-center text-6xl group-hover:scale-105 transition duration-500">
                {course.image}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 group-hover:bg-white/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Play className="h-6 w-6 text-white fill-white" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded uppercase">
                    {course.category}
                  </span>
                  <span className="text-[10px] font-black bg-slate-700 text-slate-400 px-2 py-0.5 rounded uppercase">
                    {course.level}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-slate-400 mb-4">{course.instructor}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <span className="text-xs font-bold">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 text-xs">
                    <Clock className="h-3 w-3" /> {course.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Paths */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-black mb-8">Curated Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Full-Stack Web3 Engineer', icon: <Code className="text-blue-400" />, modules: 12, time: '45h' },
              { title: 'AI Orchestration Specialist', icon: <Zap className="text-yellow-400" />, modules: 8, time: '28h' },
              { title: 'DeFi Protocol Architect', icon: <Shield className="text-green-400" />, modules: 15, time: '60h' },
            ].map((path, idx) => (
              <div key={idx} className="p-6 bg-slate-700/30 rounded-xl border border-slate-600 hover:border-purple-500 transition cursor-pointer group">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  {path.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>{path.modules} Modules</span>
                  <span>{path.time} Total</span>
                </div>
                <button className="mt-6 text-purple-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Start Path <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academy;
