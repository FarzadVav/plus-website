import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { FOOTER_LOGO_ANIMATION_DURATION, FOOTER_LOGO_ROTATION_DURATION } from "@/lib/constants"

export function useFooterLogoAnimation(
  footerRef: React.RefObject<HTMLDivElement | null>,
  logoRef: React.RefObject<HTMLImageElement | null>
) {
  useEffect(() => {
    const footer = footerRef.current
    const logo = logoRef.current
    if (!footer || !logo) return

    const xTo = gsap.quickTo(logo, "x", {
      duration: FOOTER_LOGO_ANIMATION_DURATION,
      ease: "elastic.out(1, 0.3)",
    })
    const yTo = gsap.quickTo(logo, "y", {
      duration: FOOTER_LOGO_ANIMATION_DURATION,
      ease: "elastic.out(1, 0.3)",
    })
    const rotateTo = gsap.quickTo(logo, "rotation", {
      duration: FOOTER_LOGO_ROTATION_DURATION,
      ease: "elastic.out(1, 0.5)",
    })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = footer.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) / 8
      const deltaY = (e.clientY - centerY) / 8
      const rotation = (e.clientX - centerX) / 30

      xTo(deltaX)
      yTo(deltaY)
      rotateTo(rotation)
    }

    const handleMouseLeave = () => {
      xTo(0)
      yTo(0)
      rotateTo(0)
    }

    const handleMouseDown = () => {
      gsap.to(logo, { opacity: 0.25, duration: 0.3, ease: "power2.out" })
    }

    const handleMouseUp = () => {
      gsap.to(logo, { opacity: 0.1, duration: 0.3, ease: "power2.out" })
    }

    const isLargeScreen = () => window.innerWidth >= 1024

    const setupEventListeners = () => {
      if (isLargeScreen()) {
        footer.addEventListener("mousemove", handleMouseMove)
        footer.addEventListener("mouseleave", handleMouseLeave)
        footer.addEventListener("mousedown", handleMouseDown)
        footer.addEventListener("mouseup", handleMouseUp)
      } else {
        // Reset position when screen is too small
        xTo(0)
        yTo(0)
        rotateTo(0)
      }
    }

    const removeEventListeners = () => {
      footer.removeEventListener("mousemove", handleMouseMove)
      footer.removeEventListener("mouseleave", handleMouseLeave)
      footer.removeEventListener("mousedown", handleMouseDown)
      footer.removeEventListener("mouseup", handleMouseUp)
    }

    const handleResize = () => {
      removeEventListeners()
      setupEventListeners()
    }

    // Initial setup
    setupEventListeners()

    // Listen for resize events
    window.addEventListener("resize", handleResize)

    return () => {
      removeEventListeners()
      window.removeEventListener("resize", handleResize)
    }
  }, [footerRef, logoRef])
}

