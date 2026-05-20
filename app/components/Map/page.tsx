export default function MapSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-green-700">
            Lokasi Desa
          </p>

          <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
            Peta Desa Matampawalie
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Temukan lokasi Desa Matampawalie, Kecamatan Lamuru, Kabupaten Bone,
            Sulawesi Selatan melalui peta berikut.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              Desa Matampawalie
            </h3>

            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div>
                <p className="font-semibold text-slate-900">Wilayah</p>
                <p className="mt-1">
                  Desa Matampawalie, Kecamatan Lamuru, Kabupaten Bone,
                  Sulawesi Selatan
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Kode Pos</p>
                <p className="mt-1">92764</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Layanan Desa</p>
                <p className="mt-1">
                  Informasi administrasi, pelayanan masyarakat, berita desa,
                  dan kegiatan masyarakat.
                </p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Mattampa%20Walie%20Lamuru%20Bone%20Sulawesi%20Selatan"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-2xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700"
            >
              Buka di Google Maps
            </a>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <iframe
              src="https://www.google.com/maps?q=Mattampa%20Walie%20Lamuru%20Bone%20Sulawesi%20Selatan&output=embed"
              width="100%"
              height="430"
              loading="lazy"
              className="h-[430px] w-full border-0"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}