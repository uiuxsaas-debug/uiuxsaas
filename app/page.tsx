"use client";

import Link from 'next/link';
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Header from "./_shared/Header";
import Hero from "./_shared/Hero";
import StickyScrollFeatures from "./_shared/StickyScrollFeatures";
import Features from "./_shared/Features";
import Testimonial from "./_shared/Testimonial";
import Footer from "./_shared/Footer";
import StorySection from "./_shared/StorySection";
import FAQ from "./_shared/FAQ";
import WhyChooseSection from "./_shared/WhyChooseSection";
import PricingSection from "@/components/pricing/PricingSection";

function HomePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get('checkout_success')) {
      toast.success("Payment Received Successfully! Time to create.");
      router.replace('/');
    }
  }, [searchParams, router]);

  return (
    <div className="relative min-h-screen w-full bg-white text-black selection:bg-[#FF5200] selection:text-white max-w-[100vw]">
      <div className="relative z-10 w-full">
        <Header />
        <Hero />
        <StickyScrollFeatures />
        <Features />

        <Testimonial />
        <div id="pricing">
          <PricingSection />
        </div>
        <WhyChooseSection />
        <StorySection />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-[#030303]" />}>
      <HomePageContent />
    </Suspense>
  );
}
