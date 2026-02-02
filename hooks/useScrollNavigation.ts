import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { MIN_WIDTH_FOR_SCROLL_NAV, SCROLL_ANIMATION_DURATION } from "@/lib/constants"

gsap.registerPlugin(ScrollToPlugin)

interface UseScrollNavigationProps {
  sectionsRef: React.MutableRefObject<HTMLDivElement[]>
}

export function useScrollNavigation({
  sectionsRef,
}: UseScrollNavigationProps) {
  const scrollToSectionRef = useRef<((index: number) => void) | null>(null)

  useEffect(() => {
    const sections = sectionsRef.current.filter(Boolean)
    if (sections.length === 0) return

    const calculateSnapPoints = () => {
      return sections.map((section) => section?.offsetTop ?? 0)
    }

    let snapPoints = calculateSnapPoints()
    let currentIndex = 0
    let isScrolling = false
    let isScrollNavEnabled = window.innerWidth >= MIN_WIDTH_FOR_SCROLL_NAV

    const scrollToNext = () => {
      if (isScrolling || !isScrollNavEnabled) return

      if (currentIndex < snapPoints.length - 1) {
        currentIndex++
        scrollToSection(currentIndex)
      }
    }

    const scrollToPrevious = () => {
      if (isScrolling || !isScrollNavEnabled) return

      if (currentIndex > 0) {
        currentIndex--
        scrollToSection(currentIndex)
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (!isScrollNavEnabled || isScrolling) {
        if (isScrolling) e.preventDefault()
        return
      }

      e.preventDefault()

      if (e.deltaY > 0) {
        scrollToNext()
      } else {
        scrollToPrevious()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isScrollNavEnabled) return

      if (
        e.key === "ArrowDown" ||
        e.key === "PageDown" ||
        (e.key === " " && !e.shiftKey)
      ) {
        e.preventDefault()
        scrollToNext()
      } else if (
        e.key === "ArrowUp" ||
        e.key === "PageUp" ||
        (e.key === " " && e.shiftKey)
      ) {
        e.preventDefault()
        scrollToPrevious()
      }
    }

    const scrollToSection = (index: number) => {
      if (!isScrollNavEnabled || isScrolling) return
      if (index < 0 || index >= snapPoints.length) return

      isScrolling = true
      const section = sections[index]
      if (!section) {
        isScrolling = false
        return
      }

      const targetY = section.offsetTop
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const finalTargetY = Math.min(targetY, maxScroll)

      gsap.to(window, {
        scrollTo: {
          y: finalTargetY,
          autoKill: false,
        },
        duration: SCROLL_ANIMATION_DURATION,
        ease: "power2.inOut",
        onComplete: () => {
          isScrolling = false
          currentIndex = index

          const event = new CustomEvent("sectionChange", { detail: { currentIndex: index } })
          window.dispatchEvent(event)
        },
      })
    }

    scrollToSectionRef.current = scrollToSection

      // قرار دادن تابع در window برای استفاده از Header
      ; (window as Window & { scrollToSection?: (index: number) => void }).scrollToSection = (
        index: number
      ) => scrollToSection(index)

    const updateSnapPoints = () => {
      setTimeout(() => {
        snapPoints = calculateSnapPoints()

        isScrollNavEnabled = window.innerWidth >= MIN_WIDTH_FOR_SCROLL_NAV
      }, 100)
    }

    const updateCurrentIndex = () => {
      if (!isScrollNavEnabled || isScrolling) return

      const scrollY = window.scrollY
      const viewportTop = scrollY
      const viewportBottom = scrollY + window.innerHeight

      let bestIndex = 0
      let maxOverlap = 0

      sections.forEach((section, index) => {
        if (!section) return

        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        const overlapTop = Math.max(viewportTop, sectionTop)
        const overlapBottom = Math.min(viewportBottom, sectionBottom)
        const overlap = Math.max(0, overlapBottom - overlapTop)

        if (overlap > maxOverlap) {
          maxOverlap = overlap
          bestIndex = index
        }
      })

      currentIndex = bestIndex

      const event = new CustomEvent("sectionChange", { detail: { currentIndex } })
      window.dispatchEvent(event)
    }

    setTimeout(() => {
      snapPoints = calculateSnapPoints()
      isScrollNavEnabled = window.innerWidth >= MIN_WIDTH_FOR_SCROLL_NAV
      if (isScrollNavEnabled) {
        updateCurrentIndex()
        const event = new CustomEvent("sectionChange", { detail: { currentIndex } })
        window.dispatchEvent(event)
      }
    }, 100)

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("resize", updateSnapPoints)
    window.addEventListener("scroll", updateCurrentIndex, { passive: true })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("resize", updateSnapPoints)
      window.removeEventListener("scroll", updateCurrentIndex)
      delete (window as Window & { scrollToSection?: (index: number) => void }).scrollToSection
    }
  }, [sectionsRef])

  return scrollToSectionRef
}

