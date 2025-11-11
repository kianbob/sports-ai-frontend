'use client';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
  context?: string;
}

export default function QuickActions({ onActionClick, context }: QuickActionsProps) {
  const actions = getContextualActions(context);

  if (actions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {actions.map((action, idx) => (
        <button
          key={idx}
          onClick={() => onActionClick(action.query)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-500/30 rounded-lg text-sm text-blue-300 transition-all flex items-center gap-2"
        >
          <span>{action.icon}</span>
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
}

function getContextualActions(context?: string): Array<{ label: string; icon: string; query: string }> {
  if (!context) return [];

  const lowerContext = context.toLowerCase();

  // If talking about standings
  if (lowerContext.includes('standing') || lowerContext.includes('record')) {
    return [
      { label: 'Show Schedule', icon: '📅', query: 'Show me the NFL schedule' },
      { label: 'Top Teams', icon: '🏆', query: 'Who are the top 5 teams?' },
      { label: 'Division Leaders', icon: '👑', query: 'Show division leaders' },
    ];
  }

  // If talking about a specific team
  const teams = ['Chiefs', 'Bills', '49ers', 'Cowboys', 'Eagles', 'Lions', 'Ravens', 'Dolphins'];
  const mentionedTeam = teams.find(team => lowerContext.includes(team.toLowerCase()));
  
  if (mentionedTeam) {
    return [
      { label: `${mentionedTeam} Schedule`, icon: '📅', query: `Show me ${mentionedTeam} schedule` },
      { label: 'Compare Teams', icon: '⚔️', query: `Compare ${mentionedTeam} to another team` },
      { label: 'Team Stats', icon: '📊', query: `Show me ${mentionedTeam} detailed stats` },
    ];
  }

  // If talking about today's scores
  if (lowerContext.includes('today') || lowerContext.includes('score')) {
    return [
      { label: 'Full Schedule', icon: '📅', query: 'Show me this week\'s NFL schedule' },
      { label: 'Standings', icon: '📊', query: 'Show me NFL standings' },
      { label: 'Latest News', icon: '📰', query: 'What\'s the latest NFL news?' },
    ];
  }

  // Default actions
  return [
    { label: 'Standings', icon: '📊', query: 'Show me NFL standings' },
    { label: 'Today\'s Scores', icon: '🏈', query: 'What are today\'s NFL scores?' },
    { label: 'Latest News', icon: '📰', query: 'What\'s the latest NFL news?' },
  ];
}
