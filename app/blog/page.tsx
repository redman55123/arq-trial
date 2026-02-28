import Link from 'next/link'
import Header from '@/components/Header'
import { blogPosts } from '@/lib/data'

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Blog</h1>
          <p className="text-stone-600 mb-12">Artigos sobre desenvolvimento e tecnologia.</p>

          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="border-b border-stone-200 pb-8 last:border-0 last:pb-0"
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <span className="text-sm text-stone-400">{post.date} · {post.readingTime}</span>
                  <h2 className="text-xl font-semibold text-stone-900 mt-2 group-hover:text-amber-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-stone-600 mt-2">{post.excerpt}</p>
                  <span className="inline-block mt-3 text-sm font-medium text-amber-600 group-hover:text-amber-700">
                    Ler artigo →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
