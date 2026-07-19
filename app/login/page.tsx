"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn, Sun, Heart, Users, HandHeart, Star } from "lucide-react";

const features = [
  { icon: Users, text: "Manage volunteers & members" },
  { icon: HandHeart, text: "Track donations & scholarships" },
  { icon: Star, text: "Run events & community programs" },
  { icon: Heart, text: "Health, Yoga & Positive Thinking" },
];

// Floating orb component
function Orb({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={className} style={{ borderRadius: "50%", position: "absolute", ...style }} />;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid credentials. Please try again.");
        return;
      }
      window.location.href = "/admin";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden">

      {/* ── Left Panel — Branding ── */}
      <div
        className="relative hidden lg:flex lg:w-[52%] flex-col justify-between p-12 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B8271 0%, #186F61 100%)" }}
      >
        {/* Decorative orbs */}
        <Orb style={{ width: 380, height: 380, top: -100, right: -100, background: "rgba(27,130,113,0.12)", filter: "blur(60px)" }} />
        <Orb style={{ width: 300, height: 300, bottom: 80, left: -80, background: "rgba(27,130,113,0.08)", filter: "blur(60px)" }} />
        <Orb style={{ width: 200, height: 200, top: "40%", left: "40%", background: "rgba(27,130,113,0.08)", filter: "blur(50px)" }} />

        {/* Animated dot grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top logo */}
        <div className="relative">
          <div className="flex items-center gap-3">
            <div
              className="flex size-12 items-center justify-center rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #1B8271 0%, #186F61 100%)",
                boxShadow: "0 0 30px rgba(27,130,113,0.5)",
              }}
            >
              <Sun className="size-6 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-white tracking-tight">NCV Admin</p>
              <p className="text-xs text-slate-400">Narchinthanai Vattam</p>
            </div>
          </div>
        </div>

        {/* Center content */}
        <div className="relative space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
              style={{ background: "rgba(27,130,113,0.15)", border: "1px solid rgba(27,130,113,0.3)" }}>
              <span className="size-1.5 rounded-full bg-[#1B8271] animate-pulse" />
              <span className="text-xs font-semibold text-[#186F61]">Management Portal</span>
            </div>
            <h1 className="text-4xl font-bold text-white leading-tight lg:text-5xl">
              Manage your
              <span
                className="block mt-1"
                style={{
                  background: "linear-gradient(90deg, #1B8271, #186F61, #1B8271)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                NGO with ease.
              </span>
            </h1>
            <p className="mt-4 text-slate-400 text-base leading-relaxed max-w-sm">
              A complete management system for health, yoga, community service, and social welfare programs.
            </p>
          </div>

          {/* Features list */}
          <div className="space-y-3">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  animationDelay: `${i * 100}ms`,
                }}
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: "rgba(27,130,113,0.2)" }}>
                  <f.icon className="size-4 text-[#1B8271]" />
                </div>
                <p className="text-sm text-slate-300">{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="relative flex items-center gap-2 text-slate-500 text-sm">
          <Heart className="size-4 text-[#1B8271]/70" />
          <span>Health &bull; Yoga &bull; Positive Thinking &bull; Community Welfare</span>
        </div>
      </div>

      {/* ── Right Panel — Login Form ── */}
      <div
        className="flex flex-1 items-center justify-center p-6 lg:p-12"
        style={{ background: "#f8fafc" }}
      >
        <div
          className={`w-full max-w-md transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {/* Mobile logo (hidden on desktop) */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div
              className="flex size-10 items-center justify-center rounded-xl"
              style={{ background: "linear-gradient(135deg, #1B8271 0%, #186F61 100%)" }}
            >
              <Sun className="size-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-900">NCV Admin</p>
              <p className="text-xs text-slate-400">Narchinthanai Vattam</p>
            </div>
          </div>

          {/* Form card */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
            }}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
              <p className="mt-1 text-sm text-slate-500">Sign in to your admin account to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@ncv.org.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 rounded-xl border-slate-200 bg-slate-50 text-sm transition-all focus:bg-white"
                  style={{}}
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
                    Password
                  </Label>
                <button type="button" className="text-xs text-[#1B8271] hover:text-[#186F61] font-medium transition-colors">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 rounded-xl border-slate-200 bg-slate-50 pr-11 text-sm transition-all focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  className="flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm text-red-700"
                  style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}
                >
                  <span className="mt-0.5 size-1.5 rounded-full bg-red-500 shrink-0 animate-pulse" />
                  {error}
                </div>
              )}

              {/* Submit */}
              <Button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-xl text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md"
                style={{
                  background: loading
                    ? "#FF7468"
                    : "linear-gradient(135deg, #FF7468 0%, #F64F40 100%)",
                  boxShadow: "0 4px 14px rgba(27,130,113,0.35)",
                }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="size-4" />
                    Sign In to Dashboard
                  </span>
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <p className="text-center text-xs text-slate-400">
                Protected by secure JWT authentication &bull; NCV Trust &copy; {new Date().getFullYear()}
              </p>
            </div>
          </div>

          {/* Back to website */}
          <p className="mt-5 text-center text-sm text-slate-500">
            Looking for the public site?{" "}
            <a href="/" className="font-semibold text-[#1B8271] hover:text-[#186F61] transition-colors">
              Visit ncv.org.in →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
