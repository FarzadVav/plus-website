import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeftIcon } from "lucide-react"
import { forwardRef } from "react"

interface FAQItem {
  id: number
  question: string
  answer: string
}

interface FAQSectionProps {
  items: FAQItem[]
}

const FAQSection = forwardRef<HTMLDivElement, FAQSectionProps>(({ items }, ref) => {
  return (
    <div
      id="faq"
      ref={ref}
      className="wrapper lg:h-screen lg:pt-26 lg:pb-6 lg:flex lg:flex-col lg:items-center lg:justify-center lg:gap-12 max-lg:mt-20"
    >
      <h3 className="heading max-lg:text-center">سوالات متداول</h3>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 lg:flex-1 max-lg:mt-5">
        {items.map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <Button className="w-full justify-between lg:h-full" variant={"outline"} size={"lg"}>
                <span>{item.question}</span>
                <ArrowLeftIcon />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{item.question}</DialogTitle>
                <DialogDescription className="leading-loose mt-3">{item.answer}</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
})

FAQSection.displayName = "FAQSection"

export default FAQSection

