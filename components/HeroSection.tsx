'use client'

import Link from 'next/link'
import ProjectCarousel from './ProjectCarousel'
import type { Project, BlogPost } from '@/lib/data'

interface HeroSectionProps {
  projects: Project[]
  latestPost: BlogPost
}

export default function HeroSection({ projects, latestPost }: HeroSectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Project Carousel - takes 2/3 on large screens */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-4">
              Projetos em Destaque
            </h2>
            <ProjectCarousel projects={projects} />
          </div>

          {/* Latest Blog Post - takes 1/3 on large screens */}
          <div className="lg:col-span-1">
            <h2 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-4">
              Último Artigo
            </h2>
            <Link
              href={`/blog/${latestPost.slug}`}
              className="block p-6 rounded-xl border border-stone-200 bg-white hover:border-stone-300 hover:shadow-md transition-all duration-200 h-full"
            >
              <span className="text-xs text-stone-400">{latestPost.date} · {latestPost.readingTime}</span>
              <h3 className="text-lg font-semibold text-stone-900 mt-2 mb-2 line-clamp-2 hover:text-amber-600 transition-colors">
                {latestPost.title}
              </h3>
              <p className="text-sm text-stone-600 line-clamp-3">{latestPost.excerpt}</p>
              <span className="inline-block mt-4 text-sm font-medium text-amber-600 hover:text-amber-700">
                Ler artigo →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
