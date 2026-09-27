import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { addUser } from "../utils/userSlice";
import { Lock, Mail, User, Eye, EyeOff, ArrowRight, Sparkles, MapPin, CheckCircle2 } from "lucide-react";
import DevTinderLogo from "../components/common/DevTinderLogo";

// Curated realistic developer profiles across 5 diverse columns
const column1Cards = [
  {
    name: "Sarah Chen",
    role: "Fullstack Architect",
    location: "San Francisco, CA",
    status: "🚀 Building SaaS",
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    bio: "Building high-throughput microservices and cloud platforms.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  },
  {
    name: "Emma Watson",
    role: "Frontend Specialist",
    location: "London, UK",
    status: "🎨 Crafting UI/UX",
    skills: ["Next.js", "TailwindCSS", "Three.js", "Framer"],
    bio: "Crafting silky smooth animations & delightful developer experiences.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
  },
  {
    name: "Chloe Dupont",
    role: "Design Engineer",
    location: "Paris, FR",
    status: "💡 Open to Projects",
    skills: ["Vue.js", "Nuxt", "TailwindCSS", "CSS Canvas"],
    bio: "Bridging the gap between pixel art design and clean codebases.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200",
  },
  {
    name: "Lucas Silva",
    role: "UI Systems Engineer",
    location: "São Paulo, BR",
    status: "🟢 Active Now",
    skills: ["React 19", "Turborepo", "WebSockets", "Vite"],
    bio: "Obsessed with sub-100ms render cycles and micro-interactions.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200",
  },
  {
    name: "Aisha Khan",
    role: "Web Application Lead",
    location: "Dubai, UAE",
    status: "⭐ Top Contributor",
    skills: ["SvelteKit", "TypeScript", "Tailwind", "REST"],
    bio: "Scaling fintech portals with high security and blazing speed.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
  },
  {
    name: "Dev Patel",
    role: "Frontend Engineer",
    location: "Bengaluru, IN",
    status: "🤝 Looking for Collab",
    skills: ["React", "Redux Toolkit", "Next.js", "Jest"],
    bio: "Passionate open sourcerer making web dev accessible for all.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
  },
  {
    name: "Zoe Vance",
    role: "Creative Coder",
    location: "Austin, TX",
    status: "✨ Exploring WebGPU",
    skills: ["WebGL", "Three.js", "GLSL", "React"],
    bio: "Turning mathematical shaders into interactive 3D browser worlds.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200",
  },
];

const column2Cards = [
  {
    name: "Priya Sharma",
    role: "Backend & Systems",
    location: "Bengaluru, IN",
    status: "🟢 Available for Collab",
    skills: ["Java", "Spring Boot", "Kafka", "PostgreSQL"],
    bio: "Designing resilient event-driven architectures with high concurrency.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
  },
  {
    name: "David Kim",
    role: "Go & Rust Developer",
    location: "Seoul, KR",
    status: "⚡ Low Latency Focus",
    skills: ["Rust", "Go", "Docker", "Kubernetes"],
    bio: "Low-latency systems, memory safety, and distributed databases.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
  },
  {
    name: "Tariq Mansoor",
    role: "Python Backend Lead",
    location: "Toronto, CA",
    status: "🚀 Building Microservices",
    skills: ["FastAPI", "Django", "Redis", "Celery"],
    bio: "Backend developer looking to partner up on high-growth SaaS startups.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  },
  {
    name: "Vikram Rao",
    role: "Database Architect",
    location: "Hyderabad, IN",
    status: "🔍 Performance Tuning",
    skills: ["MongoDB", "PostgreSQL", "Redis", "Cassandra"],
    bio: "Sharding, replication, and query optimization for petabyte datasets.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
  },
  {
    name: "Liam O'Connor",
    role: "Distributed Systems",
    location: "Dublin, IE",
    status: "🛡️ Systems Security",
    skills: ["Erlang", "Elixir", "gRPC", "Docker"],
    bio: "Fault-tolerant messaging engines that never go down.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200",
  },
  {
    name: "Maya Lin",
    role: "Backend Engineer",
    location: "Seattle, WA",
    status: "💡 Co-founder Search",
    skills: ["Node.js", "NestJS", "Prisma", "AWS Lambda"],
    bio: "Serverless pipelines & developer tools. Let's build together.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
  },
];

const column3Cards = [
  {
    name: "Alex Rivera",
    role: "AI & ML Engineer",
    location: "New York, NY",
    status: "🤖 Tuning LLMs",
    skills: ["Python", "PyTorch", "HuggingFace", "FastAPI"],
    bio: "Obsessed with LLMs, diffusion models, and CUDA optimizations.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  },
  {
    name: "Sophie Zhang",
    role: "Data & ML Engineer",
    location: "San Jose, CA",
    status: "📊 Predictive AI",
    skills: ["TensorFlow", "Pandas", "Spark", "PostgreSQL"],
    bio: "Turning big telemetry datasets into intelligent real-time pipelines.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200",
  },
  {
    name: "Kevin Chen",
    role: "Computer Vision Researcher",
    location: "Vancouver, CA",
    status: "👁️ Vision Models",
    skills: ["OpenCV", "PyTorch", "C++", "CUDA"],
    bio: "Building spatial perception for autonomous robots & drones.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
  },
  {
    name: "Nikita Sharma",
    role: "NLP Specialist",
    location: "Mumbai, IN",
    status: "🧠 Agentic AI",
    skills: ["LangChain", "LlamaIndex", "VectorDB", "Python"],
    bio: "Creating autonomous agent swarms and contextual RAG architectures.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
  },
  {
    name: "Arjun Seth",
    role: "Deep Learning Engineer",
    location: "Bangalore, IN",
    status: "🟢 Available for Hackathons",
    skills: ["JAX", "PyTorch", "ONNX", "Triton"],
    bio: "Model quantization & sub-millisecond edge inference deployment.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
  },
  {
    name: "Hannah Becker",
    role: "AI Product Engineer",
    location: "Munich, DE",
    status: "🚀 Launching Tools",
    skills: ["Next.js", "OpenAI API", "Python", "Supabase"],
    bio: "Shipping AI-native dev productivity apps from ideation to revenue.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  },
];

const column4Cards = [
  {
    name: "Marcus Brody",
    role: "DevOps & Cloud Ninja",
    location: "Chicago, IL",
    status: "⚡ Infra as Code",
    skills: ["AWS", "Terraform", "Kubernetes", "ArgoCD"],
    bio: "Automating zero-downtime CI/CD pipelines & resilient cloud infra.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200",
  },
  {
    name: "James Wilson",
    role: "Cybersecurity & Kernel",
    location: "Boston, MA",
    status: "🛡️ Zero Trust",
    skills: ["Rust", "eBPF", "OAuth2", "Linux"],
    bio: "Passionate about zero-trust security & cryptographic protocols.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
  },
  {
    name: "Fatima Al-Zahra",
    role: "Site Reliability Engineer",
    location: "Riyadh, SA",
    status: "📈 99.999% Uptime",
    skills: ["Prometheus", "Grafana", "Go", "GCP"],
    bio: "Keeping high-traffic multi-region clusters healthy around the clock.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
  },
  {
    name: "Daniel Evans",
    role: "Cloud Architect",
    location: "London, UK",
    status: "☁️ Multi-Cloud",
    skills: ["Azure", "AWS", "Helm", "Docker"],
    bio: "Enterprise migrations, cost optimization, and secure perimeter design.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200",
  },
  {
    name: "Sara Lindqvist",
    role: "SecOps Engineer",
    location: "Stockholm, SE",
    status: "🔒 AppSec Leader",
    skills: ["Rust", "Python", "Vault", "K8s"],
    bio: "Embedding automated static & dynamic security audits into pipelines.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200",
  },
  {
    name: "Ronak Mehta",
    role: "DevRel & Platform",
    location: "Pune, IN",
    status: "🤝 Community Builder",
    skills: ["TypeScript", "Docker", "GitHub Actions", "Docs"],
    bio: "Empowering 50k+ developers through open-source tooling and guides.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
  },
];

const column5Cards = [
  {
    name: "Ananya Patel",
    role: "Fullstack JS Developer",
    location: "Delhi, IN",
    status: "🚀 Shipping Fast",
    skills: ["MongoDB", "Express", "React", "Node.js"],
    bio: "MERN stack developer building high-impact developer ecosystems.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200",
  },
  {
    name: "Elena Rostova",
    role: "Mobile App Engineer",
    location: "Prague, CZ",
    status: "📱 iOS & Android",
    skills: ["React Native", "Swift", "Kotlin", "Expo"],
    bio: "Building slick, fluid cross-platform mobile apps with native speed.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
  },
  {
    name: "Kenji Sato",
    role: "Web3 & Smart Contracts",
    location: "Tokyo, JP",
    status: "⛓️ Solidity & Rust",
    skills: ["Solidity", "Rust", "Ethers.js", "Wasm"],
    bio: "Decentralized state machines & secure smart contract audits.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
  },
  {
    name: "Meera Iyer",
    role: "Fullstack Engineer",
    location: "Chennai, IN",
    status: "💡 Co-building SaaS",
    skills: ["Next.js", "Tailwind", "Supabase", "TypeScript"],
    bio: "Bootstrapping profitable micro-SaaS apps in the developer tools space.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
  },
  {
    name: "Christian Bale",
    role: "Staff Engineer",
    location: "New York, NY",
    status: "⭐ Open for Advice",
    skills: ["Go", "TypeScript", "Kafka", "PostgreSQL"],
    bio: "10+ years architecting scalable SaaS from 0 to 10M active developers.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
  },
  {
    name: "Naomi Scott",
    role: "UI Engineer & Indie Hacker",
    location: "Melbourne, AU",
    status: "🚀 Live on Product Hunt",
    skills: ["React", "Tailwind", "Node.js", "Figma"],
    bio: "Coding aesthetic interfaces that convert visitors into active users.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  },
];

// Rich, authentic developer card for seamless background marquee
const QuietMarqueeCard = ({ card }) => (
  <div className="bg-[#0e1322]/85 backdrop-blur-md border border-white/[0.08] hover:border-pink-500/30 rounded-2xl p-4 shadow-xl mb-4 select-none transition-all duration-300">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={card.avatar}
            alt={card.name}
            className="w-11 h-11 rounded-xl object-cover ring-1 ring-white/15"
          />
          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0e1322] rounded-full"></span>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="font-semibold text-xs text-slate-100 leading-snug">{card.name}</h4>
            <CheckCircle2 className="w-3.5 h-3.5 text-pink-500 inline" />
          </div>
          <span className="text-[11px] text-pink-400 font-medium block">{card.role}</span>
        </div>
      </div>
      <span className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-400 border border-white/[0.06] whitespace-nowrap">
        {card.status}
      </span>
    </div>

    <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-2">
      <MapPin className="w-3 h-3 text-slate-400" />
      <span>{card.location}</span>
    </div>

    <p className="text-[11px] text-slate-300 mt-2 line-clamp-2 italic leading-relaxed">
      "{card.bio}"
    </p>

    <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-white/[0.05]">
      {card.skills.map((skill, idx) => (
        <span
          key={idx}
          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.05] text-slate-200 border border-white/[0.06]"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLoginForm) {
        const res = await api.post("/login", { emailId, password });
        if (res.data?.token) {
          localStorage.setItem("token", res.data.token);
        }
        dispatch(addUser(res.data?.data));
        navigate("/");
      } else {
        const res = await api.post("/signup", {
          firstName,
          lastName,
          emailId,
          password,
        });
        if (res.data?.token) {
          localStorage.setItem("token", res.data.token);
        }
        dispatch(addUser(res.data?.data));
        navigate("/profile");
      }
    } catch (err) {
      setError(
        err.response?.data ||
        err.response?.data?.message ||
        err.message ||
        "Authentication failed. Please check credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-screen w-full overflow-hidden fixed inset-0 flex items-center justify-center px-4 bg-[#070913]">
      {/* 1. BACKGROUND: Rich, dense, fully-packed continuous developer marquee columns */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 overflow-hidden pointer-events-none opacity-45 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
        {/* Column 1 */}
        <div className="flex flex-col animate-marquee-up">
          {[...column1Cards, ...column1Cards, ...column1Cards].map((card, i) => (
            <QuietMarqueeCard key={`col1-${i}`} card={card} />
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col animate-marquee-down">
          {[...column2Cards, ...column2Cards, ...column2Cards].map((card, i) => (
            <QuietMarqueeCard key={`col2-${i}`} card={card} />
          ))}
        </div>

        {/* Column 3 - visible from tablet up */}
        <div className="hidden md:flex flex-col animate-marquee-up-slow">
          {[...column3Cards, ...column3Cards, ...column3Cards].map((card, i) => (
            <QuietMarqueeCard key={`col3-${i}`} card={card} />
          ))}
        </div>

        {/* Column 4 - visible from desktop up */}
        <div className="hidden lg:flex flex-col animate-marquee-down-slow">
          {[...column4Cards, ...column4Cards, ...column4Cards].map((card, i) => (
            <QuietMarqueeCard key={`col4-${i}`} card={card} />
          ))}
        </div>

        {/* Column 5 - visible on wide screens */}
        <div className="hidden xl:flex flex-col animate-marquee-up">
          {[...column5Cards, ...column5Cards, ...column5Cards].map((card, i) => (
            <QuietMarqueeCard key={`col5-${i}`} card={card} />
          ))}
        </div>
      </div>

      {/* 2. Atmospheric dark gradient vignette for readable modal */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,19,32,0.65)_0%,rgba(7,9,19,0.92)_100%)] pointer-events-none"></div>

      {/* 3. CENTER: Focused, Balanced, Laser-Edged DevTinder Authentication Card */}
      <div className="relative z-20 w-full max-w-[480px] p-[1.5px] rounded-[26px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.75),0_0_40px_rgba(236,72,153,0.25)]">
        {/* Animated Rotating Laser Border */}
        <div className="absolute -inset-[150%] animate-spin-laser bg-[conic-gradient(from_0deg,transparent_0_75%,#ef4444_84%,#ff0055_94%,#ffffff_100%)] opacity-95"></div>

        {/* Inner Glass Card */}
        <div className="relative z-10 w-full bg-[#0c101c]/95 backdrop-blur-3xl rounded-[24px] p-7 sm:p-9 border border-white/[0.08]">
          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <DevTinderLogo width={220} height={56} showTagline={false} animated={true} />

            <h2 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight mt-4">
              {isLoginForm ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed max-w-xs">
              {isLoginForm
                ? "Find developers who match your skills, interests and building style."
                : "Join the network to meet coding partners and collaborate."}
            </p>
          </div>

          {/* Error Notification */}
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs py-2.5 px-3.5 rounded-xl mb-4 leading-normal">
              {typeof error === "string" ? error : JSON.stringify(error)}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLoginForm && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="Linus"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-[#11151f] border border-[#303746] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/15 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Torvalds"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-[#11151f] border border-[#303746] rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/15 focus:outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="developer@example.com"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  className="w-full bg-[#11151f] border border-[#303746] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/15 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#11151f] border border-[#303746] rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/15 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-[#FF4D6D] via-[#EC4899] to-[#A855F7] text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-[0_8px_24px_rgba(236,72,153,0.22)] hover:shadow-[0_12px_30px_rgba(236,72,153,0.35)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{isLoginForm ? "Log in to DevTinder" : "Create Account"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider & Switch */}
          <div className="relative flex items-center justify-center my-5">
            <div className="border-t border-white/[0.08] w-full"></div>
            <span className="bg-[#0c101c] px-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider absolute">
              OR
            </span>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsLoginForm(!isLoginForm);
                setError("");
              }}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
            >
              {isLoginForm
                ? "New to DevTinder? Create an account"
                : "Already have an account? Sign in"}
            </button>
          </div>

          {/* Trust/Benefit line */}
          <div className="text-center mt-5 pt-4 border-t border-white/[0.04]">
            <span className="text-[11px] text-slate-500 font-medium tracking-wide flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              Connect • Build • Collaborate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
