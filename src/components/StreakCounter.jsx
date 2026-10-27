import { Flame } from 'lucide-react';
import StatCard from './StatCard';

export default function StreakCounter({ streak }) {
  return (
    <StatCard icon={Flame} label="дней подряд (streak)" value={streak} color="orange" />
  );
}