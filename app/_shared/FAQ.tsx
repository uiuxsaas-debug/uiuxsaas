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
            question: "What makes AppyScreen different from other design tools?",
            answer: "AppyScreen leverages advanced AI to generate developer-ready UI designs in seconds, not hours. Unlike traditional tools where you start from scratch, we provide comprehensive, editable designs (wireframes to high-fidelity) tailored to your text descriptions."
        },
        {
            question: "Can I export my designs to code?",
            answer: "Yes! You can export your designs directly to clean, production-ready code (React, Tailwind CSS) or export them to Figma to continue refining your work in your favorite design tool."
        },
        {
            question: "Is AppyScreen only for mobile apps?",
            answer: "While we specialize in creating stunning mobile-first experiences, AppyScreen is fully capable of generating responsive web landing pages, dashboard interfaces, and tablet layouts."
        },
        {
            question: "Can I customize the AI-generated designs?",
            answer: "Absolutely. The AI provides the foundation, but you have full control. You can edit text, swap images, adjust layouts, and modify colors directly within our editor before exporting."
        },
        {
            question: "Do I own the designs I create?",
            answer: "Yes, you have full commercial ownership of all designs and code generated with your account. You can use them for client projects, personal apps, or commercial products without restriction."
        },
        {
            question: "Can I test AppyScreen before subscribing?",
            answer: "Yes, you can try AppyScreen for free. Sign up to receive complimentary credits that allow you to explore our AI models, generate designs, and test our editing capabilities."
        },
        {
            question: "Is my data used to train your AI models?",
            answer: "We prioritize your data privacy. Your private project data and specific design inputs are strictly confidential and are not used to train our public AI models without your explicit consent."
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
