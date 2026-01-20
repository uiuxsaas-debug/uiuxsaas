import Header from '../_shared/Header';
import ProjectList from '../_shared/ProjectList';
import { AuraBackground } from '@/components/ui/aura-background';

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#030303] selection:bg-yellow-500/30">
      {/* Aura Background */}
      <AuraBackground />

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/20 to-[#030303]/90 pointer-events-none z-[1]" />

      <div className="relative z-10 flex flex-col min-h-screen pt-20">
        <Header />
        <main className="flex-grow">
          <ProjectList />
        </main>
      </div>
    </div>
  );
}
