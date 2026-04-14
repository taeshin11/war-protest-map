interface Protest {
  conflict_label: string
  estimated_size: number
}

export default function StatsBar({ protests }: { protests: Protest[] }) {
  const byConflict: Record<string, number> = {}
  protests.forEach(p => {
    byConflict[p.conflict_label] = (byConflict[p.conflict_label] || 0) + 1
  })
  const totalParticipants = protests.reduce((s, p) => s + p.estimated_size, 0)

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex flex-wrap gap-6 items-center">
        <div>
          <span className="text-2xl font-bold text-gray-900">{protests.length}</span>
          <span className="text-sm text-gray-500 ml-1">total protests</span>
        </div>
        <div>
          <span className="text-2xl font-bold text-gray-900">{(totalParticipants / 1000000).toFixed(1)}M</span>
          <span className="text-sm text-gray-500 ml-1">estimated participants</span>
        </div>
        {Object.entries(byConflict).map(([label, count]) => (
          <div key={label} className="flex items-center gap-1">
            <span className="text-sm font-medium text-gray-700">{label}:</span>
            <span className="text-sm text-gray-900 font-bold">{count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
