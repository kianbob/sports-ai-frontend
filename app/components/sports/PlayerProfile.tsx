'use client';

import TeamLogo from '../TeamLogo';

interface PlayerProfileProps {
  data: {
    name: string;
    position: string;
    team: string;
    jersey?: string;
    stats: any; // Raw API response
  };
}

export default function PlayerProfile({ data }: PlayerProfileProps) {
  // Extract some sample stats from the raw data (customize based on actual API response structure)
  // Note: Sportradar structure varies, checking for common fields
  const stats = data.stats;
  const birthDate = stats.birth_date || stats.birthdate || 'N/A';
  const college = stats.college || 'N/A';
  const height = stats.height ? `${stats.height} in` : 'N/A';
  const weight = stats.weight ? `${stats.weight} lbs` : 'N/A';

  return (
    <div className="my-6 bg-gradient-to-br from-slate-800/90 to-blue-900/40 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
      
      {/* Header Card */}
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
        
        {/* Physical Stats */}
        <div className="hidden md:block text-right text-sm text-gray-400 space-y-1">
           <div>Height: <span className="text-white">{height}</span></div>
           <div>Weight: <span className="text-white">{weight}</span></div>
           <div>College: <span className="text-white">{college}</span></div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6">
        <div className="bg-black/20 rounded-xl p-4 border border-white/5">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Player Bio</h3>
          <p className="text-gray-300 leading-relaxed text-sm">
             Detailed season statistics for {data.name} are retrieved directly from Sportradar official feeds. 
             (Note: Displaying full season stats requires mapping nested JSON fields specific to the sport).
          </p>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center border border-white/5">
                <div className="text-2xl font-bold text-white">Active</div>
                <div className="text-xs text-gray-400 uppercase">Status</div>
            </div>
             <div className="bg-white/5 rounded-lg p-4 text-center border border-white/5">
                <div className="text-2xl font-bold text-white">{birthDate}</div>
                <div className="text-xs text-gray-400 uppercase">Birth Date</div>
            </div>
        </div>
      </div>
    </div>
  );
}
