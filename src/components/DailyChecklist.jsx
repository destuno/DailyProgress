import TaskItem from './TaskItem';

export default function DailyChecklist({ tasks, doneIds, onToggle, onDelete, onOpen }) {
  if (!tasks.length) {
    return <p className="py-6 text-center text-slate-500">Задач пока нет. Добавьте первую!</p>;
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          checked={doneIds.includes(task.id)}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
          onOpen={() => onOpen(task.id)}
        />
      ))}
    </ul>
  );
}