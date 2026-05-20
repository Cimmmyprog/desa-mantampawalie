import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return Response.json(
        { error: "Gambar wajib diupload." },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: "Format gambar harus JPG, PNG, atau WEBP." },
        { status: 400 }
      );
    }

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      return Response.json(
        { error: "Ukuran gambar maksimal 2MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads", "news");

    await mkdir(uploadDir, { recursive: true });

    const extension = file.type.split("/")[1] || "jpg";
    const fileName = `${randomUUID()}.${extension}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    return Response.json({
      message: "Gambar berhasil diupload.",
      imageUrl: `/uploads/news/${fileName}`,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Gagal upload gambar." },
      { status: 500 }
    );
  }
}