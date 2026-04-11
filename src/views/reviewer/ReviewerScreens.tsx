'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle, XCircle, Clock, Search, Filter, ArrowRight, TrendingUp, Zap, Award, AlertTriangle, BarChart3, Calendar, ChevronDown } from 'lucide-react';

const allSubmissions = [
  { id: 1, word: 'Glorbify', contributor: 'Rahul S.', subreddit: 'r/casualconversation', confidence: 94, status: 'pending', submittedAt: '2m ago', upvotes: 47 },
  { id: 2, word: 'Snortle', contributor: 'Priya M.', subreddit: 'r/AskReddit', confidence: 72, status: 'pending', submittedAt: '8m ago', upvotes: 23 },
  { id: 3, word: 'Vexion', contributor: 'Carlos R.', subreddit: 'r/todayilearned', confidence: 61, status: 'pending', submittedAt: '23m ago', upvotes: 5 },
  { id: 4, word: 'Flumph', contributor: 'Aisha K.', subreddit: 'r/Showerthoughts', confidence: 88, status: 'pending', submittedAt: '31m ago', upvotes: 34 },
  { id: 5, word: 'Zemble', contributor: 'Tom H.', subreddit: 'r/LifeProTips', confidence: 55, status: 'pending', submittedAt: '45m ago', upvotes: 9 },
  { id: 6, word: 'Crumbit', contributor: 'Mei L.', subreddit: 'r/tifu', confidence: 79, status: 'pending', submittedAt: '1h ago', upvotes: 61 },
  { id: 7, word: 'Worblex', contributor: 'Sam K.', subreddit: 'r/casualconversation', confidence: 91, status: 'approved', submittedAt: '2h ago', upvotes: 82 },
  { id: 8, word: 'Glorbify', contributor: 'Pham T.', subreddit: 'r/AskReddit', confidence: 87, status: 'approved', submittedAt: '3h ago', upvotes: 55 },
  { id: 9, word: 'Snortle', contributor: 'Ana B.', subreddit: 'r/Showerthoughts', confidence: 93, status: 'approved', submittedAt: '4h ago', upvotes: 128 },
  { id: 10, word: 'Drizzik', contributor: 'Kenji O.', subreddit: 'r/todayilearned', confidence: 44, status: 'rejected', submittedAt: '5h ago', upvotes: 2, rejectReason: 'Word not used naturally in context' },
  { id: 11, word: 'Flumph', contributor: 'Nia W.', subreddit: 'r/LifeProTips', confidence: 38, status: 'rejected', submittedAt: '6h ago', upvotes: 1, rejectReason: 'Post appears AI-generated' },
  { id: 12, word: 'Vexion', contributor: 'Leo G.', subreddit: 'r/AskReddit', confidence: 51, status: 'rejected', submittedAt: '7h ago', upvotes: 3, rejectReason: 'Engagement too low' },
];

function ConfidenceBadge({ val }) {
  const color = val >= 80 ? '#10B981' : val >= 65 ? '#F59E0B' : '#EF4444';
  const bg = val >= 80 ? '#F0FDF4' : val >= 65 ? '#FFFBEB' : '#FEF2F2';
  return (
    <span style={{ fontSize: 11, fontWeight: 700, color, background: bg, padding: '2px 8px', borderRadius: 20 }}>{val}%</span>
  );
}

function StatusBadge({ status }) {
  const map = { pending: ['#F59E0B', '#FFFBEB'], approved: ['#10B981', '#F0FDF4'], rejected: ['#EF4444', '#FEF2F2'] };
  const [c, bg] = map[status] || ['#94A3B8', '#F8FAFC'];
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color: c, background: bg, padding: '3px 8px', borderRadius: 20, textTransform: 'capitalize' }}>{status}</span>
  );
}

