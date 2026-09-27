import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/api";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import TopHeader from "../components/Dashboard/TopHeader";
import Sidebar from "../components/Dashboard/Sidebar";
import FiltersPanel from "../components/Dashboard/FiltersPanel";
import SwipeDeck from "../components/Dashboard/SwipeDeck";
import ActivityPanel from "../components/Dashboard/ActivityPanel";
import { Sparkles, Users, MessageSquare, CheckCircle2 } from "lucide-react";

// Default rich developer candidates if database is fresh
const defaultCandidates = [
  {
    _id: "candidate-1",
    firstName: "Priya",
    lastName: "Sharma",
    age: 24,
    gender: "female",
    role: "Frontend Developer at Swiggy",
    photourl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700",
    about: "Building delightful user experiences with React & Next.js. Always up for a good tech conversation ☕",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
  },
  {
    _id: "candidate-2",
    firstName: "Sarah",
    lastName: "Chen",
    age: 26,
    gender: "female",
    role: "Fullstack Architect at Stripe",
    photourl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700",
    about: "Distributed systems, GraphQL, Node.js and TypeScript. Looking for hackathon partners!",
    skills: ["React", "Node.js", "TypeScript", "GraphQL", "Docker"],
  },
  {
    _id: "candidate-3",
    firstName: "Alex",
    lastName: "Rivera",
    age: 27,
    gender: "male",
    role: "AI & ML Engineer at OpenAI",
    photourl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700",
    about: "Working on LLMs, agentic workflows, PyTorch and CUDA kernels.",
    skills: ["Python", "PyTorch", "FastAPI", "Docker", "AWS"],
  },
  {
    _id: "candidate-4",
    firstName: "David",
    lastName: "Kim",
    age: 28,
    gender: "male",
    role: "Go & Rust Developer",
    photourl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700",
    about: "Low-latency systems, database internals, and high-throughput servers.",
    skills: ["Rust", "Go", "Docker", "Kubernetes", "PostgreSQL"],
  },
];

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const getFeed = async () => {
    try {
      setLoading(true);
      const res = await api.get("/feed");
      const dbUsers = res.data?.data;
      if (dbUsers && dbUsers.length > 0) {
        dispatch(addFeed(dbUsers));
      } else {
        // Use rich default candidates if database feed is exhausted
        dispatch(addFeed(defaultCandidates));
      }
    } catch (err) {
      console.error("Error fetching feed, fallback to demo profiles:", err);
      dispatch(addFeed(defaultCandidates));
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (status, toUserId) => {
    try {
      await api.post(`/request/send/${status}/${toUserId}`, {});
    } catch (err) {
      // ignore or log
    }
    dispatch(removeUserFromFeed(toUserId));
    setToastMessage(
      status === "interested"
        ? "🎉 You sent a connection request!"
        : "Candidate skipped"
    );
    setTimeout(() => setToastMessage(""), 3000);
  };

  useEffect(() => {
    // Only call feed API if user is authenticated and feed is not already cached in Redux store
    if (user && (!feed || feed.length === 0)) {
      getFeed();
    }
  }, [user, feed]);

  const activeProfiles = feed && feed.length > 0 ? feed : defaultCandidates;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#070913] text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Toast Notification (Pure Tailwind CSS) */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-white/15">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Header - Always pinned at top */}
      <TopHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Main Dashboard Body with 3 Columns */}
      <div className="flex-1 flex overflow-hidden max-w-[1720px] w-full mx-auto">
        {/* 1. Left Sidebar Navigation */}
        <Sidebar />

        {/* 2. Middle Content Area (Banners, Filters & Swipe Deck) - Scrolls internally */}
        <main className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 space-y-7 overflow-y-auto overflow-x-hidden h-full">
          {/* Top Banner Row with elegant spacing */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-shrink-0">
            {/* Banner 1: Find your developer match */}
            <div className="md:col-span-4 bg-gradient-to-r from-[#17142b] via-[#151c2e] to-[#0e1424] border border-white/[0.08] rounded-3xl p-5 shadow-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500/20 to-purple-600/30 border border-rose-500/30 flex items-center justify-center flex-shrink-0 text-rose-400 shadow-lg">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Find your developer match</span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Connect, collaborate, build something amazing.
                </p>
              </div>
            </div>

            {/* Banner 2: 10,000+ developers connected */}
            <div className="md:col-span-8 bg-gradient-to-r from-[#181124] via-[#131929] to-[#0c1220] border border-white/[0.08] rounded-3xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden relative">
              {/* Connected Avatars & Text */}
              <div className="flex items-center gap-3.5 z-10">
                <div className="flex -space-x-2.5 overflow-hidden">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#131929]"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                    alt="Dev 1"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#131929]"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                    alt="Dev 2"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#131929]"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                    alt="Dev 3"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="text-rose-400">10,000+ developers</span> already connected
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Join a growing community of builders worldwide.
                  </p>
                </div>
              </div>

              {/* World Connection Visual Lines */}
              <div className="hidden sm:flex items-center gap-2 opacity-60 z-10">
                <div className="h-0.5 w-16 bg-gradient-to-r from-rose-500/50 to-purple-500/50"></div>
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80"
                  alt="Dev Network"
                  className="w-7 h-7 rounded-full ring-1 ring-purple-400"
                />
              </div>

              {/* Ambient purple backlight */}
              <div className="absolute top-0 right-0 w-48 h-full bg-purple-600/10 blur-2xl pointer-events-none"></div>
            </div>
          </div>

          {/* Main Discover Area: Filters (Left) + 3D Swipe Deck (Right) */}
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Filters Panel */}
            <FiltersPanel onReset={getFeed} />

            {/* 3D Stack Swipe Deck */}
            <SwipeDeck
              profiles={activeProfiles}
              onAction={handleAction}
              onUndo={() => getFeed()}
            />
          </div>
        </main>

        {/* 3. Right Sidebar Activity & Top Matches Column - Scrolls internally */}
        <div className="hidden xl:block w-80 flex-shrink-0 p-6 pl-0 border-l border-white/[0.06] bg-[#090d16] h-full overflow-y-auto">
          <ActivityPanel />
        </div>
      </div>
    </div>
  );
};

export default Feed;
