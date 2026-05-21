import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "BLOB_READ_WRITE_TOKEN belum terbaca di server." },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "File gambar tidak ditemukan." },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Format gambar harus JPG, PNG, atau WEBP." },
        { status: 400 }
      );
    }

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Ukuran gambar maksimal 2MB." },
        { status: 400 }
      );
    }

    const safeFileName = file.name.replace(/\s+/g, "-").toLowerCase();

    const blob = await put(`berita/${Date.now()}-${safeFileName}`, file, {
      access: "public",
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN_READ_WRITE_TOKEN,
    });

    return NextResponse.json({
      success: true,
      imageUrl: blob.url,
    });
  } catch (error) {
    console.error("UPLOAD_ERROR:", error);

    return NextResponse.json(
      { error: "Gagal upload gambar ke server." },
      { status: 500 }
    );
  }
}