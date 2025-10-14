import { Shield, Award, Users, Leaf, Clock, Sparkles } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "We source only the finest materials and work with trusted manufacturers",
  },
  {
    icon: Award,
    title: "Expert Craftsmanship",
    description: "Our team consists of skilled professionals with years of experience",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Your satisfaction is our priority, from consultation to installation",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "We prioritize eco-friendly materials and sustainable practices",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "We respect your time and ensure projects are completed on schedule",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "We embrace new technologies like AR to enhance your experience",
  },
]

export function AboutValues() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">What Sets Us Apart</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our commitment to excellence is reflected in everything we do
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <value.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-3">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
