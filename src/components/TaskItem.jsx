import { Check, Info, Trash2 } from 'lucide-react';
import { CATEGORIES } from '../data/defaultTasks';

const BADGE = {
  study: 'bg-sky-500/15 text-sky-300',
  react: 'bg-cyan-500/15 text-cyan-300',
  js: 'bg-yellow-500/15 text-yellow-300',
  leetcode: 'bg-orange-500/15 text-orange-300',
  project: 'bg-violet-500/15 text-violet-300',
  analytics: 'bg-emerald-500/15 text-emerald-300',
};

export default function TaskItem({ task, checked, onToggle, onDelete, onOpen }) {
  const subtasks = task.details?.subtasks ?? [];
  const subtasksDone = subtasks.filter((s) => s.done).length;

  return (
    <li className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-slate-950/40 px-4 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-white/10 hover:bg-slate-900">
      <button
        onClick={onToggle}
        aria-label="Отметить выполнение"
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition duration-300 ${
          checked
            ? 'scale-105 border-emerald-500 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]'
            : 'border-slate-600 hover:border-cyan-400'
        }`}
      >
        {checked && <Check size={16} strokeWidth={3} className="text-slate-950" />}
      </button>

      <button onClick={onOpen} className="min-w-0 flex-1 text-left">
        <p
          className={`truncate transition duration-300 ${
            checked ? 'text-slate-500 line-through' : 'text-slate-100'
          }`}
        >
          {task.title}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span
            className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-medium ${
              BADGE[task.category] || 'bg-slate-700 text-slate-300'
            }`}
          >
            {CATEGORIES[task.category]}
          </span>
          {subtasks.length > 0 && (
            <span className="text-[11px] text-slate-500">
              шаги: {subtasksDone}/{subtasks.length}
            </span>
          )}
        </div>
      </button>

      <button
        onClick={onOpen}
        aria-label="Открыть задачу"
        className="rounded-lg p-1.5 text-slate-500 transition duration-300 hover:bg-cyan-500/10 hover:text-cyan-400"
      >
        <Info size={18} />
      </button>

      <button
        onClick={onDelete}
        aria-label="Удалить задачу"
        className="rounded-lg p-1.5 text-slate-600 transition duration-300 hover:bg-rose-500/10 hover:text-rose-400 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
}