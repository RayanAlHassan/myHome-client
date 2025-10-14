import { Camera, Maximize2, RotateCw, Ruler, Palette, Share2 } from "lucide-react"

const features = [
  {
    icon: Camera,
    title: "Live Camera Preview",
    description: "See products overlaid in your real environment through your device camera",
  },
  {
    icon: Maximize2,
    title: "Accurate Scaling",
    description: "Products are automatically scaled to real-world dimensions for accurate visualization",
  },
  {
    icon: RotateCw,
    title: "360° Rotation",
    description: "Rotate and view products from any angle to examine every detail",
  },
  {
    icon: Ruler,
    title: "Measurement Tools",
    description: "Measure spaces and ensure products fit perfectly before purchasing",
  },
  {
    icon: Palette,
    title: "Color Options",
    description: "Try different colors and finishes to match your existing decor",
  },
  {
    icon: Share2,
    title: "Share & Save",
    description: "Capture screenshots and share your AR visualizations with others",
  },
]

export function ARFeatures() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Powerful AR Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Everything you need to visualize and customize products in your space
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
