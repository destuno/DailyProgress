import { Check } from 'lucide-react';
import { ROADMAP } from '../../data/roadmap';
import ProgressBar from '../ProgressBar';

export default function RoadmapProgress({ roadmap, onToggle }) {
  return (
    <div className="space-y-4">
      {ROADMAP.map((month) => {
        const monthDone = month.items.filter((item) => roadmap[item.id]).length;
        const monthPercent = Math.round((monthDone / month.items.length) * 100);

        return (
          <div
            key={month.id}
            className="rounded-2xl border border-white/5 bg-slate-950/40 p-4 transition duration-300 hover:border-white/10"
          >
            <ProgressBar value={monthPercent} label={month.title} />

            <ul className="mt-4 space-y-2">
              {month.items.map((item) => {
                const checked = !!roadmap[item.id];
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onToggle(item.id)}
                      className="group flex w-full items-center gap-3 rounded-xl px-2 py-1.5 text-left text-sm transition duration-300 hover:bg-white/5"
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition duration-300 ${
                          checked
                            ? 'border-emerald-500 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                            : 'border-slate-600 group-hover:border-cyan-400'
                        }`}
                      >
                        {checked && <Check size={12} strokeWidth={3} className="text-slate-950" />}
                      </span>
                      <span
                        className={`transition duration-300 ${
                          checked ? 'text-slate-500 line-through' : 'text-slate-200'
                        }`}
                      >
                        {item.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}