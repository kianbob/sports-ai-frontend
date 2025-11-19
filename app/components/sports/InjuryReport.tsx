'use client';
import TeamLogo from '../TeamLogo';

interface Injury {
  id: string;
  name: string;
  position: string;
  jersey: string;
  status: string;
  start_date: string;
  practice_status: string;
  desc: string;
}

interface InjuryReportProps {
  data: {
    team: string;
    data: {
        injuries: Injury[];
    }
  };
}

export default function InjuryReport({ data }: InjuryReportProps) {
  const injuries = data.data?.injuries || [];

  const getStatusColor = (status: string) => {
    const s = (status || '').toLowerCase();
    if (s.includes('out') || s.includes('ir')) return 'text-red-500 bg-red-500/10 border-red-500/20';
    if (s.includes('doubtful')) return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
    if (s.includes('questionable')) return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
  };

  return (
    <div className="my-6 bg-slate-900/80 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden shadow-xl">
      <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <TeamLogo team={data.team} size="md" />
          <div>
            <h3 className="font-bold text-white text-lg">{data.team} Injury Report</h3>
            <p className="text-xs text-gray-400">Official Team Status</p>
          </div>
        </div>
        <div className="text-2xl">🚑</div>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {injuries.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No active injuries reported.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-black/20 text-xs uppercase text-gray-400 sticky top-0 backdrop-blur-md">
              <tr>
                <th className="p-3 font-semibold">Player</th>
                <th className="p-3 font-semibold">Pos</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold hidden sm:table-cell">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {injuries.map((player, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-white">{player.name}</div>
                  </td>
                  <td className="p-3 text-sm text-gray-400">{player.position}</td>
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
