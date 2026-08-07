import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

async function checkAdmin() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });

  try {
    const admin = await prisma.user.findUnique({
      where: { email: "narchinthanaivattam@gmail.com" },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });

    if (!admin) {
      console.error("❌ Admin user not found in database!");
      console.log("Run: npx prisma db seed");
      return;
    }

    console.log("✅ Admin user found:");
    console.log("   Email:", admin.email);
    console.log("   Name:", admin.firstName, admin.lastName);
    console.log("   Role:", admin.role);
    console.log("   Active:", admin.isActive);
    console.log("   Last Login:", admin.lastLoginAt?.toISOString() || "Never");
    console.log("   Created:", admin.createdAt.toISOString());
    console.log("\n🔑 Sign-in: Google OAuth only (email must match)");

    if (!admin.isActive) {
      console.log("⚠️  Admin account is DEACTIVATED.");
      console.log("   Activate it in the database or re-run seed.");
    }
  } catch (error) {
    console.error("❌ Database error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();
