import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, Link } from "react-router-dom";
import api from "../utils/api";
import { addConnections } from "../utils/connectionSlice";
import TopHeader from "../components/Dashboard/TopHeader";
import Sidebar from "../components/Dashboard/Sidebar";
import {
  MessageSquare,
  Send,
  Code2,
  Phone,
  Video,
  Info,
  Search,
  CheckCheck,
  Sparkles,
  Users,
  ChevronRight,
  Flame,
  Laptop,
  Zap,
} from "lucide-react";

// Default conversations mapped by contact ID
const initialConversations = {
  default: [
    {
      id: 1,
      sender: "them",
      text: "Hey! Saw your profile on DevTinder. Are you building full-stack apps with React & Node?",
      time: "10:32 AM",
    },
    {
      id: 2,
      sender: "me",
      text: "Hey there! Yes, primarily with Next.js, TypeScript, and MongoDB backends.",
      time: "10:34 AM",
    },
    {
      id: 3,
      sender: "them",
      text: "Awesome! We're building an open-source developer productivity tool. Would love to collaborate if you're interested!",
      time: "10:36 AM",
    },
  ],
};

const Messages = () => {
  const connections = useSelector((store) => store.connections);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const targetUserId = searchParams.get("user");

  const [activeContact, setActiveContact] = useState(null);
  const [chatSearch, setChatSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [conversations, setConversations] = useState(initialConversations);
  const messagesEndRef = useRef(null);

  const fetchConnections = async () => {
    try {
      const res = await api.get("/user/connections");
      const list = res.data?.data || [];
      dispatch(addConnections(list));

      if (list.length > 0 && !activeContact) {
        if (targetUserId) {
          const found = list.find((c) => c._id === targetUserId);
          setActiveContact(found || list[0]);
        } else {
          setActiveContact(list[0]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user && connections === null) {
      fetchConnections();
    } else if (connections && connections.length > 0 && !activeContact) {
      if (targetUserId) {
        const found = connections.find((c) => c._id === targetUserId);
        setActiveContact(found || connections[0]);
      } else {
        setActiveContact(connections[0]);
      }
    }
  }, [user, connections, targetUserId]);

  const activeContactId = activeContact?._id || "default";
  const currentMessages = conversations[activeContactId] || initialConversations.default;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputText.trim() || !activeContact) return;

    const newMsg = {
      id: Date.now(),
      sender: "me",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setConversations((prev) => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || initialConversations.default), newMsg],
    }));
    setInputText("");

    // Realistic developer automated reply simulation after 1s
    setTimeout(() => {
      const replies = [
        "Sounds like a great architecture. Let me review the repo branch!",
        "Love that approach! Let's connect on GitHub and start the pull request.",
        "Checked the schema design, looks super clean. Let's build it together!",
        "Awesome! I'll push the API updates right away.",
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setConversations((prev) => ({
        ...prev,
        [activeContactId]: [
          ...(prev[activeContactId] || []),
          {
            id: Date.now() + 1,
            sender: "them",
            text: randomReply,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ],
      }));
    }, 1200);
  };

  const handleQuickSnippet = () => {
    setInputText("const collaborate = async () => { await buildDreamProject(); };");
  };

  const filteredConnections = (connections || []).filter((c) =>
    `${c.firstName || ""} ${c.lastName || ""}`.toLowerCase().includes(chatSearch.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#070913] text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Fixed Top Header */}
      <TopHeader />

      {/* Main Dashboard Layout */}
      <div className="flex-1 flex overflow-hidden max-w-[1720px] w-full mx-auto">
        {/* Left Navigation Sidebar */}
        <Sidebar />

        {/* Center Messages Panel */}
        <main className="flex-1 p-3 sm:p-6 flex flex-col h-full overflow-hidden">
          <div className="flex-1 bg-[#0b0f1d]/90 backdrop-blur-2xl border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            {/* Left Conversations Sidebar */}
            <div className="w-full md:w-80 lg:w-96 border-r border-white/[0.08] flex flex-col bg-[#090d18]">
              {/* Messages Header */}
              <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-rose-400" /> Matches Chat
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    {connections?.length || 0} active matched developer{connections?.length === 1 ? "" : "s"}
                  </p>
                </div>
                <span className="font-handwriting text-rose-400/80 text-sm hidden sm:inline-block">
                  ~ direct sync
                </span>
              </div>

              {/* Chat Search */}
              <div className="p-3 border-b border-white/[0.06]">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={chatSearch}
                    onChange={(e) => setChatSearch(e.target.value)}
                    placeholder="Search chats..."
                    className="w-full bg-[#111628] border border-white/[0.06] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-all"
                  />
                </div>
              </div>

              {/* Contact List */}
              <div className="flex-1 overflow-y-auto divide-y divide-white/[0.04] p-2 space-y-1">
                {filteredConnections && filteredConnections.length > 0 ? (
                  filteredConnections.map((contact) => {
                    const isSelected = activeContact?._id === contact._id;
                    const effectivePhoto =
                      contact.photourl && !contact.photourl.includes("brave.com")
                        ? contact.photourl
                        : contact.gender === "female"
                        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100";

                    return (
                      <button
                        key={contact._id}
                        onClick={() => setActiveContact(contact)}
                        className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all text-left cursor-pointer ${
                          isSelected
                            ? "bg-gradient-to-r from-rose-500/20 to-purple-600/20 border border-rose-500/30 text-white shadow-lg"
                            : "hover:bg-white/[0.04] text-slate-300"
                        }`}
                      >
                        <div className="relative flex-shrink-0">
                          <img
                            src={effectivePhoto}
                            alt={contact.firstName}
                            className="w-11 h-11 rounded-xl object-cover ring-1 ring-white/10"
                            onError={(e) => {
                              e.target.src =
                                contact.gender === "female"
                                  ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                                  : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100";
                            }}
                          />
                          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#090d18]"></span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold truncate">
                              {contact.firstName} {contact.lastName || ""}
                            </h4>
                            <span className="text-[10px] text-slate-400 font-mono">
                              Online
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">
                            {contact.skills?.slice(0, 2).join(", ") || "Fullstack Developer"}
                          </p>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-6 text-center text-slate-400 space-y-3">
                    <Users className="w-8 h-8 text-slate-500 mx-auto opacity-50" />
                    <p className="text-xs font-semibold text-slate-300">No mutual connections yet.</p>
                    <p className="text-[11px] text-slate-400">
                      Swipe developers in the discover feed to match and unlock messaging!
                    </p>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-1 text-xs font-bold text-rose-400 hover:text-rose-300 mt-2"
                    >
                      <span>Discover Developers</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Right Chat Conversation Pane */}
            {activeContact ? (
              <div className="flex-1 flex flex-col bg-[#0b0f1e] overflow-hidden">
                {/* Chat Top Bar */}
                <div className="p-4 px-6 border-b border-white/[0.08] bg-[#090d18]/90 backdrop-blur-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={
                          activeContact.photourl && !activeContact.photourl.includes("brave.com")
                            ? activeContact.photourl
                            : activeContact.gender === "female"
                            ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                            : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                        }
                        alt={activeContact.firstName}
                        className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/10"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#090d18]"></span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        {activeContact.firstName} {activeContact.lastName || ""}
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                          Active Now
                        </span>
                      </h3>
                      <p className="text-[11px] text-slate-400 truncate max-w-xs">
                        {activeContact.skills?.slice(0, 3).join(", ") || "Full Stack Developer"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-all cursor-pointer"
                      title="Voice Call"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-all cursor-pointer"
                      title="Video Call"
                    >
                      <Video className="w-4 h-4" />
                    </button>
                    <Link
                      to="/connections"
                      className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-all cursor-pointer"
                      title="View all connections"
                    >
                      <Info className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Chat Messages Body */}
                <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                  {/* Match Date Pill */}
                  <div className="text-center my-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.06] text-[10px] font-mono text-slate-400">
                      <Sparkles className="w-3 h-3 text-rose-400" />
                      <span>Connected on DevTinder</span>
                    </span>
                  </div>

                  {currentMessages.map((msg) => {
                    const isMe = msg.sender === "me";
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-lg ${
                            isMe
                              ? "bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 text-white rounded-br-none"
                              : "bg-[#141b2d] border border-white/[0.08] text-slate-200 rounded-bl-none"
                          }`}
                        >
                          <p>{msg.text}</p>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1 font-mono px-1">
                          <span>{msg.time}</span>
                          {isMe && <CheckCheck className="w-3 h-3 text-sky-400" />}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Snippet Chips */}
                <div className="px-4 py-2 bg-[#090d18]/60 border-t border-white/[0.04] flex items-center gap-2 overflow-x-auto text-[11px]">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
                    Quick:
                  </span>
                  <button
                    onClick={() => setInputText("Let's jump on a pair programming session!")}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 flex-shrink-0 transition-all cursor-pointer"
                  >
                    <Laptop className="w-3 h-3 text-sky-400" />
                    <span>Pair program?</span>
                  </button>
                  <button
                    onClick={() => setInputText("What's your preferred tech stack for this project?")}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 flex-shrink-0 transition-all cursor-pointer"
                  >
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>Tech stack?</span>
                  </button>
                  <button
                    onClick={handleQuickSnippet}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 flex-shrink-0 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Code2 className="w-3 h-3 text-rose-400" />
                    <span>Insert Code</span>
                  </button>
                </div>

                {/* Message Input Form */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-3 sm:p-4 bg-[#090d18] border-t border-white/[0.08] flex items-center gap-2 sm:gap-3"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`Message ${activeContact.firstName}...`}
                    className="flex-1 bg-[#111628] border border-white/[0.08] focus:border-rose-500 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                  />

                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="p-3 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#0b0f1e]">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500/20 to-purple-600/20 border border-rose-500/30 flex items-center justify-center mb-4">
                  <Flame className="w-8 h-8 text-rose-500" />
                </div>
                <h3 className="text-lg font-bold text-white">Select a developer match</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Choose any connection from the left to start collaborating and sharing code!
                </p>
                <span className="font-handwriting text-rose-400/80 text-base mt-4">
                  ~ real-time developer collaboration ♡
                </span>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messages;
