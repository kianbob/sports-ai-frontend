'use client';
import TeamLogo from '../TeamLogo';

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
  
  // Extract key stats for the Big Cards
  const keyStats = [
      { label: "Passing Yards", value: stats.passing_yards || stats.PassingYards || 0 },
      { label: "Touchdowns", value: stats.touchdowns || stats.Touchdowns || 0 },
      { label: "Interceptions", value: stats.interceptions || stats.Interceptions || 0 },
      { label: "Rushing Yards", value: stats.rushing_yards || stats.RushingYards || 0 }
  ];

  return (
    <div className="my-6 bg-gradient-to-br from-[#1a1625] to-[#2d2a4a] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-6 flex justify-between items-start">
        <div>
            <h2 className="text-3xl font-bold text-white mb-1">{data.name} <span className="text-gray-400 text-xl">#{data.jersey}</span></h2>
            <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-xs font-bold px-2 py-1 rounded text-white uppercase">{data.position}</span>
                <span className="text-gray-300 flex items-center gap-1">
                    <TeamLogo team={data.team} size="sm" /> {data.team}
                </span>
            </div>
        </div>
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold text-white border-4 border-[#1a1625]">
            {data.name.split(' ').map(n=>n[0]).join('')}
        </div>
      </div>

      {/* Big Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-6 pb-6">
        {keyStats.map((stat, i) => (
            <div key={i} className="bg-black/20 rounded-xl p-3 text-center border border-white/5 hover:bg-black/30 transition-colors">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">{stat.label}</div>
            </div>
        ))}
      </div>

      {/* Secondary Info Strip */}
      <div className="bg-black/20 px-6 py-3 flex justify-between text-sm border-t border-white/5">
          <div className="flex flex-col">
             <span className="text-gray-500 text-xs uppercase">Height</span>
             <span className="text-gray-200 font-mono">{stats.height || "N/A"}</span>
          </div>
          <div className="flex flex-col">
             <span className="text-gray-500 text-xs uppercase">Weight</span>
             <span className="text-gray-200 font-mono">{stats.weight || "N/A"}</span>
          </div>
          <div className="flex flex-col">
             <span className="text-gray-500 text-xs uppercase">College</span>
             <span className="text-gray-200 font-mono">{stats.college || "N/A"}</span>
          </div>
           <div className="flex flex-col text-right">
             <span className="text-gray-500 text-xs uppercase">Exp</span>
             <span className="text-gray-200 font-mono">{stats.experience || "R"} yrs</span>
          </div>
      </div>
    </div>
  );
}
