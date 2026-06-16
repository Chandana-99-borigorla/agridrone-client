import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'
import { resetPassword } from '../services/authService'

const ResetPassword = () => {
  const { token }               = useParams()
  const navigate                = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    if (password !== confirm)  { setError('Passwords do not match'); return }
    setLoading(true)
    setError('')
    try {
      await resetPassword(token, password)
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2500)
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed. Link may have expired.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=90')",
          filter: 'blur(6px)',
        }}
      />
      <div className="absolute inset-0 bg-dark-300/60" />

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
            <span className="text-white font-bold text-xl">
              Agri<span className="text-primary">Drone</span>
            </span>
          </Link>
        </div>

        <div className="rounded-3xl border border-white/10 p-8 shadow-2xl"
          style={{ background: 'rgba(24,24,37,0.82)', backdropFilter: 'blur(24px)' }}>

          {success ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-primary" />
              </div>
              <h2 className="text-white font-bold text-xl mb-2">Password Reset! 🎉</h2>
              <p className="text-gray-400 text-sm">Redirecting you to login...</p>
            </div>
          ) : (
            <>
              <div className="mb-7">
                <h1 className="text-2xl font-bold text-white mb-1">Reset Password 🔑</h1>
                <p className="text-gray-400 text-sm">Enter your new password below.</p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">New Password</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type={showPw ? 'text' : 'password'} value={password}
                      onChange={(e) => { setPassword(e.target.value); setError('') }}
                      placeholder="••••••••"
                      className="w-full bg-dark-300/60 border border-white/10 rounded-xl pl-10 pr-11 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-primary/60 transition-all" />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Confirm Password</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="password" value={confirm}
                      onChange={(e) => { setConfirm(e.target.value); setError('') }}
                      placeholder="••••••••"
                      className="w-full bg-dark-300/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-primary/60 transition-all" />
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all hover:scale-[1.02]">
                  {loading
                    ? <><Loader2 size={17} className="animate-spin" /> Resetting...</>
                    : <>Reset Password <ArrowRight size={17} /></>}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResetPassword