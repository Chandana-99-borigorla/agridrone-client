import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import {
  Scan, BarChart3, MapPin, Shield, Zap,
  Users, CheckCircle, ArrowRight, Mail,
  Phone, MapPinned, Star, Play, TrendingUp,
  Camera, FileText, Bell, ChevronRight
} from 'lucide-react'

// ── Drone SVG Illustration ──────────────────────────────────────
const DroneIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl" />
    <svg viewBox="0 0 400 300" className="w-full max-w-lg drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
      {/* Glow circle */}
      <ellipse cx="200" cy="260" rx="120" ry="20" fill="#16a34a" opacity="0.15" />

      {/* Drone body */}
      <rect x="155" y="120" width="90" height="40" rx="12" fill="#1e1e2e" stroke="#16a34a" strokeWidth="1.5" />
      <rect x="175" y="128" width="50" height="24" rx="8" fill="#181825" />
      <circle cx="200" cy="140" r="8" fill="#16a34a" opacity="0.8" />
      <circle cx="200" cy="140" r="4" fill="#4ade80" />

      {/* Camera */}
      <rect x="188" y="155" width="24" height="18" rx="4" fill="#11111b" stroke="#16a34a" strokeWidth="1" />
      <circle cx="200" cy="164" r="5" fill="#16a34a" opacity="0.6" />
      <circle cx="200" cy="164" r="2.5" fill="#4ade80" />

      {/* Arms */}
      <line x1="155" y1="132" x2="100" y2="110" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
      <line x1="155" y1="148" x2="100" y2="168" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
      <line x1="245" y1="132" x2="300" y2="110" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
      <line x1="245" y1="148" x2="300" y2="168" stroke="#374151" strokeWidth="3" strokeLinecap="round" />

      {/* Propellers */}
      <ellipse cx="100" cy="108" rx="28" ry="5" fill="#16a34a" opacity="0.7" />
      <ellipse cx="100" cy="170" rx="28" ry="5" fill="#16a34a" opacity="0.7" />
      <ellipse cx="300" cy="108" rx="28" ry="5" fill="#16a34a" opacity="0.7" />
      <ellipse cx="300" cy="170" rx="28" ry="5" fill="#16a34a" opacity="0.7" />

      {/* Motor hubs */}
      <circle cx="100" cy="108" r="5" fill="#374151" stroke="#16a34a" strokeWidth="1" />
      <circle cx="100" cy="170" r="5" fill="#374151" stroke="#16a34a" strokeWidth="1" />
      <circle cx="300" cy="108" r="5" fill="#374151" stroke="#16a34a" strokeWidth="1" />
      <circle cx="300" cy="170" r="5" fill="#374151" stroke="#16a34a" strokeWidth="1" />

      {/* Signal waves */}
      <circle cx="200" cy="90" r="12" fill="none" stroke="#16a34a" strokeWidth="1" opacity="0.4" />
      <circle cx="200" cy="90" r="22" fill="none" stroke="#16a34a" strokeWidth="1" opacity="0.25" />
      <circle cx="200" cy="90" r="32" fill="none" stroke="#16a34a" strokeWidth="1" opacity="0.1" />
      <circle cx="200" cy="90" r="4" fill="#16a34a" />

      {/* Ground field */}
      <rect x="40" y="220" width="320" height="55" rx="8" fill="#14532d" opacity="0.4" />
      <rect x="40" y="220" width="320" height="55" rx="8" fill="none" stroke="#16a34a" strokeWidth="0.5" opacity="0.3" />

      {/* Field rows */}
      {[0,1,2,3,4,5,6].map((i) => (
        <line key={i} x1={60 + i*42} y1="220" x2={60 + i*42} y2="275" stroke="#16a34a" strokeWidth="0.5" opacity="0.3" />
      ))}
      {[0,1,2].map((i) => (
        <line key={i} x1="40" y1={232 + i*14} x2="360" y2={232 + i*14} stroke="#16a34a" strokeWidth="0.5" opacity="0.3" />
      ))}

      {/* Scan beam */}
      <polygon points="188,173 212,173 240,240 160,240" fill="#16a34a" opacity="0.08" />
      <line x1="200" y1="173" x2="200" y2="240" stroke="#16a34a" strokeWidth="0.8" opacity="0.3" strokeDasharray="4,3" />

      {/* Scan target */}
      <rect x="178" y="228" width="44" height="24" rx="4" fill="none" stroke="#4ade80" strokeWidth="1.2" opacity="0.7" />
      <line x1="178" y1="234" x2="190" y2="234" stroke="#4ade80" strokeWidth="1" opacity="0.7" />
      <line x1="178" y1="240" x2="190" y2="240" stroke="#4ade80" strokeWidth="1" opacity="0.7" />
      <line x1="178" y1="246" x2="190" y2="246" stroke="#4ade80" strokeWidth="1" opacity="0.7" />
    </svg>
  </div>
)

