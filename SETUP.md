# Jetpackers AI — Setup Guide

**Live site:** https://jetpackers-ai.vercel.app
**GitHub:** https://github.com/shaanmd/jetpackers-ai
**Domain to connect:** jetpackersai.com

---

## STEP 1: Supabase — Create Tables

You need two tables. Run these in your Supabase project's SQL editor.

### Waitlist (email capture on landing page)

```sql
create table if not exists waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamptz default now()
);

alter table waitlist enable row level security;
create policy "Allow inserts" on waitlist for insert with check (true);
```

### Quiz Results (email + persona from the quiz)

```sql
create table if not exists quiz_results (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  answers jsonb not null,
  persona text not null,
  created_at timestamptz default now()
);

alter table quiz_results enable row level security;
create policy "Allow inserts" on quiz_results for insert with check (true);
```

---

## STEP 2: Add Supabase Environment Variables

### Local development

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get these from: Supabase dashboard → Project Settings → API.

### Vercel (production)

1. Go to https://vercel.com → jetpackers-ai project → **Settings → Environment Variables**
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
3. Click **Save**, then **Redeploy**

---

## STEP 3: Connect Custom Domain

1. Vercel dashboard → jetpackers-ai → **Settings → Domains**
2. Add `jetpackersai.com`
3. Follow the DNS instructions (add CNAME or A record at your registrar)
4. Also add `www.jetpackersai.com` → redirect to root

---

## Development Workflow

```bash
cd C:\Users\summe\Projects\jetpackers-ai
npm run dev          # http://localhost:3000
npm run build        # test production build
git add .
git commit -m "your message"
git push             # Vercel auto-deploys on push
```

---

## Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `coming-soon/page.tsx` | Landing page — Vinyl & Vibealong waitlist + email capture |
| `/quiz` | `quiz/page.tsx` + `quiz/QuizClient.tsx` | "What's Your AI Vibe?" 7-question quiz |
| `/privacy` | `privacy/page.tsx` | Privacy policy |
| `/terms` | `terms/page.tsx` | Terms of use |

---

## Things to Update When Date is Set

1. **Landing page** — `src/app/coming-soon/page.tsx`
   - Change `Weekend Session · Date TBA` to the actual date
   - Update the "Reserve My Spot" section copy

2. **Quiz results CTA** — `src/app/quiz/QuizClient.tsx`
   - Update the Vibe-A-Long blurb with the confirmed date

---

## Colour Palette

| Name | Hex | Usage |
|------|-----|-------|
| Deep Indigo | `#1E1B4B` | Background base |
| Vivid Purple | `#6B21A8` | Borders, accents |
| Hot Pink | `#EC4899` | Primary CTA, headings |
| Electric Teal | `#0D9488` | Secondary accents, labels |

---

## Contact / Social to Add Later

- Contact email: `hello@jetpackersai.com` (or `hello@theypromisedusjetpacks.com`)
- Facebook: `@TheyPromisedUsJetpacks`
- Substack: update `vetaihub.substack.com` links in privacy/terms pages once a dedicated Substack is set up
