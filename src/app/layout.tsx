import type { Metadata } from 'next'
import { Orbitron, DM_Sans } from 'next/font/google'
import './globals.css'
import CookieConsent from '@/components/CookieConsent'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-dm',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'They Promised Us Jetpacks | AI Education for GenX Women',
  description:
    "We grew up waiting for jetpacks. Now we're learning to fly AI instead. Dr Deb & Dr Shaan teach GenX women to actually use the tools everyone's talking about — no 22-year-old bro energy required.",
  openGraph: {
    title: 'They Promised Us Jetpacks | AI Education for GenX Women',
    description:
      'Practical AI education for GenX women. No hype. No overwhelm. Just real skills, real applications, and the occasional Ferris Bueller reference.',
    type: 'website',
    url: 'https://jetpackersai.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'They Promised Us Jetpacks | AI Education for GenX Women',
    description: "The future finally arrived. Let's learn to fly it.",
  },
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${dmSans.variable}`}>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
