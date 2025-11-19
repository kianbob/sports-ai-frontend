'use client';
import TeamLogo, { getTeamMeta } from '../TeamLogo';

interface PlayerProfileProps {
  data: {
    name: string;
    position: string;
    team: string;
    jersey?: string;
    stats: any;
  };
}

export default function PlayerProfile({ data }: PlayerProfileProps) {
  const stats = data.stats || {};
  const { color, accent } = getTeamMeta(data.team);
  
  // Key stats configuration
  const keyStats = [
      { label: "Passing Yards", value: stats.passing_yards || stats.PassingYards || 0 },
      { label: "Touchdowns", value: stats.touchdowns || stats.Touchdowns || 0 },
      { label: "Interceptions", value: stats.interceptions || stats.Interceptions || 0 },
      { label: "Rushing Yards", value: stats.rushing_yards || stats.RushingYards || 0 }
  ];

  return (
    <div className={`my-6 bg-gradient-to-br ${color} rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-500`}>
      {/* Header */}
      <div className="p-6 flex justify-between items-start bg-black/20 backdrop-blur-sm">
        <div>
            <h2 className="text-3xl font-bold text-white mb-1 tracking-tight">
              {data.name} <span className="text-white/50 text-xl">#{data.jersey}</span>
            </h2>
            <div className="flex items-center gap-3">
                <span className={`bg-white/10 ${accent} text-xs font-bold px-2 py-1 rounded uppercase tracking-wider border border-white/10`}>
                  {data.position}
                </span>
                <span className="text-gray-300 flex items-center gap-2 font-medium">
                    <TeamLogo team={data.team} size="sm" /> {data.team}
                </span>
            </div>
        </div>
        <div className={`w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-2xl font-bold text-white border-2 border-white/10 shadow-inner`}>
            {data.name.charAt(0)}
        </div>
      </div>

      {/* Big Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-6 pb-6 mt-6">
        {keyStats.map((stat, i) => (
            <div key={i} className="bg-black/20 rounded-xl p-4 text-center border border-white/5 hover:bg-black/30 transition-colors backdrop-blur-md">
                <div className={`text-2xl font-black text-white`}>{stat.value}</div>
                <div className={`text-[10px] uppercase tracking-widest ${accent} font-bold mt-1 opacity-80`}>{stat.label}</div>
            </div>
        ))}
      </div>

      {/* Physical Stats Footer */}
      <div className="bg-black/40 px-6 py-3 flex justify-between text-sm border-t border-white/5 text-gray-400">
          <div>
             <span className="text-xs uppercase opacity-50 block">Height</span>
             <span className="text-white font-mono">{stats.height ? `${stats.height} in` : 'N/A'}</span>
          </div>
          <div>
             <span className="text-xs uppercase opacity-50 block">Weight</span>
             <span className="text-white font-mono">{stats.weight ? `${stats.weight} lbs` : 'N/A'}</span>
          </div>
          <div>
             <span className="text-xs uppercase opacity-50 block">College</span>
             <span className="text-white font-mono">{stats.college || 'N/A'}</span>
          </div>
           <div className="text-right">
             <span className="text-xs uppercase opacity-50 block">Exp</span>
             <span className="text-white font-mono">{stats.experience || 'R'} yrs</span>
          </div>
      </div>
    </div>
  );
}
