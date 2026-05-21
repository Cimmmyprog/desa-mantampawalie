import { prisma } from "../../../src/lib/prisma";
import { NextResponse } from "next/server";

function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      where: {
        status: "published",
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error("NEWS_GET_ERROR:", error);

    return NextResponse.json(
      { error: "Gagal mengambil data berita." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, content, excerpt, imageUrl, category, authorId } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Judul dan isi berita wajib diisi." },
        { status: 400 }
      );
    }

    const numericAuthorId = Number(authorId || 1);

    const author = await prisma.user.findUnique({
      where: {
        id: numericAuthorId,
      },
    });

    if (!author) {
      return NextResponse.json(
        {
          error: `Author dengan ID ${numericAuthorId} tidak ditemukan di database.`,
        },
        { status: 400 }
      );
    }

    const baseSlug = createSlug(title);
    const slug = `${baseSlug}-${Date.now()}`;

    const news = await prisma.news.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        imageUrl: imageUrl || null,
        category: category || "Berita",
        status: "published",
        authorId: numericAuthorId,
      },
    });

    return NextResponse.json({
      message: "Berita berhasil dipublikasikan.",
      data: news,
    });
  } catch (error) {
    console.error("NEWS_CREATE_ERROR:", error);

    return NextResponse.json(
      { error: "Gagal membuat berita. Cek log server untuk detail error." },
      { status: 500 }
    );
  }
}