'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
// Ensure all icons are imported
import { PaperAirplaneIcon, TrashIcon, ChartBarIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import MessageRenderer from './MessageRenderer';
import QuickActions from './QuickActions';
import MessageActions from './MessageActions';
import ConversationHistory from './ConversationHistory';
import SearchConversation from './SearchConversation';
import LiveScoreTicker from './LiveScoreTicker';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => { setSessionId(uuidv4()); }, []);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: textToSend, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/chat/`, { message: textToSend, session_id: sessionId });
      const assistantMessage: Message = { role: 'assistant', content: response.data.message, timestamp: new Date() };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error.', timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (query: string) => { setInput(query); sendMessage(query); };
  const clearChat = () => { setMessages([]); setSessionId(uuidv4()); };
  const handleSelectConversation = (id: string) => { console.log(id); };
  const handleHighlight = (index: number) => {
    setHighlightedIndex(index);
    messageRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => setHighlightedIndex(null), 2000);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ConversationHistory onSelectConversation={handleSelectConversation} />

      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="bg-black/30 backdrop-blur-lg border-b border-white/10 p-4 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">🏈 Sports AI</h1>
            </div>
            <div className="flex gap-2">
              <SearchConversation messages={messages} onHighlight={handleHighlight} />
              
              {/* ANALYTICS BUTTON */}
              <Link href="/analytics" className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg flex items-center gap-2 transition-colors">
                <ChartBarIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Analytics</span>
              </Link>

              {/* MY BETS BUTTON (NEW) */}
              <Link href="/profile" className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg flex items-center gap-2 transition-colors">
                <UserCircleIcon className="w-5 h-5" />
                <span className="hidden sm:inline">My Bets</span>
              </Link>

              <button onClick={clearChat} className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors">
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <LiveScoreTicker />

        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <h2 className="text-3xl font-bold text-white mb-4">How can I help? 🏀</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto mb-6">
                    {['Show me NFL odds', 'Show me Patrick Mahomes profile', 'Show me Chiefs injuries', 'Compare Chiefs and Bills'].map((s, i) => (
                        <button key={i} onClick={() => { setInput(s); sendMessage(s); }} className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left text-gray-300 transition-colors">
                            {s}
                        </button>
                    ))}
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} ref={(el) => { if (el) messageRefs.current[idx] = el; }} className={`transition-all duration-300 ${highlightedIndex === idx ? 'ring-2 ring-yellow-400 rounded-2xl' : ''}`}>
                <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-5 py-4 ${msg.role === 'user' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-white/10 backdrop-blur-lg text-gray-100 border border-white/10'}`}>
                    {msg.role === 'assistant' ? (
                      <>
                        <MessageRenderer content={msg.content} />
                        <MessageActions content={msg.content} />
                      </>
                    ) : (
                      <p className="text-white">{msg.content}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {loading && <div className="text-gray-400 text-sm ml-4">Thinking...</div>}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="bg-black/30 backdrop-blur-lg border-t border-white/10 p-4 sticky bottom-0">
          <div className="max-w-4xl mx-auto flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="Ask about stats, odds, or injuries..." className="flex-1 bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={loading} />
            <button onClick={() => sendMessage()} disabled={loading || !input.trim()} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold">
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
