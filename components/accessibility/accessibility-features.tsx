import { Eye, Volume2, Hand, Languages, Keyboard, Zap, Bell, Video } from "lucide-react"

const features = [
  {
    icon: Eye,
    title: "Visual Assistance",
    description:
      "High contrast modes, adjustable font sizes, and screen reader compatibility for users with visual impairments.",
    features: ["Adjustable text size", "High contrast mode", "Screen reader support", "Keyboard navigation"],
  },
  {
    icon: Volume2,
    title: "Audio Support",
    description: "Text-to-speech functionality and sound alerts to help users navigate and understand content.",
    features: ["Text-to-speech", "Audio descriptions", "Sound alerts", "Volume controls"],
  },
  {
    icon: Hand,
    title: "Sign Language Videos",
    description: "Video guides and tutorials in sign language for deaf and hard-of-hearing users.",
    features: ["ASL video guides", "Product demonstrations", "Tutorial videos", "Customer support"],
  },
  {
    icon: Languages,
    title: "Voice Navigation",
    description: "Hands-free browsing with voice commands for users with mobility limitations.",
    features: ["Voice commands", "Hands-free navigation", "Voice search", "Audio feedback"],
  },
  {
    icon: Keyboard,
    title: "Keyboard Navigation",
    description: "Full keyboard support for users who cannot use a mouse or touchscreen.",
    features: ["Tab navigation", "Keyboard shortcuts", "Focus indicators", "Skip links"],
  },
  {
    icon: Zap,
    title: "Reduced Motion",
    description: "Option to reduce animations and motion effects for users with vestibular disorders.",
    features: ["Disable animations", "Static content", "Reduced transitions", "Stable layouts"],
  },
  {
    icon: Bell,
    title: "Visual Alerts",
    description: "Visual notifications and alerts for users who cannot hear audio cues.",
    features: ["Flash notifications", "Visual indicators", "Banner alerts", "Color-coded messages"],
  },
  {
    icon: Video,
    title: "Captions & Transcripts",
    description: "All video content includes captions and text transcripts for accessibility.",
    features: ["Closed captions", "Video transcripts", "Subtitle options", "Multiple languages"],
  },
]

export function AccessibilityFeatures() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Comprehensive Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our platform includes a wide range of accessibility features to ensure everyone can use our services
            comfortably
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
              <p className="text-muted-foreground mb-4 leading-relaxed">{feature.description}</p>
              <ul className="space-y-2">
                {feature.features.map((item) => (
                  <li key={item} className="text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
