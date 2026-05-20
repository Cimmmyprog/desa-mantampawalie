
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import {
  LayoutDashboard,
  Home,
  ShieldCheck,
  Menu,
  X,
  BriefcaseBusiness,
  ChevronRight,
} from 'lucide-react'

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
    },
    {
      name: 'Layanan',
      href: '/layanan',
      icon: BriefcaseBusiness,
    },
    {
      name: 'Berita News',
      href: '/Berita',
      icon: LayoutDashboard,
    },
  ]

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/10 bg-black/70 shadow-2xl backdrop-blur-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="group flex items-center gap-4"
          >
            {/* Logo Box */}
            <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20" />

              <Image
                src="/bone.png"
                alt="Logo Desa Makmur"
                width={38}
                height={38}
                className="relative z-10 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Text */}
            <div>
              <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-xl font-black tracking-wide text-transparent">
                Desa Mantampawalie
              </h1>

              <p className="text-xs tracking-widest text-green-300/80">
                Kecematan Lamuru
              </p>
            </div>
          </Link>
        </motion.div>

        {/* DESKTOP MENU */}
        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl md:flex">
          {navItems.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                }}
              >
                <Link
                  href={item.href}
                  className="group relative flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-gray-200 transition-all duration-300 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />

                  {item.name}

                  {/* Hover Glow */}
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/0 to-emerald-500/0 opacity-0 blur-xl transition-all duration-500 group-hover:from-green-400/20 group-hover:to-emerald-500/20 group-hover:opacity-100" />
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/login"
            className="group relative overflow-hidden rounded-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-300 group-hover:scale-110" />

            <div className="relative flex items-center gap-2 px-7 py-3 font-semibold text-white">
              <ShieldCheck className="h-5 w-5 transition-transform duration-300 group-hover:rotate-6" />

              Admin Login

              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/20 md:hidden"
        >
          {mobileMenu ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/10 bg-black/90 px-6 py-6 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => {
                const Icon = item.icon

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenu(false)}
                    className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-gray-200 transition-all duration-300 hover:border-green-400/20 hover:bg-white/10 hover:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      {item.name}
                    </div>

                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                )
              })}

              {/* Login Button */}
              <Link
                href="/login"
                className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-600 px-5 py-4 font-semibold text-white shadow-xl shadow-green-500/20"
              >
                <ShieldCheck className="h-5 w-5" />
                Admin Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}