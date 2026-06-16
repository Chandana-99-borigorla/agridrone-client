// src/pages/admin/Dashboard.jsx
import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { getBookings, updateBookingStatus } from '../../services/bookingService'
import { getReports, createReport } from '../../services/reportService'
import {
  LayoutDashboard, ClipboardList, Upload,
  MapPin, CheckCircle2, Clock,
  ChevronRight, Loader2, X, ArrowRight,
  AlertTriangle, FileText
} from 'lucide-react'

// ─── Admin Nav Items ──────────────────────────────────────────
const adminNavItems = [
  { id: 'overview',  icon: LayoutDashboard, label: 'Overview' },
  { id: 'bookings',  icon: ClipboardList,   label: 'Manage Bookings' },
  { id: 'upload',    icon: Upload,          label: 'Upload Reports' },
]

// ─── Status Badge ─────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    pending:   'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    confirmed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    completed: 'bg-primary/10 text-primary border-primary/20',
    cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${map[status] || map.pending}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

// ─── Overview Tab ─────────────────────────────────────────────
const AdminOverview = ({ setActiveTab, bookings }) => {
  const total     = bookings.length
  const pending   = bookings.filter(b => b.status === 'pending').length
  const confirmed = bookings.filter(b => b.status === 'confirmed').length
  const completed = bookings.filter(b => b.status === 'completed').length

  const stats = [
    { label: 'Total Bookings', value: total,     icon: ClipboardList,  color: 'text-blue-400',   bg: 'bg-blue-500/10' },
    { label: 'Pending',        value: pending,   icon: Clock,          color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { label: 'Confirmed',      value: confirmed, icon: AlertTriangle,  color: 'text-blue-400',   bg: 'bg-blue-500/10' },
    { label: 'Completed',      value: completed, icon: CheckCircle2,   color: 'text-primary',    bg: 'bg-primary/10' },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-xl mb-1">Admin Dashboard 🛡️</h2>
          <p className="text-gray-400 text-sm">
            You have <span className="text-yellow-400 font-semibold">{pending} pending</span> bookings to review
            and <span className="text-primary font-semibold">{confirmed} confirmed</span> surveys to complete.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('bookings')}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-105 whitespace-nowrap"
        >
          <ClipboardList size={16} /> Manage Bookings
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-dark-200 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-4`}>
              <Icon size={20} className={color} />
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-gray-500 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-dark-200 border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-semibold">Recent Bookings</h3>
          <button onClick={() => setActiveTab('bookings')}
            className="text-primary text-sm hover:text-green-400 flex items-center gap-1 transition-colors">
            View all <ChevronRight size={14} />
          </button>
        </div>
        {bookings.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">No bookings yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {bookings.slice(0, 4).map((b) => (
              <div key={b._id} className="flex items-center justify-between bg-dark-100 rounded-xl px-4 py-3 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xs font-bold">
                      {b.farmer?.fullName?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{b.farmer?.fullName}</p>
                    <p className="text-gray-500 text-xs">{b.fieldName} · {b.cropType} · {b.surveyDate}</p>
                  </div>
                </div>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <button onClick={() => setActiveTab('bookings')}
          className="flex items-center gap-4 bg-dark-200 border border-white/5 hover:border-primary/30 rounded-2xl p-5 text-left transition-all group">
          <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
            <Clock size={22} className="text-yellow-400" />
          </div>
          <div>
            <p className="text-white font-semibold">Review Pending</p>
            <p className="text-gray-500 text-sm">{pending} bookings need your action</p>
          </div>
          <ChevronRight size={18} className="text-gray-600 ml-auto group-hover:text-primary transition-colors" />
        </button>

        <button onClick={() => setActiveTab('upload')}
          className="flex items-center gap-4 bg-dark-200 border border-white/5 hover:border-primary/30 rounded-2xl p-5 text-left transition-all group">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
            <Upload size={22} className="text-primary" />
          </div>
          <div>
            <p className="text-white font-semibold">Upload Reports</p>
            <p className="text-gray-500 text-sm">{completed} surveys ready for reports</p>
          </div>
          <ChevronRight size={18} className="text-gray-600 ml-auto group-hover:text-primary transition-colors" />
        </button>
      </div>
    </div>
  )
}

// ─── Manage Bookings Tab ──────────────────────────────────────
const ManageBookings = ({ bookings, onStatusChange }) => {
  const [filter, setFilter] = useState('all')
  const [updatingId, setUpdatingId] = useState(null)
  const statuses = ['all', 'pending', 'confirmed', 'completed']

  const filtered = filter === 'all'
    ? bookings
    : bookings.filter(b => b.status === filter)

  const nextStatus = { pending: 'confirmed', confirmed: 'completed' }

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id)
    try {
      await updateBookingStatus(id, newStatus)
      onStatusChange()
    } catch (err) {
      console.error('Status update error:', err)
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-xl">Manage Bookings</h2>
          <p className="text-gray-400 text-sm mt-0.5">{bookings.length} total bookings</p>
        </div>
        <div className="flex gap-1.5 bg-dark-200 border border-white/5 rounded-xl p-1">
          {statuses.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-200
                ${filter === s ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-dark-200 border border-white/5 rounded-2xl p-12 text-center">
          <p className="text-gray-500">No bookings found.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((b) => (
            <div key={b._id} className="bg-dark-200 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm font-bold">{b.farmer?.fullName?.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-semibold">{b.farmer?.fullName}</p>
                      <span className="text-gray-600 text-xs">#{b._id?.slice(-6)}</span>
                    </div>
                    <p className="text-gray-500 text-xs">{b.farmer?.email}</p>
                  </div>
                </div>
                <StatusBadge status={b.status} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 pt-4 border-t border-white/5">
                {[
                  { label: 'Field',       value: b.fieldName },
                  { label: 'Location',    value: b.location },
                  { label: 'Crop',        value: `${b.cropType} · ${b.acres} ac` },
                  { label: 'Survey Date', value: b.surveyDate },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-gray-600 text-xs">{label}</p>
                    <p className="text-gray-300 text-sm font-medium mt-0.5 truncate">{value}</p>
                  </div>
                ))}
              </div>

              {nextStatus[b.status] && (
                <div className="flex justify-end">
                  <button
                    onClick={() => handleStatusChange(b._id, nextStatus[b.status])}
                    disabled={updatingId === b._id}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-xl transition-all"
                  >
                    {updatingId === b._id
                      ? <><Loader2 size={14} className="animate-spin" /> Updating...</>
                      : b.status === 'pending'
                        ? <><CheckCircle2 size={14} /> Confirm Booking</>
                        : <><CheckCircle2 size={14} /> Mark Completed</>
                    }
                  </button>
                </div>
              )}

              {b.status === 'completed' && (
                <div className="flex justify-end">
                  <span className="text-primary text-xs flex items-center gap-1">
                    <CheckCircle2 size={13} /> Survey completed
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Upload Reports Tab ───────────────────────────────────────
const UploadReports = ({ bookings, onSuccess }) => {
  const completedBookings = bookings.filter(b => b.status === 'completed')
  const [form, setForm] = useState({
    bookingId: '', overallHealth: '', diseaseAreaPercent: '', notes: '',
  })
  const [errors, setErrors]         = useState({})
  const [loading, setLoading]       = useState(false)
  const [success, setSuccess]       = useState(false)
  const [serverError, setServerError] = useState('')
  const [images, setImages]         = useState([])
  const [previews, setPreviews]     = useState([])

  const healthOptions = ['Excellent', 'Good', 'Fair', 'Poor']

  const validate = () => {
    const errs = {}
    if (!form.bookingId)        errs.bookingId = 'Select a booking'
    if (!form.overallHealth)    errs.overallHealth = 'Select crop health'
    if (!form.diseaseAreaPercent || isNaN(form.diseaseAreaPercent) ||
        Number(form.diseaseAreaPercent) < 0 || Number(form.diseaseAreaPercent) > 100)
      errs.diseaseAreaPercent = 'Enter a valid percentage (0-100)'
    if (!form.notes.trim())     errs.notes = 'Expert notes are required'
    if (images.length === 0)    errs.images = 'Upload at least one aerial image'
    return errs
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
    if (serverError) setServerError('')
  }

  const handleImages = (e) => {
    const files = Array.from(e.target.files)
    setImages(files)
    setPreviews(files.map(f => URL.createObjectURL(f)))
    if (errors.images) setErrors({ ...errors, images: '' })
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
    setPreviews(previews.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    try {
      // Use FormData for file upload
      const formData = new FormData()
      formData.append('bookingId',          form.bookingId)
      formData.append('overallHealth',      form.overallHealth)
      formData.append('diseaseAreaPercent', form.diseaseAreaPercent)
      formData.append('notes',              form.notes)
      images.forEach(img => formData.append('images', img))

      await createReport(formData)
      setSuccess(true)
      setForm({ bookingId: '', overallHealth: '', diseaseAreaPercent: '', notes: '' })
      setImages([])
      setPreviews([])
      if (onSuccess) onSuccess()
    } catch (err) {
      setServerError(err.response?.data?.message || 'Failed to upload report')
    } finally {
      setLoading(false)
    }
  }

  const selectedBooking = bookings.find(b => b._id === form.bookingId)

  const inputCls = (field) =>
    `w-full bg-dark-100 border rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none transition-all duration-200
    ${errors[field] ? 'border-red-500/60' : 'border-white/10 focus:border-primary/60'}`

  return (
    <div className="max-w-2xl">
      <div className="bg-dark-200 border border-white/5 rounded-2xl p-6 sm:p-8">
        <h2 className="text-white font-bold text-xl mb-1">Upload Crop Report</h2>
        <p className="text-gray-400 text-sm mb-7">Upload the drone survey report and aerial images.</p>

        {success && (
          <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-primary" />
              <span className="text-primary text-sm font-medium">Report uploaded! Farmer will be notified.</span>
            </div>
            <button onClick={() => setSuccess(false)}><X size={16} className="text-primary" /></button>
          </div>
        )}

        {serverError && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6">
            <p className="text-red-400 text-sm">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

          {/* Select Booking */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Select Completed Booking</label>
            <select name="bookingId" value={form.bookingId} onChange={handleChange}
              className={`${inputCls('bookingId')} cursor-pointer`}>
              <option value="" disabled className="bg-dark-300">Choose a booking...</option>
              {completedBookings.map(b => (
                <option key={b._id} value={b._id} className="bg-dark-300">
                  {b.farmer?.fullName} · {b.fieldName} · {b.cropType}
                </option>
              ))}
            </select>
            {errors.bookingId && <p className="text-red-400 text-xs">{errors.bookingId}</p>}
          </div>

          {/* Booking Preview */}
          {selectedBooking && (
            <div className="bg-dark-100 border border-primary/20 rounded-xl p-4 flex gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-primary" />
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 flex-1">
                {[
                  { label: 'Farmer',   value: selectedBooking.farmer?.fullName },
                  { label: 'Field',    value: selectedBooking.fieldName },
                  { label: 'Crop',     value: selectedBooking.cropType },
                  { label: 'Location', value: selectedBooking.location },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <span className="text-gray-600 text-xs">{label}: </span>
                    <span className="text-gray-300 text-xs font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Health */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Overall Crop Health</label>
              <select name="overallHealth" value={form.overallHealth} onChange={handleChange}
                className={`${inputCls('overallHealth')} cursor-pointer`}>
                <option value="" disabled className="bg-dark-300">Select health...</option>
                {healthOptions.map(h => <option key={h} value={h} className="bg-dark-300">{h}</option>)}
              </select>
              {errors.overallHealth && <p className="text-red-400 text-xs">{errors.overallHealth}</p>}
            </div>

            {/* Disease % */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Disease Area (%)</label>
              <input name="diseaseAreaPercent" type="number" min="0" max="100"
                value={form.diseaseAreaPercent} onChange={handleChange}
                placeholder="e.g. 15" className={inputCls('diseaseAreaPercent')} />
              {errors.diseaseAreaPercent && <p className="text-red-400 text-xs">{errors.diseaseAreaPercent}</p>}
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Expert Notes</label>
            <textarea name="notes" rows={4} value={form.notes} onChange={handleChange}
              placeholder="Describe crop condition, disease findings, recommendations..."
              className={`${inputCls('notes')} resize-none`} />
            {errors.notes && <p className="text-red-400 text-xs">{errors.notes}</p>}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Aerial Images</label>
            <label className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl py-8 cursor-pointer transition-colors
              ${errors.images ? 'border-red-500/60' : 'border-white/10 hover:border-primary/40'}`}>
              <Upload size={24} className="text-gray-500" />
              <p className="text-gray-400 text-sm">Click to upload aerial photos</p>
              <p className="text-gray-600 text-xs">PNG, JPG, WEBP up to 10MB each · Max 5 images</p>
              <input type="file" multiple accept="image/*" onChange={handleImages} className="hidden" />
            </label>
            {errors.images && <p className="text-red-400 text-xs">{errors.images}</p>}

            {/* Previews */}
            {previews.length > 0 && (
              <div className="flex gap-3 flex-wrap mt-2">
                {previews.map((src, i) => (
                  <div key={i} className="relative">
                    <img src={src} alt={`preview-${i}`}
                      className="w-20 h-20 object-cover rounded-xl border border-white/10" />
                    <button type="button" onClick={() => removeImage(i)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                      <X size={11} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" disabled={loading}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25">
            {loading
              ? <><Loader2 size={17} className="animate-spin" /> Uploading report...</>
              : <><Upload size={17} /> Upload Report</>}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Main Admin Dashboard ─────────────────────────────────────
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = async () => {
    try {
      const b = await getBookings()
      setBookings(b)
    } catch (err) {
      console.error('Failed to fetch bookings:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBookings() }, [])

  if (loading) return (
    <div className="min-h-screen bg-dark-300 flex items-center justify-center">
      <div className="flex items-center gap-3 text-gray-400">
        <Loader2 size={24} className="animate-spin text-primary" />
        <span>Loading dashboard...</span>
      </div>
    </div>
  )

  const renderTab = () => {
    switch (activeTab) {
      case 'overview': return <AdminOverview setActiveTab={setActiveTab} bookings={bookings} />
      case 'bookings': return <ManageBookings bookings={bookings} onStatusChange={fetchBookings} />
      case 'upload':   return <UploadReports bookings={bookings} onSuccess={fetchBookings} />
      default:         return <AdminOverview setActiveTab={setActiveTab} bookings={bookings} />
    }
  }

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab} navItems={adminNavItems}>
      {renderTab()}
    </DashboardLayout>
  )
}

export default AdminDashboard