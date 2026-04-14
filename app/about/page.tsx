export const metadata = {
  title: 'About | War Protest Map',
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">About War Protest Map</h1>
      <div className="prose prose-gray">
        <p className="text-gray-600 mb-4">
          War Protest Map is an independent tracker of anti-war protests, peace marches, and solidarity demonstrations worldwide.
          We document public expressions of dissent and solidarity related to ongoing armed conflicts.
        </p>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Methodology</h2>
        <p className="text-gray-600 mb-4">
          Events are sourced from reputable news organizations, NGO reports, and protest organizers' official communications.
          Crowd size estimates are taken from organizer reports, police estimates, or credible media coverage. We note the
          most commonly cited figure and attribute it clearly.
        </p>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Scope</h2>
        <p className="text-gray-600 mb-4">
          We track significant protests (typically 1,000+ participants) related to active armed conflicts globally.
          Events span anti-war, solidarity, and resistance movements across all conflicts we monitor.
        </p>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Data Sources</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Reuters, AP, AFP wire services</li>
          <li>BBC, DW, Al Jazeera, France 24</li>
          <li>National newspapers (Guardian, Le Monde, etc.)</li>
          <li>Protest organizer official statements</li>
          <li>Academic crowd size research</li>
        </ul>
      </div>
    </div>
  )
}
