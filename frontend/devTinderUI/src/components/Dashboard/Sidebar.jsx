import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Flame, Heart, MessageSquare, User, Crown, Settings, ArrowRight } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const connections = useSelector((store) => store.connections);
  const requests = useSelector((store) => store.requests);

  const matchesCount = connections ? connections.length : 0;
  const requestsCount = requests ? requests.length : 0;

  const navItems = [
    { label: "Discover", path: "/", icon: Flame, badge: null },
    { label: "Matches", path: "/connections", icon: Heart, badge: matchesCount > 0 ? matchesCount : null },
    { label: "Messages", path: "/messages", icon: MessageSquare, badge: null },
    { label: "Requests", path: "/requests", icon: Heart, badge: requestsCount > 0 ? requestsCount : null },
    { label: "Profile", path: "/profile", icon: User, badge: null },
    { label: "Premium", path: "/premium", icon: Crown, badge: null },
    { label: "Settings", path: "/settings", icon: Settings, badge: null },
  ];

  return (
    <aside className="w-56 lg:w-64 flex-shrink-0 flex flex-col justify-between py-6 px-3.5 bg-[#090d16] border-r border-white/[0.06] h-full overflow-y-auto hidden md:flex">
      {/* Top Nav List */}
      <div className="space-y-1.5">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-rose-500/20 to-purple-600/20 text-white border border-rose-500/30 shadow-lg shadow-rose-950/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? "text-rose-400" : "text-slate-400 group-hover:text-slate-200"
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge !== null && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive
                      ? "bg-rose-500 text-white"
                      : "bg-rose-500/20 text-rose-300 border border-rose-500/20"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Promo & Version Info */}
      <div className="space-y-4 pt-6">
        {/* Upgrade to Pro Card */}
        <Link
          to="/premium"
          className="block relative rounded-2xl p-4 bg-gradient-to-b from-[#151c2e] to-[#0d121f] border border-white/[0.08] hover:border-amber-500/30 overflow-hidden shadow-xl transition-all group cursor-pointer"
        >
          {/* Subtle glowing orb */}
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-rose-500/15 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-all"></div>

          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <h4 className="text-xs font-bold text-white">Upgrade to Pro</h4>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
            Get unlimited likes, see who liked you, and more.
          </p>

          <div className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 group-hover:from-orange-600 group-hover:to-purple-700 text-white text-xs font-bold shadow-md shadow-rose-500/30 flex items-center justify-center gap-1.5 transition-all">
            <span>Upgrade Now</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </Link>

        {/* Handwritten Dev Note & Footer Version */}
        <div className="space-y-2 px-1">
          <p className="font-handwriting text-rose-400/75 text-base tracking-wide select-none leading-none">
            "keep building, keep shipping ♡"
          </p>
          <div className="flex items-center justify-between px-1 text-[10px] text-slate-500 font-mono">
            <span>devTinder</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
