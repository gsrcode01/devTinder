import { useState } from "react";
import { Search, ChevronDown, RotateCcw } from "lucide-react";

const popularSkills = [
  "React",
  "Node.js",
  "Python",
  "TypeScript",
  "AWS",
  "Next.js",
  "MongoDB",
  "Docker",
  "Go",
  "Rust",
  "PostgreSQL",
  "Kubernetes",
];

const FiltersPanel = ({ filters = {}, setFilters, onReset }) => {
  const [skillSearch, setSkillSearch] = useState("");

  const lookingForOptions = ["Friendship", "Collaboration", "Mentorship", "Dating"];

  const selectedLookingFor = filters.lookingFor || "Collaboration";
  const selectedRole = filters.role || "All Roles";
  const selectedSkills = filters.skills || [];
  const selectedLocation = filters.location || "Any Location";
  const distance = filters.distance || 100;
  const onlineNow = filters.onlineNow || false;
  const hasPhoto = filters.hasPhoto !== false;
  const openToOpps = filters.openToOpps || false;

  const updateFilter = (key, value) => {
    if (setFilters) {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const toggleSkill = (skill) => {
    const current = selectedSkills;
    const next = current.includes(skill)
      ? current.filter((s) => s !== skill)
      : [...current, skill];
    updateFilter("skills", next);
  };

  const handleClearAll = () => {
    if (setFilters) {
      setFilters({
        lookingFor: "Collaboration",
        role: "All Roles",
        skills: [],
        location: "Any Location",
        distance: 100,
        onlineNow: false,
        hasPhoto: true,
        openToOpps: false,
      });
    }
    if (onReset) onReset();
  };

  return (
    <div className="w-full lg:w-72 flex-shrink-0 bg-[#0c101c]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-5 shadow-xl space-y-5 select-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white tracking-tight">Candidate Filters</h3>
        <button
          onClick={handleClearAll}
          className="text-xs text-rose-400 hover:text-rose-300 font-semibold cursor-pointer transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* Looking For */}
      <div className="space-y-2">
        <label className="text-[11px] font-medium text-slate-400">Looking for</label>
        <div className="grid grid-cols-2 gap-1.5">
          {lookingForOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => updateFilter("lookingFor", opt)}
              className={`py-2 px-3 rounded-xl text-xs font-medium transition-all text-center cursor-pointer ${
                selectedLookingFor === opt
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm"
                  : "bg-[#141a2c] text-slate-400 hover:text-slate-200 border border-white/[0.04]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Role Dropdown */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-medium text-slate-400">Specialization / Role</label>
        <div className="relative">
          <select
            value={selectedRole}
            onChange={(e) => updateFilter("role", e.target.value)}
            className="w-full bg-[#141a2c] border border-white/[0.08] text-xs text-slate-200 rounded-xl py-2.5 px-3.5 appearance-none focus:outline-none focus:border-rose-500/50 cursor-pointer"
          >
            <option value="All Roles">All Roles</option>
            <option value="Frontend">Frontend Developer</option>
            <option value="Backend">Backend Developer</option>
            <option value="Fullstack">Full Stack Developer</option>
            <option value="DevOps">DevOps & Cloud</option>
            <option value="Mobile">Mobile Engineer</option>
            <option value="AI">AI & ML Engineer</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
        </div>
      </div>

      {/* Skills Search & Filter Pills */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-medium text-slate-400">Filter by Skills</label>
          {selectedSkills.length > 0 && (
            <span className="text-[10px] font-mono text-pink-400 font-bold">
              {selectedSkills.length} selected
            </span>
          )}
        </div>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search skills (e.g. React, Go)..."
            value={skillSearch}
            onChange={(e) => setSkillSearch(e.target.value)}
            className="w-full bg-[#141a2c] border border-white/[0.08] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500/50"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {popularSkills
            .filter((s) => s.toLowerCase().includes(skillSearch.toLowerCase()))
            .map((skill) => {
              const active = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`text-[11px] font-mono py-1 px-2.5 rounded-lg border transition-all cursor-pointer ${
                    active
                      ? "bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-sm"
                      : "bg-[#141a2c] text-slate-400 hover:text-slate-200 border-white/[0.04]"
                  }`}
                >
                  {skill}
                </button>
              );
            })}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-medium text-slate-400">Location</label>
        <div className="relative">
          <select
            value={selectedLocation}
            onChange={(e) => updateFilter("location", e.target.value)}
            className="w-full bg-[#141a2c] border border-white/[0.08] text-xs text-slate-200 rounded-xl py-2.5 px-3.5 appearance-none focus:outline-none focus:border-rose-500/50 cursor-pointer"
          >
            <option value="Any Location">Any Location</option>
            <option value="Bengaluru, India">Bengaluru, India</option>
            <option value="Hyderabad, India">Hyderabad, India</option>
            <option value="Pune, India">Pune, India</option>
            <option value="Delhi NCR, India">Delhi NCR, India</option>
            <option value="Remote">Remote</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
        </div>
      </div>

      {/* Distance Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Distance</span>
          <span className="font-semibold text-rose-400">{distance} km</span>
        </div>
        <input
          type="range"
          min="1"
          max="500"
          value={distance}
          onChange={(e) => updateFilter("distance", Number(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
        />
        <div className="flex justify-between text-[9px] text-slate-500 font-mono">
          <span>1 km</span>
          <span>500+ km</span>
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3 pt-2 border-t border-white/[0.06]">
        {/* Online Now */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-300 font-medium">Active Online Now</span>
          <button
            type="button"
            role="switch"
            aria-checked={onlineNow}
            onClick={() => updateFilter("onlineNow", !onlineNow)}
            className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              onlineNow ? "bg-rose-500 shadow-md shadow-rose-500/40" : "bg-slate-700"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                onlineNow ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Has Photo */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-300 font-medium">Verified Photos Only</span>
          <button
            type="button"
            role="switch"
            aria-checked={hasPhoto}
            onClick={() => updateFilter("hasPhoto", !hasPhoto)}
            className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              hasPhoto ? "bg-rose-500 shadow-md shadow-rose-500/40" : "bg-slate-700"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                hasPhoto ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersPanel;
