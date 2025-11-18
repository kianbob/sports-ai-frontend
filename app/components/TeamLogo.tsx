'use client';
import { useState } from 'react';

interface TeamLogoProps {
  team: string;
  size?: 'sm' | 'md' | 'lg';
  sport?: 'nfl' | 'nba';
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16'
};

export default function TeamLogo({ team, size = 'md', sport = 'nfl' }: TeamLogoProps) {
  const [error, setError] = useState(false);

  const getTeamAbbr = (teamName: string) => {
    // Simple mapping (expand as needed)
    if (teamName.includes('Chiefs')) return 'KC';
    if (teamName.includes('Eagles')) return 'PHI';
    if (teamName.includes('Bills')) return 'BUF';
    if (teamName.includes('Lions')) return 'DET';
    if (teamName.includes('49ers')) return 'SF';
    if (teamName.includes('Ravens')) return 'BAL';
    return 'NFL'; // Default
  };

  const abbr = getTeamAbbr(team);
  const logoUrl = `https://a.espncdn.com/i/teamlogos/${sport}/500/${abbr}.png`;

  if (error) {
    return <span className="text-xl">🏈</span>;
  }

  return (
    <div className={`${sizeClasses[size]} relative flex-shrink-0`}>
      <img
        src={logoUrl}
        alt={team}
        className="w-full h-full object-contain"
        onError={() => setError(true)}
      />
    </div>
  );
}
