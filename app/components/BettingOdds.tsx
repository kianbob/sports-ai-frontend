'use client';

import { useState, useEffect } from 'react';
import TeamLogo from './TeamLogo';

interface GameOdds {
  id: string;
  sport: string;
  homeTeam: string;
  awayTeam: string;
  commenceTime: string;
  bookmakers: {
    name: string;
    markets: {
      key: string;
      outcomes: {
        name: string;
        price: number;
        point?: number;
      }[];
    }[];
  }[];
}

interface BettingOddsProps {
  games: GameOdds[];
}

export default function BettingOdds({ games }: BettingOddsProps) {
  if (games.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg rounded-2xl border border-white/20 p-6 text-center">
        <p className="text-gray-400">No betting odds available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 my-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        🎲 Betting Odds
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {games.map((game) => (
          <GameOddsCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

function GameOddsCard({ game }: { game: GameOdds }) {
  const mainBookmaker = game.bookmakers[0];
  const spreadMarket = mainBookmaker?.markets.find((m) => m.key === 'spreads');
  const totalsMarket = mainBookmaker?.markets.find((m) => m.key === 'totals');
  const h2hMarket = mainBookmaker?.markets.find((m) => m.key === 'h2h');

  const gameDate = new Date(game.commenceTime);
  const formattedDate = gameDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = gameDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg rounded-xl border border-white/20 p-5">
      {/* Game Info */}
      <div className="mb-4">
        <div className="text-xs text-gray-400 mb-2">
          {formattedDate} • {formattedTime}
        </div>
        
        {/* Teams */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TeamLogo teamName={game.awayTeam} size="sm" />
              <span className="text-white font-semibold">{game.awayTeam}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TeamLogo teamName={game.homeTeam} size="sm" />
              <span className="text-white font-semibold">{game.homeTeam}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Odds Grid */}
      <div className="grid grid-cols-3 gap-3 text-center">
        {/* Spread */}
        <div className="bg-black/20 rounded-lg p-3">
          <div className="text-xs text-gray-400 uppercase mb-2">Spread</div>
          {spreadMarket ? (
            <div className="space-y-1">
              {spreadMarket.outcomes.map((outcome, idx) => (
                <div key={idx} className="text-sm">
                  <span className="text-blue-400 font-mono">
                    {outcome.point && outcome.point > 0 ? '+' : ''}
                    {outcome.point}
                  </span>
                  <span className="text-gray-500 mx-1">@</span>
                  <span className="text-white font-semibold">
                    {outcome.price > 0 ? '+' : ''}
                    {outcome.price}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-gray-500 text-sm">N/A</span>
          )}
        </div>

        {/* Total */}
        <div className="bg-black/20 rounded-lg p-3">
          <div className="text-xs text-gray-400 uppercase mb-2">Total</div>
          {totalsMarket ? (
            <div className="space-y-1">
              {totalsMarket.outcomes.map((outcome, idx) => (
                <div key={idx} className="text-sm">
                  <span className="text-purple-400 font-mono">
                    {outcome.name} {outcome.point}
                  </span>
                  <span className="text-gray-500 mx-1">@</span>
                  <span className="text-white font-semibold">
                    {outcome.price > 0 ? '+' : ''}
                    {outcome.price}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-gray-500 text-sm">N/A</span>
          )}
        </div>

        {/* Moneyline */}
        <div className="bg-black/20 rounded-lg p-3">
          <div className="text-xs text-gray-400 uppercase mb-2">Moneyline</div>
          {h2hMarket ? (
            <div className="space-y-1">
              {h2hMarket.outcomes.map((outcome, idx) => (
                <div key={idx} className="text-sm">
                  <span className="text-green-400 font-mono font-semibold">
                    {outcome.price > 0 ? '+' : ''}
                    {outcome.price}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-gray-500 text-sm">N/A</span>
          )}
        </div>
      </div>

      {/* Bookmaker */}
      {mainBookmaker && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="text-xs text-gray-400 text-center">
            Odds from {mainBookmaker.name}
          </div>
        </div>
      )}
    </div>
  );
}
