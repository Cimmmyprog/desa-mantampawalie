'use client';

import { useState } from 'react';

interface Service {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  icon: string;
  duration: string;
  requirement: string[];
  output: string;
}

interface ApplicantForm {
  nama: string;
  nik: string;
  alamat: string;
  noHp: string;
  keperluan: string;
}

interface ReceiptData extends ApplicantForm {
  nomorPengajuan: string;
  tanggalPengajuan: string;
  layanan: string;
  estimasiProses: string;
  hasilLayanan: string;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Surat Keterangan Domisili',
    shortDescription:
      'Layanan pembuatan surat keterangan tempat tinggal bagi warga desa.',
    fullDescription:
      'Surat Keterangan Domisili digunakan sebagai bukti bahwa seseorang benar berdomisili di wilayah desa. Surat ini biasanya dibutuhkan untuk keperluan administrasi sekolah, pekerjaan, perbankan, atau kebutuhan resmi lainnya.',
    price: 'Gratis',
    icon: '🏠',
    duration: '1 Hari Kerja',
    requirement: [
      'Fotokopi KTP',
      'Fotokopi Kartu Keluarga',
      'Surat pengantar RT/RW',
    ],
    output: 'Surat Keterangan Domisili',
  },
  {
    id: 2,
    title: 'Surat Keterangan Usaha',
    shortDescription:
      'Layanan administrasi bagi warga yang memiliki kegiatan usaha.',
    fullDescription:
      'Surat Keterangan Usaha digunakan sebagai bukti resmi bahwa warga memiliki usaha yang berjalan di wilayah desa. Surat ini dapat digunakan untuk kebutuhan pengajuan modal, pendataan UMKM, atau administrasi usaha lainnya.',
    price: 'Gratis',
    icon: '📄',
    duration: '1–2 Hari Kerja',
    requirement: [
      'Fotokopi KTP',
      'Fotokopi Kartu Keluarga',
      'Foto tempat usaha',
      'Nama dan jenis usaha',
    ],
    output: 'Surat Keterangan Usaha',
  },
  {
    id: 3,
    title: 'Pengaduan Masyarakat',
    shortDescription:
      'Layanan penyampaian keluhan, laporan, atau aspirasi masyarakat.',
    fullDescription:
      'Layanan Pengaduan Masyarakat disediakan agar warga dapat menyampaikan masalah, keluhan, atau aspirasi kepada pemerintah desa secara lebih mudah dan terarah.',
    price: 'Gratis',
    icon: '💬',
    duration: 'Diproses sesuai jenis laporan',
    requirement: [
      'Identitas pelapor',
      'Isi laporan yang jelas',
      'Bukti pendukung jika ada',
    ],
    output: 'Tindak lanjut laporan masyarakat',
  },
  {
    id: 4,
    title: 'Informasi Bantuan Sosial',
    shortDescription:
      'Layanan informasi terkait program bantuan sosial desa.',
    fullDescription:
      'Layanan ini membantu masyarakat memperoleh informasi mengenai program bantuan sosial, syarat penerima bantuan, jadwal pendataan, dan status penerima bantuan.',
    price: 'Gratis',
    icon: '🤝',
    duration: 'Sesuai jadwal pendataan',
    requirement: [
      'Fotokopi KTP',
      'Fotokopi Kartu Keluarga',
      'Data kondisi ekonomi keluarga',
    ],
    output: 'Informasi dan verifikasi data bantuan sosial',
  },
  {
    id: 5,
    title: 'Data Kependudukan',
    shortDescription:
      'Layanan pengelolaan dan pengecekan data kependudukan warga.',
    fullDescription:
      'Layanan Data Kependudukan digunakan untuk membantu masyarakat dalam pengecekan, pembaruan, dan pengelolaan data warga yang berkaitan dengan administrasi desa.',
    price: 'Gratis',
    icon: '👥',
    duration: '1–3 Hari Kerja',
    requirement: [
      'Fotokopi KTP',
      'Fotokopi Kartu Keluarga',
      'Dokumen pendukung jika ada perubahan data',
    ],
    output: 'Data kependudukan yang diperbarui',
  },
  {
    id: 6,
    title: 'Pengajuan Surat Online',
    shortDescription:
      'Layanan pengajuan kebutuhan administrasi desa secara digital.',
    fullDescription:
      'Pengajuan Surat Online memudahkan warga untuk mengajukan dokumen administrasi tanpa harus datang berulang kali ke kantor desa. Warga cukup menyiapkan data dan persyaratan yang dibutuhkan.',
    price: 'Gratis',
    icon: '📝',
    duration: '1–2 Hari Kerja',
    requirement: [
      'Identitas pemohon',
      'Jenis surat yang diajukan',
      'Dokumen pendukung sesuai kebutuhan',
    ],
    output: 'Dokumen administrasi desa',
  },
];

