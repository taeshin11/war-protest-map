import Link from 'next/link'
import TypeBadge from './TypeBadge'

interface Protest {
  id: string
  date: string
  city: string
  country: string
  country_code: string
  country_flag: string
  conflict: string
  conflict_label: string
  type: string
  estimated_size: number
  organizer: string
  description: string
  source: string
  source_url: string
  tags: string[]
}

export default function ProtestCard({ protest }: { protest: Protest }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{protest.country_flag}</span>
          <div>
            <h3 className="font-semibold text-gray-900">{protest.city}</h3>
            <p className="text-xs text-gray-500">{protest.country}</p>
          </div>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap">{protest.date}</span>
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">{protest.conflict_label}</span>
        <TypeBadge type={protest.type} />
      </div>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{protest.description}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>🧑 {protest.estimated_size.toLocaleString()} estimated</span>
        <a href={protest.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{protest.source}</a>
      </div>
      <p className="text-xs text-gray-400 mt-1">Organizer: {protest.organizer}</p>
      <Link href={`/protest/${protest.id}`} className="mt-2 text-xs text-blue-600 hover:underline block">View details →</Link>
    </div>
  )
}
