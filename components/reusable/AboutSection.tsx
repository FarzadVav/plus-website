import { forwardRef } from "react"

interface AboutSectionProps {
  id: string
  title: string
  description: string
  imagePosition?: "left" | "right"
  showCooperationBar?: boolean
}

const AboutSection = forwardRef<HTMLDivElement, AboutSectionProps>(
  ({ id, title, description, imagePosition = "right", showCooperationBar = false }, ref) => {
    const isImageLeft = imagePosition === "left"

    return (
      <div
        id={id}
        ref={ref}
        className={`${showCooperationBar ? "" : "max-lg:mt-20"}`}
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
        <div className="wrapper lg:h-screen lg:pt-20 grid grid-cols-1 lg:grid-cols-2">
          <div
            className={`lg:h-full flex justify-center items-center ${isImageLeft ? "" : "max-lg:row-start-1"}`}
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

          <div
            className={`h-full flex justify-center items-center mt-5 ${isImageLeft ? "" : "max-lg:row-start-2 mb-5"}`}
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
        </div>
      </div>
    )
  }
)

AboutSection.displayName = "AboutSection"

export default AboutSection

