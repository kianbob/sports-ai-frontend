'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PlayerProfile from './sports/PlayerProfile';
import PlayerComparison from './sports/PlayerComparison';
import InjuryReport from './sports/InjuryReport';
import BettingOdds from './BettingOdds';

interface MessageRendererProps {
  content: string;
}

export default function MessageRenderer({ content }: MessageRendererProps) {
  let componentData = null;
  let componentType = null;
  
  try {
     const cleanContent = content.replace(/```json/g, '').replace(/```/g, '').trim();
     if (cleanContent.includes("ui_component_request")) {
        const jsonMatch = cleanContent.match(/\{[\s\S]*"ui_component_request"[\s\S]*\}/);
        const jsonStr = jsonMatch ? jsonMatch[0] : cleanContent;
        const parsed = JSON.parse(jsonStr);
        
        if (parsed.ui_component_request) {
            componentType = parsed.ui_component_request.type;
            componentData = parsed.ui_component_request.payload;
        }
     }
  } catch (e) {}

  if (componentType === 'player_profile') return <PlayerProfile data={componentData} />;
  if (componentType === 'player_comparison') return <PlayerComparison data={componentData} />;
  if (componentType === 'injury_report') return <InjuryReport data={componentData} />;
  if (componentType === 'betting_odds') return <BettingOdds data={componentData} />;

  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
