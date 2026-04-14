import protests from '@/public/data/protests.json'
import ProtestCard from '@/components/ProtestCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'

export async function generateStaticParams() {
  const slugs = Array.from(new Set(protests.map(p => p.conflict)))
  return routing.locales.flatMap(locale => slugs.map(slug => ({ locale, slug })))
}

export default async function ConflictPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const conflictProtests = protests.filter(p => p.conflict === slug).sort((a, b) => b.date.localeCompare(a.date))
  if (conflictProtests.length === 0) notFound()
  const label = conflictProtests[0].conflict_label

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href={`/${locale}`} className="text-sm text-blue-600 hover:underline mb-4 block">← Back to all protests</Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">{label}</h1>
      <p className="text-gray-500 mb-6">{conflictProtests.length} protest events recorded for this conflict</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {conflictProtests.map(p => <ProtestCard key={p.id} protest={p} locale={locale} />)}
      </div>
    </div>
  )
}
