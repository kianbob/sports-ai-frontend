'use client';

interface Team {
  rank: number;
  name: string;
  wins: number;
  losses: number;
  winPct: number;
  pointsFor: number;
  pointsAgainst: number;
  streak?: string;
}

interface StandingsTableProps {
  conference: string;
  division: string;
  teams: Team[];
}

export default function StandingsTable({ conference, division, teams }: StandingsTableProps) {
  return (
    <div className="my-4 rounded-xl overflow-hidden border border-white/20 bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-4 py-3 border-b border-white/10">
        <h3 className="text-lg font-bold text-white">{conference}</h3>
        <p className="text-sm text-gray-300">{division}</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-400 border-b border-white/10">
              <th className="px-4 py-2 text-left">Rank</th>
              <th className="px-4 py-2 text-left">Team</th>
              <th className="px-4 py-2 text-center">W-L</th>
              <th className="px-4 py-2 text-center">Win%</th>
              <th className="px-4 py-2 text-center">PF</th>
              <th className="px-4 py-2 text-center">PA</th>
              <th className="px-4 py-2 text-center">Streak</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr
                key={idx}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="px-4 py-3 text-gray-400 font-mono">{team.rank}</td>
                <td className="px-4 py-3">
                  <span className="font-semibold text-white">{team.name}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="font-mono text-green-400">{team.wins}</span>
                  <span className="text-gray-500">-</span>
                  <span className="font-mono text-red-400">{team.losses}</span>
                </td>
                <td className="px-4 py-3 text-center font-mono text-blue-400">
                  {(team.winPct * 100).toFixed(1)}%
                </td>
                <td className="px-4 py-3 text-center font-mono text-gray-300">
                  {team.pointsFor}
                </td>
                <td className="px-4 py-3 text-center font-mono text-gray-300">
                  {team.pointsAgainst}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`font-mono ${
                      team.streak?.startsWith('W')
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {team.streak || '-'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
