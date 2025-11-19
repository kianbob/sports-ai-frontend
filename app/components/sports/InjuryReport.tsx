'use client';
import TeamLogo from '../TeamLogo';

interface Injury {
  id: string;
  name: string;
  position: string;
  jersey: string;
  practice_status: string;
  status: string;
  start_date: string;
  desc: string;
}

interface InjuryReportProps {
  data: {
    team: string;
    injuries: Injury[];
    last_updated: string | number;
  };
}

export default function InjuryReport({ data }: InjuryReportProps) {
  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('out') || s.includes('ir')) return 'bg-red-500/20 text-red-400 border-red-500/30';
    if (s.includes('doubtful')) return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    if (s.includes('questionable')) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  };

  return (
    <div className="my-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-white/10 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
        <div className="flex items-center gap-3">
          <TeamLogo team={data.team} size="md" />
          <div>
            <h3 className="font-bold text-white text-lg">{data.team} Injury Report</h3>
            <p className="text-xs text-gray-400">Week {data.last_updated} Update</p>
          </div>
        </div>
        <div className="text-2xl">🚑</div>
      </div>

      {/* List */}
      <div className="max-h-[400px] overflow-y-auto">
        {data.injuries.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No active injuries reported for this week.
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-black/20 text-xs uppercase text-gray-400 sticky top-0 backdrop-blur-md">
              <tr>
                <th className="p-3 font-semibold">Player</th>
                <th className="p-3 font-semibold">Position</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold hidden sm:table-cell">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.injuries.map((player, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-white">{player.name}</div>
                  </td>
                  <td className="p-3">
                    <span className="text-xs font-mono text-gray-400 bg-white/10 px-1.5 py-0.5 rounded">
                      {player.position}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(player.status)} uppercase font-bold`}>
                      {player.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-400 hidden sm:table-cell">
                    {player.desc || player.practice_status || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
