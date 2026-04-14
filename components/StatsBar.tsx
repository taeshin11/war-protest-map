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
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5 mb-6">
      <div className="flex flex-wrap gap-6 items-center">
        <div className="text-center">
          <div className="text-2xl font-extrabold text-pink-500">{protests.length}</div>
          <div className="text-xs text-slate-400 mt-0.5">total protests</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-extrabold text-pink-500">{(totalParticipants / 1000000).toFixed(1)}M</div>
          <div className="text-xs text-slate-400 mt-0.5">participants</div>
        </div>
        {Object.entries(byConflict).map(([label, count]) => (
          <div key={label} className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-600 ring-1 ring-inset ring-pink-500/20">{label}</span>
            <span className="text-sm font-bold text-slate-800">{count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
