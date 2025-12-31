import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MailIcon, PhoneIcon } from "lucide-react"
import { forwardRef } from "react"

interface FooterSectionProps {
  logoRef: React.RefObject<HTMLImageElement | null>
}

const FooterSection = forwardRef<HTMLDivElement, FooterSectionProps>(({ logoRef }, ref) => {
  return (
    <div
      id="footer"
      ref={ref}
      className="wrapper lg:h-screen lg:pt-26 flex flex-col justify-center items-center relative max-lg:my-40"
    >
      <Image
        ref={logoRef}
        className="absolute -z-10 blur-sm will-change-transform w-3/4 aspect-square max-w-[500px]"
        style={{ opacity: 0.1 }}
        src="/logo-white.svg"
        alt="logo"
        width={500}
        height={500}
      />

      <p className="text-center lg:w-1/2 leading-loose">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک
        است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
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
  )
})

FooterSection.displayName = "FooterSection"

export default FooterSection

