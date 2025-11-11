'use client';

interface PlayerStats {
  name: string;
  team: string;
  position: string;
  number?: string;
  stats: {
    [key: string]: number | string;
  };
}

interface PlayerStatsCardProps {
  player: PlayerStats;
  sport: 'nfl' | 'nba';
}

export default function PlayerStatsCard({ player, sport }: PlayerStatsCardProps) {
  const getStatCategories = () => {
    if (sport === 'nfl') {
      return {
        primary: ['Passing Yards', 'Touchdowns', 'Interceptions', 'Rushing Yards', 'Receptions'],
        secondary: ['Completion %', 'Yards/Game', 'Rating'],
      };
    } else {
      return {
        primary: ['Points', 'Rebounds', 'Assists', 'Steals', 'Blocks'],
        secondary: ['FG%', 'FT%', '3P%', 'Minutes'],
      };
    }
  };

  const categories = getStatCategories();

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg rounded-2xl border border-white/20 p-6 my-6">
      {/* Player Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {player.name}
            {player.number && (
              <span className="text-lg text-gray-400">#{player.number}</span>
            )}
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg text-sm font-semibold">
              {player.position}
            </span>
            <span className="text-gray-400">{player.team}</span>
          </div>
        </div>
        
        {/* Player Avatar Placeholder */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">
          {player.name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {categories.primary.map((statName) => {
          const value = player.stats[statName] || player.stats[statName.toLowerCase()] || 0;
          return (
            <div key={statName} className="bg-black/20 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1">{value}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">{statName}</div>
            </div>
          );
        })}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.secondary.map((statName) => {
          const value = player.stats[statName] || player.stats[statName.toLowerCase()] || 0;
          return (
            <div key={statName} className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
              <span className="text-sm text-gray-400">{statName}</span>
              <span className="text-lg font-semibold text-white">{value}</span>
            </div>
          );
        })}
      </div>

      {/* Season Label */}
      <div className="mt-4 pt-4 border-t border-white/10 text-center">
        <span className="text-xs text-gray-400">2024-25 Season Statistics</span>
      </div>
    </div>
  );
}
