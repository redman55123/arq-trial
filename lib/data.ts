export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  url?: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  slug: string
  date: string
  readingTime: string
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce solution with cart, checkout, and admin dashboard.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    url: '#',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative task management with real-time updates and Kanban boards.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop',
    tags: ['React', 'Node.js', 'WebSocket'],
    url: '#',
  },
  {
    id: '3',
    title: 'Analytics Dashboard',
    description: 'Real-time analytics visualization with interactive charts and reports.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    tags: ['TypeScript', 'D3.js', 'Firebase'],
    url: '#',
  },
  {
    id: '4',
    title: 'Mobile Fitness Tracker',
    description: 'Cross-platform mobile app for tracking workouts and nutrition.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=500&fit=crop',
    tags: ['React Native', 'GraphQL'],
    url: '#',
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable React Applications',
    excerpt: 'Learn the best practices and patterns for building applications that grow with your needs.',
    slug: 'building-scalable-react-applications',
    date: '2024-02-25',
    readingTime: '8 min read',
  },
  {
    id: '2',
    title: 'The Art of Clean Code',
    excerpt: 'Why writing readable code matters more than clever solutions.',
    slug: 'the-art-of-clean-code',
    date: '2024-02-20',
    readingTime: '5 min read',
  },
  {
    id: '3',
    title: 'Understanding TypeScript Generics',
    excerpt: 'A deep dive into generic types and how they improve type safety.',
    slug: 'understanding-typescript-generics',
    date: '2024-02-15',
    readingTime: '12 min read',
  },
  {
    id: '4',
    title: 'CSS in the Age of Tailwind',
    excerpt: 'How utility-first CSS changed the way we style components.',
    slug: 'css-in-the-age-of-tailwind',
    date: '2024-02-10',
    readingTime: '6 min read',
  },
]
