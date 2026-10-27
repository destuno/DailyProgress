import { useState } from 'react';
import { Plus } from 'lucide-react';
import { CATEGORIES } from '../data/defaultTasks';

const fieldClass =
  'h-12 w-full min-w-0 rounded-2xl border border-white/5 bg-slate-950/60 px-4 text-slate-100 outline-none transition duration-300 placeholder:text-slate-600 focus:border-cyan-400/60 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]';

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('study');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), category);
    setTitle('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_170px_auto]"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Новая задача..."
        className={fieldClass}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={fieldClass}
      >
        {Object.entries(CATEGORIES).map(([key, label]) => (
          <option key={key} value={key} className="bg-slate-900">
            {label}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-300 hover:scale-[1.02] hover:shadow-cyan-500/40 active:scale-95 sm:w-auto"
      >
        <Plus size={18} />
        Добавить
      </button>
    </form>
  );
}