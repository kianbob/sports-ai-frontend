'use client';

import { useState } from 'react';
import TeamLogo from './TeamLogo';
import axios from 'axios';

interface Outcome {
  name: string;
  price: number;
  point?: number;
}

interface Market {
  key: string;
  outcomes: Outcome[];
}

interface Bookmaker {
  name: string;
  markets: Market[];
}

interface GameOdds {
  id: string;
  sport: string;
  home_team?: string;
  homeTeam?: string;
  away_team?: string;
  awayTeam?: string;
  bookmakers: Bookmaker[];
}

export default function BettingOdds({ data }: { data: { games: GameOdds[] } }) {
  const [selectedBet, setSelectedBet] = useState<string | null>(null);
  const games = data.games || (Array.isArray(data) ? data : []);

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
    } catch (e) {
      console.error("Bet error", e);
    }
    
    setTimeout(() => setSelectedBet(null), 2000);
  };

  if (!games || games.length === 0) {
      return (
        <div className="my-6 p-6 bg-slate-900/50 rounded-xl border border-white/10 text-center">
            <p className="text-gray-400">No betting odds available at the moment.</p>
        </div>
      );
  }

  return (
    <div className="space-y-4 my-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">🎲 Betting Odds</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {games.slice(0, 8).map((game) => {
           const homeName = game.home_team || game.homeTeam || "Home";
           const awayName = game.away_team || game.awayTeam || "Away";
           const bookmaker = game.bookmakers?.[0];
           
           if (!bookmaker) return null;
           
           const markets = bookmaker.markets || [];
           const spread = markets.find((m) => m.key === 'spreads')?.outcomes || [];
           const h2h = markets.find((m) => m.key === 'h2h')?.outcomes || [];
           
           return (
             <div key={game.id} className="bg-slate-900/80 backdrop-blur-md rounded-xl p-4 border border-white/10 shadow-lg">
               <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/5">
                 <div className="flex items-center gap-2 w-5/12 overflow-hidden">
                    <TeamLogo team={awayName} size="sm" /> 
                    <span className="text-sm font-bold text-white truncate">{awayName}</span>
                 </div>
                 <div className="text-xs text-gray-500 font-mono">@</div>
                 <div className="flex items-center gap-2 w-5/12 justify-end overflow-hidden">
                    <span className="text-sm font-bold text-white truncate">{homeName}</span>
                    <TeamLogo team={homeName} size="sm" />
                 </div>
               </div>
               
               <div className="space-y-3">
                 {spread.length > 0 && (
                   <div className="grid grid-cols-2 gap-2">
                      {spread.map((outcome, i) => {
                        // TYPE SAFETY FIX HERE
                        const point = outcome.point ?? 0;
                        const pointDisplay = point > 0 ? `+${point}` : `${point}`;
                        
                        return (
                        <button
                          key={`spread-${i}`}
                          onClick={() => handleBet(game.id, outcome.name, outcome.price, 'spread', bookmaker.name)}
                          disabled={selectedBet === `${game.id}-${outcome.name}`}
                          className={`p-2 rounded text-xs font-mono transition-all flex justify-between items-center ${
                            selectedBet === `${game.id}-${outcome.name}` 
                            ? 'bg-green-600 text-white border-green-500' 
                            : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
                          } border`}
                        >
                          <span className="truncate mr-1">{outcome.point !== undefined ? pointDisplay : ''}</span>
                          <span className={selectedBet === `${game.id}-${outcome.name}` ? 'text-white' : 'text-blue-400'}>
                            {outcome.price > 0 ? '+' : ''}{outcome.price}
                          </span>
                        </button>
                      )})}
                   </div>
                 )}
                 
                 {h2h.length > 0 && (
                   <div className="grid grid-cols-2 gap-2">
                      {h2h.map((outcome, i) => (
                        <button
                          key={`ml-${i}`}
                          onClick={() => handleBet(game.id, outcome.name, outcome.price, 'moneyline', bookmaker.name)}
                          disabled={selectedBet === `${game.id}-${outcome.name}`}
                          className={`p-2 rounded text-xs font-mono transition-all text-center border ${
                            selectedBet === `${game.id}-${outcome.name}` 
                            ? 'bg-green-600 text-white border-green-500' 
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 border-white/5'
                          }`}
                        >
                          {outcome.price > 0 ? '+' : ''}{outcome.price}
                        </button>
                      ))}
                   </div>
                 )}
               </div>
               
               <div className="mt-3 pt-2 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">{bookmaker.name}</span>
                  <span className="text-[10px] text-green-500">Live Odds</span>
               </div>
             </div>
           );
        })}
      </div>
    </div>
  );
}
