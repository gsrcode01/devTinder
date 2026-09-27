import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { removeUser } from "../utils/userSlice";
import TopHeader from "../components/Dashboard/TopHeader";
import Sidebar from "../components/Dashboard/Sidebar";
import {
  Shield,
  KeyRound,
  Bell,
  Sliders,
  Eye,
  Trash2,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Smartphone,
  Globe,
  Sparkles,
  Save,
} from "lucide-react";

const Settings = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("security");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Preferences state
  const [distance, setDistance] = useState(50);
  const [ageRange, setAgeRange] = useState(28);
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [matchAlerts, setMatchAlerts] = useState(true);
  const [incognito, setIncognito] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match!" });
      return;
    }
    if (newPassword.length < 8) {
      setMessage({
        type: "error",
        text: "Password must be at least 8 characters long with uppercase, lowercase, number, and special symbol.",
      });
      return;
    }

    try {
      setPasswordLoading(true);
      setMessage({ type: "", text: "" });
      const res = await api.patch("/profile/password", {
        currentPassword,
        newPassword,
      });
      setMessage({
        type: "success",
        text: res.data?.message || "Password updated successfully!",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || err.response?.data || err.message || "Failed to update password",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleSavePreferences = () => {
    setMessage({
      type: "success",
      text: "Preferences and discovery settings saved successfully!",
    });
    setTimeout(() => setMessage({ type: "", text: "" }), 3500);
  };

  const handleLogoutAll = async () => {
    try {
      await api.post("/logout", {});
      localStorage.removeItem("token");
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const tabs = [
    { id: "security", label: "Security & Password", icon: KeyRound },
    { id: "discovery", label: "Discovery Preferences", icon: Sliders },
    { id: "notifications", label: "Notifications & Alerts", icon: Bell },
    { id: "privacy", label: "Privacy & Visibility", icon: Eye },
    { id: "danger", label: "Account Control", icon: Shield },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#070913] text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Fixed Top Header */}
      <TopHeader />

      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden max-w-[1720px] w-full mx-auto">
        {/* Left Navigation Sidebar */}
        <Sidebar />

        {/* Center Main Settings Area - Scrolls internally */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto h-full max-w-5xl">
          {/* Header Title */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
              <Sliders className="w-8 h-8 text-amber-400" /> Account Settings
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Manage your security, algorithm discovery preferences, alerts, and account privacy.
            </p>
          </div>

          {/* Feedback Alert Toast */}
          {message.text && (
            <div
              className={`p-4 rounded-2xl mb-6 text-xs sm:text-sm font-semibold flex items-center gap-3 shadow-xl transition-all ${
                message.type === "success"
                  ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-300"
                  : "bg-rose-950/80 border border-rose-500/40 text-rose-300"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-400" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {/* Settings Tabs & Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Tabs Menu */}
            <div className="md:col-span-4 space-y-2">
              <div className="bg-[#0b0f1d]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-3 shadow-xl">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-600/20 text-white border border-rose-500/30 shadow-md"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          isActive ? "text-rose-400" : "text-slate-500"
                        }`}
                      />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Info Box */}
              <div className="bg-[#0b0f1d]/60 border border-white/[0.06] rounded-3xl p-5 shadow-lg hidden md:block">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-400" /> DevTinder Security
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Your credentials and password hashes are encrypted with salted Bcrypt. Tokens expire securely in 24 hours.
                </p>
              </div>
            </div>

            {/* Right Tab Content Panel */}
            <div className="md:col-span-8">
              {/* TAB 1: SECURITY & PASSWORD */}
              {activeTab === "security" && (
                <div className="bg-[#0b0f1d]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <KeyRound className="w-5 h-5 text-amber-400" /> Change Password
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Ensure your account is using a strong, unique password.
                    </p>
                  </div>

                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          required
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full bg-[#111628] border border-white/[0.08] focus:border-rose-500 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          New Password
                        </label>
                        <input
                          type="password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Min 8 chars, 1 uppercase, 1 symbol"
                          className="w-full bg-[#111628] border border-white/[0.08] focus:border-rose-500 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Repeat new password"
                          className="w-full bg-[#111628] border border-white/[0.08] focus:border-rose-500 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all font-mono"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={passwordLoading}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white text-xs font-bold shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                    >
                      {passwordLoading ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Update Password
                    </button>
                  </form>

                  <div className="border-t border-white/[0.06] pt-6 space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider text-slate-400">
                      Active Devices & Sessions
                    </h3>

                    <div className="p-3.5 rounded-2xl bg-[#111628] border border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white flex items-center gap-2">
                            Windows PC • Chrome Browser
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
                              Current Session
                            </span>
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            IP: 106.216.228.67 • Bengaluru, IN
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: DISCOVERY PREFERENCES */}
              {activeTab === "discovery" && (
                <div className="bg-[#0b0f1d]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-rose-400" /> Matching Preferences
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Fine-tune how the algorithm curates developers in your swipe feed.
                    </p>
                  </div>

                  {/* Max Distance Slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-300">Maximum Distance Radius</span>
                      <span className="text-rose-400 font-mono">{distance} km</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="200"
                      value={distance}
                      onChange={(e) => setDistance(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>5 km</span>
                      <span>100 km</span>
                      <span>200 km (Global)</span>
                    </div>
                  </div>

                  {/* Age Range Slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-300">Target Developer Age Limit</span>
                      <span className="text-purple-400 font-mono">Up to {ageRange} yrs</span>
                    </div>
                    <input
                      type="range"
                      min="18"
                      max="50"
                      value={ageRange}
                      onChange={(e) => setAgeRange(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>18 yrs</span>
                      <span>35 yrs</span>
                      <span>50 yrs</span>
                    </div>
                  </div>

                  {/* Toggles (Pure Tailwind CSS) */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#111628] border border-white/[0.06]">
                      <div>
                        <p className="text-xs font-bold text-white">
                          Verified Developers Only
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Show only accounts with verified GitHub/LinkedIn badges
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={verifiedOnly}
                        onClick={() => setVerifiedOnly(!verifiedOnly)}
                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          verifiedOnly ? "bg-rose-500 shadow-md shadow-rose-500/40" : "bg-slate-700"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            verifiedOnly ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#111628] border border-white/[0.06]">
                      <div>
                        <p className="text-xs font-bold text-white">
                          Global Developer Discovery
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Match with remote developers across US, Europe, and Asia
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        className="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-purple-600 shadow-md shadow-purple-600/40"
                      >
                        <span className="pointer-events-none inline-block h-4 w-4 transform translate-x-4 rounded-full bg-white shadow ring-0" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleSavePreferences}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Preferences
                  </button>
                </div>
              )}

              {/* TAB 3: NOTIFICATIONS */}
              {activeTab === "notifications" && (
                <div className="bg-[#0b0f1d]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Bell className="w-5 h-5 text-sky-400" /> Notifications & Sound
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Choose when and how you receive DevTinder alerts.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#111628] border border-white/[0.06]">
                      <div>
                        <p className="text-xs font-bold text-white">New Match Alerts</p>
                        <p className="text-[11px] text-slate-400">
                          Receive instant push notifications when a developer matches back
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={matchAlerts}
                        onClick={() => setMatchAlerts(!matchAlerts)}
                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          matchAlerts ? "bg-rose-500 shadow-md shadow-rose-500/40" : "bg-slate-700"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            matchAlerts ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#111628] border border-white/[0.06]">
                      <div>
                        <p className="text-xs font-bold text-white">Email Digest</p>
                        <p className="text-[11px] text-slate-400">
                          Weekly roundup of top developer profiles interested in your stack
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={emailAlerts}
                        onClick={() => setEmailAlerts(!emailAlerts)}
                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          emailAlerts ? "bg-purple-600 shadow-md shadow-purple-600/40" : "bg-slate-700"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            emailAlerts ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#111628] border border-white/[0.06]">
                      <div>
                        <p className="text-xs font-bold text-white">Sound Effects</p>
                        <p className="text-[11px] text-slate-400">
                          Play chime on new match or message received
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        className="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-teal-500 shadow-md shadow-teal-500/40"
                      >
                        <span className="pointer-events-none inline-block h-4 w-4 transform translate-x-4 rounded-full bg-white shadow ring-0" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleSavePreferences}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Notification Settings
                  </button>
                </div>
              )}

              {/* TAB 4: PRIVACY */}
              {activeTab === "privacy" && (
                <div className="bg-[#0b0f1d]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Eye className="w-5 h-5 text-emerald-400" /> Privacy & Visibility
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Control who sees your profile and online activity.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#111628] border border-white/[0.06]">
                      <div>
                        <p className="text-xs font-bold text-white">Show Online Status</p>
                        <p className="text-[11px] text-slate-400">
                          Displays the green active dot on your card when you're browsing
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={onlineStatus}
                        onClick={() => setOnlineStatus(!onlineStatus)}
                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          onlineStatus ? "bg-emerald-500 shadow-md shadow-emerald-500/40" : "bg-slate-700"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            onlineStatus ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#111628] border border-white/[0.06]">
                      <div>
                        <p className="text-xs font-bold text-white">Incognito Mode</p>
                        <p className="text-[11px] text-slate-400">
                          Only developers you have already swiped right on can see your profile
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={incognito}
                        onClick={() => setIncognito(!incognito)}
                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          incognito ? "bg-amber-500 shadow-md shadow-amber-500/40" : "bg-slate-700"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            incognito ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleSavePreferences}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Privacy Settings
                  </button>
                </div>
              )}

              {/* TAB 5: DANGER ZONE */}
              {activeTab === "danger" && (
                <div className="bg-[#0b0f1d]/90 backdrop-blur-xl border border-rose-500/20 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-rose-400 flex items-center gap-2">
                      <Shield className="w-5 h-5" /> Account Control & Danger Zone
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Irreversible account actions and global session controls.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-white">
                          Log Out From All Devices
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Invalidates all active JWT tokens across all mobile and web browsers.
                        </p>
                      </div>
                      <button
                        onClick={handleLogoutAll}
                        className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Log Out All
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-rose-300">
                          Delete DevTinder Account
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Permanently deletes your developer profile, matches, and conversation history.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete your DevTinder account? This action cannot be undone."
                            )
                          ) {
                            handleLogoutAll();
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-lg shadow-rose-950 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
