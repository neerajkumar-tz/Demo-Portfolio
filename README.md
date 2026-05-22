# Alex Rivera — Digital Marketing Portfolio & Blog

A production-ready portfolio site with a Sanity-powered blog, built with **Next.js 15** and designed for deployment on **Vercel**.

---

## ✨ Features

- **Portfolio homepage** — Hero, stats, about, services, blog preview, testimonials, CTA
- **Sanity CMS blog** — Full rich-text posts with cover images, categories, featured flags
- **6 demo posts** included (SEO, Social Media, Content Marketing, PPC, Analytics, Email)
- **Dark editorial aesthetic** — DM Serif Display + Syne + DM Sans, amber/charcoal palette
- **Vercel-ready** — ISR, optimised images, zero-config deployment
- **Type-safe Sanity schema** with GROQ queries

---

## 🛠 Tech Stack

| Layer      | Technology                         |
|------------|------------------------------------|
| Framework  | Next.js 15 (App Router)            |
| CMS        | Sanity v3                          |
| Styling    | Vanilla CSS with CSS Variables     |
| Hosting    | Vercel                             |
| Blog Store | Sanity Cloud (sanity.io)           |
| Images     | Sanity CDN + Picsum (demo)         |

---

## 🚀 Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
npm install
```

### 2. Create a Sanity project

```bash
npx sanity@latest init
# Choose: "Create new project"
# Dataset name: production
# Project output path: . (current dir — select "no" when asked to overwrite sanity.config.js)
```

Copy your **Project ID** from [sanity.io/manage](https://sanity.io/manage).

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token   # only needed for seeding
```

**Getting a write token:**
1. Go to [sanity.io/manage](https://sanity.io/manage) → your project
2. API → Tokens → Add API token
3. Name: "Seed Script" | Permission: **Editor**
4. Copy the token

### 4. Seed demo posts

```bash
npm run seed
```

This uploads 6 demo blog posts with cover images to your Sanity dataset.

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Import on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repo
3. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
4. Deploy ✓

> **Note:** `SANITY_API_TOKEN` is only used for the seed script and doesn't need to be added to Vercel.

### 3. Configure Sanity CORS

In [sanity.io/manage](https://sanity.io/manage) → API → CORS Origins, add:
- `http://localhost:3000`
- `https://your-domain.vercel.app`

---

## 🗂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.jsx          # Root layout (Header + Footer)
│   │   ├── page.jsx            # Homepage
│   │   ├── globals.css         # All styles
│   │   └── blog/
│   │       ├── page.jsx        # Blog listing
│   │       └── [slug]/
│   │           └── page.jsx    # Individual post
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── BlogCard.jsx
│   └── lib/
│       └── sanity.js           # Client, urlFor, GROQ queries
├── sanity/
│   └── schemas/
│       ├── index.js
│       └── post.js             # Post schema
├── scripts/
│   └── seed.mjs                # Demo post seeder
├── sanity.config.js            # Sanity Studio config
└── next.config.mjs
```

---

## ✏️ Customisation

### Change the person's name / details
Edit `src/app/page.jsx` — update the hero copy, stats, about text, and email.

### Add/edit blog posts
Use the Sanity Studio:

```bash
npx sanity dev
# Opens Studio at http://localhost:3333
```

### Change colours
All design tokens are CSS variables in `src/app/globals.css`:

```css
:root {
  --bg: #0c0c0e;
  --accent: #ff5c35;   /* Change this for a different brand colour */
  ...
}
```

### Post schema fields
Edit `sanity/schemas/post.js` to add fields (e.g. tags, author, SEO fields).

---

## 📝 Blog Post Categories

The seeded posts cover:
- **SEO** — 10 SEO Strategies That Will Dominate 2025
- **Social Media** — Instagram growth case study (2K → 200K)
- **Content Marketing** — The funnel that actually converts
- **PPC & Ads** — Google Ads survival guide 2025
- **Analytics** — GA4 metrics that matter
- **Email Marketing** — Email sequences with 40%+ open rates

---

## 📄 License

MIT — free to use and adapt.
