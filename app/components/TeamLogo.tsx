'use client';

interface TeamLogoProps {
  teamName: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function TeamLogo({ teamName, size = 'md' }: TeamLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-10 h-10 text-lg',
    lg: 'w-16 h-16 text-2xl',
  };

  // Get team emoji/icon based on name
  const getTeamIcon = (name: string): string => {
    const teamIcons: Record<string, string> = {
      // NFL Teams
      'Chiefs': '🔴',
      'Bills': '🔵',
      'Lions': '🦁',
      'Ravens': '🟣',
      '49ers': '🔴',
      'Cowboys': '⭐',
      'Eagles': '🦅',
      'Dolphins': '🐬',
      'Bengals': '🐯',
      'Browns': '🟤',
      'Steelers': '⚫',
      'Packers': '🟢',
      'Vikings': '🟣',
      'Patriots': '🔵',
      'Jets': '🟢',
      'Rams': '🐏',
      'Seahawks': '🦅',
      'Texans': '🔵',
      'Colts': '🐴',
      'Titans': '⚡',
      'Jaguars': '🐆',
      'Broncos': '🐴',
      'Chargers': '⚡',
      'Raiders': '⚫',
      'Saints': '⚜️',
      'Falcons': '🦅',
      'Panthers': '🐆',
      'Buccaneers': '🏴‍☠️',
      'Cardinals': '🔴',
      'Commanders': '🟡',
      'Giants': '🔵',
      
      // NBA Teams
      'Lakers': '💜',
      'Celtics': '🍀',
      'Warriors': '🟡',
      'Nets': '⚫',
      'Knicks': '🟠',
      'Heat': '🔥',
      'Nuggets': '⛰️',
      'Cavaliers': '🍷',
      'Thunder': '⚡',
      '76ers': '🔵',
      'Clippers': '🔴',
      'Suns': '☀️',
      'Mavericks': '🔵',
      'Bucks': '🦌',
      'Grizzlies': '🐻',
    };

    // Try to match team name
    for (const [key, icon] of Object.entries(teamIcons)) {
      if (name.includes(key)) {
        return icon;
      }
    }

    return '🏈'; // Default
  };

  const icon = getTeamIcon(teamName);

  return (
    <div
      className={`${sizeClasses[size]} rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center font-bold border border-white/20`}
      title={teamName}
    >
      {icon}
    </div>
  );
}
