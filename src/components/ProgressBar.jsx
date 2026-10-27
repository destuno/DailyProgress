export default function ProgressBar({ value, label, height = 'h-2.5' }) {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
        <span>{label}</span>
        <span className="font-semibold tabular-nums text-emerald-400">{value}%</span>
      </div>
      <div className={`w-full overflow-hidden rounded-full bg-slate-800/80 ${height}`}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 shadow-[0_0_12px_rgba(16,185,129,0.5)] transition-all duration-700 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}