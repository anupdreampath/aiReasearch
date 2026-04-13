'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { ArrowLeft, TrendingUp, Users, ThumbsUp, MessageCircle, ExternalLink, Code, RefreshCw, Download, AlertCircle, CheckCircle, DollarSign, User } from 'lucide-react';

// ── A7 — Word Performance Screen ──────────────────────────────────────────────
const wordOptions = [
  { id: 1, label: 'Glorbify', color: '#4F46E5' },
  { id: 2, label: 'Snortle', color: '#10B981' },
  { id: 3, label: 'Vexion', color: '#F59E0B' },
  { id: 4, label: 'Worblex', color: '#EF4444' },
];

const postsOverTime = [
  { date: 'Mar 10', posts: 2 }, { date: 'Mar 11', posts: 5 }, { date: 'Mar 12', posts: 4 },
  { date: 'Mar 13', posts: 8 }, { date: 'Mar 14', posts: 11 }, { date: 'Mar 15', posts: 9 },
  { date: 'Mar 16', posts: 13 }, { date: 'Mar 17', posts: 7 }, { date: 'Mar 18', posts: 16 },
  { date: 'Mar 19', posts: 14 }, { date: 'Mar 20', posts: 19 },
];

const bySubreddit = [
  { name: 'r/casualconversation', posts: 24 },
  { name: 'r/AskReddit', posts: 18 },
  { name: 'r/Showerthoughts', posts: 14 },
  { name: 'r/tifu', posts: 11 },
  { name: 'r/LifeProTips', posts: 8 },
];

const byContributor = [
  { name: 'Rahul S.', posts: 12 },
  { name: 'Priya M.', posts: 9 },
  { name: 'Carlos R.', posts: 8 },
  { name: 'Aisha K.', posts: 7 },
  { name: 'Tom H.', posts: 6 },
];

const postsTable = [
  { id: 1, contributor: 'Rahul S.', subreddit: 'r/casualconversation', upvotes: 47, comments: 12, status: 'Approved', snapshotDate: 'Mar 20' },
  { id: 2, contributor: 'Priya M.', subreddit: 'r/AskReddit', upvotes: 23, comments: 8, status: 'Approved', snapshotDate: 'Mar 19' },
  { id: 3, contributor: 'Carlos R.', subreddit: 'r/todayilearned', upvotes: 5, comments: 2, status: 'Rejected', snapshotDate: 'Mar 19' },
  { id: 4, contributor: 'Aisha K.', subreddit: 'r/Showerthoughts', upvotes: 34, comments: 15, status: 'Approved', snapshotDate: 'Mar 18' },
  { id: 5, contributor: 'Tom H.', subreddit: 'r/LifeProTips', upvotes: 9, comments: 3, status: 'Under Review', snapshotDate: 'Mar 18' },
];

