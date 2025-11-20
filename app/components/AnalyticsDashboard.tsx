'use client';
import { useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { ChartBarIcon, ClockIcon, ChatBubbleLeftIcon, FireIcon } from '@heroicons/react/24/solid';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface OverviewStats {
  total_conversations: number;
  total_messages: number;
  user_messages: number;
  assistant_messages: number;
  avg_response_time_ms: number;
  avg_messages_per_conversation: number;
  last_24h_conversations: number;
  last_24h_messages: number;
}

interface PopularQuery {
  query: string;
  count: number;
}

interface ResponseTimeDistribution {
  fast_responses: number;
  medium_responses: number;
  slow_responses: number;
}

interface ActivityData {
  date: string;
  conversations: number;
  messages: number;
}

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [popularQueries, setPopularQueries] = useState<PopularQuery[]>([]);
  const [responseTimes, setResponseTimes] = useState<ResponseTimeDistribution | null>(null);
  const [activityTimeline, setActivityTimeline] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Use simple Promise.all to fetch data in parallel
        const [overviewRes, queriesRes, timesRes, timelineRes] = await Promise.all([
          axios.get(`${API_URL}/analytics/overview`).catch(() => ({ data: null })),
          axios.get(`${API_URL}/analytics/popular-queries?limit=5`).catch(() => ({ data: [] })),
          axios.get(`${API_URL}/analytics/response-times`).catch(() => ({ data: null })),
          axios.get(`${API_URL}/analytics/activity-timeline?days=7`).catch(() => ({ data: [] })),
        ]);
        
        if (overviewRes.data) setStats(overviewRes.data);
        if (queriesRes.data) setPopularQueries(queriesRes.data);
        if (timesRes.data) setResponseTimes(timesRes.data);
        if (timelineRes.data) setActivityTimeline(timelineRes.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-white text-xl font-semibold">Loading Dashboard...</div>
        </div>
      </div>
    );
  }

  const responseTimeData = [
    { name: 'Fast (<3s)', value: responseTimes?.fast_responses || 0, fill: '#22c55e' },
    { name: 'Medium (3-10s)', value: responseTimes?.medium_responses || 0, fill: '#eab308' },
    { name: 'Slow (>10s)', value: responseTimes?.slow_responses || 0, fill: '#ef4444' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">📊 Analytics Dashboard</h1>
        <p className="text-gray-400 mb-8">Real-time performance metrics</p>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Conversations" value={stats.total_conversations} icon={<ChatBubbleLeftIcon className="w-6 h-6 text-blue-400"/>} color="blue" subtitle={`+${stats.last_24h_conversations} last 24h`} />
          <StatCard title="Total Messages" value={stats.total_messages} icon={<ChartBarIcon className="w-6 h-6 text-purple-400"/>} color="purple" subtitle={`+${stats.last_24h_messages} last 24h`} />
          <StatCard title="Avg Response Time" value={`${(stats.avg_response_time_ms / 1000).toFixed(1)}s`} icon={<ClockIcon className="w-6 h-6 text-green-400"/>} color="green" subtitle="Target: <3.0s" />
          <StatCard title="Avg Messages/Chat" value={stats.avg_messages_per_conversation} icon={<FireIcon className="w-6 h-6 text-orange-400"/>} color="orange" subtitle="Engagement Score" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Activity Timeline */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-bold text-white mb-6">User Activity (7 Days)</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activityTimeline}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="date" stroke="#94a3b8" tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, {weekday:'short'})} />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px'}} />
                        <Line type="monotone" dataKey="messages" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4}} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
          </div>

          {/* Response Times */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
             <h3 className="text-xl font-bold text-white mb-6">Performance Distribution</h3>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={responseTimeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px'}} />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Define types for StatCard props to fix build error
interface StatCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    color: 'blue' | 'purple' | 'green' | 'orange';
    subtitle: string;
}

function StatCard({ title, value, icon, color, subtitle }: StatCardProps) {
    const colors = {
        blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
        purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
        green: 'bg-green-500/10 border-green-500/20 text-green-400',
        orange: 'bg-orange-500/10 border-orange-500/20 text-orange-400'
    };
    return (
        <div className={`p-6 rounded-2xl border ${colors[color]} backdrop-blur-sm`}>
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-sm font-medium opacity-90 mb-1">{title}</div>
            <div className="text-xs opacity-60">{subtitle}</div>
        </div>
    );
}
