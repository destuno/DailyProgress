export default function Header() {
  const today = new Date().toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <header className="animate-fade-up mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
        Daily Progress Tracker
      </p>
      <h1 className="mt-2 bg-gradient-to-r from-white via-cyan-200 to-emerald-300 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
        Мой путь в Frontend & Data Analytics
      </h1>
      <p className="mt-2 capitalize text-slate-400">{today}</p>
    </header>
  );
}