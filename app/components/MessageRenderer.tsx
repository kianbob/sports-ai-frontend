'use client';

import ReactMarkdown from 'react-markdown';

interface MessageRendererProps {
  content: string;
}

export default function MessageRenderer({ content }: MessageRendererProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        components={{
          code({ className, children, ...props }: any) {
            const isInline = !className;
            return (
              <code 
                className={`${className || ''} bg-gray-800 px-2 py-1 rounded text-sm ${!isInline ? 'block p-4 my-2' : ''}`} 
                {...props}
              >
                {children}
              </code>
            );
          },
          table({ children }: any) {
            return (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full divide-y divide-gray-700">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }: any) {
            return <thead className="bg-gray-800">{children}</thead>;
          },
          th({ children }: any) {
            return (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                {children}
              </th>
            );
          },
          td({ children }: any) {
            return (
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                {children}
              </td>
            );
          },
          tr({ children }: any) {
            return (
              <tr className="hover:bg-gray-800/50 transition-colors">
                {children}
              </tr>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
