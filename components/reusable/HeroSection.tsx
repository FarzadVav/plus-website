import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards } from "swiper/modules"
import { forwardRef } from "react"

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
            بزرگ ترین شرکت <br /> برنامه نویسی مشهد
          </h2>
          <p className="mt-6 leading-loose max-lg:text-center">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ <br /> و با استفاده از
            طراحان گرافیک است
          </p>
        </div>
      </div>
      <div className="lg:h-full flex justify-center items-center max-lg:row-start-1 max-lg:overflow-hidden">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="w-50 h-70 lg:w-90 lg:h-110"
        >
          {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade, index) => (
            <SwiperSlide className="rounded-2xl" key={index}>
              <div
                className="size-full rounded-lg"
                style={{ backgroundColor: `rgb(${255 - shade * 0.1}, ${255 - shade * 0.1}, ${255 - shade * 0.1})` }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
})

HeroSection.displayName = "HeroSection"

export default HeroSection

