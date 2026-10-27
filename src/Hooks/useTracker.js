import { useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { DEFAULT_TASKS } from '../data/defaultTasks';
import { POOL_TASKS, getTaskInfo } from '../data/taskPool';
import { toDateKey } from '../utils/dateUtils';

const STORAGE_KEY = 'progress-tracker-v1';

const INITIAL_STATE = {
  tasks: DEFAULT_TASKS,
  completions: {}, // { 'YYYY-MM-DD': ['t1', 't2'] }
  roadmap: {},     // { 'm1-1': true }
  usedPool: [],    // id задач из пула, которые уже выдавались
  rotatedOn: null, // дата последнего обновления задач
};

const createEmptyDetails = () => ({
  notes: '',
  subtasks: [],
  resources: [],
});

// Задачи с описанием можно заменять; свои задачи остаются без изменений
const isRotatable = (id) => Boolean(getTaskInfo(id));

// Заменяет выполненные задачи новыми из пула. Невыполненные не трогаются.
const rotateTasks = (prev, todayKey) => {
  if (prev.rotatedOn === todayKey) return prev;

  if (!prev.rotatedOn) {
    return { ...prev, usedPool: prev.usedPool ?? [], rotatedOn: todayKey };
  }

  const since = prev.rotatedOn;

  // Все задачи, отмеченные с момента последнего обновления и до сегодня
  const doneIds = new Set(
    Object.entries(prev.completions)
      .filter(([day]) => day >= since && day < todayKey)
      .flatMap(([, ids]) => ids)
  );

  const usedPool = [...(prev.usedPool ?? [])];
  const available = POOL_TASKS.filter((task) => !usedPool.includes(task.id));

  const tasks = prev.tasks.map((task) => {
    if (!doneIds.has(task.id) || !isRotatable(task.id)) return task;

    const next = available.shift();
    if (!next) return task; // пул закончился, задача остается

    usedPool.push(next.id);
    return {
      id: next.id,
      title: next.title,
      category: next.category,
      details: createEmptyDetails(),
    };
  });

  return { ...prev, tasks, usedPool, rotatedOn: todayKey };
};

export const useTracker = () => {
  const [state, setState] = useLocalStorage(STORAGE_KEY, INITIAL_STATE);
  const todayKey = toDateKey();

  // Проверка при открытии приложения и при смене дня
  useEffect(() => {
    setState((prev) => rotateTasks(prev, todayKey));
  }, [todayKey, setState]);

  const toggleTask = useCallback((taskId) => {
    setState((prev) => {
      const doneIds = prev.completions[todayKey] || [];
      const nextIds = doneIds.includes(taskId)
        ? doneIds.filter((id) => id !== taskId)
        : [...doneIds, taskId];
      return {
        ...prev,
        completions: { ...prev.completions, [todayKey]: nextIds },
      };
    });
  }, [setState, todayKey]);

  const addTask = useCallback((title, category) => {
    setState((prev) => ({
      ...prev,
      tasks: [
        ...prev.tasks,
        { id: `t-${Date.now()}`, title, category, details: createEmptyDetails() },
      ],
    }));
  }, [setState]);

  const deleteTask = useCallback((taskId) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== taskId),
    }));
  }, [setState]);

  const updateTaskDetails = useCallback((taskId, details) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === taskId ? { ...task, details } : task
      ),
    }));
  }, [setState]);

  const toggleRoadmapItem = useCallback((itemId) => {
    setState((prev) => ({
      ...prev,
      roadmap: { ...prev.roadmap, [itemId]: !prev.roadmap[itemId] },
    }));
  }, [setState]);

  const importData = useCallback((data) => {
    setState({
      tasks: data.tasks,
      completions: data.completions,
      roadmap: data.roadmap || {},
      usedPool: data.usedPool || [],
      rotatedOn: data.rotatedOn || todayKey,
    });
  }, [setState, todayKey]);

  return {
    state,
    tasks: state.tasks,
    completions: state.completions,
    roadmap: state.roadmap ?? {},
    todayKey,
    toggleTask,
    addTask,
    deleteTask,
    updateTaskDetails,
    toggleRoadmapItem,
    importData,
  };
};