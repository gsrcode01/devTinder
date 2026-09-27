import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/api";
import { addFeed, appendFeed, removeUserFromFeed } from "../utils/feedSlice";
import TopHeader from "../components/Dashboard/TopHeader";
import Sidebar from "../components/Dashboard/Sidebar";
import FiltersPanel from "../components/Dashboard/FiltersPanel";
import SwipeDeck from "../components/Dashboard/SwipeDeck";
import ActivityPanel from "../components/Dashboard/ActivityPanel";
import { Sparkles, Users, MessageSquare, CheckCircle2 } from "lucide-react";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const getFeed = async (pageNum = 1, isInitial = false) => {
    try {
      setLoading(true);
      const res = await api.get(`/feed?page=${pageNum}&limit=30`);
      const dbUsers = res.data?.data || [];

      if (pageNum === 1) {
        dispatch(addFeed(dbUsers));
        setPage(1);
        setHasMore(dbUsers.length > 0);
      } else {
        if (dbUsers.length > 0) {
          dispatch(appendFeed(dbUsers));
          setPage(pageNum);
        } else {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.error("Error fetching feed from database:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreFeed = useCallback(() => {
    if (!loading && hasMore) {
      getFeed(page + 1);
    }
  }, [loading, hasMore, page]);

  const handleAction = async (status, toUserId) => {
    try {
      await api.post(`/request/send/${status}/${toUserId}`, {});
    } catch (err) {
      console.error("Error sending connection request:", err);
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
    if (user && (!feed || feed.length === 0)) {
      getFeed(1, true);
    }
  }, [user]);

  const [filters, setFilters] = useState({
    lookingFor: "Collaboration",
    role: "All Roles",
    skills: [],
    location: "Any Location",
    distance: 100,
    onlineNow: false,
    hasPhoto: true,
    openToOpps: false,
  });

  // Filter feed by search query, skills, role, and location in real-time
  const activeProfiles = (feed || []).filter((profile) => {
    // 1. Search Bar Query (Skills, Names, Roles)
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      const fullName = `${profile.firstName} ${profile.lastName || ""}`.toLowerCase();
      const skillsMatch = (profile.skills || []).some((s) => s.toLowerCase().includes(query));
      const roleMatch = (profile.about || "").toLowerCase().includes(query);
      if (!fullName.includes(query) && !skillsMatch && !roleMatch) return false;
    }

    // 2. Role Filter
    if (filters.role && filters.role !== "All Roles") {
      const roleTerm = filters.role.toLowerCase();
      const aboutMatch = (profile.about || "").toLowerCase().includes(roleTerm);
      const skillsMatch = (profile.skills || []).some((s) => s.toLowerCase().includes(roleTerm));
      if (!aboutMatch && !skillsMatch) return false;
    }

    // 3. Skills Filter (if any skills are selected in filter chips)
    if (filters.skills && filters.skills.length > 0) {
      const hasSelectedSkill = filters.skills.some((selectedSkill) =>
        (profile.skills || []).some((userSkill) =>
          userSkill.toLowerCase().includes(selectedSkill.toLowerCase())
        )
      );
      if (!hasSelectedSkill) return false;
    }

    return true;
  });

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
                    <span className="text-rose-400">10,500+ active developers</span> ready to collaborate
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Live MongoDB feed loaded with diverse engineering talent.
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
            <FiltersPanel
              filters={filters}
              setFilters={setFilters}
              onReset={() => getFeed(1)}
            />

            {/* 3D Stack Swipe Deck with Continuous Infinite Pagination & Detail Modal */}
            <SwipeDeck
              profiles={activeProfiles}
              onAction={handleAction}
              onLoadMore={loadMoreFeed}
              onRefresh={() => getFeed(1)}
              loading={loading}
            />
          </div>
        </main>

        {/* 3. Right Sidebar Activity & Top Matches Column - Scrolls internally with proper margins */}
        <div className="hidden xl:block w-84 flex-shrink-0 p-4 lg:p-5 border-l border-white/[0.08] bg-[#090d16] h-full overflow-y-auto">
          <ActivityPanel />
        </div>
      </div>
    </div>
  );
};

export default Feed;
