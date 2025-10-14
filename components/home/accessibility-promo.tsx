import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye, Volume2, Hand, Languages } from "lucide-react"

const features = [
  {
    icon: Eye,
    title: "Visual Assistance",
    description: "High contrast modes and adjustable font sizes",
  },
  {
    icon: Volume2,
    title: "Audio Support",
    description: "Text-to-speech and sound alerts",
  },
  {
    icon: Hand,
    title: "Sign Language",
    description: "Video guides in sign language",
  },
  {
    icon: Languages,
    title: "Voice Navigation",
    description: "Hands-free browsing experience",
  },
]

export function AccessibilityPromo() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-balance">Designed for Everyone</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our platform is built with comprehensive accessibility features to ensure everyone can browse, explore,
                and shop with ease and confidence.
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
                <Link href="/accessibility">Learn More About Accessibility</Link>
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <Eye className="h-24 w-24 mx-auto mb-4 text-primary" />
                  <p className="text-lg font-semibold">Accessibility First</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
