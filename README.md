# Galih.dev - Portfolio & Blog

Personal portfolio website yang dibangun dengan **Astro** dan **MDX**, di-deploy ke **GitHub Pages**.

## Fitur

- **Homepage** dengan hero section, statistik, dan preview skill
- **About** - profil lengkap dengan body MDX
- **Blog** - daftar artikel + halaman post dinamis
- **Kontak** - link sosial media dan form mailto
- **Dark/Light theme** toggle dengan `localStorage`
- **Responsive design** dengan navigasi mobile
- **SEO-friendly** - sitemap, RSS feed, Open Graph meta
- **Animasi scroll** dengan `IntersectionObserver`

## Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Framework | [Astro](https://astro.build/) v5.11 |
| Content | [MDX](https://mdxjs.com/) via `@astrojs/mdx` |
| Bahasa | TypeScript |
| Styling | Vanilla CSS (custom properties) |
| Icons | [Font Awesome 6](https://fontawesome.com/) via CDN |
| Fonts | [Inter](https://fonts.google.com/specimen/Inter) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) |
| Deployment | GitHub Pages via GitHub Actions |

## Struktur Projek

```
├── .github/workflows/deploy.yml   # CI/CD untuk GitHub Pages
├── public/
│   └── favicon.svg                 # Logo favicon
├── src/
│   ├── components/                 # Komponen Astro (Header, Footer, dll)
│   ├── content/                    # Konten MDX (about, skills, projects, posts)
│   │   ├── config.ts               # Schema Zod untuk collection
│   │   ├── about/profile.mdx       # Konten About
│   │   ├── skills/                 # Skill cards (8 item)
│   │   ├── projects/               # Data project
│   │   └── posts/                  # Artikel blog
│   ├── layouts/
│   │   └── BaseLayout.astro        # Layout utama
│   ├── pages/                      # Routing halaman
│   ├── lib/
│   │   └── format.ts               # Utility format tanggal
│   └── styles/
│       └── global.css              # Semua styling
├── astro.config.mjs                # Konfigurasi Astro
├── tsconfig.json                   # Konfigurasi TypeScript
└── package.json
```

## Instalasi

### Prasyarat

- [Node.js](https://nodejs.org/) v20 atau lebih baru
- npm (atau package manager lain seperti pnpm/yarn)

### Langkah-langkah

```bash
# 1. Clone repository
git clone https://github.com/galihagussaputra/galihagussaputra.github.io.git
cd galihagussaputra.github.io

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Development server akan berjalan di `http://localhost:4321`.

### Script yang tersedia

| Command | Fungsi |
|---------|--------|
| `npm run dev` | Jalankan dev server dengan hot reload |
| `npm run build` | Build produksi ke folder `dist/` |
| `npm run preview` | Preview hasil build secara lokal |

## Modifikasi

### Mengubah Profil & About

Edit file `src/content/about/profile.mdx`. Semua konten ditulis dalam MDX, jadi kamu bisa menulis markup campuran Markdown + JSX.

### Menambah/Mengubah Skill

Tambahkan file `.mdx` baru di `src/content/skills/` dengan frontmatter seperti ini:

```mdx
---
title: Nama Skill
description: Deskripsi singkat skill ini
category: Frontend
icon: fa-brands fa-react
color: "#61DAFB"
order: 9
---

Deskripsi lengkap skill di sini...
```

### Menambah Project

Tambahkan file `.mdx` baru di `src/content/projects/`:

```mdx
---
title: Nama Project
description: Deskripsi project
icon: fa-solid fa-laptop-code
tags: ["tag1", "tag2"]
liveUrl: https://example.com
githubUrl: https://github.com/user/repo
featured: true
status: completed
order: 1
pubDate: 2025-01-01
---

Deskripsi lengkap project di sini...
```

### Menulis Blog Post

Buat file `.mdx` baru di `src/content/posts/`:

```mdx
---
title: Judul Artikel
description: Deskripsi singkat
pubDate: 2025-08-01
tags: ["astro", "web"]
draft: false
---

Konten artikel di sini menggunakan Markdown/MDX...
```

### Mengubah Tema Warna

Edit CSS custom properties di `src/styles/global.css`. Variabel utama yang perlu diubah:

```css
:root {
  --accent-gradient: linear-gradient(135deg, #4f46e5, #7c3aed);
  /* ... */
}
```

### Mengubah Konfigurasi Situs

Edit `astro.config.mjs` untuk mengubah `site`, `base`, atau menambah integrasi Astro lainnya.

## Deployment

Situs ini sudah dikonfigurasi untuk deploy otomatis ke **GitHub Pages** menggunakan **GitHub Actions**. Setiap push ke branch `main` akan trigger build dan deploy secara otomatis.

Jika kamu ingin menggunakan platform lain (Vercel, Netlify, dll), hapus atau nonaktifkan `.github/workflows/deploy.yml` dan ikuti dokumentasi deployment dari platform yang dipilih.

### Deploy ke Platform Lain

**Vercel:**
```bash
npm i -g vercel
vercel
```

**Netlify:**
- Hubungkan repository ke Netlify
- Set build command: `npm run build`
- Set publish directory: `dist`

## License

MIT
