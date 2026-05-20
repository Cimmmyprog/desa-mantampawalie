import React from 'react';

const HeroBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500 text-white">
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl font-bold sm:text-6xl">Desa Makmur</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-100 sm:text-xl">
          Portal layanan desa modern untuk administrasi cepat, layanan warga, dan dashboard admin.
        </p>
        <a
          href="/layanan"
          className="mt-10 inline-block rounded-full bg-white px-8 py-3 text-base font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100"
        >
          Lihat Layanan
        </a>
      </div>
    </div>
  );
};

export default HeroBanner;
