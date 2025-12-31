"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { HeadsetIcon, MailIcon, PhoneIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// mapping بین لینک‌ها و index سکشن‌ها - باید دقیقا با ترتیب و نام سکشن‌های صفحه برابر باشد
const sectionMap: Record<string, number> = {
  home: 0,                    // خانه (Hero)
  about: 1,                  // درباره ما (اولین سکشن - برای scroll)
  portfolio: 4,              // نمونه کار های ما
  softwarePackages: 5,      // پکیج های نرم افزاری
  contentPackages: 6,        // پکیج های تولید محتوا
  bloggers: 7,               // بلاگر های ما
  testimonials: 8,          // نظرات مشتریان
  faq: 9,                   // سوالات متداول
  contact: 10,               // ارتباط و همکاری با ما
}

// سکشن‌های چندگانه که باید یک لینک داشته باشند
const multiSectionMap: Record<string, number[]> = {
  about: [1, 2, 3],          // سه سکشن "درباره ما"
}

function Header() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0)

  useEffect(() => {
    const handleSectionChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ currentIndex: number }>
      setCurrentSectionIndex(customEvent.detail.currentIndex)
    }

    window.addEventListener('sectionChange', handleSectionChange as EventListener)

    // مقداردهی اولیه - چک کردن سکشن فعلی
    setTimeout(() => {
      const scrollToSection = (window as Window & { scrollToSection?: (index: number) => void }).scrollToSection
      if (scrollToSection) {
        // trigger کردن یک event برای آپدیت اولیه
        const event = new CustomEvent('sectionChange', { detail: { currentIndex: 0 } })
        window.dispatchEvent(event)
      }
    }, 100)

    return () => {
      window.removeEventListener('sectionChange', handleSectionChange as EventListener)
    }
  }, [])

  const handleNavClick = (sectionKey: string, e: React.MouseEvent) => {
    e.preventDefault()
    const sectionIndex = sectionMap[sectionKey]
    if (sectionIndex !== undefined) {
      const scrollToSection = (window as Window & { scrollToSection?: (index: number) => void }).scrollToSection
      if (scrollToSection && typeof scrollToSection === 'function') {
        scrollToSection(sectionIndex)
      }
    }
  }

  const getButtonVariant = (sectionKey: string) => {
    // چک کردن سکشن‌های چندگانه (مثل "درباره ما" که 3 سکشن داره)
    if (multiSectionMap[sectionKey]) {
      const sectionIndices = multiSectionMap[sectionKey]
      return sectionIndices.includes(currentSectionIndex) ? "default" : "ghost"
    }

    // برای سکشن‌های عادی
    const sectionIndex = sectionMap[sectionKey]
    return currentSectionIndex === sectionIndex ? "default" : "ghost"
  }

  return (
    <header className="h-20 bg-background/10 backdrop-blur-sm flex items-center gap-6 wrapper sticky top-0 z-40">
      <Image className="fill-primary" src="/logo.svg" alt="logo" width={36} height={36} />

      <nav className="flex items-center gap-3 mx-auto">
        <Button variant={getButtonVariant("home")} onClick={(e) => handleNavClick("home", e)}>
          خانه
        </Button>
        <Button variant={getButtonVariant("about")} onClick={(e) => handleNavClick("about", e)}>
          درباره ما
        </Button>
        <Button variant={getButtonVariant("portfolio")} onClick={(e) => handleNavClick("portfolio", e)}>
          نمونه کار های ما
        </Button>
        <Button variant={getButtonVariant("softwarePackages")} onClick={(e) => handleNavClick("softwarePackages", e)}>
          پکیج های نرم افزاری
        </Button>
        <Button variant={getButtonVariant("contentPackages")} onClick={(e) => handleNavClick("contentPackages", e)}>
          پکیج های تولید محتوا
        </Button>
        <Button variant={getButtonVariant("bloggers")} onClick={(e) => handleNavClick("bloggers", e)}>
          بلاگر های ما
        </Button>
        <Button variant={getButtonVariant("testimonials")} onClick={(e) => handleNavClick("testimonials", e)}>
          نظرات مشتریان
        </Button>
        <Button variant={getButtonVariant("faq")} onClick={(e) => handleNavClick("faq", e)}>
          سوالات متداول
        </Button>
        <Button variant={getButtonVariant("contact")} onClick={(e) => handleNavClick("contact", e)}>
          ارتباط با ما
        </Button>
      </nav>

      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"outline"}>
            <HeadsetIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end" className="w-56">
          <DropdownMenuLabel>تماس با ما</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a href="mailto:info@plus.com" className="flex items-center gap-2 w-full">
              <MailIcon className="size-4" />
              <span>info@plus.com</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="tel:09123456789" className="flex items-center gap-2 w-full">
              <PhoneIcon className="size-4" />
              <span>09123456789</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>شبکه‌های اجتماعی</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a href="#" className="flex items-center gap-2 w-full">
              <Image src="/instagram.png" alt="instagram" width={20} height={20} />
              <span>اینستاگرام</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="#" className="flex items-center gap-2 w-full">
              <Image src="/telegram.png" alt="telegram" width={20} height={20} />
              <span>تلگرام</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="#" className="flex items-center gap-2 w-full">
              <Image src="/linkedin.png" alt="linkedin" width={20} height={20} />
              <span>لینکدین</span>
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header >
  )
}

export default Header