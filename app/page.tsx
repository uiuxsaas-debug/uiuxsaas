"use client"
import Header from "./_shared/Header";
import Hero from "./_shared/Hero";
import Features from "./_shared/Features";
import Templates from "./_shared/Templates";
import Testimonial from "./_shared/Testimonial";
import ProductDemo from "./_shared/ProductDemo";
import Footer from "./_shared/Footer";
import { Tiles } from "@/components/ui/tiles";
import HowItWorks from "./_shared/HowItWorks";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

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
    <div className="relative min-h-screen w-full overflow-hidden bg-[#FCFCFC] text-black">
      <div className="absolute inset-0 z-0 opacity-60">
        <Tiles rows={60} cols={20} tileSize="lg" />
      </div>
      <div className="relative z-10 min-h-screen w-full overflow-y-auto scroll-smooth">
        <Header />
        <Hero />
        <Features />
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <Templates />
        <Testimonial />
        <div id="pricing">
          <PricingSection />
        </div>
        <ProductDemo />
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
