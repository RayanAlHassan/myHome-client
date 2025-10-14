import { Eye, Volume2, Hand, Languages } from "lucide-react"

export function AccessibilityHero() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-balance">Accessibility for Everyone</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 text-pretty leading-relaxed">
            We believe everyone deserves equal access to our services. Our platform includes comprehensive accessibility
            features designed for users with visual, hearing, and mobility needs.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Eye, label: "Visual Support" },
              { icon: Volume2, label: "Audio Assistance" },
              { icon: Hand, label: "Sign Language" },
              { icon: Languages, label: "Voice Navigation" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
