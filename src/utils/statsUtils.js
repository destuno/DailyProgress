import { toDateKey } from './dateUtils';

export const getTodayPercent = (tasks, completions, todayKey) => {
  if (!tasks.length) return 0;
  const doneIds = completions[todayKey] || [];
  const doneCount = tasks.filter(task => doneIds.includes(task.id)).length;
  return Math.round((doneCount / tasks.length) * 100);
};

export const calcStreak = (completions) => {
  const cursor = new Date();
  // Если сегодня еще ничего не отмечено, серия считается со вчера
  if (!completions[toDateKey(cursor)]?.length) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (completions[toDateKey(cursor)]?.length) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
};

export const getWeeklyActivity = (completions, days) =>
  days.map(({ key, label }) => ({
    day: label,
    tasks: completions[key]?.length || 0,
  }));