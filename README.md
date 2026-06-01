# Portfolio — Next.js + TypeScript + MySQL

A full-stack portfolio site built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and MySQL.

## Stack

| Layer      | Tech                        |
|------------|-----------------------------|
| Frontend   | Next.js 14, React 18, Tailwind CSS |
| Language   | TypeScript                  |
| Database   | MySQL 8+                    |
| DB Driver  | mysql2                      |
| Animations | Framer Motion (optional)    |

---

## 1 — Prerequisites

- Node.js 18+
- MySQL 8+ running locally (or remote)

---

## 2 — Clone & Install

```bash
git clone <your-repo>
cd portfolio
npm install
```

---

## 3 — Configure Environment

Copy and edit `.env.local`:

```bash
cp .env.local.example .env.local   # or edit .env.local directly
```

Fill in your MySQL credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=portfolio_db
```

Create the database in MySQL:

```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

## 4 — Seed the Database

```bash
npm run db:seed
```

This creates all tables and inserts sample data (skills, education, experience, certifications).

---

## 5 — Run Dev Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 6 — Customise Your Data

Edit `src/lib/seed.ts` to add your own skills, experience, education and certifications, then re-run `npm run db:seed`.

Or update rows directly in MySQL.

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── skills/route.ts
│   │   ├── education/route.ts
│   │   ├── experience/route.ts
│   │   └── certifications/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              ← Server component, fetches DB directly
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Skills.tsx
│   ├── ExperienceSection.tsx
│   ├── EducationSection.tsx
│   ├── CertificationsSection.tsx
│   └── Footer.tsx
├── lib/
│   ├── db.ts                 ← MySQL connection pool
│   └── seed.ts               ← Schema + seed data
└── types/
    └── index.ts              ← Shared TypeScript interfaces
```

---

## API Routes

| Route                     | Returns            |
|---------------------------|--------------------|
| GET /api/skills           | All skills         |
| GET /api/education        | Education history  |
| GET /api/experience       | Work experience    |
| GET /api/certifications   | Certifications     |

---

## Deploy

Tested with Vercel + PlanetScale (MySQL-compatible). Set your `DB_*` environment variables in the Vercel dashboard.
