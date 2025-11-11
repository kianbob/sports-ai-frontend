'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ChartBarIcon, ClockIcon, ChatBubbleLeftIcon, FireIcon } from '@heroicons/react/24/solid';

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
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const [overviewRes, queriesRes, timesRes, timelineRes] = await Promise.all([
        axios.get(`${API_URL}/analytics/overview`),
        axios.get(`${API_URL}/analytics/popular-queries?limit=5`),
        axios.get(`${API_URL}/analytics/response-times`),
        axios.get(`${API_URL}/analytics/activity-timeline?days=7`),
      ]);

      setStats(overviewRes.data);
      setPopularQueries(queriesRes.data);
      setResponseTimes(timesRes.data);
      setActivityTimeline(timelineRes.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl">Loading analytics...</div>
      </div>
    );
  }

  const totalResponses = responseTimes
    ? responseTimes.fast_responses + responseTimes.medium_responses + responseTimes.slow_responses
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">📊 Analytics Dashboard</h1>
          <p className="text-gray-400">Monitor your Sports AI Assistant usage and performance</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Conversations"
            value={stats.total_conversations}
            icon={<ChatBubbleLeftIcon className="w-8 h-8" />}
            subtitle={`${stats.last_24h_conversations} in last 24h`}
            color="blue"
          />
          <StatCard
            title="Total Messages"
            value={stats.total_messages}
            icon={<ChartBarIcon className="w-8 h-8" />}
            subtitle={`${stats.last_24h_messages} in last 24h`}
            color="purple"
          />
          <StatCard
            title="Avg Response Time"
            value={`${(stats.avg_response_time_ms / 1000).toFixed(1)}s`}
            icon={<ClockIcon className="w-8 h-8" />}
            subtitle="Time to respond"
            color="green"
          />
          <StatCard
            title="Avg Conv Length"
            value={stats.avg_messages_per_conversation}
            icon={<FireIcon className="w-8 h-8" />}
            subtitle="Messages per chat"
            color="orange"
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Popular Queries */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">🔥 Popular Queries</h2>
            <div className="space-y-3">
              {popularQueries.length > 0 ? (
                popularQueries.map((query, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <span className="text-gray-200 flex-1 truncate">{query.query}</span>
                    <span className="ml-4 px-3 py-1 bg-blue-600/30 text-blue-400 rounded-full text-sm font-semibold">
                      {query.count}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-8">No queries yet</p>
              )}
            </div>
          </div>

          {/* Response Time Distribution */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">⚡ Response Times</h2>
            <div className="space-y-4">
              <ResponseTimeBar
                label="Fast (< 3s)"
                count={responseTimes?.fast_responses || 0}
                total={totalResponses}
                color="green"
              />
              <ResponseTimeBar
                label="Medium (3-10s)"
                count={responseTimes?.medium_responses || 0}
                total={totalResponses}
                color="yellow"
              />
              <ResponseTimeBar
                label="Slow (> 10s)"
                count={responseTimes?.slow_responses || 0}
                total={totalResponses}
                color="red"
              />
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">📈 Activity (Last 7 Days)</h2>
          <div className="flex items-end justify-between gap-2 h-64">
            {activityTimeline.map((day, idx) => {
              const maxValue = Math.max(...activityTimeline.map((d) => d.messages));
              const height = maxValue > 0 ? (day.messages / maxValue) * 100 : 0;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center justify-end flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg transition-all hover:from-blue-500 hover:to-purple-500"
                      style={{ height: `${height}%`, minHeight: day.messages > 0 ? '8px' : '0' }}
                      title={`${day.messages} messages`}
                    />
                  </div>
                  <div className="text-xs text-gray-400 text-center">
                    {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="text-sm font-semibold text-white">{day.messages}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle: string;
  color: 'blue' | 'purple' | 'green' | 'orange';
}

function StatCard({ title, value, icon, subtitle, color }: StatCardProps) {
  const colorClasses = {
    blue: 'from-blue-600/20 to-blue-600/5 border-blue-500/30 text-blue-400',
    purple: 'from-purple-600/20 to-purple-600/5 border-purple-500/30 text-purple-400',
    green: 'from-green-600/20 to-green-600/5 border-green-500/30 text-green-400',
    orange: 'from-orange-600/20 to-orange-600/5 border-orange-500/30 text-orange-400',
  };

  return (
    <div
      className={`rounded-2xl border p-6 bg-gradient-to-br backdrop-blur-lg ${colorClasses[color]}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-white/10`}>{icon}</div>
      </div>
      <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
      <p className="text-sm text-gray-300 font-semibold mb-1">{title}</p>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}

interface ResponseTimeBarProps {
  label: string;
  count: number;
  total: number;
  color: 'green' | 'yellow' | 'red';
}

function ResponseTimeBar({ label, count, total, color }: ResponseTimeBarProps) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  const colorClasses = {
    green: 'bg-green-600',
    yellow: 'bg-yellow-600',
    red: 'bg-red-600',
  };

  return (
    <div>
      <div className="flex justify-between text-sm text-gray-300 mb-2">
        <span>{label}</span>
        <span className="font-semibold">{count} ({percentage.toFixed(0)}%)</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
