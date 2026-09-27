import { useState, useEffect } from "react";
import { CheckCircle2, MapPin, Briefcase, X, Heart, RotateCcw, Sparkles, Flame, Loader2, Info } from "lucide-react";
import DeveloperDetailModal from "../common/DeveloperDetailModal";

const SwipeDeck = ({ profiles = [], onAction, onLoadMore, onRefresh, loading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // When profiles array is updated or resets, keep currentIndex in bounds
  useEffect(() => {
    if (currentIndex >= profiles.length && profiles.length > 0) {
      setCurrentIndex(0);
    }
  }, [profiles.length, currentIndex]);

  // When remaining cards are 5 or fewer, trigger background prefetching of the next page
  useEffect(() => {
    const remaining = profiles.length - currentIndex;
    if (remaining <= 5 && onLoadMore) {
      onLoadMore();
    }
  }, [currentIndex, profiles.length, onLoadMore]);

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

  const handleOpenDetail = (e) => {
    e?.stopPropagation();
    if (currentProfile) {
      setSelectedDeveloper(currentProfile);
      setModalOpen(true);
    }
  };

  // Keyboard navigation ← and →
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalOpen) return;
      if (e.key === "ArrowLeft") {
        handleSwipe("pass");
      } else if (e.key === "ArrowRight") {
        handleSwipe("like");
      } else if (e.key === "ArrowUp" || e.key === "Enter") {
        handleOpenDetail();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentProfile, modalOpen]);

  if (!currentProfile) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#0c101c]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl min-h-[540px] shadow-2xl">
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
            <p className="text-xs font-mono text-slate-400">Loading next batch of developers...</p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500/20 to-purple-600/20 border border-rose-500/30 flex items-center justify-center mb-4 shadow-xl">
              <Flame className="w-8 h-8 text-rose-500" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">You've swiped all candidates!</h3>
            <p className="text-xs text-slate-400 mt-1.5 max-w-sm leading-relaxed">
              You've explored all active profiles matching your filters. Click below to refresh and load fresh candidates.
            </p>
            <button
              onClick={() => {
                setCurrentIndex(0);
                if (onRefresh) onRefresh();
              }}
              className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Load Fresh Feed
            </button>
          </>
        )}
      </div>
    );
  }

  const { firstName, lastName, photourl, age, gender, about, skills } = currentProfile;

  const effectivePhoto =
    photourl && !photourl.includes("brave.com") && !photourl.includes("placeholder")
      ? photourl
      : gender === "female"
      ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700"
      : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700";

  const developerRole =
    skills && skills.length > 0
      ? `${skills[0]} Developer`
      : "Fullstack Engineer";

  return (
    <div className="flex-1 flex flex-col items-center justify-between max-w-md lg:max-w-lg mx-auto w-full">
      {/* 3D Stack Container matching Screenshot 2 */}
      <div
        onClick={handleOpenDetail}
        className="relative w-full aspect-[4/5] min-h-[480px] max-h-[540px] rounded-3xl select-none cursor-pointer group"
        title="Click to view full developer profile details"
      >
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
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.src =
                  gender === "female"
                    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700"
                    : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700";
              }}
            />

            {/* Top Badges & Expand Info Button */}
            <div className="relative z-10 p-4 flex items-center justify-between">
              {/* Online status indicator badge */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-emerald-400 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Developer</span>
              </div>

              {/* Verified Collab badge + Info Trigger */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-amber-300 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Open for Collab</span>
                </div>

                <button
                  type="button"
                  onClick={handleOpenDetail}
                  className="w-8 h-8 rounded-full bg-black/70 hover:bg-black/95 border border-white/20 text-white flex items-center justify-center transition-all shadow-lg hover:scale-110"
                  title="View full profile"
                >
                  <Info className="w-4 h-4 text-sky-400" />
                </button>
              </div>
            </div>

            {/* Bottom Gradient and Developer Details Overlay */}
            <div className="relative z-10 p-6 pt-20 bg-gradient-to-t from-[#090d16] via-[#090d16]/95 to-transparent">
              {/* Name, Age, Verification Icon */}
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {firstName} {lastName || ""}{" "}
                  {age ? <span className="font-normal text-xl text-slate-200 ml-1">{age}</span> : ""}
                </h2>
                <CheckCircle2 className="w-5 h-5 text-sky-400 fill-sky-400/20" />
              </div>

              {/* Developer Role */}
              <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">
                {developerRole}
              </p>

              {/* Location & Experience tags */}
              <div className="flex items-center gap-4 text-xs text-slate-400 mt-1.5 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" /> Bengaluru, IN
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-amber-400" /> 3+ yrs exp
                </span>
              </div>

              {/* About snippet */}
              <p className="text-xs text-slate-300 mt-2.5 line-clamp-2 leading-relaxed font-normal">
                {about || "Fullstack developer passionate about building high-performance modern web apps."}
              </p>

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-1.5 mt-3.5">
                {(skills && skills.length > 0 ? skills : ["React", "Node.js", "TypeScript"]).map(
                  (skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono py-1 px-3 rounded-lg bg-white/[0.08] backdrop-blur-md border border-white/10 text-slate-200 font-medium"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Swipe Action Buttons (Pass ✕, Star ⭐, Like ♡) */}
      <div className="flex items-center justify-center gap-6 mt-6 w-full">
        {/* Pass Button */}
        <button
          onClick={() => handleSwipe("pass")}
          className="w-14 h-14 rounded-full bg-[#141a2c] border border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center shadow-xl cursor-pointer"
          title="Pass (Left Arrow ←)"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Super Like / View Details Button */}
        <button
          onClick={handleOpenDetail}
          className="w-12 h-12 rounded-full bg-[#141a2c] border border-white/10 text-amber-400 hover:border-amber-500/40 hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center shadow-xl cursor-pointer"
          title="View full developer profile details"
        >
          <Sparkles className="w-5 h-5 fill-amber-400/20" />
        </button>

        {/* Interested / Like Button */}
        <button
          onClick={() => handleSwipe("like")}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 text-white hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center shadow-xl shadow-rose-500/30 cursor-pointer"
          title="Interested (Right Arrow →)"
        >
          <Heart className="w-6 h-6 fill-white" />
        </button>
      </div>

      {/* Full Developer Profile Modal */}
      <DeveloperDetailModal
        developer={selectedDeveloper}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAction={(status) => {
          handleSwipe(status === "interested" ? "like" : "pass");
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default SwipeDeck;
