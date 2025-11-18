'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PlayerProfile from './sports/PlayerProfile';

interface MessageRendererProps {
  content: string;
}

export default function MessageRenderer({ content }: MessageRendererProps) {
  let playerProfileData = null;
  
  try {
     if (content.includes("'component': 'player_profile'") || content.includes('"component": "player_profile"')) {
        const jsonStr = content.replace(/'/g, '"').trim(); 
        const parsed = JSON.parse(jsonStr);
        if (parsed.component === 'player_profile') {
            playerProfileData = parsed.data;
        }
     }
  } catch (e) { }

  if (playerProfileData) {
     return <PlayerProfile data={playerProfileData} />;
  }

  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold text-white mt-4 mb-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-semibold text-blue-400 mt-3 mb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-semibold text-purple-400 mt-2 mb-1">{children}</h3>,
          p: ({ children }) => <p className="text-gray-200 leading-relaxed my-2">{children}</p>,
          ul: ({ children }) => <ul className="space-y-2 ml-4 my-3">{children}</ul>,
          li: ({ children }) => (
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span className="text-gray-200">{children}</span>
            </li>
          ),
          strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse bg-black/20 rounded-lg overflow-hidden">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-gradient-to-r from-blue-600/30 to-purple-600/30">{children}</thead>,
          th: ({ children }) => <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider border-b border-white/10">{children}</th>,
          tbody: ({ children }) => <tbody className="divide-y divide-white/5">{children}</tbody>,
          tr: ({ children }) => <tr className="hover:bg-white/5 transition-colors">{children}</tr>,
          td: ({ children }) => <td className="px-4 py-3 text-sm text-gray-200">{children}</td>,
          code: ({ children, className }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-blue-600/20 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
            ) : (
              <code className="block bg-black/40 text-gray-300 p-4 rounded-lg overflow-x-auto font-mono text-sm my-3">{children}</code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-3 bg-blue-600/10 rounded-r-lg">
              <div className="text-gray-300 italic">{children}</div>
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
