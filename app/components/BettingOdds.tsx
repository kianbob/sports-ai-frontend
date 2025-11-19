'use client';

import { useState } from 'react';
import TeamLogo from './TeamLogo';
import axios from 'axios';

interface GameOdds {
  id: string;
  homeTeam: string;
  awayTeam: string;
  commenceTime: string;
  bookmakers: any[];
}

export default function BettingOdds({ games }: { games: GameOdds[] }) {
  const [selectedBet, setSelectedBet] = useState<string | null>(null);

  const handleBet = async (gameId: string, selection: string, odds: number, type: string) => {
    setSelectedBet(`${gameId}-${selection}`);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/bets/`, {
        game_id: gameId,
        selection,
        odds,
        stake: 100, // Default unit
        bet_type: type
      });
      alert(`✅ Bet tracked: ${selection} (${odds})`);
    } catch (e) {
      alert("Error tracking bet");
    }
    setTimeout(() => setSelectedBet(null), 2000);
  };

  return (
    <div className="space-y-4 my-6">
      <h2 className="text-2xl font-bold text-white">🎲 Betting Odds</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {games.map((game) => {
           const bookmaker = game.bookmakers[0];
           const markets = bookmaker?.markets || [];
           const spread = markets.find((m: any) => m.key === 'spreads')?.outcomes || [];
           
           return (
             <div key={game.id} className="bg-slate-800/50 rounded-xl p-4 border border-white/10">
               <div className="flex justify-between mb-4">
                 <div className="flex gap-2 items-center"><TeamLogo team={game.awayTeam} size="sm" /> {game.awayTeam}</div>
                 <div className="text-gray-400">@</div>
                 <div className="flex gap-2 items-center">{game.homeTeam} <TeamLogo team={game.homeTeam} size="sm" /></div>
               </div>
               
               <div className="grid grid-cols-2 gap-2">
                 {spread.map((outcome: any, i: number) => (
                   <button
                     key={i}
                     onClick={() => handleBet(game.id, outcome.name, outcome.price, 'spread')}
                     className={`p-2 rounded text-sm font-mono transition-all ${
                       selectedBet === `${game.id}-${outcome.name}` 
                       ? 'bg-green-600 text-white' 
                       : 'bg-black/30 text-gray-300 hover:bg-white/10'
                     }`}
                   >
                     {outcome.name} {outcome.point > 0 ? '+' : ''}{outcome.point} ({outcome.price})
                   </button>
                 ))}
               </div>
             </div>
           );
        })}
      </div>
    </div>
  );
}
