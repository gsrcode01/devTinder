import { Heart, X, CheckCircle2, MapPin, Briefcase, Flame, Sparkles } from "lucide-react";

const UserCard = ({ user, handleSendRequest }) => {
  if (!user) return null;

  const { _id, firstName, lastName, photourl, age, gender, about, skills } = user;

  const effectivePhoto =
    photourl && !photourl.includes("brave.com")
      ? photourl
      : gender === "female"
      ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700"
      : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700";

  const developerRole =
    skills && skills.length > 0
      ? `${skills[0]} Developer`
      : "Frontend Developer at Swiggy";

  return (
    <div className="relative w-full max-w-sm aspect-[4/5] min-h-[460px] rounded-3xl select-none group">
      {/* Tilted Back Stack Layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#171e33] to-[#0f1424] rounded-3xl border border-white/[0.05] rotate-2 scale-[0.96] translate-y-3 pointer-events-none shadow-xl opacity-70"></div>

      {/* Main Card with Neon Border Gradient */}
      <div className="absolute inset-0 p-[1.5px] rounded-3xl bg-gradient-to-tr from-amber-500/40 via-rose-500/50 to-purple-600/40 shadow-2xl overflow-hidden">
        <div className="relative w-full h-full bg-[#0d121f] rounded-[22px] overflow-hidden flex flex-col justify-between">
          {/* Developer Photo */}
          <img
            src={effectivePhoto}
            alt={firstName}
            className="absolute inset-0 w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700";
            }}
          />

          {/* Top Badges */}
          <div className="relative z-10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-emerald-400 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Online</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/25 backdrop-blur-md border border-amber-500/40 text-[11px] font-bold text-amber-300 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Open to Collaboration</span>
            </div>
          </div>

          {/* Bottom Gradient & Info Overlay */}
          <div className="relative z-10 p-5 pt-16 bg-gradient-to-t from-[#090d16] via-[#090d16]/95 to-transparent">
            {/* Name, Age, Verification */}
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white tracking-tight">
                {firstName} {lastName || ""}{" "}
                {age ? <span className="font-normal text-lg text-slate-200 ml-1">{age}</span> : ""}
              </h2>
              <CheckCircle2 className="w-5 h-5 text-sky-400 fill-sky-400/30" />
            </div>

            {/* Current Role */}
            <p className="text-xs font-semibold text-slate-300 mt-1">
              {developerRole}
            </p>

            {/* Location & Experience */}
            <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" /> Bengaluru, IN
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-amber-400" /> 2+ yrs exp
              </span>
            </div>

            {/* Bio */}
            <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
              {about || "Building delightful web experiences."}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {(skills && skills.length > 0 ? skills : ["React", "TypeScript"]).slice(0, 3).map(
                (skill, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono py-0.5 px-2.5 rounded-lg bg-white/[0.08] backdrop-blur-md border border-white/10 text-slate-200"
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
  );
};

export default UserCard;
