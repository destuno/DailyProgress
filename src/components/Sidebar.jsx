import { FolderKanban, LayoutDashboard, Map } from 'lucide-react';

const ITEMS = [
  { id: 'dashboard', label: 'Дашборд', icon: LayoutDashboard },
  { id: 'roadmap', label: 'План подготовки', icon: Map },
  { id: 'projects', label: 'Проекты', icon: FolderKanban },
];

export default function Sidebar({ current, onChange }) {
  return (
    <aside className="sticky top-0 z-20 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:border-b-0 lg:border-r">
      <nav className="flex gap-2 overflow-x-auto p-3 lg:flex-col lg:gap-3 lg:p-6">
        <p className="hidden px-3 pb-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 lg:block">
          Меню
        </p>

        {ITEMS.map(({ id, label, icon: Icon }) => {
          const active = current === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition duration-300 lg:w-full ${
                active
                  ? 'border border-cyan-500/20 bg-gradient-to-r from-cyan-500/20 to-emerald-500/10 text-cyan-300 shadow-lg shadow-cyan-500/10'
                  : 'border border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-100 lg:hover:translate-x-1'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}