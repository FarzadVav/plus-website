"use client"

import { useEffect, useRef } from "react"
import { CheckIcon } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

import { Button } from "@/components/ui/button"
import HeroCarousel from "@/components/static/heroCarousel/heroCarousel"
import CooperationBar from "@/components/static/cooperationBar/cooperationBar"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

function Page() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const sections = sectionsRef.current.filter(Boolean)
    if (sections.length === 0) return

    // محاسبه موقعیت هر سکشن
    const snapPoints = sections.map((section) => {
      return section.offsetTop
    })

    let currentIndex = 0
    let isScrolling = false

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) {
        e.preventDefault()
        return
      }

      e.preventDefault()

      if (e.deltaY > 0) {
        // اسکرول به پایین
        if (currentIndex < snapPoints.length - 1) {
          currentIndex++
          scrollToSection(currentIndex)
        }
      } else {
        // اسکرول به بالا
        if (currentIndex > 0) {
          currentIndex--
          scrollToSection(currentIndex)
        }
      }
    }

    const scrollToSection = (index: number) => {
      if (isScrolling) return

      isScrolling = true
      const targetY = snapPoints[index]

      gsap.to(window, {
        scrollTo: {
          y: targetY,
          autoKill: false,
        },
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          isScrolling = false
        },
      })
    }

    // محاسبه مجدد موقعیت‌ها در صورت تغییر اندازه صفحه
    const updateSnapPoints = () => {
      snapPoints.forEach((_, index) => {
        if (sections[index]) {
          snapPoints[index] = sections[index].offsetTop
        }
      })
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("resize", updateSnapPoints)

    // پیدا کردن سکشن فعلی بر اساس موقعیت اسکرول
    const updateCurrentIndex = () => {
      if (isScrolling) return

      const scrollY = window.scrollY
      const viewportCenter = scrollY + window.innerHeight / 2

      // پیدا کردن نزدیک‌ترین سکشن
      let closestIndex = 0
      let minDistance = Math.abs(snapPoints[0] - viewportCenter)

      snapPoints.forEach((point, index) => {
        const distance = Math.abs(point - viewportCenter)
        if (distance < minDistance) {
          minDistance = distance
          closestIndex = index
        }
      })

      currentIndex = closestIndex
    }

    // مقداردهی اولیه
    updateCurrentIndex()

    window.addEventListener("scroll", updateCurrentIndex, { passive: true })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("resize", updateSnapPoints)
      window.removeEventListener("scroll", updateCurrentIndex)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef}>
      <div
        ref={(el) => {
          if (el) sectionsRef.current[0] = el
        }}
        className="wrapper grid grid-cols-2 h-screen pt-20"
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
      <div
        ref={(el) => {
          if (el) sectionsRef.current[4] = el
        }}
        className="wrapper h-screen pt-23 pb-6 flex flex-col items-center justify-center gap-12"
      >
        <h3 className="text-5xl font-bold font-morabba-medium">پکیج های ما</h3>
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
    </div>
  )
}

export default Page