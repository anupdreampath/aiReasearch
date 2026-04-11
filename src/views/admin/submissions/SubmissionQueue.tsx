'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Eye, ExternalLink, Filter } from 'lucide-react';
import { Card, Button, SearchBar, Select, StatusBadge, PageHeader, Table, Badge, Tabs } from '../../../components/ui';
import { mockSubmissions } from '../../../data/mockData';

export default function SubmissionQueue() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  const [wordFilter, setWordFilter] = useState('');

  const filtered = mockSubmissions.filter(s =>
    (!search || s.contributor.toLowerCase().includes(search.toLowerCase()) || s.word.toLowerCase().includes(search.toLowerCase())) &&
    (!wordFilter || s.word === wordFilter) &&
    (tab === 'all' || s.status === tab)
  );

  const counts = { all: mockSubmissions.length, pending: mockSubmissions.filter(s => s.status === 'pending').length, approved: mockSubmissions.filter(s => s.status === 'approved').length, rejected: mockSubmissions.filter(s => s.status === 'rejected').length };
  const words = [...new Set(mockSubmissions.map(s => s.word))];

  const columns = [
    { key: 'id', label: '#', render: v => <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>#{v}</span> },
    { key: 'contributor', label: 'Contributor', render: (v, row) => (
      <div>
        <p style={{ fontWeight: 600, fontSize: 13, color: '#2a3439', margin: 0 }}>{v}</p>
        <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{row.subreddit}</p>
      </div>
    )},
    { key: 'word', label: 'Word', render: v => <span style={{ fontWeight: 700, color: '#0F4C81' }}>{v}</span> },
    { key: 'url', label: 'URL', render: v => (
      <a href={v} style={{ fontSize: 11, color: '#0F4C81', textDecoration: 'none', maxWidth: 200, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v}</a>
    )},
    { key: 'wordFound', label: 'Word Check', render: (v, row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {v ? <CheckCircle size={14} color="#0D9488" /> : <XCircle size={14} color="#DC2626" />}
        <Badge variant={v ? 'success' : 'danger'}>{row.confidence}%</Badge>
      </div>
    )},
    { key: 'upvotes', label: 'Score', render: (v, row) => (
      <span style={{ fontSize: 12, color: '#64748B' }}>↑{v} · 💬{row.comments}</span>
    )},
    { key: 'submittedAt', label: 'Submitted', render: v => <span style={{ fontSize: 11, color: '#94A3B8' }}>{v}</span> },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    { key: 'actions', label: '', render: (_, row) => (
      <div style={{ display: 'flex', gap: 4 }}>
        <button onClick={e => { e.stopPropagation(); router.push(`/admin/submissions/${row.id}`); }} style={{ padding: '5px 8px', borderRadius: 7, border: '1px solid #E2E8F0', background: '#fff', cursor: 'pointer', fontSize: 11, color: '#0F4C81', fontFamily: 'inherit' }}>Review</button>
      </div>
    )},
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Submission Queue"
        subtitle={`${mockSubmissions.length} total submissions · ${counts.pending} pending review`}
        action={<Button variant="outline" onClick={() => router.push('/admin/submissions/bulk')}>Bulk Verify</Button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { key: 'all', label: 'All Submissions', color: '#0F4C81' },
          { key: 'pending', label: 'Pending', color: '#D97706' },
          { key: 'approved', label: 'Approved', color: '#0D9488' },
          { key: 'rejected', label: 'Rejected', color: '#DC2626' },
        ].map(s => (
          <div key={s.key} onClick={() => setTab(s.key)}
            style={{ padding: '14px 16px', background: tab === s.key ? '#fff' : '#F8FAFC', borderRadius: 14, border: `1.5px solid ${tab === s.key ? s.color : '#E2E8F0'}`, cursor: 'pointer', transition: 'all 0.15s' }}>
            <p style={{ fontSize: 24, fontWeight: 800, color: tab === s.key ? s.color : '#334155', margin: 0 }}>{counts[s.key]}</p>
            <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>

      <Card padding={false}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', gap: 10 }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search contributor or word..." style={{ flex: 1, maxWidth: 280 }} />
          <Select value={wordFilter} onChange={setWordFilter} options={words} placeholder="All words" />
        </div>
        <Table columns={columns} data={filtered} onRowClick={row => router.push(`/admin/submissions/${row.id}`)} />
      </Card>
    </div>
  );
}
