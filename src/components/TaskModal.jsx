import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Circle,
  ExternalLink,
  Lightbulb,
  Link2,
  ListChecks,
  Plus,
  Target,
  Trash2,
  X,
  BookOpen,
} from 'lucide-react';
import { CATEGORIES } from '../data/defaultTasks';
import { getTaskInfo } from '../data/taskPool';


const inputClass =
  'w-full rounded-2xl border border-white/5 bg-slate-950/60 px-4 py-2.5 text-slate-100 outline-none transition duration-300 placeholder:text-slate-600 focus:border-cyan-400/60 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]';

const buttonPrimary =
  'flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-2.5 font-semibold text-slate-950 transition duration-300 hover:scale-[1.02] active:scale-95';

const toHttpUrl = (raw) => {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

function Section({ icon: Icon, title, children }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon size={18} className="shrink-0 text-cyan-400" />
        <h3 className="font-semibold text-slate-100">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function LinkRow({ title, url, onRemove }) {
  return (
    <li className="group flex items-center gap-3 rounded-xl border border-white/5 bg-slate-950/40 px-3 py-2.5 transition duration-300 hover:border-white/10">
      <Link2 size={16} className="shrink-0 text-cyan-400" />
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="flex min-w-0 flex-1 items-center gap-2 text-sm text-cyan-300 transition duration-300 hover:text-cyan-200"
      >
        <span className="truncate">{title}</span>
        <ExternalLink size={12} className="shrink-0" />
      </a>
      {onRemove && (
        <button
          onClick={onRemove}
          aria-label="Удалить ссылку"
          className="shrink-0 rounded-lg p-1 text-slate-600 transition duration-300 hover:text-rose-400 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <Trash2 size={16} />
        </button>
      )}
    </li>
  );
}

export default function TaskModal({ task, onClose, onUpdate }) {
  const details = task.details ?? { notes: '', subtasks: [], resources: [] };
  const info = getTaskInfo(task.id);

  const [subtaskTitle, setSubtaskTitle] = useState('');
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const update = (patch) => onUpdate({ ...details, ...patch });

  const addSubtask = (e) => {
    e.preventDefault();
    if (!subtaskTitle.trim()) return;
    update({
      subtasks: [
        ...details.subtasks,
        { id: `s-${Date.now()}`, title: subtaskTitle.trim(), done: false },
      ],
    });
    setSubtaskTitle('');
  };

  const toggleSubtask = (id) =>
    update({
      subtasks: details.subtasks.map((s) => (s.id === id ? { ...s, done: !s.done } : s)),
    });

  const removeSubtask = (id) =>
    update({ subtasks: details.subtasks.filter((s) => s.id !== id) });

  const addResource = (e) => {
    e.preventDefault();
    if (!resourceUrl.trim()) return;
    update({
      resources: [
        ...details.resources,
        {
          id: `r-${Date.now()}`,
          title: resourceTitle.trim() || resourceUrl.trim(),
          url: toHttpUrl(resourceUrl),
        },
      ],
    });
    setResourceTitle('');
    setResourceUrl('');
  };

  const removeResource = (id) =>
    update({ resources: details.resources.filter((r) => r.id !== id) });

  const doneSubtasks = details.subtasks.filter((s) => s.done).length;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-up flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/50"
      >
        {/* Шапка */}
        <div className="flex items-start justify-between gap-4 border-b border-white/5 p-5 sm:p-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
              {CATEGORIES[task.category]}
            </p>
            <h2 className="mt-1 text-xl font-bold sm:text-2xl">{task.title}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="shrink-0 rounded-xl p-2 text-slate-400 transition duration-300 hover:bg-white/5 hover:text-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Прокручиваемое содержимое */}
        <div className="min-h-0 flex-1 space-y-8 overflow-y-auto p-5 sm:p-6">
          {/* Задание и объяснение */}
          {info ? (
            <>
              <Section icon={Target} title="Задание">
                <p className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-slate-100">
                  {info.goal}
                </p>
                <ol className="space-y-2">
                  {info.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-300">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-slate-800 text-xs font-semibold text-cyan-300">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </Section>

              <Section icon={Lightbulb} title="Объяснение">
                <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                  {info.explanation.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                {info.code && (
                  <pre className="overflow-x-auto rounded-2xl border border-white/5 bg-slate-950 p-4 text-sm text-emerald-300">
                    <code>{info.code}</code>
                  </pre>
                )}
              </Section>

              {info.resources?.length > 0 && (
                <Section icon={BookOpen} title="Материалы для изучения">
                  <ul className="space-y-2">
                    {info.resources.map((r) => (
                      <LinkRow key={r.url} title={r.title} url={r.url} />
                    ))}
                  </ul>
                </Section>
              )}
            </>
          ) : (
            <p className="rounded-2xl border border-white/5 bg-slate-950/40 p-4 text-sm text-slate-400">
              Для этой задачи нет готового описания. Запишите задание и объяснение в заметках ниже.
            </p>
          )}

          {/* Шаги пользователя */}
          <Section icon={ListChecks} title="Мои шаги">
            {details.subtasks.length > 0 && (
              <p className="text-sm text-slate-400">
                Выполнено: {doneSubtasks} из {details.subtasks.length}
              </p>
            )}

            <ul className="space-y-2">
              {details.subtasks.map((s) => (
                <li
                  key={s.id}
                  className="group flex items-center gap-3 rounded-xl border border-white/5 bg-slate-950/40 px-3 py-2.5 transition duration-300 hover:border-white/10"
                >
                  <button
                    onClick={() => toggleSubtask(s.id)}
                    aria-label="Отметить шаг"
                    className="shrink-0 transition duration-300 hover:scale-110"
                  >
                    {s.done ? (
                      <CheckCircle2 size={20} className="text-emerald-400" />
                    ) : (
                      <Circle size={20} className="text-slate-600" />
                    )}
                  </button>
                  <span
                    className={`flex-1 text-sm ${
                      s.done ? 'text-slate-500 line-through' : 'text-slate-200'
                    }`}
                  >
                    {s.title}
                  </span>
                  <button
                    onClick={() => removeSubtask(s.id)}
                    aria-label="Удалить шаг"
                    className="shrink-0 rounded-lg p-1 text-slate-600 transition duration-300 hover:text-rose-400 sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>

            <form onSubmit={addSubtask} className="flex gap-2">
              <input
                value={subtaskTitle}
                onChange={(e) => setSubtaskTitle(e.target.value)}
                placeholder="Добавить свой шаг..."
                className={inputClass}
              />
              <button type="submit" aria-label="Добавить шаг" className={`${buttonPrimary} px-4`}>
                <Plus size={18} />
              </button>
            </form>
          </Section>

          {/* Свои материалы */}
          <Section icon={Link2} title="Мои ссылки">
            {details.resources.length > 0 && (
              <ul className="space-y-2">
                {details.resources.map((r) => (
                  <LinkRow
                    key={r.id}
                    title={r.title}
                    url={r.url}
                    onRemove={() => removeResource(r.id)}
                  />
                ))}
              </ul>
            )}

            <form onSubmit={addResource} className="space-y-2">
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  value={resourceTitle}
                  onChange={(e) => setResourceTitle(e.target.value)}
                  placeholder="Название (видео, статья)"
                  className={`${inputClass} sm:flex-1`}
                />
                <input
                  value={resourceUrl}
                  onChange={(e) => setResourceUrl(e.target.value)}
                  placeholder="Ссылка"
                  className={`${inputClass} sm:flex-[1.5]`}
                />
              </div>
              <button type="submit" className={`${buttonPrimary} w-full`}>
                <Plus size={18} />
                Добавить ссылку
              </button>
            </form>
          </Section>

          {/* Заметки */}
          <Section icon={BookOpen} title="Заметки">
            <textarea
              value={details.notes}
              onChange={(e) => update({ notes: e.target.value })}
              rows={5}
              placeholder="Конспект, команды, решения, важные мысли..."
              className={`${inputClass} resize-y`}
            />
          </Section>
        </div>
      </div>
    </div>
  );
}