# Production Deployment Checklist

## Pre-Deployment

- [ ] Generate strong JWT_SECRET
- [ ] Configure DATABASE_URL with production PostgreSQL
- [ ] Set up Cloudinary account and configure credentials
- [ ] Set up Razorpay account and configure credentials
- [ ] Create production .env file
- [ ] Run database migrations: `npx prisma migrate deploy`
- [ ] Create initial super admin user via seed script
- [ ] Run full build: `npm run build`
- [ ] Verify all TypeScript types: `npx tsc --noEmit`
- [ ] Run lint: `npm run lint`

## Database

- [ ] Use managed PostgreSQL (Supabase, Railway, RDS)
- [ ] Enable automated daily backups
- [ ] Configure connection pooling (PgBouncer)
- [ ] Set up database monitoring
- [ ] Enable SSL connection

## Security

- [ ] Enable HTTPS (Cloudflare, Vercel default)
- [ ] Set CSP headers correctly
- [ ] Configure rate limiting
- [ ] Enable CSRF protection
- [ ] Audit all API routes for auth
- [ ] Review middleware permissions
- [ ] Validate all file uploads
- [ ] Sanitize all user inputs

## Performance

- [ ] Enable ISR for static pages
- [ ] Configure CDN for static assets
- [ ] Optimize images with Cloudinary
- [ ] Implement caching headers
- [ ] Enable compression (Brotli)

## Monitoring

- [ ] Set up error tracking (Sentry)
- [ ] Configure uptime monitoring
- [ ] Set up database monitoring
- [ ] Configure server alerts
- [ ] Health check endpoint: `/api/health`

## Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Configure build command: `npx prisma generate && next build`
5. Deploy

## Railway Deployment

1. Connect GitHub repository
2. Add PostgreSQL plugin
3. Set environment variables
4. Configure start command: `npx prisma migrate deploy && next start`
5. Deploy
