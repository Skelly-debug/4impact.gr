"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"

export default function SignIn() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    })

    setIsLoading(false)

    if (result?.error) {
      setError("Invalid username or password.")
    } else {
      router.push("/admin")
    }
  }

  return (
    <div className="min-h-screen flex bg-[#0F1B2D]">

      {/* ── Left panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-[42%] px-14 py-12 bg-[#0A1520] border-r border-white/5">
        {/* brand */}
        <div>
          <div className="text-[#1A9EDB] font-black text-2xl leading-none tracking-tight">
            4IMP<span className="text-white">ACT</span>
          </div>
          <div className="text-[11px] text-slate-500 uppercase tracking-[0.25em] mt-1 font-medium">
            Communications
          </div>
        </div>

        {/* quote */}
        <div>
          <div className="w-8 h-[2px] bg-[#1A9EDB] mb-6" />
          <p className="text-2xl font-semibold text-white leading-snug max-w-xs">
            Shaping narratives.<br />
            <span className="text-[#1A9EDB]">Driving impact.</span>
          </p>
          <p className="text-sm text-slate-500 mt-4 max-w-xs leading-relaxed">
            Manage your content, monitor your articles, and keep your communications strategy on track.
          </p>
        </div>

        
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">

        {/* mobile brand */}
        <div className="lg:hidden mb-10 text-center">
          <div className="text-[#1A9EDB] font-black text-2xl leading-none tracking-tight">
            4IMP<span className="text-white">ACT</span>
          </div>
          <div className="text-[11px] text-slate-500 uppercase tracking-[0.25em] mt-1 font-medium">
            Communications
          </div>
        </div>

        <div className="w-full max-w-sm">
          {/* heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Admin sign in
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Enter your credentials to access the dashboard.
            </p>
          </div>

          {/* error */}
          {error && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* username */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your username"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#1A9EDB]/40 focus:border-[#1A9EDB]/60 transition"
              />
            </div>

            {/* password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-11 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#1A9EDB]/40 focus:border-[#1A9EDB]/60 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-2 rounded-lg bg-[#1A9EDB] text-white text-sm font-semibold hover:bg-[#1589c4] active:bg-[#1175aa] transition-colors shadow-lg shadow-[#1A9EDB]/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* back link */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to main site
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}