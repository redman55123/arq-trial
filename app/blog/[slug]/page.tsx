import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import { blogPosts } from '@/lib/data'

interface BlogPostPageProps {
  params: { slug: string }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="py-16 px-4 sm:px-6 lg:px-8">
        <article className="max-w-2xl mx-auto">
          <Link
            href="/blog"
            className="text-sm text-amber-600 hover:text-amber-700 mb-8 inline-block"
          >
            ← Voltar ao blog
          </Link>
          <header className="mb-12">
            <span className="text-sm text-stone-400">{post.date} · {post.readingTime}</span>
            <h1 className="text-3xl font-bold text-stone-900 mt-2">{post.title}</h1>
          </header>
          <div className="prose prose-stone max-w-none">
            <p className="text-stone-600 leading-relaxed">{post.excerpt}</p>
            <p className="text-stone-600 leading-relaxed mt-4">
              Este é um artigo de exemplo. Em um projeto real, o conteúdo seria carregado de um CMS
              ou arquivos Markdown. O design minimalista permite focar no conteúdo e na experiência
              de leitura.
            </p>
            <p className="text-stone-600 leading-relaxed mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </article>
      </main>
    </>
  )
}
