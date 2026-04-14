'use client'
import { useState, useEffect } from 'react'

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

interface FilterBarProps {
  protests: Protest[]
  onFilter: (filtered: Protest[]) => void
}

export default function FilterBar({ protests, onFilter }: FilterBarProps) {
  const [conflict, setConflict] = useState('')
  const [country, setCountry] = useState('')
  const [type, setType] = useState('')

  const conflicts = Array.from(new Set(protests.map(p => p.conflict_label))).sort()
  const countries = Array.from(new Set(protests.map(p => p.country))).sort()
  const types = Array.from(new Set(protests.map(p => p.type))).sort()

  useEffect(() => {
    let filtered = [...protests]
    if (conflict) filtered = filtered.filter(p => p.conflict_label === conflict)
    if (country) filtered = filtered.filter(p => p.country === country)
    if (type) filtered = filtered.filter(p => p.type === type)
    onFilter(filtered)
  }, [conflict, country, type, protests, onFilter])

  return (
    <div className="flex flex-wrap gap-3 mb-6 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
      <select value={conflict} onChange={e => setConflict(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-slate-50">
        <option value="">All Conflicts</option>
        {conflicts.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={country} onChange={e => setCountry(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-slate-50">
        <option value="">All Countries</option>
        {countries.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={type} onChange={e => setType(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-slate-50">
        <option value="">All Types</option>
        {types.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      {(conflict || country || type) && (
        <button onClick={() => { setConflict(''); setCountry(''); setType('') }} className="text-sm text-pink-600 hover:text-pink-700 font-semibold px-3 py-2 rounded-xl hover:bg-pink-50 transition-colors">
          Clear filters
        </button>
      )}
    </div>
  )
}
