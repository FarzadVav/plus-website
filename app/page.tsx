import HeroCarousel from "@/components/static/heroCarousel/heroCarousel"

function Page() {
  return (
    <div className="wrapper grid grid-cols-2 h-[calc(100vh-5rem)]">
      <div className="h-full flex justify-center items-center">
        <div>
          <h1 className="text-8xl font-black font-morabba-bold">پلاس</h1>
          <h2 className="text-5xl font-bold mt-9 font-morabba-medium leading-snug">بزرگ ترین شرکت <br /> برنامه نویسی مشهد</h2>
          <p className="mt-6 leading-loose">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ <br /> و با استفاده از طراحان گرافیک است
          </p>
        </div>
      </div>
      <div className="h-full flex justify-center items-center">
        <HeroCarousel />
      </div>
    </div>
  )
}

export default Page