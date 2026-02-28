import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-stone-900 hover:text-amber-600 transition-colors">
            Portfolio
          </Link>
          <div className="flex gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              Início
            </Link>
            <Link
              href="/#projects"
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              Projetos
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              Blog
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
