import Image from "next/image"
import { forwardRef } from "react"
import { EffectCards } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const SLIDES = [
  { title: "تولید محتوای اینستاگرام", src: "/contentCreating.png" },
  { title: "ساخت اپلیکیشن", src: "/app.png" },
  { title: "سناریو نویسی", src: "/scripting.png" },
  { title: "طراحی برند", src: "/branding.png" },
  { title: "طراحی سایت", src: "/website.png" },
  { title: "طراحی لیبل", src: "/label.png" },
  { title: "ساخت اپلیکیشن CRM", src: "/crm.png" },
  { title: "امنیت سایت و پیج", src: "/security.png" },
  { title: "فیلم برداری", src: "/recording.png" },
]

const HeroSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      id="home"
      ref={ref}
      className="wrapper grid grid-cols-1 lg:grid-cols-2 lg:h-screen max-lg:mt-10"
    >
      <div className="lg:h-full flex justify-center items-center">
        <div>
          <h1 className="text-5xl lg:text-8xl font-black font-morabba-bold max-lg:text-center max-lg:mt-12">
            پلاس
          </h1>
          <h2 className="heading mt-9 max-lg:text-center">
            توسعه‌ی کسب و کارتونو <br /> صفر تا صد به ما بسپارید
          </h2>
          <p className="mt-6 leading-loose max-lg:text-center">
            اولین مجموعه‌ی چند منظوره‌ی توسعه‌ی کسب و کار بر اساس علم دیجیتال مارکتینگ
          </p>
        </div>
      </div>
      <div className="lg:h-full flex justify-center items-center max-lg:row-start-1 max-lg:overflow-hidden">
        <Swiper
          loop
          autoplay
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="w-48 lg:w-96 aspect-3/4"
        >
          {SLIDES.map((slide) => (
            <SwiperSlide className="rounded-2xl" key={slide.title}>
              <div className="size-full rounded-2xl relative">
                <Image className="size-full" src={slide.src} width={384} height={512} alt={slide.title} />
                <div className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 w-max max-w-10/12 py-1 px-2 sm:py-3 sm:px-6 backdrop-blur-sm rounded-full">
                  <h3 className="text-background font-bold text-center leading-loose max-sm:text-xs">{slide.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
})

HeroSection.displayName = "HeroSection"

export default HeroSection

