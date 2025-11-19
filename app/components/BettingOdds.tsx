'use client';

import { useState } from 'react';
import TeamLogo from './TeamLogo';
import axios from 'axios';

interface GameOdds {
  id: string;
  home_team: string;
  away_team: string;
  commence_time: string;
  bookmakers: any[];
}

export default function BettingOdds({ data }: { data: { games: GameOdds[] } }) {
  const [selectedBet, setSelectedBet] = useState<string | null>(null);
  const games = data.games || [];

  const handleBet = async (gameId: string, selection: string, odds: number, type: string, book: string) => {
    const betId = `${gameId}-${selection}`;
    setSelectedBet(betId);
    
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/bets/`, {
        game_id: gameId,
        selection,
        odds,
        stake: 100,
        bet_type: type,
        sportsbook: book
      });
      // Visual feedback handled by state change below
    } catch (e) {
      alert("Error tracking bet");
      setSelectedBet(null); // Revert on error
    }
  };

  if (games.length === 0) {
      return <div className="p-4 text-center text-gray-400 bg-white/5 rounded-lg">No live odds available right now.</div>;
  }

  return (
    <div className="space-y-4 my-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">🎲 Betting Odds</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {games.slice(0, 6).map((game) => {
           const bookmaker = game.bookmakers?.[0];
           if (!bookmaker) return null;
           
           const markets = bookmaker.markets || [];
           const spread = markets.find((m: any) => m.key === 'spreads')?.outcomes || [];
           const h2h = markets.find((m: any) => m.key === 'h2h')?.outcomes || [];
           
           return (
             <div key={game.id} className="bg-slate-800/50 rounded-xl p-4 border border-white/10 shadow-lg">
               <div className="flex justify-between mb-4 pb-2 border-b border-white/5">
                 <div className="flex gap-2 items-center"><TeamLogo team={game.away_team} size="sm" /> {game.away_team}</div>
                 <div className="text-gray-500 text-sm">@{bookmaker.name}</div>
                 <div className="flex gap-2 items-center">{game.home_team} <TeamLogo team={game.home_team} size="sm" /></div>
               </div>
               
               <div className="space-y-3">
                 {/* Spread Buttons */}
                 <div className="grid grid-cols-2 gap-2">
                    {spread.map((outcome: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => handleBet(game.id, outcome.name, outcome.price, 'spread', bookmaker.name)}
                        disabled={selectedBet === `${game.id}-${outcome.name}`}
                        className={`p-2 rounded text-xs font-mono transition-all flex justify-between ${
                          selectedBet === `${game.id}-${outcome.name}` 
                          ? 'bg-green-600 text-white border border-green-500' 
                          : 'bg-black/30 text-gray-300 hover:bg-white/10 border border-white/5'
                        }`}
                      >
                        <span>{outcome.name} {outcome.point > 0 ? '+' : ''}{outcome.point}</span>
                        <span className="text-blue-400">{outcome.price}</span>
                      </button>
                    ))}
                 </div>
                 
                 {/* Moneyline Buttons */}
                 <div className="grid grid-cols-2 gap-2">
                    {h2h.map((outcome: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => handleBet(game.id, outcome.name, outcome.price, 'moneyline', bookmaker.name)}
                        disabled={selectedBet === `${game.id}-${outcome.name}`}
                        className={`p-2 rounded text-xs font-mono transition-all text-center ${
                          selectedBet === `${game.id}-${outcome.name}` 
                          ? 'bg-green-600 text-white border border-green-500' 
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
                        }`}
                      >
                        {outcome.price > 0 ? '+' : ''}{outcome.price}
                      </button>
                    ))}
                 </div>
               </div>
             </div>
           );
        })}
      </div>
    </div>
  );
}
