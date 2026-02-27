// Mock data for website traffic analytics dashboard

export interface DailyStats {
  date: string
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
}

export interface TrafficSource {
  name: string
  value: number
  color: string
}

export interface PageStats {
  path: string
  views: number
  visitors: number
}

export interface RealtimeVisitor {
  id: string
  page: string
  duration: number
  source: string
}

// Generate last 30 days of mock data
export function generateDailyStats(): DailyStats[] {
  const stats: DailyStats[] = []
  const today = new Date()
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    stats.push({
      date: date.toISOString().split('T')[0],
      pageViews: Math.floor(Math.random() * 2000) + 800,
      uniqueVisitors: Math.floor(Math.random() * 1200) + 400,
      bounceRate: Math.floor(Math.random() * 30) + 25,
    })
  }
  
  return stats
}

// Traffic sources mock data
export function getTrafficSources(): TrafficSource[] {
  return [
    { name: 'Organic Search', value: 45, color: '#3b82f6' },
    { name: 'Direct', value: 28, color: '#10b981' },
    { name: 'Social Media', value: 15, color: '#f59e0b' },
    { name: 'Referral', value: 8, color: '#8b5cf6' },
    { name: 'Email', value: 4, color: '#ec4899' },
  ]
}

// Top pages mock data
export function getTopPages(): PageStats[] {
  return [
    { path: '/', views: 12450, visitors: 8234 },
    { path: '/products', views: 8920, visitors: 6120 },
    { path: '/about', views: 5670, visitors: 4230 },
    { path: '/blog', views: 4450, visitors: 3340 },
    { path: '/contact', views: 2890, visitors: 2150 },
    { path: '/pricing', views: 2340, visitors: 1780 },
  ]
}

// Real-time visitors mock data
export function getRealtimeVisitors(): RealtimeVisitor[] {
  const pages = ['/', '/products', '/blog', '/about']
  const sources = ['Google', 'Direct', 'Twitter', 'LinkedIn']
  const visitors: RealtimeVisitor[] = []
  
  for (let i = 0; i < 12; i++) {
    visitors.push({
      id: `visitor-${i + 1}`,
      page: pages[Math.floor(Math.random() * pages.length)],
      duration: Math.floor(Math.random() * 180) + 10,
      source: sources[Math.floor(Math.random() * sources.length)],
    })
  }
  
  return visitors
}

// Aggregate stats for metric cards
export function getAggregateStats(dailyStats: DailyStats[]) {
  const last7Days = dailyStats.slice(-7)
  const last30Days = dailyStats
  
  const totalPageViews = last30Days.reduce((sum, d) => sum + d.pageViews, 0)
  const totalVisitors = last30Days.reduce((sum, d) => sum + d.uniqueVisitors, 0)
  const avgBounceRate = last30Days.length > 0
    ? Math.round(last30Days.reduce((sum, d) => sum + d.bounceRate, 0) / last30Days.length)
    : 0
  
  const weekPageViews = last7Days.reduce((sum, d) => sum + d.pageViews, 0)
  const weekVisitors = last7Days.reduce((sum, d) => sum + d.uniqueVisitors, 0)
  const weekBounceRate = last7Days.length > 0
    ? Math.round(last7Days.reduce((sum, d) => sum + d.bounceRate, 0) / last7Days.length)
    : 0
  
  return {
    pageViews: { total: totalPageViews, week: weekPageViews },
    uniqueVisitors: { total: totalVisitors, week: weekVisitors },
    bounceRate: { total: avgBounceRate, week: weekBounceRate },
  }
}
