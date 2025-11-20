'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Bet {
  id: number;
  bet_type: string;
  bet_amount: number;
  odds: number;
  won: boolean | null;
  placed_at: string;
  extra_data: {
    selection: string;
    game_id: string;
    sportsbook: string;
  };
}

export default function BetHistory() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bets/demo-user`);
        setBets(res.data);
      } catch (e) {
        console.error("Failed to load bets", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBets();
  }, []);

  if (loading) return <div className="text-center p-10 text-white">Loading your history...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        📊 My Action <span className="text-sm font-normal text-gray-400 bg-white/10 px-3 py-1 rounded-full">{bets.length} Bets</span>
      </h1>

      {bets.length === 0 ? (
        <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
          <div className="text-4xl mb-4">🎫</div>
          <h3 className="text-xl font-bold text-white">No bets placed yet</h3>
          <p className="text-gray-400 mt-2">Ask the AI for "NFL Odds" to start finding value!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bets.map((bet) => (
            <div key={bet.id} className="bg-slate-800/50 border border-white/10 p-4 rounded-xl flex items-center justify-between hover:border-blue-500/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${bet.bet_type === 'spread' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                  {bet.bet_type === 'spread' ? '↔️' : '💰'}
                </div>
                <div>
                  <div className="font-bold text-white text-lg">{bet.extra_data.selection}</div>
                  <div className="text-sm text-gray-400 flex gap-2">
                    <span className="uppercase font-mono">{bet.bet_type}</span>
                    <span>•</span>
                    <span>{bet.extra_data.sportsbook || 'Sportsbook'}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-white text-xl">{bet.odds > 0 ? `+${bet.odds}` : bet.odds}</div>
                <div className="text-sm text-gray-400">${bet.bet_amount} Risk</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
