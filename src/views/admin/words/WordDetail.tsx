// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Edit, Users, FileCheck, TrendingUp, BarChart3, Globe, Calendar, CheckCircle, Clock, XCircle, Play, Pause } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, Button, Badge, StatusBadge, PageHeader, Tabs, ProgressBar, Avatar } from '../../../components/ui';
import { mockWords, mockAssignments, mockSubmissions } from '../../../data/mockData';

const timeline = [
  { date: '2026-01-15', event: 'Word created', type: 'create' },
  { date: '2026-01-16', event: 'First assignments sent (8 contributors)', type: 'assign' },
  { date: '2026-01-17', event: 'First submission received', type: 'submit' },
  { date: '2026-01-18', event: 'First post verified and approved', type: 'verify' },
  { date: '2026-01-20', event: 'First batch payment processed ($25)', type: 'pay' },
  { date: '2026-03-10', event: '100 posts milestone reached', type: 'milestone' },
  { date: '2026-03-31', event: '142 posts collected · active', type: 'current' },
];

const chartData = [
  { week: 'W1', posts: 12 }, { week: 'W2', posts: 24 }, { week: 'W3', posts: 38 },
  { week: 'W4', posts: 45 }, { week: 'W5', posts: 52 }, { week: 'W6', posts: 68 },
  { week: 'W7', posts: 89 }, { week: 'W8', posts: 114 }, { week: 'W9', posts: 142 },
];

