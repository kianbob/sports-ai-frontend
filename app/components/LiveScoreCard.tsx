'use client';

import { useState, useEffect } from 'react';

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

interface LiveScoreCardProps {
  game: Game;
}

export default function LiveScoreCard({ game }: LiveScoreCardProps) {
  const isLive = game.status.toLowerCase().includes('in progress') || 
                 game.status.toLowerCase().includes('halftime');
  const isFinal = game.status.toLowerCase().includes('final');
  
  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-purple-900/40 backdrop-blur-lg rounded-xl border border-white/20 p-4 hover:border-white/40 transition-all">
      {/* Status Badge */}
      <div className="flex justify-between items-center mb-3">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          isLive 
            ? 'bg-red-600 text-white animate-pulse' 
            : isFinal 
            ? 'bg-gray-600 text-gray-200'
            : 'bg-blue-600 text-white'
        }`}>
          {isLive ? '🔴 LIVE' : isFinal ? 'FINAL' : game.status}
        </span>
        <span className="text-xs text-gray-400">
          {new Date(game.date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })}
        </span>
      </div>

      {/* Teams & Scores */}
      <div className="space-y-3">
        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl">
              🏈
            </div>
            <span className="font-semibold text-white">{game.away_team}</span>
          </div>
          <span className="text-3xl font-bold text-white">{game.away_score || '-'}</span>
        </div>

        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl">
              🏈
            </div>
            <span className="font-semibold text-white">{game.home_team}</span>
          </div>
          <span className="text-3xl font-bold text-white">{game.home_score || '-'}</span>
        </div>
      </div>

      {/* Venue */}
      {game.venue && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-xs text-gray-400">📍 {game.venue}</p>
        </div>
      )}
    </div>
  );
}
