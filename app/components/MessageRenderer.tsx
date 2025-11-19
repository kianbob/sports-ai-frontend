'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PlayerProfile from './sports/PlayerProfile';
import PlayerComparison from './sports/PlayerComparison';

interface MessageRendererProps {
  content: string;
}

export default function MessageRenderer({ content }: MessageRendererProps) {
  let playerProfileData = null;
  let playerComparisonData = null;
  
  try {
     // 1. Clean the content string (remove markdown blocks)
     const cleanContent = content.replace(/```json/g, '').replace(/```/g, '').trim();

     // 2. Check for our specific component wrapper
     if (cleanContent.includes("ui_component_request")) {
        // Try to parse the whole thing as JSON first
        const parsed = JSON.parse(cleanContent);
        if (parsed.ui_component_request?.type === 'player_profile') {
            playerProfileData = parsed.ui_component_request.payload;
        } else if (parsed.ui_component_request?.type === 'player_comparison') {
            playerComparisonData = parsed.ui_component_request.payload;
        }
     }
     // 3. Aggressive fallback: Look for the JSON pattern inside text
     // Sometimes the AI says "Here is the JSON: { ... }"
     else {
        const jsonMatch = content.match(/\{[\s\S]*"ui_component_request"[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            if (parsed.ui_component_request?.type === 'player_profile') {
                playerProfileData = parsed.ui_component_request.payload;
            } else if (parsed.ui_component_request?.type === 'player_comparison') {
                playerComparisonData = parsed.ui_component_request.payload;
            }
        }
     }
  } catch (e) {
     // Parsing failed, fall back to text rendering
  }

  if (playerProfileData) return <PlayerProfile data={playerProfileData} />;
  if (playerComparisonData) return <PlayerComparison data={playerComparisonData} />;

  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold text-white mt-6 mb-3">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-semibold text-blue-400 mt-5 mb-2 border-b border-white/10 pb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-semibold text-purple-400 mt-4 mb-2">{children}</h3>,
          p: ({ children }) => <p className="text-gray-300 leading-relaxed my-2 text-base">{children}</p>,
          ul: ({ children }) => <ul className="space-y-2 my-4 bg-white/5 p-4 rounded-xl border border-white/5">{children}</ul>,
          li: ({ children }) => (
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1.5 text-xs">●</span>
              <span className="text-gray-200">{children}</span>
            </li>
          ),
          strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-xl border border-white/10 shadow-lg">
              <table className="w-full border-collapse bg-slate-900/50 text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-white/10 text-white">{children}</thead>,
          th: ({ children }) => <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-xs text-blue-300">{children}</th>,
          tbody: ({ children }) => <tbody className="divide-y divide-white/5">{children}</tbody>,
          tr: ({ children }) => <tr className="hover:bg-white/5 transition-colors">{children}</tr>,
          td: ({ children }) => <td className="px-4 py-3 text-gray-300 whitespace-nowrap">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
