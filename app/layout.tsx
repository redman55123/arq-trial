import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Website Traffic Dashboard',
  description: 'Dashboard for visualizing website traffic analytics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased min-h-screen bg-slate-50">{children}</body>
    </html>
  )
}
