import protests from '@/public/data/protests.json'
import ProtestGrid from '@/components/ProtestGrid'

export default function Home() {
  const sorted = [...protests].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Anti-War Protest Tracker</h1>
      <p className="text-gray-500 mb-6">Global database of anti-war protests, solidarity marches, and peace demonstrations.</p>
      <ProtestGrid protests={sorted} />
    </div>
  )
}
