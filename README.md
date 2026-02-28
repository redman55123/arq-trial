# Portfolio Website

Personal portfolio website with an interactive project carousel in the hero section, featuring projects alongside the latest blog post. Built with Next.js 14 and Tailwind CSS.

## Features

- **Hero Section**: Interactive project carousel displaying featured projects with autoplay, navigation arrows, and dot indicators
- **Latest Blog Post**: Featured in hero section alongside the project carousel
- **Projects Showcase**: Grid display of all projects with images and tags
- **Blog Section**: Integrated blog preview with link to full listing
- **Blog Listing Page**: Full list of all articles at `/blog`
- **Blog Post Pages**: Individual article pages at `/blog/[slug]`
- **Minimal Design**: Clean, focused layout without extra sections (no about/skills/testimonials/contact)

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- TypeScript

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Project Structure

- `app/` - App Router pages and layout
- `components/` - Reusable React components
- `lib/` - Data and utilities
