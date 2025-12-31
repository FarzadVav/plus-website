import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import { PackageCard } from "./PackageCard"
import { forwardRef } from "react"

interface PackageSectionProps {
  id: string
  title: string
  packages: Array<{
    title: string
    price: number
    features: string[]
  }>
}

const PackageSection = forwardRef<HTMLDivElement, PackageSectionProps>(
  ({ id, title, packages }, ref) => {
    return (
      <div
        id={id}
        ref={ref}
        className="wrapper lg:h-screen lg:pt-26 lg:pb-6 lg:flex lg:flex-col lg:items-center lg:justify-center lg:gap-12 max-lg:mt-20"
      >
      <h3 className="heading max-lg:text-center">{title}</h3>

      {/* Mobile Swiper */}
      <div className="w-full lg:hidden mt-5">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={true}
          modules={[Pagination]}
          className="w-full"
        >
          {packages.map((pkg, index) => (
            <SwiperSlide className="pb-12" key={index}>
              <PackageCard {...pkg} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Grid */}
      <div className="grid grid-cols-4 gap-6 flex-1 max-lg:hidden">
        {packages.map((pkg, index) => (
          <PackageCard key={index} {...pkg} />
        ))}
      </div>
      </div>
    )
  }
)

PackageSection.displayName = "PackageSection"

export { PackageSection }

