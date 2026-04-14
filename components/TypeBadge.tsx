const typeStyles: Record<string, string> = {
  'anti-war': 'bg-blue-100 text-blue-700',
  'solidarity-gaza': 'bg-green-100 text-green-700',
  'solidarity-ukraine': 'bg-yellow-100 text-yellow-700',
  'solidarity-sudan': 'bg-amber-100 text-amber-700',
  'resistance': 'bg-orange-100 text-orange-700',
  'pro-government': 'bg-gray-100 text-gray-700',
  'pro-war': 'bg-red-100 text-red-700',
}
const typeLabels: Record<string, string> = {
  'anti-war': 'Anti-War',
  'solidarity-gaza': 'Gaza Solidarity',
  'solidarity-ukraine': 'Ukraine Solidarity',
  'solidarity-sudan': 'Sudan Solidarity',
  'resistance': 'Resistance',
  'pro-government': 'Pro-Government',
  'pro-war': 'Pro-War',
}
export default function TypeBadge({ type }: { type: string }) {
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeStyles[type] || 'bg-gray-100 text-gray-600'}`}>
      {typeLabels[type] || type}
    </span>
  )
}
