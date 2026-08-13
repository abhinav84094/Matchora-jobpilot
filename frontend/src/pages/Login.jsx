import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Lock,
  BadgeCheck,
  Target,
  IdCard,
  ClipboardList,
  Briefcase,
  Bookmark,
  Search,
  FileText,
  PieChart,
  Send,
  BarChart3,
  Trophy,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const API_URL = import.meta.env.VITE_API_URL;

const journeySteps = [
  { icon: FileText, label: "Upload Resume" },
  { icon: PieChart, label: "Get Insights" },
  { icon: Search, label: "Find Jobs" },
  { icon: Send, label: "Apply" },
  { icon: BarChart3, label: "Track" },
  { icon: Trophy, label: "Get Hired" },
];

const trustBadges = [
  { icon: ShieldCheck, title: "Secure Google sign-in", desc: "Your account is protected with Google." },
  { icon: Lock, title: "Your data stays private", desc: "We never share your data without your permission." },
  { icon: BadgeCheck, title: "Built for job seekers", desc: "Designed to save time and help you get hired faster." },
];

export default function Login() {
  const { user, loading } = useAuth();

  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-[#f6f5fb]">
      <div className="max-w-xl sm:max-w-2xl lg:max-w-4xl mx-auto px-5 sm:px-8 pt-8 pb-14">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">M</span>
          </div>
          <span className="font-semibold text-lg text-neutral-900">Matchora</span>
        </div>

        {/* Hero */}
        <p className="text-violet-600 font-semibold mt-7 flex items-center gap-1.5">
          Hello Buddy <span>👋</span>
        </p>

        <h1 className="text-4xl font-extrabold leading-[1.1] mt-2 text-neutral-900">
          Stop searching.
          <br />
          Start <span className="text-violet-600">matching.</span>
        </h1>

        <p className="text-neutral-500 mt-4 leading-relaxed">
          Matchora turns your resume into a personalized job search — find
          relevant jobs, apply, and keep track of every application in one
          place.
        </p>

        {/* Illustration */}
        <HeroIllustration />

        {/* Feature cards */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 mt-8">
          <FeatureCard
            icon={Target}
            tint="bg-violet-100 text-violet-600"
            title="Find jobs that fit you"
            desc="Get job recommendations based on your skills and profile."
          >
            <div className="flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
                <Briefcase size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-neutral-900 truncate">Backend Developer</p>
                <p className="text-xs text-neutral-400">Google &middot; Bengaluru</p>
                <span className="inline-block mt-1.5 text-[11px] font-medium text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5">
                  92% Match
                </span>
              </div>
              <Bookmark size={16} className="text-neutral-300 shrink-0" />
            </div>
          </FeatureCard>

          <FeatureCard
            icon={IdCard}
            tint="bg-emerald-100 text-emerald-600"
            title="Understand your resume"
            desc="See your ATS score, skills, experience, education and projects."
          >
            <div className="flex items-center gap-4">
              <div>
                <p className="text-[11px] text-neutral-400 mb-1">ATS Score</p>
                <ScoreGauge score={85} />
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-neutral-400 mb-1.5">Top Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {["JavaScript", "React", "Node.js", "MongoDB", "Express.js"].map((s) => (
                    <span
                      key={s}
                      className="text-[10px] bg-violet-50 text-violet-600 rounded-full px-2 py-0.5"
                    >
                      {s}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          </FeatureCard>

          <FeatureCard
            icon={ClipboardList}
            tint="bg-amber-100 text-amber-600"
            title="Track every application"
            desc="Keep track of jobs you've applied to and never lose your application history."
          >
            <div className="flex items-center justify-between">
              {["Applied", "Interview", "HR Round", "Offer"].map((stage, i) => (
                <div key={stage} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    {i === 0 ? (
                      <CheckCircle2 size={20} className="text-emerald-500" />
                    ) : (
                      <Circle size={20} className="text-neutral-200" />
                    )}
                    <span className="text-[10px] text-neutral-500 whitespace-nowrap">{stage}</span>
                  </div>
                  {i < 3 && <div className="flex-1 h-px bg-neutral-200 mx-1 -mt-4" />}
                </div>
              ))}
            </div>
          </FeatureCard>
        </div>

        {/* CTA — the real Google auth trigger sits invisibly on top of both
            the button and the "Continue with Google" line below it */}
        <div className="relative mt-8">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 bg-violet-600 text-white font-semibold rounded-xl px-6 py-4 shadow-lg shadow-violet-600/20"
          >
            <GoogleG size={18} />
            Find My Matching Jobs
            <ArrowRight size={18} />
          </button>

          <p className="flex items-center justify-center gap-1.5 text-sm text-neutral-400 mt-4">
            <ShieldCheck size={14} />
            Continue with Google
          </p>

          <div className="absolute inset-0 opacity-0">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const res = await fetch(`${API_URL}/api/auth/google`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                  body: JSON.stringify({
                    token: credentialResponse.credential,
                  }),
                });

                if (res.ok) {
                  window.location.href = "/dashboard";
                }
              }}
              onError={() => {
                console.log("Google Login Failed");
              }}
            />
          </div>
        </div>

        {/* Journey steps */}
        <div className="mt-14 bg-white rounded-2xl border border-neutral-100 py-6 px-4">
          <p className="text-center font-semibold text-violet-600 mb-5">
            Your job search. Simplified.
          </p>

          <div className="flex items-center justify-between">
            {journeySteps.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5 w-14">
                  <div className="w-10 h-10 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center">
                    <step.icon size={17} />
                  </div>
                  <span className="text-[10px] text-neutral-500 text-center leading-tight">
                    {step.label}
                  </span>
                </div>
                {i < journeySteps.length - 1 && (
                  <ArrowRight size={13} className="text-neutral-300 -mt-4 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {trustBadges.map((b) => (
            <div key={b.title} className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                <b.icon size={15} className="text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900 leading-tight">{b.title}</p>
                <p className="text-xs text-neutral-400 mt-0.5 leading-snug">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-neutral-400 text-center mt-10 leading-relaxed">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-violet-600 font-medium">Terms of Service</a> and{" "}
          <a href="/privacy" className="text-violet-600 font-medium">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}

/* ---------------- Sub-components ---------------- */

function FeatureCard({ icon: Icon, tint, title, desc, children }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-4">
      <div className="flex items-start gap-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${tint}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className="font-semibold text-neutral-900">{title}</p>
          <p className="text-sm text-neutral-400 mt-0.5 leading-snug">{desc}</p>
        </div>
      </div>

      <div className="mt-4 bg-neutral-50 rounded-xl p-3">{children}</div>
    </div>
  );
}

function ScoreGauge({ score }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;

  return (
    <div className="relative w-14 h-14 shrink-0">
      <svg viewBox="0 0 56 56" className="w-14 h-14 -rotate-90">
        <circle cx="28" cy="28" r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="#059669"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-bold text-neutral-900 leading-none">{score}</span>
        <span className="text-[8px] text-neutral-400 leading-none mt-0.5">/100</span>
      </div>
    </div>
  );
}

function HeroIllustration() {
  return (
    <div className="relative mt-8 h-64 lg:h-72 flex items-center justify-center" aria-hidden="true">
      {/* Decorative sparkle dots */}
      <Sparkles size={16} className="absolute top-2 right-8 text-violet-300" />
      <div className="absolute top-10 left-4 w-2 h-2 rounded-full bg-violet-300" />
      <div className="absolute bottom-6 right-4 w-2.5 h-2.5 rounded-full bg-violet-200" />

      {/* Phone card */}
      <div className="relative w-40 h-56 bg-white rounded-3xl border-4 border-violet-500 shadow-xl flex flex-col items-center pt-6 px-4">
        <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center mb-3">
          <div className="w-4 h-4 rounded-full bg-violet-400" />
        </div>
        <div className="w-full space-y-1.5 mb-4">
          <div className="h-1.5 bg-neutral-100 rounded-full w-full" />
          <div className="h-1.5 bg-neutral-100 rounded-full w-4/5" />
          <div className="h-1.5 bg-neutral-100 rounded-full w-full" />
        </div>

        <ScoreGauge score={85} />
        <p className="text-[10px] text-neutral-400 mt-1">ATS Score</p>

        <div className="flex gap-1 mt-3">
          {["React", "Node", "Mongo"].map((s) => (
            <span key={s} className="text-[8px] bg-violet-50 text-violet-600 rounded-full px-1.5 py-0.5">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Briefcase */}
      <div className="absolute bottom-2 left-8 w-14 h-11 bg-violet-600 rounded-lg flex items-center justify-center shadow-lg">
        <Briefcase size={20} className="text-white" />
      </div>

      {/* Magnifying glass */}
      <div className="absolute bottom-4 right-6 w-12 h-12 bg-white rounded-full border-4 border-violet-400 shadow-lg flex items-center justify-center">
        <Search size={18} className="text-violet-500" />
      </div>
    </div>

  );
}

function GoogleG({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18">
      <path fill="#fff" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z" opacity="0.9" />
      <path fill="#fff" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18z" opacity="0.9" />
      <path fill="#fff" d="M3.95 10.7A5.4 5.4 0 0 1 3.66 9c0-.59.1-1.17.29-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33z" opacity="0.9" />
      <path fill="#fff" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58z" opacity="0.9" />
    </svg>
  );
}
