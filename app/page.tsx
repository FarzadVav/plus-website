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
  const footerLogoRef = useRef<HTMLImageElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  // استفاده از custom hooks
  useScrollNavigation({ sectionsRef })

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
        imagePosition="right"
        showCooperationBar={true}
        ref={(el) => {
          if (el) sectionsRef.current[1] = el
        }}
      />

      <AboutSection
        id="about-2"
        imagePosition="left"
        ref={(el) => {
          if (el) sectionsRef.current[2] = el
        }}
      />

      <AboutSection
        id="about-3"
        imagePosition="right"
        ref={(el) => {
          if (el) sectionsRef.current[3] = el
        }}
      />

      {/* Portfolio Sections */}
      {portfolioItems.map((item, index) => (
        <PortfolioSection
          key={item.title}
          id={`portfolio-${index + 1}`}
          item={item}
          imagePosition={index % 2 === 0 ? "right" : "left"}
          ref={(el) => {
            if (el) sectionsRef.current[4 + index] = el
          }}
        />
      ))}

      {/* Software Packages Section */}
      <PackageSection
        id="software-packages"
        title="پکیج های نرم افزاری"
        packages={createPackages(4)}
        ref={(el) => {
          if (el) sectionsRef.current[7] = el
        }}
      />

      {/* Content Packages Section */}
      <PackageSection
        id="content-packages"
        title="پکیج های تولید محتوا"
        packages={createPackages(4)}
        ref={(el) => {
          if (el) sectionsRef.current[8] = el
        }}
      />

      {/* Bloggers Section */}
      <PackageSection
        id="bloggers"
        title="بلاگر های ما"
        packages={createPackages(4)}
        ref={(el) => {
          if (el) sectionsRef.current[9] = el
        }}
      />

      {/* Testimonials Section */}
      <TestimonialsSection
        testimonials={testimonials}
        ref={(el) => {
          if (el) sectionsRef.current[10] = el
        }}
      />

      {/* FAQ Section */}
      <FAQSection
        items={faqItems}
        ref={(el) => {
          if (el) sectionsRef.current[11] = el
        }}
      />

      {/* Contact Section */}
      <ContactSection
        ref={(el) => {
          if (el) sectionsRef.current[12] = el
        }}
      />

      {/* Footer Section */}
      <FooterSection
        logoRef={footerLogoRef}
        ref={(el) => {
          if (el) {
            sectionsRef.current[13] = el
            footerRef.current = el
          }
        }}
      />
    </div>
  )
}

export default Page
