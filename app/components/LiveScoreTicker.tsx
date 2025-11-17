'use client';

import { useEffect, useState } from 'react';
import LiveScoreCard from './LiveScoreCard';

interface Game {
  id: string;
  home_team: string;
  away_team: string;
  home_score: number;
  away_score: number;
  status: string;
  scheduled?: string;
  date?: string;  // Add missing field
  venue?: string; // Add missing field
}

export default function LiveScoreTicker() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        // Use direct scores endpoint - NO CLAUDE AI!
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/scores/nfl`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setGames(data.scores || []);
        }
      } catch (error) {
        console.error('Error fetching live scores:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch immediately
    fetchScores();

    // Refresh every 2 minutes (instead of 30 seconds)
    const interval = setInterval(fetchScores, 120000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">📊 Live Scores</h2>
        <div className="text-gray-400">Loading scores...</div>
      </div>
    );
  }

  if (!games || games.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-3">📊 Today's Scores</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.slice(0, 6).map((game) => (
          <LiveScoreCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
