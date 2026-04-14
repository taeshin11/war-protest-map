import protests from '@/public/data/protests.json'
import ProtestGrid from '@/components/ProtestGrid'

export default function Home() {
  const sorted = [...protests].sort((a, b) => b.date.localeCompare(a.date))
  const totalParticipants = protests.reduce((s: number, p: { estimated_size: number }) => s + p.estimated_size, 0)
  const countries = new Set(protests.map((p: { country: string }) => p.country)).size
  const conflicts = new Set(protests.map((p: { conflict_label: string }) => p.conflict_label)).size

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-pink-500 text-xs font-bold uppercase tracking-widest mb-3">LIVE INTELLIGENCE</p>
          <h1 className="text-4xl font-extrabold mb-4">Anti-War Protest Tracker</h1>
          <p className="text-slate-300 text-lg max-w-2xl">Global database of anti-war protests, solidarity marches, and peace demonstrations worldwide.</p>
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
              <div className="text-2xl font-bold text-pink-400">{protests.length}</div>
              <div className="text-xs text-slate-400 mt-1">Total Protests</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
              <div className="text-2xl font-bold text-pink-400">{(totalParticipants / 1000000).toFixed(1)}M</div>
              <div className="text-xs text-slate-400 mt-1">Participants</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
              <div className="text-2xl font-bold text-pink-400">{countries}</div>
              <div className="text-xs text-slate-400 mt-1">Countries</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
              <div className="text-2xl font-bold text-pink-400">{conflicts}</div>
              <div className="text-xs text-slate-400 mt-1">Conflicts Tracked</div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProtestGrid protests={sorted} />
      </div>
    </div>
  )
}
