'use client';

import { useEffect, useState } from 'react';
import TeamLogo from './TeamLogo';

interface Game {
  id: string;
  date: string;
  status: string;
  home_team: string;
  home_score: string;
  away_team: string;
  away_score: string;
  venue: string;
}

export default function SmartLiveTicker() {
  const [games, setGames] = useState<Game[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasLiveGames, setHasLiveGames] = useState(false);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/scores/nfl`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const allGames = data.scores || [];
          
          // Check if any games are live
          const liveGames = allGames.filter((g: Game) => 
            g.status.toLowerCase().includes('q') || 
            g.status.toLowerCase().includes('halftime') ||
            g.status.toLowerCase().includes('in progress')
          );
          
          setHasLiveGames(liveGames.length > 0);
          setGames(allGames.slice(0, 10)); // Show top 10 games
        }
      } catch (error) {
        console.error('Error fetching live scores:', error);
      }
    };

    fetchScores();
    
    // Only refresh if there are live games (every 2 minutes)
    const interval = setInterval(() => {
      if (hasLiveGames) {
        fetchScores();
      }
    }, 120000);

    return () => clearInterval(interval);
  }, [hasLiveGames]);

  // Don't show ticker if no games at all
  if (games.length === 0) return null;

  const isLive = (status: string) => {
    return status.toLowerCase().includes('q') || 
           status.toLowerCase().includes('halftime') ||
           status.toLowerCase().includes('in progress');
  };

  return (
    <div className="bg-gradient-to-r from-slate-900/95 to-purple-900/95 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        {/* Ticker Bar */}
        <div
          className="flex items-center gap-4 px-6 py-3 cursor-pointer hover:bg-white/5 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {hasLiveGames && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-white">🔴 LIVE</span>
            </div>
          )}
          
          {!hasLiveGames && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-400">📊 SCORES</span>
            </div>
          )}

          {/* Scrolling Scores */}
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-6">
              {games.slice(0, 5).map((game) => (
                <div
                  key={game.id}
                  className="flex items-center gap-3 text-sm whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    <TeamLogo team={game.away_team} size="sm" sport="nfl" />
                    <span className="text-gray-300">{game.away_team}</span>
                    <span className="font-bold text-white ml-1">{game.away_score}</span>
                  </div>
                  <span className="text-gray-500">@</span>
                  <div className="flex items-center gap-1">
                    <TeamLogo team={game.home_team} size="sm" sport="nfl" />
                    <span className="text-gray-300">{game.home_team}</span>
                    <span className="font-bold text-white ml-1">{game.home_score}</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      isLive(game.status)
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {game.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button className="text-gray-400 hover:text-white transition-colors">
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>

        {/* Expanded View */}
        {isExpanded && (
          <div className="px-6 pb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 border-t border-white/10 pt-4">
            {games.map((game) => (
              <div
                key={game.id}
                className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors"
              >
                <div className="flex justify-between items-center mb-3">
                  <span
                    className={`text-xs px-2 py-1 rounded font-medium ${
                      isLive(game.status)
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {game.status}
                  </span>
                  <span className="text-xs text-gray-400">{game.venue}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <TeamLogo team={game.away_team} size="sm" sport="nfl" />
                      <span className="text-gray-300 text-sm">{game.away_team}</span>
                    </div>
                    <span className="text-xl font-bold text-white">
                      {game.away_score}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <TeamLogo team={game.home_team} size="sm" sport="nfl" />
                      <span className="text-gray-300 text-sm">{game.home_team}</span>
                    </div>
                    <span className="text-xl font-bold text-white">
                      {game.home_score}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
