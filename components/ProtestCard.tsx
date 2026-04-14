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
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 group">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{protest.country_flag}</span>
          <div>
            <h3 className="font-semibold text-slate-900">{protest.city}</h3>
            <p className="text-xs text-slate-400">{protest.country}</p>
          </div>
        </div>
        <span className="text-xs text-slate-400 font-medium whitespace-nowrap bg-slate-50 px-2 py-1 rounded-lg">{protest.date}</span>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-600 ring-1 ring-inset ring-pink-500/20">{protest.conflict_label}</span>
        <TypeBadge type={protest.type} />
      </div>
      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{protest.description}</p>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">{protest.estimated_size.toLocaleString()} estimated</span>
        <a href={protest.source_url} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 font-medium transition-colors">{protest.source}</a>
      </div>
      <p className="text-xs text-slate-400 mt-1.5">Organizer: {protest.organizer}</p>
      <Link href={`/protest/${protest.id}`} className="mt-3 text-xs text-pink-600 hover:text-pink-700 font-semibold block transition-colors">View details →</Link>
    </div>
  )
}
