import { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import RoadmapPage from './pages/RoadmapPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import { useTracker } from './Hooks/useTracker.js';
import { useProjects } from './Hooks/useProjects.js';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const tracker = useTracker();
  const projectsApi = useProjects();

  const pages = {
    dashboard: <DashboardPage tracker={tracker} />,
    roadmap: <RoadmapPage roadmap={tracker.roadmap} onToggle={tracker.toggleRoadmapItem} />,
    projects: <ProjectsPage {...projectsApi} />,
  };

  return (
    <div className="min-h-screen">
      <Sidebar current={page} onChange={setPage} />

      <main className="lg:pl-64">
        {/* key заставляет анимацию появления проигрываться при смене страницы */}
        <div key={page} className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
          <div className="animate-fade-up">{pages[page]}</div>
        </div>
      </main>
    </div>
  );
}