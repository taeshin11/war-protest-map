import protests from '@/public/data/protests.json'
import ProtestCard from '@/components/ProtestCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'

export async function generateStaticParams() {
  const codes = Array.from(new Set(protests.map(p => p.country_code)))
  return routing.locales.flatMap(locale => codes.map(code => ({ locale, code })))
}

export default async function CountryPage({ params }: { params: Promise<{ locale: string; code: string }> }) {
  const { locale, code } = await params
  setRequestLocale(locale)

  const countryProtests = protests.filter(p => p.country_code === code).sort((a, b) => b.date.localeCompare(a.date))
  if (countryProtests.length === 0) notFound()
  const { country, country_flag } = countryProtests[0]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href={`/${locale}`} className="text-sm text-blue-600 hover:underline mb-4 block">← Back to all protests</Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">{country_flag} {country}</h1>
      <p className="text-gray-500 mb-6">{countryProtests.length} protest events recorded</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {countryProtests.map(p => <ProtestCard key={p.id} protest={p} locale={locale} />)}
      </div>
    </div>
  )
}
