"use client"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-cards"
import "swiper/css/effect-coverflow"

import { useRef } from "react"
import { useScrollNavigation } from "@/hooks/useScrollNavigation"
import { useFooterLogoAnimation } from "@/hooks/useFooterLogoAnimation"
import { faqItems, portfolioItems, testimonials, packageData } from "@/lib/data"

// Components
import HeroSection from "@/components/reusable/HeroSection"
import AboutSection from "@/components/reusable/AboutSection"
import PortfolioSection from "@/components/reusable/PortfolioSection"
import { PackageSection } from "@/components/reusable/PackageSection"
import TestimonialsSection from "@/components/reusable/TestimonialsSection"
import FAQSection from "@/components/reusable/FAQSection"
import ContactSection from "@/components/reusable/ContactSection"
import FooterSection from "@/components/reusable/FooterSection"

const ABOUT_DESCRIPTION =
  "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت."

// ایجاد آرایه پکیج‌ها برای استفاده مجدد
const createPackages = (count: number) =>
  Array.from({ length: count }, () => ({
    title: packageData.title,
    price: packageData.price,
    features: packageData.features,
  }))

function Page() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement[]>([])
  const portfolioContainerRef = useRef<HTMLDivElement>(null)
  const portfolioIndexRef = useRef(0)
  const isInPortfolioRef = useRef(false)
  const footerLogoRef = useRef<HTMLImageElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  // استفاده از custom hooks
  useScrollNavigation({
    sectionsRef,
    portfolioContainerRef,
    portfolioIndexRef,
    isInPortfolioRef,
    portfolioItemsLength: portfolioItems.length,
  })

  useFooterLogoAnimation(footerRef, footerLogoRef)

  return (
    <div ref={containerRef}>
      {/* Hero Section */}
      <HeroSection
        ref={(el) => {
          if (el) sectionsRef.current[0] = el
        }}
      />

      {/* About Sections */}
      <AboutSection
        id="about"
        title="درباره ما"
        description={ABOUT_DESCRIPTION}
        imagePosition="right"
        showCooperationBar={true}
        ref={(el) => {
          if (el) sectionsRef.current[1] = el
        }}
      />

      <AboutSection
        id="about-2"
        title="درباره ما"
        description={ABOUT_DESCRIPTION}
        imagePosition="left"
        ref={(el) => {
          if (el) sectionsRef.current[2] = el
        }}
      />

      <AboutSection
        id="about-3"
        title="درباره ما"
        description={ABOUT_DESCRIPTION}
        imagePosition="right"
        ref={(el) => {
          if (el) sectionsRef.current[3] = el
        }}
      />

      {/* Portfolio Section */}
      <PortfolioSection
        items={portfolioItems}
        portfolioContainerRef={portfolioContainerRef}
        ref={(el) => {
          if (el) sectionsRef.current[4] = el
        }}
      />

      {/* Software Packages Section */}
      <PackageSection
        id="software-packages"
        title="پکیج های نرم افزاری"
        packages={createPackages(4)}
        ref={(el) => {
          if (el) sectionsRef.current[5] = el
        }}
      />

      {/* Content Packages Section */}
      <PackageSection
        id="content-packages"
        title="پکیج های تولید محتوا"
        packages={createPackages(4)}
        ref={(el) => {
          if (el) sectionsRef.current[6] = el
        }}
      />

      {/* Bloggers Section */}
      <PackageSection
        id="bloggers"
        title="بلاگر های ما"
        packages={createPackages(4)}
        ref={(el) => {
          if (el) sectionsRef.current[7] = el
        }}
      />

      {/* Testimonials Section */}
      <TestimonialsSection
        testimonials={testimonials}
        ref={(el) => {
          if (el) sectionsRef.current[8] = el
        }}
      />

      {/* FAQ Section */}
      <FAQSection
        items={faqItems}
        ref={(el) => {
          if (el) sectionsRef.current[9] = el
        }}
      />

      {/* Contact Section */}
      <ContactSection
        ref={(el) => {
          if (el) sectionsRef.current[10] = el
        }}
      />

      {/* Footer Section */}
      <FooterSection
        logoRef={footerLogoRef}
        ref={(el) => {
          if (el) {
            sectionsRef.current[11] = el
            footerRef.current = el
          }
        }}
      />
    </div>
  )
}

export default Page
