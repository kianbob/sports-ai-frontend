'use client';

interface PlayerStats {
  name: string;
  team: string;
  position: string;
  jersey?: string;
  stats: {
    [key: string]: number | string;
  };
}

interface PlayerStatsCardProps {
  player: PlayerStats;
  sport: 'nfl' | 'nba';
}

export default function PlayerStatsCard({ player, sport }: PlayerStatsCardProps) {
  // Map backend keys to display labels
  const getStatValue = (key: string) => {
      // Handle different casing from backend
      const val = player.stats[key] || player.stats[key.toLowerCase()] || player.stats[key.toUpperCase()] || 0;
      return Math.round(Number(val)); // Ensure we show whole numbers for yards
  };

  const statsToShow = sport === 'nfl' ? [
      { label: 'Passing Yds', key: 'passing_yards' },
      { label: 'Touchdowns', key: 'touchdowns' },
      { label: 'Interceptions', key: 'interceptions' },
      { label: 'Rushing Yds', key: 'rushing_yards' }
  ] : [
      { label: 'Points', key: 'points' },
      { label: 'Rebounds', key: 'rebounds' },
      { label: 'Assists', key: 'assists' }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg rounded-2xl border border-white/20 p-6 my-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {player.name} <span className="text-lg text-gray-400">#{player.jersey}</span>
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg text-sm font-semibold">
              {player.position}
            </span>
            <span className="text-gray-400">{player.team}</span>
          </div>
        </div>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
          {player.name.charAt(0)}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statsToShow.map((stat) => (
            <div key={stat.key} className="bg-black/20 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1">{getStatValue(stat.key)}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</div>
            </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10 text-center text-xs text-gray-500">
         2023-2024 Season Stats
      </div>
    </div>
  );
}
