import { ARHero } from "@/components/ar/ar-hero"
import { ARFeatures } from "@/components/ar/ar-features"
import { ARDemo } from "@/components/ar/ar-demo"
import { ARHowItWorks } from "@/components/ar/ar-how-it-works"

export default function ARAssistantPage() {
  return (
    <div className="min-h-screen">
      <ARHero />
      {/* <ARFeatures /> */}
      <ARHowItWorks />
      <ARDemo />
    </div>
  )
}
