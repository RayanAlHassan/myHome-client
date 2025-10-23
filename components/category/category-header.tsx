import Image from "next/image"

type Category = {
  _id: string
  title: string
  // description: string
  image: string
  // subcategories: string[]
}

export function CategoryHeader({ category }: { category: Category }) {
  return (
    <div className="relative h-[300px] md:h-[400px] overflow-hidden bg-muted">
      <Image src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${category.image}` || "/placeholder.svg"} alt={category.title} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 text-balance">{category.title}</h1>
          {/* <p className="text-lg md:text-xl max-w-2xl mx-auto text-pretty leading-relaxed opacity-90">
            {category.description}
          </p> */}
        </div>
      </div>
    </div>
  )
}
