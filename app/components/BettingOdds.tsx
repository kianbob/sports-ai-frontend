'use client';
import { useState } from 'react';
import TeamLogo from './TeamLogo';
import axios from 'axios';

interface GameOdds {
  id: string;
  home_team?: string;
  homeTeam?: string;
  away_team?: string;
  awayTeam?: string;
  bookmakers: any[];
}

export default function BettingOdds({ data }: { data: { games: GameOdds[] } }) {
  const [selectedBet, setSelectedBet] = useState<string | null>(null);
  const games = data.games || [];

  const handleBet = async (gameId: string, selection: string, odds: number) => {
    setSelectedBet(`${gameId}-${selection}`);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/bets/`, {
        game_id: gameId, selection, odds, stake: 100, bet_type: 'moneyline', sportsbook: 'Demo'
      });
      alert(`✅ Bet Placed on ${selection}! Check "My Bets" to see it.`);
    } catch (e) { console.error(e); }
    setTimeout(() => setSelectedBet(null), 2000);
  };

  if (!games.length) return <div className="p-4 text-center text-gray-400">No odds available.</div>;

  return (
    <div className="space-y-4 my-6">
      <h2 className="text-2xl font-bold text-white">🎲 Betting Odds</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {games.slice(0, 6).map((game) => {
           const hTeam = game.home_team || game.homeTeam || "Home";
           const aTeam = game.away_team || game.awayTeam || "Away";
           const bookmaker = game.bookmakers?.[0];
           const h2h = bookmaker?.markets?.find((m: any) => m.key === 'h2h')?.outcomes || [];
           
           return (
             <div key={game.id} className="bg-slate-800/50 rounded-xl p-4 border border-white/10">
               <div className="flex justify-between mb-4">
                 <div className="flex gap-2 items-center"><TeamLogo team={aTeam} size="sm" /> {aTeam}</div>
                 <div className="flex gap-2 items-center">{hTeam} <TeamLogo team={hTeam} size="sm" /></div>
               </div>
               <div className="grid grid-cols-2 gap-2">
                  {h2h.map((outcome: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => handleBet(game.id, outcome.name, outcome.price)}
                      className={`p-2 rounded text-center border ${selectedBet === `${game.id}-${outcome.name}` ? 'bg-green-600 border-green-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                    >
                      {outcome.name} ({outcome.price})
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
