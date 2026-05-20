'use client'

export default function AboutVillage() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-green-100 blur-3xl" />
      <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-emerald-100 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              Tentang Desa
            </span>

            <h2 className="mt-6 text-4xl font-black leading-tight text-slate-900 md:text-5xl">
              Desa Mantanpawalie Menuju Desa Digital yang Modern
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Desa Mantanpawalie merupakan desa yang terus berkembang dengan
              semangat membangun pelayanan publik yang lebih cepat, terbuka, dan
              mudah diakses oleh masyarakat. Melalui pemanfaatan teknologi
              digital, desa ini berupaya menghadirkan sistem informasi yang
              membantu masyarakat dalam memperoleh layanan, pengumuman, berita,
              dan data desa secara lebih praktis.
            </p>

            <p className="mt-4 leading-relaxed text-slate-600">
              Website desa ini dirancang sebagai pusat informasi resmi yang
              menghubungkan pemerintah desa dengan masyarakat. Dengan tampilan
              modern dan fitur yang mudah digunakan, masyarakat dapat mengakses
              informasi penting kapan saja secara lebih transparan dan efisien.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-3xl font-black text-green-600">24/7</h3>
                <p className="mt-2 text-sm font-medium text-slate-600">
                  Akses Informasi
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-3xl font-black text-green-600">100%</h3>
                <p className="mt-2 text-sm font-medium text-slate-600">
                  Transparansi
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-3xl font-black text-green-600">Digital</h3>
                <p className="mt-2 text-sm font-medium text-slate-600">
                  Layanan Desa
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-green-400/20 to-emerald-600/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-900 shadow-2xl">
              <div className="h-80 bg-gradient-to-br from-green-500 via-emerald-600 to-slate-900 p-8 md:h-[460px]">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                      Smart Digital Village
                    </div>

                    <h3 className="mt-6 max-w-md text-3xl font-black leading-tight text-white">
                      Pelayanan desa lebih mudah, cepat, dan terintegrasi.
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">
                      <p className="text-sm text-white/70">Fokus Utama</p>
                      <h4 className="mt-2 text-xl font-bold text-white">
                        Pelayanan Publik
                      </h4>
                    </div>

                    <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">
                      <p className="text-sm text-white/70">Sistem</p>
                      <h4 className="mt-2 text-xl font-bold text-white">
                        Informasi Desa
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-3xl bg-white p-5 shadow-xl md:block">
              <p className="text-sm font-semibold text-slate-500">
                Visi Desa
              </p>
              <p className="mt-1 text-lg font-black text-slate-900">
                Maju, Terbuka, Digital
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}