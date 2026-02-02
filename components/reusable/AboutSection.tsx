import { forwardRef } from "react"

const title = "درباره ما";
const description = "تیم پلاس استادیو طی پنج سال بر علم دیجیتال مارکتینگ تسلط کامل را ایجاد کرده تا بتواند نوین ترین خدمات انلاین جهت توسعه‌ی تخصصی کسب و کار و ایجاد درآمد را به مردم ایرانی هدیه دهد. اینجا ما مشاوره‌ی تخصصی میدیم تا ایده های شما به واقعیت تبدیل و توسط تیم ما اجرا شود. هم اکنون میتوانید با مطالعه‌ی کامل سایت پلاس استادیو خدمات مارا ببینید و ایده پردازی کنید تا جریان ثروت رو به سمت خودتون هدایت کنید."

interface AboutSectionProps {
  id: string
  imagePosition?: "left" | "right"
  showCooperationBar?: boolean
}

const AboutSection = forwardRef<HTMLDivElement, AboutSectionProps>(
  ({ id, imagePosition = "right", showCooperationBar = false }, ref) => {
    const isImageLeft = imagePosition === "left"

    return (
      <div
        id={id}
        ref={ref}
        className={"lg:h-screen lg:pt-20"}
      >
        {showCooperationBar && (
          <div className="bg-card h-26 flex items-center overflow-hidden relative max-lg:mt-20">
            <div className="absolute left-0 w-max min-w-max flex gap-20 infinite-scroll-x">
              {Array.from({ length: 12 }).map((_, index) => (
                <div className="size-20 rounded-lg bg-background" key={index} />
              ))}
            </div>
            <div className="absolute right-[calc(100%-5rem)] w-max min-w-max flex gap-20 infinite-scroll-x">
              {Array.from({ length: 12 }).map((_, index) => (
                <div className="size-20 rounded-lg bg-background" key={index} />
              ))}
            </div>
          </div>
        )}
        <div className={`wrapper ${showCooperationBar ? "lg:h-[calc(100%-6.5rem)]" : "lg:h-full"} grid grid-cols-1 gap-6 lg:grid-cols-2 max-lg:mt-20`}>
          <div
            className={`lg:h-full flex justify-center items-center ${isImageLeft ? "max-lg:row-start-2" : "max-lg:row-start-1"}`}
          >
            {isImageLeft ? (
              <div className="lg:w-3/4">
                <h3 className="heading max-lg:text-center">{title}</h3>
                <p className="leading-loose mt-3 lg:mt-6 max-lg:text-center">{description}</p>
              </div>
            ) : (
              <div className="size-96 rounded-lg bg-card"></div>
            )}
          </div>

          <div
            className={`h-full flex justify-center items-center ${isImageLeft ? "max-lg:row-start-1" : "max-lg:row-start-2"}`}
          >
            {isImageLeft ? (
              <div className="size-96 rounded-lg bg-card"></div>
            ) : (
              <div className="lg:w-3/4">
                <h3 className="heading max-lg:text-center">{title}</h3>
                <p className="leading-loose mt-3 lg:mt-6 max-lg:text-center">{description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
)

AboutSection.displayName = "AboutSection"

export default AboutSection

