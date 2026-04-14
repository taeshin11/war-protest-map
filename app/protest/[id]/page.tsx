import protests from '@/public/data/protests.json'
import TypeBadge from '@/components/TypeBadge'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return protests.map(p => ({ id: p.id }))
}

export default async function ProtestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const protest = protests.find(p => p.id === id)
  if (!protest) notFound()

  return (
    <div className="max-w-2xl">
      <Link href="/" className="text-sm text-blue-600 hover:underline mb-4 block">← Back to all protests</Link>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{protest.country_flag}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{protest.city}, {protest.country}</h1>
            <p className="text-gray-500">{protest.date}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">{protest.conflict_label}</span>
          <TypeBadge type={protest.type} />
        </div>
        <p className="text-gray-700 mb-4">{protest.description}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="font-medium text-gray-600">Estimated Size:</span><br /><span className="text-lg font-bold text-gray-900">🧑 {protest.estimated_size.toLocaleString()}</span></div>
          <div><span className="font-medium text-gray-600">Organizer:</span><br /><span className="text-gray-900">{protest.organizer}</span></div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <a href={protest.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">Source: {protest.source} →</a>
        </div>
        {protest.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {protest.tags.map(tag => <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">#{tag}</span>)}
          </div>
        )}
      </div>
    </div>
  )
}
