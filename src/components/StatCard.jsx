const COLORS = {
  emerald: 'bg-emerald-500/15 text-emerald-400',
  violet: 'bg-violet-500/15 text-violet-400',
  orange: 'bg-orange-500/15 text-orange-400',
  cyan: 'bg-cyan-500/15 text-cyan-400',
};

export default function StatCard({ icon: Icon, label, value, color = 'cyan' }) {
  return (
    <div className="group rounded-2xl border border-white/5 bg-slate-950/50 p-5 transition duration-300 hover:-translate-y-1 hover:border-white/10 hover:shadow-lg hover:shadow-black/40">
      <div
        className={`mb-3 inline-flex rounded-xl p-2.5 transition duration-300 group-hover:scale-110 ${COLORS[color]}`}
      >
        <Icon size={20} />
      </div>
      <p className="text-2xl font-bold tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{label}</p>
    </div>
  );
}