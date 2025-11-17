'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import TeamLogo from './TeamLogo';

interface TeamStats {
  name: string;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  winPercent: number;
  division?: string;
}

interface TeamComparisonProps {
  team1: TeamStats;
  team2: TeamStats;
}

export default function TeamComparison({ team1, team2 }: TeamComparisonProps) {
  // Data for bar chart
  const barChartData = [
    {
      stat: 'Wins',
      [team1.name]: team1.wins,
      [team2.name]: team2.wins,
    },
    {
      stat: 'Losses',
      [team1.name]: team1.losses,
      [team2.name]: team2.losses,
    },
    {
      stat: 'Points For',
      [team1.name]: team1.pointsFor,
      [team2.name]: team2.pointsFor,
    },
    {
      stat: 'Points Against',
      [team1.name]: team1.pointsAgainst,
      [team2.name]: team2.pointsAgainst,
    },
  ];

  // Data for radar chart (normalized to 0-100)
  const maxPoints = Math.max(team1.pointsFor, team2.pointsFor, team1.pointsAgainst, team2.pointsAgainst);
  const radarData = [
    {
      stat: 'Win %',
      [team1.name]: team1.winPercent * 100,
      [team2.name]: team2.winPercent * 100,
    },
    {
      stat: 'Offense',
      [team1.name]: (team1.pointsFor / maxPoints) * 100,
      [team2.name]: (team2.pointsFor / maxPoints) * 100,
    },
    {
      stat: 'Defense',
      [team1.name]: ((maxPoints - team1.pointsAgainst) / maxPoints) * 100,
      [team2.name]: ((maxPoints - team2.pointsAgainst) / maxPoints) * 100,
    },
  ];

  const getWinner = () => {
    if (team1.wins > team2.wins) return team1.name;
    if (team2.wins > team1.wins) return team2.name;
    return 'Tied';
  };

  return (
    <div className="space-y-6 my-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Team Comparison ⚔️
        </h2>

        {/* Team Headers */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Team 1 */}
          <div className="text-center">
            <TeamLogo team={team1.name} size="lg" />
            <h3 className="text-xl font-bold text-white mt-3">{team1.name}</h3>
            <p className="text-gray-400 text-sm">{team1.division}</p>
            <div className="mt-2">
              <span className="text-3xl font-bold text-green-400">{team1.wins}</span>
              <span className="text-gray-500 mx-2">-</span>
              <span className="text-3xl font-bold text-red-400">{team1.losses}</span>
            </div>
          </div>

          {/* VS */}
          <div className="flex items-center justify-center">
            <div className="text-4xl font-bold text-gray-500">VS</div>
          </div>

          {/* Team 2 */}
          <div className="text-center">
            <TeamLogo team={team2.name} size="lg" />
            <h3 className="text-xl font-bold text-white mt-3">{team2.name}</h3>
            <p className="text-gray-400 text-sm">{team2.division}</p>
            <div className="mt-2">
              <span className="text-3xl font-bold text-green-400">{team2.wins}</span>
              <span className="text-gray-500 mx-2">-</span>
              <span className="text-3xl font-bold text-red-400">{team2.losses}</span>
            </div>
          </div>
        </div>

        {/* Winner Badge */}
        <div className="text-center py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-white/10">
          <span className="text-sm text-gray-400 uppercase tracking-wide">Better Record</span>
          <div className="text-xl font-bold text-white mt-1">
            {getWinner() === 'Tied' ? '🤝 Tied Records' : `🏆 ${getWinner()}`}
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Statistical Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="stat" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #ffffff20',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey={team1.name} fill="#3b82f6" />
            <Bar dataKey={team2.name} fill="#a855f7" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Radar Chart */}
      <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Performance Radar</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#ffffff20" />
            <PolarAngleAxis dataKey="stat" stroke="#9ca3af" />
            <PolarRadiusAxis stroke="#9ca3af" />
            <Radar name={team1.name} dataKey={team1.name} stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            <Radar name={team2.name} dataKey={team2.name} stroke="#a855f7" fill="#a855f7" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Win Percentage"
          team1Value={`${(team1.winPercent * 100).toFixed(1)}%`}
          team2Value={`${(team2.winPercent * 100).toFixed(1)}%`}
          team1Better={team1.winPercent > team2.winPercent}
        />
        <StatCard
          label="Avg Points/Game"
          team1Value={(team1.pointsFor / (team1.wins + team1.losses)).toFixed(1)}
          team2Value={(team2.pointsFor / (team2.wins + team2.losses)).toFixed(1)}
          team1Better={team1.pointsFor / (team1.wins + team1.losses) > team2.pointsFor / (team2.wins + team2.losses)}
        />
        <StatCard
          label="Point Differential"
          team1Value={`${team1.pointsFor - team1.pointsAgainst > 0 ? '+' : ''}${team1.pointsFor - team1.pointsAgainst}`}
          team2Value={`${team2.pointsFor - team2.pointsAgainst > 0 ? '+' : ''}${team2.pointsFor - team2.pointsAgainst}`}
          team1Better={(team1.pointsFor - team1.pointsAgainst) > (team2.pointsFor - team2.pointsAgainst)}
        />
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  team1Value: string | number;
  team2Value: string | number;
  team1Better: boolean;
}

function StatCard({ label, team1Value, team2Value, team1Better }: StatCardProps) {
  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg rounded-xl border border-white/20 p-4">
      <h4 className="text-sm text-gray-400 uppercase tracking-wide mb-3">{label}</h4>
      <div className="flex justify-between items-center">
        <div className="text-center">
          <div className={`text-2xl font-bold ${team1Better ? 'text-green-400' : 'text-gray-400'}`}>
            {team1Value}
          </div>
          {team1Better && <div className="text-xs text-green-400 mt-1">✓ Better</div>}
        </div>
        <div className="text-gray-500 text-xl">vs</div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${!team1Better ? 'text-green-400' : 'text-gray-400'}`}>
            {team2Value}
          </div>
          {!team1Better && <div className="text-xs text-green-400 mt-1">✓ Better</div>}
        </div>
      </div>
    </div>
  );
}
