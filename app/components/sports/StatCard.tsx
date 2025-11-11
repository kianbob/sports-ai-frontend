'use client';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: string;
  color?: 'blue' | 'green' | 'red' | 'purple';
}

export default function StatCard({ label, value, icon, color = 'blue' }: StatCardProps) {
  const colorClasses = {
    blue: 'from-blue-600/20 to-blue-600/5 border-blue-500/30 text-blue-400',
    green: 'from-green-600/20 to-green-600/5 border-green-500/30 text-green-400',
    red: 'from-red-600/20 to-red-600/5 border-red-500/30 text-red-400',
    purple: 'from-purple-600/20 to-purple-600/5 border-purple-500/30 text-purple-400',
  };

  return (
    <div
      className={`rounded-lg border p-4 bg-gradient-to-br backdrop-blur-lg ${colorClasses[color]}`}
    >
      {icon && <div className="text-2xl mb-2">{icon}</div>}
      <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
  );
}
