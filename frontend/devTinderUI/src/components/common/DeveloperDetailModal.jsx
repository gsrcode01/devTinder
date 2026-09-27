import { useEffect } from "react";
import {
  X,
  Heart,
  Sparkles,
  MapPin,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  Code2,
  Calendar,
  Globe,
  Share2,
  MessageSquare,
} from "lucide-react";

const DeveloperDetailModal = ({ developer, isOpen, onClose, onAction }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !developer) return null;

  const {
    _id,
    firstName,
    lastName,
    photourl,
    age,
    gender,
    about,
    skills = [],
  } = developer;

  const effectivePhoto =
    photourl && !photourl.includes("brave.com") && !photourl.includes("placeholder")
      ? photourl
      : gender === "female"
      ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800"
      : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800";

  const developerRole =
    skills && skills.length > 0
      ? `${skills[0]} Developer`
      : "Full Stack Engineer";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] bg-[#0c101d] border border-white/[0.12] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-0">
          {/* Cover / Photo Hero Header */}
          <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-slate-900">
            <img
              src={effectivePhoto}
              alt={firstName}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.target.src =
                  gender === "female"
                    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800"
                    : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800";
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c101d] via-[#0c101d]/40 to-transparent"></div>

            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Active Now
              </span>
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Verified Builder
              </span>
            </div>

            {/* Bottom Title on Image */}
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {firstName} {lastName || ""}
                  </h2>
                  {age && <span className="text-xl text-slate-300 font-normal">, {age}</span>}
                  <CheckCircle2 className="w-6 h-6 text-sky-400 fill-sky-400/20" />
                </div>
                <p className="text-sm font-semibold text-rose-400 mt-0.5">{developerRole}</p>
              </div>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-7 space-y-6">
            {/* Location & Experience Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#12182b] border border-white/[0.06] flex items-center gap-3">
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Location</span>
                  <span className="text-xs font-bold text-white">Bengaluru, IN</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#12182b] border border-white/[0.06] flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Experience</span>
                  <span className="text-xs font-bold text-white">3+ Years</span>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-[#12182b] border border-white/[0.06] flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Specialty</span>
                  <span className="text-xs font-bold text-white truncate max-w-[110px]">
                    {skills[0] || "Full Stack"}
                  </span>
                </div>
              </div>
            </div>

            {/* About / Bio */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
                About & Building Style
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed bg-[#12182b]/60 border border-white/[0.06] rounded-2xl p-4">
                {about ||
                  "Fullstack engineer passionate about modern architecture, micro-interactions, and building scalable cloud products with high test coverage."}
              </p>
            </div>

            {/* Tech Stack & Skills */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
                Tech Stack & Core Competencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {(skills.length > 0
                  ? skills
                  : ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker", "TailwindCSS"]
                ).map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono py-1.5 px-3 rounded-xl bg-[#141b30] border border-white/[0.08] text-slate-200 font-medium flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Social / Portfolio Links */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
                Developer Links
              </h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#12182b] border border-white/[0.08] hover:border-white/20 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-purple-400" /> GitHub Profile
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#12182b] border border-white/[0.08] hover:border-white/20 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Briefcase className="w-3.5 h-3.5 text-sky-400" /> LinkedIn
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#090d16] flex items-center justify-between gap-4">
          <button
            onClick={() => {
              if (onAction) onAction("ignored", _id);
              onClose();
            }}
            className="flex-1 py-3 rounded-xl bg-[#151a2c] hover:bg-rose-950/40 border border-white/10 hover:border-rose-500/40 text-slate-300 hover:text-rose-400 text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <X className="w-4 h-4" /> Pass Candidate
          </button>

          <button
            onClick={() => {
              if (onAction) onAction("interested", _id);
              onClose();
            }}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-rose-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-white" /> Connect with {firstName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDetailModal;
