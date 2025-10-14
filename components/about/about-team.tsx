import Image from "next/image"

const team = [
  {
    name: "Mohammed Al-Rashid",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=400&width=400",
    bio: "20+ years of experience in home improvement industry",
  },
  {
    name: "Layla Hassan",
    role: "Head of Design",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Award-winning interior designer with international experience",
  },
  {
    name: "Omar Al-Sabah",
    role: "Operations Director",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Expert in project management and customer satisfaction",
  },
  {
    name: "Fatima Al-Mansour",
    role: "Customer Relations",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Dedicated to ensuring exceptional customer experience",
  },
]

export function AboutTeam() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Passionate professionals dedicated to bringing your vision to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="aspect-square relative overflow-hidden rounded-2xl bg-muted mb-4">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="font-semibold text-xl mb-1">{member.name}</h3>
              <p className="text-primary font-medium mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
