import { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import {
  Scan, BarChart3, MapPin, Shield, Zap,
  Users, CheckCircle, ArrowRight, Mail,
  Phone, MapPinned, Star, ChevronRight, Droplets
} from 'lucide-react'
// ─── Hero Section ───────────────────────────────────────────
const Hero = () => (
  <section
    id="home"
    className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
  >
    {/* Background image */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&auto=format&fit=crop&q=80')",
      }}
    />
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-dark-300/75 via-dark-300/55 to-dark-300/90" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8">
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <span className="text-primary text-sm font-medium">Smart Agriculture Technology</span>
      </div>

      {/* Heading */}
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
        Monitor Your Crops
        <br />
        <span className="text-primary">From The Sky</span>
      </h1>

      <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
        Book professional drone crop inspection services. Get detailed aerial field images,
        crop condition reports, and disease area analysis delivered to your dashboard.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <Link
          to="/signup"
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:scale-105"
        >
          Book a Drone Survey
          <ArrowRight size={18} />
        </Link>
        <a
          href="#services"
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium px-8 py-3.5 rounded-xl transition-all duration-200"
        >
          Explore Services
          <ChevronRight size={16} />
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
        {[
          { value: '500+', label: 'Farmers Served' },
          { value: '2000+', label: 'Surveys Done' },
          { value: '98%', label: 'Satisfaction' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

// ─── About Section ───────────────────────────────────────────
const About = () => (
  <section id="about" className="py-24 bg-dark-200">
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
            get accurate, real-time aerial insights about their fields. Our expert drone
            operators fly over your farmland, capture high-resolution images, and upload
            detailed crop condition reports directly to your personal dashboard.
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            From disease detection to field mapping, we give farmers the data they need
            to make smarter decisions and maximize crop yields.
          </p>
          <div className="flex flex-col gap-3">
            {[
              'Professional drone operators',
              'High resolution aerial imagery',
              'Detailed crop condition reports',
              'Fast 48-hour turnaround',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle size={18} className="text-primary flex-shrink-0" />
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Drone image with overlay badge */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80"
            alt="Drone flying over crop field"
            className="w-full h-80 object-cover"
          />
          {/* Floating badge */}
          <div className="absolute bottom-4 left-4 right-4 bg-dark-300/85 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-center gap-3">
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

// ─── Services Section ─────────────────────────────────────────
const Services = () => {
  const services = [
    {
      icon: Scan,
      title: 'Aerial Field Survey',
      desc: 'Complete aerial coverage of your farmland with high-resolution drone photography capturing every inch of your fields.',
      features: ['Full field coverage', 'HD aerial photos', 'Multiple passes'],
      image:
        'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&auto=format&fit=crop&q=80',
      alt: 'Drone flying over farmland',
    },
    {
      icon: Droplets,
      title: 'Drone Spraying',
      desc: 'Precision pesticide and fertilizer spraying using GPS-guided drones. Cover large fields evenly in less time with minimal chemical wastage.',
      features: ['Pesticide spraying', 'Fertilizer spraying', 'GPS precision'],
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=80',
      alt: 'Drone spraying crops',
},
    {
      icon: BarChart3,
      title: 'Crop Health Analysis',
      desc: 'Detailed manual inspection reports on crop conditions, growth stages, and overall field health by our expert team.',
      features: ['Condition grading', 'Growth tracking', 'Expert analysis'],
      image:
        'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&auto=format&fit=crop&q=80',
      alt: 'Close up healthy green crop rows',
    },
    {
      icon: MapPin,
      title: 'Disease Area Mapping',
      desc: 'Identify and map disease-affected zones in your fields with precision aerial photography and annotated reports.',
      features: ['Zone identification', 'Area percentage', 'Spread tracking'],
      image:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80',
      alt: 'Aerial view of crop fields',
    },
  ]

  return (
    <section id="services" className="py-24 bg-dark-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Services</span>
          <h2 className="text-4xl font-bold text-white mt-3">Everything Your Farm Needs</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Professional drone services designed specifically for modern farmers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(({ icon: Icon, title, desc, features, image, alt }) => (
            <div
              key={title}
              className="bg-dark-200 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Image */}
              <div className="h-44 overflow-hidden">
                <img
                  src={image}
                  alt={alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {/* Body */}
              <div className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="text-white font-semibold text-xl mb-3">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{desc}</p>
                <ul className="flex flex-col gap-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-gray-400 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
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

// ─── Photo Gallery Strip ──────────────────────────────────────
const GalleryStrip = () => (
  <div className="grid grid-cols-3 gap-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    {[
      {
        src: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=900&auto=format&fit=crop&q=80',
        alt: 'Aerial green paddy fields',
        className: 'col-span-2',
      },
      {
        src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&auto=format&fit=crop&q=80',
        alt: 'Farmer walking in field',
        className: '',
      },
    ].map(({ src, alt, className }) => (
      <div key={alt} className={`${className} rounded-2xl overflow-hidden h-48`}>
        <img src={src} alt={alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
      </div>
    ))}
  </div>
)

// ─── Features Section ─────────────────────────────────────────
const Features = () => {
  const features = [
    { icon: Zap, title: 'Fast Booking', desc: 'Book a drone survey in under 2 minutes from your dashboard.' },
    { icon: BarChart3, title: 'Live Dashboard', desc: 'Track bookings, reports and images all in one place.' },
    { icon: MapPinned, title: 'Field Mapping', desc: 'View disease-affected area maps uploaded by our team.' },
    { icon: Shield, title: 'Secure Data', desc: 'All your farm data is encrypted and stored securely.' },
    { icon: Users, title: 'Expert Team', desc: 'Certified drone operators with agriculture expertise.' },
    { icon: Star, title: 'Detailed Reports', desc: 'Get professional crop condition reports after every survey.' },
  ]

  return (
    <section id="features" className="py-24 bg-dark-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Why AgriDrone</span>
          <h2 className="text-4xl font-bold text-white mt-3">Built For Modern Farmers</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex gap-4 bg-dark-100 border border-white/5 rounded-xl p-6 hover:border-primary/20 transition-colors"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact Section ──────────────────────────────────────────
const Contact = () => (
  <section id="contact" className="py-24 bg-dark-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">Contact Us</span>
        <h2 className="text-4xl font-bold text-white mt-3">Get In Touch</h2>
        <p className="text-gray-400 mt-4">Have questions? We're here to help.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {/* Contact info */}
        <div className="flex flex-col gap-6">
          {[
            { icon: Mail, label: 'Email', value: 'support@agridrone.com' },
            { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
            { icon: MapPinned, label: 'Location', value: 'Hyderabad, Telangana, India' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon size={22} className="text-primary" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">{label}</p>
                <p className="text-white font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Your name"
            className="bg-dark-200 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary/50 transition-colors"
          />
          <input
            type="email"
            placeholder="Your email"
            className="bg-dark-200 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary/50 transition-colors"
          />
          <textarea
            rows={4}
            placeholder="Your message"
            className="bg-dark-200 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-xl transition-colors duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </section>
)

// ─── Footer ───────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-dark-200 border-t border-white/5 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xs">AD</span>
        </div>
        <span className="text-white font-bold">
          Agri<span className="text-primary">Drone</span>
        </span>
      </div>
      <p className="text-gray-500 text-sm">© 2025 AgriDrone. All rights reserved.</p>
      <div className="flex gap-6">
        {['Privacy', 'Terms', 'Support'].map((item) => (
          <a key={item} href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
            {item}
          </a>
        ))}
      </div>
    </div>
  </footer>
)

// ─── Main Landing Page ────────────────────────────────────────
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
