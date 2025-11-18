'use client';

import TeamLogo from '../TeamLogo';

interface PlayerData {
  name: string;
  position: string;
  team: string;
  jersey?: string;
  stats: any;
}

interface PlayerComparisonProps {
  data: {
    player1: PlayerData;
    player2: PlayerData;
    sport: string;
  };
}

export default function PlayerComparison({ data }: PlayerComparisonProps) {
  const { player1, player2 } = data;

  // Helper to extract stats safely
  const getStat = (p: PlayerData, key: string) => p.stats?.[key] || 0;

  // Define comparison keys based on sport
  const statKeys = data.sport === 'nfl' 
    ? ['games_played', 'passing_yards', 'touchdowns', 'interceptions', 'rating']
    : ['games_played', 'points_per_game', 'rebounds_per_game', 'assists_per_game', 'field_goal_pct'];

  const labels: {[key: string]: string} = {
    games_played: 'Games',
    passing_yards: 'Pass Yards',
    touchdowns: 'TDs',
    interceptions: 'INTs',
    rating: 'Rating',
    points_per_game: 'PPG',
    rebounds_per_game: 'RPG',
    assists_per_game: 'APG',
    field_goal_pct: 'FG%'
  };

  return (
    <div className="my-6 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
      {/* Header VS */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-b from-white/5 to-transparent">
        <div className="text-center w-1/3">
            <div className="text-4xl mb-2">👤</div>
            <h3 className="font-bold text-white text-lg leading-tight">{player1.name}</h3>
            <p className="text-sm text-gray-400">{player1.team}</p>
        </div>
        <div className="text-2xl font-black text-yellow-500 italic w-1/3 text-center">VS</div>
        <div className="text-center w-1/3">
            <div className="text-4xl mb-2">👤</div>
            <h3 className="font-bold text-white text-lg leading-tight">{player2.name}</h3>
            <p className="text-sm text-gray-400">{player2.team}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-4 space-y-3">
        {statKeys.map(key => {
            const val1 = Number(getStat(player1, key));
            const val2 = Number(getStat(player2, key));
            const better1 = val1 > val2;
            
            // Calculate bar widths
            const max = Math.max(val1, val2) || 1;
            const width1 = (val1 / max) * 100;
            const width2 = (val2 / max) * 100;

            return (
                <div key={key} className="bg-white/5 p-3 rounded-xl">
                    <div className="flex justify-between text-xs text-gray-400 mb-1 uppercase tracking-wider font-bold">
                        <span>{labels[key] || key}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Player 1 Bar (Right aligned) */}
                        <div className="flex-1 flex flex-col items-end">
                            <span className={`font-mono font-bold ${better1 ? 'text-green-400' : 'text-white'}`}>{val1}</span>
                            <div className="h-1.5 bg-gray-700 rounded-full w-full mt-1 flex justify-end">
                                <div className={`h-full rounded-full ${better1 ? 'bg-green-500' : 'bg-blue-500'}`} style={{width: `${width1}%`}}></div>
                            </div>
                        </div>
                        
                        {/* Divider */}
                        <div className="w-px h-8 bg-white/10"></div>

                        {/* Player 2 Bar (Left aligned) */}
                        <div className="flex-1 flex flex-col items-start">
                            <span className={`font-mono font-bold ${!better1 && val2 !== val1 ? 'text-green-400' : 'text-white'}`}>{val2}</span>
                            <div className="h-1.5 bg-gray-700 rounded-full w-full mt-1">
                                <div className={`h-full rounded-full ${!better1 && val2 !== val1 ? 'bg-green-500' : 'bg-purple-500'}`} style={{width: `${width2}%`}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
}
