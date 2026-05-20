import "dotenv/config";
import { PrismaClient } from "../prisma/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { createHash } from "crypto";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL belum ada di file .env");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

async function main() {
  const adminEmail = "admin@desamakmur.local";
  const adminPassword = "Admin1234!";

  await prisma.user.upsert({
    where: {
      email: adminEmail,
    },
    update: {
      name: "Admin Desa Makmur",
      password: hashPassword(adminPassword),
      role: "admin",
    },
    create: {
      name: "Admin Desa Makmur",
      email: adminEmail,
      password: hashPassword(adminPassword),
      role: "admin",
    },
  });

  console.log("Admin berhasil dikirim ke database.");
  console.log("Email:", adminEmail);
  console.log("Password:", adminPassword);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });