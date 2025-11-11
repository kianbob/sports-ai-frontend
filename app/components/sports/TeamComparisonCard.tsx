'use client';

interface TeamStats {
  name: string;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
}

interface TeamComparisonCardProps {
  team1: TeamStats;
  team2: TeamStats;
}

export default function TeamComparisonCard({ team1, team2 }: TeamComparisonCardProps) {
  return (
    <div className="my-4 rounded-xl overflow-hidden border border-white/20 bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-4 py-3 border-b border-white/10">
        <h3 className="text-lg font-bold text-white text-center">Team Comparison</h3>
      </div>

      <div className="p-6">
        {/* Team Names */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <h4 className="text-xl font-bold text-blue-400">{team1.name}</h4>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-2xl">⚔️</span>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-bold text-purple-400">{team2.name}</h4>
          </div>
        </div>

        {/* Stats Comparison */}
        <div className="space-y-4">
          {/* Record */}
          <div>
            <p className="text-xs text-gray-400 text-center mb-2">RECORD</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="text-2xl font-bold text-white">
                {team1.wins}-{team1.losses}
              </div>
              <div className="text-gray-500">vs</div>
              <div className="text-2xl font-bold text-white">
                {team2.wins}-{team2.losses}
              </div>
            </div>
          </div>

          {/* Points For */}
          <div>
            <p className="text-xs text-gray-400 text-center mb-2">POINTS FOR</p>
            <div className="grid grid-cols-3 gap-4 text-center items-center">
              <div className="text-xl font-mono text-green-400">{team1.pointsFor}</div>
              <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
              <div className="text-xl font-mono text-green-400">{team2.pointsFor}</div>
            </div>
          </div>

          {/* Points Against */}
          <div>
            <p className="text-xs text-gray-400 text-center mb-2">POINTS AGAINST</p>
            <div className="grid grid-cols-3 gap-4 text-center items-center">
              <div className="text-xl font-mono text-red-400">{team1.pointsAgainst}</div>
              <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
              <div className="text-xl font-mono text-red-400">{team2.pointsAgainst}</div>
            </div>
          </div>

          {/* Winner Indicator */}
          <div className="pt-4 border-t border-white/10">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                {team1.wins > team2.wins && (
                  <span className="text-2xl">🏆</span>
                )}
              </div>
              <div className="text-xs text-gray-500">BETTER RECORD</div>
              <div>
                {team2.wins > team1.wins && (
                  <span className="text-2xl">🏆</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
