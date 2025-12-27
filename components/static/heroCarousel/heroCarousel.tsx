"use client"

import { EffectCards } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/effect-cards';

function HeroCarousel() {
  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      className="w-90 h-110"
    >
      <SwiperSlide className="rounded-2xl"><div className="size-full rounded-lg bg-neutral-100"></div></SwiperSlide>
      <SwiperSlide className="rounded-2xl"><div className="size-full rounded-lg bg-neutral-200"></div></SwiperSlide>
      <SwiperSlide className="rounded-2xl"><div className="size-full rounded-lg bg-neutral-300"></div></SwiperSlide>
      <SwiperSlide className="rounded-2xl"><div className="size-full rounded-lg bg-neutral-400"></div></SwiperSlide>
      <SwiperSlide className="rounded-2xl"><div className="size-full rounded-lg bg-neutral-500"></div></SwiperSlide>
      <SwiperSlide className="rounded-2xl"><div className="size-full rounded-lg bg-neutral-600"></div></SwiperSlide>
      <SwiperSlide className="rounded-2xl"><div className="size-full rounded-lg bg-neutral-700"></div></SwiperSlide>
      <SwiperSlide className="rounded-2xl"><div className="size-full rounded-lg bg-neutral-800"></div></SwiperSlide>
      <SwiperSlide className="rounded-2xl"><div className="size-full rounded-lg bg-neutral-900"></div></SwiperSlide>
    </Swiper>
  )
}

export default HeroCarousel