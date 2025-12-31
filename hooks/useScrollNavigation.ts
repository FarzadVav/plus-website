import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { MIN_WIDTH_FOR_SCROLL_NAV, PORTFOLIO_SECTION_INDEX, SCROLL_ANIMATION_DURATION } from "@/lib/constants"

gsap.registerPlugin(ScrollToPlugin)

interface UseScrollNavigationProps {
  sectionsRef: React.MutableRefObject<HTMLDivElement[]>
  portfolioContainerRef: React.RefObject<HTMLDivElement | null>
  portfolioIndexRef: React.MutableRefObject<number>
  isInPortfolioRef: React.MutableRefObject<boolean>
  portfolioItemsLength: number
}

export function useScrollNavigation({
  sectionsRef,
  portfolioContainerRef,
  portfolioIndexRef,
  isInPortfolioRef,
  portfolioItemsLength,
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

    const scrollPortfolioToPanel = (panelIndex: number) => {
      if (!portfolioContainerRef.current) return

      isScrolling = true
      const panelWidth = window.innerWidth
      const isRTL = document.documentElement.dir === "rtl"
      const direction = isRTL ? 1 : -1

      gsap.to(portfolioContainerRef.current, {
        x: direction * panelIndex * panelWidth,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          isScrolling = false
          portfolioIndexRef.current = panelIndex
        },
      })
    }

    const scrollToNext = () => {
      if (isScrolling || !isScrollNavEnabled) return

      if (currentIndex === PORTFOLIO_SECTION_INDEX && isInPortfolioRef.current) {
        if (portfolioIndexRef.current < portfolioItemsLength - 1) {
          scrollPortfolioToPanel(portfolioIndexRef.current + 1)
          return
        } else {
          isInPortfolioRef.current = false
          portfolioIndexRef.current = 0
        }
      }

      if (currentIndex < snapPoints.length - 1) {
        currentIndex++
        if (currentIndex === PORTFOLIO_SECTION_INDEX) {
          portfolioIndexRef.current = 0
        }
        scrollToSection(currentIndex)
      }
    }

    const scrollToPrevious = () => {
      if (isScrolling || !isScrollNavEnabled) return

      if (currentIndex === PORTFOLIO_SECTION_INDEX && isInPortfolioRef.current) {
        if (portfolioIndexRef.current > 0) {
          scrollPortfolioToPanel(portfolioIndexRef.current - 1)
          return
        } else {
          isInPortfolioRef.current = false
        }
      }

      if (currentIndex > 0) {
        currentIndex--
        if (currentIndex === PORTFOLIO_SECTION_INDEX) {
          portfolioIndexRef.current = portfolioItemsLength - 1
        }
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

    const scrollToSection = (index: number, fromNavClick = false) => {
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

          if (index === PORTFOLIO_SECTION_INDEX) {
            isInPortfolioRef.current = true

            if (fromNavClick) {
              portfolioIndexRef.current = 0
            }

            if (portfolioContainerRef.current) {
              const panelWidth = window.innerWidth
              const isRTL = document.documentElement.dir === "rtl"
              const direction = isRTL ? 1 : -1
              gsap.set(portfolioContainerRef.current, {
                x: direction * portfolioIndexRef.current * panelWidth,
              })
            }
          } else {
            isInPortfolioRef.current = false
            portfolioIndexRef.current = 0
            if (portfolioContainerRef.current) {
              gsap.set(portfolioContainerRef.current, { x: 0 })
            }
          }

          const event = new CustomEvent("sectionChange", { detail: { currentIndex: index } })
          window.dispatchEvent(event)
        },
      })
    }

    scrollToSectionRef.current = scrollToSection

    // قرار دادن تابع در window برای استفاده از Header
    ;(window as Window & { scrollToSection?: (index: number) => void }).scrollToSection = (
      index: number
    ) => scrollToSection(index, true)

    const updateSnapPoints = () => {
      setTimeout(() => {
        snapPoints = calculateSnapPoints()

        const wasEnabled = isScrollNavEnabled
        isScrollNavEnabled = window.innerWidth >= MIN_WIDTH_FOR_SCROLL_NAV

        if (wasEnabled && !isScrollNavEnabled) {
          isInPortfolioRef.current = false
          portfolioIndexRef.current = 0
          if (portfolioContainerRef.current) {
            gsap.set(portfolioContainerRef.current, { x: 0 })
          }
        }

        if (isScrollNavEnabled && portfolioContainerRef.current && isInPortfolioRef.current) {
          const panelWidth = window.innerWidth
          const isRTL = document.documentElement.dir === "rtl"
          const direction = isRTL ? 1 : -1
          gsap.set(portfolioContainerRef.current, {
            x: direction * portfolioIndexRef.current * panelWidth,
          })
        }
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

      if (currentIndex === PORTFOLIO_SECTION_INDEX) {
        if (!isInPortfolioRef.current) {
          isInPortfolioRef.current = true
        }
      } else {
        if (isInPortfolioRef.current) {
          isInPortfolioRef.current = false
          portfolioIndexRef.current = 0
          if (portfolioContainerRef.current) {
            gsap.set(portfolioContainerRef.current, { x: 0 })
          }
        }
      }

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
  }, [sectionsRef, portfolioContainerRef, portfolioIndexRef, isInPortfolioRef, portfolioItemsLength])

  return scrollToSectionRef
}

