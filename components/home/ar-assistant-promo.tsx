import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Camera, Smartphone, Maximize2, RotateCw } from "lucide-react"

const features = [
  {
    icon: Camera,
    title: "Live Preview",
    description: "See products in your actual space",
  },
  {
    icon: Maximize2,
    title: "Scale Accurately",
    description: "Ensure perfect fit before purchase",
  },
  {
    icon: RotateCw,
    title: "360° View",
    description: "Rotate and examine from all angles",
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Works on your smartphone camera",
  },
]

export function ARAssistantPromo() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <Camera className="h-24 w-24 mx-auto mb-4 text-primary" />
                  <p className="text-lg font-semibold">AR Visualization</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-balance">Visualize Before You Buy</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Use our AR Assistant to see how doors, furniture, and decor will look in your actual space. Make
                confident decisions with augmented reality technology.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {features.map((feature) => (
                  <div key={feature.title} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button size="lg" asChild>
                <Link href="/ar-assistant">Try AR Assistant</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
