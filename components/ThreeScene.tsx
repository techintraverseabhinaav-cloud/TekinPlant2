"use client"

import { useEffect, useRef } from 'react'

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let mouseX = 0.5
    let mouseY = 0.5

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth
      mouseY = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', handleMouseMove)

    let animationFrame: number
    const animate = () => {
      const time = Date.now() * 0.0005
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const gradient = ctx.createRadialGradient(
        canvas.width * (0.3 + mouseX * 0.2),
        canvas.height * (0.3 + mouseY * 0.2),
        0,
        canvas.width * (0.5 + Math.sin(time) * 0.1),
        canvas.height * (0.5 + Math.cos(time) * 0.1),
        canvas.width * 0.8
      )
      
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.15)')
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.1)')
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
}
