'use client';

import { useState } from 'react';
import { ClockIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
  messageCount: number;
}

interface ConversationHistoryProps {
  onSelectConversation: (id: string) => void;
}

export default function ConversationHistory({ onSelectConversation }: ConversationHistoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'NFL Standings Discussion',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      messageCount: 8,
    },
    {
      id: '2',
      title: 'Chiefs vs Lions Comparison',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      messageCount: 5,
    },
    {
      id: '3',
      title: 'NBA Playoff Predictions',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      messageCount: 12,
    },
  ]);

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-20 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/10 rounded-xl transition-all"
        title="Conversation history"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6 text-white" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-black/40 backdrop-blur-xl border-r border-white/10 z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <ClockIcon className="w-6 h-6" />
            History
          </h2>

          <div className="space-y-3">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => {
                  onSelectConversation(conv.id);
                  setIsOpen(false);
                }}
                className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-left group"
              >
                <h3 className="text-white font-semibold mb-2 truncate">
                  {conv.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{formatTimestamp(conv.timestamp)}</span>
                  <span>{conv.messageCount} messages</span>
                </div>
              </button>
            ))}
          </div>

          {conversations.length === 0 && (
            <p className="text-gray-400 text-center py-8">No conversations yet</p>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
