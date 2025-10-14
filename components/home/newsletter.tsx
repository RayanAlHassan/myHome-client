"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Dummy implementation
    console.log("Newsletter signup:", email)
    setEmail("")
    alert("Thank you for subscribing!")
  }

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="h-12 w-12 mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">Stay Updated</h2>
          <p className="text-lg mb-8 opacity-90 text-pretty leading-relaxed">
            Receive exclusive updates, inspiration, and special offers directly to your inbox
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12 bg-primary-foreground text-foreground"
            />
            <Button type="submit" size="lg" variant="secondary" className="h-12 px-8">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
