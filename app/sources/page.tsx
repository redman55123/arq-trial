'use client'

import DashboardLayout from '@/components/DashboardLayout'
import TrafficSourcesChart from '@/components/TrafficSourcesChart'
import MetricCard from '@/components/MetricCard'
import { getTrafficSources } from '@/lib/mockData'

export default function SourcesPage() {
  const trafficSources = getTrafficSources()

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Sources</h1>
          <p className="mt-1 text-slate-600">
            Origem do tráfego do seu site
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="Organic Search"
            value={`${trafficSources[0]?.value || 0}%`}
            subtitle="Principal fonte"
            icon="🔍"
          />
          <MetricCard
            title="Direct Traffic"
            value={`${trafficSources[1]?.value || 0}%`}
            subtitle="Acesso direto"
            icon="🏠"
          />
          <MetricCard
            title="Social Media"
            value={`${trafficSources[2]?.value || 0}%`}
            subtitle="Redes sociais"
            icon="📱"
          />
        </div>

        <TrafficSourcesChart data={trafficSources} />

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Detalhamento por fonte
            </h3>
            <p className="text-sm text-slate-500">
              Percentual de tráfego por canal (dados de demonstração)
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {trafficSources.map((source) => (
                <div key={source.name} className="flex items-center gap-4">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: source.color }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-900">
                        {source.name}
                      </span>
                      <span className="text-slate-600">{source.value}%</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${source.value}%`,
                          backgroundColor: source.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
