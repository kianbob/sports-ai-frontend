'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface SearchConversationProps {
  messages: Message[];
  onHighlight: (index: number) => void;
}

export default function SearchConversation({ messages, onHighlight }: SearchConversationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<number[]>([]);
  const [currentResultIndex, setCurrentResultIndex] = useState(0);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const matchingIndices: number[] = [];
    messages.forEach((msg, idx) => {
      if (msg.content.toLowerCase().includes(query.toLowerCase())) {
        matchingIndices.push(idx);
      }
    });

    setResults(matchingIndices);
    setCurrentResultIndex(0);
    
    if (matchingIndices.length > 0) {
      onHighlight(matchingIndices[0]);
    }
  };

  const goToNext = () => {
    if (results.length === 0) return;
    const nextIndex = (currentResultIndex + 1) % results.length;
    setCurrentResultIndex(nextIndex);
    onHighlight(results[nextIndex]);
  };

  const goToPrev = () => {
    if (results.length === 0) return;
    const prevIndex = currentResultIndex === 0 ? results.length - 1 : currentResultIndex - 1;
    setCurrentResultIndex(prevIndex);
    onHighlight(results[prevIndex]);
  };

  return (
    <div className="relative">
      {/* Search Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg transition-all"
        title="Search conversation"
      >
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
      </button>

      {/* Search Panel */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-80 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-2xl z-50">
          <div className="flex items-center gap-2 mb-3">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search in conversation..."
              className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              autoFocus
            />
            <button
              onClick={() => {
                setIsOpen(false);
                setSearchQuery('');
                setResults([]);
              }}
              className="p-1 hover:bg-white/10 rounded"
            >
              <XMarkIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {searchQuery && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>
                  {results.length > 0
                    ? `${currentResultIndex + 1} of ${results.length} results`
                    : 'No results found'}
                </span>
                {results.length > 0 && (
                  <div className="flex gap-1">
                    <button
                      onClick={goToPrev}
                      className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-xs"
                    >
                      ↑
                    </button>
                    <button
                      onClick={goToNext}
                      className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-xs"
                    >
                      ↓
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
