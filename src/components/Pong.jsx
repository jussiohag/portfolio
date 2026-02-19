import { useEffect, useRef, useState } from 'react'
import './Pong.css'

const W = 800
const H = 500
const PADDLE_W = 12
const PADDLE_H = 80
const BALL_SIZE = 10
const PADDLE_SPEED = 5
const AI_SPEED = 4
const WINNING_SCORE = 7

function initState() {
  return {
    ball: { x: W / 2, y: H / 2, vx: 4 * (Math.random() > 0.5 ? 1 : -1), vy: 3 * (Math.random() > 0.5 ? 1 : -1) },
    player: { y: H / 2 - PADDLE_H / 2 },
    ai: { y: H / 2 - PADDLE_H / 2 },
    score: { player: 0, ai: 0 },
  }
}

export default function Pong() {
  const canvasRef = useRef(null)
  const stateRef = useRef(initState())
  const keysRef = useRef({})
  const animRef = useRef(null)
  const [score, setScore] = useState({ player: 0, ai: 0 })
  const [phase, setPhase] = useState('idle') // idle | playing | won | lost

  useEffect(() => {
    const onKey = (e) => { keysRef.current[e.key] = e.type === 'keydown' }
    window.addEventListener('keydown', onKey)
    window.addEventListener('keyup', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('keyup', onKey)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  function startGame() {
    stateRef.current = initState()
    setScore({ player: 0, ai: 0 })
    setPhase('playing')
  }

  useEffect(() => {
    if (phase !== 'playing') return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    function loop() {
      const s = stateRef.current
      const keys = keysRef.current

      // Move player paddle
      if ((keys['ArrowUp'] || keys['w'] || keys['W']) && s.player.y > 0)
        s.player.y -= PADDLE_SPEED
      if ((keys['ArrowDown'] || keys['s'] || keys['S']) && s.player.y < H - PADDLE_H)
        s.player.y += PADDLE_SPEED

      // AI paddle tracking
      const aiCenter = s.ai.y + PADDLE_H / 2
      if (aiCenter < s.ball.y - 5 && s.ai.y < H - PADDLE_H) s.ai.y += AI_SPEED
      if (aiCenter > s.ball.y + 5 && s.ai.y > 0) s.ai.y -= AI_SPEED

      // Move ball
      s.ball.x += s.ball.vx
      s.ball.y += s.ball.vy

      // Wall bounce (top/bottom)
      if (s.ball.y <= 0) { s.ball.y = 0; s.ball.vy *= -1 }
      if (s.ball.y >= H - BALL_SIZE) { s.ball.y = H - BALL_SIZE; s.ball.vy *= -1 }

      // Player paddle collision (left)
      if (
        s.ball.x <= PADDLE_W + 20 &&
        s.ball.x >= 20 &&
        s.ball.y + BALL_SIZE >= s.player.y &&
        s.ball.y <= s.player.y + PADDLE_H
      ) {
        s.ball.x = PADDLE_W + 20
        s.ball.vx = Math.abs(s.ball.vx) * 1.05
        const hit = (s.ball.y + BALL_SIZE / 2 - (s.player.y + PADDLE_H / 2)) / (PADDLE_H / 2)
        s.ball.vy = hit * 5
      }

      // AI paddle collision (right)
      if (
        s.ball.x + BALL_SIZE >= W - PADDLE_W - 20 &&
        s.ball.x + BALL_SIZE <= W - 20 &&
        s.ball.y + BALL_SIZE >= s.ai.y &&
        s.ball.y <= s.ai.y + PADDLE_H
      ) {
        s.ball.x = W - PADDLE_W - 20 - BALL_SIZE
        s.ball.vx = -Math.abs(s.ball.vx) * 1.05
        const hit = (s.ball.y + BALL_SIZE / 2 - (s.ai.y + PADDLE_H / 2)) / (PADDLE_H / 2)
        s.ball.vy = hit * 5
      }

      // Cap speed
      const speed = Math.sqrt(s.ball.vx ** 2 + s.ball.vy ** 2)
      if (speed > 12) { s.ball.vx = s.ball.vx / speed * 12; s.ball.vy = s.ball.vy / speed * 12 }

      // Scoring
      if (s.ball.x < 0) {
        s.score.ai++
        setScore({ ...s.score })
        if (s.score.ai >= WINNING_SCORE) { setPhase('lost'); return }
        Object.assign(s.ball, { x: W / 2, y: H / 2, vx: -4, vy: 3 * (Math.random() > 0.5 ? 1 : -1) })
        Object.assign(s.player, { y: H / 2 - PADDLE_H / 2 })
        Object.assign(s.ai, { y: H / 2 - PADDLE_H / 2 })
      }
      if (s.ball.x > W) {
        s.score.player++
        setScore({ ...s.score })
        if (s.score.player >= WINNING_SCORE) { setPhase('won'); return }
        Object.assign(s.ball, { x: W / 2, y: H / 2, vx: 4, vy: 3 * (Math.random() > 0.5 ? 1 : -1) })
        Object.assign(s.player, { y: H / 2 - PADDLE_H / 2 })
        Object.assign(s.ai, { y: H / 2 - PADDLE_H / 2 })
      }

      // Draw
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, W, H)

      // Centre line
      ctx.setLineDash([10, 10])
      ctx.strokeStyle = '#334155'
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke()
      ctx.setLineDash([])

      // Paddles
      ctx.fillStyle = '#60a5fa'
      ctx.beginPath()
      ctx.roundRect(20, s.player.y, PADDLE_W, PADDLE_H, 4)
      ctx.fill()

      ctx.fillStyle = '#f87171'
      ctx.beginPath()
      ctx.roundRect(W - PADDLE_W - 20, s.ai.y, PADDLE_W, PADDLE_H, 4)
      ctx.fill()

      // Ball
      ctx.fillStyle = '#f1f5f9'
      ctx.beginPath()
      ctx.roundRect(s.ball.x, s.ball.y, BALL_SIZE, BALL_SIZE, 3)
      ctx.fill()

      animRef.current = requestAnimationFrame(loop)
    }

    animRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animRef.current)
  }, [phase])

  return (
    <div className="pong-page">
      <div className="pong-header">
        <h1>Pong</h1>
        <p className="pong-subtitle">You <span className="score-player">{score.player}</span> — <span className="score-ai">{score.ai}</span> CPU</p>
      </div>

      <div className="pong-canvas-wrap">
        <canvas ref={canvasRef} width={W} height={H} className="pong-canvas" />

        {phase === 'idle' && (
          <div className="pong-overlay">
            <div className="pong-overlay-box">
              <h2>Pong</h2>
              <p>First to {WINNING_SCORE} points wins</p>
              <p className="pong-controls">↑ ↓ or W S to move</p>
              <button className="pong-btn" onClick={startGame}>Play</button>
            </div>
          </div>
        )}

        {phase === 'won' && (
          <div className="pong-overlay">
            <div className="pong-overlay-box">
              <h2>You Win! 🎉</h2>
              <p>{score.player} — {score.ai}</p>
              <button className="pong-btn" onClick={startGame}>Play Again</button>
            </div>
          </div>
        )}

        {phase === 'lost' && (
          <div className="pong-overlay">
            <div className="pong-overlay-box">
              <h2>CPU Wins</h2>
              <p>{score.player} — {score.ai}</p>
              <button className="pong-btn" onClick={startGame}>Try Again</button>
            </div>
          </div>
        )}
      </div>

      <p className="pong-hint">Use ↑ ↓ arrow keys or W / S</p>
    </div>
  )
}
