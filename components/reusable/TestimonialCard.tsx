interface TestimonialCardProps {
  name: string
  text: string
}

export function TestimonialCard({ name, text }: TestimonialCardProps) {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="p-6 rounded-lg bg-card">
        <p className="text-xl text-center font-yekan-bakh-bold">{name}</p>
        <p className="leading-loose text-center mt-6">{text}</p>
      </div>
    </div>
  )
}

