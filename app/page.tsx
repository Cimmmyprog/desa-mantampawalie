'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { PlayCircle, ChevronDown } from 'lucide-react'
import Kepalah from './components/Kepalah/page'
import Apbn from './components/Apbn/page'
import './globals.css'
import MapSection from './components/Map/page'

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-black px-4 py-20 sm:px-6 lg:px-8">
        {/* Background */}
        <Image
          src="/hero.jpg"
          alt="Pemandangan Alam Desa"
          fill
          priority
          className="object-cover object-center brightness-[0.45]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-5 sm:mb-8"
          >
            <span className="inline-flex max-w-full rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-xs font-semibold tracking-wide text-green-300 backdrop-blur-xl sm:px-6 sm:text-sm">
              🌿 SMART DIGITAL VILLAGE
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-5xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl"
          >
            Membangun Desa
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent">
              Lebih Modern
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-5 max-w-3xl px-1 text-sm leading-relaxed text-gray-300 sm:mt-6 sm:text-base md:text-xl lg:text-2xl"
          >
            Portal layanan masyarakat berbasis digital untuk administrasi,
            informasi desa, dan pelayanan publik yang cepat, aman, dan modern.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center sm:gap-5"
          >
            <Link
              href="/layanan"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-2xl shadow-green-500/20 transition-all duration-300 hover:scale-105 sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
            >
              <PlayCircle className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
              Jelajahi Layanan
            </Link>

            <Link
              href="/Tentang"
              className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
            >
              Tentang Desa
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 grid w-full max-w-sm grid-cols-2 gap-3 sm:mt-14 sm:max-w-3xl sm:gap-5 md:grid-cols-4"
          >
            {[
              ['1200+', 'Penduduk'],
              ['24/7', 'Layanan Online'],
              ['15+', 'Fitur Digital'],
              ['100%', 'Pelayanan Cepat'],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 backdrop-blur-2xl transition-all duration-300 hover:bg-white/10 sm:rounded-3xl sm:px-7 sm:py-6"
              >
                <h3 className="text-xl font-black text-white sm:text-3xl">
                  {value}
                </h3>

                <p className="mt-1 text-xs font-medium text-gray-400 sm:mt-2 sm:text-sm">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Scroll */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-5 hidden sm:block"
          >
            <ChevronDown className="h-8 w-8 text-white/70" />
          </motion.div>
        </div>
      </section>

      {/* KEPALA DESA SECTION */}
      <Kepalah />
      <Apbn />
      <MapSection />
    </>
  )
}