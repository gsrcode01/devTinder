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
    // Only fetch connections if not already cached in Redux store
    if (!connections || connections.length === 0) {
      fetchConnections();
    }
  }, [connections]);

  const filtered = connections?.filter((person) => {
    const fullName = `${person.firstName} ${person.lastName || ""}`.toLowerCase();
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
              <span className="loading loading-spinner loading-lg text-rose-500"></span>
            </div>
          ) : !connections || connections.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-[#0b0f1d]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl max-w-md mx-auto shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500/20 to-purple-600/20 border border-rose-500/30 flex items-center justify-center mb-4 shadow-xl">
                <Flame className="w-8 h-8 text-rose-500" />
              </div>
              <h2 className="text-xl font-bold text-white">No Matches Yet</h2>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Explore the discovery feed and swipe right on developers with complementary skills to make new matches!
              </p>
              <Link
                to="/"
                className="mt-6 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Discover Developers</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((person) => {
                const { _id, firstName, lastName, photourl, age, gender, about, skills } = person;
                const photo =
                  photourl && !photourl.includes("brave.com")
                    ? photourl
                    : gender === "female"
                    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"
                    : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500";

                return (
                  <div
                    key={_id}
                    className="bg-[#0b0f1d]/90 backdrop-blur-xl border border-white/[0.08] hover:border-rose-500/40 rounded-3xl p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Avatar & Info */}
                      <div className="flex items-center gap-3.5">
                        <div className="relative">
                          <img
                            src={photo}
                            alt={firstName}
                            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-rose-500/30 shadow-md"
                          />
                          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-[#0b0f1d]"></span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-sm text-white truncate flex items-center gap-1.5">
                            {firstName} {lastName || ""}
                            {age && <span className="font-normal text-xs text-slate-400">{age}</span>}
                          </h3>
                          <p className="text-[11px] text-rose-400 font-medium truncate mt-0.5">
                            {skills && skills.length > 0 ? `${skills[0]} Developer` : "Full Stack Developer"}
                          </p>
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>Bengaluru, IN</span>
                          </div>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-slate-300 mt-3.5 line-clamp-2 leading-relaxed italic">
                        "{about || "Building cool products and excited to pair program."}"
                      </p>

                      {/* Skills */}
                      {skills && skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {skills.slice(0, 3).map((skill, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-mono py-0.5 px-2 rounded-md bg-white/[0.06] border border-white/[0.08] text-slate-200"
                            >
                              {skill}
                            </span>
                          ))}
                          {skills.length > 3 && (
                            <span className="text-[10px] font-mono py-0.5 px-1.5 rounded-md bg-white/[0.04] text-slate-400">
                              +{skills.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 text-[10px] font-bold">
                        <Sparkles className="w-3 h-3 text-emerald-400" /> Connected
                      </span>

                      <Link
                        to={`/messages?user=${_id}`}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-500/20 to-purple-600/20 hover:from-rose-500 hover:to-purple-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Message
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
