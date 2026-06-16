// src/pages/Profile.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import {
  LayoutDashboard, ClipboardList, FileText,
  CalendarPlus, Upload, User, Mail, Phone,
  MapPin, Save, Loader2, CheckCircle2,
  ArrowLeft, Shield, Leaf
} from 'lucide-react'
import { getCurrentUser } from '../services/authService'

const Profile = () => {
  const navigate = useNavigate()
  const storedUser = getCurrentUser()
  const isFarmer = storedUser.role === 'farmer'

  const [form, setForm] = useState({
    fullName: storedUser.fullName || '',
    email:    storedUser.email    || '',
    phone:    storedUser.phone    || '',
    location: storedUser.location || '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors,  setErrors]  = useState({})

  const farmerNavItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'book',     icon: CalendarPlus,    label: 'Book Survey' },
    { id: 'bookings', icon: ClipboardList,   label: 'My Bookings' },
    { id: 'reports',  icon: FileText,        label: 'Reports' },
  ]

  const adminNavItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'bookings', icon: ClipboardList,   label: 'Manage Bookings' },
    { id: 'upload',   icon: Upload,          label: 'Upload Reports' },
  ]

  const navItems = isFarmer ? farmerNavItems : adminNavItems

  const validate = () => {
    const errs = {}
    if (!form.fullName.trim()) errs.fullName = 'Name is required'
    if (!form.phone.trim())    errs.phone    = 'Phone is required'
    return errs
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      const updated = { ...storedUser, ...form }
      localStorage.setItem('agriUser', JSON.stringify(updated))
      setLoading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }, 1000)
  }

  const inputCls = (field) =>
    `w-full bg-dark-100 border rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none transition-all duration-200
    ${errors[field] ? 'border-red-500/60' : 'border-white/10 focus:border-primary/60'}`

  return (
    <DashboardLayout
      activeTab=""
      setActiveTab={() => navigate(isFarmer ? '/dashboard' : '/admin')}
      navItems={navItems}
    >
      <div className="max-w-2xl flex flex-col gap-6">

        <button
          onClick={() => navigate(isFarmer ? '/dashboard' : '/admin')}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors w-fit"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 rounded-2xl px-6 py-6 flex items-center gap-5">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <span className="text-primary text-2xl font-bold">
              {form.fullName?.charAt(0) || '?'}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-white font-bold text-xl">{form.fullName || 'Your Name'}</h2>
              <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium
                ${isFarmer ? 'bg-primary/10 text-primary' : 'bg-blue-500/10 text-blue-400'}`}>
                {isFarmer ? <Leaf size={11} /> : <Shield size={11} />}
                {isFarmer ? 'Farmer' : 'Admin'}
              </span>
            </div>
            <p className="text-gray-400 text-sm">{form.email}</p>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-dark-200 border border-white/5 rounded-2xl p-6 sm:p-8">
          <h3 className="text-white font-semibold text-lg mb-6">Edit Profile</h3>

          {success && (
            <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 mb-6">
              <CheckCircle2 size={17} className="text-primary" />
              <span className="text-primary text-sm font-medium">Profile updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input name="fullName" value={form.fullName} onChange={handleChange}
                    placeholder="Your full name"
                    className={`${inputCls('fullName')} pl-10`} />
                </div>
                {errors.fullName && <p className="text-red-400 text-xs">{errors.fullName}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Email <span className="text-gray-600 normal-case font-normal">(cannot change)</span></label>
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input value={form.email} readOnly
                    className="w-full bg-dark-100/40 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-gray-500 text-sm cursor-not-allowed" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Phone Number</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input name="phone" value={form.phone} onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`${inputCls('phone')} pl-10`} />
                </div>
                {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Location <span className="text-gray-600 normal-case font-normal">(optional)</span></label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input name="location" value={form.location} onChange={handleChange}
                    placeholder="City, State"
                    className={`${inputCls('location')} pl-10`} />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25 mt-2">
              {loading
                ? <><Loader2 size={17} className="animate-spin" /> Saving changes...</>
                : <><Save size={17} /> Save Changes</>}
            </button>
          </form>
        </div>

        {/* Account Info */}
        <div className="bg-dark-200 border border-white/5 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Account Info</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: 'User ID', value: storedUser._id || 'N/A' },
              { label: 'Role',    value: storedUser.role || 'N/A' },
              { label: 'Token',   value: storedUser.token ? '••••••••' : 'N/A' },
              { label: 'Status',  value: 'Active ✅' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-dark-100 rounded-xl p-3">
                <p className="text-gray-500 text-xs">{label}</p>
                <p className="text-gray-300 text-sm font-medium mt-0.5 truncate">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Profile