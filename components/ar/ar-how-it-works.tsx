import { Smartphone, Camera, Eye, Check } from "lucide-react"

const steps = [
  {
    icon: Smartphone,
    title: "Open AR Assistant",
    description: "Click the AR button on any product page or launch from the main menu",
  },
  {
    icon: Camera,
    title: "Point Your Camera",
    description: "Allow camera access and point your device at the space where you want to place the product",
  },
  {
    icon: Eye,
    title: "Visualize & Adjust",
    description: "See the product in your space, rotate it, change colors, and move it around",
  },
  {
    icon: Check,
    title: "Make Your Decision",
    description: "Once satisfied, save or share your visualization and proceed with your purchase",
  },
]

export function ARHowItWorks() {
  return (
    <section id="how-it-works" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get started with AR visualization in four simple steps
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon className="h-6 w-6 text-primary" />
                    <h3 className="font-semibold text-xl">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
