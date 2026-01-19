import Header from '../_shared/Header';
import ProjectList from '../_shared/ProjectList';

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen w-full bg-slate-50/50 selection:bg-purple-500/30">
      {/* Background Gradients - Optimized */}
      <div className="fixed top-0 -left-4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob will-change-transform" />
      <div className="fixed top-0 -right-4 w-96 h-96 bg-orange-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 will-change-transform" />
      <div className="fixed -bottom-8 left-20 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 will-change-transform" />

      <div className="relative z-10 flex flex-col min-h-screen pt-20">
        <Header />
        <main className="flex-grow">
          <ProjectList />
        </main>
      </div>
    </div>
  );
}
