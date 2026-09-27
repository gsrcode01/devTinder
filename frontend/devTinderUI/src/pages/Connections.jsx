import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { addConnections } from "../utils/connectionSlice";
import TopHeader from "../components/Dashboard/TopHeader";
import Sidebar from "../components/Dashboard/Sidebar";
import {
  Users,
  MessageCircle,
  Code2,
  Sparkles,
  MapPin,
  Briefcase,
  ChevronRight,
  Flame,
  Search,
} from "lucide-react";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const res = await api.get("/user/connections");
      dispatch(addConnections(res.data?.data || []));
    } catch (err) {
      console.error("Error fetching connections:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && connections === null) {
      fetchConnections();
    }
  }, [user, connections]);

  const filtered = (connections || []).filter((person) => {
    if (!person) return false;
    const fullName = `${person.firstName || ""} ${person.lastName || ""}`.toLowerCase();
    const skillsString = (person.skills || []).join(" ").toLowerCase();
    const query = searchTerm.toLowerCase();
    return fullName.includes(query) || skillsString.includes(query);
  });

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#070913] text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Fixed Top Header */}
      <TopHeader />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden max-w-[1720px] w-full mx-auto">
        {/* Left Navigation Sidebar */}
        <Sidebar />

        {/* Center Content - Scrolls internally */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto h-full max-w-6xl">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
                  <Users className="w-8 h-8 text-rose-400" /> Developer Matches
                </h1>
                <span className="font-handwriting text-rose-400/80 text-lg hidden md:inline-block">
                  ~ your dream team in the making ♡
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                You have {connections?.length || 0} mutual connection{connections?.length === 1 ? "" : "s"}. Reach out and start collaborating!
              </p>
            </div>

            {/* Match Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#111628] border border-white/[0.08] focus:border-rose-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-16">
              <div className="w-10 h-10 border-2 border-rose-500/30 border-t-rose-500 rounded-full animate-spin"></div>
            </div>
          ) : !connections || connections.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-[#0b0f1d]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl max-w-md mx-auto shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500/20 to-purple-600/20 border border-rose-500/30 flex items-center justify-center mb-4 shadow-xl">
                <Flame className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">No Matches Yet</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                When you like a developer and they accept your request, they will appear here. Start swiping on the discover feed!
              </p>
              <Link
                to="/"
                className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Start Swiping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((person) => {
                const effectivePhoto =
                  person.photourl && !person.photourl.includes("brave.com")
                    ? person.photourl
                    : person.gender === "female"
                    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"
                    : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500";

                return (
                  <div
                    key={person._id}
                    className="bg-[#0c101d]/90 backdrop-blur-xl border border-white/[0.08] hover:border-rose-500/40 rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Avatar + Top details */}
                      <div className="flex items-start gap-3.5">
                        <div className="relative">
                          <img
                            src={effectivePhoto}
                            alt={person.firstName}
                            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/10 group-hover:ring-rose-500/40 transition-all"
                            onError={(e) => {
                              e.target.src =
                                person.gender === "female"
                                  ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"
                                  : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500";
                            }}
                          />
                          <span className="w-3 h-3 bg-emerald-400 border-2 border-[#0c101d] rounded-full absolute -top-1 -right-1"></span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base text-white group-hover:text-rose-300 transition-colors truncate">
                            {person.firstName} {person.lastName || ""}{" "}
                            {person.age ? (
                              <span className="font-normal text-xs text-slate-400 ml-1">
                                {person.age}
                              </span>
                            ) : (
                              ""
                            )}
                          </h3>

                          <p className="text-xs text-slate-300 font-medium truncate mt-0.5">
                            {person.skills && person.skills.length > 0
                              ? `${person.skills[0]} Developer`
                              : "Software Engineer"}
                          </p>

                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                            <MapPin className="w-3 h-3 text-rose-400" />
                            <span>Bengaluru, IN</span>
                          </div>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-slate-300 mt-3.5 line-clamp-2 leading-relaxed">
                        {person.about || "Passionate about building scalable developer software."}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {(person.skills || ["React", "Node.js"]).slice(0, 4).map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.05] text-slate-200 border border-white/[0.06]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-[10px] font-medium text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Mutual Connection
                      </span>

                      <Link
                        to={`/messages?user=${person._id}`}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-500/20 hover:scale-105 active:scale-95 transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Chat
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Connections;
