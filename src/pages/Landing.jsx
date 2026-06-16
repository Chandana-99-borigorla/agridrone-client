import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import {
  Scan, BarChart3, MapPin, Shield, Zap,
  Users, CheckCircle, ArrowRight, Mail,
  Phone, MapPinned, Star, ChevronRight, Droplets, X
} from 'lucide-react'

// ─── Hero ─────────────────────────────────────────────────────
const Hero = () => (
  <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    style={{ background: 'linear-gradient(135deg, rgb(17, 17, 22) 0%, #3c413c 50%, #2f2f31 100%)' }}>

    {/* Ken Burns background — clear, barely dimmed */}
    <motion.div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://i.pinimg.com/1200x/80/cc/a8/80cca8cd4cdf8af315118c20eb7240f7.jpg')", opacity: 0.55 }}
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}
    />

    {/* Thin vignette only at bottom so text stays readable */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-8">
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <span className="text-primary text-sm font-medium">Smart Agriculture Technology</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
        className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
        Monitor Your Crops
        <br />
        <span className="text-primary">From The Sky</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
        className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
        Book professional drone crop inspection services. Get detailed aerial field images,
        crop condition reports, and disease area analysis delivered to your dashboard.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.28 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <Link to="/signup"
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 w-full sm:w-auto justify-center">
          Book a Drone Survey <ArrowRight size={18} />
        </Link>
        <a href="#services"
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium px-8 py-3.5 rounded-xl transition-all duration-200 w-full sm:w-auto justify-center">
          Explore Services <ChevronRight size={16} />
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.36 }}
        className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
        {[
          { value: '500+', label: 'Farmers Served' },
          { value: '2000+', label: 'Surveys Done' },
          { value: '98%', label: 'Satisfaction' },
        ].map((stat) => (
          <div key={stat.label} className="text-center bg-white/5 border border-white/10 rounded-2xl py-4 px-2">
            <p className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</p>
            <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
)

// ─── About ────────────────────────────────────────────────────
const About = () => (
  <section id="about" className="py-24" style={{ background: '#0f1f0f' }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">About Us</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-6 leading-tight">
            Revolutionizing Agriculture
            <br /><span className="text-primary">With Drone Technology</span>
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            AgriDrone is a professional drone crop monitoring service that helps farmers
            get accurate, real-time aerial insights about their fields. Our expert drone
            operators fly over your farmland, capture high-resolution images, and upload
            detailed crop condition reports directly to your personal dashboard.
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            From disease detection to field mapping, we give farmers the data they need
            to make smarter decisions and maximize crop yields.
          </p>
          <div className="flex flex-col gap-3">
            {['Professional drone operators', 'High resolution aerial imagery',
              'Detailed crop condition reports', 'Fast 48-hour turnaround'].map((item) => (
              <div key={item}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:border-primary/30 hover:bg-white/8 transition-all duration-200">
                <CheckCircle size={18} className="text-primary flex-shrink-0" />
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <img
            src="https://i.pinimg.com/736x/d6/ed/4d/d6ed4d80b0ea2c7ab9c7ba78d7b7b818.jpg"
            alt="Drone technology" className="w-full h-96 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-300/70 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 bg-dark-300/90 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Scan size={18} className="text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Live Field Monitoring</p>
              <p className="text-gray-400 text-xs">Real-time aerial coverage active</p>
            </div>
            <span className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  </section>
)

// ─── Services ─────────────────────────────────────────────────
const Services = () => {
  const services = [
    {
      icon: Scan, title: 'Aerial Field Survey',
      desc: 'Complete aerial coverage of your farmland with high-resolution drone photography.',
      features: ['Full field coverage', 'HD aerial photos', 'Multiple passes'],
      image: 'https://i.pinimg.com/736x/7c/de/1a/7cde1af6397077cff463a06a99b54197.jpg',
    },
    {
      icon: Droplets, title: 'Drone Spraying',
      desc: 'Precision pesticide and fertilizer spraying using GPS-guided drones.',
      features: ['Pesticide spraying', 'Fertilizer spraying', 'GPS precision'],
      image: 'https://i.pinimg.com/1200x/64/03/84/640384cc2d741cbd975977862d5ae640.jpg',
    },
    {
      icon: BarChart3, title: 'Crop Health Analysis',
      desc: 'Detailed inspection reports on crop conditions and growth stages.',
      features: ['Condition grading', 'Growth tracking', 'Expert analysis'],
      image: 'https://i.pinimg.com/1200x/c0/2e/b1/c02eb1fb25bc88f2bcf65d911ae3575b.jpg',
    },
    {
      icon: MapPin, title: 'Disease Area Mapping',
      desc: 'Identify and map disease-affected zones with precision aerial photography.',
      features: ['Zone identification', 'Area percentage', 'Spread tracking'],
      image: 'https://i.pinimg.com/1200x/b8/49/a2/b849a2c61599df734a43c366b9e71350.jpg',
    },
  ]

  return (
    <section id="services" className="py-24" style={{ background: '#080808' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Services</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">Everything Your Farm Needs</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Professional drone services designed specifically for modern farmers
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ icon: Icon, title, desc, features, image }) => (
            <div key={title}
              className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-primary/40 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
              <div className="h-44 overflow-hidden relative">
                <img src={image} alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="p-5">
                <div className="w-11 h-11 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{desc}</p>
                <ul className="flex flex-col gap-1.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-gray-600 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
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

// ─── Gallery (Auto Scroll + Click Lightbox) ───────────────────
const GalleryStrip = () => {
  const [selected, setSelected] = useState(null)

  const images = [
    { src: 'https://i.pinimg.com/1200x/50/7b/c2/507bc22e5ee4d415b0561cce8f521352.jpg', alt: 'Aerial paddy fields' },
    { src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&auto=format&fit=crop&q=80', alt: 'Farmer in field' },
    { src: 'https://i.pinimg.com/1200x/55/53/e7/5553e76d12ab416b2a7a501d2b906d69.jpg', alt: 'Crop rows' },
    { src: 'https://i.pinimg.com/736x/12/4d/f4/124df47d0cae7cc5a04c3a265ad0f5b6.jpg', alt: 'Farm aerial view' },
    { src: 'https://i.pinimg.com/1200x/67/39/18/6739180698b78019b9e96148e47f2ba2.jpg', alt: 'Crop field close up' },
    { src: 'https://i.pinimg.com/1200x/34/03/96/34039649ae02dfe00c7890f2e68f8dd0.jpg', alt: 'Golden field' },
  ]

  const all = [...images, ...images]

  return (
    <>
      <div className="py-12 overflow-hidden" style={{ background: '#0f1f0f' }}>
        <div className="text-center mb-8">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Work</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">Fields We've Surveyed</h2>
        </div>

        <div className="relative">
          <motion.div
            className="flex gap-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
            style={{ width: 'max-content' }}
          >
            {all.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelected(images[i % images.length])}
                className="w-72 h-48 flex-shrink-0 rounded-2xl overflow-hidden border-2 border-white/10
                  hover:border-primary/50 transition-all duration-200
                  hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20
                  cursor-zoom-in active:scale-95"
                style={{ userSelect: 'none' }}
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selected.src} alt={selected.alt} className="w-full h-full object-contain max-h-[85vh]" />
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
            >
              <X size={18} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-6 py-4">
              <p className="text-white font-medium text-sm">{selected.alt}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

// ─── Features ─────────────────────────────────────────────────
const Features = () => {
  const features = [
    { icon: Zap,        title: 'Fast Booking',     desc: 'Book a drone survey in under 2 minutes from your dashboard.' },
    { icon: BarChart3,  title: 'Live Dashboard',   desc: 'Track bookings, reports and images all in one place.' },
    { icon: MapPinned,  title: 'Field Mapping',    desc: 'View disease-affected area maps uploaded by our team.' },
    { icon: Shield,     title: 'Secure Data',      desc: 'All your farm data is encrypted and stored securely.' },
    { icon: Users,      title: 'Expert Team',      desc: 'Certified drone operators with agriculture expertise.' },
    { icon: Star,       title: 'Detailed Reports', desc: 'Get professional crop condition reports after every survey.' },
  ]

  return (
    <section id="features" className="py-24" style={{ background: '#080808' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Why AgriDrone</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">Built For Modern Farmers</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Everything you need to monitor and grow your crops smarter
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title}
              className="bg-white border-2 border-gray-100 hover:border-primary/40 rounded-2xl p-6 shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all duration-200 hover:-translate-y-1 group cursor-pointer">
              <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon size={22} className="text-primary" />
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────
const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    }, 1000)
  }

  return (
    <section id="contact" className="py-24" style={{ background: '#0f1f0f' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Contact Us</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">Get In Touch</h2>
          <p className="text-gray-400 mt-4">Have questions? We're here to help.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="flex flex-col gap-5">
            {[
              { icon: Mail,      label: 'Email',    value: 'support@agridrone.com' },
              { icon: Phone,     label: 'Phone',    value: '+91 98765 43210' },
              { icon: MapPinned, label: 'Location', value: 'Bhimavaram, Andhra Pradesh, India' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label}
                className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-primary/30 transition-all duration-200">
                <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-primary" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">{label}</p>
                  <p className="text-white font-medium">{value}</p>
                </div>
              </div>
            ))}
            <div className="rounded-2xl overflow-hidden border-2 border-white/10 h-48 mt-2">
              <img src="https://i.pinimg.com/1200x/48/53/d6/4853d681d95823f40dee8ff967c54b90.jpg"
                alt="Location" className="w-full h-full object-cover" />
            </div>
          </div>

          <form onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-semibold text-lg mb-2">Send us a message</h3>

            <input type="text" name="name" value={form.name} onChange={handleChange}
              placeholder="Your name" required
              className="bg-dark-200 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary/50 transition-colors" />

            <input type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="Your email" required
              className="bg-dark-200 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary/50 transition-colors" />

            <textarea rows={4} name="message" value={form.message} onChange={handleChange}
              placeholder="Your message" required
              className="bg-dark-200 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none" />

            {status === 'success' && (
              <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3">
                <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
                <p className="text-green-400 text-sm font-medium">Message sent! We'll get back to you soon.</p>
              </div>
            )}

            <button type="submit" disabled={status === 'loading' || status === 'success'}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
              {status === 'loading' ? 'Sending...' : status === 'success' ? '✅ Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
// ─── Footer ───────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ background: '#080808' }} className="border-t border-white/5 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xs">AD</span>
        </div>
        <span className="text-white font-bold">Agri<span className="text-primary">Drone</span></span>
      </div>
      <p className="text-gray-500 text-sm">© 2025 AgriDrone. All rights reserved.</p>
      <div className="flex gap-6">
        {['Privacy', 'Terms', 'Support'].map((item) => (
          <a key={item} href="#"
            className="text-gray-500 hover:text-white text-sm transition-colors">{item}</a>
        ))}
      </div>
    </div>
  </footer>
)

// ─── Main ─────────────────────────────────────────────────────
const Landing = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <Services />
    <GalleryStrip />
    <Features />
    <Contact />
    <Footer />
  </>
)

export default Landing
