import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.jetpackersai.com'
  return [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/sign-up`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/quiz`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