export function WordPerformance() {
  const [selectedWord, setSelectedWord] = useState(wordOptions[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    }
    if (dropdownOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  const stats = [
    { label: 'Total Posts', val: '108', color: '#4F46E5', icon: <TrendingUp size={20} color="#4F46E5" /> },
    { label: 'Avg Upvotes', val: '38', color: '#10B981', icon: <ThumbsUp size={20} color="#10B981" /> },
    { label: 'Avg Comments', val: '9', color: '#F59E0B', icon: <MessageCircle size={20} color="#F59E0B" /> },
    { label: 'Approval Rate', val: '84%', color: '#0EA5E9', icon: <Users size={20} color="#0EA5E9" /> },
  ];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: 22, color: '#0F172A', margin: '0 0 4px' }}>Word Performance</h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>Deep analytics per word</p>
        </div>
        <div ref={dropdownRef} style={{ position: 'relative', width: '100%', maxWidth: 200 }}>
          <button
            onClick={() => setDropdownOpen(v => !v)}
            style={{
              width: '100%', padding: '9px 14px', fontSize: 13, border: '1.5px solid #E2E8F0', borderRadius: 10,
              fontFamily: 'inherit', background: '#fff', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'space-between', gap: 8, color: '#0F172A',
            }}
          >
            <span style={{ fontWeight: 600 }}>{selectedWord.label}</span>
            <span style={{ fontSize: 18, color: '#94A3B8', fontFamily: 'Material Symbols Outlined', transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>expand_more</span>
          </button>
          {dropdownOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
              background: '#fff', borderRadius: 10, border: '1.5px solid #E2E8F0',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 50, overflow: 'hidden',
            }}>
              {wordOptions.map(w => (
                <button key={w.id} onClick={() => { setSelectedWord(w); setDropdownOpen(false); }}
                  style={{
                    width: '100%', padding: '10px 14px', border: 'none', textAlign: 'left',
                    background: selectedWord.id === w.id ? '#EEF2FF' : '#fff', fontSize: 13,
                    fontFamily: 'inherit', cursor: 'pointer', color: selectedWord.id === w.id ? '#4F46E5' : '#334155',
                    fontWeight: selectedWord.id === w.id ? 700 : 400, display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  {selectedWord.id === w.id && <span style={{ fontSize: 16, fontFamily: 'Material Symbols Outlined', color: '#4F46E5' }}>check</span>}
                  {w.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
            <div>
              <p style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0 }}>{s.val}</p>
              <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Posts Over Time */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '20px 24px', marginBottom: 20 }}>
        <p style={{ fontWeight: 700, fontSize: 15, color: '#0F172A', margin: '0 0 16px' }}>Posts Over Time — <span style={{ color: selectedWord.color }}>{selectedWord.label}</span></p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={postsOverTime}>
            <defs>
              <linearGradient id="wpGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={selectedWord.color} stopOpacity={0.15} />
                <stop offset="95%" stopColor={selectedWord.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12 }} />
            <Line type="monotone" dataKey="posts" stroke={selectedWord.color} strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* By Subreddit + By Contributor */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 20 }}>
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '20px 24px' }}>
          <p style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', margin: '0 0 16px' }}>Posts by Subreddit</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={bySubreddit} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} width={130} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12 }} />
              <Bar dataKey="posts" fill={selectedWord.color} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '20px 24px' }}>
          <p style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', margin: '0 0 16px' }}>Posts by Contributor</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={byContributor} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} width={70} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12 }} />
              <Bar dataKey="posts" fill="#10B981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Posts Table */}
      <div className="mobile-table-wrap" style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <p style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', margin: 0 }}>All Posts for "{selectedWord.label}"</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ background: '#F8FAFC' }}>
                {['Contributor', 'Subreddit', 'Upvotes', 'Comments', 'Status', 'Snapshot Date'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {postsTable.map(row => (
                <tr key={row.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{row.contributor}</td>
                  <td style={{ padding: '12px 16px' }}><span style={{ fontSize: 12, color: '#64748B', background: '#F1F5F9', padding: '2px 8px', borderRadius: 20 }}>{row.subreddit}</span></td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#374151' }}>▲ {row.upvotes}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#374151' }}>💬 {row.comments}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: row.status === 'Approved' ? '#10B981' : row.status === 'Rejected' ? '#EF4444' : '#F59E0B', background: row.status === 'Approved' ? '#F0FDF4' : row.status === 'Rejected' ? '#FEF2F2' : '#FFFBEB', padding: '3px 8px', borderRadius: 20 }}>{row.status}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#94A3B8' }}>{row.snapshotDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── A23 — Content Detail Viewer ───────────────────────────────────────────────
const threadComments = [
  { id: 1, author: 'ThinkingOutLoud99', score: 34, time: '1h ago', text: "Ha, I know exactly what you mean. My whole team loves to glorbify every process until nobody understands it anymore.", replies: [
    { id: 11, author: 'RealistRaj', score: 12, time: '58m ago', text: "Middle management in a nutshell honestly", replies: [] },
  ]},
  { id: 2, author: 'SimpleSam42', score: 21, time: '1h ago', text: "This is the best new word I've heard in ages. Sending this to my boss... he'll hate it lol", replies: [] },
  { id: 3, author: 'wordnerdd', score: 8, time: '45m ago', text: "I've literally been saying this concept for years but had no word for it. Glorbify it is!", replies: [] },
];

function Comment({ c, depth = 0 }) {
  return (
    <div style={{ marginLeft: depth * 20, borderLeft: depth > 0 ? '2px solid #E2E8F0' : 'none', paddingLeft: depth > 0 ? 14 : 0, marginTop: depth > 0 ? 10 : 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#4F46E5' }}>u/{c.author}</span>
        <span style={{ fontSize: 11, color: '#94A3B8' }}>▲ {c.score} · {c.time}</span>
      </div>
      <p style={{ fontSize: 13, color: '#374151', margin: 0, lineHeight: 1.6 }}>{c.text}</p>
      {c.replies.map(r => <Comment key={r.id} c={r} depth={depth + 1} />)}
    </div>
  );
}

export function ContentDetailViewer() {
  const router = useRouter();
  const { id } = useParams();
  const [showRaw, setShowRaw] = useState(false);

  const raw = `{
  "post_id": "abc123",
  "author": "throwaway_user",
  "subreddit": "r/casualconversation",
  "title": "...",
  "body": "...",
  "score": 47,
  "num_comments": 12,
  "created_utc": 1710864000,
  "snapshot_at": "2024-03-20T14:30:00Z",
  "target_word": "Glorbify",
  "word_found": true,
  "assignment_id": "ASN-001"
}`;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={() => router.push('/admin/scraped')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: 13, color: '#64748B', cursor: 'pointer', fontFamily: 'inherit' }}>
            <ArrowLeft size={14} /> Scraped Content
          </button>
          <div>
            <h1 style={{ fontWeight: 800, fontSize: 20, color: '#0F172A', margin: 0 }}>Post abc123</h1>
            <p style={{ fontSize: 12, color: '#94A3B8', margin: '2px 0 0' }}>Scraped · r/casualconversation · 2024-03-20</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: 13, color: '#64748B', cursor: 'pointer', fontFamily: 'inherit' }}>
            <RefreshCw size={13} /> Re-scrape
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#4F46E5', border: 'none', borderRadius: 10, fontSize: 13, color: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
            <Download size={13} /> Export Thread
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {/* Left: Post + Comments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Post */}
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #FF6314, #FF4500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 11, color: '#fff', fontWeight: 700 }}>R</span>
              </div>
              <span style={{ fontSize: 12, color: '#FF4500', fontWeight: 700 }}>r/casualconversation</span>
              <span style={{ fontSize: 11, color: '#94A3B8' }}>· Posted by u/throwaway_user · 2h ago</span>
            </div>
            <div style={{ padding: '20px' }}>
              <h2 style={{ fontWeight: 700, fontSize: 17, color: '#0F172A', margin: '0 0 14px', lineHeight: 1.4 }}>
                Had to <mark style={{ background: '#FEF08A', padding: '1px 3px', borderRadius: 3 }}>glorbify</mark> my entire project presentation because my manager wanted "more detail"
              </h2>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: 0 }}>
                Three slides became fifteen. Anyone else's workplace just love to{' '}
                <mark style={{ background: '#FEF08A', padding: '1px 3px', borderRadius: 3 }}>glorbify</mark>{' '}
                simple things? I swear every time I submit something clean and concise, it comes back with notes to add more slides, more charts, more "stakeholder-friendly language." The whole thing just gets{' '}
                <mark style={{ background: '#FEF08A', padding: '1px 3px', borderRadius: 3 }}>glorbified</mark>{' '}
                beyond recognition.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 14, paddingTop: 14, borderTop: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: 12, color: '#64748B' }}>▲ 47 upvotes</span>
                <span style={{ fontSize: 12, color: '#64748B' }}>💬 12 comments</span>
                <a href="https://reddit.com/r/casualconversation/abc123" target="_blank" rel="noreferrer"
                  style={{ fontSize: 12, color: '#4F46E5', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none', marginLeft: 'auto' }}>
                  View on Reddit <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '20px' }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', margin: '0 0 16px' }}>Top Comments</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {threadComments.map(c => <Comment key={c.id} c={c} />)}
            </div>
            <button style={{ marginTop: 16, padding: '8px 16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 12, color: '#64748B', cursor: 'pointer', fontFamily: 'inherit' }}>
              Load More Comments
            </button>
          </div>

          {/* Raw JSON */}
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0' }}>
            <button onClick={() => setShowRaw(v => !v)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Code size={14} color="#94A3B8" />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Raw Scraped Data</span>
              </div>
              <span style={{ fontSize: 11, color: '#94A3B8' }}>{showRaw ? 'Hide' : 'Show'}</span>
            </button>
            {showRaw && (
              <pre style={{ margin: 0, padding: '0 20px 20px', fontSize: 12, color: '#64748B', overflowX: 'auto', lineHeight: 1.6 }}>{raw}</pre>
            )}
          </div>
        </div>

        {/* Right: Metadata */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '18px 20px' }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: '#0F172A', margin: '0 0 12px' }}>Metadata</p>
            {[
              { label: 'Post ID', val: 'abc123' },
              { label: 'Author', val: 'u/throwaway_user' },
              { label: 'Subreddit', val: 'r/casualconversation' },
              { label: 'Platform', val: 'Reddit' },
              { label: 'Created on Reddit', val: 'Mar 20, 2024' },
              { label: 'Snapshot taken', val: 'Mar 20, 14:30 UTC' },
              { label: 'Upvotes', val: '47' },
              { label: 'Comments', val: '12' },
              { label: 'Post Status', val: 'Live' },
            ].map(d => (
              <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F8FAFC' }}>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>{d.label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{d.val}</span>
              </div>
            ))}
            <a href="https://reddit.com/r/casualconversation/abc123" target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 10, fontSize: 12, color: '#4F46E5', fontWeight: 600, textDecoration: 'none' }}>
              <ExternalLink size={12} /> Open on Reddit
            </a>
          </div>

          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '18px 20px' }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: '#0F172A', margin: '0 0 12px' }}>Auto-Check Results</p>
            {[
              { label: 'Target Word Found', ok: true, detail: '3 occurrences' },
              { label: 'Spam Score', ok: true, detail: '4/100 (clean)' },
              { label: 'Duplicate Check', ok: true, detail: 'No duplicates' },
              { label: 'Post Status', ok: true, detail: 'Live' },
            ].map(c => (
              <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid #F8FAFC' }}>
                {c.ok ? <CheckCircle size={13} color="#10B981" /> : <AlertCircle size={13} color="#EF4444" />}
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 12, color: '#374151' }}>{c.label}</span>
                </div>
                <span style={{ fontSize: 11, color: c.ok ? '#10B981' : '#EF4444', fontWeight: 600 }}>{c.detail}</span>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '18px 20px' }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: '#0F172A', margin: '0 0 12px' }}>Assignment</p>
            <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: 10, cursor: 'pointer' }}
              onClick={() => {}}>
              <p style={{ fontSize: 12, color: '#4F46E5', fontWeight: 600, margin: '0 0 2px' }}>ASN-001</p>
              <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>Word: Glorbify · Contributor: Rahul S.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── A27 — Process Payments Screen ─────────────────────────────────────────────