export default function LayananPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [applicationService, setApplicationService] = useState<Service | null>(
    null
  );
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

  const [formData, setFormData] = useState<ApplicantForm>({
    nama: '',
    nik: '',
    alamat: '',
    noHp: '',
    keperluan: '',
  });

  function handleOpenApplication(service: Service) {
    setSelectedService(null);
    setApplicationService(service);
  }

  function handleSubmitApplication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!applicationService) return;

    const receipt: ReceiptData = {
      ...formData,
      nomorPengajuan: `DS-${Date.now()}`,
      tanggalPengajuan: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      layanan: applicationService.title,
      estimasiProses: applicationService.duration,
      hasilLayanan: applicationService.output,
    };

    setReceiptData(receipt);
    setApplicationService(null);

    setFormData({
      nama: '',
      nik: '',
      alamat: '',
      noHp: '',
      keperluan: '',
    });
  }

  function downloadReceipt() {
    if (!receiptData) return;

    const receiptText = `
NOTA PENGAJUAN LAYANAN DESA
DESA MATTANPA WALIE

Nomor Pengajuan : ${receiptData.nomorPengajuan}
Tanggal          : ${receiptData.tanggalPengajuan}

DATA PEMOHON
Nama Lengkap     : ${receiptData.nama}
NIK              : ${receiptData.nik}
Alamat           : ${receiptData.alamat}
No. HP           : ${receiptData.noHp}

DETAIL LAYANAN
Jenis Layanan    : ${receiptData.layanan}
Keperluan        : ${receiptData.keperluan}
Estimasi Proses  : ${receiptData.estimasiProses}
Hasil Layanan    : ${receiptData.hasilLayanan}

CATATAN
Nota ini merupakan bukti awal pengajuan layanan desa.
Pemohon diharapkan datang ke Kantor Desa Mattanpa Walie dengan membawa:
1. Nota pengajuan ini
2. KTP asli/fotokopi
3. Kartu Keluarga
4. Dokumen pendukung sesuai jenis layanan

Terima kasih.
Pemerintah Desa Mattanpa Walie
`;

    const blob = new Blob([receiptText], {
      type: 'text/plain;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `nota-${receiptData.nomorPengajuan}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <span className="inline-flex rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-green-200 backdrop-blur">
            Layanan Desa Digital
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl text-3xl font-black leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Layanan Administrasi Desa yang Cepat, Mudah, dan Terpusat
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Masyarakat dapat mengakses berbagai layanan administrasi desa secara
            lebih praktis, transparan, dan efisien melalui sistem digital.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-green-700">
                Daftar Layanan
              </p>

              <h2 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl md:text-4xl">
                Pilih Layanan yang Dibutuhkan
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Setiap layanan dilengkapi dengan informasi persyaratan, waktu
              proses, dan hasil dokumen yang diterima masyarakat.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.id}
                className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl sm:p-6"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 text-3xl sm:h-16 sm:w-16">
                  {service.icon}
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 sm:text-xl">
                  {service.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {service.shortDescription}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                    {service.price}
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-green-700"
                  >
                    Detail
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-3xl">
                  {selectedService.icon}
                </div>

                <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
                  {selectedService.title}
                </h2>

                <p className="mt-3 leading-relaxed text-slate-600">
                  {selectedService.fullDescription}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-600 transition hover:bg-red-100 hover:text-red-600"
              >
                ×
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Biaya</p>
                <p className="mt-1 font-bold text-slate-900">
                  {selectedService.price}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Estimasi Proses</p>
                <p className="mt-1 font-bold text-slate-900">
                  {selectedService.duration}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Hasil Layanan</p>
                <p className="mt-1 font-bold text-slate-900">
                  {selectedService.output}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-slate-900">
                Persyaratan
              </h3>

              <ul className="mt-4 space-y-3">
                {selectedService.requirement.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-slate-700"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="rounded-2xl border border-slate-300 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-100"
              >
                Tutup
              </button>

              <button
                type="button"
                onClick={() => handleOpenApplication(selectedService)}
                className="rounded-2xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700"
              >
                Ajukan Layanan
              </button>
            </div>
          </div>
        </div>
      )}

      {applicationService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Form Pengajuan Layanan
                </h2>

                <p className="mt-2 text-slate-600">
                  Isi data pemohon untuk mendapatkan nota pengajuan layanan.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setApplicationService(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-600 transition hover:bg-red-100 hover:text-red-600"
              >
                ×
              </button>
            </div>

            <div className="mb-6 rounded-2xl bg-green-50 p-4">
              <p className="text-sm text-slate-500">Jenis Layanan</p>
              <p className="font-bold text-green-700">
                {applicationService.title}
              </p>
            </div>

            <form onSubmit={handleSubmitApplication} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Nama Lengkap
                </label>

                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      nama: event.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  NIK
                </label>

                <input
                  type="text"
                  required
                  value={formData.nik}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      nik: event.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  placeholder="Masukkan NIK"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Alamat
                </label>

                <textarea
                  required
                  value={formData.alamat}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      alamat: event.target.value,
                    })
                  }
                  className="min-h-24 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  placeholder="Masukkan alamat lengkap"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Nomor HP
                </label>

                <input
                  type="text"
                  required
                  value={formData.noHp}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      noHp: event.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  placeholder="Contoh: 081234567890"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Keperluan
                </label>

                <textarea
                  required
                  value={formData.keperluan}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      keperluan: event.target.value,
                    })
                  }
                  className="min-h-24 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  placeholder="Jelaskan keperluan pengajuan layanan"
                />
              </div>

              <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm leading-relaxed text-yellow-800">
                Setelah nota dibuat, pemohon diharapkan datang ke Kantor Desa
                Mattanpa Walie dengan membawa nota dan dokumen pendukung.
              </div>

              <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setApplicationService(null)}
                  className="rounded-2xl border border-slate-300 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-100"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="rounded-2xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700"
                >
                  Buat Nota Pengajuan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {receiptData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Nota Pengajuan Berhasil Dibuat
                </h2>

                <p className="mt-2 text-slate-600">
                  Silakan unduh nota dan bawa ke kantor desa.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setReceiptData(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-600 transition hover:bg-red-100 hover:text-red-600"
              >
                ×
              </button>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="border-b border-slate-300 pb-4 text-center">
                <h3 className="text-xl font-black text-slate-900">
                  NOTA PENGAJUAN LAYANAN DESA
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  Pemerintah Desa Mattampa Walie
                </p>
              </div>

              <div className="mt-6 space-y-3 text-sm text-slate-700">
                <div className="flex justify-between gap-4">
                  <span>Nomor Pengajuan</span>
                  <strong>{receiptData.nomorPengajuan}</strong>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Tanggal</span>
                  <strong>{receiptData.tanggalPengajuan}</strong>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Nama</span>
                  <strong>{receiptData.nama}</strong>
                </div>

                <div className="flex justify-between gap-4">
                  <span>NIK</span>
                  <strong>{receiptData.nik}</strong>
                </div>

                <div className="flex justify-between gap-4">
                  <span>No. HP</span>
                  <strong>{receiptData.noHp}</strong>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Layanan</span>
                  <strong>{receiptData.layanan}</strong>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Estimasi Proses</span>
                  <strong>{receiptData.estimasiProses}</strong>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-white p-4">
                <p className="text-sm font-bold text-slate-900">
                  Keperluan:
                </p>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {receiptData.keperluan}
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm leading-relaxed text-yellow-800">
                Pemohon diharapkan datang ke Kantor Desa Mattampa Walie dengan
                membawa nota ini, KTP, Kartu Keluarga, dan dokumen pendukung
                sesuai jenis layanan.
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setReceiptData(null)}
                className="rounded-2xl border border-slate-300 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-100"
              >
                Tutup
              </button>

              <button
                type="button"
                onClick={downloadReceipt}
                className="rounded-2xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700"
              >
                Download Nota
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}