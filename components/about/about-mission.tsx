import { Target, Eye, Heart } from "lucide-react"

const items = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To provide exceptional home solutions that combine quality, functionality, and aesthetic appeal, making dream homes accessible to everyone in Kuwait.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To be the leading provider of home improvement solutions in the region, recognized for innovation, quality, and customer satisfaction.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "We believe in integrity, excellence, and customer-first approach. Every project is treated with care and attention to detail.",
  },
]

export function AboutMission() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.title} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <item.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
