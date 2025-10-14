import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactMethods = [
  {
    icon: Phone,
    title: "Phone",
    details: "+965 1234 5678",
    description: "Mon-Sat, 9AM-6PM",
  },
  {
    icon: Mail,
    title: "Email",
    details: "info@myhome.com",
    description: "We'll respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Address",
    details: "123 Home Street, Kuwait City",
    description: "Visit our showroom",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Sunday - Thursday: 9AM - 6PM",
    description: "Saturday: 10AM - 4PM",
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl font-bold mb-6">
          Contact Information
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-8">
          Choose your preferred way to reach us. Our team is ready to assist you
          with any questions or concerns.
        </p>
      </div>

      <div className="space-y-6">
        {contactMethods.map((method) => (
          <div key={method.title} className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <method.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">{method.title}</h3>
              <p className="text-foreground mb-1">{method.details}</p>
              <p className="text-sm text-muted-foreground">
                {method.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-border">
        <h3 className="font-semibold text-lg mb-4">
          Need Immediate Assistance?
        </h3>
        <Button size="lg" className="w-full">
          <MessageCircle className="mr-2 h-5 w-5" />
          Start Live Chat
        </Button>
        <p className="text-sm text-muted-foreground text-center mt-3">
          Available during business hours
        </p>
      </div>
    </div>
  );
}
