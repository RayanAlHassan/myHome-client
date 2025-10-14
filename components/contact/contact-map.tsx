import type React from "react"
export function ContactMap() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl font-bold mb-8 text-center">Visit Our Showroom</h2>

        <div className="aspect-video rounded-2xl overflow-hidden bg-muted border border-border">
          {/* Placeholder for map - in real implementation, use Google Maps or similar */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-primary" />
              <p className="text-lg font-semibold mb-2">123 Home Street, Kuwait City, Kuwait</p>
              <p className="text-muted-foreground">Interactive map would be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MapPin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
