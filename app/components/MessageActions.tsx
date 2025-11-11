'use client';

import { useState } from 'react';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';

interface MessageActionsProps {
  content: string;
}

export default function MessageActions({ content }: MessageActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-gray-300 transition-colors"
        title="Copy message"
      >
        {copied ? (
          <>
            <CheckIcon className="w-4 h-4" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <ClipboardDocumentIcon className="w-4 h-4" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
