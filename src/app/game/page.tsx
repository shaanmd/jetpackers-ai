import type { Metadata } from 'next'
import Game from '@/components/Game'

export const metadata: Metadata = {
  title: 'Burnout Dodger | SynAIpseVet',
  description: 'You did not find this.',
}

export default function GamePage() {
  return <Game />
}
