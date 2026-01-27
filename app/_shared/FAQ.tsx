"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
    const faqs = [
        {
            question: "How does AppyScreen generate mobile apps?",
            answer: "AppyScreen uses advanced AI to understand your text descriptions and generate complete, developer-ready mobile app designs in seconds. It builds everything from layout to typography based on best practices."
        },
        {
            question: "Can I export my app designs to code?",
            answer: "Yes! You can export your generated screens directly to React code with Tailwind CSS, ready for your developers to use. You can also export to Figma for further editing."
        },
        {
            question: "Is AppyScreen only for mobile apps?",
            answer: "We specialize in mobile-first applications, ensuring your product looks perfect on phones. Our AI generates responsive layouts that work beautifully across devices."
        },
        {
            question: "Can I customize the generated apps?",
            answer: "Absolutely. The AI gives you a strong foundation, but you have full control. You can regenerate sections, edit text, swap images, and tweak styles to match your brand perfectly."
        },
        {
            question: "Do I own the app designs I create?",
            answer: "Yes, you own 100% of the designs and code you generate. Use them for your startup, client projects, or commercial apps without any restrictions."
        },
        {
            question: "Can I try generating an app for free?",
            answer: "Yes, create a free account to get starter credits. You can generate your first few app screens and experience the magic of AI design before upgrading."
        },
        {
            question: "Is my app idea private?",
            answer: "Your privacy is our priority. Your app ideas and prompts are private to your account and are not shared or used to train public models without your permission."
        }
    ];

    return (
        <section className="px-4 sm:px-16 md:px-24 py-16 md:py-24 max-w-4xl mx-auto" id="faq">
            <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-3">
                    <h2 className="text-3xl md:text-5xl font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FF5200] to-orange-600 pb-2">
                        FAQs
                    </h2>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b border-black/10">
                            <AccordionTrigger className="text-xl font-medium text-black hover:text-[#FF5200] hover:no-underline py-6 transition-colors text-left">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-base text-black/70 pb-6 leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
