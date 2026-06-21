"use client"

import { useEffect, useRef } from "react"

/**
 * 3D Interactive Forcefield Canvas
 * Wireframe sphere with undulating sine-wave surface and mouse interaction.
 * Throttled to ~30fps for CPU performance on low-power devices.
 */
export default function ShieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    let time = 0
    let mouseX = 0
    let mouseY = 0
    let frameCount = 0
    let animId = 0

    const points: { baseX: number; baseY: number; baseZ: number; lat: number; lon: number }[] = []
    const numLat = 15
    const numLon = 30

    function init() {
      width = canvas!.width = window.innerWidth
      height = canvas!.height = window.innerHeight
      points.length = 0

      for (let i = 0; i <= numLat; i++) {
        const lat = (Math.PI * i) / numLat
        for (let j = 0; j <= numLon; j++) {
          const lon = (2 * Math.PI * j) / numLon
          points.push({
            baseX: Math.sin(lat) * Math.cos(lon),
            baseY: Math.sin(lat) * Math.sin(lon),
            baseZ: Math.cos(lat),
            lat,
            lon,
          })
        }
      }
    }

    function handleMouse(e: MouseEvent) {
      mouseX = (e.clientX - width / 2) * 0.05
      mouseY = (e.clientY - height / 2) * 0.05
    }

    function animate() {
      animId = requestAnimationFrame(animate)
      frameCount++

      // Throttle to ~30fps — skip every other frame
      if (frameCount % 2 !== 0) return

      ctx!.clearRect(0, 0, width, height)

      time += 0.015
      const centerX = width / 2
      const centerY = height / 2
      const fov = 700
      const baseRadius = 350

      const rotX = time * 0.2 + mouseY * 0.02
      const rotY = time * 0.3 + mouseX * 0.02

      const projected = points.map((p) => {
        const wave = Math.sin(p.lat * 5 + time) * Math.cos(p.lon * 5 + time) * 20
        const r = baseRadius + wave

        const px = p.baseX * r
        const py = p.baseY * r
        const pz = p.baseZ * r

        const y1 = py * Math.cos(rotX) - pz * Math.sin(rotX)
        const z1 = py * Math.sin(rotX) + pz * Math.cos(rotX)
        const x2 = px * Math.cos(rotY) + z1 * Math.sin(rotY)
        const z2 = -px * Math.sin(rotY) + z1 * Math.cos(rotY)

        const z3d = z2 + 900
        const scale = fov / z3d

        return { x: x2 * scale + centerX, y: y1 * scale + centerY, z: z3d, scale, lat: p.lat, lon: p.lon }
      })

      projected.sort((a, b) => b.z - a.z)

      ctx!.lineWidth = 1
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i]
        if (p.z < 0) continue

        const opacity = Math.max(0.02, Math.min(0.4, 1200 / p.z - 0.5))
        ctx!.fillStyle = `rgba(99, 102, 241, ${opacity * 1.5})`

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, 1.5 * p.scale, 0, Math.PI * 2)
        ctx!.fill()

        let connections = 0
        for (let j = i + 1; j < projected.length && connections < 2; j++) {
          const p2 = projected[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 80 * p.scale) {
            ctx!.beginPath()
            ctx!.moveTo(p.x, p.y)
            ctx!.lineTo(p2.x, p2.y)
            const lineAlpha = opacity * (1 - dist / (80 * p.scale))
            ctx!.strokeStyle = `rgba(99, 102, 241, ${lineAlpha})`
            ctx!.stroke()
            connections++
          }
        }
      }
    }

    window.addEventListener("mousemove", handleMouse)
    window.addEventListener("resize", init)
    init()
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouse)
      window.removeEventListener("resize", init)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="shield-canvas"
      aria-hidden="true"
      className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none opacity-60"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
