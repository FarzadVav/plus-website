// ثابت‌های پروژه
export const MIN_WIDTH_FOR_SCROLL_NAV = 1024
export const TOTAL_SECTIONS = 14

// تنظیمات انیمیشن
export const SCROLL_ANIMATION_DURATION = 1
export const FOOTER_LOGO_ANIMATION_DURATION = 1.2
export const FOOTER_LOGO_ROTATION_DURATION = 1.5

// تنظیمات Swiper
export const SWIPER_BREAKPOINTS = {
  0: { slidesPerView: 1 },
  1024: { slidesPerView: 3 },
} as const

export const SWIPER_COVERFLOW_CONFIG = {
  rotate: 50,
  stretch: 0,
  depth: 100,
  modifier: 1,
  slideShadows: false,
} as const

