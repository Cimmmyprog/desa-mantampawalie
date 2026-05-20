"use client";

import { ChangeEvent, FormEvent, useState } from "react";

export default function DashboardBeritaPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Berita");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setImageFile(null);
      setPreviewImage("");
      return;
    }

    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  }

  async function uploadImage() {
    if (!imageFile) {
      return "";
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Gagal upload gambar.");
    }

    return result.imageUrl;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setIsLoading(true);

    try {
      const uploadedImageUrl = await uploadImage();

      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          category,
          imageUrl: uploadedImageUrl,
          excerpt,
          content,
          authorId: 1,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Gagal mengirim berita.");
        return;
      }

      setMessage("Berita berhasil dipublikasikan.");

      setTitle("");
      setCategory("Berita");
      setImageFile(null);
      setPreviewImage("");
      setExcerpt("");
      setContent("");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Terjadi kesalahan pada server.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wide text-green-700">
            Dashboard Admin
          </p>

          <h1 className="mt-3 text-3xl font-black text-slate-900">
            Kirim Berita Desa
          </h1>

          <p className="mt-3 text-slate-600">
            Gunakan halaman ini untuk membuat berita atau pengumuman yang akan
            tampil di website desa.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Judul Berita
              </label>

              <input
                type="text"
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Contoh: Pemerintah Desa Mengadakan Kerja Bakti"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Kategori
              </label>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
              >
                <option value="Berita">Berita</option>
                <option value="Pengumuman">Pengumuman</option>
                <option value="Kegiatan">Kegiatan</option>
                <option value="Layanan">Layanan</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Upload Gambar Berita
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition hover:border-green-500 hover:bg-green-50">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <span className="text-sm font-bold text-slate-800">
                  Klik untuk upload gambar
                </span>

                <span className="mt-1 text-xs text-slate-500">
                  Format JPG, PNG, atau WEBP. Maksimal 2MB.
                </span>
              </label>

              {previewImage && (
                <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                  <img
                    src={previewImage}
                    alt="Preview gambar berita"
                    className="h-64 w-full object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Ringkasan Berita
              </label>

              <textarea
                value={excerpt}
                onChange={(event) => setExcerpt(event.target.value)}
                placeholder="Tulis ringkasan singkat berita..."
                className="min-h-24 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Isi Berita
              </label>

              <textarea
                required
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Tulis isi lengkap berita di sini..."
                className="min-h-52 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
              />
            </div>

            {message && (
              <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-2xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Mengirim..." : "Publikasikan Berita"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}