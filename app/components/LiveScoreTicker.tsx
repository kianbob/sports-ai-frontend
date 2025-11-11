'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Game {
  id: string;
  home_team: string;
  away_team: string;
  home_score: string;
  away_score: string;
  status: string;
}

export default function LiveScoreTicker() {
  const [games, setGames] = useState<Game[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetchLiveScores();
    // Refresh every 30 seconds
    const interval = setInterval(fetchLiveScores, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLiveScores = async () => {
    try {
      // Make a background request to get live scores
      const response = await axios.post(`${API_URL}/chat/`, {
        message: 'Get live NFL scores',
        session_id: 'ticker-' + Date.now(),
      });

      // Parse games from response (simplified - you'd want better parsing)
      // For now, we'll use dummy data
      const dummyGames: Game[] = [
        {
          id: '1',
          home_team: 'Chiefs',
          away_team: 'Bills',
          home_score: '24',
          away_score: '21',
          status: 'FINAL',
        },
        {
          id: '2',
          home_team: 'Lions',
          away_team: 'Packers',
          home_score: '31',
          away_score: '28',
          status: 'Q4 2:45',
        },
        {
          id: '3',
          home_team: '49ers',
          away_team: 'Seahawks',
          home_score: '14',
          away_score: '10',
          status: 'Q2 8:12',
        },
      ];

      setGames(dummyGames);
    } catch (error) {
      console.error('Error fetching live scores:', error);
    }
  };

  const isLive = (status: string) => {
    return status.includes('Q') || status.toLowerCase().includes('halftime');
  };

  if (games.length === 0) return null;

  return (
    <div className="bg-black/40 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Ticker Bar */}
        <div
          className="flex items-center gap-4 px-6 py-2 cursor-pointer hover:bg-white/5 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-white">LIVE SCORES</span>
          </div>

          {/* Scrolling Scores */}
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-6 animate-scroll">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="flex items-center gap-2 text-sm whitespace-nowrap"
                >
                  <span className="text-gray-300">{game.away_team}</span>
                  <span className="font-bold text-white">{game.away_score}</span>
                  <span className="text-gray-500">@</span>
                  <span className="text-gray-300">{game.home_team}</span>
                  <span className="font-bold text-white">{game.home_score}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      isLive(game.status)
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-600 text-gray-200'
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
          <div className="px-6 pb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {games.map((game) => (
              <div
                key={game.id}
                className="bg-white/5 rounded-lg p-3 border border-white/10"
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      isLive(game.status)
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'bg-gray-600 text-gray-200'
                    }`}
                  >
                    {game.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{game.away_team}</span>
                    <span className="text-2xl font-bold text-white">
                      {game.away_score}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{game.home_team}</span>
                    <span className="text-2xl font-bold text-white">
                      {game.home_score}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
