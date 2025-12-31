import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import { forwardRef } from "react"

interface PortfolioItem {
  title: string
  description: string
}

interface PortfolioSectionProps {
  items: PortfolioItem[]
  portfolioContainerRef: React.RefObject<HTMLDivElement | null>
}

const PortfolioSection = forwardRef<HTMLDivElement, PortfolioSectionProps>(
  ({ items, portfolioContainerRef }, ref) => {
    return (
      <div
        id="portfolio"
        ref={ref}
        className="lg:h-screen overflow-hidden max-lg:mt-20"
      >
        <div className="lg:h-full lg:pt-26 lg:pb-6 lg:flex lg:flex-col lg:items-center lg:justify-center">
          <h3 className="heading max-lg:text-center">نمونه کار های ما</h3>

          {/* Desktop Horizontal Scroll */}
          <div className="flex-1 overflow-hidden max-lg:hidden">
            <div
              ref={portfolioContainerRef}
              className="h-full flex"
              style={{ width: `${items.length * 100}vw` }}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className="w-screen h-full shrink-0 flex items-center justify-center px-12"
                >
                  <div className="flex flex-col items-center gap-6 max-w-4xl">
                    <div className="size-48 bg-card rounded-full flex items-center justify-center">
                      <span className="text-6xl font-bold text-muted-foreground">{index + 1}</span>
                    </div>
                    <p className="text-3xl font-bold font-morabba-medium">{item.title}</p>
                    <p className="text-center leading-loose text-muted-foreground">
                      {item.description}
                    </p>

                    {/* Panel Indicators */}
                    <div className="flex gap-3 mt-6">
                      {items.map((_, dotIndex) => (
                        <div
                          key={dotIndex}
                          className={`size-3 rounded-full transition-all duration-300 ${
                            dotIndex === index ? "bg-primary scale-125" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Swiper */}
          <div className="w-full lg:hidden mt-5">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              pagination={true}
              modules={[Pagination]}
              className="w-full"
            >
              {items.map((item, index) => (
                <SwiperSlide className="pb-12" key={index}>
                  <div className="flex flex-col items-center gap-6 px-4">
                    <div className="size-48 bg-card rounded-full flex items-center justify-center">
                      <span className="text-6xl font-bold text-muted-foreground">{index + 1}</span>
                    </div>
                    <p className="text-3xl font-bold font-morabba-medium">{item.title}</p>
                    <p className="text-center leading-loose text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    )
  }
)

PortfolioSection.displayName = "PortfolioSection"

export default PortfolioSection

