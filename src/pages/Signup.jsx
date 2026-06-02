import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'

const passwordStrength = (password) => {
  if (!password) return { score: 0, label: '', color: '' }
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  const map = [
    { label: 'Weak', color: 'bg-red-500' },
    { label: 'Fair', color: 'bg-yellow-500' },
    { label: 'Good', color: 'bg-blue-400' },
    { label: 'Strong', color: 'bg-primary' },
  ]
  return { score, ...map[Math.min(score - 1, 3)] }
}

const Signup = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    password: '', confirmPassword: '',
    role: 'farmer', agreeTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const strength = passwordStrength(form.password)

  const validate = () => {
    const errs = {}
    if (!form.fullName.trim()) errs.fullName = 'Full name is required'
    else if (form.fullName.trim().length < 3) errs.fullName = 'Name must be at least 3 characters'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.phone.trim()) errs.phone = 'Phone number is required'
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) errs.phone = 'Enter a valid 10-digit mobile number'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 8) errs.password = 'Minimum 8 characters'
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password'
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    if (!form.agreeTerms) errs.agreeTerms = 'You must agree to the terms'
    return errs
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
    if (errors[name]) setErrors({ ...errors, [name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    // TODO Day 6: await axios.post('/api/auth/register', form)
    setTimeout(() => { setLoading(false); navigate('/login') }, 1500)
  }

  const inputBase = (field) =>
    `w-full bg-dark-300/60 border rounded-xl py-3 text-white placeholder-gray-600 text-sm focus:outline-none transition-all duration-200 ${
      errors[field] ? 'border-red-500/70 focus:border-red-400' : 'border-white/10 focus:border-primary/60 focus:bg-dark-300/80'
    }`

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden py-8">

      {/* Full-screen blurred bg — different photo for signup */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1600&auto=format&fit=crop&q=90')",
          filter: 'blur(6px)',
        }}
      />
      <div className="absolute inset-0 bg-dark-300/65" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />

      {/* Floating glass card */}
      <div className="relative z-10 w-full max-w-md mx-4">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
            <span className="text-white font-bold text-xl drop-shadow">
              Agri<span className="text-primary">Drone</span>
            </span>
          </Link>
        </div>

        {/* Glass card */}
        <div
          className="rounded-3xl border border-white/10 p-8 shadow-2xl"
          style={{
            background: 'rgba(24, 24, 37, 0.82)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-1">Create your account 🌾</h1>
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:text-green-400 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          {/* Role toggle */}
          <div className="flex gap-1.5 bg-dark-300/70 rounded-xl p-1 mb-6 border border-white/5">
            {[
              { value: 'farmer', label: '🌾 Farmer' },
              { value: 'admin', label: '🛡️ Admin' },
            ].map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setForm({ ...form, role: r.value })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  form.role === r.value
                    ? 'bg-primary text-white shadow-sm shadow-primary/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="text" name="fullName" value={form.fullName} onChange={handleChange}
                  placeholder="Ravi Kumar"
                  className={`${inputBase('fullName')} pl-10 pr-4`} />
              </div>
              {errors.fullName && <p className="text-red-400 text-xs">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com"
                  className={`${inputBase('email')} pl-10 pr-4`} />
              </div>
              {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Phone Number</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-medium">+91</span>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="98765 43210"
                  className={`${inputBase('phone')} pl-11 pr-4`} />
              </div>
              {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange}
                  placeholder="Min. 8 characters"
                  className={`${inputBase('password')} pl-10 pr-11`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {form.password && (
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : 'bg-white/10'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 w-10 text-right">{strength.label}</span>
                </div>
              )}
              {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Confirm Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                  placeholder="Re-enter password"
                  className={`w-full bg-dark-300/60 border rounded-xl pl-10 pr-11 py-3 text-white placeholder-gray-600 text-sm focus:outline-none transition-all duration-200 ${
                    errors.confirmPassword ? 'border-red-500/70' :
                    form.confirmPassword && form.password === form.confirmPassword ? 'border-primary/60' :
                    'border-white/10 focus:border-primary/60'}`} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-xs">{errors.confirmPassword}</p>}
              {form.confirmPassword && form.password === form.confirmPassword && !errors.confirmPassword && (
                <p className="text-primary text-xs flex items-center gap-1"><CheckCircle2 size={12} /> Passwords match</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex flex-col gap-1">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange}
                  className="mt-0.5 accent-primary w-4 h-4 flex-shrink-0" />
                <span className="text-gray-400 text-xs leading-relaxed">
                  I agree to the{' '}
                  <a href="#" className="text-primary hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </span>
              </label>
              {errors.agreeTerms && <p className="text-red-400 text-xs ml-7">{errors.agreeTerms}</p>}
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25 mt-1">
              {loading
                ? <><Loader2 size={17} className="animate-spin" /> Creating account...</>
                : <>Create Account <ArrowRight size={17} /></>}
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

export default Signup
