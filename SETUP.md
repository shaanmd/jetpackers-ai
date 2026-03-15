# SynAIpse Website — Setup Guide
## Cursor → GitHub → Vercel

---

## STEP 1: Create GitHub Repository

1. Go to https://github.com/new
2. Name it: `synaipse-website`
3. Set to **Private** (you can make it public later)
4. **Do NOT** tick "Add a README" — leave it empty
5. Click **Create repository**
6. Copy the repo URL — it will look like:  
   `https://github.com/YOUR_USERNAME/synaipse-website.git`

---

## STEP 2: Open in Cursor

1. Open **Cursor**
2. Go to **File → Open Folder**
3. Navigate to and open the `synaipse-website` folder

You should see this structure in the sidebar:
```
synaipse-website/
├── public/
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Nav.tsx
│       ├── Hero.tsx
│       ├── Founders.tsx
│       ├── MissionQuote.tsx
│       ├── WhatWeShare.tsx
│       ├── WhatWeBuilt.tsx
│       ├── Subscribe.tsx
│       └── Footer.tsx
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## STEP 3: Install Dependencies

Open the **Terminal** in Cursor (View → Terminal or `` Ctrl+` ``):

```bash
npm install
```

Wait for it to finish, then test it locally:

```bash
npm run dev
```

Open http://localhost:3000 in your browser. You should see the SynAIpse website. Press `Ctrl+C` to stop.

---

## STEP 4: Push to GitHub

In the Cursor terminal:

```bash
# Initialise git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit — SynAIpse website"

# Connect to your GitHub repo (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/synaipse-website.git

# Push
git branch -M main
git push -u origin main
```

**If you get an authentication error:** GitHub requires a Personal Access Token (not your password).
1. Go to https://github.com/settings/tokens
2. Click **Generate new token (classic)**
3. Tick **repo** (all checkboxes under it)
4. Copy the token
5. When git asks for a password, paste the token

---

## STEP 5: Deploy to Vercel

1. Go to https://vercel.com and sign in (use your GitHub account)
2. Click **Add New → Project**
3. Click **Import** next to `synaipse-website`
4. Leave all settings as default — Vercel detects Next.js automatically
5. Click **Deploy**

Vercel will build and deploy. Takes about 60 seconds. You'll get a live URL like:  
`https://synaipse-website.vercel.app`

---

## STEP 6: Add a Custom Domain (Optional — do before March 12)

If you have `synaipse.com` or similar:

1. In Vercel dashboard → your project → **Settings → Domains**
2. Add your domain
3. Follow the DNS instructions (usually just adding a CNAME record)
4. Takes 5–30 minutes to propagate

---

## Future Deployments

Every time you push to GitHub, Vercel auto-deploys. The workflow is just:

```bash
git add .
git commit -m "your message"
git push
```

---

## Things to Update Before Going Live

Search for these placeholders and replace with real URLs:

| Placeholder | What to put there |
|---|---|
| `https://vetaihub.substack.com/` | Your actual Substack URL |
| `https://linkedin.com/company/synaipse` | Your LinkedIn Company Page URL |
| `https://youtube.com/@synaipse` | Your YouTube channel URL |

All three appear in `Nav.tsx`, `Subscribe.tsx`, and `Footer.tsx`.

---

## If You Want to Make Changes in Cursor

The most common edits:

- **Change text content** → edit the relevant component file
- **Change colours** → colours are CSS variables in `globals.css` and inline styles
- **Add a new section** → create a new file in `src/components/`, import it in `src/app/page.tsx`
- **Change the tagline** → `src/components/Hero.tsx`, the `<h1>` block

For bigger changes, paste the relevant component into Cursor's Composer (Cmd+I) and describe what you want.
