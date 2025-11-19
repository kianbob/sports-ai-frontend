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
     // 1. Remove Markdown Code Blocks
     let cleanContent = content.replace(/```json/g, '').replace(/```/g, '').trim();
     
     // 2. Locate JSON start/end indices if mixed with text
     const startIndex = cleanContent.indexOf('{');
     const endIndex = cleanContent.lastIndexOf('}');
     
     if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        // Extract just the JSON part
        cleanContent = cleanContent.substring(startIndex, endIndex + 1);
     }

     // 3. Parse
     if (cleanContent.includes("ui_component_request")) {
        const parsed = JSON.parse(cleanContent);
        
        // Handle direct component request
        if (parsed.ui_component_request) {
            componentType = parsed.ui_component_request.type;
            componentData = parsed.ui_component_request.payload;
        }
        // Handle direct type/data structure (legacy)
        else if (parsed.component) {
            componentType = parsed.component;
            componentData = parsed.data;
        }
     }
  } catch (e) {
     // If parsing fails, render as text
     console.log("Rendering as text (not a component)");
  }

  // Render Components
  if (componentType === 'player_profile') return <PlayerProfile data={componentData} />;
  if (componentType === 'player_comparison') return <PlayerComparison data={componentData} />;
  if (componentType === 'injury_report') return <InjuryReport data={componentData} />;
  if (componentType === 'betting_odds') return <BettingOdds data={componentData} />;

  // Default: Render Markdown
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({node, ...props}) => (
            <div className="overflow-x-auto my-4 rounded-lg border border-white/10">
              <table className="min-w-full divide-y divide-white/10 bg-white/5" {...props} />
            </div>
          ),
          th: ({node, ...props}) => <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider" {...props} />,
          td: ({node, ...props}) => <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-200" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
