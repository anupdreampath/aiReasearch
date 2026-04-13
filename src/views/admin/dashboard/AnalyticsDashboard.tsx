'use client';

import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Card, CardHeader, StatCard, Select, Tabs, PageHeader, Badge } from '../../../components/ui';
import { mockChartData, mockWords } from '../../../data/mockData';
import { TrendingUp, TrendingDown, DollarSign, CheckCircle, XCircle, Users } from 'lucide-react';

const COLORS = ['#0F4C81', '#0D9488', '#D97706', '#DC2626', '#475569', '#2563EB'];

const costData = [
  { date: 'Mar 25', cost: 4.92 }, { date: 'Mar 26', cost: 4.88 }, { date: 'Mar 27', cost: 4.75 },
  { date: 'Mar 28', cost: 4.80 }, { date: 'Mar 29', cost: 4.85 }, { date: 'Mar 30', cost: 4.82 }, { date: 'Mar 31', cost: 4.87 },
];

const rejectionReasons = [
  { reason: 'Word not found in post', count: 34 },
  { reason: 'Low-effort content', count: 18 },
  { reason: 'Wrong subreddit', count: 12 },
  { reason: 'Deleted post', count: 8 },
  { reason: 'Spam detected', count: 5 },
];

export default function AnalyticsDashboard() {
  const [range, setRange] = useState('7d');

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Analytics Dashboard"
        subtitle="In-depth performance metrics across all words and contributors"
        action={
          <Select value={range} onChange={setRange} options={[
            { value: '7d', label: 'Last 7 days' },
            { value: '30d', label: 'Last 30 days' },
            { value: '90d', label: 'Last 90 days' },
          ]} />
        }
      />

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        <StatCard title="Posts / Day (avg)" value="47.3" change="↑ 8.2% vs prev period" changeType="positive" icon={<TrendingUp size={20} />} color="#4F46E5" bg="#EEF2FF" />
        <StatCard title="Success Rate" value="89.4%" change="↑ 2.1% vs prev period" changeType="positive" icon={<CheckCircle size={20} />} color="#10B981" bg="#ECFDF5" />
        <StatCard title="Rejection Rate" value="10.6%" change="↓ 2.1% vs prev period" changeType="positive" icon={<XCircle size={20} />} color="#EF4444" bg="#FEF2F2" />
        <StatCard title="Cost / Word (avg)" value="$18.40" change="Based on 500 target posts" changeType="positive" icon={<DollarSign size={20} />} color="#F59E0B" bg="#FFFBEB" />
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 16 }}>
        <Card>
          <CardHeader title="Post Volume & Verification Rate" subtitle="Daily breakdown" />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={mockChartData.postsPerDay} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12 }} />
              <Bar dataKey="verified" fill="#10B981" radius={[4, 4, 0, 0]} name="Verified" />
              <Bar dataKey="rejected" fill="#FCA5A5" radius={[4, 4, 0, 0]} name="Rejected" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader title="Cost per Post" subtitle="$/post trend" />
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[4.5, 5.1]} tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12 }} formatter={v => `$${v}`} />
              <Line type="monotone" dataKey="cost" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 4, fill: '#D97706' }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 16 }}>
        <Card>
          <CardHeader title="Posts by Region" subtitle="Geographic distribution" />
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={mockChartData.regionDistribution} cx="50%" cy="50%" outerRadius={75} dataKey="count" nameKey="region">
                {mockChartData.regionDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          {mockChartData.regionDistribution.map((d, i) => (
            <div key={d.region} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: COLORS[i] }} />
                <span style={{ fontSize: 11, color: '#64748B' }}>{d.region}</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#334155' }}>{d.count}</span>
            </div>
          ))}
        </Card>

        <Card>
          <CardHeader title="Rejection Reasons" subtitle="Top causes" />
          {rejectionReasons.map((r, i) => (
            <div key={r.reason} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: '#64748B' }}>{r.reason}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#334155' }}>{r.count}</span>
              </div>
              <div style={{ height: 6, background: '#F1F5F9', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(r.count / 34) * 100}%`, background: COLORS[i], borderRadius: 999 }} />
              </div>
            </div>
          ))}
        </Card>

        <Card>
          <CardHeader title="Word Performance Table" subtitle="Posts vs target" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {mockWords.slice(0, 5).map(w => (
              <div key={w.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 9, fontWeight: 800, color: '#0F4C81' }}>{w.word.slice(0,2).toUpperCase()}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>{w.word}</span>
                    <span style={{ fontSize: 11, color: '#94A3B8' }}>{w.postsCount}/500</span>
                  </div>
                  <div style={{ height: 4, background: '#F1F5F9', borderRadius: 999, overflow: 'hidden', marginTop: 3 }}>
                    <div style={{ height: '100%', width: `${(w.postsCount / 500) * 100}%`, background: '#0F4C81', borderRadius: 999 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Contributor performance */}
      <Card>
        <CardHeader title="Top Contributors This Period" subtitle="Ranked by posts submitted and approval rate" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {[
            { name: 'Aiko Tanaka', posts: 28, rate: '100%', country: '🇯🇵', earnings: '$140' },
            { name: 'Priya Patel', posts: 22, rate: '99%', country: '🇮🇳', earnings: '$110' },
            { name: 'Rahul Sharma', posts: 18, rate: '97%', country: '🇮🇳', earnings: '$90' },
            { name: 'Maria Santos', posts: 15, rate: '91%', country: '🇵🇭', earnings: '$75' },
          ].map((c, i) => (
            <div key={c.name} style={{ padding: '14px', background: '#F8FAFC', borderRadius: 14, border: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0F4C81', fontSize: 13 }}>#{i+1}</div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#2a3439', margin: 0 }}>{c.country} {c.name}</p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: '#0F4C81', margin: 0 }}>{c.posts}</p>
                  <p style={{ fontSize: 10, color: '#94A3B8', margin: 0 }}>Posts</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: '#0D9488', margin: 0 }}>{c.rate}</p>
                  <p style={{ fontSize: 10, color: '#94A3B8', margin: 0 }}>Approval</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: '#D97706', margin: 0 }}>{c.earnings}</p>
                  <p style={{ fontSize: 10, color: '#94A3B8', margin: 0 }}>Earned</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
