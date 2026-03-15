import type { Metadata } from 'next'
import QuizClient from './QuizClient'

export const metadata: Metadata = {
  title: "What's Your AI Vibe? | Jetpackers AI",
  description:
    "Breakfast Club meets The Jetsons. 7 questions to find out what kind of AI woman you really are — complete with your very own 80s/90s spirit guide.",
  openGraph: {
    title: "What's Your AI Vibe? | Jetpackers AI",
    description: 'Is AI your new bestie or a total narcissist? Find out in 7 questions.',
    type: 'website',
    url: 'https://jetpackersai.com/quiz',
  },
}

export default function QuizPage() {
  return <QuizClient />
}
