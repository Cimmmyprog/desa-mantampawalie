'use client';

import { useEffect, useState } from 'react';

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  imageUrl: string | null;
  category: string;
  createdAt: string;
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        setNews(data);
      } catch {
        setNews([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-green-700">
              Informasi Desa
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
              Berita dan Pengumuman Terbaru
            </h2>
          </div>

          <p className="max-w-xl leading-relaxed text-slate-600">
            Informasi terbaru yang dikirim langsung melalui dashboard admin
            desa.
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-3xl bg-slate-50 p-8 text-center text-slate-600">
            Memuat berita...
          </div>
        ) : news.length === 0 ? (
          <div className="rounded-3xl bg-slate-50 p-8 text-center text-slate-600">
            Belum ada berita yang dipublikasikan.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-56 bg-slate-200">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100 text-5xl">
                      📰
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-700">
                    {item.category}
                  </span>

                  <h3 className="mt-4 text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 leading-relaxed text-slate-600">
                    {item.excerpt || item.content}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedNews(item)}
                    className="mt-6 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-green-700"
                  >
                    Baca Detail
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="h-64 bg-slate-200">
              {selectedNews.imageUrl ? (
                <img
                  src={selectedNews.imageUrl}
                  alt={selectedNews.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100 text-6xl">
                  📰
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-700">
                  {selectedNews.category}
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 sm:text-3xl">
                {selectedNews.title}
              </h3>

              <p className="mt-5 whitespace-pre-line leading-relaxed text-slate-600">
                {selectedNews.content}
              </p>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedNews(null)}
                  className="rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-green-700"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}