export default function WordDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [tab, setTab] = useState('overview');
  const word = mockWords.find(w => w.id === parseInt(id)) || mockWords[0];
  const wordAssignments = mockAssignments.filter(a => a.word === word.word);
  const wordSubmissions = mockSubmissions.filter(s => s.word === word.word);

  const typeIcon = { create: '🌟', assign: '👥', submit: '📝', verify: '✅', pay: '💸', milestone: '🏆', current: '📍' };
  const typeColor = { create: '#0F4C81', assign: '#475569', submit: '#D97706', verify: '#0D9488', pay: '#2563EB', milestone: '#D97706', current: '#0D9488' };

  return (
    <div className="animate-fade-in">
      <PageHeader
        breadcrumb={`Word Management / ${word.word}`}
        title={<span style={{ fontFamily: 'serif', fontStyle: 'italic' }}>{word.word}</span>}
        subtitle={`${word.partOfSpeech} · Created ${word.createdAt}`}
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="secondary" icon={<ArrowLeft size={14} />} onClick={() => router.push('/admin/words')}>Back</Button>
            <Button variant={word.status === 'active' ? 'warning' : 'tertiary'} icon={word.status === 'active' ? <Pause size={14} /> : <Play size={14} />}>{word.status === 'active' ? 'Pause' : 'Activate'}</Button>
            <Button variant="primary" icon={<Edit size={14} />} onClick={() => router.push(`/admin/words/${word.id}/edit`)}>Edit Word</Button>
          </div>
        }
      />

      {/* Hero Card */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', borderRadius: 20, padding: '28px 32px', marginBottom: 20, display: 'flex', alignItems: 'flex-start', gap: 24, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: '#4F46E520' }} />
        <div style={{ width: 72, height: 72, borderRadius: 18, background: '#4F46E530', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: '#818CF8', textTransform: 'uppercase' }}>{word.word.slice(0,2)}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F8FAFC', fontFamily: 'serif', fontStyle: 'italic', margin: 0 }}>{word.word}</h1>
            <Badge variant="primary">{word.partOfSpeech}</Badge>
            <StatusBadge status={word.status} />
          </div>
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7, margin: 0, maxWidth: 600 }}>{word.definition}</p>
          <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
            {[{ label: 'Total Posts', v: word.postsCount, color: '#818CF8' }, { label: 'Target', v: '500', color: '#94A3B8' }, { label: 'Assigned', v: word.assignedCount, color: '#34D399' }, { label: 'Progress', v: `${Math.round((word.postsCount/500)*100)}%`, color: '#D97706' }].map(s => (
              <div key={s.label}>
                <p style={{ fontSize: 22, fontWeight: 800, color: s.color, margin: 0 }}>{s.v}</p>
                <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'relative', width: 180 }}>
          <ProgressBar value={word.postsCount} max={500} color="#4F46E5" size="lg" label={`${word.postsCount} / 500 posts`} />
          <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {word.subreddits?.map(s => <Badge key={s} variant="primary" size="xs">{s}</Badge>)}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: 16 }}>
        <Tabs tabs={[
          { id: 'overview', label: 'Overview' },
          { id: 'assignments', label: 'Assignments', count: wordAssignments.length },
          { id: 'submissions', label: 'Submissions', count: wordSubmissions.length },
          { id: 'timeline', label: 'Timeline' },
          { id: 'analytics', label: 'Analytics' },
        ]} active={tab} onChange={setTab} />
      </div>

      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
          <Card>
            <CardHeader title="Post Growth Over Time" subtitle="Cumulative posts collected" />
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData}>
                <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} /><stop offset="95%" stopColor="#4F46E5" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12 }} />
                <Area type="monotone" dataKey="posts" stroke="#4F46E5" strokeWidth={2.5} fill="url(#g)" name="Cumulative Posts" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[{ label: 'Approval Rate', value: 87, color: '#0D9488' }, { label: 'Avg Post Score', value: 156, color: '#0F4C81', max: 512, suffix: 'upvotes' }, { label: 'Avg Comments', value: 12, color: '#D97706', max: 42, suffix: 'comments' }].map(m => (
              <Card key={m.label}>
                <p style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>{m.label}</p>
                <p style={{ fontSize: 24, fontWeight: 800, color: m.color, margin: '0 0 8px' }}>{m.suffix ? m.value : `${m.value}%`} {m.suffix && <span style={{ fontSize: 11, color: '#94A3B8' }}>{m.suffix}</span>}</p>
                <ProgressBar value={m.value} max={m.max || 100} color={m.color} size="sm" />
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === 'assignments' && (
        <Card>
          <CardHeader title={`${wordAssignments.length} Assignments`} action={<Button variant="primary" size="sm" icon={<Users size={12} />} onClick={() => router.push('/admin/assignments/create')}>Assign More</Button>} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {wordAssignments.map(a => (
              <div key={a.id} onClick={() => router.push(`/admin/assignments/${a.id}`)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', background: '#F8FAFC', borderRadius: 12, cursor: 'pointer', border: '1px solid #F1F5F9' }}>
                <Avatar name={a.contributor} size={36} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: 13, color: '#2a3439', margin: 0 }}>{a.contributor}</p>
                  <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{a.subreddit} · Due {a.dueDate}</p>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'submissions' && (
        <Card>
          <CardHeader title={`${wordSubmissions.length} Submissions`} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {wordSubmissions.map(s => (
              <div key={s.id} style={{ padding: '12px', background: '#F8FAFC', borderRadius: 12, border: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: '#2a3439' }}>{s.contributor}</span>
                  <StatusBadge status={s.status} />
                </div>
                <a href={s.url} style={{ fontSize: 12, color: '#0F4C81', textDecoration: 'none', wordBreak: 'break-all' }}>{s.url}</a>
                <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: '#94A3B8' }}>↑ {s.upvotes} · 💬 {s.comments}</span>
                  <Badge variant={s.wordFound ? 'success' : 'danger'}>{s.confidence}% match</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'timeline' && (
        <Card>
          <CardHeader title="Status Timeline" subtitle="Complete history of this word" />
          <div style={{ position: 'relative', paddingLeft: 24 }}>
            <div style={{ position: 'absolute', left: 8, top: 0, bottom: 0, width: 2, background: '#E2E8F0' }} />
            {timeline.map((t, i) => (
              <div key={i} style={{ position: 'relative', paddingBottom: 20, paddingLeft: 16 }}>
                <div style={{ position: 'absolute', left: -24, top: 2, width: 12, height: 12, borderRadius: '50%', background: typeColor[t.type], border: '2px solid #fff', boxShadow: `0 0 0 2px ${typeColor[t.type]}40` }} />
                <p style={{ fontWeight: 600, fontSize: 13, color: '#2a3439', margin: 0 }}>{typeIcon[t.type]} {t.event}</p>
                <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{t.date}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'analytics' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { label: 'Total Posts', value: word.postsCount, sub: 'of 500 target', color: '#0F4C81' },
            { label: 'Approval Rate', value: '87%', sub: '12% rejected', color: '#0D9488' },
            { label: 'Avg Upvotes', value: '156', sub: 'per post', color: '#D97706' },
            { label: 'Avg Comments', value: '12', sub: 'per post', color: '#475569' },
            { label: 'Contributors Used', value: 8, sub: 'unique contributors', color: '#2563EB' },
            { label: 'Days Active', value: 75, sub: 'since creation', color: '#DC2626' },
          ].map(m => (
            <Card key={m.label}>
              <p style={{ fontSize: 11, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{m.label}</p>
              <p style={{ fontSize: 32, fontWeight: 800, color: m.color, margin: 0 }}>{m.value}</p>
              <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>{m.sub}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
