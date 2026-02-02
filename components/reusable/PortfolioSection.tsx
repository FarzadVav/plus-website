import { forwardRef } from "react"

interface PortfolioItem {
  title: string
  description: string
}

interface PortfolioSectionProps {
  id: string
  item: PortfolioItem
  imagePosition?: "left" | "right"
}

const PortfolioSection = forwardRef<HTMLDivElement, PortfolioSectionProps>(
  ({ id, item, imagePosition = "right" }, ref) => {
    const isImageLeft = imagePosition === "left"

    return (
      <div
        id={id}
        ref={ref}
        className="lg:h-screen lg:pt-20"
      >
        <div className="wrapper lg:h-full grid grid-cols-1 gap-6 lg:grid-cols-2 max-lg:mt-20">
          <div
            className={`lg:h-full flex justify-center items-center ${isImageLeft ? "max-lg:row-start-2" : "max-lg:row-start-1"
              }`}
          >
            {isImageLeft ? (
              <div className="lg:w-3/4">
                <h3 className="heading max-lg:text-center">{item.title}</h3>
                <p className="leading-loose mt-3 lg:mt-6 max-lg:text-center">
                  {item.description}
                </p>
              </div>
            ) : (
              <div className="size-96 rounded-lg bg-card"></div>
            )}
          </div>

          <div
            className={`h-full flex justify-center items-center ${isImageLeft ? "max-lg:row-start-1" : "max-lg:row-start-2"
              }`}
          >
            {isImageLeft ? (
              <div className="size-96 rounded-lg bg-card"></div>
            ) : (
              <div className="lg:w-3/4">
                <h3 className="heading max-lg:text-center">{item.title}</h3>
                <p className="leading-loose mt-3 lg:mt-6 max-lg:text-center">
                  {item.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
)

PortfolioSection.displayName = "PortfolioSection"

export default PortfolioSection

