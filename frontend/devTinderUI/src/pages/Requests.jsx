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
} from "lucide-react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
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

  const handleReview = async (status, requestId) => {
    try {
      await api.post(`/request/review/${status}/${requestId}`, {});
      dispatch(removeRequest(requestId));
      setToastMessage(
        status === "accepted"
          ? "Request accepted! You have a new connection."
          : "Request rejected."
      );
      setTimeout(() => setToastMessage(""), 3500);
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  useEffect(() => {
    // Only fetch requests if not already cached in Redux store
    if (!requests || requests.length === 0) {
      fetchRequests();
    }
  }, [requests]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#070913] text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Fixed Top Header */}
      <TopHeader />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden max-w-[1720px] w-full mx-auto">
        {/* Left Navigation Sidebar */}
        <Sidebar />

        {/* Center Content - Scrolls internally */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto h-full max-w-5xl">
          {/* Toast Notification (Pure Tailwind CSS) */}
          {toastMessage && (
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
              <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-white/15">
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span>{toastMessage}</span>
              </div>
            </div>
          )}

          {/* Header Row */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-3">
                <UserCheck className="w-8 h-8 text-emerald-400" /> Pending Requests
              </h1>
              <span className="font-handwriting text-teal-400/80 text-lg hidden md:inline-block">
                ~ developers eager to hack with you ✨
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Review developers who sent you a connection request and want to collaborate with you.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-16">
              <span className="loading loading-spinner loading-lg text-rose-500"></span>
            </div>
          ) : !requests || requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-[#0b0f1d]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl max-w-md mx-auto shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 flex items-center justify-center mb-4 shadow-xl">
                <Inbox className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-white">No Pending Requests</h2>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                When other developers swipe right or send you a super like, their requests will appear here.
              </p>
              <Link
                to="/"
                className="mt-6 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Explore Discovery Deck</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => {
                const user = request.fromUserId;
                if (!user) return null;

                const { firstName, lastName, photourl, age, gender, about, skills } = user;
                const photo =
                  photourl && !photourl.includes("brave.com")
                    ? photourl
                    : gender === "female"
                    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"
                    : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500";

                return (
                  <div
                    key={request._id}
                    className="bg-[#0b0f1d]/90 backdrop-blur-xl border border-white/[0.08] hover:border-emerald-500/40 rounded-3xl p-5 shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={photo}
                          alt={firstName}
                          className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/30 shadow-md"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-[#0b0f1d]"></span>
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                          {firstName} {lastName || ""}
                          {age && <span className="font-normal text-xs text-slate-400">{age} yrs</span>}
                        </h3>

                        <p className="text-xs text-slate-300 mt-1 line-clamp-1 italic max-w-md">
                          "{about || "Interested in connecting and collaborating with you!"}"
                        </p>

                        {skills && skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {skills.slice(0, 4).map((skill, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-mono py-0.5 px-2 rounded-md bg-white/[0.06] border border-white/[0.08] text-emerald-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <button
                        onClick={() => handleReview("rejected", request._id)}
                        className="p-3 rounded-2xl bg-white/[0.05] hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-white/[0.08] hover:border-rose-500/30 shadow-md transition-all cursor-pointer"
                        title="Decline Request"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() => handleReview("accepted", request._id)}
                        className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                        title="Accept Request"
                      >
                        <Check className="w-4 h-4" />
                        <span>Accept Match</span>
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