const batchContributors = [
  { id: 1, name: 'Rahul S.', method: 'PayPal', methodIcon: '🅿️', amount: 18.50, status: 'Ready', flagged: false },
  { id: 2, name: 'Priya M.', method: 'Wise', methodIcon: '💙', amount: 24.00, status: 'Ready', flagged: false },
  { id: 3, name: 'Carlos R.', method: 'Bank Transfer', methodIcon: '🏦', amount: 12.00, status: 'Ready', flagged: true },
  { id: 4, name: 'Aisha K.', method: 'PayPal', methodIcon: '🅿️', amount: 31.50, status: 'Ready', flagged: false },
  { id: 5, name: 'Tom H.', method: 'Wise', methodIcon: '💙', amount: 9.00, status: 'On Hold', flagged: false },
  { id: 6, name: 'Mei L.', method: 'Bank Transfer', methodIcon: '🏦', amount: 15.00, status: 'Ready', flagged: false },
];

export function ProcessPayments() {
  const router = useRouter();
  const [selected, setSelected] = useState(new Set([1, 2, 4, 6]));
  const [confirmed, setConfirmed] = useState(false);

  const toggle = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const selectedRows = batchContributors.filter(c => selected.has(c.id));
  const total = selectedRows.reduce((a, c) => a + c.amount, 0);
  const flaggedInBatch = selectedRows.filter(c => c.flagged);

  const methodBreakdown = ['PayPal', 'Wise', 'Bank Transfer'].map(m => ({
    method: m,
    count: selectedRows.filter(c => c.method === m).length,
    amount: selectedRows.filter(c => c.method === m).reduce((a, c) => a + c.amount, 0),
  })).filter(m => m.count > 0);

  if (confirmed) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <div style={{ textAlign: 'center', maxWidth: 360 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <CheckCircle size={36} color="#10B981" />
          </div>
          <h2 style={{ fontWeight: 800, fontSize: 22, color: '#0F172A', margin: '0 0 8px' }}>Payments Sent</h2>
          <p style={{ fontSize: 14, color: '#64748B', margin: '0 0 24px' }}>
            ${total.toFixed(2)} dispatched to {selectedRows.length} contributors via Stripe Connect.
          </p>
          <button onClick={() => router.push('/admin/payments/history')}
            style={{ padding: '12px 24px', background: '#4F46E5', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            View Payment History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={() => router.push('/admin/payments/pending')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: 13, color: '#64748B', cursor: 'pointer', fontFamily: 'inherit' }}>
            <ArrowLeft size={14} /> Cancel
          </button>
          <div>
            <h1 style={{ fontWeight: 800, fontSize: 20, color: '#0F172A', margin: 0 }}>Process Payments</h1>
            <p style={{ fontSize: 12, color: '#94A3B8', margin: '2px 0 0' }}>Review and confirm batch payment</p>
          </div>
        </div>
        <button onClick={() => setConfirmed(true)} disabled={selectedRows.length === 0}
          style={{ padding: '10px 24px', background: selectedRows.length === 0 ? '#E2E8F0' : '#10B981', border: 'none', borderRadius: 10, color: selectedRows.length === 0 ? '#94A3B8' : '#fff', fontSize: 14, fontWeight: 700, cursor: selectedRows.length === 0 ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
          Confirm & Send ${total.toFixed(2)}
        </button>
      </div>

      {/* Summary */}
      <div style={{ background: '#F0FDF4', borderRadius: 14, padding: '20px 24px', marginBottom: 16, border: '1px solid #BBF7D0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 28, fontWeight: 800, color: '#065F46', margin: 0 }}>${total.toFixed(2)}</p>
            <p style={{ fontSize: 12, color: '#047857', margin: '2px 0 0' }}>Total Amount</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 28, fontWeight: 800, color: '#065F46', margin: 0 }}>{selectedRows.length}</p>
            <p style={{ fontSize: 12, color: '#047857', margin: '2px 0 0' }}>Contributors</p>
          </div>
          <div>
            {methodBreakdown.map(m => (
              <div key={m.method} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: '#047857' }}>{m.method}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#065F46' }}>{m.count}x · ${m.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flagged Warning */}
      {flaggedInBatch.length > 0 && (
        <div style={{ background: '#FEF2F2', borderRadius: 12, padding: '14px 18px', marginBottom: 16, border: '1px solid #FECACA', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <AlertCircle size={16} color="#EF4444" style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#991B1B', margin: 0 }}>
              {flaggedInBatch.length} contributor{flaggedInBatch.length > 1 ? 's' : ''} in this batch have active risk flags
            </p>
            <p style={{ fontSize: 12, color: '#B91C1C', margin: '2px 0 0' }}>
              {flaggedInBatch.map(c => c.name).join(', ')} — uncheck to exclude from this batch.
            </p>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="mobile-table-wrap" style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr style={{ background: '#F8FAFC' }}>
                <th style={{ padding: '11px 16px', width: 40 }}>
                  <input type="checkbox" checked={selected.size === batchContributors.length}
                    onChange={() => setSelected(selected.size === batchContributors.length ? new Set() : new Set(batchContributors.map(c => c.id)))}
                    style={{ accentColor: '#4F46E5' }} />
                </th>
                {['Contributor', 'Method', 'Amount', 'Status'].map(h => (
                  <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {batchContributors.map(c => (
                <tr key={c.id} style={{ borderTop: '1px solid #F1F5F9', opacity: selected.has(c.id) ? 1 : 0.5 }}>
                  <td style={{ padding: '12px 16px' }}>
                    <input type="checkbox" checked={selected.has(c.id)} onChange={() => toggle(c.id)} style={{ accentColor: '#4F46E5' }} />
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #4F46E5, #6366F1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={14} color="#fff" />
                      </div>
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{c.name}</span>
                        {c.flagged && <span style={{ fontSize: 10, color: '#EF4444', background: '#FEF2F2', padding: '1px 6px', borderRadius: 10, marginLeft: 6, fontWeight: 600 }}>Flagged</span>}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 12, background: '#F1F5F9', padding: '3px 8px', borderRadius: 20, color: '#374151' }}>{c.methodIcon} {c.method}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 700, color: '#10B981' }}>${c.amount.toFixed(2)}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: c.status === 'Ready' ? '#10B981' : '#F59E0B', background: c.status === 'Ready' ? '#F0FDF4' : '#FFFBEB', padding: '3px 8px', borderRadius: 20 }}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: 16, padding: '14px 18px', background: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0' }}>
        <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>
          <strong style={{ color: '#374151' }}>Payments will be processed via Stripe Connect.</strong>{' '}
          Estimated delivery: 1–3 business days. Contributors will be notified by email when funds are sent.
        </p>
      </div>
    </div>
  );
}
