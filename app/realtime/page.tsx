'use client'

import DashboardLayout from '@/components/DashboardLayout'
import MetricCard from '@/components/MetricCard'
import { getRealtimeVisitors } from '@/lib/mockData'

export default function RealtimePage() {
  const visitors = getRealtimeVisitors()

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Real-time</h1>
          <p className="mt-1 text-slate-600">
            Visitantes ativos neste momento
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="Active Visitors"
            value={visitors.length}
            subtitle="Agora"
            icon="⚡"
          />
          <MetricCard
            title="Most Viewed"
            value="/"
            subtitle="Página principal"
            icon="📄"
          />
          <MetricCard
            title="Avg. Session"
            value={`${Math.round(
              visitors.reduce((s, v) => s + v.duration, 0) / visitors.length
            )}s`}
            subtitle="Duração média"
            icon="⏱️"
          />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Visitantes em tempo real
            </h3>
            <p className="text-sm text-slate-500">
              Atualizando a cada 30 segundos (dados de demonstração)
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Página
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Duração
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Fonte
                  </th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((v) => (
                  <tr
                    key={v.id}
                    className="border-b border-slate-100 transition-colors hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 text-sm text-slate-900">{v.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{v.page}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {v.duration}s
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {v.source}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
