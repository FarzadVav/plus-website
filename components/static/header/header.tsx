import Link from "next/link"
import Image from "next/image"
import { HeadsetIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

function Header() {
  return (
    <header className="h-20 bg-background/10 backdrop-blur-sm flex items-center gap-6 wrapper sticky top-0 z-40">
      <Image src="/logo.svg" alt="logo" width={36} height={36} />

      <nav className="flex items-center gap-3 mx-auto">
        <Link href="">
          <Button variant="ghost">
            خانه
          </Button>
        </Link>
        <Link href="#about">
          <Button variant="ghost">
            درباره ما
          </Button>
        </Link>
        <Link href="#about">
          <Button variant="ghost">
            سرویس ها
          </Button>
        </Link>
        <Link href="#contact">
          <Button variant="ghost">
            تولید محتوا
          </Button>
        </Link>
        <Link href="#contact">
          <Button variant="ghost">
            بلاگر های ما
          </Button>
        </Link>
        <Link href="#contact">
          <Button variant="ghost">
            سوالات متداول
          </Button>
        </Link>
        <Link href="#contact">
          <Button variant="ghost">
            ارتباط با ما
          </Button>
        </Link>
      </nav>

      <Button size={"icon"} variant={"outline"}>
        <HeadsetIcon />
      </Button>
    </header >
  )
}

export default Header