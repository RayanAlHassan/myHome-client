import { AboutHero } from "@/components/about/about-hero"
import { AboutMission } from "@/components/about/about-mission"
import { AboutValues } from "@/components/about/about-values"
import { AboutTeam } from "@/components/about/about-team"
import { AboutStats } from "@/components/about/about-stats"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <AboutStats />
      <AboutMission />
      <AboutValues />
      <AboutTeam />
    </div>
  )
}
