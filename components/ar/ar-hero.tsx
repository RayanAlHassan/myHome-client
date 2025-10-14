import { Button } from "@/components/ui/button"
import { Camera, Smartphone } from "lucide-react"
import Link from "next/link"

export function ARHero() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Camera className="h-4 w-4" />
            Augmented Reality Technology
          </div>

          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-balance">
            See Products in Your Space Before You Buy
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 text-pretty leading-relaxed">
            Use your smartphone camera to visualize doors, furniture, and decor in your actual space. Make confident
            decisions with our AR Assistant technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Smartphone className="mr-2 h-5 w-5" />
              Launch AR Assistant
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#how-it-works">Learn How It Works</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
