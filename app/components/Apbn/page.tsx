'use client'

export default function APBDesSection() {
  const income = [
    { title: 'Dana Desa (DD)', amount: 'Rp847.247.000' },
    { title: 'Alokasi Dana Desa (ADD)', amount: 'Rp373.456.000' },
    { title: 'Bagi Hasil Pajak & Retribusi', amount: 'Rp414.344.000' },
    { title: 'Bunga Bank', amount: 'Rp3.000.000' },
  ]

  const spending = [
    {
      title: 'Penyelenggaraan Pemerintahan Desa',
      amount: 'Rp523.331.965',
      color: 'bg-green-500',
      width: '75%',
    },
    {
      title: 'Pelaksanaan Pembangunan Desa',
      amount: 'Rp356.839.530',
      color: 'bg-emerald-500',
      width: '60%',
    },
    {
      title: 'Pembinaan Kemasyarakatan',
      amount: 'Rp34.200.000',
      color: 'bg-lime-500',
      width: '35%',
    },
    {
      title: 'Pemberdayaan Masyarakat',
      amount: 'Rp10.290.220',
      color: 'bg-teal-500',
      width: '25%',
    },
    {
      title: 'Penanggulangan Bencana',
      amount: 'Rp28.400.000',
      color: 'bg-green-400',
      width: '40%',
    },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-green-50/40 to-white py-24">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-green-100/70 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-100/70 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="rounded-full border border-green-200 bg-green-100 px-5 py-2 text-sm font-semibold tracking-widest text-green-700">
            APBDes 2026
          </span>

          <h2 className="mt-6 text-5xl font-black tracking-tight text-slate-900 md:text-6xl">
            Transparansi Anggaran
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              {' '}Desa Mattampa Walie
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
            Informasi pendapatan dan belanja desa secara terbuka
            untuk mendukung pembangunan masyarakat yang modern dan transparan.
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Income */}
          <div className="rounded-[35px] border border-white/60 bg-white/80 p-8 shadow-2xl shadow-green-100/40 backdrop-blur-xl">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-3xl font-black text-slate-900">
                Pendapatan Desa
              </h3>

              <span className="rounded-2xl bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                Income
              </span>
            </div>

            <div className="space-y-4">
              {income.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="font-medium text-slate-700">
                    {item.title}
                  </span>

                  <span className="font-bold text-green-600">
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Spending */}
          <div className="rounded-[35px] border border-white/60 bg-white/80 p-8 shadow-2xl shadow-emerald-100/40 backdrop-blur-xl">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-3xl font-black text-slate-900">
                Belanja Desa
              </h3>

              <span className="rounded-2xl bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                Spending
              </span>
            </div>

            <div className="space-y-5">
              {spending.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg"
                >
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <span className="font-medium text-slate-700">
                      {item.title}
                    </span>

                    <span className="font-bold text-slate-900">
                      {item.amount}
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-3 rounded-full ${item.color}`}
                      style={{
                        width: item.width,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-green-200 bg-white/80 p-7 shadow-xl shadow-green-100/40 backdrop-blur-xl">
            <p className="text-slate-500">
              Total Belanja
            </p>

            <h3 className="mt-2 text-3xl font-black text-slate-900">
              Rp953.061.715
            </h3>
          </div>

          <div className="rounded-3xl border border-emerald-200 bg-white/80 p-7 shadow-xl shadow-emerald-100/40 backdrop-blur-xl">
            <p className="text-slate-500">
              Defisit
            </p>

            <h3 className="mt-2 text-3xl font-black text-emerald-600">
              Rp102.814.715
            </h3>
          </div>

          <div className="rounded-3xl border border-green-200 bg-white/80 p-7 shadow-xl shadow-green-100/40 backdrop-blur-xl">
            <p className="text-slate-500">
              SILPA
            </p>

            <h3 className="mt-2 text-3xl font-black text-green-600">
              Rp102.814.715
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}