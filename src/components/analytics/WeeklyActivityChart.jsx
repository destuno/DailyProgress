import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function WeeklyActivityChart({ data }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap="25%">
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="day" stroke="#64748b" tickLine={false} axisLine={false} />
          <YAxis allowDecimals={false} stroke="#64748b" tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 16,
              color: '#e2e8f0',
            }}
            cursor={{ fill: 'rgba(34, 211, 238, 0.05)' }}
          />
          <Bar
            dataKey="tasks"
            name="Задач"
            fill="#22d3ee"
            radius={[8, 8, 0, 0]}
            animationDuration={900}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}