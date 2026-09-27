import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { addRequests, removeRequest } from "../utils/requestSlice";
import TopHeader from "../components/Dashboard/TopHeader";
import Sidebar from "../components/Dashboard/Sidebar";
import {
  UserCheck,
  Check,
  X,
  Code2,
  Sparkles,
  Inbox,
  ChevronRight,
  Flame,
  CheckCircle2,
  MapPin,
} from "lucide-react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get("/user/requests/received");
      dispatch(addRequests(res.data?.data || []));
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && requests === null) {
      fetchRequests();
    }
  }, [user, requests]);

  const handleReview = async (status, requestId) => {
    try {
      await api.post(`/request/review/${status}/${requestId}`, {});
      dispatch(removeRequest(requestId));
      setToastMessage(
        status === "accepted"
          ? "🎉 Request accepted! You have a new connection."
          : "Request rejected."
      );
      setTimeout(() => setToastMessage(""), 3500);
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#070913] text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-white/15">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Fixed Top Header */}
      <TopHeader />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden max-w-[1720px] w-full mx-auto">
        {/* Left Navigation Sidebar */}
        <Sidebar />

        {/* Center Content - Scrolls internally */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto h-full max-w-5xl">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
                  <UserCheck className="w-8 h-8 text-rose-400" /> Connection Requests
                </h1>
                <span className="font-handwriting text-rose-400/80 text-lg hidden md:inline-block">
                  ~ developers who want to connect ♡
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                You have {requests?.length || 0} pending request{requests?.length === 1 ? "" : "s"}. Accept to start collaborating!
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-16">
              <div className="w-10 h-10 border-2 border-rose-500/30 border-t-rose-500 rounded-full animate-spin"></div>
            </div>
          ) : !requests || requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-[#0b0f1d]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl max-w-md mx-auto shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500/20 to-purple-600/20 border border-rose-500/30 flex items-center justify-center mb-4 shadow-xl">
                <Inbox className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">No Pending Requests</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                You're all caught up! As other developers discover your profile and express interest, their requests will appear here.
              </p>
              <Link
                to="/"
                className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Discover Developers
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((req) => {
                const person = req.fromUserId;
                if (!person) return null;

                const effectivePhoto =
                  person.photourl && !person.photourl.includes("brave.com")
                    ? person.photourl
                    : person.gender === "female"
                    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"
                    : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500";

                return (
                  <div
                    key={req._id}
                    className="bg-[#0c101d]/90 backdrop-blur-xl border border-white/[0.08] hover:border-rose-500/30 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-5 transition-all duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={effectivePhoto}
                        alt={person.firstName}
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/10 flex-shrink-0"
                        onError={(e) => {
                          e.target.src =
                            person.gender === "female"
                              ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"
                              : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500";
                        }}
                      />

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg text-white">
                            {person.firstName} {person.lastName || ""}{" "}
                            {person.age ? (
                              <span className="font-normal text-sm text-slate-400 ml-1">
                                {person.age}
                              </span>
                            ) : (
                              ""
                            )}
                          </h3>
                        </div>

                        <p className="text-xs text-rose-400 font-semibold mt-0.5">
                          {person.skills && person.skills.length > 0
                            ? `${person.skills[0]} Developer`
                            : "Fullstack Engineer"}
                        </p>

                        <p className="text-xs text-slate-300 mt-2 line-clamp-2 max-w-xl">
                          {person.about || "Interested in collaborating and building together!"}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {(person.skills || ["React", "TypeScript"]).map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.06] text-slate-200 border border-white/[0.06]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: Accept & Reject */}
                    <div className="flex items-center gap-3 self-end sm:self-center flex-shrink-0">
                      <button
                        onClick={() => handleReview("rejected", req._id)}
                        className="px-4 py-2.5 rounded-xl bg-[#151a2c] hover:bg-rose-950/40 border border-white/10 hover:border-rose-500/40 text-slate-300 hover:text-rose-400 text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <X className="w-4 h-4" /> Ignore
                      </button>

                      <button
                        onClick={() => handleReview("accepted", req._id)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer"
                      >
                        <Check className="w-4 h-4" /> Accept & Connect
                      </button>
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

export default Requests;
