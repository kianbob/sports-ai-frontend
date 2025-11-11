'use client';

import TeamLogo from './TeamLogo';

interface Team {
  rank?: number;
  team: string;
  wins: number;
  losses: number;
  winPct?: number;
  pointsFor?: number;
  pointsAgainst?: number;
  netPoints?: number;
}

interface EnhancedStandingsTableProps {
  title: string;
  teams: Team[];
  conference?: string;
  division?: string;
}

export default function EnhancedStandingsTable({
  title,
  teams,
  conference,
  division,
}: EnhancedStandingsTableProps) {
  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-white/20 bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 px-6 py-4 border-b border-white/10">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        {(conference || division) && (
          <p className="text-sm text-gray-300 mt-1">
            {conference && <span>{conference}</span>}
            {conference && division && <span className="mx-2">•</span>}
            {division && <span>{division}</span>}
          </p>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-400 border-b border-white/10">
              <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                Team
              </th>
              <th className="px-6 py-3 text-center font-semibold uppercase tracking-wider">
                Record
              </th>
              <th className="px-6 py-3 text-center font-semibold uppercase tracking-wider">
                Win %
              </th>
              {teams[0]?.pointsFor !== undefined && (
                <>
                  <th className="px-6 py-3 text-center font-semibold uppercase tracking-wider">
                    PF
                  </th>
                  <th className="px-6 py-3 text-center font-semibold uppercase tracking-wider">
                    PA
                  </th>
                  <th className="px-6 py-3 text-center font-semibold uppercase tracking-wider">
                    Diff
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => {
              const winPct = team.winPct || (team.wins / (team.wins + team.losses)) * 100;
              const diff = team.netPoints || (team.pointsFor || 0) - (team.pointsAgainst || 0);
              
              return (
                <tr
                  key={idx}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <span className="text-gray-400 font-mono text-lg">
                      {team.rank || idx + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <TeamLogo teamName={team.team} size="md" />
                      <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {team.team}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-mono text-green-400 font-bold">
                        {team.wins}
                      </span>
                      <span className="text-gray-500">-</span>
                      <span className="font-mono text-red-400 font-bold">
                        {team.losses}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-mono text-blue-400 font-semibold">
                        {winPct.toFixed(1)}%
                      </span>
                      <div className="w-full max-w-[100px] bg-white/10 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all"
                          style={{ width: `${winPct}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  {team.pointsFor !== undefined && (
                    <>
                      <td className="px-6 py-4 text-center font-mono text-gray-300">
                        {team.pointsFor}
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-gray-300">
                        {team.pointsAgainst}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`font-mono font-bold ${
                            diff > 0 ? 'text-green-400' : 'text-red-400'
                          }`}
                        >
                          {diff > 0 ? '+' : ''}
                          {diff}
                        </span>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
