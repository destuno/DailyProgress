import { useState } from 'react';
import { ExternalLink, Plus, Trash2 } from 'lucide-react';

const STATUSES = {
  idea: { label: 'Идея', color: 'bg-slate-500/15 text-slate-300' },
  in_progress: { label: 'В работе', color: 'bg-cyan-500/15 text-cyan-300' },
  done: { label: 'Готово', color: 'bg-emerald-500/15 text-emerald-300' },
};

const inputClass =
  'w-full rounded-2xl border border-white/5 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition duration-300 placeholder:text-slate-600 focus:border-cyan-400/60 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]';

const EMPTY_FORM = { name: '', description: '', link: '', status: 'idea' };

export default function ProjectsPage({ projects, addProject, updateStatus, deleteProject }) {
  const [form, setForm] = useState(EMPTY_FORM);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    addProject({
      name: form.name.trim(),
      description: form.description.trim(),
      link: form.link.trim(),
      status: form.status,
    });
    setForm(EMPTY_FORM);
  };

  const doneCount = projects.filter((p) => p.status === 'done').length;

  return (
    <>
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">Проекты</p>
        <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Портфолио</h1>
        <p className="mt-2 text-slate-400">
          Завершено проектов: {doneCount} из {projects.length}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="card h-fit space-y-4">
          <h2 className="text-lg font-semibold">Новый проект</h2>

          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Название"
            className={inputClass}
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Описание"
            rows={3}
            className={`${inputClass} resize-none`}
          />
          <input
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            placeholder="Ссылка на GitHub или демо (необязательно)"
            className={inputClass}
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className={inputClass}
          >
            {Object.entries(STATUSES).map(([key, { label }]) => (
              <option key={key} value={key} className="bg-slate-900">
                {label}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-violet-500/20 transition duration-300 hover:scale-[1.02] active:scale-95"
          >
            <Plus size={18} />
            Добавить проект
          </button>
        </form>

        <div className="space-y-4 lg:col-span-2">
          {projects.length === 0 && (
            <div className="card text-center text-slate-500">
              Проектов пока нет. Добавьте первый в форме слева.
            </div>
          )}

          {projects.map((project) => (
            <article
              key={project.id}
              className="card transition duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-semibold">{project.name}</h3>
                  {project.description && (
                    <p className="mt-1 text-sm text-slate-400">{project.description}</p>
                  )}
                </div>
                <button
                  onClick={() => deleteProject(project.id)}
                  aria-label="Удалить проект"
                  className="rounded-lg p-1.5 text-slate-600 transition duration-300 hover:bg-rose-500/10 hover:text-rose-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <select
                  value={project.status}
                  onChange={(e) => updateStatus(project.id, e.target.value)}
                  className={`rounded-xl px-3 py-1.5 text-sm font-medium outline-none ${STATUSES[project.status].color}`}
                >
                  {Object.entries(STATUSES).map(([key, { label }]) => (
                    <option key={key} value={key} className="bg-slate-900 text-slate-100">
                      {label}
                    </option>
                  ))}
                </select>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sm text-cyan-400 transition duration-300 hover:text-cyan-300"
                  >
                    <ExternalLink size={14} />
                    Открыть
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}