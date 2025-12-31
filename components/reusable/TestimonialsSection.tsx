import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination } from "swiper/modules"
import { TestimonialCard } from "./TestimonialCard"
import { SWIPER_BREAKPOINTS, SWIPER_COVERFLOW_CONFIG } from "@/lib/constants"
import { forwardRef } from "react"

interface Testimonial {
  name: string
  text: string
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

const TestimonialsSection = forwardRef<HTMLDivElement, TestimonialsSectionProps>(
  ({ testimonials }, ref) => {
    return (
      <div
        id="testimonials"
        ref={ref}
        className="wrapper lg:h-screen lg:pt-26 lg:pb-6 lg:flex lg:flex-col lg:items-center lg:justify-center lg:gap-12 max-lg:mt-20"
      >
        <h3 className="heading max-lg:text-center">نظرات مشتریان</h3>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          initialSlide={1}
          slidesPerView={3}
          breakpoints={SWIPER_BREAKPOINTS}
          loop={true}
          coverflowEffect={SWIPER_COVERFLOW_CONFIG}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="w-full lg:flex-1 max-lg:mt-5"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide className="max-lg:pb-12" key={index}>
              <TestimonialCard {...testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  }
)

TestimonialsSection.displayName = "TestimonialsSection"

export default TestimonialsSection

