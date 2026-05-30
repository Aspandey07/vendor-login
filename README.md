# VendorBook - Vendor Booking Dashboard

![VendorBook Dashboard](https://via.placeholder.com/1200x630.png?text=VendorBook+Dashboard)

## Project Overview

VendorBook is a complete, production-ready SaaS dashboard built for vendors to manage their event inquiries, bookings, and customer relationships. It features a modern, premium design system with rich dark mode, interactive charts, and a seamless user experience.

## Features

- 🔐 **Authentication**: Secure login and session management via NextAuth.
- 📊 **Dashboard Overview**: Key metrics, inquiry distribution charts, and recent activity feeds.
- 📬 **Inquiry Management**: View, filter, and update the status of incoming booking inquiries.
- 👤 **Vendor Profile**: Manage public-facing contact details and business categories.
- 🎨 **Premium UI/UX**: Built with Shadcn UI, Tailwind CSS v4, and Lucide Icons, featuring micro-animations and a sleek glassmorphism dark theme.

## Architecture Explanation

This project uses the modern **Next.js 15 App Router** for Server-Side Rendering (SSR) and seamless client-side transitions. 

- **Frontend**: React 19, Tailwind CSS v4, Shadcn UI
- **Backend/API**: Next.js Server Actions & API Routes
- **Database**: MongoDB (via Prisma ORM)
- **Authentication**: NextAuth (Auth.js) Credentials Provider
- **State & Forms**: React Hook Form with Zod validation
- **Charts**: Recharts

## Environment Variables

Create a `.env` file in the root directory and add the following:

```env
# MongoDB Connection String (Replace with your own cluster URL)
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/vendor-dashboard?retryWrites=true&w=majority"

# NextAuth Secret (Generate via `openssl rand -base64 32`)
NEXTAUTH_SECRET="your-super-secret-nextauth-key"

# App URL (Local development)
NEXTAUTH_URL="http://localhost:3000"
```

## Installation Steps

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd vendor-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Database Setup**:
   Ensure your `.env` file is properly configured with your MongoDB connection string. Then, push the schema to the database and generate the Prisma client:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser. Since there is a middleware/auth protection, navigate to `/login` to access the dashboard. 

*(Note: For development testing with the UI, you can temporarily comment out the session check in `src/app/(dashboard)/layout.tsx` to view the dashboard without creating a user in the database).* Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment Setup Guide

1. Clone the repository and navigate into the project directory:
   ```bash
   cd vendor-dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your database and NextAuth secrets:
   ```bash
   cp .env.example .env
   ```
   *Required variables: `DATABASE_URL`, `NEXTAUTH_SECRET`*
4. Run Prisma schema generation and push it to the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. Seed the database with sample data:
   ```bash
   npm run db:seed
   ```
   *(Ensure `tsx` is installed globally or via npx)*
6. Start the development server:
   ```bash
   npm run dev
   ```

## Vercel Deployment Configuration

The repository includes a `vercel.json` file designed to work seamlessly with Vercel:

- **Build Command:** `npx prisma generate && next build`
- **Install Command:** `npm install`
- **Environment Variables:** Make sure to add `DATABASE_URL` and `NEXTAUTH_SECRET` in your Vercel project settings.

Simply import the repository into your Vercel account, and the configuration will handle the rest.

1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. In the Environment Variables section, add `DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL`.

Enjoy your new premium vendor dashboard!
