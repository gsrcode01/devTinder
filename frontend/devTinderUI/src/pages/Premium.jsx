import { useState } from "react";
import { useSelector } from "react-redux";
import TopHeader from "../components/Dashboard/TopHeader";
import Sidebar from "../components/Dashboard/Sidebar";
import {
  Crown,
  Sparkles,
  Zap,
  Check,
  Flame,
  Heart,
  RotateCcw,
  Eye,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const Premium = () => {
  const user = useSelector((store) => store.user);
  const [billingCycle, setBillingCycle] = useState("monthly"); // monthly or yearly
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [activeToast, setActiveToast] = useState(false);

  const handleUpgrade = (planName) => {
    setSelectedPlan(planName);
    setActiveToast(true);
    setTimeout(() => setActiveToast(false), 4000);
  };

  const plans = [
    {
      id: "free",
      name: "Dev Free",
      price: "$0",
      period: "forever",
      description: "Basic developer networking and daily swiping.",
      popular: false,
      features: [
        "25 Daily Candidate Swipes",
        "Standard matching algorithm",
        "Chat with mutual matches",
        "Community forum access",
      ],
      cta: "Current Plan",
      disabled: true,
    },
    {
      id: "plus",
      name: "Dev Plus",
      price: billingCycle === "monthly" ? "$9" : "$7",
      period: "per month",
      description: "Supercharge your tech networking with unlimited power.",
      popular: false,
      badge: "Popular",
      features: [
        "Unlimited Daily Swipes",
        "5 Free SuperLikes every day",
        "Rewind / Undo accidental swipes",
        "Incognito browsing mode",
        "No sponsored ads or delays",
      ],
      cta: "Upgrade to Plus",
      disabled: false,
    },
    {
      id: "pro",
      name: "Dev Pro / Gold",
      price: billingCycle === "monthly" ? "$19" : "$15",
      period: "per month",
      description: "Ultimate toolkit to connect with founders, CTOs & lead devs.",
      popular: true,
      badge: "Best Value",
      features: [
        "Everything in Dev Plus",
        "See Who Liked You before swiping",
        "1 Free Monthly Profile Boost (10x views)",
        "Direct Message before matching",
        "Verified Gold Developer Badge",
        "Global Passport to explore any city",
      ],
      cta: "Get Dev Pro",
      disabled: false,
    },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#070913] text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Fixed Top Header */}
      <TopHeader />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden max-w-[1720px] w-full mx-auto">
        {/* Left Navigation Sidebar */}
        <Sidebar />

        {/* Center Main Upgrade Area - Scrolls internally */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto h-full max-w-6xl">
          {/* Toast Notification (Pure Tailwind CSS) */}
          {activeToast && (
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
              <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-white/15">
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Welcome to DevTinder Pro! Premium features unlocked.</span>
              </div>
            </div>
          )}

          {/* Header Banner */}
          <div className="text-center max-w-2xl mx-auto mb-10 pt-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-bold mb-4 shadow-lg">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>DevTinder Pro Memberships</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Build your dream team{" "}
              <span className="bg-gradient-to-r from-orange-400 via-rose-500 to-purple-500 bg-clip-text text-transparent">
                10x faster
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
              Unlock unlimited swiping, see who liked you, send direct messages, and get 10x profile visibility.
            </p>
            <span className="font-handwriting text-amber-300/85 text-xl block mt-2 select-none">
              ~ elevate your developer journey ♡
            </span>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-[#0b0f1d] border border-white/[0.08] mt-6 shadow-xl">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  billingCycle === "monthly"
                    ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  billingCycle === "yearly"
                    ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>Yearly</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold">
                  Save 25%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-b from-[#181126] via-[#101426] to-[#090d18] border-2 border-rose-500/60 shadow-[0_0_50px_rgba(244,63,94,0.25)] scale-[1.02]"
                      : "bg-[#0b0f1d]/90 backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.15] shadow-xl"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white text-[10px] font-black uppercase tracking-wider shadow-lg">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-black text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{plan.description}</p>

                    {/* Price */}
                    <div className="my-6 pb-6 border-b border-white/[0.08]">
                      <span className="text-4xl font-black text-white">{plan.price}</span>
                      <span className="text-xs text-slate-400 ml-2 font-medium">
                        / {plan.period}
                      </span>
                    </div>

                    {/* Features list */}
                    <div className="space-y-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        What's included:
                      </p>
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                          <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 flex-shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <button
                      disabled={plan.disabled}
                      onClick={() => handleUpgrade(plan.id)}
                      className={`w-full py-3 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        plan.disabled
                          ? "bg-white/[0.05] text-slate-500 cursor-not-allowed border border-white/[0.05]"
                          : plan.popular
                          ? "bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 cursor-pointer"
                          : "bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/10 hover:scale-105 active:scale-95 cursor-pointer"
                      }`}
                    >
                      {plan.popular && <Sparkles className="w-4 h-4" />}
                      <span>{plan.cta}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guarantee Box */}
          <div className="mt-12 bg-[#0b0f1d]/60 border border-white/[0.06] rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">
                  30-Day Money-Back Guarantee
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Cancel anytime with a single click. No hidden contracts or lock-in.
                </p>
              </div>
            </div>
            <div className="text-xs font-mono text-slate-400">
              🔒 256-Bit SSL Encrypted Checkout
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Premium;
