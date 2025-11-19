'use client';
import { useState } from 'react';

interface TeamLogoProps {
  team: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  sport?: 'nfl' | 'nba';
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
};

// Helper to get team metadata (Abbr + Color)
export const getTeamMeta = (teamName: string) => {
  // Default Purple/Blue theme
  const defaultMeta = { abbr: 'NFL', color: 'from-slate-900 to-slate-800', accent: 'text-blue-400' };
  
  if (!teamName) return defaultMeta;
  const name = teamName.toLowerCase();

  // NFL Teams Map
  if (name.includes('chiefs')) return { abbr: 'KC', color: 'from-red-900 to-slate-900', accent: 'text-red-400' };
  if (name.includes('eagles')) return { abbr: 'PHI', color: 'from-cyan-900 to-slate-900', accent: 'text-cyan-400' };
  if (name.includes('bills')) return { abbr: 'BUF', color: 'from-blue-900 to-slate-900', accent: 'text-blue-400' };
  if (name.includes('lions')) return { abbr: 'DET', color: 'from-blue-800 to-slate-800', accent: 'text-blue-400' };
  if (name.includes('49ers')) return { abbr: 'SF', color: 'from-red-950 to-slate-900', accent: 'text-red-500' };
  if (name.includes('ravens')) return { abbr: 'BAL', color: 'from-violet-900 to-slate-900', accent: 'text-violet-400' };
  if (name.includes('cowboys')) return { abbr: 'DAL', color: 'from-blue-950 to-slate-900', accent: 'text-blue-300' };
  if (name.includes('packers')) return { abbr: 'GB', color: 'from-green-900 to-slate-900', accent: 'text-green-400' };
  if (name.includes('vikings')) return { abbr: 'MIN', color: 'from-purple-900 to-slate-900', accent: 'text-purple-400' };
  if (name.includes('bears')) return { abbr: 'CHI', color: 'from-orange-900 to-slate-900', accent: 'text-orange-400' };
  
  // NBA Teams Map (Simplified)
  if (name.includes('lakers')) return { abbr: 'LAL', color: 'from-yellow-900 to-purple-900', accent: 'text-yellow-400' };
  if (name.includes('celtics')) return { abbr: 'BOS', color: 'from-green-900 to-slate-900', accent: 'text-green-400' };
  if (name.includes('warriors')) return { abbr: 'GSW', color: 'from-blue-900 to-yellow-900', accent: 'text-yellow-400' };
  
  return defaultMeta;
};

export default function TeamLogo({ team, size = 'md', sport = 'nfl', className = '' }: TeamLogoProps) {
  const [error, setError] = useState(false);
  const { abbr } = getTeamMeta(team);
  
  const logoUrl = `https://a.espncdn.com/i/teamlogos/${sport}/500/${abbr}.png`;

  if (error) {
    return <span className={`flex items-center justify-center bg-white/10 rounded-full ${sizeClasses[size]} ${className}`}>🏈</span>;
  }

  return (
    <div className={`${sizeClasses[size]} relative flex-shrink-0 ${className}`}>
      <img
        src={logoUrl}
        alt={team}
        className="w-full h-full object-contain drop-shadow-md"
        onError={() => setError(true)}
      />
    </div>
  );
}
