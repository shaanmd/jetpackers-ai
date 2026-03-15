'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'

const W = 480
const H = 520
const GROUND = H - 70
const PLAYER_W = 28
const PLAYER_H = 36
const HAZARD_W = 52
const HAZARD_H = 44
const COLLECTIBLE_W = 44
const COLLECTIBLE_H = 44

const HAZARDS = ['📄', '📞', '💊', '📧', '🧾', '😤', '📬', '💉', '🤙']
const COLLECTIBLES = ['☕', '☕', '☕', '🧡']

type Entity = {
  id: number
  x: number
  y: number
  emoji: string
  speed: number
  type: 'hazard' | 'collectible'
}

type GameState = 'idle' | 'playing' | 'dead'

let idCounter = 0

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<GameState>('idle')
  const playerXRef = useRef(W / 2)
  const playerYRef = useRef(GROUND - PLAYER_H)
  const entitiesRef = useRef<Entity[]>([])
  const scoreRef = useRef(0)
  const livesRef = useRef(3)
  const frameRef = useRef(0)
  const animRef = useRef<number | null>(null)
  const keysRef = useRef<Record<string, boolean>>({})
  const spawnTimerRef = useRef(0)
  const playerFlashRef = useRef(0)

  const [displayState, setDisplayState] = useState<GameState>('idle')
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [highScore, setHighScore] = useState(0)

  const resetGame = useCallback(() => {
    playerXRef.current = W / 2
    playerYRef.current = GROUND - PLAYER_H
    entitiesRef.current = []
    scoreRef.current = 0
    livesRef.current = 3
    frameRef.current = 0
    spawnTimerRef.current = 0
    playerFlashRef.current = 0
    setScore(0)
    setLives(3)
  }, [])

  const drawPixelChar = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    flash: boolean
  ) => {
    // Body
    ctx.fillStyle = flash && Math.floor(Date.now() / 80) % 2 === 0 ? '#ff4444' : '#06B6D4'
    ctx.fillRect(x + 8, y + 10, 12, 16)
    // Head
    ctx.fillStyle = '#fde68a'
    ctx.fillRect(x + 7, y, 14, 13)
    // Eyes
    ctx.fillStyle = '#0A1628'
    ctx.fillRect(x + 10, y + 4, 3, 3)
    ctx.fillRect(x + 16, y + 4, 3, 3)
    // Stethoscope
    ctx.fillStyle = '#f0f6ff'
    ctx.fillRect(x + 6, y + 12, 3, 6)
    ctx.fillRect(x + 20, y + 12, 3, 6)
    // Legs
    ctx.fillStyle = '#1e3a5f'
    ctx.fillRect(x + 9, y + 26, 5, 10)
    ctx.fillRect(x + 15, y + 26, 5, 10)
    // Coat
    ctx.fillStyle = '#e0f2fe'
    ctx.fillRect(x + 5, y + 10, 4, 14)
    ctx.fillRect(x + 19, y + 10, 4, 14)
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Background
    ctx.fillStyle = '#0A1628'
    ctx.fillRect(0, 0, W, H)

    // Scanline effect
    for (let i = 0; i < H; i += 4) {
      ctx.fillStyle = 'rgba(0,0,0,0.08)'
      ctx.fillRect(0, i, W, 2)
    }

    // Ground
    ctx.fillStyle = '#06B6D4'
    ctx.fillRect(0, GROUND + PLAYER_H, W, 2)
    ctx.fillStyle = 'rgba(6,182,212,0.15)'
    ctx.fillRect(0, GROUND + PLAYER_H + 2, W, H - GROUND - PLAYER_H - 2)

    // Grid lines on ground
    ctx.strokeStyle = 'rgba(6,182,212,0.08)'
    ctx.lineWidth = 1
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath()
      ctx.moveTo(x, GROUND + PLAYER_H)
      ctx.lineTo(x, H)
      ctx.stroke()
    }

    // Stars/nodes background
    const nodes = [[60, 80], [200, 40], [380, 100], [420, 60], [100, 150], [320, 30]]
    nodes.forEach(([nx, ny]) => {
      ctx.fillStyle = `rgba(6,182,212,${0.2 + 0.1 * Math.sin(frameRef.current * 0.03 + nx)})`
      ctx.beginPath()
      ctx.arc(nx, ny, 2, 0, Math.PI * 2)
      ctx.fill()
    })

    // Entities
    ctx.font = `${HAZARD_H + 8}px serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    entitiesRef.current.forEach((e) => {
      const cx = e.x + HAZARD_W / 2
      const cy = e.y + HAZARD_H / 2
      const radius = HAZARD_W / 2 + 4

      // White circle background so emojis pop on dark canvas
      ctx.globalAlpha = 1
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = e.type === 'collectible'
        ? 'rgba(254,243,199,0.92)'
        : 'rgba(255,255,255,0.88)'
      ctx.fill()

      // Subtle border
      ctx.strokeStyle = e.type === 'collectible'
        ? 'rgba(251,191,36,0.6)'
        : 'rgba(200,200,220,0.4)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Emoji on top
      ctx.fillText(e.emoji, cx, cy)
    })
    ctx.globalAlpha = 1

    // Player
    const flash = playerFlashRef.current > 0
    drawPixelChar(ctx, playerXRef.current - PLAYER_W / 2, playerYRef.current, flash)

    // HUD
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.font = 'bold 15px "Courier New", monospace'
    ctx.fillStyle = '#06B6D4'
    ctx.fillText(`SCORE: ${scoreRef.current}`, 12, 12)

    ctx.textAlign = 'right'
    ctx.fillText(`HI: ${Math.max(highScore, scoreRef.current)}`, W - 12, 12)

    // Lives as hearts
    ctx.textAlign = 'center'
    ctx.font = '16px serif'
    for (let i = 0; i < 3; i++) {
      ctx.globalAlpha = i < livesRef.current ? 1 : 0.2
      ctx.fillText('❤️', W / 2 - 20 + i * 22, 10)
    }
    ctx.globalAlpha = 1

    // Speed indicator
    const speed = getSpeed()
    ctx.font = '9px "Courier New", monospace'
    ctx.fillStyle = speed > 5 ? '#ff6b6b' : 'rgba(6,182,212,0.5)'
    ctx.textAlign = 'left'
    ctx.fillText(speed > 5 ? '⚡ CHAOS MODE' : '▸ SURVIVING', 12, H - 18)

  }, [highScore])

  const getSpeed = () => {
    return 2 + Math.floor(scoreRef.current / 200) * 0.8
  }

  const spawnEntity = useCallback(() => {
    const speed = getSpeed()
    const isCollectible = Math.random() < 0.18
    const emoji = isCollectible
      ? COLLECTIBLES[Math.floor(Math.random() * COLLECTIBLES.length)]
      : HAZARDS[Math.floor(Math.random() * HAZARDS.length)]

    entitiesRef.current.push({
      id: idCounter++,
      x: Math.random() * (W - HAZARD_W - 20) + 10,
      y: -HAZARD_H,
      emoji,
      speed: speed + Math.random() * 1.5,
      type: isCollectible ? 'collectible' : 'hazard',
    })
  }, [])

  const checkCollision = useCallback((e: Entity) => {
    const px = playerXRef.current - PLAYER_W / 2
    const py = playerYRef.current
    const margin = 8
    return (
      e.x + margin < px + PLAYER_W - margin &&
      e.x + HAZARD_W - margin > px + margin &&
      e.y + margin < py + PLAYER_H - margin &&
      e.y + HAZARD_H - margin > py + margin
    )
  }, [])

  const gameLoop = useCallback(() => {
    if (stateRef.current !== 'playing') return

    frameRef.current++
    spawnTimerRef.current++

    // Player movement
    const speed = 5
    if (keysRef.current['ArrowLeft'] || keysRef.current['a']) {
      playerXRef.current = Math.max(PLAYER_W / 2, playerXRef.current - speed)
    }
    if (keysRef.current['ArrowRight'] || keysRef.current['d']) {
      playerXRef.current = Math.min(W - PLAYER_W / 2, playerXRef.current + speed)
    }

    // Spawn rate increases with score
    const spawnRate = Math.max(28, 55 - Math.floor(scoreRef.current / 150) * 4)
    if (spawnTimerRef.current >= spawnRate) {
      spawnEntity()
      spawnTimerRef.current = 0
    }

    // Update entities
    const toRemove: number[] = []
    entitiesRef.current.forEach((e) => {
      e.y += e.speed

      if (e.y > H + 20) {
        toRemove.push(e.id)
        return
      }

      if (checkCollision(e)) {
        toRemove.push(e.id)
        if (e.type === 'collectible') {
          scoreRef.current += 50
          setScore(scoreRef.current)
        } else {
          if (playerFlashRef.current <= 0) {
            livesRef.current -= 1
            setLives(livesRef.current)
            playerFlashRef.current = 90

            if (livesRef.current <= 0) {
              setHighScore((prev) => Math.max(prev, scoreRef.current))
              stateRef.current = 'dead'
              setDisplayState('dead')
              return
            }
          }
        }
      }
    })

    entitiesRef.current = entitiesRef.current.filter(
      (e) => !toRemove.includes(e.id)
    )

    if (playerFlashRef.current > 0) playerFlashRef.current--

    // Score over time
    if (frameRef.current % 6 === 0) {
      scoreRef.current += 1
      setScore(scoreRef.current)
    }

    draw()
    animRef.current = requestAnimationFrame(gameLoop)
  }, [draw, spawnEntity, checkCollision])

  const startGame = useCallback(() => {
    resetGame()
    stateRef.current = 'playing'
    setDisplayState('playing')
    animRef.current = requestAnimationFrame(gameLoop)
  }, [resetGame, gameLoop])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      keysRef.current[e.key] = e.type === 'keydown'
      if (e.key === ' ' || e.key === 'Enter') {
        if (stateRef.current === 'idle' || stateRef.current === 'dead') {
          startGame()
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    window.addEventListener('keyup', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('keyup', handleKey)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [startGame])

  // Draw idle screen
  useEffect(() => {
    if (displayState === 'idle') {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.fillStyle = '#0A1628'
      ctx.fillRect(0, 0, W, H)

      for (let i = 0; i < H; i += 4) {
        ctx.fillStyle = 'rgba(0,0,0,0.08)'
        ctx.fillRect(0, i, W, 2)
      }

      ctx.textAlign = 'center'

      // Title
      ctx.font = 'bold 30px "Courier New", monospace'
      ctx.fillStyle = '#06B6D4'
      ctx.fillText('BURNOUT DODGER', W / 2, 100)

      ctx.font = '15px "Courier New", monospace'
      ctx.fillStyle = 'rgba(240,246,255,0.85)'
      ctx.fillText('a game for overworked vets', W / 2, 130)

      // Player preview
      drawPixelChar(ctx, W / 2 - 14, 170, false)

      ctx.font = '14px "Courier New", monospace'
      ctx.fillStyle = 'rgba(240,246,255,0.90)'
      ctx.fillText('dodge the chaos. catch the coffee.', W / 2, 240)
      ctx.fillText('survive as long as you can.', W / 2, 260)

      ctx.font = '13px "Courier New", monospace'
      ctx.fillStyle = 'rgba(240,246,255,0.75)'
      ctx.fillText('← → or A D to move · buttons below', W / 2, 300)

      ctx.font = 'bold 15px "Courier New", monospace'
      ctx.fillStyle = '#06B6D4'
      const blink = Math.floor(Date.now() / 500) % 2 === 0
      if (blink) ctx.fillText('[ TAP OR PRESS SPACE TO START ]', W / 2, 360)

      ctx.font = '14px serif'
      ctx.fillStyle = 'rgba(240,246,255,0.78)'
      ctx.fillText('dodge: 📄 📞 💊 📧 🧾 😤 📬', W / 2, 420)
      ctx.fillText('catch: ☕ for +50 pts', W / 2, 445)

      setTimeout(() => {
        if (stateRef.current === 'idle') {
          const c = canvasRef.current
          if (c) {
            const cx = c.getContext('2d')
            if (cx) {
              cx.fillStyle = '#0A1628'
              cx.fillRect(0, 340, W, 40)
              cx.font = 'bold 14px "Courier New", monospace'
              cx.fillStyle = '#06B6D4'
              cx.textAlign = 'center'
              if (Math.floor(Date.now() / 500) % 2 === 0) {
                cx.fillText('[ TAP OR PRESS SPACE TO START ]', W / 2, 360)
              }
            }
          }
          if (stateRef.current === 'idle') requestAnimationFrame(() => {})
        }
      }, 500)
    }
  }, [displayState])

  // Shared touch button style
  const touchBtnStyle: React.CSSProperties = {
    flex: 1,
    height: 64,
    background: 'rgba(6,182,212,0.1)',
    border: '1px solid rgba(6,182,212,0.3)',
    borderRadius: 6,
    color: '#06B6D4',
    fontSize: '1.6rem',
    cursor: 'pointer',
    userSelect: 'none',
    touchAction: 'none',
    WebkitUserSelect: 'none',
    fontFamily: '"Courier New", monospace',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: '#0A1628',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        fontFamily: '"Courier New", monospace',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ marginBottom: '0.75rem', textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'var(--font-exo)',
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(6,182,212,0.8)',
            marginBottom: '0.3rem',
          }}
        >
          you weren&apos;t supposed to find this
        </div>
        <div
          style={{
            fontFamily: 'var(--font-exo)',
            fontSize: '1.3rem',
            fontWeight: 800,
            color: '#06B6D4',
            letterSpacing: '-0.02em',
          }}
        >
          BURNOUT DODGER
        </div>
      </div>

      {/* Canvas wrapper — scales canvas to fit viewport width */}
      <div style={{ position: 'relative', width: '100%', maxWidth: W }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            border: '1px solid rgba(6,182,212,0.25)',
            borderRadius: '4px',
            imageRendering: 'pixelated',
            boxShadow: '0 0 40px rgba(6,182,212,0.15)',
            touchAction: 'none',
          }}
          onClick={() => {
            if (stateRef.current === 'idle' || stateRef.current === 'dead') {
              startGame()
            }
          }}
        />

        {displayState === 'dead' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(10,22,40,0.88)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>😮‍💨</div>
            <div
              style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                color: '#ff6b6b',
                marginBottom: '0.3rem',
                letterSpacing: '0.1em',
              }}
            >
              BURNED OUT
            </div>
            <div
              style={{
                fontSize: '0.85rem',
                color: 'rgba(240,246,255,0.85)',
                marginBottom: '1.5rem',
              }}
            >
              maybe AI could have helped
            </div>
            <div
              style={{
                fontSize: '1.1rem',
                color: '#06B6D4',
                marginBottom: '0.3rem',
                fontWeight: 'bold',
              }}
            >
              SCORE: {score}
            </div>
            <div
              style={{
                fontSize: '0.8rem',
                color: 'rgba(240,246,255,0.78)',
                marginBottom: '2rem',
              }}
            >
              BEST: {Math.max(highScore, score)}
            </div>
            <button
              onClick={startGame}
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                letterSpacing: '0.1em',
                background: '#06B6D4',
                color: '#0A1628',
                border: 'none',
                padding: '0.8rem 2rem',
                borderRadius: '3px',
                cursor: 'pointer',
                marginBottom: '0.8rem',
              }}
            >
              [ TRY AGAIN ]
            </button>
          </div>
        )}
      </div>

      {/* Touch / on-screen controls */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          marginTop: 12,
          width: '100%',
          maxWidth: W,
        }}
      >
        <button
          style={touchBtnStyle}
          onPointerDown={(e) => { e.preventDefault(); keysRef.current['ArrowLeft'] = true }}
          onPointerUp={() => { keysRef.current['ArrowLeft'] = false }}
          onPointerLeave={() => { keysRef.current['ArrowLeft'] = false }}
          aria-label="Move left"
        >
          ◀
        </button>
        <button
          style={touchBtnStyle}
          onPointerDown={(e) => { e.preventDefault(); keysRef.current['ArrowRight'] = true }}
          onPointerUp={() => { keysRef.current['ArrowRight'] = false }}
          onPointerLeave={() => { keysRef.current['ArrowRight'] = false }}
          aria-label="Move right"
        >
          ▶
        </button>
      </div>

      <div
        style={{
          marginTop: '0.75rem',
          display: 'flex',
          gap: '1.5rem',
          fontSize: '0.72rem',
          color: 'rgba(240,246,255,0.70)',
          letterSpacing: '0.08em',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <span>← → to move</span>
        <span>☕ = +50 pts</span>
        <span>❤️❤️❤️ = 3 lives</span>
      </div>

      <Link
        href="/"
        style={{
          marginTop: '1rem',
          fontSize: '0.72rem',
          color: 'rgba(6,182,212,0.8)',
          textDecoration: 'none',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        ← back to safety
      </Link>
    </div>
  )
}
