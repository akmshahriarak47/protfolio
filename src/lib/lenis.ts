import Lenis from "lenis"
import "lenis/dist/lenis.css"

let lenisInstance: Lenis | null = null

export function initLenis(): Lenis {
  if (typeof window === "undefined") return null as unknown as Lenis

  if (!lenisInstance) {
    lenisInstance = new Lenis({
      autoRaf: true,
      anchors: true,
      smoothWheel: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
  }

  return lenisInstance
}

export function getLenis(): Lenis | null {
  return lenisInstance
}
