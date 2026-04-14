import protests from '@/public/data/protests.json'
import { setRequestLocale } from 'next-intl/server'

export const metadata = {
  title: 'Protest Heatmap — Monthly Frequency | War Protest Map',
}

export default async function HeatmapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  // Build month-year grid
  const counts: Record<string, number> = {}
  protests.forEach(p => {
    const key = p.date.slice(0, 7) // YYYY-MM
    counts[key] = (counts[key] || 0) + 1
  })

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const years = Array.from(new Set(protests.map(p => p.date.slice(0, 4)))).sort()

  const maxCount = Math.max(...Object.values(counts), 1)

  function getColor(count: number) {
    if (!count) return 'bg-gray-100 text-gray-300'
    const intensity = count / maxCount
    if (intensity > 0.7) return 'bg-red-600 text-white'
    if (intensity > 0.4) return 'bg-red-400 text-white'
    if (intensity > 0.2) return 'bg-red-200 text-red-800'
    return 'bg-red-100 text-red-600'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Protest Frequency Heatmap</h1>
      <p className="text-gray-500 mb-6">Monthly protest activity across all tracked conflicts.</p>
      <div className="bg-white border border-gray-200 rounded-lg p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left text-gray-500 font-medium pr-4 pb-2">Year</th>
              {months.map(m => <th key={m} className="text-center text-gray-500 font-medium px-1 pb-2 w-16">{m}</th>)}
            </tr>
          </thead>
          <tbody>
            {years.map(year => (
              <tr key={year}>
                <td className="text-gray-700 font-medium pr-4 py-1">{year}</td>
                {months.map((_, i) => {
                  const month = String(i + 1).padStart(2, '0')
                  const key = `${year}-${month}`
                  const count = counts[key] || 0
                  return (
                    <td key={month} className="px-1 py-1">
                      <div className={`rounded text-center text-xs font-medium py-2 px-1 ${getColor(count)}`} title={`${year}-${month}: ${count} protests`}>
                        {count || ''}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center gap-3 mt-4 text-xs text-gray-500">
          <span>Intensity:</span>
          <span className="bg-gray-100 px-2 py-1 rounded">0</span>
          <span className="bg-red-100 px-2 py-1 rounded text-red-600">1-2</span>
          <span className="bg-red-200 px-2 py-1 rounded text-red-800">3-4</span>
          <span className="bg-red-400 px-2 py-1 rounded text-white">5-7</span>
          <span className="bg-red-600 px-2 py-1 rounded text-white">8+</span>
        </div>
      </div>
    </div>
  )
}
