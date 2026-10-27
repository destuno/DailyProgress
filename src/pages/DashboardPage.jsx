import { useState } from 'react';
import { CheckCircle2, Target } from 'lucide-react';
import Header from '../components/Header';
import CircularProgress from '../components/CircularProgress';
import StatCard from '../components/StatCard';
import StreakCounter from '../components/StreakCounter';
import DailyChecklist from '../components/DailyChecklist';
import AddTaskForm from '../components/AddTaskForm';
import BackupControls from '../components/BackupControls';
import TaskModal from '../components/TaskModal';
import WeeklyActivityChart from '../components/analytics/WeeklyActivityChart';
import { ROADMAP } from '../data/roadmap';
import { getLastNDays } from '../utils/dateUtils';
import { calcStreak, getTodayPercent, getWeeklyActivity } from '../utils/statsUtils';

export default function DashboardPage({ tracker }) {
  const {
    state,
    tasks,
    completions,
    roadmap,
    todayKey,
    toggleTask,
    addTask,
    deleteTask,
    updateTaskDetails,
    importData,
  } = tracker;

  const [activeTaskId, setActiveTaskId] = useState(null);
  const activeTask = tasks.find((task) => task.id === activeTaskId);

  const doneToday = completions[todayKey] || [];
  const todayPercent = getTodayPercent(tasks, completions, todayKey);
  const streak = calcStreak(completions);
  const weeklyData = getWeeklyActivity(completions, getLastNDays(7));

  const allRoadmapItems = ROADMAP.flatMap((month) => month.items);
  const roadmapDone = allRoadmapItems.filter((item) => roadmap[item.id]).length;
  const roadmapPercent = Math.round((roadmapDone / allRoadmapItems.length) * 100);

  return (
    <>
      <Header />

      <section className="card mb-6 flex flex-col items-center gap-8 p-6 sm:flex-row sm:p-8">
        <CircularProgress value={todayPercent} label="за сегодня" />

        <div className="grid w-full flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={CheckCircle2}
            label="Выполнено сегодня"
            value={`${doneToday.length} / ${tasks.length}`}
            color="emerald"
          />
          <StreakCounter streak={streak} />
          <StatCard
            icon={Target}
            label="План подготовки"
            value={`${roadmapPercent}%`}
            color="violet"
          />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="animate-fade-up space-y-6" style={{ animationDelay: '0.1s' }}>
          <div className="card space-y-5">
            <h2 className="text-lg font-semibold">Чек-лист на сегодня</h2>
            <DailyChecklist
              tasks={tasks}
              doneIds={doneToday}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onOpen={setActiveTaskId}
            />
            <AddTaskForm onAdd={addTask} />
          </div>

          <BackupControls state={state} onImport={importData} />
        </section>

        <section className="animate-fade-up space-y-6" style={{ animationDelay: '0.2s' }}>
          <div className="card">
            <h2 className="mb-4 text-lg font-semibold">Активность за 7 дней</h2>
            <WeeklyActivityChart data={weeklyData} />
          </div>
        </section>
      </div>

      {activeTask && (
        <TaskModal
          key={activeTask.id}
          task={activeTask}
          onClose={() => setActiveTaskId(null)}
          onUpdate={(details) => updateTaskDetails(activeTask.id, details)}
        />
      )}
    </>
  );
}