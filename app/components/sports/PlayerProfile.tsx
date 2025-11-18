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
  const birthDate = stats.birth_date || stats.birthdate || 'N/A';
  const college = stats.college || 'N/A';
  const height = stats.height ? `${stats.height} in` : 'N/A';
  const weight = stats.weight ? `${stats.weight} lbs` : 'N/A';
  const rookieYear = stats.rookie_year || 'N/A';

  return (
    <div className="my-6 bg-gradient-to-br from-slate-800/90 to-blue-900/40 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
      <div className="relative p-6 flex items-center justify-between border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg ring-4 ring-white/10">
             {data.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">{data.name}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="px-3 py-0.5 bg-blue-500/20 text-blue-300 rounded-full text-sm font-bold border border-blue-500/30">
                #{data.jersey} • {data.position}
              </span>
              <div className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                 <TeamLogo team={data.team} size="sm" />
                 {data.team}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
            <div className="text-gray-400 text-xs uppercase">Height</div>
            <div className="text-xl font-bold text-white">{height}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
            <div className="text-gray-400 text-xs uppercase">Weight</div>
            <div className="text-xl font-bold text-white">{weight}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
            <div className="text-gray-400 text-xs uppercase">College</div>
            <div className="text-xl font-bold text-white truncate">{college}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
            <div className="text-gray-400 text-xs uppercase">Rookie Year</div>
            <div className="text-xl font-bold text-white">{rookieYear}</div>
          </div>
      </div>
    </div>
  );
}
