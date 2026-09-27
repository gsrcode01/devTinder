import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  Heart,
  Users,
  MessageSquare,
  ChevronDown,
  Sparkles,
  Lightbulb,
  ChevronRight,
  Activity,
  CheckCircle2,
} from "lucide-react";

const statsData = {
  "This week": { views: 124, likes: 32, matches: 12, chats: 5 },
  "Today": { views: 28, likes: 7, matches: 3, chats: 2 },
  "This month": { views: 540, likes: 142, matches: 48, chats: 21 },
};

const topMatches = [
  {
    id: "match-1",
    name: "Ananya Rao",
    age: 22,
    role: "Full Stack Developer",
    location: "Hyderabad, India",
    matchPercent: 92,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    online: true,
  },
  {
    id: "match-2",
    name: "Vikram Mehta",
    age: 26,
    role: "DevOps Engineer",
    location: "Pune, India",
    matchPercent: 88,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    online: true,
  },
  {
    id: "match-3",
    name: "Neha Kapoor",
    age: 23,
    role: "UI/UX Designer",
    location: "Bengaluru, India",
    matchPercent: 85,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    online: true,
  },
  {
    id: "match-4",
    name: "Arjun Nair",
    age: 27,
    role: "Backend Developer",
    location: "Remote",
    matchPercent: 82,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    online: true,
  },
];

const ActivityPanel = () => {
  const [timeframe, setTimeframe] = useState("This week");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentStats = statsData[timeframe] || statsData["This week"];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside className="w-full space-y-5 pb-8 select-none">
      {/* 1. Your Activity Widget */}
      <div className="bg-[#0e1322]/90 backdrop-blur-2xl border border-white/[0.09] rounded-2xl p-4 shadow-xl space-y-4">
        {/* Header with Timeframe Dropdown */}
        <div className="flex items-center justify-between relative">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-sky-500/15 text-sky-400 border border-sky-500/20">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight">Your Activity</h3>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 text-[11px] font-medium text-slate-300 bg-white/[0.06] hover:bg-white/[0.1] px-2.5 py-1 rounded-lg border border-white/[0.08] transition-colors cursor-pointer"
            >
              <span>{timeframe}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-32 bg-[#13192c] border border-white/[0.12] rounded-xl shadow-2xl py-1 z-30">
                {Object.keys(statsData).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => {
                      setTimeframe(tf);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                      timeframe === tf
                        ? "text-pink-400 font-semibold bg-pink-500/10"
                        : "text-slate-300 hover:bg-white/[0.06]"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 4 Stat Cards Grid with High Contrast */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Profiles Viewed */}
          <div className="bg-[#141b2e] hover:bg-[#182138] border border-white/[0.07] hover:border-sky-500/30 rounded-xl p-3 space-y-1 transition-all duration-200 shadow-sm">
            <div className="w-7 h-7 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center">
              <Eye className="w-3.5 h-3.5" />
            </div>
            <div className="text-lg font-black text-white">{currentStats.views}</div>
            <div className="text-[10px] text-slate-400 font-medium">Profiles Viewed</div>
          </div>

          {/* Likes Sent */}
          <div className="bg-[#141b2e] hover:bg-[#182138] border border-white/[0.07] hover:border-pink-500/30 rounded-xl p-3 space-y-1 transition-all duration-200 shadow-sm">
            <div className="w-7 h-7 rounded-lg bg-pink-500/15 text-pink-400 flex items-center justify-center">
              <Heart className="w-3.5 h-3.5" />
            </div>
            <div className="text-lg font-black text-white">{currentStats.likes}</div>
            <div className="text-[10px] text-slate-400 font-medium">Likes Sent</div>
          </div>

          {/* Matches */}
          <div className="bg-[#141b2e] hover:bg-[#182138] border border-white/[0.07] hover:border-amber-500/30 rounded-xl p-3 space-y-1 transition-all duration-200 shadow-sm">
            <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
            <div className="text-lg font-black text-white">{currentStats.matches}</div>
            <div className="text-[10px] text-slate-400 font-medium">Matches</div>
          </div>

          {/* Conversations */}
          <div className="bg-[#141b2e] hover:bg-[#182138] border border-white/[0.07] hover:border-purple-500/30 rounded-xl p-3 space-y-1 transition-all duration-200 shadow-sm">
            <div className="w-7 h-7 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <div className="text-lg font-black text-white">{currentStats.chats}</div>
            <div className="text-[10px] text-slate-400 font-medium">Conversations</div>
          </div>
        </div>
      </div>

      {/* 2. Top Matches for You Widget */}
      <div className="bg-[#0e1322]/90 backdrop-blur-2xl border border-white/[0.09] rounded-2xl p-4 shadow-xl space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-pink-500/15 text-pink-400 border border-pink-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight">Top Matches for You</h3>
          </div>
          <Link
            to="/connections"
            className="text-xs text-pink-400 hover:text-pink-300 font-semibold transition-colors"
          >
            View All
          </Link>
        </div>

        {/* List of matches with clear card separation */}
        <div className="space-y-2.5">
          {topMatches.map((person) => (
            <Link
              key={person.id}
              to={`/messages?user=${person.id}`}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#141b2e] hover:bg-[#19223a] border border-white/[0.07] hover:border-pink-500/30 transition-all duration-200 group shadow-sm cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {/* Avatar with online indicator */}
                <div className="relative flex-shrink-0">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/10 group-hover:ring-pink-500/30 transition-all"
                  />
                  {person.online && (
                    <span className="w-2.5 h-2.5 bg-emerald-400 border-2 border-[#141b2e] rounded-full absolute -top-0.5 -right-0.5"></span>
                  )}
                </div>

                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-100 group-hover:text-pink-300 transition-colors truncate">
                    {person.name} <span className="font-normal text-slate-400 text-[11px]">{person.age}</span>
                  </h4>
                  <p className="text-[10px] text-slate-300 truncate">{person.role}</p>
                  <p className="text-[9px] text-slate-400 truncate">{person.location}</p>
                </div>
              </div>

              {/* Match Percentage Capsule */}
              <div className="flex-shrink-0 ml-2 px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 font-mono font-black text-[11px] shadow-sm">
                {person.matchPercent}%
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Pro Tip Widget */}
      <div className="bg-gradient-to-br from-[#19152b] to-[#0e1322] border border-purple-500/25 rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/15 border border-amber-500/20 text-amber-400">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">Pro Tip</h4>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        <p className="text-[11px] text-slate-300 leading-relaxed">
          Complete your bio and add 5+ skills to get 3x more developer connections!
        </p>

        {/* Progress bar */}
        <div className="space-y-1.5 pt-1">
          <div className="w-full h-2 bg-[#121624] rounded-full overflow-hidden border border-white/[0.06]">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
              style={{ width: "70%" }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
            <span>Profile Strength</span>
            <span className="text-pink-400 font-bold">70%</span>
          </div>
        </div>
      </div>

      {/* Handwritten Subtle Annotation */}
      <div className="text-center pt-2 select-none">
        <p className="font-handwriting text-slate-400 hover:text-pink-400 transition-colors text-sm">
          ~ git commit -m "build great things" ♡
        </p>
      </div>
    </aside>
  );
};

export default ActivityPanel;
