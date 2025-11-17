'use client';

import TeamLogo from './TeamLogo';

interface Team {
  name: string;
  market?: string;
  wins: number;
  losses: number;
  win_pct?: number;
  points_for?: number;
  points_against?: number;
}

interface StandingsTableProps {
  data: Team[];
  title: string;
  sport?: 'nfl' | 'nba';
}

export default function EnhancedStandingsTable({ data, title, sport = 'nfl' }: StandingsTableProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-purple-900/40 backdrop-blur-lg rounded-xl border border-white/20 p-6 mb-6">
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">#</th>
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">Team</th>
              <th className="text-center py-3 px-4 text-gray-300 font-semibold">W</th>
              <th className="text-center py-3 px-4 text-gray-300 font-semibold">L</th>
              <th className="text-center py-3 px-4 text-gray-300 font-semibold">Win%</th>
              {sport === 'nfl' && (
                <>
                  <th className="text-center py-3 px-4 text-gray-300 font-semibold">PF</th>
                  <th className="text-center py-3 px-4 text-gray-300 font-semibold">PA</th>
                  <th className="text-center py-3 px-4 text-gray-300 font-semibold">Diff</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((team, idx) => {
              const teamName = team.market ? `${team.market} ${team.name}` : team.name;
              const winPct = team.win_pct || (team.wins / (team.wins + team.losses));
              const diff = team.points_for && team.points_against 
                ? team.points_for - team.points_against 
                : 0;

              return (
                <tr 
                  key={idx}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-400">{idx + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <TeamLogo team={teamName} size="sm" sport={sport} />
                      <span className="text-white font-medium">{teamName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-white font-semibold">{team.wins}</td>
                  <td className="py-3 px-4 text-center text-gray-300">{team.losses}</td>
                  <td className="py-3 px-4 text-center text-gray-300">
                    {(winPct * 100).toFixed(1)}%
                  </td>
                  {sport === 'nfl' && (
                    <>
                      <td className="py-3 px-4 text-center text-gray-300">{team.points_for}</td>
                      <td className="py-3 px-4 text-center text-gray-300">{team.points_against}</td>
                      <td className={`py-3 px-4 text-center font-semibold ${
                        diff > 0 ? 'text-green-400' : diff < 0 ? 'text-red-400' : 'text-gray-300'
                      }`}>
                        {diff > 0 ? '+' : ''}{diff}
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
