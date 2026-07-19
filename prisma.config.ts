import { defineConfig } from "@prisma/config"

export default defineConfig({
  datasource: {
    url: "postgresql://postgres:Abishek%4024bca30@localhost:5432/ncv_ngo_portal?schema=public",
  },
  migrations: {
    seed: "npx tsx prisma/seed.ts",
  },
})
