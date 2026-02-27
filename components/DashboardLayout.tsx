'use client'

import Sidebar from './Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <main className="min-h-screen p-6 pt-20 lg:ml-64 lg:pt-8 lg:p-10">
        {children}
      </main>
    </div>
  )
}
