import Link from 'next/link'
import type { BlogPost } from '@/lib/data'

interface BlogPreviewProps {
  posts: BlogPost[]
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-stone-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-sm font-medium text-stone-500 uppercase tracking-wider">
            Artigos do Blog
          </h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
          >
            Ver todos →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.slice(0, 4).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-300 hover:shadow-md transition-all duration-200"
            >
              <span className="text-xs text-stone-400">{post.date}</span>
              <h3 className="font-semibold text-stone-900 mt-2 line-clamp-2 hover:text-amber-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-stone-600 mt-1 line-clamp-2">{post.excerpt}</p>
              <span className="inline-block mt-3 text-sm text-stone-400">{post.readingTime}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
