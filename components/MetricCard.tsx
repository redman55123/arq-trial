'use client'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: 'up' | 'down'
  trendValue?: string
  icon?: string
}

export default function MetricCard({ title, value, subtitle, trend, trendValue, icon }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
          )}
          {trend && trendValue && (
            <span
              className={`mt-2 inline-flex items-center text-sm font-medium ${
                trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {trend === 'up' ? '↑' : '↓'} {trendValue}
            </span>
          )}
        </div>
        {icon && (
          <span className="rounded-lg bg-slate-100 p-3 text-2xl">{icon}</span>
        )}
      </div>
    </div>
  )
}
