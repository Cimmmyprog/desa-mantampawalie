"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowRight,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Newspaper,
  PlusCircle,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

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
      <main className="flex min-h-screen items-center justify-center bg-[#f4f7f5] px-4">
        <div className="w-full max-w-sm rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-xl shadow-emerald-900/5">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white">
            <ShieldCheck className="h-7 w-7" />
          </div>

          <h1 className="mt-5 text-xl font-black text-slate-900">
            Memeriksa Sesi Admin
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Sistem sedang memvalidasi akses dashboard.
          </p>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-2/3 animate-pulse rounded-full bg-emerald-600" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f7f5] text-slate-900">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 flex-col border-r border-emerald-100 bg-white/90 px-5 py-6 shadow-xl shadow-emerald-900/5 backdrop-blur-xl lg:flex">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25">
            <Home className="h-6 w-6" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
              Admin Desa
            </p>
            <h1 className="text-lg font-black text-slate-950">
              Mantampawalie
            </h1>
          </div>
        </div>

        <nav className="mt-10 space-y-2">
          <SideItem
            active
            icon={<LayoutDashboard className="h-5 w-5" />}
            label="Dashboard"
            onClick={() => router.push("/dashboard")}
          />
          <SideItem
            icon={<Newspaper className="h-5 w-5" />}
            label="Kelola Berita"
            onClick={() => router.push("/dashboard/Berita")}
          />
          <SideItem
            icon={<PlusCircle className="h-5 w-5" />}
            label="Tambah Berita"
            onClick={() => router.push("/dashboard/Berita")}
          />
          <SideItem
            icon={<Settings className="h-5 w-5" />}
            label="Pengaturan"
            onClick={() => router.push("/dashboard")}
          />
        </nav>

        <div className="mt-auto rounded-3xl bg-slate-950 p-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Akun Aktif
          </p>

          <p className="mt-3 break-all text-sm font-semibold">{user.email}</p>

          <div className="mt-4 inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold capitalize text-emerald-300">
            {user.role}
          </div>

          <button
            onClick={handleLogout}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <section className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-emerald-100 bg-white/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                Dashboard Admin
              </p>
              <h1 className="mt-1 text-xl font-black text-slate-950 sm:text-2xl">
                Selamat Datang
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/")}
                className="hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 sm:block"
              >
                Lihat Website
              </button>

              <button
                onClick={() => router.push("/dashboard/Berita")}
                className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
              >
                + Berita
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <section className="overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl shadow-emerald-900/10">
            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl" />
              <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-lime-400/10 blur-3xl" />

              <div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
                <div>
                  <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-emerald-300">
                    Sistem Informasi Desa
                  </div>

                  <h2 className="mt-5 max-w-2xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                    Kelola konten website desa dengan tampilan yang lebih rapi.
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                    Gunakan dashboard ini untuk menambah berita, mengatur konten,
                    dan memantau aktivitas pengelolaan website Desa Mantampawalie.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() => router.push("/dashboard/Berita")}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-600"
                    >
                      Tambah Berita Baru
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => router.push("/dashboard/Berita")}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/10 transition hover:bg-white/15"
                    >
                      Lihat Daftar Berita
                    </button>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                  <p className="text-sm font-bold text-emerald-300">
                    Admin Login
                  </p>

                  <div className="mt-4 space-y-4">
                    <InfoRow label="Email" value={user.email} />
                    <InfoRow label="Role" value={user.role} />
                    <InfoRow label="Status" value="Aktif" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<Newspaper className="h-5 w-5" />}
              title="Total Berita"
              value="24"
              description="Konten yang sudah dipublikasikan."
            />
            <StatCard
              icon={<FileText className="h-5 w-5" />}
              title="Draft"
              value="5"
              description="Konten yang belum diterbitkan."
            />
            <StatCard
              icon={<Activity className="h-5 w-5" />}
              title="Layanan"
              value="12"
              description="Informasi layanan desa."
            />
            <StatCard
              icon={<Users className="h-5 w-5" />}
              title="Pengguna"
              value="254"
              description="Data pengguna terdaftar."
            />
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-6">
              <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-950">
                    Aksi Cepat
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Pilih menu utama untuk mengelola konten website desa.
                  </p>
                </div>

                <button
                  onClick={() => router.push("/dashboard/Berita")}
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  Buat Berita
                </button>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <ActionCard
                  icon={<PlusCircle className="h-6 w-6" />}
                  title="Tambah Berita"
                  description="Buat berita desa lengkap dengan gambar, kategori, ringkasan, dan isi."
                  buttonText="Tambah Sekarang"
                  onClick={() => router.push("/dashboard/Berita")}
                />

                <ActionCard
                  icon={<Newspaper className="h-6 w-6" />}
                  title="Kelola Berita"
                  description="Lihat berita yang sudah dibuat, lalu edit atau hapus jika diperlukan."
                  buttonText="Kelola Berita"
                  onClick={() => router.push("/dashboard/Berita")}
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-emerald-100 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <ShieldCheck className="h-6 w-6" />
                </div>

                <div>
                  <h2 className="text-lg font-black text-slate-950">
                    Informasi Admin
                  </h2>
                  <p className="text-sm text-slate-500">
                    Detail sesi pengguna aktif.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4 rounded-3xl bg-slate-50 p-5">
                <ProfileItem label="Email" value={user.email} />
                <ProfileItem label="Role" value={user.role} />
                <ProfileItem label="Status" value="Aktif" />
              </div>

              <button
                onClick={handleLogout}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-black text-red-600 transition hover:bg-red-100"
              >
                <LogOut className="h-4 w-4" />
                Keluar dari Dashboard
              </button>
            </div>
          </section>

          <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-950">
                  Aktivitas Terbaru
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Ringkasan aktivitas terakhir pada dashboard admin.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <ActivityItem
                title="Berita desa berhasil dipublikasikan"
                description="Admin menambahkan konten terbaru ke website desa."
              />
              <ActivityItem
                title="Informasi layanan diperbarui"
                description="Konten layanan desa telah diperiksa dan disesuaikan."
              />
              <ActivityItem
                title="Admin berhasil login"
                description="Sesi admin sedang aktif pada dashboard."
              />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function SideItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
        active
          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
          : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{title}</p>
          <h3 className="mt-3 text-3xl font-black text-slate-950">{value}</h3>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          {icon}
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  description,
  buttonText,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-200 hover:bg-emerald-50/60">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-black text-slate-950">{title}</h3>

      <p className="mt-2 min-h-16 text-sm leading-6 text-slate-600">
        {description}
      </p>

      <button
        onClick={onClick}
        className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700"
      >
        {buttonText}
        <ArrowRight className="h-4 w-4" />
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
    <div className="flex gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4">
      <div className="mt-1 h-3 w-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40" />

      <div>
        <h4 className="text-sm font-black text-slate-950">{title}</h4>
        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 break-all text-sm font-bold capitalize text-white">
        {value}
      </p>
    </div>
  );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 break-all text-sm font-black capitalize text-slate-900">
        {value}
      </p>
    </div>
  );
}