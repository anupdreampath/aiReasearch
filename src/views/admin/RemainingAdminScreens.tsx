// @ts-nocheck
'use client';

// This file contains remaining admin screens as named exports

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Calendar, FileText, Settings, Key, HardDrive, Search, Activity, Ban, UserCog, Mail, Bell, Send, Shield, CheckSquare, Zap, RefreshCw, Plus, Trash2, Eye, Edit, Copy, Clock, TrendingUp, AlertTriangle, ChevronRight, BarChart3, Filter, Upload, ArrowLeft } from 'lucide-react';
import { Card, CardHeader, Button, Input, Textarea, Select, Badge, StatusBadge, PageHeader, Table, Alert, Toggle, Tabs, SearchBar, Modal, Avatar, StatCard } from '../../components/ui';
import { mockSubmissions, mockEmailTemplates, activityLog, mockFraudFlags, mockContributors, mockPayments, mockAssignments, mockScrapedPosts } from '../../data/mockData';

// ─── Activity Log ─────────────────────────────────────────────────────────────
export function ActivityLog() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const filtered = activityLog.filter(a => !search || a.action.toLowerCase().includes(search.toLowerCase()) || a.user.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="animate-fade-in">
      <PageHeader title="Activity Log" subtitle="All admin actions and system events" />
      <Card padding={false}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search actions..." style={{ flex: 1, maxWidth: 280 }} />
          <Select value={typeFilter} onChange={setTypeFilter} options={['word', 'submission', 'assignment', 'payment', 'contributor', 'scraping']} placeholder="All types" />
        </div>
        <div style={{ padding: '8px 0' }}>
          {filtered.map(log => (
            <div key={log.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '12px 20px', borderBottom: '1px solid #F8FAFC' }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <Activity size={14} color="#4F46E5" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 500, fontSize: 13, color: '#0F172A', margin: 0 }}>{log.action}</p>
                <div style={{ display: 'flex', gap: 12, marginTop: 2, fontSize: 11, color: '#94A3B8' }}>
                  <span>{log.user}</span><span>·</span><span>{log.timestamp}</span><span>·</span><span>IP: {log.ip}</span>
                </div>
              </div>
              <Badge variant={log.entityType === 'payment' ? 'success' : 'default'}>{log.entityType}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Add Contributors ─────────────────────────────────────────────────────────
export function AddContributors() {
  const [mode, setMode] = useState('manual');
  const [form, setForm] = useState({ name: '', email: '', country: '', paymentMethod: '' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  return (
    <div className="animate-fade-in">
      <PageHeader title="Add Contributors" subtitle="Manually add or bulk import contributors" />
      <div style={{ marginBottom: 16 }}>
        <Tabs tabs={[{ id: 'manual', label: 'Manual Add' }, { id: 'csv', label: 'CSV Import' }]} active={mode} onChange={setMode} />
      </div>
      {mode === 'manual' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          <Card>
            <CardHeader title="Contributor Details" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Input label="Full Name" value={form.name} onChange={v => set('name', v)} required />
              <Input label="Email Address" type="email" value={form.email} onChange={v => set('email', v)} required />
              <Select label="Country" value={form.country} onChange={v => set('country', v)} options={['India', 'Philippines', 'USA', 'UK', 'Nigeria', 'Mexico', 'Japan', 'Brazil']} required />
              <Select label="Payment Method" value={form.paymentMethod} onChange={v => set('paymentMethod', v)} options={['PayPal', 'Stripe', 'Bank Transfer']} required />
              <Input label="Reddit Username (optional)" value={form.reddit} onChange={v => set('reddit', v)} placeholder="u/username" />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
                <Button variant="secondary">Clear</Button>
                <Button variant="primary">Add Contributor</Button>
              </div>
            </div>
          </Card>
          <Card>
            <CardHeader title="Guidelines" />
            <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.7 }}>
              <p>• Contributors must have Reddit accounts aged 6+ months</p>
              <p>• Minimum 1,000 karma required</p>
              <p>• Payment method verified before first payout</p>
              <p>• Contributors from supported countries only</p>
              <p>• One account per person — duplicates auto-flagged</p>
            </div>
          </Card>
        </div>
      ) : (
        <Card>
          <CardHeader title="CSV Import" subtitle="Upload a CSV file with contributor details" />
          <div style={{ border: '2px dashed #E2E8F0', borderRadius: 16, padding: '48px', textAlign: 'center', background: '#F8FAFC', marginBottom: 16 }}>
            <Upload size={32} color="#94A3B8" style={{ margin: '0 auto 12px' }} />
            <p style={{ fontWeight: 600, color: '#334155', marginBottom: 4 }}>Drop CSV file here or click to browse</p>
            <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 16 }}>Required columns: name, email, country, payment_method</p>
            <Button variant="primary" icon={<Upload size={13} />}>Choose File</Button>
          </div>
          <div style={{ padding: '14px', background: '#EEF2FF', borderRadius: 12, fontSize: 12, color: '#4F46E5' }}>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>CSV Format Example:</p>
            <code style={{ fontFamily: 'monospace', display: 'block', color: '#334155' }}>name,email,country,payment_method,reddit_username<br/>John Doe,john@example.com,India,PayPal,u/johndoe</code>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── Contributor Segmentation ─────────────────────────────────────────────────
export function ContributorSegmentation() {
  const segments = [
    { name: 'Premium Contributors', count: 24, color: '#F59E0B', criteria: 'Quality Score ≥ 90 & Approval Rate ≥ 95%', bg: '#FFFBEB' },
    { name: 'South Asia Cluster', count: 68, color: '#10B981', criteria: 'Country: India, Pakistan, Bangladesh, Sri Lanka', bg: '#ECFDF5' },
    { name: 'High Karma Accounts', count: 41, color: '#4F46E5', criteria: 'Reddit Karma ≥ 10,000', bg: '#EEF2FF' },
    { name: 'New Contributors', count: 15, color: '#64748B', criteria: 'Joined in last 30 days', bg: '#F8FAFC' },
    { name: 'At Risk', count: 8, color: '#EF4444', criteria: 'Approval Rate < 70% or Risk Flagged', bg: '#FEF2F2' },
  ];
  return (
    <div className="animate-fade-in">
      <PageHeader title="Contributor Segmentation" subtitle="Group contributors for targeted assignment" action={<Button variant="primary" icon={<Plus size={14} />}>Create Segment</Button>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {segments.map(s => (
          <Card key={s.name} style={{ borderLeft: `4px solid ${s.color}`, background: s.bg }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15, color: '#0F172A', margin: '0 0 4px' }}>{s.name}</p>
                <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 12px' }}>{s.criteria}</p>
                <p style={{ fontSize: 28, fontWeight: 800, color: s.color, margin: 0 }}>{s.count} <span style={{ fontSize: 13, color: '#94A3B8' }}>contributors</span></p>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <Button variant="ghost" size="sm" icon={<Edit size={12} />}>Edit</Button>
                <Button variant="primary" size="sm">Assign Word</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Contributor Risk Panel ────────────────────────────────────────────────────
export function ContributorRiskPanel() {
  const router = useRouter();
  const flagged = mockContributors.filter(c => c.riskFlag || c.status === 'suspended');
  return (
    <div className="animate-fade-in">
      <PageHeader title="Risk Panel" subtitle="Contributors with flags or suspicious activity" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 20 }}>
        <StatCard title="Risk Flagged" value={mockContributors.filter(c => c.riskFlag).length} icon={<AlertTriangle size={20} />} color="#EF4444" bg="#FEF2F2" />
        <StatCard title="Suspended" value={mockContributors.filter(c => c.status === 'suspended').length} icon={<Ban size={20} />} color="#F59E0B" bg="#FFFBEB" />
        <StatCard title="Under Monitoring" value="3" icon={<Eye size={20} />} color="#3B82F6" bg="#EFF6FF" />
      </div>
      <Card>
        <CardHeader title="Flagged Contributors" />
        {flagged.map(c => (
          <div key={c.id} onClick={() => router.push(`/admin/contributors/${c.id}`)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px', borderRadius: 12, border: '1px solid #FEE2E2', background: '#FEF2F2', marginBottom: 10, cursor: 'pointer' }}>
            <Avatar name={c.name} size={40} color="#EF4444" />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <p style={{ fontWeight: 700, fontSize: 13, color: '#0F172A', margin: 0 }}>{c.name}</p>
                <StatusBadge status={c.status} />
                {c.riskFlag && <Badge variant="danger" dot>Risk Flag</Badge>}
              </div>
              <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{c.country} · Quality: {c.qualityScore} · Approval: {c.approvalRate}%</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              <Button variant="secondary" size="sm" icon={<Eye size={12} />}>Review</Button>
              <Button variant="danger" size="sm" icon={<Ban size={12} />}>Suspend</Button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ─── Pending Verification ─────────────────────────────────────────────────────
export function PendingVerification() {
  const router = useRouter();
  const pending = mockSubmissions.filter(s => s.status === 'pending');
  return (
    <div className="animate-fade-in">
      <PageHeader title="Pending Verification" subtitle={`${pending.length} submissions awaiting review`}
        action={<Button variant="primary" icon={<CheckSquare size={14} />} onClick={() => router.push('/admin/submissions/bulk')}>Bulk Verify</Button>} />
      <Alert type="info" message={`${pending.filter(s => s.wordFound).length} of ${pending.length} have word auto-detected. Auto-verified when confidence ≥ 95%.`} className="mb-4" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
        {pending.map(s => (
          <Card key={s.id} onClick={() => router.push(`/admin/submissions/${s.id}`)} hover>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: s.wordFound ? '#ECFDF5' : '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {s.wordFound ? <Shield size={20} color="#10B981" /> : <AlertTriangle size={20} color="#EF4444" />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>{s.contributor}</span>
                  <span style={{ fontWeight: 800, color: '#4F46E5', fontSize: 13 }}>{s.word}</span>
                  <Badge variant={s.wordFound ? 'success' : 'danger'}>{s.confidence}% match</Badge>
                </div>
                <p style={{ fontSize: 12, color: '#94A3B8', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.url}</p>
                <div style={{ display: 'flex', gap: 12, marginTop: 4, fontSize: 11, color: '#64748B' }}>
                  <span>{s.subreddit}</span><span>·</span><span>↑{s.upvotes} 💬{s.comments}</span><span>·</span><span>{s.submittedAt}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <Button variant="danger" size="sm" onClick={e => e.stopPropagation()}>Reject</Button>
                <Button variant="tertiary" size="sm" onClick={e => e.stopPropagation()}>Approve</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Bulk Verification ────────────────────────────────────────────────────────
export function BulkVerification() {
  const [selected, setSelected] = useState([]);
  const pending = mockSubmissions.filter(s => s.status === 'pending');
  const toggle = (id) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const allAutoPass = pending.filter(s => s.wordFound && s.confidence >= 95);
  return (
    <div className="animate-fade-in">
      <PageHeader title="Bulk Verification" subtitle="Process multiple submissions at once"
        action={<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}><Button variant="secondary" onClick={() => setSelected(allAutoPass.map(s => s.id))}>Select Auto-Pass ({allAutoPass.length})</Button><Button variant="tertiary" disabled={selected.length === 0}>Approve Selected ({selected.length})</Button><Button variant="danger" disabled={selected.length === 0}>Reject Selected ({selected.length})</Button></div>} />
      <Alert type="success" message={`${allAutoPass.length} submissions auto-detected with ≥95% confidence. Recommended for quick approval.`} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
        {pending.map(s => (
          <div key={s.id} onClick={() => toggle(s.id)} style={{ padding: '12px 16px', borderRadius: 14, border: `1.5px solid ${selected.includes(s.id) ? '#4F46E5' : '#E2E8F0'}`, background: selected.includes(s.id) ? '#EEF2FF' : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${selected.includes(s.id) ? '#4F46E5' : '#CBD5E1'}`, background: selected.includes(s.id) ? '#4F46E5' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {selected.includes(s.id) && <span style={{ color: '#fff', fontSize: 12 }}>✓</span>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{s.contributor}</span>
                <Badge variant="primary">{s.word}</Badge>
                <Badge variant={s.wordFound ? 'success' : 'danger'}>{s.confidence}%</Badge>
                {s.wordFound && s.confidence >= 95 && <Badge variant="success">Auto-pass</Badge>}
              </div>
              <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{s.subreddit} · ↑{s.upvotes} · {s.submittedAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Auto Verification Rules ──────────────────────────────────────────────────
export function AutoVerificationRules() {
  const [rules, setRules] = useState([
    { id: 1, name: 'Word Detection Threshold', desc: 'Auto-approve if word found with ≥95% confidence', value: '95', type: 'threshold', active: true },
    { id: 2, name: 'Minimum Upvotes', desc: 'Reject if post has fewer than N upvotes after 24h', value: '0', type: 'threshold', active: false },
    { id: 3, name: 'Spam Detection', desc: 'Flag if post is near-duplicate of existing posts', value: '85', type: 'similarity', active: true },
    { id: 4, name: 'Minimum Word Count', desc: 'Require post to have at least N words', value: '30', type: 'threshold', active: true },
    { id: 5, name: 'Auto-reject Deleted Posts', desc: 'Auto-reject if post URL returns 404', value: 'true', type: 'boolean', active: true },
  ]);
  const toggle = (id) => setRules(p => p.map(r => r.id === id ? { ...r, active: !r.active } : r));
  return (
    <div className="animate-fade-in">
      <PageHeader title="Auto-Verification Rules" subtitle="Configure automated quality checks" action={<Button variant="primary" icon={<Plus size={14} />}>Add Rule</Button>} />
      <Alert type="info" message="Rules run in order when a submission is received. Manual review only required when rules don't auto-decide." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
        {rules.map(rule => (
          <Card key={rule.id}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: rule.active ? '#EEF2FF' : '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Zap size={18} color={rule.active ? '#4F46E5' : '#94A3B8'} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', margin: 0 }}>{rule.name}</h3>
                  <Badge variant={rule.active ? 'success' : 'default'}>{rule.active ? 'Active' : 'Disabled'}</Badge>
                </div>
                <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 8px' }}>{rule.desc}</p>
                {rule.type === 'threshold' && <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: 12, color: '#94A3B8' }}>Threshold:</span><input defaultValue={rule.value} style={{ maxWidth: 60, flex: '1 1 auto', minWidth: 0, padding: '4px 8px', fontSize: 13, border: '1.5px solid #E2E8F0', borderRadius: 8, outline: 'none', fontFamily: 'inherit' }} /></div>}
              </div>
              <Toggle value={rule.active} onChange={() => toggle(rule.id)} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Scraped Content Browser ──────────────────────────────────────────────────
export function ScrapedContentBrowser() {
  const router = useRouter();
  const [wordFilter, setWordFilter] = useState('');
  const posts = mockScrapedPosts || [];
  return (
    <div className="animate-fade-in">
      <PageHeader title="Scraped Content Browser" subtitle={`${posts.length} posts in storage`} action={<Button variant="primary" icon={<Download size={14} />} onClick={() => router.push('/admin/export')}>Export Data</Button>} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        <SearchBar placeholder="Search content..." style={{ flex: 1, maxWidth: 300 }} />
        <Select value={wordFilter} onChange={setWordFilter} options={['blorple', 'frumious', 'plimble']} placeholder="All words" />
        <Button variant="secondary" icon={<Filter size={13} />}>Filter</Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {posts.map(post => (
          <Card key={post.id}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Badge variant="primary">{post.word}</Badge>
                  <span style={{ fontSize: 12, color: '#64748B' }}>{post.subreddit}</span>
                  <span style={{ fontSize: 12, color: '#94A3B8' }}>by {post.author}</span>
                  {post.isDeleted && <Badge variant="danger">Deleted</Badge>}
                </div>
                <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.6, margin: '0 0 8px' }}>{post.text.slice(0, 200)}...</p>
                <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#94A3B8' }}>
                  <span>↑ {post.upvotes}</span><span>💬 {post.comments}</span>
                  <span>📸 Snapshot: {post.snapshotTime}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                <Button variant="ghost" size="sm" icon={<Eye size={12} />}>View</Button>
                <Button variant="ghost" size="sm" icon={<Copy size={12} />}>Copy</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Data Integrity Checker ───────────────────────────────────────────────────
export function DataIntegrityChecker() {
  const issues = [
    { id: 1, type: 'deleted_post', word: 'blorple', url: 'https://reddit.com/...', detected: '2026-03-28', severity: 'warning', note: 'Post deleted by user after verification. Snapshot available.' },
    { id: 2, type: 'missing_metadata', word: 'frumious', url: 'https://reddit.com/...', detected: '2026-03-29', severity: 'low', note: 'Comment count not captured in snapshot.' },
  ];
  return (
    <div className="animate-fade-in">
      <PageHeader title="Data Integrity Checker" subtitle="Identify and resolve data quality issues" action={<Button variant="primary" icon={<RefreshCw size={14} />}>Run Check</Button>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Total Posts', value: '651', color: '#4F46E5' },
          { label: 'Intact', value: '649', color: '#10B981' },
          { label: 'Issues Found', value: issues.length, color: '#F59E0B' },
          { label: 'Snapshots', value: '651', color: '#8B5CF6' },
        ].map(s => <Card key={s.label}><p style={{ fontSize: 24, fontWeight: 800, color: s.color, margin: 0 }}>{s.value}</p><p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>{s.label}</p></Card>)}
      </div>
      <Alert type="success" title="Good news!" message="98.7% data integrity rate. All posts have snapshot backups including metadata." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
        {issues.map(i => (
          <Card key={i.id}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <AlertTriangle size={18} color={i.severity === 'warning' ? '#F59E0B' : '#94A3B8'} style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                  <Badge variant="warning">{i.type.replace('_', ' ')}</Badge>
                  <Badge variant="primary">{i.word}</Badge>
                </div>
                <p style={{ fontSize: 13, color: '#334155', margin: 0 }}>{i.note}</p>
                <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>Detected: {i.detected}</p>
              </div>
              <Button variant="secondary" size="sm">Resolve</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Pending Payments ─────────────────────────────────────────────────────────
export function PendingPayments() {
  const router = useRouter();
  const pending = mockPayments.filter(p => p.status === 'pending');
  const [selected, setSelected] = useState([]);
  const toggle = (id) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const total = pending.filter(p => selected.includes(p.id)).reduce((s, p) => s + p.amount, 0);
  return (
    <div className="animate-fade-in">
      <PageHeader title="Pending Payments" subtitle={`${pending.length} payments · $${pending.reduce((s, p) => s + p.amount, 0)} total`}
        action={<Button variant="primary" icon={<Send size={14} />} disabled={selected.length === 0}>Pay Selected (${total})</Button>} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {pending.map(p => (
          <Card key={p.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div onClick={() => toggle(p.id)} style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${selected.includes(p.id) ? '#4F46E5' : '#CBD5E1'}`, background: selected.includes(p.id) ? '#4F46E5' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                {selected.includes(p.id) && <span style={{ color: '#fff', fontSize: 11 }}>✓</span>}
              </div>
              <Avatar name={p.contributor} size={36} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 13, color: '#0F172A', margin: 0 }}>{p.contributor}</p>
                <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{p.method} · {p.assignments} approved tasks · Created {p.createdAt}</p>
              </div>
              <span style={{ fontWeight: 800, fontSize: 18, color: '#10B981' }}>${p.amount}</span>
              <Button variant="primary" size="sm" icon={<Send size={12} />}>Pay Now</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Platform Settings ────────────────────────────────────────────────────────
export function PlatformSettings() {
  const router = useRouter();
  const [settings, setSettings] = useState({ maxTasksPerUser: '5', paymentDelay: '24', minKarma: '1000', minAccountAge: '6', autoScrape: true, autoVerify: true, emailNotifications: true, requireTwoFactor: false });
  const set = (k, v) => setSettings(p => ({ ...p, [k]: v }));
  return (
    <div className="animate-fade-in">
      <PageHeader title="Platform Settings" subtitle="Global system configuration" action={
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <Button variant="secondary" icon={<Key size={14} />} onClick={() => router.push('/admin/settings/api')}>API Keys</Button>
          <Button variant="secondary" icon={<HardDrive size={14} />} onClick={() => router.push('/admin/settings/storage')}>Storage</Button>
          <Button variant="primary">Save Changes</Button>
        </div>
      } />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
        <Card>
          <CardHeader title="Contributor Limits" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Input label="Max Active Tasks per User" type="number" value={settings.maxTasksPerUser} onChange={v => set('maxTasksPerUser', v)} hint="Maximum concurrent assignments per contributor" />
            <Input label="Minimum Reddit Karma" type="number" value={settings.minKarma} onChange={v => set('minKarma', v)} />
            <Input label="Minimum Account Age (months)" type="number" value={settings.minAccountAge} onChange={v => set('minAccountAge', v)} />
          </div>
        </Card>
        <Card>
          <CardHeader title="Payment Settings" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Input label="Payment Processing Delay (hours)" type="number" value={settings.paymentDelay} onChange={v => set('paymentDelay', v)} hint="Hours after approval before payment is triggered" />
            <Select label="Default Payment Method" options={['PayPal', 'Stripe']} />
            <Input label="Default Payment Amount (USD)" type="number" defaultValue="5" />
          </div>
        </Card>
        <Card>
          <CardHeader title="Automation" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Toggle value={settings.autoScrape} onChange={v => set('autoScrape', v)} label="Auto-scrape on submission" />
            <Toggle value={settings.autoVerify} onChange={v => set('autoVerify', v)} label="Auto-verify high-confidence submissions" />
            <Toggle value={settings.emailNotifications} onChange={v => set('emailNotifications', v)} label="Email notifications enabled" />
            <Toggle value={settings.requireTwoFactor} onChange={v => set('requireTwoFactor', v)} label="Require 2FA for admins" />
          </div>
        </Card>
        <Card>
          <CardHeader title="Allowed Platforms" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[{ name: 'Reddit', active: true }, { name: 'Twitter/X', active: false }, { name: 'Quora', active: false }, { name: 'Facebook Groups', active: false }].map(p => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#334155' }}>{p.name}</span>
                <Toggle value={p.active} onChange={() => {}} label="" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── API Keys ─────────────────────────────────────────────────────────────────
export function ApiKeys() {
  const [showKey, setShowKey] = useState(null);
  const keys = [
    { id: 1, service: 'ScrapingBee', key: 'sb_live_****************************', env: 'production', status: 'active', created: '2026-01-15' },
    { id: 2, service: 'SendGrid', key: 'SG.****************************', env: 'production', status: 'active', created: '2026-01-15' },
    { id: 3, service: 'Stripe', key: 'sk_live_****************************', env: 'production', status: 'active', created: '2026-01-20' },
    { id: 4, service: 'PayPal Payouts', key: 'A21A****************************', env: 'production', status: 'active', created: '2026-01-20' },
    { id: 5, service: 'AWS S3', key: 'AKIA****************************', env: 'production', status: 'active', created: '2026-01-15' },
  ];
  return (
    <div className="animate-fade-in">
      <PageHeader title="API Keys Management" subtitle="External service credentials" action={<Button variant="primary" icon={<Plus size={14} />}>Add API Key</Button>} />
      <Alert type="warning" title="Security Notice" message="API keys are encrypted at rest. Never share these keys. Rotate regularly and after any team member changes." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
        {keys.map(k => (
          <Card key={k.id}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Key size={18} color="#4F46E5" />
              </div>
              <div style={{ flex: '1 1 200px', minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2, flexWrap: 'wrap' }}>
                  <p style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', margin: 0 }}>{k.service}</p>
                  <Badge variant="success">Active</Badge>
                  <Badge variant="default">{k.env}</Badge>
                </div>
                <code style={{ fontSize: 11, color: '#64748B', fontFamily: 'monospace', wordBreak: 'break-all' }}>{showKey === k.id ? k.key : k.key.replace(/[^*]/g, '•')}</code>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <Button variant="ghost" size="sm" icon={<Eye size={12} />} onClick={() => setShowKey(showKey === k.id ? null : k.id)}>Show</Button>
                <Button variant="ghost" size="sm" icon={<Copy size={12} />}>Copy</Button>
                <Button variant="ghost" size="sm" icon={<RefreshCw size={12} />}>Rotate</Button>
                <Button variant="ghost" size="sm" icon={<Trash2 size={12} />} style={{ color: '#EF4444' }}>Delete</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Storage Settings ──────────────────────────────────────────────────────────
export function StorageSettings() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Storage Settings" subtitle="Configure where scraped content is stored" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
        <Card>
          <CardHeader title="Current Storage" icon={<HardDrive size={16} />} />
          {[
            { label: 'Provider', value: 'AWS S3', color: '#F59E0B' },
            { label: 'Bucket', value: 'lexipost-scraped-content', color: '#0F172A' },
            { label: 'Region', value: 'us-east-1', color: '#64748B' },
            { label: 'Total Used', value: '24.8 GB', color: '#4F46E5' },
            { label: 'Files Stored', value: '12,450', color: '#4F46E5' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: 13, color: '#94A3B8' }}>{s.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.value}</span>
            </div>
          ))}
          <div style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: '#64748B' }}>Storage Usage</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#4F46E5' }}>24.8 GB / 100 GB</span>
            </div>
            <div style={{ height: 8, background: '#F1F5F9', borderRadius: 999 }}><div style={{ height: '100%', width: '24.8%', background: '#4F46E5', borderRadius: 999 }} /></div>
          </div>
        </Card>
        <Card>
          <CardHeader title="Storage Configuration" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Select label="Provider" options={['AWS S3', 'Google Cloud Storage', 'Cloudflare R2', 'Local Storage']} defaultValue="AWS S3" />
            <Input label="Bucket Name" defaultValue="lexipost-scraped-content" />
            <Input label="Access Key ID" type="password" defaultValue="AKIAIOSFODNN7EXAMPLE" />
            <Input label="Secret Access Key" type="password" defaultValue="wJalrXUtnFEMI/K7MDENG" />
            <Select label="Region" options={['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1']} defaultValue="us-east-1" />
            <Button variant="primary">Save & Test Connection</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Assignment Detail ────────────────────────────────────────────────────────
export function AssignmentDetail() {
  const router = useRouter();
  const { id } = { id: '1' };
  const assignment = mockAssignments ? mockAssignments[0] : {};
  return (
    <div className="animate-fade-in">
      <PageHeader breadcrumb="Assignments / Detail" title={`Assignment #${assignment.id || 1}`} subtitle={`${assignment.word || 'blorple'} — ${assignment.contributor || 'Rahul Sharma'}`}
        action={<Button variant="secondary" icon={<ArrowLeft size={14} />} onClick={() => router.push('/admin/assignments')}>Back</Button>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        <Card>
          <CardHeader title="Assignment Details" />
          {[
            { label: 'Word', value: assignment.word || 'blorple', color: '#4F46E5', bold: true },
            { label: 'Contributor', value: assignment.contributor || 'Rahul Sharma' },
            { label: 'Subreddit', value: assignment.subreddit || 'r/Showerthoughts' },
            { label: 'Status', comp: <StatusBadge status={assignment.status || 'posted'} /> },
            { label: 'Due Date', value: assignment.dueDate || '2026-04-05' },
            { label: 'Assigned At', value: assignment.assignedAt || '2026-03-28' },
            { label: 'Payment', value: `$${assignment.amount || 5}` },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: 12, color: '#94A3B8' }}>{r.label}</span>
              {r.comp || <span style={{ fontSize: 13, fontWeight: r.bold ? 700 : 500, color: r.color || '#334155' }}>{r.value}</span>}
            </div>
          ))}
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card>
            <CardHeader title="Actions" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button variant="primary" style={{ width: '100%' }}>View Submission</Button>
              <Button variant="secondary" style={{ width: '100%' }}>Reassign</Button>
              <Button variant="warning" style={{ width: '100%' }}>Extend Deadline</Button>
              <Button variant="danger" style={{ width: '100%' }}>Cancel Assignment</Button>
            </div>
          </Card>
          <Card>
            <CardHeader title="Assignment Log" />
            {[
              { event: 'Assignment created', time: assignment.assignedAt || '2026-03-28', color: '#4F46E5' },
              { event: 'Email notification sent', time: '2026-03-28', color: '#10B981' },
              { event: 'Submission received', time: assignment.completedAt || '2026-03-30', color: '#F59E0B' },
            ].map((e, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: e.color, flexShrink: 0, marginTop: 5 }} />
                <div><p style={{ fontSize: 12, fontWeight: 500, color: '#334155', margin: 0 }}>{e.event}</p><p style={{ fontSize: 10, color: '#94A3B8', margin: 0 }}>{e.time}</p></div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
