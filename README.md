# VendorBook - Premium Event Vendor Management System 🎯

![Next.js](https://img.shields.io/badge/Next.js-14%2B-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)

VendorBook is a highly scalable, modern, full-stack web application designed to bridge the gap between customers planning events (weddings, corporate events, parties) and the vendors providing those services. It acts as both a **Public Marketplace** for customer inquiries and a secure **SaaS Admin Dashboard** for vendors to manage their business, track leads, and generate invoices/quotes.

This project was built focusing on **Performance, Type-Safety, and Modern UI/UX** methodologies.

## 🔗 Live Demo
- **Live URL**: [https://your-vercel-deployment-link.vercel.app](https://your-vercel-deployment-link.vercel.app) *(Update this with your actual Vercel link)*

## 📸 Screenshots
*(Insert your project screenshots here. Example format below)*
> ![Dashboard Screenshot](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)
> ![Public Website Screenshot](https://via.placeholder.com/800x400?text=Public+Website+Screenshot)

---

## 🌟 Core Features & Modules

### 1. Customer-Facing Marketplace (Frontend)
- **Dynamic Hero & Search**: A visually stunning hero section with an advanced search bar (filtering by event type, location, and date).
- **Vendor Discovery**: Real-time listing of top-rated vendors and event categories.
- **Intelligent Inquiry System**: 
  - Customers can book a specific vendor directly.
  - Alternatively, they can choose *"Let VendorBook match me"* if they don't know who to pick. 
  - Dynamic API route (`/api/public/inquiries`) handles the submission securely and routes it to the correct vendor's dashboard.
- **Responsive Aesthetics**: Fully mobile-responsive using Tailwind CSS `overflow-x-auto`, `flex`, and `grid` systems to prevent overlapping UI elements on small screens.

### 2. Vendor Admin Dashboard (SaaS Portal)
- **Secure Authentication**: Built with NextAuth.js (v5 Beta) using JWT Strategy. Custom credentials provider with `bcryptjs` password hashing.
- **Analytics & Charts**: Real-time dashboard using `Recharts` for visualizing monthly inquiries, revenue projections, and status breakdowns.
- **Inquiry Management (CRM)**: A robust data table to view, filter, and manage incoming leads. Vendors can approve/decline requests.
- **AI-Powered Insights**: Integrates directly with Google GenAI (`@google/genai`). It reads long customer messages and automatically generates actionable summaries and sentiment analysis.
- **Quote & Invoice Generation**: Vendors can generate structured financial quotes. Using `html2canvas` and `jspdf`, these HTML quotes are seamlessly converted into downloadable PDF documents on the client-side.
- **Profile & Notification Settings**: Vendors can update their business profiles, change passwords, and manage email notification preferences.

---

## 🛠️ Technology Stack & Architecture

### **Frontend (Client-Side)**
- **Framework**: **Next.js 14+ (App Router)** - Chosen for its Server Components and improved SEO capabilities.
- **Language**: **TypeScript** - Used strictly for end-to-end type safety, preventing runtime errors.
- **Styling**: **Tailwind CSS v4** - Utility-first CSS for rapid UI development.
- **UI Component Library**: **shadcn/ui** & **@base-ui/react** - Unstyled, accessible components that we customized for a premium look.
- **Icons & Graphics**: **Lucide React** (Icons) & **Framer Motion** (Micro-animations).
- **Form Handling**: **React Hook Form** paired with **Zod** for complex form state management and strict client-side validation.

### **Backend (Server-Side)**
- **API Architecture**: **Next.js Server Actions** (for secure, direct database mutations like updating passwords) & **Route Handlers** (for public API endpoints like submitting inquiries).
- **Database**: **MongoDB** (NoSQL) - Chosen for its flexible document structure, perfect for storing varied JSON data like AI Insights and Quote Items.
- **ORM**: **Prisma** - Provides a type-safe database client. When the schema changes, TypeScript instantly knows.
- **Security & Auth**: **NextAuth.js** (Credentials Provider), **bcryptjs** (Password Hashing), and Crypto (UUID generation for password reset tokens).

---

## 🏗️ Project Architecture & Data Flow

### Directory Structure Explanation
```text
├── prisma/
│   └── schema.prisma       # Database schema (Models: User, Vendor, Inquiry, Quote, etc.)
├── src/
│   ├── app/
│   │   ├── (auth)/         # Grouped routes for Login, Signup, Forgot Password
│   │   ├── (public)/       # Grouped routes for the Public Website
│   │   ├── api/            # REST API endpoints (e.g., /api/public/inquiries)
│   │   └── dashboard/      # Protected Admin Dashboard (Nested Layouts)
│   ├── components/
│   │   ├── dashboard/      # Dashboard specific components (Charts, Tables)
│   │   ├── forms/          # Reusable forms with React Hook Form
│   │   └── ui/             # shadcn reusable atomic components
│   └── lib/
│       ├── actions.ts      # Next.js Server Actions (Database mutations)
│       ├── auth.ts         # NextAuth configuration & JWT callbacks
│       └── prisma.ts       # Prisma Client singleton pattern
```

### Database Schema (Prisma)
- **`User`**: Handles Authentication (Email, Password, Role).
- **`Vendor`**: Linked to User (1-to-1). Stores business details (Company Name, Category, Social Links).
- **`Inquiry`**: Linked to Vendor (Many-to-1). Stores customer leads. Note: `vendorId` is optional to allow "Auto-match" inquiries.
- **`Quote`**: Financial documents linked to Vendors.
- **`PasswordResetToken`**: Stores temporary UUIDs for the forgot password flow.

---

## 🧠 Technical Decisions & Q&A

**Q: Why use Next.js App Router instead of a standard React (Vite) + Node.js setup?**
> I chose Next.js App Router because it allows for building a full-stack application in a single repository. By using React Server Components, database records can be fetched directly on the server without writing separate REST APIs. This approach makes the application faster by reducing the JavaScript bundle size sent to the browser and improves security by keeping sensitive logic entirely on the server.

**Q: Why pair MongoDB with Prisma ORM?**
> MongoDB's flexible document model is perfect for handling dynamic and unstructured data, such as 'Quote Items' and 'AI Insights', which can vary significantly in length and structure. I paired it with Prisma ORM because Prisma enforces strict end-to-end TypeScript types. If a database column changes, the frontend code will immediately throw a TypeScript error, preventing runtime bugs in production.

**Q: How were Mobile Responsiveness issues handled on complex dashboard pages?**
> Designing data-dense admin dashboards presents challenges on mobile screens, particularly with wide data tables overlapping the layout. This was resolved by implementing CSS Grid and Flexbox properly, and wrapping data tables in div containers with `overflow-x-auto` and `min-w-0`. This ensures smooth horizontal scrolling without breaking the main viewport layout.

**Q: How is Authentication managed?**
> Authentication is built using NextAuth.js with a Custom Credentials provider. Passwords are mathematically hashed using `bcryptjs` and never stored in plain text. Upon successful login, NextAuth generates a secure JWT (JSON Web Token) stored in an HttpOnly cookie. This JWT contains the user's ID and Role, which are used to protect dashboard routes securely.

**Q: How does the Password Update feature maintain security?**
> The password update flow is handled entirely via a Next.js Server Action (`updateVendorPassword`). The client browser simply sends the old and new password inputs. The server action fetches the user from the database, uses `bcrypt.compare` to verify the old password, hashes the new password, and updates the database using Prisma. This ensures cryptographic logic is never exposed to the client browser.

---

## 🚀 Running the Project Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Create a `.env` file in the root directory:
   ```env
   # MongoDB Connection String
   DATABASE_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/vendorbook"
   
   # NextAuth Secret (Generate using: openssl rand -base64 32)
   NEXTAUTH_SECRET="your_super_secret_string"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Google GenAI Key for Inquiry Insights
   GEMINI_API_KEY="your_google_genai_key"
   ```

3. **Database Sync & Seed**:
   Push the schema to MongoDB and seed it with demo data (including the `admin@vendorbook.com` account):
   ```bash
   npx prisma db push
   npm run setup:db
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to view the application.

---

## ☁️ Deployment (Vercel)

This project is optimized for deployment on Vercel. 
1. Push the code to GitHub.
2. Import the repository in Vercel.
3. Add the Environment Variables (`DATABASE_URL`, `NEXTAUTH_SECRET`, `GEMINI_API_KEY`) in the Vercel Dashboard.
4. Vercel automatically runs `npm run build` which includes type-checking and Prisma generation.
