'use client'
import { useState, useCallback } from 'react'
import FilterBar from './FilterBar'
import ProtestCard from './ProtestCard'
import StatsBar from './StatsBar'

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

export default function ProtestGrid({ protests, locale = 'en' }: { protests: Protest[]; locale?: string }) {
  const [filtered, setFiltered] = useState<Protest[]>(protests)
  const handleFilter = useCallback((f: Protest[]) => setFiltered(f), [])

  return (
    <>
      <StatsBar protests={filtered} />
      <FilterBar protests={protests} onFilter={handleFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 && <p className="col-span-3 text-center text-gray-400 py-12">No protests match your filters.</p>}
        {filtered.map(p => <ProtestCard key={p.id} protest={p} locale={locale} />)}
      </div>
    </>
  )
}
