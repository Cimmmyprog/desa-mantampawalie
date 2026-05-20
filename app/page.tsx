
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { PlayCircle, ChevronDown } from 'lucide-react'
import Kepalah from './components/Kepalah/page'
import Apbn from './components/Apbn/page'
  import  './globals.css'
import MapSection from './components/Map/page'
export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
        {/* Background */}
        <Image
          src="/hero.jpg"
          alt="Pemandangan Alam Desa"
          fill
          priority
          className="object-cover object-center brightness-[0.45]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Grid */}
        {/* <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:70px_70px]" /> */}

        {/* Content */}
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            <span className="rounded-full border border-green-400/20 bg-green-400/10 px-6 py-2 text-sm font-semibold tracking-wide text-green-300 backdrop-blur-xl">
              🌿 SMART DIGITAL VILLAGE
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-5xl text-5xl font-black leading-tight tracking-tight text-white md:text-7xl lg:text-8xl"
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
            className="mt-8 max-w-3xl text-lg leading-relaxed text-gray-300 md:text-2xl"
          >
            Portal layanan masyarakat berbasis digital untuk administrasi,
            informasi desa, dan pelayanan publik yang cepat, aman, dan modern.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-12 flex flex-col gap-5 sm:flex-row"
          >
            <Link
              href="layanan"
              className="group flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-green-500/20 transition-all duration-300 hover:scale-105"
            >
              <PlayCircle className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
              Jelajahi Layanan
            </Link>

            <Link
              href="Tentang"
              className="rounded-full border border-white/10 bg-white/5 px-10 py-5 text-lg font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black"
            >
              Tentang Desa
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 grid grid-cols-2 gap-5 md:grid-cols-4"
          >
            {[
              ['1200+', 'Penduduk'],
              ['24/7', 'Layanan Online'],
              ['15+', 'Fitur Digital'],
              ['100%', 'Pelayanan Cepat'],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-white/5 px-7 py-6 backdrop-blur-2xl transition-all duration-300 hover:bg-white/10"
              >
                <h3 className="text-3xl font-black text-white">
                  {value}
                </h3>

                <p className="mt-2 text-sm font-medium text-gray-400">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Scroll */}
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="absolute bottom-10"
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
