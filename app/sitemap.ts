import { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://war-protest-map.vercel.app', lastModified: new Date() },
    { url: 'https://war-protest-map.vercel.app/heatmap', lastModified: new Date() },
    { url: 'https://war-protest-map.vercel.app/about', lastModified: new Date() },
  ]
}
