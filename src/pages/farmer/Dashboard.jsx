// src/pages/farmer/Dashboard.jsx
import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { getBookings } from '../../services/bookingService'
import { getReports } from '../../services/reportService'
import { getCurrentUser } from '../../services/authService'
import { createBooking } from '../../services/bookingService'
import {
  CalendarCheck, Clock, CheckCircle2, FileText,
  MapPin, CalendarPlus, ChevronRight,
  Download, Eye, Leaf, AlertTriangle, X,
  Loader2, ArrowRight, LayoutDashboard, ClipboardList
} from 'lucide-react'

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

// ─── Health Badge ─────────────────────────────────────────────
const HealthBadge = ({ health }) => {
  const map = {
    Excellent: 'bg-primary/10 text-primary',
    Good:      'bg-blue-500/10 text-blue-400',
    Fair:      'bg-yellow-500/10 text-yellow-400',
    Poor:      'bg-red-500/10 text-red-400',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${map[health] || map.Good}`}>
      {health}
    </span>
  )
}

// ─── Overview Tab ─────────────────────────────────────────────
const Overview = ({ setActiveTab, bookings, reports, farmer }) => {
  const total      = bookings.length
  const pending    = bookings.filter(b => b.status === 'pending').length
  const completed  = bookings.filter(b => b.status === 'completed').length
  const reportsCount = reports.length

  const stats = [
    { label: 'Total Bookings', value: total,        icon: CalendarCheck, color: 'text-blue-400',   bg: 'bg-blue-500/10' },
    { label: 'Pending',        value: pending,      icon: Clock,         color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { label: 'Completed',      value: completed,    icon: CheckCircle2,  color: 'text-primary',    bg: 'bg-primary/10' },
    { label: 'Reports Ready',  value: reportsCount, icon: FileText,      color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ]

  return (
    <div className="flex flex-col gap-8">

      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-xl mb-1">Good morning, {farmer.fullName?.split(' ')[0]}! 🌾</h2>
          <p className="text-gray-400 text-sm">You have <span className="text-primary font-semibold">{pending} pending</span> surveys and <span className="text-primary font-semibold">{reportsCount} reports</span> ready to view.</p>
        </div>
        <button
          onClick={() => setActiveTab('book')}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-105 whitespace-nowrap"
        >
          <CalendarPlus size={16} /> Book New Survey
        </button>
      </div>

      {/* Stats */}
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

      {/* Recent bookings */}
      <div className="bg-dark-200 border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-semibold">Recent Bookings</h3>
          <button onClick={() => setActiveTab('bookings')} className="text-primary text-sm hover:text-green-400 flex items-center gap-1 transition-colors">
            View all <ChevronRight size={14} />
          </button>
        </div>
        {bookings.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">No bookings yet. Book your first survey!</p>
        ) : (
          <div className="flex flex-col gap-3">
            {bookings.slice(0, 3).map((b) => (
              <div key={b._id} className="flex items-center justify-between bg-dark-100 rounded-xl px-4 py-3 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{b.fieldName}</p>
                    <p className="text-gray-500 text-xs">{b.cropType} · {b.acres} acres · {b.surveyDate}</p>
                  </div>
                </div>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Latest report preview */}
      {reports.length > 0 && (
        <div className="bg-dark-200 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-semibold">Latest Report</h3>
            <button onClick={() => setActiveTab('reports')} className="text-primary text-sm hover:text-green-400 flex items-center gap-1 transition-colors">
              All reports <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            {reports[0].images?.[0] && (
              <img
                src={reports[0].images[0]}
                alt="field"
                className="w-full sm:w-40 h-28 object-cover rounded-xl flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-white font-semibold">{reports[0].booking?.fieldName}</p>
                <HealthBadge health={reports[0].overallHealth} />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">{reports[0].notes}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><AlertTriangle size={12} className="text-yellow-400" /> Disease area: {reports[0].diseaseAreaPercent}%</span>
                <span className="flex items-center gap-1"><Leaf size={12} className="text-primary" /> {reports[0].booking?.cropType}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Book Survey Tab ──────────────────────────────────────────
const BookSurvey = ({ onSuccess }) => {
  const [form, setForm] = useState({
    fieldName: '', location: '', acres: '',
    cropType: '', surveyDate: '', notes: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const cropOptions = ['Rice', 'Wheat', 'Cotton', 'Maize', 'Sugarcane', 'Soybean', 'Groundnut', 'Other']

  const validate = () => {
    const errs = {}
    if (!form.fieldName.trim()) errs.fieldName = 'Field name is required'
    if (!form.location.trim()) errs.location = 'Location is required'
    if (!form.acres || isNaN(form.acres) || Number(form.acres) <= 0) errs.acres = 'Enter valid acreage'
    if (!form.cropType) errs.cropType = 'Select a crop type'
    if (!form.surveyDate) errs.surveyDate = 'Select a survey date'
    else {
      const selected = new Date(form.surveyDate)
      const today = new Date(); today.setHours(0,0,0,0)
      if (selected <= today) errs.surveyDate = 'Survey date must be in the future'
    }
    return errs
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    try {
      await createBooking({
        fieldName: form.fieldName,
        location: form.location,
        acres: Number(form.acres),
        cropType: form.cropType,
        surveyDate: form.surveyDate,
        notes: form.notes,
      })
      setSuccess(true)
      setForm({ fieldName: '', location: '', acres: '', cropType: '', surveyDate: '', notes: '' })
      if (onSuccess) onSuccess()
    } catch (err) {
      console.error('Booking error:', err)
    } finally {
      setLoading(false)
    }
  }

  const inputCls = (field) =>
    `w-full bg-dark-100 border rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none transition-all duration-200
    ${errors[field] ? 'border-red-500/60' : 'border-white/10 focus:border-primary/60'}`

  return (
    <div className="max-w-2xl">
      <div className="bg-dark-200 border border-white/5 rounded-2xl p-6 sm:p-8">
        <h2 className="text-white font-bold text-xl mb-1">Book a Drone Survey</h2>
        <p className="text-gray-400 text-sm mb-7">Fill in your field details and we'll schedule a drone survey for you.</p>

        {success && (
          <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-primary" />
              <span className="text-primary text-sm font-medium">Booking submitted! We'll confirm within 24 hours.</span>
            </div>
            <button onClick={() => setSuccess(false)}><X size={16} className="text-primary" /></button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Field Name</label>
              <input name="fieldName" value={form.fieldName} onChange={handleChange}
                placeholder="e.g. North Field" className={inputCls('fieldName')} />
              {errors.fieldName && <p className="text-red-400 text-xs">{errors.fieldName}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Location / Village</label>
              <input name="location" value={form.location} onChange={handleChange}
                placeholder="e.g. Medchal, Hyderabad" className={inputCls('location')} />
              {errors.location && <p className="text-red-400 text-xs">{errors.location}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Field Size (Acres)</label>
              <input name="acres" type="number" min="0" value={form.acres} onChange={handleChange}
                placeholder="e.g. 10" className={inputCls('acres')} />
              {errors.acres && <p className="text-red-400 text-xs">{errors.acres}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Crop Type</label>
              <select name="cropType" value={form.cropType} onChange={handleChange}
                className={`${inputCls('cropType')} cursor-pointer`}>
                <option value="" disabled className="bg-dark-300">Select crop...</option>
                {cropOptions.map(c => <option key={c} value={c} className="bg-dark-300">{c}</option>)}
              </select>
              {errors.cropType && <p className="text-red-400 text-xs">{errors.cropType}</p>}
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Preferred Survey Date</label>
              <input name="surveyDate" type="date" value={form.surveyDate} onChange={handleChange}
                className={`${inputCls('surveyDate')} cursor-pointer`} />
              {errors.surveyDate && <p className="text-red-400 text-xs">{errors.surveyDate}</p>}
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Additional Notes <span className="text-gray-600 normal-case font-normal">(optional)</span></label>
              <textarea name="notes" rows={3} value={form.notes} onChange={handleChange}
                placeholder="Any special instructions..."
                className={`${inputCls('notes')} resize-none`} />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25">
            {loading
              ? <><Loader2 size={17} className="animate-spin" /> Submitting booking...</>
              : <>Submit Booking <ArrowRight size={17} /></>}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── My Bookings Tab ──────────────────────────────────────────
const MyBookings = ({ bookings }) => {
  const [filter, setFilter] = useState('all')
  const statuses = ['all', 'pending', 'confirmed', 'completed']

  const filtered = filter === 'all'
    ? bookings
    : bookings.filter(b => b.status === filter)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-xl">My Bookings</h2>
          <p className="text-gray-400 text-sm mt-0.5">{bookings.length} total surveys booked</p>
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-white font-semibold">{b.fieldName}</p>
                      <span className="text-gray-600 text-xs">#{b._id?.slice(-6)}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{b.location}</p>
                  </div>
                </div>
                <StatusBadge status={b.status} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/5">
                {[
                  { label: 'Crop',        value: b.cropType },
                  { label: 'Acres',       value: `${b.acres} ac` },
                  { label: 'Survey Date', value: b.surveyDate },
                  { label: 'Booked On',   value: new Date(b.createdAt).toLocaleDateString() },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-gray-600 text-xs">{label}</p>
                    <p className="text-gray-300 text-sm font-medium mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Reports Tab ──────────────────────────────────────────────
const Reports = ({ reports }) => {
  const [selectedReport, setSelectedReport] = useState(null)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-white font-bold text-xl">Crop Reports</h2>
        <p className="text-gray-400 text-sm mt-0.5">{reports.length} reports available</p>
      </div>

      {reports.length === 0 ? (
        <div className="bg-dark-200 border border-white/5 rounded-2xl p-12 text-center">
          <FileText size={40} className="text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500">No reports yet. Complete a survey to get your first report.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {reports.map((r) => (
            <div key={r._id} className="bg-dark-200 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/20 transition-colors group">
              <div className="relative h-44 overflow-hidden">
                {r.images?.[0] ? (
                  <img src={r.images[0]} alt={r.booking?.fieldName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-dark-100 flex items-center justify-center">
                    <FileText size={40} className="text-gray-600" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-300/80 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div>
                    <p className="text-white font-semibold">{r.booking?.fieldName}</p>
                    <p className="text-gray-300 text-xs">{r.booking?.cropType} · {r.booking?.surveyDate}</p>
                  </div>
                  <HealthBadge health={r.overallHealth} />
                </div>
              </div>

              <div className="p-5">
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{r.notes}</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 bg-dark-100 rounded-xl p-3 text-center">
                    <p className="text-red-400 font-bold text-lg">{r.diseaseAreaPercent}%</p>
                    <p className="text-gray-500 text-xs">Disease Area</p>
                  </div>
                  <div className="flex-1 bg-dark-100 rounded-xl p-3 text-center">
                    <p className="text-primary font-bold text-lg">{r.images?.length || 0}</p>
                    <p className="text-gray-500 text-xs">Aerial Photos</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setSelectedReport(r)}
                    className="flex-1 flex items-center justify-center gap-2 bg-dark-100 hover:bg-dark-100/60 border border-white/5 text-white text-sm font-medium py-2.5 rounded-xl transition-colors">
                    <Eye size={15} /> View Full
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium py-2.5 rounded-xl transition-colors">
                    <Download size={15} /> Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-200 border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-dark-200 border-b border-white/5 px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-semibold">Report — {selectedReport.booking?.fieldName}</h3>
              <button onClick={() => setSelectedReport(null)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-5">
              {selectedReport.images?.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {selectedReport.images.map((img, i) => (
                    <img key={i} src={img} alt={`field-${i}`}
                      className="w-48 h-32 object-cover rounded-xl flex-shrink-0" />
                  ))}
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Crop Type',      value: selectedReport.booking?.cropType },
                  { label: 'Survey Date',    value: selectedReport.booking?.surveyDate },
                  { label: 'Overall Health', value: selectedReport.overallHealth },
                  { label: 'Disease Area',   value: `${selectedReport.diseaseAreaPercent}%` },
                  { label: 'Report Date',    value: new Date(selectedReport.createdAt).toLocaleDateString() },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-dark-100 rounded-xl p-3">
                    <p className="text-gray-500 text-xs">{label}</p>
                    <p className="text-white text-sm font-medium mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-dark-100 rounded-xl p-4">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2 font-semibold">Expert Notes</p>
                <p className="text-gray-300 text-sm leading-relaxed">{selectedReport.notes}</p>
              </div>
              <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-xl transition-colors">
                <Download size={16} /> Download Full Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────
const farmerNavItems = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'book',     icon: CalendarPlus,    label: 'Book Survey' },
  { id: 'bookings', icon: ClipboardList,   label: 'My Bookings' },
  { id: 'reports',  icon: FileText,        label: 'Reports' },
]

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [bookings, setBookings] = useState([])
  const [reports, setReports] = useState([])
  const [farmer, setFarmer] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [b, r] = await Promise.all([getBookings(), getReports()])
        setBookings(b)
        setReports(r)
        setFarmer(getCurrentUser())
      } catch (err) {
        console.error('Failed to fetch data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

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
      case 'overview': return <Overview setActiveTab={setActiveTab} bookings={bookings} reports={reports} farmer={farmer} />
      case 'book':     return <BookSurvey onSuccess={() => getBookings().then(setBookings)} />
      case 'bookings': return <MyBookings bookings={bookings} />
      case 'reports':  return <Reports reports={reports} />
      default:         return <Overview setActiveTab={setActiveTab} bookings={bookings} reports={reports} farmer={farmer} />
    }
  }

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab} navItems={farmerNavItems}>
      {renderTab()}
    </DashboardLayout>
  )
}

export default FarmerDashboard