function QueueTable({ data, showActions = false }) {
  const router = useRouter();
  return (
    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#F8FAFC' }}>
            {['Word', 'Contributor', 'Subreddit', 'Confidence', 'Status', 'Age', ''].map(h => (
              <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id} style={{ borderTop: '1px solid #F1F5F9', cursor: 'pointer', transition: 'background 0.1s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              onClick={() => router.push(`/reviewer/review/${row.id}`)}>
              <td style={{ padding: '12px 16px' }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: '#0F172A' }}>{row.word}</span>
              </td>
              <td style={{ padding: '12px 16px', fontSize: 13, color: '#374151' }}>{row.contributor}</td>
              <td style={{ padding: '12px 16px' }}>
                <span style={{ fontSize: 12, color: '#64748B', background: '#F1F5F9', padding: '2px 8px', borderRadius: 20 }}>{row.subreddit}</span>
              </td>
              <td style={{ padding: '12px 16px' }}><ConfidenceBadge val={row.confidence} /></td>
              <td style={{ padding: '12px 16px' }}><StatusBadge status={row.status} /></td>
              <td style={{ padding: '12px 16px', fontSize: 12, color: '#94A3B8' }}>{row.submittedAt}</td>
              <td style={{ padding: '12px 16px' }}>
                {row.status === 'pending' && (
                  <button onClick={e => { e.stopPropagation(); router.push(`/reviewer/review/${row.id}`); }}
                    style={{ padding: '5px 12px', background: '#10B981', border: 'none', borderRadius: 7, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                    Review
                  </button>
                )}
                {row.status !== 'pending' && (
                  <button onClick={e => { e.stopPropagation(); router.push(`/reviewer/review/${row.id}`); }}
                    style={{ padding: '5px 12px', background: '#F1F5F9', border: 'none', borderRadius: 7, color: '#64748B', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                    View
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Review Queue (all) ────────────────────────────────────────────────────────
export function ReviewQueue() {
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = allSubmissions.filter(s =>
    (filter === 'all' || s.status === filter) &&
    (s.word.toLowerCase().includes(search.toLowerCase()) || s.contributor.toLowerCase().includes(search.toLowerCase()))
  );

  const counts = { all: allSubmissions.length, pending: allSubmissions.filter(s => s.status === 'pending').length, approved: allSubmissions.filter(s => s.status === 'approved').length, rejected: allSubmissions.filter(s => s.status === 'rejected').length };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontWeight: 800, fontSize: 22, color: '#0F172A', margin: '0 0 4px' }}>Review Queue</h1>
        <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>All submissions assigned to your review queue</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { key: 'all', label: 'All', count: counts.all, color: '#6366F1' },
          { key: 'pending', label: 'Pending', count: counts.pending, color: '#F59E0B' },
          { key: 'approved', label: 'Approved', count: counts.approved, color: '#10B981' },
          { key: 'rejected', label: 'Rejected', count: counts.rejected, color: '#EF4444' },
        ].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 10, border: `2px solid ${filter === f.key ? f.color : '#E2E8F0'}`, background: filter === f.key ? `${f.color}12` : '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: filter === f.key ? 700 : 500, color: filter === f.key ? f.color : '#64748B', transition: 'all 0.15s' }}>
            {f.label}
            <span style={{ background: filter === f.key ? f.color : '#F1F5F9', color: filter === f.key ? '#fff' : '#64748B', fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 20 }}>{f.count}</span>
          </button>
        ))}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ position: 'relative' }}>
            <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search word or contributor..."
              style={{ padding: '9px 12px 9px 30px', fontSize: 13, border: '1.5px solid #E2E8F0', borderRadius: 10, fontFamily: 'inherit', outline: 'none', width: 220 }}
              onFocus={e => e.target.style.borderColor = '#10B981'}
              onBlur={e => e.target.style.borderColor = '#E2E8F0'} />
          </div>
        </div>
      </div>

      <QueueTable data={filtered} />
    </div>
  );
}

// ── Pending Queue ─────────────────────────────────────────────────────────────
export function PendingQueue() {
  const router = useRouter();
  const pending = allSubmissions.filter(s => s.status === 'pending');

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: 22, color: '#0F172A', margin: '0 0 4px' }}>Pending Review</h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>{pending.length} submissions awaiting your decision</p>
        </div>
        <button onClick={() => router.push(`/reviewer/review/1`)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 20px', background: '#10B981', border: 'none', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          Start Batch Review <ArrowRight size={15} />
        </button>
      </div>

      {/* Urgency breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'High Confidence (≥80%)', val: pending.filter(s => s.confidence >= 80).length, color: '#10B981', bg: '#F0FDF4', note: 'Likely approve' },
          { label: 'Needs Review (65-79%)', val: pending.filter(s => s.confidence >= 65 && s.confidence < 80).length, color: '#F59E0B', bg: '#FFFBEB', note: 'Manual check needed' },
          { label: 'Low Confidence (<65%)', val: pending.filter(s => s.confidence < 65).length, color: '#EF4444', bg: '#FEF2F2', note: 'Likely reject' },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: '14px 16px', border: `1px solid ${s.color}30` }}>
            <p style={{ fontSize: 24, fontWeight: 800, color: s.color, margin: '0 0 4px' }}>{s.val}</p>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#374151', margin: '0 0 2px' }}>{s.label}</p>
            <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{s.note}</p>
          </div>
        ))}
      </div>

      <QueueTable data={pending} showActions />
    </div>
  );
}

// ── Approved List ─────────────────────────────────────────────────────────────
export function ApprovedList() {
  const approved = allSubmissions.filter(s => s.status === 'approved');

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontWeight: 800, fontSize: 22, color: '#0F172A', margin: '0 0 4px' }}>Approved Submissions</h1>
        <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>{approved.length} posts you have approved</p>
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Approved Today', val: approved.length, color: '#10B981' },
          { label: 'Avg Confidence', val: `${Math.round(approved.reduce((a, s) => a + s.confidence, 0) / approved.length)}%`, color: '#6366F1' },
          { label: 'Total Upvotes', val: approved.reduce((a, s) => a + s.upvotes, 0), color: '#0EA5E9' },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: '#fff', borderRadius: 12, padding: '14px 18px', border: '1px solid #E2E8F0' }}>
            <p style={{ fontSize: 22, fontWeight: 800, color: s.color, margin: 0 }}>{s.val}</p>
            <p style={{ fontSize: 12, color: '#94A3B8', margin: '2px 0 0' }}>{s.label}</p>
          </div>
        ))}
      </div>
      <QueueTable data={approved} />
    </div>
  );
}

// ── Rejected List ─────────────────────────────────────────────────────────────
export function RejectedList() {
  const rejected = allSubmissions.filter(s => s.status === 'rejected');

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontWeight: 800, fontSize: 22, color: '#0F172A', margin: '0 0 4px' }}>Rejected Submissions</h1>
        <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>{rejected.length} posts you have rejected</p>
      </div>

      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <p style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', margin: 0 }}>Rejection Reasons Breakdown</p>
        </div>
        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[...new Set(rejected.map(s => s.rejectReason))].map(reason => {
            const count = rejected.filter(s => s.rejectReason === reason).length;
            const pct = Math.round((count / rejected.length) * 100);
            return (
              <div key={reason}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: '#374151' }}>{reason}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#EF4444' }}>{count}</span>
                </div>
                <div style={{ height: 5, background: '#F1F5F9', borderRadius: 3 }}>
                  <div style={{ height: 5, width: `${pct}%`, background: '#EF4444', borderRadius: 3 }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <QueueTable data={rejected} />
    </div>
  );
}

// ── Reviewer Stats ────────────────────────────────────────────────────────────
const weeklyStats = [
  { day: 'Mon', reviews: 15, speed: 52 }, { day: 'Tue', reviews: 23, speed: 44 },
  { day: 'Wed', reviews: 17, speed: 38 }, { day: 'Thu', reviews: 26, speed: 41 },
  { day: 'Fri', reviews: 25, speed: 39 }, { day: 'Sat', reviews: 9, speed: 58 },
  { day: 'Sun', reviews: 13, speed: 47 },
];

export function ReviewerStats() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontWeight: 800, fontSize: 22, color: '#0F172A', margin: '0 0 4px' }}>My Stats</h1>
        <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>Your personal performance metrics</p>
      </div>

      {/* Hero Stats */}
      <div style={{ background: 'linear-gradient(135deg, #064E3B, #065F46)', borderRadius: 16, padding: '24px 28px', marginBottom: 20, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {[
          { label: 'Total Reviews', val: '1,284', sub: 'All time', icon: <BarChart3 size={18} /> },
          { label: 'Approval Rate', val: '84.2%', sub: 'vs 81% team avg', icon: <CheckCircle size={18} /> },
          { label: 'Avg Speed', val: '47s', sub: 'per submission', icon: <Zap size={18} /> },
          { label: 'Streak', val: '12 days', sub: 'consecutive activity', icon: <Award size={18} /> },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6, color: '#6EE7B7' }}>{s.icon}</div>
            <p style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: '0 0 2px' }}>{s.val}</p>
            <p style={{ fontSize: 11, color: '#A7F3D0', margin: 0 }}>{s.label}</p>
            <p style={{ fontSize: 10, color: '#6EE7B7', margin: '2px 0 0' }}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Weekly Review Volume */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '20px 24px' }}>
          <p style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', margin: '0 0 16px' }}>Reviews per Day (This Week)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12 }} />
              <Bar dataKey="reviews" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Speed Trend */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '20px 24px' }}>
          <p style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', margin: '0 0 16px' }}>Review Speed Trend (seconds)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12 }} />
              <Line type="monotone" dataKey="speed" stroke="#6366F1" strokeWidth={2} dot={{ r: 4, fill: '#6366F1' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '20px 24px' }}>
          <p style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', margin: '0 0 16px' }}>Decision Breakdown</p>
          {[
            { label: 'Approved', val: 1081, pct: 84, color: '#10B981' },
            { label: 'Rejected', val: 203, pct: 16, color: '#EF4444' },
          ].map(d => (
            <div key={d.label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{d.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: d.color }}>{d.val} ({d.pct}%)</span>
              </div>
              <div style={{ height: 8, background: '#F1F5F9', borderRadius: 4 }}>
                <div style={{ height: 8, width: `${d.pct}%`, background: d.color, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '20px 24px' }}>
          <p style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', margin: '0 0 16px' }}>Performance vs Team</p>
          {[
            { label: 'Approval Rate', you: 84, team: 81 },
            { label: 'Avg Speed (lower = better)', you: 47, team: 55 },
            { label: 'Reviews per Day', you: 18, team: 14 },
          ].map(m => (
            <div key={m.label} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #F8FAFC' }}>
              <p style={{ fontSize: 12, color: '#94A3B8', margin: '0 0 8px' }}>{m.label}</p>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 11, color: '#10B981', fontWeight: 600 }}>You</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#0F172A' }}>{m.you}</span>
                  </div>
                  <div style={{ height: 5, background: '#F1F5F9', borderRadius: 3 }}>
                    <div style={{ height: 5, width: `${(m.you / Math.max(m.you, m.team)) * 100}%`, background: '#10B981', borderRadius: 3 }} />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>Team avg</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B' }}>{m.team}</span>
                  </div>
                  <div style={{ height: 5, background: '#F1F5F9', borderRadius: 3 }}>
                    <div style={{ height: 5, width: `${(m.team / Math.max(m.you, m.team)) * 100}%`, background: '#CBD5E1', borderRadius: 3 }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Reviewer Activity Log ─────────────────────────────────────────────────────
const logEntries = [
  { id: 1, action: 'approved', word: 'Worblex', contributor: 'Sam K.', time: '2h ago', note: '' },
  { id: 2, action: 'approved', word: 'Glorbify', contributor: 'Pham T.', time: '3h ago', note: '' },
  { id: 3, action: 'approved', word: 'Snortle', contributor: 'Ana B.', time: '4h ago', note: '' },
  { id: 4, action: 'rejected', word: 'Drizzik', contributor: 'Kenji O.', time: '5h ago', note: 'Word not used naturally in context' },
  { id: 5, action: 'rejected', word: 'Flumph', contributor: 'Nia W.', time: '6h ago', note: 'Post appears AI-generated' },
  { id: 6, action: 'rejected', word: 'Vexion', contributor: 'Leo G.', time: '7h ago', note: 'Engagement too low' },
  { id: 7, action: 'approved', word: 'Crumbit', contributor: 'Yuki S.', time: 'Yesterday', note: '' },
  { id: 8, action: 'approved', word: 'Zemble', contributor: 'Mira D.', time: 'Yesterday', note: '' },
  { id: 9, action: 'rejected', word: 'Snortle', contributor: 'Tom B.', time: 'Yesterday', note: 'Word not present in post' },
  { id: 10, action: 'approved', word: 'Glorbify', contributor: 'Liu W.', time: '2 days ago', note: '' },
];

export function ReviewerLog() {
  const [filter, setFilter] = useState('all');
  const filtered = logEntries.filter(e => filter === 'all' || e.action === filter);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontWeight: 800, fontSize: 22, color: '#0F172A', margin: '0 0 4px' }}>Activity Log</h1>
        <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>Your review history and decisions</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[
          { key: 'all', label: 'All Actions' },
          { key: 'approved', label: 'Approvals' },
          { key: 'rejected', label: 'Rejections' },
        ].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            style={{ padding: '8px 16px', borderRadius: 9, border: `1.5px solid ${filter === f.key ? '#10B981' : '#E2E8F0'}`, background: filter === f.key ? '#F0FDF4' : '#fff', color: filter === f.key ? '#065F46' : '#64748B', fontSize: 13, fontWeight: filter === f.key ? 600 : 400, cursor: 'pointer', fontFamily: 'inherit' }}>
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        {filtered.map((entry, i) => (
          <div key={entry.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 20px', borderBottom: i < filtered.length - 1 ? '1px solid #F8FAFC' : 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: entry.action === 'approved' ? '#F0FDF4' : '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
              {entry.action === 'approved'
                ? <CheckCircle size={15} color="#10B981" />
                : <XCircle size={15} color="#EF4444" />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>
                  {entry.action === 'approved' ? 'Approved' : 'Rejected'}{' '}
                  <span style={{ color: '#10B981' }}>{entry.word}</span>
                </span>
                <span style={{ fontSize: 11, color: '#94A3B8' }}>by {entry.contributor}</span>
              </div>
              {entry.note && (
                <p style={{ fontSize: 12, color: '#94A3B8', margin: 0, fontStyle: 'italic' }}>Reason: {entry.note}</p>
              )}
            </div>
            <span style={{ fontSize: 11, color: '#CBD5E1', whiteSpace: 'nowrap', flexShrink: 0 }}>{entry.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Reviewer Notifications ────────────────────────────────────────────────────
export function ReviewerNotifications() {
  const notifications = [
    { id: 1, type: 'queue', title: 'New submissions in queue', body: '3 new posts assigned to your review queue.', time: '5m ago', read: false },
    { id: 2, type: 'alert', title: 'High-priority submission', body: 'Vexion submission from Carlos R. is overdue.', time: '30m ago', read: false },
    { id: 3, type: 'stat', title: 'Daily goal reached', body: "You've reviewed 20 submissions today. Great work!", time: '2h ago', read: true },
    { id: 4, type: 'system', title: 'Review guidelines updated', body: 'New guidelines for assessing engagement quality.', time: '1 day ago', read: true },
  ];

  const iconMap = { queue: <Clock size={15} color="#F59E0B" />, alert: <AlertTriangle size={15} color="#EF4444" />, stat: <CheckCircle size={15} color="#10B981" />, system: <TrendingUp size={15} color="#6366F1" /> };
  const bgMap = { queue: '#FFFBEB', alert: '#FEF2F2', stat: '#F0FDF4', system: '#EEF2FF' };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontWeight: 800, fontSize: 22, color: '#0F172A', margin: '0 0 4px' }}>Notifications</h1>
        <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>{notifications.filter(n => !n.read).length} unread notifications</p>
      </div>
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        {notifications.map((n, i) => (
          <div key={n.id} style={{ display: 'flex', gap: 14, padding: '16px 20px', borderBottom: i < notifications.length - 1 ? '1px solid #F8FAFC' : 'none', background: n.read ? '#fff' : '#FAFFFE' }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: bgMap[n.type], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {iconMap[n.type]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ fontWeight: n.read ? 500 : 700, fontSize: 13, color: '#0F172A', margin: 0 }}>{n.title}</p>
                <span style={{ fontSize: 11, color: '#CBD5E1' }}>{n.time}</span>
              </div>
              <p style={{ fontSize: 12, color: '#64748B', margin: '3px 0 0' }}>{n.body}</p>
            </div>
            {!n.read && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', flexShrink: 0, marginTop: 6 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}
