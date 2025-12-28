function CooperationBar() {
  return (
    <div className="wrapper bg-card h-26 flex items-center overflow-hidden relative">
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
  )
}

export default CooperationBar