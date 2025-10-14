import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How do I enable text-to-speech?",
    answer:
      "You can enable text-to-speech from the accessibility controls section at the top of this page. Simply toggle the Text-to-Speech switch, and the system will read page content aloud when you hover over or select text.",
  },
  {
    question: "Are all videos captioned?",
    answer:
      "Yes, all video content on our platform includes closed captions and text transcripts. You can enable captions using the CC button on the video player.",
  },
  {
    question: "Can I navigate the site using only my keyboard?",
    answer:
      "Our entire website is fully keyboard accessible. Use Tab to navigate between elements, Enter to select, and Escape to close modals. Press '?' to see all keyboard shortcuts.",
  },
  {
    question: "How do I access sign language videos?",
    answer:
      "Sign language videos are available on product pages and tutorial sections. Look for the sign language icon to access ASL interpretations of our content.",
  },
  {
    question: "Can I save my accessibility preferences?",
    answer:
      "Yes, your accessibility preferences are automatically saved to your browser and will persist across sessions. If you create an account, your preferences will sync across all your devices.",
  },
  {
    question: "Is the AR Assistant accessible?",
    answer:
      "Yes, our AR Assistant includes voice guidance, haptic feedback, and audio descriptions to ensure it's accessible to users with various needs.",
  },
]

export function AccessibilityFAQ() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
