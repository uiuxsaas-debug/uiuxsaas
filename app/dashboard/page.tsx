import Header from '../_shared/Header';
import ProjectList from '../_shared/ProjectList';

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen w-full bg-slate-50 selection:bg-[#FF5200]/20">

      {/* Subtle grid or pattern if needed, but keeping it clean white for now as requested */}
      <div className="relative z-10 flex flex-col min-h-screen pt-20">
        <Header />
        <main className="flex-grow py-8 bg-slate-50">
          <ProjectList />
        </main>
      </div>
    </div>
  );
}
