import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from "@/components/ui/input-group"
import { FileIcon, TextAlignCenterIcon, UserIcon } from "lucide-react"
import { forwardRef } from "react"

const ContactSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      id="contact"
      ref={ref}
      className="lg:h-screen lg:pt-26 lg:pb-6 max-lg:mt-20"
    >
      <div className="lg:h-full bg-gradient-to-t from-card to-background py-12 rounded-b-[15%]">
        <div className="wrapper lg:h-full flex flex-col items-center justify-center gap-5 lg:gap-12">
          <h3 className="heading max-lg:text-center">ارتباط و همکاری با ما</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 lg:w-3/4">
            <InputGroup>
              <InputGroupAddon>
                <UserIcon />
              </InputGroupAddon>
              <InputGroupInput placeholder="نام و نام خانوادگی" />
            </InputGroup>

            <InputGroup>
              <InputGroupAddon>
                <FileIcon />
              </InputGroupAddon>
              <InputGroupInput type="file" placeholder="فایل ضمیمه (اختیاری)" />
            </InputGroup>

            <InputGroup className="lg:col-span-2">
              <InputGroupAddon>
                <TextAlignCenterIcon />
              </InputGroupAddon>
              <InputGroupTextarea placeholder="شرح موضوع تان..." />
            </InputGroup>

            <div className="lg:col-span-2 flex justify-end">
              <Button>ارسال</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

ContactSection.displayName = "ContactSection"

export default ContactSection

