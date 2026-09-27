import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { removeUser } from "../../utils/userSlice";
import { addRequests } from "../../utils/requestSlice";
import { Search, Bell, ChevronDown, User, Settings, LogOut, Heart, MessageSquare } from "lucide-react";
import DevTinderLogo from "../common/DevTinderLogo";

const TopHeader = ({ searchQuery, setSearchQuery }) => {
  const user = useSelector((store) => store.user);
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (user && requests === null) {
      api.get("/user/requests/received")
        .then((res) => {
          if (res.data?.data) {
            dispatch(addRequests(res.data.data));
          }
        })
        .catch(() => {});
    }
  }, [user, requests, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/logout", {});
      localStorage.removeItem("token");
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const pendingCount = requests ? requests.length : 0;

  return (
    <header className="w-full h-[72px] flex-shrink-0 bg-[#090d16]/95 backdrop-blur-2xl border-b border-white/[0.08] px-4 sm:px-6 flex items-center justify-between z-50 shadow-2xl">
      {/* Left: Brand Logo */}
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center group cursor-pointer">
          <DevTinderLogo width={165} height={42} animated={false} />
        </Link>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-xl mx-4 sm:mx-8 hidden md:block">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 absolute left-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by skills, roles, or interests..."
            value={searchQuery || ""}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            className="w-full bg-[#111625] border border-white/[0.08] hover:border-white/[0.15] focus:border-[#ec4899] rounded-xl pl-11 pr-14 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ec4899]/15 transition-all"
          />
          <div className="absolute right-3 px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-[10px] font-mono font-semibold text-slate-400 pointer-events-none">
            ⌘ K
          </div>
        </div>
      </div>

      {/* Right: Notifications & User Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notification Bell with Badge */}
        <Link
          to="/requests"
          className="relative p-2.5 rounded-xl bg-[#111625] border border-white/[0.08] hover:border-white/[0.18] text-slate-300 hover:text-white transition-all cursor-pointer"
          title="Notifications & Requests"
        >
          <Bell className="w-4 h-4" />
          {pendingCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse shadow-md shadow-rose-500/50">
              {pendingCount}
            </span>
          )}
        </Link>

        {/* User Profile Pill & Dropdown (100% Tailwind CSS) */}
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-[#111625] border border-white/[0.08] hover:border-white/[0.18] cursor-pointer transition-all focus:outline-none"
            >
              <img
                src={
                  user.photourl ||
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                }
                alt={user.firstName}
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10"
              />
              <div className="hidden lg:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-white tracking-tight">
                  {user.firstName} {user.lastName || ""}
                </span>
                <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                  {user.skills && user.skills.length > 0
                    ? `${user.skills[0]} Developer`
                    : "Full Stack Developer"}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 ml-1 hidden lg:block transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 z-50 p-2 shadow-2xl bg-[#0f1422] border border-white/10 rounded-2xl w-60 space-y-1 text-slate-200 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-white/5">
                  <div className="font-bold text-sm text-white">
                    {user.firstName} {user.lastName || ""}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{user.emailId}</div>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="w-full px-3 py-2.5 flex items-center gap-2.5 text-xs font-medium hover:bg-white/5 rounded-xl transition-colors text-slate-300 hover:text-white"
                >
                  <User className="w-4 h-4 text-purple-400" /> Edit Profile
                </Link>

                <Link
                  to="/connections"
                  onClick={() => setDropdownOpen(false)}
                  className="w-full px-3 py-2.5 flex items-center gap-2.5 text-xs font-medium hover:bg-white/5 rounded-xl transition-colors text-slate-300 hover:text-white"
                >
                  <Heart className="w-4 h-4 text-rose-400" /> Matches
                </Link>

                <Link
                  to="/messages"
                  onClick={() => setDropdownOpen(false)}
                  className="w-full px-3 py-2.5 flex items-center gap-2.5 text-xs font-medium hover:bg-white/5 rounded-xl transition-colors text-slate-300 hover:text-white"
                >
                  <MessageSquare className="w-4 h-4 text-sky-400" /> Messages
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="w-full px-3 py-2.5 flex items-center gap-2.5 text-xs font-medium hover:bg-white/5 rounded-xl transition-colors text-slate-300 hover:text-white"
                >
                  <Settings className="w-4 h-4 text-amber-400" /> Settings
                </Link>

                <div className="h-px bg-white/5 my-1"></div>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                  className="w-full px-3 py-2.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center gap-2.5 text-xs font-semibold rounded-xl transition-colors cursor-pointer text-left"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold text-xs shadow-md shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
};

export default TopHeader;
