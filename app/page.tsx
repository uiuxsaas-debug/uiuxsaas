import Header from "./_shared/Header";
import Hero from "./_shared/Hero";
import { AuraBackground } from "@/components/ui/aura-background";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030303]">
      {/* Unicorn Studio Aura Background */}
      <AuraBackground />

      {/* Subtle overlay for depth with yellow tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/20 to-[#030303]/90 pointer-events-none z-[1]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen w-full overflow-y-auto">
        <Header />
        <Hero />
      </div>
    </div>
  );
}
