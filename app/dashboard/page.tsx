import Header from '../_shared/Header';
import ProjectList from '../_shared/ProjectList';

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen w-full bg-white selection:bg-[#FF5200]/20">

      {/* Subtle grid or pattern if needed, but keeping it clean white for now as requested */}
      <div className="relative z-10 flex flex-col min-h-screen pt-20">
        <Header />
        <main className="flex-grow">
          <ProjectList />
        </main>
      </div>
    </div>
  );
}
