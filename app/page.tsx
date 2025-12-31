"use client"

import { useEffect, useRef } from "react"
import { ArrowLeftIcon, CheckIcon, FileIcon, MailIcon, PhoneIcon, TextAlignCenterIcon, UserIcon } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import HeroCarousel from "@/components/static/heroCarousel/heroCarousel"
import CooperationBar from "@/components/static/cooperationBar/cooperationBar"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination } from "swiper/modules"

import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from "@/components/ui/input-group"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// داده‌های سوالات متداول
const faqItems = [
  {
    id: 1,
    question: "سوال 1",
    answer: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است."
  },
  {
    id: 2,
    question: "سوال 2",
    answer: "کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد."
  },
  {
    id: 3,
    question: "سوال 3",
    answer: "در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
  },
  {
    id: 4,
    question: "سوال 4",
    answer: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است."
  },
  {
    id: 5,
    question: "سوال 5",
    answer: "کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد."
  },
  {
    id: 6,
    question: "سوال 6",
    answer: "در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
  },
  {
    id: 7,
    question: "سوال 7",
    answer: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است."
  },
  {
    id: 8,
    question: "سوال 8",
    answer: "کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد."
  },
]

// داده‌های نمونه کار
const portfolioItems = [
  {
    title: "بیوتی پلاس",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد."
  },
  {
    title: "اپلیکیشن فروشگاهی",
    description: "کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد."
  },
  {
    title: "سامانه مدیریت",
    description: "در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
  }
]

