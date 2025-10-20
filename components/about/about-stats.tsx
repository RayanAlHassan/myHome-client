const stats = [
  { value: "1+", label: "Years of Excellence" },
  { value: "300+", label: "Happy Customers" },
  { value: "1000+", label: "Projects Completed" },
  { value: "10+", label: "Expert Team Members" },
]

export function AboutStats() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm md:text-base opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
