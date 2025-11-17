'use client';

import TeamLogo from './TeamLogo';

interface Prediction {
  homeTeam: string;
  awayTeam: string;
  predictedWinner: string;
  confidence: number;
  predictedScore: {
    home: number;
    away: number;
  };
  keyFactors: string[];
  analysis: string;
}

interface GamePredictionProps {
  prediction: Prediction;
}

export default function GamePrediction({ prediction }: GamePredictionProps) {
  const homeWinning = prediction.predictedWinner === prediction.homeTeam;
  const winProbability = prediction.confidence;
  const loseProbability = 100 - winProbability;

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg rounded-2xl border border-white/20 p-6 my-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        🔮 AI Prediction
      </h2>

      {/* Matchup */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Away Team */}
        <div className="text-center">
          <TeamLogo team={prediction.awayTeam} size="lg" />
          <h3 className="text-xl font-bold text-white mt-3">{prediction.awayTeam}</h3>
          <div className="text-4xl font-bold text-white mt-3">
            {prediction.predictedScore.away}
          </div>
          {!homeWinning && (
            <div className="mt-2 px-3 py-1 bg-green-600/20 text-green-400 rounded-lg text-sm font-semibold inline-block">
              Predicted Winner
            </div>
          )}
        </div>

        {/* VS */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-gray-500 mb-4">@</div>
          <div className="text-sm text-gray-400">Predicted Final</div>
        </div>

        {/* Home Team */}
        <div className="text-center">
          <TeamLogo team={prediction.homeTeam} size="lg" />
          <h3 className="text-xl font-bold text-white mt-3">{prediction.homeTeam}</h3>
          <div className="text-4xl font-bold text-white mt-3">
            {prediction.predictedScore.home}
          </div>
          {homeWinning && (
            <div className="mt-2 px-3 py-1 bg-green-600/20 text-green-400 rounded-lg text-sm font-semibold inline-block">
              Predicted Winner
            </div>
          )}
        </div>
      </div>

      {/* Win Probability Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>{prediction.awayTeam}</span>
          <span>Win Probability</span>
          <span>{prediction.homeTeam}</span>
        </div>
        <div className="relative h-8 bg-black/20 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-start px-3"
            style={{ width: `${homeWinning ? loseProbability : winProbability}%` }}
          >
            <span className="text-white font-bold text-sm">
              {homeWinning ? loseProbability : winProbability}%
            </span>
          </div>
          <div
            className="absolute right-0 top-0 h-full bg-gradient-to-l from-purple-600 to-purple-400 flex items-center justify-end px-3"
            style={{ width: `${homeWinning ? winProbability : loseProbability}%` }}
          >
            <span className="text-white font-bold text-sm">
              {homeWinning ? winProbability : loseProbability}%
            </span>
          </div>
        </div>
      </div>

      {/* Key Factors */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">Key Factors</h3>
        <div className="space-y-2">
          {prediction.keyFactors.map((factor, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span className="text-gray-300 text-sm">{factor}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis */}
      <div className="bg-black/20 rounded-lg p-4 border-l-4 border-blue-500">
        <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-2">
          AI Analysis
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed">{prediction.analysis}</p>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 pt-4 border-t border-white/10 text-center">
        <p className="text-xs text-gray-500">
          Predictions are based on historical data and current team performance. Results may vary.
        </p>
      </div>
    </div>
  );
}
