"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Type, Contrast, Volume2, MousePointer } from "lucide-react"

export function AccessibilityControls() {
  const [fontSize, setFontSize] = useState([100])
  const [highContrast, setHighContrast] = useState(false)
  const [textToSpeech, setTextToSpeech] = useState(false)
  const [largerCursor, setLargerCursor] = useState(false)

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">Customize Your Experience</h2>

          <Card className="p-8">
            <div className="space-y-8">
              {/* Font Size */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Type className="h-5 w-5 text-primary" />
                  <Label className="text-lg font-semibold">Font Size</Label>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-12">Small</span>
                  <Slider
                    value={fontSize}
                    onValueChange={setFontSize}
                    min={80}
                    max={150}
                    step={10}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground w-12 text-right">Large</span>
                </div>
                <p className="text-sm text-muted-foreground">Current size: {fontSize[0]}%</p>
              </div>

              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Contrast className="h-5 w-5 text-primary" />
                  <div>
                    <Label className="text-lg font-semibold">High Contrast Mode</Label>
                    <p className="text-sm text-muted-foreground">Increase color contrast for better visibility</p>
                  </div>
                </div>
                <Switch checked={highContrast} onCheckedChange={setHighContrast} />
              </div>

              {/* Text to Speech */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 className="h-5 w-5 text-primary" />
                  <div>
                    <Label className="text-lg font-semibold">Text-to-Speech</Label>
                    <p className="text-sm text-muted-foreground">Read page content aloud</p>
                  </div>
                </div>
                <Switch checked={textToSpeech} onCheckedChange={setTextToSpeech} />
              </div>

              {/* Larger Cursor */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MousePointer className="h-5 w-5 text-primary" />
                  <div>
                    <Label className="text-lg font-semibold">Larger Cursor</Label>
                    <p className="text-sm text-muted-foreground">Increase cursor size for easier tracking</p>
                  </div>
                </div>
                <Switch checked={largerCursor} onCheckedChange={setLargerCursor} />
              </div>

              <div className="pt-4 border-t border-border">
                <Button className="w-full" size="lg">
                  Save Preferences
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
