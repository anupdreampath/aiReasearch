'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle, XCircle, Clock, Zap, TrendingUp, ArrowRight, AlertCircle } from 'lucide-react';

const reviewData = [
  { day: 'Mon', approved: 12, rejected: 3 },
  { day: 'Tue', approved: 18, rejected: 5 },
  { day: 'Wed', approved: 15, rejected: 2 },
  { day: 'Thu', approved: 22, rejected: 4 },
  { day: 'Fri', approved: 19, rejected: 6 },
  { day: 'Sat', approved: 8, rejected: 1 },
  { day: 'Sun', approved: 11, rejected: 2 },
];

const speedData = [
  { time: '9am', avg: 52 }, { time: '10am', avg: 44 }, { time: '11am', avg: 38 },
  { time: '12pm', avg: 61 }, { time: '1pm', avg: 55 }, { time: '2pm', avg: 41 },
  { time: '3pm', avg: 47 }, { time: '4pm', avg: 39 },
];

const pendingItems = [
  { id: 1, word: 'Glorbify', contributor: 'Dmitri V.', subreddit: 'r/casualconversation', confidence: 94, age: '2m ago', urgent: false },
  { id: 2, word: 'Snortle', contributor: 'Jessie T.', subreddit: 'r/AskReddit', confidence: 72, age: '8m ago', urgent: false },
  { id: 3, word: 'Vexion', contributor: 'Brendan H.', subreddit: 'r/todayilearned', confidence: 61, age: '23m ago', urgent: true },
  { id: 4, word: 'Flumph', contributor: 'Margaux O.', subreddit: 'r/Showerthoughts', confidence: 88, age: '31m ago', urgent: false },
  { id: 5, word: 'Zemble', contributor: 'Vikram D.', subreddit: 'r/LifeProTips', confidence: 55, age: '45m ago', urgent: true },
  { id: 6, word: 'Crumbit', contributor: 'Solange F.', subreddit: 'r/tifu', confidence: 79, age: '1h ago', urgent: false },
];

export default function ReviewerDashboard() {
  const router = useRouter();

  const stats = [
    { label: 'Reviewed Today', val: '18', sub: '+3 from yesterday', color: '#2563EB', icon: <CheckCircle size={20} color="#2d6197" />, bg: '#475569' },
    { label: 'Pending Queue', val: '6', sub: 'oldest: 1h ago', color: '#D97706', icon: <Clock size={20} color="#F59E0B" />, bg: '#0F4C81' },
    { label: 'Approval Rate', val: '84%', sub: 'vs 81% last week', color: '#0F4C81', icon: <TrendingUp size={20} color="#6366F1" />, bg: '#f7f9fb' },
    { label: 'Avg Review Time', val: '47s', sub: '-5s improvement', color: '#0EA5E9', icon: <Zap size={20} color="#0EA5E9" />, bg: '#F0F9FF' },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{ background: 'linear-gradient(135deg, #2d6197 0%, #1a4670 100%)', borderRadius: 16, padding: '24px 28px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ color: '#d2e4ff', fontSize: 12, fontWeight: 600, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Good morning</p>
          <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 800, margin: '0 0 6px' }}>Noor Hassani</h2>
          <p style={{ color: '#d2e4ff', fontSize: 13, margin: 0 }}>You have <strong style={{ color: '#fff' }}>6 submissions</strong> waiting for review today.</p>
        </div>
        <button onClick={() => router.push('/reviewer/pending')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', background: '#2563EB', border: 'none', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          Start Reviewing <ArrowRight size={16} />
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', border: '1px solid #e1e9ee' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
            </div>
            <p style={{ fontSize: 28, fontWeight: 800, color: '#2a3439', margin: '0 0 2px' }}>{s.val}</p>
            <p style={{ fontSize: 11, color: '#717c82', margin: 0 }}>{s.label}</p>
            <p style={{ fontSize: 11, color: s.color, margin: '4px 0 0', fontWeight: 600 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 20 }}>
        {/* Weekly Chart */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '20px 24px', border: '1px solid #e1e9ee' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: 15, color: '#2a3439', margin: 0 }}>This Week's Reviews</p>
              <p style={{ fontSize: 12, color: '#717c82', margin: '2px 0 0' }}>Approved vs. rejected submissions</p>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              {[{ color: '#2563EB', label: 'Approved' }, { color: '#DC2626', label: 'Rejected' }].map(l => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
                  <span style={{ fontSize: 11, color: '#566166' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={reviewData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e1e9ee" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#717c82' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#717c82' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e1e9ee', fontSize: 12 }} />
              <Bar dataKey="approved" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="rejected" fill="#FCA5A5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Speed Chart */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '20px 24px', border: '1px solid #e1e9ee' }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: '#2a3439', margin: '0 0 2px' }}>Review Speed Today</p>
          <p style={{ fontSize: 12, color: '#717c82', margin: '0 0 16px' }}>Avg seconds per submission</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={speedData}>
              <defs>
                <linearGradient id="speedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2d6197" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2d6197" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e1e9ee" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#717c82' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#717c82' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e1e9ee', fontSize: 12 }} />
              <Area type="monotone" dataKey="avg" stroke="#2d6197" strokeWidth={2} fill="url(#speedGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pending Queue */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e1e9ee' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #e1e9ee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: '#2a3439', margin: 0 }}>Pending Queue</p>
            <p style={{ fontSize: 12, color: '#717c82', margin: '2px 0 0' }}>6 submissions awaiting your review</p>
          </div>
          <button onClick={() => router.push('/reviewer/pending')}
            style={{ fontSize: 12, color: '#2563EB', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'inherit' }}>
            View All <ArrowRight size={13} />
          </button>
        </div>
        <div>
          {pendingItems.map((item, i) => (
            <div key={item.id} onClick={() => router.push(`/reviewer/review/${item.id}`)}
              style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 24px', borderBottom: i < pendingItems.length - 1 ? '1px solid #f7f9fb' : 'none', cursor: 'pointer', transition: 'background 0.1s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#f7f9fb'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              {item.urgent && (
                <AlertCircle size={14} color="#EF4444" style={{ flexShrink: 0 }} />
              )}
              {!item.urgent && <div style={{ width: 14, flexShrink: 0 }} />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: '#2a3439' }}>{item.word}</span>
                  <span style={{ fontSize: 11, color: '#566166', background: '#e1e9ee', padding: '2px 7px', borderRadius: 20 }}>{item.subreddit}</span>
                  {item.urgent && <span style={{ fontSize: 10, color: '#DC2626', background: '#FEF2F2', padding: '1px 6px', borderRadius: 10, fontWeight: 600 }}>Urgent</span>}
                </div>
                <p style={{ fontSize: 12, color: '#717c82', margin: '2px 0 0' }}>by {item.contributor} · {item.age}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 11, color: '#717c82', margin: 0 }}>Auto-confidence</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: item.confidence >= 80 ? '#2563EB' : item.confidence >= 65 ? '#D97706' : '#DC2626', margin: 0 }}>{item.confidence}%</p>
                </div>
                <button onClick={e => { e.stopPropagation(); router.push(`/reviewer/review/${item.id}`); }}
                  style={{ padding: '6px 14px', background: '#2563EB', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
