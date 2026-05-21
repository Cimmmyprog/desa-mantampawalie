"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  FileImage,
  Loader2,
  Newspaper,
  Send,
  UploadCloud,
  XCircle,
} from "lucide-react";

type MessageType = "success" | "error" | "";

export default function DashboardBeritaPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Berita");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState("");

  const titleCount = title.length;
  const excerptCount = excerpt.length;
  const contentCount = content.length;

  const isFormValid = useMemo(() => {
    return title.trim().length > 0 && content.trim().length > 0;
  }, [title, content]);

  function setAlert(type: MessageType, text: string) {
    setMessageType(type);
    setMessage(text);
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setImageFile(null);
      setPreviewImage("");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setAlert("error", "Format gambar harus JPG, PNG, atau WEBP.");
      setImageFile(null);
      setPreviewImage("");
      return;
    }

    if (file.size > maxSize) {
      setAlert("error", "Ukuran gambar maksimal 2MB.");
      setImageFile(null);
      setPreviewImage("");
      return;
    }

    setMessage("");
    setMessageType("");
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  }

  function removeImage() {
    setImageFile(null);
    setPreviewImage("");
  }

  function generateExcerpt() {
    if (!content.trim()) {
      setAlert("error", "Isi berita belum ada untuk dibuatkan ringkasan.");
      return;
    }

    const cleanContent = content.replace(/\s+/g, " ").trim();
    const autoExcerpt =
      cleanContent.length > 160
        ? `${cleanContent.slice(0, 160)}...`
        : cleanContent;

    setExcerpt(autoExcerpt);
    setAlert("success", "Ringkasan otomatis berhasil dibuat.");
  }

  async function uploadImage() {
    if (!imageFile) {
      return "";
    }

    setCurrentStep("Mengupload gambar...");

    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(result?.error || `Gagal upload gambar. Status: ${response.status}`);
    }

    return result.imageUrl;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isFormValid) {
      setAlert("error", "Judul dan isi berita wajib diisi.");
      return;
    }

    setMessage("");
    setMessageType("");
    setIsLoading(true);

    try {
      const uploadedImageUrl = await uploadImage();

      setCurrentStep("Menyimpan berita...");

      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          category,
          imageUrl: uploadedImageUrl,
          excerpt: excerpt.trim(),
          content: content.trim(),
          authorId: 1,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setAlert(
          "error",
          result?.error || `Gagal mengirim berita. Status: ${response.status}`
        );
        return;
      }

      setAlert("success", "Berita berhasil dipublikasikan.");

      setTitle("");
      setCategory("Berita");
      setImageFile(null);
      setPreviewImage("");
      setExcerpt("");
      setContent("");
    } catch (error) {
      if (error instanceof Error) {
        setAlert("error", error.message);
      } else {
        setAlert("error", "Terjadi kesalahan pada server.");
      }
    } finally {
      setCurrentStep("");
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f7f5] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Dashboard
            </button>

            <div className="mt-5">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-600">
                Dashboard Admin
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Publikasikan Berita Desa
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Buat berita, pengumuman, atau informasi kegiatan desa dengan
                tampilan yang rapi dan siap tampil di website.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white p-4 shadow-xl shadow-emerald-900/5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                <Newspaper className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Status Form
                </p>
                <p className="text-sm font-black text-slate-900">
                  {isFormValid ? "Siap dipublikasikan" : "Lengkapi data wajib"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-7">
            <div className="border-b border-slate-100 pb-5">
              <h2 className="text-xl font-black text-slate-950">
                Detail Berita
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Isi informasi utama yang akan ditampilkan kepada masyarakat.
              </p>
            </div>

            <div className="mt-6 grid gap-5">
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label className="block text-sm font-black text-slate-800">
                    Judul Berita <span className="text-red-500">*</span>
                  </label>

                  <span className="text-xs font-semibold text-slate-400">
                    {titleCount} karakter
                  </span>
                </div>

                <input
                  type="text"
                  required
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Contoh: Pemerintah Desa Mengadakan Kerja Bakti"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-800">
                  Kategori
                </label>

                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                >
                  <option value="Berita">Berita</option>
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Layanan">Layanan</option>
                </select>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label className="block text-sm font-black text-slate-800">
                    Ringkasan Berita
                  </label>

                  <span className="text-xs font-semibold text-slate-400">
                    {excerptCount} karakter
                  </span>
                </div>

                <textarea
                  value={excerpt}
                  onChange={(event) => setExcerpt(event.target.value)}
                  placeholder="Tulis ringkasan singkat berita..."
                  className="min-h-28 w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                />

                <button
                  type="button"
                  onClick={generateExcerpt}
                  className="mt-2 rounded-xl bg-slate-100 px-4 py-2 text-xs font-black text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700"
                >
                  Buat ringkasan dari isi berita
                </button>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label className="block text-sm font-black text-slate-800">
                    Isi Berita <span className="text-red-500">*</span>
                  </label>

                  <span className="text-xs font-semibold text-slate-400">
                    {contentCount} karakter
                  </span>
                </div>

                <textarea
                  required
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  placeholder="Tulis isi lengkap berita di sini..."
                  className="min-h-64 w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-6">
              <div>
                <h2 className="text-lg font-black text-slate-950">
                  Gambar Berita
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Gunakan gambar yang jelas agar berita terlihat menarik.
                </p>
              </div>

              <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50/60 px-5 py-8 text-center transition hover:border-emerald-500 hover:bg-emerald-50">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
                  <UploadCloud className="h-7 w-7" />
                </div>

                <span className="mt-4 text-sm font-black text-slate-900">
                  Klik untuk upload gambar
                </span>

                <span className="mt-1 text-xs leading-5 text-slate-500">
                  JPG, PNG, atau WEBP. Maksimal 2MB.
                </span>
              </label>

              {previewImage ? (
                <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="Preview gambar berita"
                      className="h-56 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-2 text-xs font-black text-red-600 shadow transition hover:bg-red-50"
                    >
                      Hapus
                    </button>
                  </div>

                  <div className="flex items-center gap-3 bg-white p-4">
                    <FileImage className="h-5 w-5 text-emerald-600" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-slate-800">
                        {imageFile?.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Siap diupload saat berita dipublikasikan.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 rounded-3xl border border-slate-100 bg-slate-50 p-4 text-sm leading-6 text-slate-500">
                  Belum ada gambar dipilih. Berita tetap bisa dipublikasikan,
                  tetapi lebih baik memakai gambar agar tampilannya menarik.
                </div>
              )}
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-6">
              <h2 className="text-lg font-black text-slate-950">
                Publikasi
              </h2>

              <div className="mt-4 space-y-3 text-sm">
                <ChecklistItem checked={title.trim().length > 0} text="Judul sudah diisi" />
                <ChecklistItem checked={content.trim().length > 0} text="Isi berita sudah diisi" />
                <ChecklistItem checked={Boolean(imageFile)} text="Gambar berita dipilih" />
              </div>

              {message && (
                <div
                  className={`mt-5 flex gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold ${
                    messageType === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {messageType === "success" ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  ) : (
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  )}

                  <span>{message}</span>
                </div>
              )}

              {isLoading && currentStep && (
                <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">
                  {currentStep}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !isFormValid}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Publikasikan Berita
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-black text-slate-600 transition hover:bg-slate-50"
              >
                Batal
              </button>
            </section>
          </aside>
        </form>
      </div>
    </main>
  );
}

function ChecklistItem({ checked, text }: { checked: boolean; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full ${
          checked ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"
        }`}
      >
        {checked ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <XCircle className="h-4 w-4" />
        )}
      </div>

      <p className={checked ? "font-bold text-slate-700" : "font-medium text-slate-400"}>
        {text}
      </p>
    </div>
  );
}