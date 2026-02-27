'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { href: '/', label: 'Overview', icon: '📊' },
  { href: '/realtime', label: 'Real-time', icon: '⚡' },
  { href: '/pages', label: 'Pages', icon: '📄' },
  { href: '/sources', label: 'Sources', icon: '🔗' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-slate-900 p-2 text-white shadow-lg lg:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? '✕' : '☰'}
      </button>
      <div
        className={`fixed inset-0 z-40 bg-black/50 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 bg-slate-900 text-white shadow-xl transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b border-slate-700 px-6">
            <h1 className="text-xl font-bold tracking-tight">Traffic Dashboard</h1>
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="border-t border-slate-700 p-4">
            <p className="text-xs text-slate-500">Website Traffic Analytics v1.0</p>
          </div>
        </div>
      </aside>
    </>
  )
}
