import { prisma } from "../../../src/lib/prisma";

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

    return Response.json(news);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Gagal mengambil data berita." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, content, excerpt, imageUrl, category, authorId } = body;

    if (!title || !content || !authorId) {
      return Response.json(
        { error: "Judul, isi berita, dan authorId wajib diisi." },
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
        authorId: Number(authorId),
      },
    });

    return Response.json({
      message: "Berita berhasil dipublikasikan.",
      data: news,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Gagal membuat berita." },
      { status: 500 }
    );
  }
}