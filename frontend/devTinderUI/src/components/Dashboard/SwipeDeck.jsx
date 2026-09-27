import { useState, useEffect } from "react";
import { CheckCircle2, MapPin, Briefcase, X, Star, Heart, RotateCcw, Sparkles, Flame } from "lucide-react";

const SwipeDeck = ({ profiles = [], onAction, onUndo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const currentProfile = profiles[currentIndex] || null;

  const handleSwipe = (direction) => {
    if (!currentProfile) return;
    setSwipeDirection(direction);

    setTimeout(() => {
      if (onAction) {
        onAction(direction === "like" ? "interested" : "ignored", currentProfile._id);
      }
      setCurrentIndex((prev) => prev + 1);
      setSwipeDirection(null);
    }, 280);
  };

  // Keyboard navigation ← and →
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handleSwipe("pass");
      } else if (e.key === "ArrowRight") {
        handleSwipe("like");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentProfile]);

  if (!currentProfile) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#0c101c]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl min-h-[580px] shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500/20 to-purple-600/20 border border-rose-500/30 flex items-center justify-center mb-4 shadow-xl">
          <Flame className="w-8 h-8 text-rose-500" />
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">No more profiles nearby</h3>
        <p className="text-xs text-slate-400 mt-1.5 max-w-sm leading-relaxed">
          You've viewed all candidates matching your current filters. Adjust your distance or skills to see more!
        </p>
        <button
          onClick={() => {
            setCurrentIndex(0);
            if (onUndo) onUndo();
          }}
          className="mt-6 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Start Over
        </button>
      </div>
    );
  }

  const { firstName, lastName, photourl, age, gender, about, skills } = currentProfile;

  // Fallback high-res photos if photo is missing or silhouette
  const effectivePhoto =
    photourl && !photourl.includes("brave.com") && !photourl.includes("placeholder")
      ? photourl
      : gender === "female"
      ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700"
      : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700";

  const developerRole =
    skills && skills.length > 0
      ? `${skills[0]} Developer`
      : "Frontend Developer at Swiggy";

  return (
    <div className="flex-1 flex flex-col items-center justify-between max-w-md lg:max-w-lg mx-auto w-full">
      {/* 3D Stack Container matching Screenshot 2 */}
      <div className="relative w-full aspect-[4/5] min-h-[480px] max-h-[540px] rounded-3xl select-none">
        {/* Underneath Layer 2 (Tilted Right) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#171e33] to-[#0f1424] rounded-3xl border border-white/[0.05] rotate-3 scale-[0.94] translate-y-4 pointer-events-none shadow-2xl opacity-70"></div>

        {/* Underneath Layer 1 (Tilted Left) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#141a2c] to-[#0c101c] rounded-3xl border border-white/[0.08] -rotate-2 scale-[0.97] translate-y-2 pointer-events-none shadow-2xl opacity-90"></div>

        {/* Primary Foreground Swipe Card with subtle glowing border */}
        <div
          className={`absolute inset-0 p-[1.5px] rounded-3xl bg-gradient-to-tr from-amber-500/40 via-rose-500/50 to-purple-600/40 shadow-[0_25px_60px_rgba(0,0,0,0.8)] transition-all duration-300 ${
            swipeDirection === "like"
              ? "translate-x-36 rotate-12 opacity-0"
              : swipeDirection === "pass"
              ? "-translate-x-36 -rotate-12 opacity-0"
              : "translate-x-0 rotate-0 opacity-100"
          }`}
        >
          <div className="relative w-full h-full bg-[#0d121f] rounded-[22px] overflow-hidden flex flex-col justify-between">
            {/* Background Developer Image */}
            <img
              src={effectivePhoto}
              alt={firstName}
              className="absolute inset-0 w-full h-full object-cover object-center"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700";
              }}
            />

            {/* Top Badges Bar */}
            <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
              {/* Online Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-emerald-400 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Online</span>
              </div>

              {/* Collab & Photo Count Pills */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/25 backdrop-blur-md border border-amber-500/40 text-[11px] font-bold text-amber-300 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Open to Collaboration</span>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono font-semibold text-slate-300 shadow-md">
                  1/4
                </div>
              </div>
            </div>

            {/* Bottom Gradient & Info Overlay */}
            <div className="relative z-10 p-5 pt-20 bg-gradient-to-t from-[#090d16] via-[#090d16]/95 to-transparent">
              {/* Name, Age, Verification */}
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {firstName} {lastName || ""} {age ? <span className="font-normal text-xl sm:text-2xl text-slate-200 ml-1">{age}</span> : ""}
                </h2>
                <CheckCircle2 className="w-5 h-5 text-sky-400 fill-sky-400/30" />
              </div>

              {/* Current Role / Company */}
              <p className="text-xs font-semibold text-slate-300 mt-1">
                {developerRole}
              </p>

              {/* Location & Experience */}
              <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-1.5 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  Bengaluru, India
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                  2+ years experience
                </span>
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-300 mt-2.5 line-clamp-2 leading-relaxed italic">
                "{about ? about.replace(/[☕🔥🚀✨🎉💬🤝]/g, "").trim() : "Building delightful user experiences with React & Next.js. Always up for a good tech conversation."}"
              </p>

              {/* Skills Pills */}
              <div className="flex flex-wrap gap-1.5 mt-3.5">
                {(skills && skills.length > 0 ? skills : ["React", "Next.js", "TypeScript", "Tailwind CSS"]).slice(0, 4).map(
                  (skill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono py-1 px-3 rounded-lg bg-white/[0.08] backdrop-blur-md border border-white/10 text-slate-200 font-medium"
                    >
                      {skill}
                    </span>
                  )
                )}
                {skills && skills.length > 4 && (
                  <span className="text-[11px] font-mono py-1 px-2.5 rounded-lg bg-white/[0.06] text-slate-400">
                    +{skills.length - 4}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Controls Bar */}
      <div className="flex flex-col items-center mt-6 space-y-2">
        <div className="flex items-center gap-5 sm:gap-6">
          {/* Dislike / Pass */}
          <button
            onClick={() => handleSwipe("pass")}
            className="w-13 h-13 rounded-full bg-[#151c2e] hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/40 text-slate-300 hover:text-rose-400 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
            title="Pass (Left Arrow)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Super Like */}
          <button
            onClick={() => handleSwipe("like")}
            className="w-13 h-13 rounded-full bg-[#151c2e] hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/40 text-purple-400 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
            title="Super Like"
          >
            <Star className="w-6 h-6 fill-purple-400" />
          </button>

          {/* Main Like / Interested Button */}
          <button
            onClick={() => handleSwipe("like")}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 via-rose-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.6)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
            title="Like (Right Arrow)"
          >
            <Heart className="w-8 h-8 fill-white" />
          </button>

          {/* Undo / Rewind */}
          <button
            onClick={() => onUndo && onUndo()}
            className="w-13 h-13 rounded-full bg-[#151c2e] hover:bg-sky-500/20 border border-white/10 hover:border-sky-500/40 text-slate-300 hover:text-sky-400 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
            title="Undo"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Keyboard Navigation & Handwritten Note */}
        <div className="flex flex-col items-center gap-1 pt-1 select-none">
          <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
            <span>Use arrow keys</span>
            <span className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white">←</span>
            <span className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white">→</span>
            <span>to navigate</span>
          </p>
          <span className="font-handwriting text-rose-400/80 text-base tracking-wide mt-0.5">
            ~ where code meets chemistry ♡
          </span>
        </div>
      </div>
    </div>
  );
};

export default SwipeDeck;
