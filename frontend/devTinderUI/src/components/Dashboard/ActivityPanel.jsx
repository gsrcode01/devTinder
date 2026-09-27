import { Link } from "react-router-dom";
import { Eye, Heart, Users, MessageSquare, ChevronDown, Sparkles, Lightbulb, ChevronRight, Activity } from "lucide-react";

const ActivityPanel = () => {
  const topMatches = [
    {
      name: "Ananya Rao",
      age: 22,
      role: "Full Stack Developer",
      location: "Hyderabad, India",
      matchPercent: 92,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      online: true,
    },
    {
      name: "Vikram Mehta",
      age: 26,
      role: "DevOps Engineer",
      location: "Pune, India",
      matchPercent: 88,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      online: true,
    },
    {
      name: "Neha Kapoor",
      age: 23,
      role: "UI/UX Designer",
      location: "Bengaluru, India",
      matchPercent: 85,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      online: true,
    },
    {
      name: "Arjun Nair",
      age: 27,
      role: "Backend Developer",
      location: "Remote",
      matchPercent: 82,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      online: true,
    },
  ];

  return (
    <aside className="w-full xl:w-80 flex-shrink-0 space-y-5">
      {/* 1. Your Activity Widget */}
      <div className="bg-[#0c101c]/80 backdrop-blur-xl border border-white/[0.06] rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-sky-500/15 text-sky-400">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight">Your Activity</h3>
          </div>
          <button className="flex items-center gap-1 text-[11px] text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.06] hover:text-white cursor-pointer">
            <span>This week</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        {/* 4 Stat Cards Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Profiles Viewed */}
          <div className="bg-[#121829] border border-white/[0.04] rounded-2xl p-3 space-y-1">
            <div className="w-7 h-7 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Eye className="w-3.5 h-3.5" />
            </div>
            <div className="text-lg font-black text-white">124</div>
            <div className="text-[10px] text-slate-400 font-medium">Profiles Viewed</div>
          </div>

          {/* Likes Sent */}
          <div className="bg-[#121829] border border-white/[0.04] rounded-2xl p-3 space-y-1">
            <div className="w-7 h-7 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <Heart className="w-3.5 h-3.5" />
            </div>
            <div className="text-lg font-black text-white">32</div>
            <div className="text-[10px] text-slate-400 font-medium">Likes Sent</div>
          </div>

          {/* Matches */}
          <div className="bg-[#121829] border border-white/[0.04] rounded-2xl p-3 space-y-1">
            <div className="w-7 h-7 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
            <div className="text-lg font-black text-white">12</div>
            <div className="text-[10px] text-slate-400 font-medium">Matches</div>
          </div>

          {/* Conversations */}
          <div className="bg-[#121829] border border-white/[0.04] rounded-2xl p-3 space-y-1">
            <div className="w-7 h-7 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <div className="text-lg font-black text-white">5</div>
            <div className="text-[10px] text-slate-400 font-medium">Conversations</div>
          </div>
        </div>
      </div>

      {/* 2. Top Matches for You */}
      <div className="bg-[#0c101c]/80 backdrop-blur-xl border border-white/[0.06] rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white tracking-tight">Top Matches for You</h3>
          <Link
            to="/connections"
            className="text-xs text-rose-400 hover:text-rose-300 font-semibold transition-colors"
          >
            View All
          </Link>
        </div>

        {/* List of matches */}
        <div className="space-y-3">
          {topMatches.map((person, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2.5 rounded-2xl bg-[#121829]/60 hover:bg-[#121829] border border-white/[0.04] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                {/* Avatar with online dot */}
                <div className="relative">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/10"
                  />
                  {person.online && (
                    <span className="w-2.5 h-2.5 bg-emerald-400 border-2 border-[#121829] rounded-full absolute -top-0.5 -right-0.5"></span>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors leading-tight">
                    {person.name} <span className="font-normal text-slate-400 text-[11px]">{person.age}</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{person.role}</p>
                  <p className="text-[9px] text-slate-500">{person.location}</p>
                </div>
              </div>

              {/* Match Percentage Circle Badge */}
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-rose-500/80 shadow-[0_0_12px_rgba(244,63,94,0.3)] flex-shrink-0">
                <span className="text-[11px] font-black text-rose-300 font-mono">
                  {person.matchPercent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Pro Tip Widget */}
      <div className="bg-gradient-to-br from-[#1c1829] to-[#0e1220] border border-purple-500/20 rounded-3xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">Pro Tip</h4>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        <p className="text-[11px] text-slate-300 leading-relaxed">
          Complete your profile to get 3x more matches!
        </p>

        {/* Progress bar */}
        <div className="space-y-1.5 pt-1">
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-purple-600 rounded-full"
              style={{ width: "70%" }}
            ></div>
          </div>
          <div className="text-right text-[10px] font-mono text-slate-400">70%</div>
        </div>
      </div>

      {/* Handwritten Subtle Annotation */}
      <div className="text-center pt-2 select-none">
        <p className="font-handwriting text-slate-500 hover:text-rose-400/80 transition-colors text-base">
          ~ git commit -m "build great things" ♡
        </p>
      </div>
    </aside>
  );
};

export default ActivityPanel;
