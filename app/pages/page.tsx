'use client'

import DashboardLayout from '@/components/DashboardLayout'
import PageViewsChart from '@/components/PageViewsChart'
import UniqueVisitorsChart from '@/components/UniqueVisitorsChart'
import BounceRateChart from '@/components/BounceRateChart'
import { generateDailyStats, getTopPages } from '@/lib/mockData'

export default function PagesPage() {
  const dailyStats = generateDailyStats()
  const topPages = getTopPages()

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Pages</h1>
          <p className="mt-1 text-slate-600">
            Análise de desempenho por página
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <PageViewsChart data={dailyStats} />
          <UniqueVisitorsChart data={dailyStats} />
        </div>

        <BounceRateChart data={dailyStats} />

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Top Pages
            </h3>
            <p className="text-sm text-slate-500">
              Páginas mais visitadas (dados de demonstração)
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Página
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Page Views
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Unique Visitors
                  </th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page) => (
                  <tr
                    key={page.path}
                    className="border-b border-slate-100 transition-colors hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {page.path || '/'}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {page.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {page.visitors.toLocaleString()}
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
