"use client"

import { useState } from "react"
import Image from "next/image"
import { testimonials } from "@/lib/data"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-balance">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Trusted by homeowners and professionals across Kuwait
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl border border-border p-8 md:p-12">
            <div className="flex items-center gap-1 mb-6 justify-center">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>

            <blockquote className="text-xl md:text-2xl text-center mb-8 leading-relaxed text-pretty">
              "{current.content}"
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted">
                <Image src={current.image || "/placeholder.svg"} alt={current.name} fill className="object-cover" />
              </div>
              <div className="text-left">
                <div className="font-semibold">{current.name}</div>
                <div className="text-sm text-muted-foreground">{current.role}</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <Button variant="outline" size="icon" onClick={prev}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={next}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
