import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Header from "./_shared/Header";
import Hero from "./_shared/Hero";
import ProjectList from "./_shared/ProjectList";

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-50/50">
      {/* Background Gradients */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-96 h-96 bg-orange-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

      <div className="relative z-10 h-full w-full overflow-y-auto">
        <Header />
        <Hero />
      </div>
    </div>
  );
}
