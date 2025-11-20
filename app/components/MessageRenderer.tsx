'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PlayerProfile from './sports/PlayerProfile';
import PlayerComparison from './sports/PlayerComparison';
import InjuryReport from './sports/InjuryReport';
import BettingOdds from './BettingOdds';
import TeamComparison from './TeamComparison';

interface MessageRendererProps {
  content: string;
}

export default function MessageRenderer({ content }: MessageRendererProps) {
  let componentData = null;
  let componentType = null;
  
  try {
     // Clean cleanup
     let cleanContent = content.replace(/```json/g, '').replace(/```/g, '').trim();
     // Fix common JSON errors (single quotes)
     cleanContent = cleanContent.replace(/'/g, '"'); 
     
     const jsonMatch = cleanContent.match(/\{[\s\S]*"ui_component_request"[\s\S]*\}/);
     const jsonStr = jsonMatch ? jsonMatch[0] : cleanContent;
     
     const parsed = JSON.parse(jsonStr);
     if (parsed.ui_component_request) {
        componentType = parsed.ui_component_request.type;
        componentData = parsed.ui_component_request.payload;
     } else if (parsed.error) {
         return <div className="p-4 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20">⚠️ {parsed.error}</div>;
     }
  } catch (e) {}

  if (componentType === 'player_profile') return <PlayerProfile data={componentData} />;
  if (componentType === 'player_comparison') return <PlayerComparison data={componentData} />;
  if (componentType === 'injury_report') return <InjuryReport data={componentData} />;
  if (componentType === 'betting_odds') return <BettingOdds data={componentData} />;
  if (componentType === 'team_comparison') return <TeamComparison team1={componentData.team1} team2={componentData.team2} />;
  
  if (componentType === 'error') {
      return <div className="p-4 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20">⚠️ {componentData.message}</div>;
  }

  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
