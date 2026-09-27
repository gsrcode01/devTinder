import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { removeUser } from "../../utils/userSlice";

import { Users, UserCheck, LogOut, User as UserIcon, Flame } from "lucide-react";
import DevTinderLogo from "../common/DevTinderLogo";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await api.post("/logout", {});
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };


  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070912]/85 backdrop-blur-xl border-b border-white/[0.06] transition-all duration-300">
      <div className="w-full px-5 sm:px-8 lg:px-12 h-[76px] flex items-center justify-between">
        {/* Brand Logo - Aligned to Left */}
        <Link to="/" className="flex items-center group cursor-pointer transition-transform duration-200 hover:opacity-95">
          <DevTinderLogo width={180} height={46} animated={false} />
        </Link>

        {/* Center Navigation Links for Logged in Users */}
        {user ? (
          <nav className="hidden md:flex items-center gap-1.5 bg-white/[0.03] p-1.5 rounded-full border border-white/[0.08]">
            <Link
              to="/"
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                isActive("/")
                  ? "bg-gradient-to-r from-[#FF4D6D] via-[#EC4899] to-[#A855F7] text-white shadow-[0_4px_16px_rgba(236,72,153,0.3)]"
                  : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <Flame className="w-4 h-4" /> Feed
            </Link>
            <Link
              to="/connections"
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                isActive("/connections")
                  ? "bg-gradient-to-r from-[#FF4D6D] via-[#EC4899] to-[#A855F7] text-white shadow-[0_4px_16px_rgba(236,72,153,0.3)]"
                  : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <Users className="w-4 h-4" /> Connections
            </Link>
            <Link
              to="/requests"
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                isActive("/requests")
                  ? "bg-gradient-to-r from-[#FF4D6D] via-[#EC4899] to-[#A855F7] text-white shadow-[0_4px_16px_rgba(236,72,153,0.3)]"
                  : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <UserCheck className="w-4 h-4" /> Requests
            </Link>
          </nav>
        ) : null}

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden lg:inline text-xs font-medium text-slate-300">
                Hi, <span className="font-semibold text-white">{user.firstName}</span>
              </span>

              {/* Avatar Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar ring-1 ring-white/20 hover:ring-rose-400/60 transition-all p-0.5"
                >
                  <div className="w-9 rounded-full overflow-hidden bg-slate-800">
                    <img
                      alt={user.firstName}
                      src={
                        user.photourl ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                      }
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-50 p-2.5 shadow-2xl bg-[#0f1422] border border-white/10 rounded-2xl w-60 space-y-1 text-slate-200"
                >
                  <li className="menu-title px-4 py-2 border-b border-white/5">
                    <div className="font-bold text-sm text-white">
                      {user.firstName} {user.lastName || ""}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono truncate">{user.emailId}</div>
                  </li>
                  <li>
                    <Link to="/profile" className="py-2.5 flex items-center gap-2 hover:bg-white/5 rounded-xl text-slate-200">
                      <UserIcon className="w-4 h-4 text-purple-400" /> Edit Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/connections" className="py-2.5 flex items-center gap-2 hover:bg-white/5 rounded-xl text-slate-200">
                      <Users className="w-4 h-4 text-sky-400" /> My Connections
                    </Link>
                  </li>
                  <li>
                    <Link to="/requests" className="py-2.5 flex items-center gap-2 hover:bg-white/5 rounded-xl text-slate-200">
                      <UserCheck className="w-4 h-4 text-amber-400" /> Received Requests
                    </Link>
                  </li>
                  <div className="divider my-1 border-white/5"></div>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="py-2.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center gap-2 font-semibold rounded-xl"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="relative group inline-flex items-center justify-center p-[1.5px] rounded-full overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.35)] hover:shadow-[0_0_28px_rgba(236,72,153,0.55)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D6D] via-[#EC4899] to-[#A855F7] rounded-full"></div>
              <div className="relative px-5 py-2 bg-[#070912] group-hover:bg-transparent rounded-full transition-colors duration-200">
                <span className="text-xs font-bold text-white tracking-wide">Sign up</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );

};

export default NavBar;
