import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/lib/data'

interface ProjectsShowcaseProps {
  projects: Project[]
}

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-stone-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-8">
          Todos os Projetos
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group rounded-xl overflow-hidden border border-stone-200 bg-white hover:shadow-lg hover:border-stone-300 transition-all duration-200"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-stone-900 group-hover:text-amber-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-stone-600 mt-1 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded bg-stone-100 text-stone-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.url && (
                  <Link
                    href={project.url}
                    className="inline-block mt-3 text-sm font-medium text-amber-600 hover:text-amber-700"
                  >
                    Ver projeto →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
