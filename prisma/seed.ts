import { PrismaClient, UserRole } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";

const adapter = new PrismaPg({ connectionString: "postgresql://postgres:Abishek%4024bca30@localhost:5432/ncv_ngo_portal?schema=public" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Create super admin
  const passwordHash = await hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@ncvtrust.org" },
    update: {},
    create: {
      email: "admin@ncvtrust.org",
      passwordHash,
      firstName: "Admin",
      lastName: "NCV",
      role: UserRole.SUPER_ADMIN,
      phone: "+919876543210",
    },
  });
  console.log("Created admin user:", admin.email);

  // Create content manager
  const cmPasswordHash = await hash("content123", 12);
  const cm = await prisma.user.upsert({
    where: { email: "content@ncvtrust.org" },
    update: {},
    create: {
      email: "content@ncvtrust.org",
      passwordHash: cmPasswordHash,
      firstName: "Priya",
      lastName: "Nair",
      role: UserRole.CONTENT_MANAGER,
    },
  });
  console.log("Created content manager:", cm.email);

  // Create projects
  const projects = [
    {
      title: "International Day of Yoga",
      slug: "international-day-of-yoga",
      description: "Annual large-scale yoga events with mass participation, expert-led sessions, and community engagement across India. Our flagship program brings together thousands of practitioners every June 21st.",
      shortDescription: "Annual mass yoga celebration bringing communities together.",
      status: "ACTIVE" as const,
      targetAmount: 500000,
      raisedAmount: 350000,
      location: "Pan India",
      isFeatured: true,
      orderIndex: 0,
    },
    {
      title: "Free Online Yoga Sessions",
      slug: "free-online-yoga-sessions",
      description: "Daily yoga classes streamed live for participants of all ages, promoting fitness and mental wellness from the comfort of home. Sessions include asanas, pranayama, and guided meditation.",
      shortDescription: "Daily live-streamed yoga for all ages and levels.",
      status: "ACTIVE" as const,
      targetAmount: 200000,
      raisedAmount: 180000,
      location: "Online (Pan India)",
      isFeatured: true,
      orderIndex: 1,
    },
    {
      title: "Yoga Sangamam",
      slug: "yoga-sangamam",
      description: "Community gatherings bringing together practitioners and instructors for immersive wellness experiences. These events foster connection, learning, and collective growth.",
      shortDescription: "Community wellness gatherings for collective growth.",
      status: "ACTIVE" as const,
      targetAmount: 300000,
      raisedAmount: 120000,
      location: "Mumbai, Pune, Delhi",
      isFeatured: false,
      orderIndex: 2,
    },
    {
      title: "Scholarship for Underprivileged Students",
      slug: "scholarship-program",
      description: "Financial support program for underprivileged students to pursue education and personal development. We cover tuition, books, and living expenses for meritorious students from economically weaker sections.",
      shortDescription: "Financial aid for meritorious students from low-income families.",
      status: "ACTIVE" as const,
      targetAmount: 1000000,
      raisedAmount: 450000,
      location: "Navi Mumbai",
      isFeatured: true,
      orderIndex: 3,
    },
    {
      title: "Yoga for Senior Citizens",
      slug: "yoga-for-seniors",
      description: "Specialized gentle yoga programs designed for senior citizens, focusing on joint health, flexibility, balance, and mental well-being. Sessions are conducted in community halls across Mumbai.",
      shortDescription: "Gentle yoga programs designed for senior citizens.",
      status: "ACTIVE" as const,
      targetAmount: 150000,
      raisedAmount: 150000,
      location: "Mumbai",
      isFeatured: false,
      orderIndex: 4,
    },
  ];

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`Created ${projects.length} projects`);

  // Create events
  const events = [
    {
      title: "World Yoga Day Celebration 2026",
      slug: "world-yoga-day-2026",
      description: "Join us for the grand celebration of International Yoga Day 2026. Mass yoga session, expert talks, and community wellness activities for all ages.",
      shortDescription: "Grand mass yoga celebration for International Yoga Day.",
      eventDate: new Date("2026-06-21"),
      venue: "Central Park, Navi Mumbai",
      city: "Navi Mumbai",
      status: "UPCOMING" as const,
      maxAttendees: 2000,
      isFeatured: true,
    },
    {
      title: "Weekend Yoga Workshop",
      slug: "weekend-yoga-workshop-may-2026",
      description: "A comprehensive weekend workshop covering asanas, pranayama, and meditation techniques. Perfect for beginners and intermediate practitioners.",
      shortDescription: "Comprehensive weekend yoga workshop for all levels.",
      eventDate: new Date("2026-08-15"),
      venue: "Community Center, Sector 10",
      city: "Navi Mumbai",
      status: "UPCOMING" as const,
      maxAttendees: 100,
      isFeatured: false,
    },
    {
      title: "Free Health Camp",
      slug: "free-health-camp-2026",
      description: "Free health check-up camp with yoga consultations, BMI assessment, and wellness guidance. Open to all community members.",
      shortDescription: "Free community health check-up and yoga consultation.",
      eventDate: new Date("2026-09-10"),
      venue: "Government School Ground",
      city: "Thane",
      status: "UPCOMING" as const,
      maxAttendees: 500,
      isFeatured: true,
    },
    {
      title: "New Year Meditation Retreat",
      slug: "new-year-meditation-retreat",
      description: "A 3-day immersive meditation retreat to welcome the new year with mindfulness, peace, and inner transformation.",
      shortDescription: "3-day meditation retreat for New Year transformation.",
      eventDate: new Date("2025-12-30"),
      venue: "Wellness Center, Lonavala",
      city: "Lonavala",
      status: "COMPLETED" as const,
      maxAttendees: 50,
      isFeatured: false,
    },
  ];

  for (const e of events) {
    await prisma.event.upsert({
      where: { slug: e.slug },
      update: e,
      create: e,
    });
  }
  console.log(`Created ${events.length} events`);

  // Create testimonials
  const testimonials = [
    {
      authorName: "Sunita Devi",
      authorRole: "Yoga Student",
      content: "NCV Trust's free yoga sessions changed my life. I used to suffer from chronic back pain, and after 3 months of regular practice, I feel completely transformed. The instructors are patient and caring.",
      rating: 5,
      status: "APPROVED" as const,
      orderIndex: 0,
    },
    {
      authorName: "Rajesh Patel",
      authorRole: "Volunteer",
      content: "Volunteering with NCV Trust has been the most fulfilling experience of my life. Seeing the smiles on people's faces during our community wellness camps makes every effort worthwhile.",
      rating: 5,
      status: "APPROVED" as const,
      orderIndex: 1,
    },
    {
      authorName: "Dr. Meera Iyer",
      authorRole: "Healthcare Professional",
      content: "As a doctor, I can vouch for the incredible health benefits of the yoga programs offered by NCV Trust. Their approach to holistic wellness is scientifically sound and deeply effective.",
      rating: 5,
      status: "APPROVED" as const,
      orderIndex: 2,
    },
    {
      authorName: "Anita Sharma",
      authorRole: "Scholarship Recipient",
      content: "Thanks to the NCV Trust scholarship, I was able to complete my engineering degree. They not only supported me financially but also mentored me through difficult times. I am now working at a reputed company.",
      rating: 5,
      status: "APPROVED" as const,
      orderIndex: 3,
    },
    {
      authorName: "Mohammed Khan",
      authorRole: "Parent",
      content: "My children attend the weekend yoga workshops and absolutely love them. The positive impact on their concentration and behavior has been remarkable. Thank you NCV Trust!",
      rating: 4,
      status: "APPROVED" as const,
      orderIndex: 4,
    },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { authorName: t.authorName } });
    if (!existing) {
      await prisma.testimonial.create({ data: t });
    }
  }
  console.log("Created testimonials");

  // Create scholarships
  const scholarships = [
    {
      title: "Merit-cum-Need Scholarship",
      slug: "merit-cum-need-scholarship",
      description: "Financial assistance for students who demonstrate both academic merit and financial need. Covers tuition fees, books, and a monthly stipend for living expenses.",
      eligibility: "Students from families with annual income below ₹3,00,000. Must have scored above 75% in previous examinations.",
      benefits: "Full tuition coverage, ₹2,000 monthly stipend, free textbooks, and mentorship support.",
      totalAmount: 500000,
      totalSlots: 50,
      isActive: true,
    },
    {
      title: "Women Empowerment Scholarship",
      slug: "women-empowerment-scholarship",
      description: "Dedicated scholarship for young women from underserved communities to pursue higher education in STEM fields.",
      eligibility: "Female students aged 16-25 from economically weaker sections pursuing STEM education.",
      benefits: "₹50,000 per year for 4 years, laptop provision, and career guidance.",
      totalAmount: 1000000,
      totalSlots: 25,
      isActive: true,
    },
  ];

  for (const s of scholarships) {
    await prisma.scholarship.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log("Created scholarships");

  // Create settings
  const settings = [
    { key: "site_name", value: "NCV Trust" },
    { key: "site_tagline", value: "Wellness Through Yoga & Service" },
    { key: "site_description", value: "NCV Trust is a non-profit organization dedicated to holistic well-being through yoga, education, and compassionate community service." },
    { key: "contact_email", value: "info@ncvtrust.org" },
    { key: "contact_phone", value: "+91 98765 43210" },
    { key: "contact_address", value: "NCV Trust, Sector 15, Navi Mumbai, Maharashtra 400701, India" },
    { key: "social_facebook", value: "https://facebook.com/ncvtrust" },
    { key: "social_instagram", value: "https://instagram.com/ncvtrust" },
    { key: "social_youtube", value: "https://youtube.com/@ncvtrust" },
    { key: "social_twitter", value: "https://twitter.com/ncvtrust" },
  ];

  for (const s of settings) {
    await prisma.settings.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log("Created settings");

  console.log("\nSeed completed successfully!");
  console.log("Admin login: admin@ncvtrust.org / admin123");
  console.log("Content Manager login: content@ncvtrust.org / content123");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
