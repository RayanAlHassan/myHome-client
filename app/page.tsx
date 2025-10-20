import { Hero } from "@/components/home/hero"
import { FeaturedCategories } from "@/components/home/featured-categories"
import { FeaturedProducts } from "@/components/home/featured-products"
import { AccessibilityPromo } from "@/components/home/accessibility-promo"
import { ARAssistantPromo } from "@/components/home/ar-assistant-promo"
import { Testimonials } from "@/components/home/testimonials"
import { Newsletter } from "@/components/home/newsletter"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedCategories />
      {/* <FeaturedProducts /> */}
      {/* <AccessibilityPromo /> */}
      <ARAssistantPromo />
      {/* <Testimonials /> */}
      <Newsletter />
    </div>
  )
}
