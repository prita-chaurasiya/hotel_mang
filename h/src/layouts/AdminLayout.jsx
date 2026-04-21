import React, { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  CalendarRange,
  BedDouble,
  Users,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

const nav = [
  { to: '/admin', end: true, label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/reservations', label: 'Reservations', icon: CalendarRange },
  { to: '/admin/rooms', label: 'Rooms', icon: BedDouble },
  { to: '/admin/guests', label: 'Guests', icon: Users },
];

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-montserrat">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.button
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={[
          'fixed top-0 z-50 flex h-full w-72 flex-col border-r border-slate-800 bg-slate-900 text-slate-100 transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
              R
            </span>
            <div className="leading-tight">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Royella</p>
              <p className="font-playfair text-lg font-semibold text-white">Staff Console</p>
            </div>
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {nav.map(({ to, end, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white',
                ].join(' ')
              }
            >
              <Icon className="h-5 w-5 shrink-0 opacity-90" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <Link
            to="/"
            className="flex items-center justify-between rounded-lg bg-slate-800/80 px-3 py-2.5 text-sm text-slate-200 transition hover:bg-slate-800"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Public website
            </span>
            <ChevronRight className="h-4 w-4 text-slate-500" />
          </Link>
          <p className="mt-3 text-xs text-slate-500">
            Demo UI — connect your API for live data.
          </p>
        </div>
      </aside>

      {/* Main column */}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur supports-[backdrop-filter]:bg-white/75 sm:px-6">
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="relative hidden min-w-0 flex-1 sm:block sm:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search reservations, guests, rooms…"
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none ring-primary-500/20 placeholder:text-slate-400 focus:border-primary-300 focus:bg-white focus:ring-2"
            />
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary-500 ring-2 ring-white" />
            </button>
            <div className="hidden h-8 w-px bg-slate-200 sm:block" />
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-800">
                AD
              </div>
              <div className="hidden text-left text-xs sm:block">
                <p className="font-semibold text-slate-800">Admin</p>
                <p className="text-slate-500">Front office</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
