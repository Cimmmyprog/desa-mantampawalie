'use client'

import Link from 'next/link'
import type { SVGProps } from 'react'
import Image from 'next/image'

type IconProps = SVGProps<SVGSVGElement>

function MapPinIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 21s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function PhoneIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6.4 6.4l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9Z" />
    </svg>
  )
}

function MailIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  )
}

function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.5V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
    </svg>
  )
}

function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  )
}

function YoutubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.6 7.2s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.8 4 12 4 12 4s-3.8 0-6.7.2c-.4.1-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2 9 2 10.8v1.7c0 1.8.4 3.6.4 3.6s.2 1.5.8 2.1c.8.8 1.9.8 2.4.9 1.7.2 6.4.2 6.4.2s3.8 0 6.7-.2c.4-.1 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.4-1.8.4-3.6v-1.7c0-1.8-.4-3.6-.4-3.6ZM10 14.9V8.8l5.2 3.1-5.2 3Z" />
    </svg>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-black text-white">
      <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 text-xl font-black shadow-lg shadow-green-500/30">
                <Image
                                src="/bone.png"
                                alt="Logo Desa Makmur"
                                width={38}
                                height={38}
                                className="relative z-10 object-contain transition-transform duration-300 group-hover:scale-110"
                              />
              </div>

              <div>
                <h2 className="text-2xl font-black">
                  Desa Mantanpawalie
                </h2>
                <p className="text-sm text-gray-400">
                  Smart Digital Village
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm leading-relaxed text-gray-400">
              Portal layanan desa modern untuk mendukung pelayanan masyarakat
              yang cepat, aman, transparan, dan berbasis digital.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-bold">
              Navigasi
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <Link href="/" className="transition hover:text-green-400">
                Home
              </Link>
              <Link href="/layanan" className="transition hover:text-green-400">
                Layanan
              </Link>
              <Link href="/dashboard" className="transition hover:text-green-400">
                Dashboard
              </Link>
              <Link href="/tentang" className="transition hover:text-green-400">
                Tentang Desa
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-bold">
              Kontak
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-400">
                <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-green-400" />
                <p>
                  Desa Mantanpawalie, Kecamatan Mattampa, Kabupaten Bone
                </p>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <PhoneIcon className="h-5 w-5 shrink-0 text-green-400" />
                <p>+62 812-3456-7890</p>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <MailIcon className="h-5 w-5 shrink-0 text-green-400" />
                <a
                  href="mailto:info@desamantanpawalie.com"
                  className="transition hover:text-green-400"
                >
                  info@desamantanpawalie.com
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-bold">
              Media Sosial
            </h3>

            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gray-300 transition hover:scale-110 hover:border-green-400 hover:bg-green-500/10 hover:text-green-400"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gray-300 transition hover:scale-110 hover:border-green-400 hover:bg-green-500/10 hover:text-green-400"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gray-300 transition hover:scale-110 hover:border-green-400 hover:bg-green-500/10 hover:text-green-400"
              >
                <YoutubeIcon className="h-5 w-5" />
              </a>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-gray-500">
              Ikuti informasi terbaru seputar kegiatan, layanan, dan pengumuman
              resmi desa.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">
          <p>
            © {currentYear} Desa Mantanpawalie. All rights reserved.
          </p>

          <p>
            Dibangun untuk pelayanan masyarakat digital.
          </p>
        </div>
      </div>
    </footer>
  )
}