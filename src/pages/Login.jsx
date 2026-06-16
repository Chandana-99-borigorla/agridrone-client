import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import { loginUser } from '../services/authService'

const Login = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const errs = {}
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
    return errs
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
    if (serverError) setServerError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    try {
      const user = await loginUser(form)
      navigate(user.role === 'admin' ? '/admin' : '/dashboard')
    } catch (err) {
      setServerError(err.response?.data?.message || 'Login failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=90')",
          filter: 'blur(6px)',
        }}
      />
      <div className="absolute inset-0 bg-dark-300/60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
            <span className="text-white font-bold text-xl drop-shadow">
              Agri<span className="text-primary">Drone</span>
            </span>
          </Link>
        </div>

        <div
          className="rounded-3xl border border-white/10 p-8 shadow-2xl"
          style={{
            background: 'rgba(24, 24, 37, 0.82)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-white mb-1">Welcome back 👋</h1>
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:text-green-400 font-medium transition-colors">
                Sign up free
              </Link>
            </p>
          </div>

          {/* Server Error */}
          {serverError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5">
              <p className="text-red-400 text-sm">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full bg-dark-300/60 border rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none transition-all duration-200
                    ${errors.email ? 'border-red-500/70 focus:border-red-400' : 'border-white/10 focus:border-primary/60 focus:bg-dark-300/80'}`}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Password</label>
                <Link to="/forgot-password" className="text-primary text-xs hover:text-green-400 transition-colors">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full bg-dark-300/60 border rounded-xl pl-10 pr-11 py-3 text-white placeholder-gray-600 text-sm focus:outline-none transition-all duration-200
                    ${errors.password ? 'border-red-500/70 focus:border-red-400' : 'border-white/10 focus:border-primary/60 focus:bg-dark-300/80'}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25 mt-1">
              {loading ? <><Loader2 size={17} className="animate-spin" /> Signing in...</> : <>Sign In <ArrowRight size={17} /></>}
            </button>
          </form>

        </div>

        <p className="text-center text-gray-600 text-xs mt-5">
          Protected by AgriDrone · Your data stays private 🔒
        </p>
      </div>
    </div>
  )
}

export default Login