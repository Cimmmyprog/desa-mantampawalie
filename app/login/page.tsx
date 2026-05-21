'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');

    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Login gagal. Periksa kembali email dan password.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('desa-makmur-token', result.token);
      router.push('/dashboard');
    } catch {
      setError('Terjadi kesalahan pada server. Silakan coba lagi.');
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-4 py-16">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl lg:grid-cols-2">
          <div className="relative hidden bg-gradient-to-br from-emerald-600 via-green-600 to-slate-950 p-10 text-white lg:block">
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-green-300/20 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl font-black backdrop-blur">
                  D
                </div>

                <h2 className="mt-8 text-4xl font-black leading-tight">
                  Dashboard Admin Desa Digital
                </h2>

                <p className="mt-5 max-w-md leading-relaxed text-white/75">
                  Kelola data desa, layanan masyarakat, berita, pengumuman, dan
                  informasi publik secara cepat, aman, dan terpusat.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                  <p className="text-sm text-white/70">Akses</p>
                  <h3 className="mt-1 text-xl font-bold">Admin</h3>
                </div>

                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                  <p className="text-sm text-white/70">Sistem</p>
                  <h3 className="mt-1 text-xl font-bold">Terintegrasi</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10 lg:p-12">
            <div className="mx-auto max-w-md">
              <div className="mb-8">
                <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  Admin Panel
                </span>

                <h1 className="mt-5 text-3xl font-black text-slate-900">
                  Masuk ke Dashboard
                </h1>

                <p className="mt-3 leading-relaxed text-slate-600">
                  Gunakan akun admin untuk mengelola website dan layanan digital
                  desa.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    required
                    placeholder="admin@desa.com"
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      required
                      placeholder="Masukkan password"
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 pr-24 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl px-3 py-1 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                      {showPassword ? 'Sembunyi' : 'Lihat'}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 font-bold text-white shadow-lg shadow-green-600/25 transition hover:scale-[1.01] hover:from-green-700 hover:to-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? 'Memproses...' : 'Masuk Dashboard'}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} Desa Mattampa Walie. Sistem
                informasi desa digital.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}