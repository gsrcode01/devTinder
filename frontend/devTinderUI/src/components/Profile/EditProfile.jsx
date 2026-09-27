import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import { addUser } from "../../utils/userSlice";
import UserCard from "../Feed/UserCard";
import {
  Save,
  User,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Image,
  Code2,
  Settings,
  ChevronRight,
} from "lucide-react";

const photoPresets = [
  { label: "Avatar 1", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700" },
  { label: "Avatar 2", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=700" },
  { label: "Avatar 3", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700" },
  { label: "Avatar 4", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700" },
  { label: "Avatar 5", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700" },
  { label: "Avatar 6", url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=700" },
];

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photourl, setPhotourl] = useState(user?.photourl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "female");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills ? user.skills.join(", ") : "");

  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhotourl(user.photourl || "");
      setAge(user.age || "");
      setGender(user.gender || "female");
      setAbout(user.about || "");
      setSkills(user.skills ? user.skills.join(", ") : "");
    }
  }, [user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setError("");
    setToast("");
    setLoading(true);

    try {
      const skillsArray = skills
        ? skills.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

      const res = await api.patch("/profile/edit", {
        firstName,
        lastName,
        photourl,
        age: age ? Number(age) : undefined,
        gender,
        about,
        skills: skillsArray,
      });

      if (res.data?.data) {
        dispatch(addUser(res.data.data));
      }
      setToast("Profile updated successfully!");
      setTimeout(() => setToast(""), 3500);
    } catch (err) {
      setError(
        err.response?.data?.message || err.response?.data || err.message || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const previewUser = {
    firstName: firstName || "Developer",
    lastName: lastName || "",
    photourl: photourl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700",
    age: age || "",
    gender: gender || "female",
    about: about || "Building delightful developer tools & full stack apps.",
    skills: skills ? skills.split(",").map((s) => s.trim()).filter(Boolean) : ["React", "TypeScript", "Node.js"],
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Toast Alert (Pure Tailwind CSS) */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-white/15">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>{toast}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
              <User className="w-8 h-8 text-rose-400" /> Edit Developer Profile
            </h1>
            <span className="font-handwriting text-rose-400/80 text-lg hidden md:inline-block">
              ~ craft your personal brand ✨
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Customize your avatar, bio, and tech stack to attract the best matches.
          </p>
        </div>

        <Link
          to="/settings"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111628] border border-white/[0.08] hover:border-white/[0.18] text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
        >
          <Settings className="w-4 h-4 text-amber-400" />
          <span>Account & Security Settings</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7 bg-[#0b0f1d]/90 backdrop-blur-xl border border-white/[0.08] p-6 sm:p-7 rounded-3xl shadow-2xl space-y-5">
          <form onSubmit={handleSaveProfile} className="space-y-4">
            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-[#111628] border border-white/[0.08] focus:border-rose-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-[#111628] border border-white/[0.08] focus:border-rose-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Age
                </label>
                <input
                  type="number"
                  min="18"
                  max="80"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-[#111628] border border-white/[0.08] focus:border-rose-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-[#111628] border border-white/[0.08] focus:border-rose-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Photo URL
              </label>
              <input
                type="url"
                value={photourl}
                onChange={(e) => setPhotourl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#111628] border border-white/[0.08] focus:border-rose-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all font-mono"
              />

              {/* Photo presets */}
              <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex-shrink-0">
                  Presets:
                </span>
                {photoPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPhotourl(preset.url)}
                    className="flex-shrink-0 rounded-lg overflow-hidden ring-1 ring-white/10 hover:ring-rose-400 transition-all cursor-pointer"
                    title={preset.label}
                  >
                    <img src={preset.url} alt={preset.label} className="w-8 h-8 object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Skills & Tech Stack (Comma separated)</span>
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, Next.js, TypeScript, Tailwind CSS, Redux"
                className="w-full bg-[#111628] border border-white/[0.08] focus:border-rose-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                About / Bio
              </label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows="3"
                placeholder="Tell others what technologies you love and what you want to build..."
                className="w-full bg-[#111628] border border-white/[0.08] focus:border-rose-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-bold text-xs shadow-lg shadow-rose-500/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Save Profile Changes</span>
            </button>
          </form>
        </div>

        {/* Right Live Preview Card */}
        <div className="lg:col-span-5 flex flex-col items-center sticky top-[96px]">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" /> Live Discovery Card Preview
          </div>
          <UserCard user={previewUser} />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