function Page() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement[]>([])
  const portfolioWrapperRef = useRef<HTMLDivElement>(null)
  const portfolioContainerRef = useRef<HTMLDivElement>(null)
  const portfolioPanelsRef = useRef<HTMLDivElement[]>([])

  // ایندکس فعلی پنل پورتفولیو (0, 1, 2)
  const portfolioIndexRef = useRef(0)
  // آیا در سکشن پورتفولیو هستیم
  const isInPortfolioRef = useRef(false)

  // ref برای تابع scrollToSection که از Context استفاده می‌کنه
  const scrollToSectionRef = useRef<((index: number) => void) | null>(null)

  // ref برای لوگو در فوتر
  const footerLogoRef = useRef<HTMLImageElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const sections = sectionsRef.current.filter(Boolean)
    if (sections.length === 0) return

    // محاسبه موقعیت هر سکشن
    const calculateSnapPoints = () => {
      return sections.map((section) => {
        if (!section) return 0
        return section.offsetTop
      })
    }

    let snapPoints = calculateSnapPoints()

    let currentIndex = 0
    let isScrolling = false

    // انیمیشن برای اسکرول افقی پورتفولیو
    const scrollPortfolioToPanel = (panelIndex: number) => {
      if (!portfolioContainerRef.current) return

      isScrolling = true
      const panelWidth = window.innerWidth

      // چک کردن RTL - در RTL جهت transform برعکس میشه
      const isRTL = document.documentElement.dir === 'rtl'
      const direction = isRTL ? 1 : -1

      gsap.to(portfolioContainerRef.current, {
        x: direction * panelIndex * panelWidth,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          isScrolling = false
          portfolioIndexRef.current = panelIndex
        }
      })
    }

    const scrollToNext = () => {
      if (isScrolling) return

      // چک کردن اینکه آیا در سکشن پورتفولیو هستیم
      const portfolioSectionIndex = 4

      if (currentIndex === portfolioSectionIndex && isInPortfolioRef.current) {
        // اگر در سکشن پورتفولیو هستیم، اسکرول افقی بزن
        if (portfolioIndexRef.current < portfolioItems.length - 1) {
          scrollPortfolioToPanel(portfolioIndexRef.current + 1)
          return
        } else {
          // آخرین پنل پورتفولیو - برو سکشن بعدی
          isInPortfolioRef.current = false
          portfolioIndexRef.current = 0
        }
      }

      if (currentIndex < snapPoints.length - 1) {
        currentIndex++

        // اگر قرار است وارد سکشن پورتفولیو شویم، از اول شروع کن
        if (currentIndex === portfolioSectionIndex) {
          portfolioIndexRef.current = 0
        }

        scrollToSection(currentIndex)
      }
    }

    const scrollToPrevious = () => {
      if (isScrolling) return

      const portfolioSectionIndex = 4

      if (currentIndex === portfolioSectionIndex && isInPortfolioRef.current) {
        // اگر در سکشن پورتفولیو هستیم، اسکرول افقی به عقب
        if (portfolioIndexRef.current > 0) {
          scrollPortfolioToPanel(portfolioIndexRef.current - 1)
          return
        } else {
          // اولین پنل پورتفولیو - برو سکشن قبلی
          isInPortfolioRef.current = false
        }
      }

      if (currentIndex > 0) {
        currentIndex--

        // اگر قرار است به سکشن پورتفولیو برگردیم، از آخر شروع کن
        if (currentIndex === portfolioSectionIndex) {
          portfolioIndexRef.current = portfolioItems.length - 1
        }

        scrollToSection(currentIndex)
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) {
        e.preventDefault()
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
      // کلیدهای اسکرول: Arrow Down, Arrow Up, Page Down, Page Up, Space (با Shift برای بالا)
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
      if (isScrolling) return
      if (index < 0 || index >= snapPoints.length) return

      isScrolling = true
      const section = sections[index]
      if (!section) {
        isScrolling = false
        return
      }

      // برای سکشن آخر، مطمئن شو که به درستی اسکرول می‌شود
      const targetY = section.offsetTop
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight

      // اگر سکشن آخر است و محتوای بیشتری دارد، به انتهای صفحه اسکرول نکن
      const finalTargetY = Math.min(targetY, maxScroll)

      gsap.to(window, {
        scrollTo: {
          y: finalTargetY,
          autoKill: false,
        },
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          isScrolling = false

          // آپدیت کردن currentIndex - مهم برای اینکه scroll بعدی درست کار کنه
          currentIndex = index

          // مدیریت وضعیت پورتفولیو
          const portfolioSectionIndex = 4
          if (index === portfolioSectionIndex) {
            isInPortfolioRef.current = true

            // اگر از nav کلیک شده، به اول پورتفولیو برو
            if (fromNavClick) {
              portfolioIndexRef.current = 0
            }

            // تنظیم موقعیت x بر اساس portfolioIndexRef فعلی
            if (portfolioContainerRef.current) {
              const panelWidth = window.innerWidth
              const isRTL = document.documentElement.dir === 'rtl'
              const direction = isRTL ? 1 : -1
              gsap.set(portfolioContainerRef.current, { x: direction * portfolioIndexRef.current * panelWidth })
            }
          } else {
            // اگر از سکشن پورتفولیو خارج شدیم
            isInPortfolioRef.current = false
            portfolioIndexRef.current = 0
            if (portfolioContainerRef.current) {
              gsap.set(portfolioContainerRef.current, { x: 0 })
            }
          }

          // اطلاع دادن به Header از تغییر سکشن بعد از اسکرول
          const event = new CustomEvent('sectionChange', { detail: { currentIndex: index } })
          window.dispatchEvent(event)
        },
      })
    }

    // ذخیره تابع در ref برای استفاده در Context
    scrollToSectionRef.current = scrollToSection

      // همچنین در window قرار می‌دیم برای دسترسی از Header
      // fromNavClick = true برای کلیک‌های از هدر
      ; (window as Window & { scrollToSection?: (index: number) => void }).scrollToSection = (index: number) => scrollToSection(index, true)

    // محاسبه مجدد موقعیت‌ها در صورت تغییر اندازه صفحه
    const updateSnapPoints = () => {
      // کمی تاخیر برای اطمینان از اینکه layout به‌روزرسانی شده
      setTimeout(() => {
        snapPoints = calculateSnapPoints()

        // بروزرسانی موقعیت افقی پورتفولیو در صورت resize
        if (portfolioContainerRef.current && isInPortfolioRef.current) {
          const panelWidth = window.innerWidth
          const isRTL = document.documentElement.dir === 'rtl'
          const direction = isRTL ? 1 : -1
          gsap.set(portfolioContainerRef.current, { x: direction * portfolioIndexRef.current * panelWidth })
        }
      }, 100)
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("resize", updateSnapPoints)

    // پیدا کردن سکشن فعلی بر اساس موقعیت اسکرول
    const updateCurrentIndex = () => {
      if (isScrolling) return

      const scrollY = window.scrollY
      const viewportTop = scrollY
      const viewportBottom = scrollY + window.innerHeight

      // پیدا کردن سکشنی که بیشترین همپوشانی را با viewport دارد
      let bestIndex = 0
      let maxOverlap = 0

      sections.forEach((section, index) => {
        if (!section) return

        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        // محاسبه همپوشانی
        const overlapTop = Math.max(viewportTop, sectionTop)
        const overlapBottom = Math.min(viewportBottom, sectionBottom)
        const overlap = Math.max(0, overlapBottom - overlapTop)

        if (overlap > maxOverlap) {
          maxOverlap = overlap
          bestIndex = index
        }
      })

      currentIndex = bestIndex

      // بروزرسانی وضعیت پورتفولیو
      const portfolioSectionIndex = 4
      if (currentIndex === portfolioSectionIndex) {
        if (!isInPortfolioRef.current) {
          isInPortfolioRef.current = true
        }
      } else {
        // اگر از سکشن پورتفولیو خارج شدیم
        if (isInPortfolioRef.current) {
          isInPortfolioRef.current = false
          portfolioIndexRef.current = 0
          if (portfolioContainerRef.current) {
            gsap.set(portfolioContainerRef.current, { x: 0 })
          }
        }
      }

      // اطلاع دادن به Header از تغییر سکشن فعلی
      const event = new CustomEvent('sectionChange', { detail: { currentIndex } })
      window.dispatchEvent(event)
    }

    // مقداردهی اولیه با تاخیر برای اطمینان از رندر کامل
    setTimeout(() => {
      snapPoints = calculateSnapPoints()
      updateCurrentIndex()
      // اطلاع دادن به Header از سکشن اولیه
      const event = new CustomEvent('sectionChange', { detail: { currentIndex } })
      window.dispatchEvent(event)
    }, 100)

    window.addEventListener("scroll", updateCurrentIndex, { passive: true })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("resize", updateSnapPoints)
      window.removeEventListener("scroll", updateCurrentIndex)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      // پاک کردن تابع از window
      delete (window as Window & { scrollToSection?: (index: number) => void }).scrollToSection
    }
  }, [])

  // انیمیشن حرکت لوگو با ماوس
  useEffect(() => {
    const footer = footerRef.current
    const logo = footerLogoRef.current
    if (!footer || !logo) return

    // GSAP quickTo برای انیمیشن نرم و روان
    const xTo = gsap.quickTo(logo, "x", { duration: 1.2, ease: "elastic.out(1, 0.3)" })
    const yTo = gsap.quickTo(logo, "y", { duration: 1.2, ease: "elastic.out(1, 0.3)" })
    const rotateTo = gsap.quickTo(logo, "rotation", { duration: 1.5, ease: "elastic.out(1, 0.5)" })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = footer.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // محاسبه فاصله ماوس از مرکز
      const deltaX = (e.clientX - centerX) / 8
      const deltaY = (e.clientY - centerY) / 8

      // زاویه چرخش بر اساس حرکت ماوس
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

    footer.addEventListener("mousemove", handleMouseMove)
    footer.addEventListener("mouseleave", handleMouseLeave)
    footer.addEventListener("mousedown", handleMouseDown)
    footer.addEventListener("mouseup", handleMouseUp)

    return () => {
      footer.removeEventListener("mousemove", handleMouseMove)
      footer.removeEventListener("mouseleave", handleMouseLeave)
      footer.removeEventListener("mousedown", handleMouseDown)
      footer.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <div ref={containerRef}>
      <div
        id="home"
        ref={(el) => {
          if (el) sectionsRef.current[0] = el
        }}
        className="wrapper grid grid-cols-2 h-screen"
      >
        <div className="h-full flex justify-center items-center">
          <div>
            <h1 className="text-8xl font-black font-morabba-bold">پلاس</h1>
            <h2 className="text-5xl font-bold mt-9 font-morabba-medium leading-snug">
              بزرگ ترین شرکت <br /> برنامه نویسی مشهد
            </h2>
            <p className="mt-6 leading-loose">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ <br /> و
              با استفاده از طراحان گرافیک است
            </p>
          </div>
        </div>
        <div className="h-full flex justify-center items-center">
          <HeroCarousel />
        </div>
      </div>

      <div
        id="about"
        ref={(el) => {
          if (el) sectionsRef.current[1] = el
        }}
        className="wrapper h-screen pt-20">
        <CooperationBar />
        <div className="grid grid-cols-2 h-[calc(100%-6.5rem)]">
          <div className="h-full flex justify-center items-center">
            <div className="w-3/4">
              <h3 className="text-5xl font-bold font-morabba-medium">درباره ما</h3>
              <p className="leading-loose mt-6">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
                طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
                فارسی ایجاد کرد، در این صورت می توان امید داشت.
              </p>
            </div>
          </div>
          <div className="h-full flex justify-center items-center">
            <div className="size-96 rounded-lg bg-card"></div>
          </div>
        </div>
      </div>

      <div
        id="about-2"
        ref={(el) => {
          if (el) sectionsRef.current[2] = el
        }}
        className="wrapper h-screen pt-20 grid grid-cols-2"
      >
        <div className="h-full flex justify-center items-center">
          <div className="size-96 rounded-lg bg-card"></div>
        </div>
        <div className="h-full flex justify-center items-center">
          <div className="w-3/4">
            <h3 className="text-5xl font-bold font-morabba-medium">درباره ما</h3>
            <p className="leading-loose mt-6">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد، در این صورت می توان امید داشت.
            </p>
          </div>
        </div>
      </div>

      <div
        id="about-3"
        ref={(el) => {
          if (el) sectionsRef.current[3] = el
        }}
        className="wrapper h-screen pt-20 grid grid-cols-2"
      >
        <div className="h-full flex justify-center items-center">
          <div className="w-3/4">
            <h3 className="text-5xl font-bold font-morabba-medium">درباره ما</h3>
            <p className="leading-loose mt-6">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد، در این صورت می توان امید داشت.
            </p>
          </div>
        </div>
        <div className="h-full flex justify-center items-center">
          <div className="size-96 rounded-lg bg-card"></div>
        </div>
      </div>

      {/* سکشن نمونه کارها با اسکرول افقی */}
      <div
        id="portfolio"
        ref={(el) => {
          if (el) sectionsRef.current[4] = el
          portfolioWrapperRef.current = el
        }}
        className="h-screen overflow-hidden"
      >
        <div className="h-full pt-26 pb-6 flex flex-col">
          <h3 className="text-5xl font-bold font-morabba-bold text-center mb-8">نمونه کار های ما</h3>

          {/* کانتینر افقی با overflow hidden */}
          <div className="flex-1 overflow-hidden">
            {/* پنل‌های افقی */}
            <div
              ref={portfolioContainerRef}
              className="h-full flex"
              style={{ width: `${portfolioItems.length * 100}vw` }}
            >
              {portfolioItems.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) portfolioPanelsRef.current[index] = el
                  }}
                  className="w-screen h-full shrink-0 flex items-center justify-center px-12"
                >
                  <div className="flex flex-col items-center gap-6 max-w-4xl">
                    <div className="size-48 bg-card rounded-full flex items-center justify-center">
                      <span className="text-6xl font-bold text-muted-foreground">{index + 1}</span>
                    </div>
                    <p className="text-3xl font-bold font-morabba-medium">{item.title}</p>
                    <p className="text-center leading-loose text-muted-foreground">
                      {item.description}
                    </p>

                    {/* نشانگر پنل‌ها */}
                    <div className="flex gap-3 mt-6">
                      {portfolioItems.map((_, dotIndex) => (
                        <div
                          key={dotIndex}
                          className={`size-3 rounded-full transition-all duration-300 ${dotIndex === index ? 'bg-primary scale-125' : 'bg-muted'
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        id="software-packages"
        ref={(el) => {
          if (el) sectionsRef.current[5] = el
        }}
        className="wrapper h-screen pt-26 pb-6 flex flex-col items-center justify-center gap-12"
      >
        <h3 className="text-5xl font-bold font-morabba-medium">پکیج های نرم افزاری</h3>
        <div className="grid grid-cols-4 gap-6 flex-1">
          <div className="p-6 border-4 border-card rounded-lg flex flex-col">
            <p className="px-3 py-1 bg-green-600 mx-auto w-max rounded-full">
              وب اپلیکیشن
            </p>
            <p className="text-center mt-6 text-2xl">
              از {(30_000_000).toLocaleString("fa")} تومان
            </p>
            <ul className="my-auto list-disc text-sm text-center space-y-3 leading-loose">
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
            </ul>
            <Button>
              <span>خرید</span>
              <CheckIcon />
            </Button>
          </div>
          <div className="p-6 border-4 border-card rounded-lg flex flex-col">
            <p className="px-3 py-1 bg-green-600 mx-auto w-max rounded-full">
              وب اپلیکیشن
            </p>
            <p className="text-center mt-6 text-2xl">
              از {(30_000_000).toLocaleString("fa")} تومان
            </p>
            <ul className="my-auto list-disc text-sm text-center space-y-3 leading-loose">
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
            </ul>
            <Button>
              <span>خرید</span>
              <CheckIcon />
            </Button>
          </div>
          <div className="p-6 border-4 border-card rounded-lg flex flex-col">
            <p className="px-3 py-1 bg-green-600 mx-auto w-max rounded-full">
              وب اپلیکیشن
            </p>
            <p className="text-center mt-6 text-2xl">
              از {(30_000_000).toLocaleString("fa")} تومان
            </p>
            <ul className="my-auto list-disc text-sm text-center space-y-3 leading-loose">
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
            </ul>
            <Button>
              <span>خرید</span>
              <CheckIcon />
            </Button>
          </div>
          <div className="p-6 border-4 border-card rounded-lg flex flex-col">
            <p className="px-3 py-1 bg-green-600 mx-auto w-max rounded-full">
              وب اپلیکیشن
            </p>
            <p className="text-center mt-6 text-2xl">
              از {(30_000_000).toLocaleString("fa")} تومان
            </p>
            <ul className="my-auto list-disc text-sm text-center space-y-3 leading-loose">
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
            </ul>
            <Button>
              <span>خرید</span>
              <CheckIcon />
            </Button>
          </div>
        </div>
      </div>

      <div
        id="content-packages"
        ref={(el) => {
          if (el) sectionsRef.current[6] = el
        }}
        className="wrapper h-screen pt-26 pb-6 flex flex-col items-center justify-center gap-12"
      >
        <h3 className="text-5xl font-bold font-morabba-medium">پکیج های تولید محتوا</h3>
        <div className="grid grid-cols-4 gap-6 flex-1">
          <div className="p-6 border-4 border-card rounded-lg flex flex-col">
            <p className="px-3 py-1 bg-green-600 mx-auto w-max rounded-full">
              وب اپلیکیشن
            </p>
            <p className="text-center mt-6 text-2xl">
              از {(30_000_000).toLocaleString("fa")} تومان
            </p>
            <ul className="my-auto list-disc text-sm text-center space-y-3 leading-loose">
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
            </ul>
            <Button>
              <span>خرید</span>
              <CheckIcon />
            </Button>
          </div>
          <div className="p-6 border-4 border-card rounded-lg flex flex-col">
            <p className="px-3 py-1 bg-green-600 mx-auto w-max rounded-full">
              وب اپلیکیشن
            </p>
            <p className="text-center mt-6 text-2xl">
              از {(30_000_000).toLocaleString("fa")} تومان
            </p>
            <ul className="my-auto list-disc text-sm text-center space-y-3 leading-loose">
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
            </ul>
            <Button>
              <span>خرید</span>
              <CheckIcon />
            </Button>
          </div>
          <div className="p-6 border-4 border-card rounded-lg flex flex-col">
            <p className="px-3 py-1 bg-green-600 mx-auto w-max rounded-full">
              وب اپلیکیشن
            </p>
            <p className="text-center mt-6 text-2xl">
              از {(30_000_000).toLocaleString("fa")} تومان
            </p>
            <ul className="my-auto list-disc text-sm text-center space-y-3 leading-loose">
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
            </ul>
            <Button>
              <span>خرید</span>
              <CheckIcon />
            </Button>
          </div>
          <div className="p-6 border-4 border-card rounded-lg flex flex-col">
            <p className="px-3 py-1 bg-green-600 mx-auto w-max rounded-full">
              وب اپلیکیشن
            </p>
            <p className="text-center mt-6 text-2xl">
              از {(30_000_000).toLocaleString("fa")} تومان
            </p>
            <ul className="my-auto list-disc text-sm text-center space-y-3 leading-loose">
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
            </ul>
            <Button>
              <span>خرید</span>
              <CheckIcon />
            </Button>
          </div>
        </div>
      </div>

      <div
        id="bloggers"
        ref={(el) => {
          if (el) sectionsRef.current[7] = el
        }}
        className="wrapper h-screen pt-26 pb-6 flex flex-col items-center justify-center gap-12"
      >
        <h3 className="text-5xl font-bold font-morabba-medium">بلاگر های ما</h3>
        <div className="grid grid-cols-4 gap-6 flex-1">
          <div className="p-6 border-4 border-card rounded-lg flex flex-col">
            <p className="px-3 py-1 bg-green-600 mx-auto w-max rounded-full">
              وب اپلیکیشن
            </p>
            <p className="text-center mt-6 text-2xl">
              از {(30_000_000).toLocaleString("fa")} تومان
            </p>
            <ul className="my-auto list-disc text-sm text-center space-y-3 leading-loose">
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
            </ul>
            <Button>
              <span>خرید</span>
              <CheckIcon />
            </Button>
          </div>
          <div className="p-6 border-4 border-card rounded-lg flex flex-col">
            <p className="px-3 py-1 bg-green-600 mx-auto w-max rounded-full">
              وب اپلیکیشن
            </p>
            <p className="text-center mt-6 text-2xl">
              از {(30_000_000).toLocaleString("fa")} تومان
            </p>
            <ul className="my-auto list-disc text-sm text-center space-y-3 leading-loose">
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
            </ul>
            <Button>
              <span>خرید</span>
              <CheckIcon />
            </Button>
          </div>
          <div className="p-6 border-4 border-card rounded-lg flex flex-col">
            <p className="px-3 py-1 bg-green-600 mx-auto w-max rounded-full">
              وب اپلیکیشن
            </p>
            <p className="text-center mt-6 text-2xl">
              از {(30_000_000).toLocaleString("fa")} تومان
            </p>
            <ul className="my-auto list-disc text-sm text-center space-y-3 leading-loose">
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
            </ul>
            <Button>
              <span>خرید</span>
              <CheckIcon />
            </Button>
          </div>
          <div className="p-6 border-4 border-card rounded-lg flex flex-col">
            <p className="px-3 py-1 bg-green-600 mx-auto w-max rounded-full">
              وب اپلیکیشن
            </p>
            <p className="text-center mt-6 text-2xl">
              از {(30_000_000).toLocaleString("fa")} تومان
            </p>
            <ul className="my-auto list-disc text-sm text-center space-y-3 leading-loose">
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
              <li>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </li>
            </ul>
            <Button>
              <span>خرید</span>
              <CheckIcon />
            </Button>
          </div>
        </div>
      </div>

      <div
        id="testimonials"
        ref={(el) => {
          if (el) sectionsRef.current[8] = el
        }}
        className="wrapper h-screen pt-26 pb-6 flex flex-col items-center justify-center gap-12"
      >
        <h3 className="text-5xl font-bold font-morabba-medium">نظرات مشتریان</h3>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          initialSlide={1}
          slidesPerView={3}
          loop={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="w-full flex-1"
        >
          <SwiperSlide>
            <div className="h-full flex flex-col justify-center items-center">

              <div className="p-6 rounded-lg bg-card">
                <p className="text-xl text-center font-yekan-bakh-bold">فرزاد وحدتی نژاد</p>
                <p className="leading-loose text-center mt-6">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-full flex flex-col justify-center items-center">

              <div className="p-6 rounded-lg bg-card">
                <p className="text-xl text-center font-yekan-bakh-bold">فرزاد وحدتی نژاد</p>
                <p className="leading-loose text-center mt-6">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-full flex flex-col justify-center items-center">

              <div className="p-6 rounded-lg bg-card">
                <p className="text-xl text-center font-yekan-bakh-bold">فرزاد وحدتی نژاد</p>
                <p className="leading-loose text-center mt-6">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-full flex flex-col justify-center items-center">

              <div className="p-6 rounded-lg bg-card">
                <p className="text-xl text-center font-yekan-bakh-bold">فرزاد وحدتی نژاد</p>
                <p className="leading-loose text-center mt-6">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-full flex flex-col justify-center items-center">

              <div className="p-6 rounded-lg bg-card">
                <p className="text-xl text-center font-yekan-bakh-bold">فرزاد وحدتی نژاد</p>
                <p className="leading-loose text-center mt-6">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-full flex flex-col justify-center items-center">

              <div className="p-6 rounded-lg bg-card">
                <p className="text-xl text-center font-yekan-bakh-bold">فرزاد وحدتی نژاد</p>
                <p className="leading-loose text-center mt-6">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-full flex flex-col justify-center items-center">

              <div className="p-6 rounded-lg bg-card">
                <p className="text-xl text-center font-yekan-bakh-bold">فرزاد وحدتی نژاد</p>
                <p className="leading-loose text-center mt-6">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-full flex flex-col justify-center items-center">

              <div className="p-6 rounded-lg bg-card">
                <p className="text-xl text-center font-yekan-bakh-bold">فرزاد وحدتی نژاد</p>
                <p className="leading-loose text-center mt-6">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-full flex flex-col justify-center items-center">

              <div className="p-6 rounded-lg bg-card">
                <p className="text-xl text-center font-yekan-bakh-bold">فرزاد وحدتی نژاد</p>
                <p className="leading-loose text-center mt-6">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div
        id="faq"
        ref={(el) => {
          if (el) sectionsRef.current[9] = el
        }}
        className="wrapper h-screen pt-26 pb-6 flex flex-col items-center justify-center gap-12"
      >
        <h3 className="text-5xl font-bold font-morabba-medium">سوالات متداول</h3>
        <div className="w-full grid grid-cols-2 gap-6 flex-1">
          {faqItems.map((item) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <Button className="w-full justify-between h-full" variant={"outline"} size={"lg"}>
                  <span>{item.question}</span>
                  <ArrowLeftIcon />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{item.question}</DialogTitle>
                  <DialogDescription className="leading-loose mt-3">
                    {item.answer}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>

      <div
        id="contact"
        ref={(el) => {
          if (el) sectionsRef.current[10] = el
        }}
        className="h-screen pt-26 pb-6"
      >
        <div className="h-full bg-linear-to-t from-card to-background py-12 rounded-b-[15%]">
          <div className="wrapper h-full flex flex-col items-center justify-center gap-12">
            <h3 className="text-5xl font-bold font-morabba-medium">ارتباط و همکاری با ما</h3>
            <div className="grid grid-cols-2 gap-6 w-3/4">
              <InputGroup>
                <InputGroupAddon>
                  <UserIcon />
                </InputGroupAddon>
                <InputGroupInput placeholder="نام و نام خانوادگی" />
              </InputGroup>

              <InputGroup>
                <InputGroupAddon>
                  <FileIcon />
                </InputGroupAddon>
                <InputGroupInput type="file" placeholder="فایل ضمیمه (اختیاری)" />
              </InputGroup>

              <InputGroup className="col-span-2">
                <InputGroupAddon>
                  <TextAlignCenterIcon />
                </InputGroupAddon>
                <InputGroupTextarea placeholder="شرح موضوع تان..." />
              </InputGroup>

              <div className="col-span-2 flex justify-end">
                <Button>ارسال</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="footer"
        ref={(el) => {
          if (el) {
            sectionsRef.current[11] = el
            footerRef.current = el
          }
        }}
        className="wrapper h-screen pt-26 flex flex-col justify-center items-center relative">
        <Image
          ref={footerLogoRef}
          className="absolute -z-10 blur-sm will-change-transform"
          style={{ opacity: 0.1 }}
          src="/logo-white.svg"
          alt="logo"
          width={500}
          height={500}
        />

        <p className="text-center w-1/2 leading-loose">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
        </p>

        <div className="flex items-center justify-center gap-6 mt-12">
          <Button variant="ghost">
            <span>info@plus.com</span>
            <MailIcon />
          </Button>
          <Button variant="ghost">
            <span>09123456789</span>
            <PhoneIcon />
          </Button>
        </div>
        <div className="flex items-center justify-center gap-6 mt-6">
          <Image src="/instagram.png" alt="instagram" width={30} height={30} />
          <Image src="/telegram.png" alt="telegram" width={30} height={30} />
          <Image src="/linkedin.png" alt="linkedin" width={30} height={30} />
        </div>
      </div>
    </div>
  )
}

export default Page