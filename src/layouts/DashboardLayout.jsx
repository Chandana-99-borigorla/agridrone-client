// src/layouts/DashboardLayout.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LogOut, Menu, Bell, User
} from 'lucide-react'
import { getCurrentUser, logoutUser } from '../services/authService'

// ─── Notification Bell ────────────────────────────────────────
const NotificationBell = () => {
  const [open, setOpen] = useState(false)
  const notifications = [
    { id: 1, title: 'Booking Confirmed', desc: 'Your survey for East Block has been confirmed.', time: '2h ago', read: false },
    { id: 2, title: 'Report Ready',      desc: 'Crop report for North Field is now available.',  time: '1d ago', read: false },
    { id: 3, title: 'Survey Completed',  desc: 'West Farm drone survey completed successfully.', time: '3d ago', read: true },
  ]
  const unread = notifications.filter(n => !n.read).length

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative text-gray-400 hover:text-white transition-colors"
      >
        <Bell size={20} />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white text-[9px] font-bold">{unread}</span>
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 w-80 bg-dark-200 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <h4 className="text-white font-semibold text-sm">Notifications</h4>
              <span className="text-primary text-xs cursor-pointer hover:text-green-400">Mark all read</span>
            </div>
            <div className="flex flex-col max-h-72 overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id}
                  className={`flex gap-3 px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${!n.read ? 'bg-primary/5' : ''}`}>
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.read ? 'bg-primary' : 'bg-gray-600'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-semibold">{n.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{n.desc}</p>
                    <p className="text-gray-600 text-xs mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 text-center">
              <span className="text-primary text-xs cursor-pointer hover:text-green-400">View all notifications</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ─── Dashboard Layout ─────────────────────────────────────────
const DashboardLayout = ({ activeTab, setActiveTab, children, navItems }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const user = getCurrentUser()

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-white/5">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">AD</span>
        </div>
        <span className="text-white font-bold text-lg">
          Agri<span className="text-primary">Drone</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => { setActiveTab(id); setSidebarOpen(false) }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full text-left transition-all duration-200
              ${activeTab === id
                ? 'bg-primary text-white shadow-md shadow-primary/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      {/* User + Profile + Logout */}
      <div className="px-3 pb-6 border-t border-white/5 pt-4 flex flex-col gap-1">
        {/* User card */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-dark-100 mb-1">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-primary text-xs font-bold">
              {user.fullName?.charAt(0)}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">{user.fullName}</p>
            <p className="text-gray-500 text-xs truncate">{user.email}</p>
          </div>
        </div>

        {/* Profile button */}
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 text-sm font-medium w-full transition-all duration-200"
        >
          <User size={16} />
          My Profile
        </button>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/5 text-sm font-medium w-full transition-all duration-200"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-dark-300 flex">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-dark-200 border-r border-white/5 fixed h-full z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="w-60 bg-dark-200 h-full shadow-2xl">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 md:ml-60 flex flex-col min-h-screen">

        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-dark-200/80 backdrop-blur-md border-b border-white/5 px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-white font-semibold text-base capitalize">
                {navItems.find(n => n.id === activeTab)?.label || 'Dashboard'}
              </h1>
              <p className="text-gray-500 text-xs hidden sm:block">
                Welcome back, {user.fullName?.split(' ')[0]} 👋
              </p>
            </div>
          </div>

          {/* Topbar right — ONLY bell, no duplicate profile button */}
          <div className="flex items-center gap-3">
            <NotificationBell />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-4 sm:px-6 py-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout