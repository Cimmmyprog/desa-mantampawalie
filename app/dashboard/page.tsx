"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SessionUser {
  id: number;
  email: string;
  role: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("desa-makmur-token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/auth/session", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          localStorage.removeItem("desa-makmur-token");
          router.push("/login");
          return;
        }

        const data = await res.json();

        if (!data.authenticated) {
          localStorage.removeItem("desa-makmur-token");
          router.push("/login");
          return;
        }

        setUser(data.user);
      })
      .catch(() => {
        localStorage.removeItem("desa-makmur-token");
        router.push("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("desa-makmur-token");
    router.push("/login");
  }

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-2xl bg-white px-8 py-6 shadow-lg">
          <p className="text-sm font-medium text-slate-600">
            Memeriksa sesi admin...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <section className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              Desa Makmur Admin Panel
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              Dashboard Admin
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Selamat datang, {user.email}. Kelola berita, layanan, dan data
              website desa dari halaman ini.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => router.push("/dashboard/berita/tambah")}
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700"
            >
              + Tambah Berita
            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Berita"
            value="24"
            description="Berita yang sudah dipublikasikan."
          />
          <StatCard
            title="Draft Berita"
            value="5"
            description="Berita yang belum diterbitkan."
          />
          <StatCard
            title="Total Layanan"
            value="12"
            description="Layanan yang tersedia di website."
          />
          <StatCard
            title="Pengguna"
            value="254"
            description="Jumlah pengguna terdaftar."
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex flex-col gap-4 border-b pb-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Manajemen Berita
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Tambahkan, edit, dan kelola berita terbaru untuk website desa.
                </p>
              </div>

              <button
                onClick={() => router.push("/dashboard/berita/tambah")}
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Buat Berita Baru
              </button>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ActionCard
                title="Tambah Berita"
                description="Buat berita baru lengkap dengan judul, isi, kategori, dan gambar."
                buttonText="Tambah Sekarang"
                onClick={() => router.push("/dashboard/Berita")}
              />

              <ActionCard
                title="Kelola Daftar Berita"
                description="Lihat semua berita yang sudah dibuat, lalu edit atau hapus jika diperlukan."
                buttonText="Lihat Berita"
                onClick={() => router.push("/dashboard/Berita")}
              />
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
              Akun Admin
            </p>

            <h2 className="mt-3 text-2xl font-bold">Informasi Login</h2>

            <div className="mt-5 space-y-4 text-sm">
              <div>
                <p className="text-slate-400">Email</p>
                <p className="font-medium text-white">{user.email}</p>
              </div>

              <div>
                <p className="text-slate-400">Role</p>
                <p className="font-medium capitalize text-white">
                  {user.role}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Status</p>
                <p className="font-medium text-emerald-300">Aktif</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Aktivitas Terbaru
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Ringkasan aktivitas terbaru pada sistem admin.
              </p>
            </div>
          </div>

          <div className="mt-5 divide-y rounded-xl border">
            <ActivityItem
              title="Berita desa berhasil dipublikasikan"
              description="Admin menambahkan berita terbaru pada halaman website."
            />
            <ActivityItem
              title="Data layanan diperbarui"
              description="Informasi layanan desa telah diperbarui."
            />
            <ActivityItem
              title="Admin berhasil login"
              description="Sesi admin sedang aktif pada dashboard."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="mt-3 text-3xl font-bold text-slate-900">{value}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}

function ActionCard({
  title,
  description,
  buttonText,
  onClick,
}: {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>

      <button
        onClick={onClick}
        className="mt-5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        {buttonText}
      </button>
    </div>
  );
}

function ActivityItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-4">
      <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
    </div>
  );
}