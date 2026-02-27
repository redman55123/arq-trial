'use client'

import DashboardLayout from '@/components/DashboardLayout'
import MetricCard from '@/components/MetricCard'
import PageViewsChart from '@/components/PageViewsChart'
import UniqueVisitorsChart from '@/components/UniqueVisitorsChart'
import BounceRateChart from '@/components/BounceRateChart'
import TrafficSourcesChart from '@/components/TrafficSourcesChart'
import {
  generateDailyStats,
  getTrafficSources,
  getAggregateStats,
} from '@/lib/mockData'

export default function OverviewPage() {
  const dailyStats = generateDailyStats()
  const trafficSources = getTrafficSources()
  const aggregate = getAggregateStats(dailyStats)

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Overview</h1>
          <p className="mt-1 text-slate-600">
            Visão geral do tráfego do site nos últimos 30 dias
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="Page Views"
            value={aggregate.pageViews.total.toLocaleString()}
            subtitle="Últimos 30 dias"
            trend="up"
            trendValue={`${aggregate.pageViews.week.toLocaleString()} esta semana`}
            icon="📄"
          />
          <MetricCard
            title="Unique Visitors"
            value={aggregate.uniqueVisitors.total.toLocaleString()}
            subtitle="Últimos 30 dias"
            trend="up"
            trendValue={`${aggregate.uniqueVisitors.week.toLocaleString()} esta semana`}
            icon="👥"
          />
          <MetricCard
            title="Bounce Rate"
            value={`${aggregate.bounceRate.total}%`}
            subtitle="Média dos últimos 30 dias"
            trend="down"
            trendValue={`${aggregate.bounceRate.week}% esta semana`}
            icon="↩️"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <PageViewsChart data={dailyStats} />
          <UniqueVisitorsChart data={dailyStats} />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <BounceRateChart data={dailyStats} />
          <TrafficSourcesChart data={trafficSources} />
        </div>
      </div>
    </DashboardLayout>
  )
}
