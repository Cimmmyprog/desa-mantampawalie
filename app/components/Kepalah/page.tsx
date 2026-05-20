'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { BadgeCheck, MapPin, Phone, Mail } from 'lucide-react'

export default function Kepalah() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Soft Background */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-green-100 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-100 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="rounded-full border border-green-200 bg-green-50 px-5 py-2 text-sm font-semibold tracking-widest text-green-700">
            PEMERINTAH DESA
          </span>

          <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-900 md:text-6xl">
            Kepala Desa
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
            Pemimpin desa yang berkomitmen menghadirkan pelayanan masyarakat
            yang modern, transparan, dan berbasis digital demi kemajuan desa.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid overflow-hidden rounded-[40px] border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 lg:grid-cols-2"
        >
          {/* Image */}
          <div className="relative min-h-[500px]">
            <Image
              src="/Bone.png"
              alt="Kepala Desa"
              fill
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

            {/* Floating Badge */}
            <div className="absolute bottom-8 left-8 rounded-2xl border border-white/20 bg-white/80 px-5 py-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-500 p-2">
                  <BadgeCheck className="h-5 w-5 text-white" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Kepala Desa Aktif
                  </h3>

                  <p className="text-sm text-slate-600">
                    Periode 2026 - 2031
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-10 md:p-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-4 text-sm font-semibold tracking-[0.3em] text-green-600"
            >
              PROFIL PEMIMPIN DESA
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-4xl font-black text-slate-900 md:text-5xl"
            >
              Kepalah desa
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-6 text-lg leading-relaxed text-slate-600"
            >
              Dengan semangat pelayanan dan inovasi digital,
              Kepala Desa berupaya menghadirkan sistem pemerintahan
              yang transparan, efisien, dan mudah diakses oleh seluruh masyarakat.
            </motion.p>

            {/* Info */}
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-lg">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-green-600" />

                  <div>
                    <p className="text-sm text-slate-500">
                      Lokasi
                    </p>

                    <h4 className="font-semibold text-slate-900">
                      Desa mattampa walie, Kecamatan lamuru, Kabupaten BONE
                    </h4>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-lg">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-600" />

                  <div>
                    <p className="text-sm text-slate-500">
                      Kontak
                    </p>

                    <h4 className="font-semibold text-slate-900">
                      +62 812-3456-7890
                    </h4>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-lg sm:col-span-2">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-600" />

                  <div>
                    <p className="text-sm text-slate-500">
                      Email Resmi
                    </p>

                    <h4 className="font-semibold text-slate-900">
                      kepaladesa@desamakmur.id
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-10 rounded-2xl border-l-4 border-green-500 bg-green-50 p-5">
              <p className="italic leading-relaxed text-slate-700">
                “Membangun desa bukan hanya tentang infrastruktur,
                tetapi juga menghadirkan pelayanan terbaik dan masa depan
                yang lebih maju untuk masyarakat.”
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}