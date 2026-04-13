// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle, ExternalLink, Copy, RefreshCw, Shield } from 'lucide-react';
import { Card, CardHeader, Button, Badge, StatusBadge, PageHeader, Alert, Input } from '../../../components/ui';
import { mockSubmissions } from '../../../data/mockData';

export default function SubmissionDetail() {
  const { id } = useParams();
  const router = useRouter();
  const sub = mockSubmissions.find(s => s.id === parseInt(id)) || mockSubmissions[0];
  const [decision, setDecision] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [processing, setProcessing] = useState(false);

  const handle = (action) => {
    setProcessing(true);
    setDecision(action);
    setTimeout(() => { setProcessing(false); router.push('/admin/submissions/pending'); }, 1200);
  };

  const postText = sub.word === 'blorple'
    ? `Has anyone else experienced that blorple feeling when you find a $20 bill in an old jacket? I had the most intense blorple moment this morning - found my old college ID with a $20 behind it. That mix of surprise and pure joy is exactly what blorple means to me. Made my entire Monday worthwhile!`
    : `I was absolutely ${sub.word} when my coworker took credit for my project in the meeting. There's literally no other word for that specific feeling - that combination of fury and disbelief. Has anyone else experienced this? How do you handle it professionally?`;

  return (
    <div className="animate-fade-in">
      <PageHeader
        breadcrumb="Submissions / Detail"
        title={`Submission #${sub.id}`}
        subtitle={`${sub.contributor} · ${sub.subreddit} · ${sub.submittedAt}`}
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="secondary" icon={<ArrowLeft size={14} />} onClick={() => router.push('/admin/submissions/pending')}>Back</Button>
            {sub.status === 'pending' && (
              <>
                <Button variant="danger" icon={<XCircle size={14} />} onClick={() => handle('rejected')} loading={processing && decision === 'rejected'}>Reject</Button>
                <Button variant="tertiary" icon={<CheckCircle size={14} />} onClick={() => handle('approved')} loading={processing && decision === 'approved'}>Approve</Button>
              </>
            )}
          </div>
        }
      />

      {decision && <div style={{ marginBottom: 16 }}><Alert type={decision === 'approved' ? 'success' : 'danger'} title={decision === 'approved' ? 'Submission approved! Payment queued.' : 'Submission rejected. Contributor notified.'} message="Redirecting to queue..." /></div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {/* Main */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Auto-check result */}
          <div style={{ padding: '16px 20px', borderRadius: 16, background: sub.wordFound ? '#ECFDF5' : '#FEF2F2', border: `1.5px solid ${sub.wordFound ? '#A7F3D0' : '#FECACA'}`, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: sub.wordFound ? '#10B981' : '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {sub.wordFound ? <CheckCircle size={24} color="#fff" /> : <XCircle size={24} color="#fff" />}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: 15, color: sub.wordFound ? '#065F46' : '#991B1B', margin: 0 }}>{sub.wordFound ? '✓ Word detected in post' : '✗ Word NOT found in post'}</p>
              <p style={{ fontSize: 13, color: sub.wordFound ? '#059669' : '#DC2626', margin: 0 }}>Auto-detection confidence: <strong>{sub.confidence}%</strong></p>
            </div>
            <Badge variant={sub.wordFound ? 'success' : 'danger'} size="md">{sub.confidence}% match</Badge>
          </div>

          {/* Post Preview */}
          <Card>
            <CardHeader title="Post Preview" subtitle="Scraped content from Reddit" action={
              <a href={sub.url} target="_blank" rel="noreferrer">
                <Button variant="ghost" size="sm" icon={<ExternalLink size={12} />}>Open in Reddit</Button>
              </a>
            } />
            <div style={{ background: '#F8FAFC', borderRadius: 14, padding: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#FF4500', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>R</span>
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 13, color: '#0F172A', margin: 0 }}>{sub.subreddit}</p>
                  <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>Posted by u/{sub.contributor.toLowerCase().replace(' ', '_')}</p>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, fontSize: 12, color: '#64748B' }}>
                  <span>↑ {sub.upvotes}</span>
                  <span>💬 {sub.comments}</span>
                </div>
              </div>
              <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.7, margin: 0 }}>
                {postText.split(sub.word).map((part, i, arr) => (
                  <span key={i}>{part}{i < arr.length - 1 && <mark style={{ background: '#FDE68A', borderRadius: 3, padding: '0 2px', fontWeight: 700 }}>{sub.word}</mark>}</span>
                ))}
              </p>
              <div style={{ marginTop: 12, fontSize: 11, color: '#94A3B8' }}>
                <span style={{ fontFamily: 'monospace', background: '#F1F5F9', padding: '2px 6px', borderRadius: 4 }}>{sub.url}</span>
              </div>
            </div>
          </Card>

          {/* Reject form */}
          {sub.status === 'pending' && (
            <Card>
              <CardHeader title="Rejection Reason (if rejecting)" subtitle="Optional — helps contributor improve" />
              <Select value={rejectReason} onChange={setRejectReason} options={[
                { value: 'word_not_found', label: 'Word not found in post' },
                { value: 'low_effort', label: 'Low-effort content' },
                { value: 'wrong_subreddit', label: 'Wrong subreddit' },
                { value: 'off_topic', label: 'Post is off-topic' },
                { value: 'spam', label: 'Appears to be spam' },
                { value: 'deleted', label: 'Post was already deleted' },
              ]} placeholder="Select reason..." />
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <CardHeader title="Submission Info" />
            {[
              { label: 'Contributor', value: sub.contributor },
              { label: 'Word', value: sub.word, color: '#4F46E5', bold: true },
              { label: 'Platform', value: 'Reddit' },
              { label: 'Subreddit', value: sub.subreddit },
              { label: 'Submitted', value: sub.submittedAt },
              { label: 'Upvotes', value: sub.upvotes.toString() },
              { label: 'Comments', value: sub.comments.toString() },
              { label: 'Status', value: null, component: <StatusBadge status={sub.status} /> },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>{r.label}</span>
                {r.component || <span style={{ fontSize: 13, fontWeight: r.bold ? 700 : 500, color: r.color || '#334155' }}>{r.value}</span>}
              </div>
            ))}
          </Card>

          <Card>
            <CardHeader title="Contributor Stats" />
            {[
              { label: 'Approval Rate', value: '97%', color: '#10B981' },
              { label: 'Total Tasks', value: '48', color: '#4F46E5' },
              { label: 'Quality Score', value: '94/100', color: '#F59E0B' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>{s.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.value}</span>
              </div>
            ))}
          </Card>

          <Card>
            <CardHeader title="Auto-Verification" icon={<Shield size={16} />} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { check: 'Word found in post', passed: sub.wordFound },
                { check: 'Post URL is valid', passed: true },
                { check: 'Correct platform', passed: true },
                { check: 'Not duplicate URL', passed: true },
                { check: 'Minimum word count (50+)', passed: true },
                { check: 'Spam check', passed: true },
              ].map(c => (
                <div key={c.check} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {c.passed ? <CheckCircle size={14} color="#10B981" /> : <XCircle size={14} color="#EF4444" />}
                  <span style={{ fontSize: 12, color: c.passed ? '#334155' : '#DC2626' }}>{c.check}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