// ── Floating Stats Card ─────────────────────────────────────────
const FloatingCard = ({ icon: Icon, title, value, color, delay }) => (
  <div
    className="bg-dark-100/90 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-xl"
    style={{ animation: `float 3s ease-in-out ${delay}s infinite alternate` }}
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={18} className="text-white" />
    </div>
    <div>
      <p className="text-white font-bold text-lg leading-none">{value}</p>
      <p className="text-gray-400 text-xs mt-0.5">{title}</p>
    </div>
  </div>
)

// ── Survey Report Card ──────────────────────────────────────────
const SurveyCard = () => (
  <div className="bg-dark-100/80 backdrop-blur-sm border border-white/10 rounded-2xl p-5 shadow-2xl w-72">
    <div className="flex items-center justify-between mb-4">
      <span className="text-white font-semibold text-sm">Latest Survey Report</span>
      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">Completed</span>
    </div>
    <div className="bg-dark-200 rounded-xl overflow-hidden mb-4 h-32 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 to-dark-300" />
      <svg viewBox="0 0 288 128" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="288" height="128" fill="#0f2d1a" />
        {[0,1,2,3,4,5,6,7].map(i => (
          <rect key={i} x={i*36} y="0" width="34" height="128" fill={i%2===0 ? '#0d2617' : '#112e1c'} />
        ))}
        {[0,1,2,3].map(i => (
          <rect key={i} x="0" y={i*32} width="288" height="2" fill="#16a34a" opacity="0.15" />
        ))}
        <rect x="80" y="30" width="60" height="50" rx="4" fill="#dc2626" opacity="0.5" />
        <rect x="82" y="32" width="56" height="46" rx="3" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,2" />
        <text x="110" y="60" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="500">Affected</text>
        <text x="110" y="71" textAnchor="middle" fill="#fca5a5" fontSize="8">Zone</text>
        <circle cx="200" cy="70" r="3" fill="#4ade80" />
        <circle cx="220" cy="50" r="2" fill="#4ade80" opacity="0.6" />
        <circle cx="240" cy="80" r="2.5" fill="#4ade80" opacity="0.8" />
        <text x="144" y="118" textAnchor="middle" fill="#16a34a" fontSize="8" opacity="0.8">Aerial View — Field B4</text>
      </svg>
    </div>
    <div className="grid grid-cols-3 gap-2">
      {[
        { label: 'Crop', value: 'Wheat' },
        { label: 'Damage', value: '23%' },
        { label: 'Status', value: 'Review' },
      ].map(({ label, value }) => (
        <div key={label} className="bg-dark-200 rounded-lg p-2 text-center">
          <p className="text-gray-500 text-xs">{label}</p>
          <p className="text-white text-xs font-semibold mt-0.5">{value}</p>
        </div>
      ))}
    </div>
  </div>
)

