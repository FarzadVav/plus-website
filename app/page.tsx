"use client"

import { useEffect, useRef } from "react"
import { ArrowLeftIcon, CheckIcon, FileIcon, MailIcon, PhoneIcon, TextAlignCenterIcon, UserIcon } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

import { Button } from "@/components/ui/button"
import HeroCarousel from "@/components/static/heroCarousel/heroCarousel"
import CooperationBar from "@/components/static/cooperationBar/cooperationBar"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination } from "swiper/modules"

import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from "@/components/ui/input-group"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

function Page() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement[]>([])

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

    const scrollToNext = () => {
      if (isScrolling) return
      if (currentIndex < snapPoints.length - 1) {
        currentIndex++
        scrollToSection(currentIndex)
      }
    }

    const scrollToPrevious = () => {
      if (isScrolling) return
      if (currentIndex > 0) {
        currentIndex--
        scrollToSection(currentIndex)
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) {
        console.log("isScrolling")
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

    const scrollToSection = (index: number) => {
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
        },
      })
    }

    // محاسبه مجدد موقعیت‌ها در صورت تغییر اندازه صفحه
    const updateSnapPoints = () => {
      // کمی تاخیر برای اطمینان از اینکه layout به‌روزرسانی شده
      setTimeout(() => {
        snapPoints = calculateSnapPoints()
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
    }

    // مقداردهی اولیه با تاخیر برای اطمینان از رندر کامل
    setTimeout(() => {
      snapPoints = calculateSnapPoints()
      updateCurrentIndex()
    }, 100)

    window.addEventListener("scroll", updateCurrentIndex, { passive: true })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("keydown", handleKeyDown)
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
        className="wrapper h-screen pt-26 pb-6 flex flex-col items-center justify-center gap-12"
      >
        <h3 className="text-5xl font-bold font-morabba-bold">نمونه کار های ما</h3>
        <div className="flex-1 flex flex-col justify-center items-center gap-6">
          <div className="size-40 bg-card rounded-full"></div>
          <p className="text-3xl font-bold font-morabba-medium">بیوتی پلاس</p>
          <p className="w-3/4 text-center leading-loose">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
          </p>
        </div>
      </div>

      <div
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
        ref={(el) => {
          if (el) sectionsRef.current[9] = el
        }}
        className="wrapper h-screen pt-26 pb-6 flex flex-col items-center justify-center gap-12"
      >
        <h3 className="text-5xl font-bold font-morabba-medium">سوالات متداول</h3>
        <div className="w-full grid grid-cols-2 gap-6 flex-1">
          <Button className="w-full justify-between h-full" variant={"outline"} size={"lg"}>
            <span>سوال 1</span>
            <ArrowLeftIcon />
          </Button>
          <Button className="w-full justify-between h-full" variant={"outline"} size={"lg"}>
            <span>سوال 2</span>
            <ArrowLeftIcon />
          </Button>
          <Button className="w-full justify-between h-full" variant={"outline"} size={"lg"}>
            <span>سوال 3</span>
            <ArrowLeftIcon />
          </Button>
          <Button className="w-full justify-between h-full" variant={"outline"} size={"lg"}>
            <span>سوال 4</span>
            <ArrowLeftIcon />
          </Button>
          <Button className="w-full justify-between h-full" variant={"outline"} size={"lg"}>
            <span>سوال 5</span>
            <ArrowLeftIcon />
          </Button>
          <Button className="w-full justify-between h-full" variant={"outline"} size={"lg"}>
            <span>سوال 6</span>
            <ArrowLeftIcon />
          </Button>
          <Button className="w-full justify-between h-full" variant={"outline"} size={"lg"}>
            <span>سوال 7</span>
            <ArrowLeftIcon />
          </Button>
          <Button className="w-full justify-between h-full" variant={"outline"} size={"lg"}>
            <span>سوال 8</span>
            <ArrowLeftIcon />
          </Button>
        </div>
      </div>

      <div
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
        ref={(el) => {
          if (el) sectionsRef.current[11] = el
        }}
        className="wrapper h-screen pt-26 flex flex-col justify-center items-center relative">
        <Image className="absolute -z-10 opacity-10 blur-sm" src="/logo-white.svg" alt="logo" width={500} height={500} />

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