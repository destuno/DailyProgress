import { useState } from 'react';
import { Download, Upload } from 'lucide-react';
import { exportToFile, importFromFile } from '../utils/backupUtils';

const buttonBase =
  'flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl px-4 py-3 font-semibold transition duration-300 hover:-translate-y-0.5 active:scale-95';

export default function BackupControls({ state, onImport }) {
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await importFromFile(file);
      onImport(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div className="card">
      <h2 className="mb-4 text-lg font-semibold">Бэкап данных</h2>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => exportToFile(state)}
          className={`${buttonBase} bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40`}
        >
          <Download size={18} />
          Экспорт JSON
        </button>

        <label
          className={`${buttonBase} border border-white/10 bg-slate-950/40 hover:border-cyan-400/50 hover:bg-slate-900`}
        >
          <Upload size={18} />
          Импорт JSON
          <input type="file" accept="application/json" onChange={handleFileChange} className="hidden" />
        </label>
      </div>
      {error && (
        <p className="mt-4 rounded-xl bg-rose-500/10 px-4 py-2 text-sm text-rose-400">{error}</p>
      )}
    </div>
  );
}