// ── Hero Section ────────────────────────────────────────────────
const Hero = () => (
  <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-16">
    <style>{`
      @keyframes float {
        from { transform: translateY(0px); }
        to { transform: translateY(-10px); }
      }
      @keyframes pulse-glow {
        0%, 100% { opacity: 0.15; transform: scale(1); }
        50% { opacity: 0.25; transform: scale(1.05); }
      }
    `}</style>

    {/* Background elements */}
    <div className="absolute top-20 right-0 w-[700px] h-[700px] bg-primary/8 rounded-full blur-3xl pointer-events-none" style={{animation: 'pulse-glow 4s ease-in-out infinite'}} />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzE2YTM0YSIgc3Ryb2tlLXdpZHRoPSIwLjIiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20 pointer-events-none" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* Left content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-primary text-sm font-medium">Smart Agriculture Technology</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Monitor Your
            <br />
            Crops
            <span className="text-primary"> From</span>
            <br />
            <span className="text-primary">The Sky</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-lg mb-10 leading-relaxed">
            Book professional drone crop inspection services. Get detailed aerial field images,
            crop condition reports, and disease area analysis delivered to your dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
            <Link
              to="/signup"
              className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
            >
              Book a Drone Survey
              <ArrowRight size={18} />
            </Link>
            <button className="flex items-center gap-3 text-white font-medium px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Play size={14} className="text-primary ml-0.5" />
              </div>
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8">
            {[
              { value: '500+', label: 'Farmers Served' },
              { value: '2000+', label: 'Surveys Done' },
              { value: '98%', label: 'Satisfaction' },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-3">
                {i > 0 && <div className="w-px h-8 bg-white/10" />}
                <div>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-gray-500 text-xs">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right visual */}
        <div className="relative hidden lg:flex flex-col items-center justify-center h-[580px]">
          {/* Drone illustration */}
          <div className="w-full h-72" style={{animation: 'float 4s ease-in-out infinite alternate'}}>
            <DroneIllustration />
          </div>

          {/* Floating cards */}
          <div className="absolute top-8 left-0">
            <FloatingCard icon={TrendingUp} title="Crop Health" value="92%" color="bg-green-600" delay={0} />
          </div>
          <div className="absolute top-24 right-0">
            <FloatingCard icon={Camera} title="Images Taken" value="1,284" color="bg-blue-600" delay={0.5} />
          </div>
          <div className="absolute bottom-16 left-4">
            <FloatingCard icon={FileText} title="Reports Ready" value="38" color="bg-purple-600" delay={1} />
          </div>

          {/* Survey card */}
          <div className="absolute bottom-0 right-0" style={{animation: 'float 3.5s ease-in-out 0.8s infinite alternate'}}>
            <SurveyCard />
          </div>
        </div>
      </div>
    </div>
  </section>
)

// ── Marquee / Trusted By ────────────────────────────────────────
const TrustedBy = () => {
  const items = ['Rice Farmers', 'Wheat Growers', 'Cotton Fields', 'Sugarcane Farms', 'Vegetable Plots', 'Organic Farms', 'Tea Gardens', 'Spice Farms']
  return (
    <div className="py-10 bg-dark-200 border-y border-white/5 overflow-hidden">
      <p className="text-center text-gray-600 text-xs uppercase tracking-widest mb-6">Trusted by farmers growing</p>
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-gray-400 font-medium flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  )
}

// ── About Section ───────────────────────────────────────────────
const About = () => (
  <section id="about" className="py-24 bg-dark-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">About Us</span>
          <h2 className="text-4xl font-bold text-white mt-3 mb-6 leading-tight">
            Revolutionizing Agriculture
            <br />
            <span className="text-primary">With Drone Technology</span>
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            AgriDrone is a professional drone crop monitoring service that helps farmers
            get accurate aerial insights about their fields. Our expert drone operators
            fly over your farmland, capture high-resolution images, and upload detailed
            crop condition reports directly to your personal dashboard.
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            From disease detection to field mapping, we give farmers the data they need
            to make smarter decisions and maximize crop yields.
          </p>
          <div className="flex flex-col gap-3 mb-8">
            {[
              'Professional certified drone operators',
              'High resolution aerial imagery',
              'Detailed crop condition reports',
              'Fast 48-hour turnaround time',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-primary/15 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={14} className="text-primary" />
                </div>
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-primary/20"
          >
            Start Free Today
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* Right side visual grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Big card */}
          <div className="col-span-2 bg-dark-100 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-400 text-sm">Active Surveys This Month</p>
                <p className="text-4xl font-bold text-white mt-1">247</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-1.5 flex items-center gap-1">
                <TrendingUp size={14} className="text-green-400" />
                <span className="text-green-400 text-sm font-medium">+18%</span>
              </div>
            </div>
            <div className="flex gap-1 items-end h-16">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary/30 rounded-sm hover:bg-primary/60 transition-colors"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Small cards */}
          {[
            { icon: Scan, label: 'Crop Scanning', desc: 'Full aerial coverage', color: 'bg-primary/10', iconColor: 'text-primary' },
            { icon: BarChart3, label: 'Health Reports', desc: 'Expert analysis', color: 'bg-blue-500/10', iconColor: 'text-blue-400' },
            { icon: MapPin, label: 'Area Mapping', desc: 'Disease zones', color: 'bg-orange-500/10', iconColor: 'text-orange-400' },
            { icon: Shield, label: 'Data Security', desc: 'Fully encrypted', color: 'bg-purple-500/10', iconColor: 'text-purple-400' },
          ].map(({ icon: Icon, label, desc, color, iconColor }) => (
            <div key={label} className="bg-dark-100 border border-white/5 rounded-2xl p-5 hover:border-primary/30 transition-all hover:-translate-y-0.5">
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3`}>
                <Icon size={20} className={iconColor} />
              </div>
              <p className="text-white text-sm font-medium">{label}</p>
              <p className="text-gray-500 text-xs mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

// ── Services Section ────────────────────────────────────────────
const Services = () => {
  const services = [
    {
      icon: Scan,
      title: 'Aerial Field Survey',
      desc: 'Complete aerial coverage of your farmland with high-resolution drone photography capturing every inch of your fields.',
      features: ['Full field coverage', 'HD aerial photos', 'Multiple passes'],
      color: 'from-green-500/10 to-transparent',
      iconBg: 'bg-green-500/10',
      iconColor: 'text-green-400',
    },
    {
      icon: BarChart3,
      title: 'Crop Health Analysis',
      desc: 'Detailed manual inspection reports on crop conditions, growth stages, and overall field health by our expert team.',
      features: ['Condition grading', 'Growth tracking', 'Expert analysis'],
      color: 'from-blue-500/10 to-transparent',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      featured: true,
    },
    {
      icon: MapPin,
      title: 'Disease Area Mapping',
      desc: 'Identify and map disease-affected zones in your fields with precision aerial photography and annotated reports.',
      features: ['Zone identification', 'Area percentage', 'Spread tracking'],
      color: 'from-orange-500/10 to-transparent',
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-400',
    },
  ]

  return (
    <section id="services" className="py-24 bg-dark-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Services</span>
          <h2 className="text-4xl font-bold text-white mt-3">Everything Your Farm Needs</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Professional drone services designed specifically for modern farmers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, title, desc, features, color, iconBg, iconColor, featured }) => (
            <div
              key={title}
              className={`relative bg-dark-100 border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 group overflow-hidden
                ${featured ? 'border-primary/40 shadow-lg shadow-primary/10' : 'border-white/5 hover:border-white/15'}`}
            >
              {featured && (
                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className={`absolute inset-0 bg-gradient-to-b ${color} opacity-50`} />
              <div className="relative z-10">
                <div className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon size={26} className={iconColor} />
                </div>
                <h3 className="text-white font-semibold text-xl mb-3">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{desc}</p>
                <ul className="flex flex-col gap-2.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                      <CheckCircle size={14} className="text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── How It Works ────────────────────────────────────────────────
const HowItWorks = () => {
  const steps = [
    { step: '01', title: 'Book Online', desc: 'Fill in your farm details and select a convenient date for drone survey.' },
    { step: '02', title: 'Drone Survey', desc: 'Our certified operators fly drones over your field capturing HD aerial images.' },
    { step: '03', title: 'Report Upload', desc: 'Admin reviews images and uploads detailed crop condition reports to your dashboard.' },
    { step: '04', title: 'Take Action', desc: 'Review your personalized report and take data-driven decisions for better yield.' },
  ]

  return (
    <section className="py-24 bg-dark-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Process</span>
          <h2 className="text-4xl font-bold text-white mt-3">How It Works</h2>
          <p className="text-gray-400 mt-4">Simple 4-step process to get your crop insights</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ step, title, desc }, i) => (
            <div key={step} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-primary/40 to-transparent z-10" />
              )}
              <div className="bg-dark-100 border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-lg">{step}</span>
                </div>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Features Section ────────────────────────────────────────────
const Features = () => {
  const features = [
    { icon: Zap, title: 'Fast Booking', desc: 'Book a drone survey in under 2 minutes from your dashboard.', color: 'bg-yellow-500/10', iconColor: 'text-yellow-400' },
    { icon: BarChart3, title: 'Live Dashboard', desc: 'Track bookings, reports and field images all in one place.', color: 'bg-blue-500/10', iconColor: 'text-blue-400' },
    { icon: MapPinned, title: 'Field Mapping', desc: 'View disease-affected area maps uploaded by our expert team.', color: 'bg-red-500/10', iconColor: 'text-red-400' },
    { icon: Shield, title: 'Secure Data', desc: 'All your farm data is encrypted and stored securely.', color: 'bg-purple-500/10', iconColor: 'text-purple-400' },
    { icon: Users, title: 'Expert Team', desc: 'Certified drone operators with deep agriculture expertise.', color: 'bg-green-500/10', iconColor: 'text-green-400' },
    { icon: Bell, title: 'Notifications', desc: 'Get instant alerts when your crop report is ready to view.', color: 'bg-orange-500/10', iconColor: 'text-orange-400' },
  ]

  return (
    <section id="features" className="py-24 bg-dark-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Why AgriDrone</span>
          <h2 className="text-4xl font-bold text-white mt-3">Built For Modern Farmers</h2>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto">Everything you need to monitor, manage, and improve your crop health</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc, color, iconColor }) => (
            <div
              key={title}
              className="flex gap-4 bg-dark-100 border border-white/5 rounded-2xl p-6 hover:border-primary/20 transition-all hover:-translate-y-0.5 group"
            >
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon size={22} className={iconColor} />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1.5">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Testimonials ────────────────────────────────────────────────
const Testimonials = () => {
  const reviews = [
    { name: 'Ravi Kumar', role: 'Rice Farmer, Andhra Pradesh', text: 'AgriDrone helped me detect a fungal infection early. Saved nearly 40% of my crop this season. The report was very clear.', rating: 5 },
    { name: 'Suresh Patil', role: 'Wheat Grower, Maharashtra', text: 'Booking was so easy and the drone team was professional. Got my full field report within 2 days. Highly recommended.', rating: 5 },
    { name: 'Lakshmi Devi', role: 'Cotton Farmer, Telangana', text: 'The aerial images showed exactly which areas needed more water. My yield improved by 25% this year. Amazing service.', rating: 5 },
  ]

  return (
    <section className="py-24 bg-dark-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Testimonials</span>
          <h2 className="text-4xl font-bold text-white mt-3">Farmers Love AgriDrone</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map(({ name, role, text, rating }) => (
            <div key={name} className="bg-dark-100 border border-white/5 rounded-2xl p-6 hover:border-primary/20 transition-all">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-5">{text}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">{name[0]}</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{name}</p>
                  <p className="text-gray-500 text-xs">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA Banner ──────────────────────────────────────────────────
const CTABanner = () => (
  <section className="py-20 bg-dark-200">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="bg-gradient-to-br from-primary/20 via-dark-100 to-primary/5 border border-primary/20 rounded-3xl p-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Monitor Your Farm?</h2>
          <p className="text-gray-400 mb-8 text-lg">Join 500+ farmers already using AgriDrone for smarter crop management.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
            >
              Get Started Free
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-medium px-8 py-4 rounded-xl transition-all"
            >
              Login to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
)

// ── Contact Section ─────────────────────────────────────────────
const Contact = () => (
  <section id="contact" className="py-24 bg-dark-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">Contact Us</span>
        <h2 className="text-4xl font-bold text-white mt-3">Get In Touch</h2>
        <p className="text-gray-400 mt-4">Have questions? We are here to help you.</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div className="flex flex-col gap-6">
          <p className="text-gray-400 leading-relaxed">
            Whether you are a first-time farmer or managing large agricultural land, our team is ready to help you get started with drone crop monitoring.
          </p>
          {[
            { icon: Mail, label: 'Email', value: 'support@agridrone.com' },
            { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
            { icon: MapPinned, label: 'Location', value: 'Hyderabad, Telangana, India' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">{label}</p>
                <p className="text-white font-medium mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Your name" className="bg-dark-100 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-primary/50 transition-colors" />
            <input type="tel" placeholder="Phone number" className="bg-dark-100 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-primary/50 transition-colors" />
          </div>
          <input type="email" placeholder="Your email address" className="bg-dark-100 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-primary/50 transition-colors" />
          <textarea rows={4} placeholder="Tell us about your farm and what you need..." className="bg-dark-100 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none" />
          <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2">
            Send Message
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  </section>
)

// ── Footer ──────────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-dark-100 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-4 gap-8 mb-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
            <span className="text-white font-bold text-lg">Agri<span className="text-primary">Drone</span></span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Professional drone crop monitoring services helping Indian farmers grow smarter and yield better.
          </p>
        </div>
        <div>
          <p className="text-white font-medium mb-4">Quick Links</p>
          <div className="flex flex-col gap-2">
            {['About', 'Services', 'Features', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-primary text-sm transition-colors">{item}</a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-white font-medium mb-4">Services</p>
          <div className="flex flex-col gap-2">
            {['Aerial Survey', 'Crop Health', 'Disease Mapping', 'Field Reports'].map((item) => (
              <span key={item} className="text-gray-400 text-sm">{item}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">2025 AgriDrone. All rights reserved.</p>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Service', 'Support'].map((item) => (
            <a key={item} href="#" className="text-gray-500 hover:text-white text-sm transition-colors">{item}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
)

// ── Main Export ─────────────────────────────────────────────────
const Landing = () => (
  <>
    <Navbar />
    <Hero />
    <TrustedBy />
    <About />
    <Services />
    <HowItWorks />
    <Features />
    <Testimonials />
    <CTABanner />
    <Contact />
    <Footer />
  </>
)

export default Landing
