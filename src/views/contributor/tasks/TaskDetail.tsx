// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, ExternalLink, Copy, Send, CheckCircle, BookOpen, Clock, DollarSign } from 'lucide-react';
import { Card, CardHeader, Button, Input, Badge, Alert, PageHeader, StatusBadge } from '../../../components/ui';
import { mockAssignments, mockWords } from '../../../data/mockData';

export default function TaskDetail() {
  const { id } = useParams();
  const router = useRouter();
  const assignment = mockAssignments.find(a => a.id === parseInt(id)) || mockAssignments[0];
  const word = mockWords.find(w => w.word === assignment.word) || mockWords[0];
  const [url, setUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = () => {
    if (!url.includes('reddit.com')) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  const copyText = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const examplePost = `I had the most intense ${word.word} moment yesterday — [describe your experience]. ${word.word} is the only word that perfectly captures that feeling. Has anyone else felt this?`;

  return (
    <div className="animate-fade-in">
      <style>{`
        @media (max-width: 768px) {
          .task-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <PageHeader
        breadcrumb="My Tasks / Task Detail"
        title={`Task: "${word.word}"`}
        subtitle={`${assignment.subreddit} · Due ${assignment.dueDate}`}
        action={<Button variant="secondary" icon={<ArrowLeft size={14} />} onClick={() => router.push('/portal/tasks')}>Back to Tasks</Button>}
      />

      {submitted && (
        <div style={{ marginBottom: 16 }}>
          <Alert type="success" title="URL submitted successfully!" message="Your submission is now in the verification queue. You'll be notified once it's reviewed, usually within 24 hours." />
        </div>
      )}

      <div className="task-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Left - Word info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
          {/* Word Card */}
          <div style={{ background: 'linear-gradient(135deg, #2d6197, #1a4670)', borderRadius: 20, padding: '24px' }}>
            <p style={{ color: '#d2e4ff', fontSize: 12, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Your assigned word</p>
            <h1 style={{ color: '#fff', fontSize: 36, fontWeight: 900, fontStyle: 'italic', fontFamily: 'serif', margin: '0 0 4px' }}>{word.word}</h1>
            <Badge variant="default" size="md">{word.partOfSpeech}</Badge>
            <p style={{ color: '#d2e4ff', fontSize: 14, lineHeight: 1.7, margin: '16px 0 0' }}>{word.definition}</p>
            {word.exampleUsage && (
              <div style={{ marginTop: 14, padding: '10px 14px', background: '#FFFFFF15', borderRadius: 12, borderLeft: '3px solid #d2e4ff' }}>
                <p style={{ color: '#eef4ff', fontSize: 13, fontStyle: 'italic', margin: 0 }}>"{word.exampleUsage}"</p>
              </div>
            )}
          </div>

          {/* Task Details */}
          <Card>
            <CardHeader title="Task Details" icon={<BookOpen size={16} />} />
            {[
              { label: 'Target subreddits', value: word.subreddits?.join(', ') || assignment.subreddit, color: '#2d6197' },
              { label: 'Due date', value: assignment.dueDate, color: '#F59E0B' },
              { label: 'Payment on approval', value: `$${assignment.amount}`, color: '#10B981' },
              { label: 'Status', comp: <StatusBadge status={submitted ? 'posted' : assignment.status} /> },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #e1e9ee' }}>
                <span style={{ fontSize: 12, color: '#a9b4b9' }}>{r.label}</span>
                {r.comp || <span style={{ fontSize: 13, fontWeight: 600, color: r.color || '#2a3439' }}>{r.value}</span>}
              </div>
            ))}
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader title="Step-by-Step Instructions" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { n: 1, title: 'Open Reddit', desc: 'Go to one of the suggested subreddits listed above.' },
                { n: 2, title: 'Create a new post', desc: `Write a genuine post or comment that uses the word "${word.word}" naturally. Don't force it — make it flow.` },
                { n: 3, title: 'Use the word authentically', desc: `The word should appear at least once, used naturally in context. Min. 50 words in your post.` },
                { n: 4, title: 'Copy the post URL', desc: 'After posting, copy the full URL from your browser address bar.' },
                { n: 5, title: 'Submit the URL below', desc: 'Paste it in the submission form and click Submit.' },
              ].map(step => (
                <div key={step.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: '#2d6197', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{step.n}</span>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontWeight: 700, fontSize: 13, color: '#2a3439', margin: 0 }}>{step.title}</p>
                    <p style={{ fontSize: 12, color: '#566166', margin: 0, lineHeight: 1.5 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right - Submit */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
          {/* Example post */}
          <Card>
            <CardHeader title="Example Post Template" subtitle="Customize this for your own voice" />
            <div style={{ padding: '14px', background: '#f7f9fb', borderRadius: 14, border: '1px solid #e1e9ee', marginBottom: 10 }}>
              <p style={{ fontSize: 13, color: '#2a3439', lineHeight: 1.7, margin: 0 }}>
                {examplePost.split(word.word).map((part, i, arr) => (
                  <span key={i}>{part}{i < arr.length - 1 && <mark style={{ background: '#FDE68A', borderRadius: 3, padding: '0 2px', fontWeight: 700 }}>{word.word}</mark>}</span>
                ))}
              </p>
            </div>
            <Button variant="secondary" size="sm" icon={copied ? <CheckCircle size={12} /> : <Copy size={12} />} onClick={() => copyText(examplePost)} style={{ width: '100%' }}>
              {copied ? 'Copied!' : 'Copy Template'}
            </Button>
          </Card>

          {/* Reddit quick link */}
          <Card>
            <CardHeader title="Open Reddit" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(word.subreddits || [assignment.subreddit]).map(sub => (
                <a key={sub} href={`https://reddit.com/${sub}/submit`} target="_blank" rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 12, background: '#FF450010', border: '1px solid #FF450020', textDecoration: 'none' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#FF4500' }}>{sub}</span>
                  <ExternalLink size={14} color="#FF4500" />
                </a>
              ))}
            </div>
          </Card>

          {/* Submit URL */}
          <Card style={{ border: '2px solid #2d6197' }}>
            <CardHeader title="Submit Your Post URL" icon={<Send size={16} />} />
            {!submitted ? (
              <>
                <div style={{ marginBottom: 14 }}>
                  <Input
                    label="Reddit Post URL"
                    value={url}
                    onChange={setUrl}
                    placeholder="https://reddit.com/r/Showerthoughts/comments/abc123/..."
                    hint="Paste the full URL of your Reddit post"
                    error={url && !url.includes('reddit.com') ? 'Please enter a valid Reddit URL' : ''}
                  />
                </div>
                <Button variant="primary" icon={<Send size={14} />} onClick={handleSubmit} loading={loading} disabled={!url || !url.includes('reddit.com')} style={{ width: '100%' }}>
                  Submit for Verification
                </Button>
                <p style={{ fontSize: 11, color: '#a9b4b9', textAlign: 'center', margin: '10px 0 0' }}>
                  Our system will automatically check if the word appears in your post
                </p>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '8px 0' }}>
                <CheckCircle size={40} color="#10B981" style={{ margin: '0 auto 12px', display: 'block' }} />
                <p style={{ fontWeight: 700, fontSize: 15, color: '#065F46', margin: '0 0 8px' }}>Submitted!</p>
                <p style={{ fontSize: 13, color: '#566166', margin: 0 }}>Under review — you'll be notified within 24h</p>
                <Button variant="outline" size="sm" onClick={() => router.push('/portal/tasks')} style={{ marginTop: 14 }}>Back to Tasks</Button>
              </div>
            )}
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader title="What Happens Next" />
            {[
              { step: 'URL submitted', done: submitted, color: '#2d6197' },
              { step: 'Auto-check runs (word detection)', done: false, color: '#2d6197' },
              { step: 'Admin reviews submission', done: false, color: '#F59E0B' },
              { step: 'Approved → Payment triggered', done: false, color: '#10B981' },
              { step: 'Payment sent within 24h', done: false, color: '#10B981' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: t.done ? '#10B981' : '#f7f9fb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: t.done ? 'none' : '1px solid #e1e9ee' }}>
                  {t.done ? <CheckCircle size={12} color="#fff" /> : <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2d6197', display: 'block' }} />}
                </div>
                <span style={{ fontSize: 12, color: t.done ? '#065F46' : '#566166', fontWeight: t.done ? 600 : 400 }}>{t.step}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
