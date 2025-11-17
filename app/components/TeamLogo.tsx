'use client';

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
  // Use ESPN's logo API
  const getTeamAbbr = (teamName: string) => {
    const abbrs: { [key: string]: string } = {
      // NFL Teams
      'Chiefs': 'KC', 'Bills': 'BUF', 'Patriots': 'NE', 'Dolphins': 'MIA',
      'Ravens': 'BAL', 'Steelers': 'PIT', 'Bengals': 'CIN', 'Browns': 'CLE',
      'Titans': 'TEN', 'Colts': 'IND', 'Texans': 'HOU', 'Jaguars': 'JAX',
      'Broncos': 'DEN', 'Raiders': 'LV', 'Chargers': 'LAC', 'Chiefs': 'KC',
      'Cowboys': 'DAL', 'Eagles': 'PHI', 'Giants': 'NYG', 'Commanders': 'WAS',
      'Packers': 'GB', 'Bears': 'CHI', 'Lions': 'DET', 'Vikings': 'MIN',
      'Buccaneers': 'TB', 'Saints': 'NO', 'Panthers': 'CAR', 'Falcons': 'ATL',
      '49ers': 'SF', 'Rams': 'LAR', 'Seahawks': 'SEA', 'Cardinals': 'ARI',
      // NBA Teams
      'Lakers': 'LAL', 'Celtics': 'BOS', 'Warriors': 'GSW', 'Heat': 'MIA',
      'Nets': 'BKN', 'Knicks': 'NYK', 'Bucks': 'MIL', 'Suns': 'PHX',
      'Nuggets': 'DEN', 'Clippers': 'LAC', 'Mavericks': 'DAL', 'Jazz': 'UTA',
    };
    
    // Try to match team name
    for (const [name, abbr] of Object.entries(abbrs)) {
      if (teamName.includes(name)) return abbr;
    }
    return 'NFL';
  };

  const abbr = getTeamAbbr(team);
  const logoUrl = sport === 'nfl' 
    ? `https://a.espncdn.com/i/teamlogos/nfl/500/${abbr}.png`
    : `https://a.espncdn.com/i/teamlogos/nba/500/${abbr}.png`;

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <img
        src={logoUrl}
        alt={`${team} logo`}
        className="w-full h-full object-contain"
        onError={(e) => {
          // Fallback to placeholder if logo fails
          e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%236366f1"/></svg>';
        }}
      />
    </div>
  );
}
