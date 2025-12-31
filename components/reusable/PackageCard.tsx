import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"

interface PackageCardProps {
  title: string
  price: number
  features: string[]
}

export function PackageCard({ title, price, features }: PackageCardProps) {
  return (
    <div className="p-6 border-4 border-card rounded-lg flex flex-col">
      <p className="px-3 py-1 bg-green-600 mx-auto w-max rounded-full">{title}</p>
      <p className="text-center mt-6 text-2xl">از {price.toLocaleString("fa")} تومان</p>
      <ul className="my-auto list-disc text-sm text-center space-y-3 leading-loose">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Button>
        <span>خرید</span>
        <CheckIcon />
      </Button>
    </div>
  )
}

