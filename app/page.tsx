import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ProjectsShowcase from '@/components/ProjectsShowcase'
import BlogPreview from '@/components/BlogPreview'
import { projects, blogPosts } from '@/lib/data'

export default function Home() {
  const latestPost = blogPosts[0]

  return (
    <>
      <Header />
      <main>
        <HeroSection projects={projects} latestPost={latestPost} />
        <div id="projects">
          <ProjectsShowcase projects={projects} />
        </div>
        <BlogPreview posts={blogPosts} />
      </main>
    </>
  )
}
