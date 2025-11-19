import TeamComparison from '../components/TeamComparison';
import BettingOdds from '../components/BettingOdds';
import PlayerStatsCard from '../components/PlayerStatsCard';
import GamePrediction from '../components/GamePrediction';

export default function FeaturesPage() {
  // Demo data
  const team1 = {
    name: 'Kansas City Chiefs',
    wins: 15,
    losses: 2,
    pointsFor: 564,
    pointsAgainst: 435,
    winPercent: 0.882,
    division: 'AFC West',
  };
  const team2 = {
    name: 'Detroit Lions',
    wins: 15,
    losses: 2,
    pointsFor: 542,
    pointsAgainst: 398,
    winPercent: 0.882,
    division: 'NFC North',
  };

  // Demo Odds - Updated to match new strict interface
  const demoOdds = [
    {
      id: '1',
      sport: 'NFL',
      home_team: 'Kansas City Chiefs', // Updated keys to match interface
      away_team: 'Buffalo Bills',    // Updated keys to match interface
      commence_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // Updated key
      bookmakers: [
        {
          name: 'DraftKings',
          markets: [
            {
              key: 'spreads',
              outcomes: [
                { name: 'Buffalo Bills', price: -110, point: 3.5 },
                { name: 'Kansas City Chiefs', price: -110, point: -3.5 },
              ],
            },
            {
              key: 'totals',
              outcomes: [
                { name: 'Over', price: -110, point: 47.5 },
                { name: 'Under', price: -110, point: 47.5 },
              ],
            },
            {
              key: 'h2h',
              outcomes: [
                { name: 'Buffalo Bills', price: 165 },
                { name: 'Kansas City Chiefs', price: -195 },
              ],
            },
          ],
        },
      ],
    },
  ];

  const demoPlayer = {
    name: 'Patrick Mahomes',
    team: 'Kansas City Chiefs',
    position: 'QB',
    number: '15',
    stats: {
      'Passing Yards': 4183,
      'Touchdowns': 32,
      'Interceptions': 12,
      'Rushing Yards': 423,
      'Receptions': 0,
      'Completion %': '67.3',
      'Yards/Game': '261.4',
      'Rating': '98.5',
    },
  };

  const demoPrediction = {
    homeTeam: 'Kansas City Chiefs',
    awayTeam: 'Buffalo Bills',
    predictedWinner: 'Kansas City Chiefs',
    confidence: 62,
    predictedScore: {
      home: 28,
      away: 24,
    },
    keyFactors: [
      'Chiefs have home field advantage at Arrowhead Stadium',
      'Patrick Mahomes averages 285 passing yards vs Bills',
      'Chiefs defense ranks #3 in points allowed',
      'Bills offense struggles in cold weather games',
    ],
    analysis:
      'The Chiefs enter this matchup as slight favorites based on their home field advantage and recent playoff experience. While both teams are evenly matched, Kansas City\'s defense has been exceptional in limiting scoring opportunities. The game is expected to be close, with the Chiefs pulling away in the 4th quarter.',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">🎯 All Features Showcase</h1>

        <TeamComparison team1={team1} team2={team2} />
        
        {/* Fixed Prop: Passing 'data' object wrapping games */}
        <BettingOdds data={{ games: demoOdds }} />
        
        <PlayerStatsCard player={demoPlayer} sport="nfl" />
        
        <GamePrediction prediction={demoPrediction} />
      </div>
    </div>
  );
}
