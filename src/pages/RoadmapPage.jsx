import RoadmapProgress from '../components/analytics/RoadmapProgress';

export default function RoadmapPage({ roadmap, onToggle }) {
  return (
    <>
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
          План подготовки
        </p>
        <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">5 месяцев до вакансии</h1>
        <p className="mt-2 text-slate-400">Отмечайте пункты по мере изучения. Прогресс считается автоматически.</p>
      </header>

      <div className="card">
        <RoadmapProgress roadmap={roadmap} onToggle={onToggle} />
      </div>
    </>
  );
}