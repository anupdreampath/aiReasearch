// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle, ExternalLink, User, Clock, AlertTriangle, ChevronRight, ChevronLeft } from 'lucide-react';

const submissions = {
  1: { word: 'Glorbify', definition: 'To make something unnecessarily complex or convoluted', partOfSpeech: 'verb', contributor: 'Rahul S.', email: 'rahul.s@gmail.com', subreddit: 'r/casualconversation', postText: "Had to glorbify my entire project presentation because my manager wanted 'more detail'. Three slides became fifteen. Anyone else's workplace just love to glorbify simple things?", postUrl: 'https://reddit.com/r/casualconversation/abc123', upvotes: 47, comments: 12, postedAt: '2 hours ago', submittedAt: '2 minutes ago', confidence: 94, checks: { wordPresent: true, naturalUse: true, notBot: true, subredditMatch: true, engagementOk: true }, previousApproval: 5, quality: 94 },
  2: { word: 'Snortle', definition: 'A laugh that combines a snort and a chortle', partOfSpeech: 'noun/verb', contributor: 'Priya M.', email: 'priya.m@gmail.com', subreddit: 'r/AskReddit', postText: "I full on snortled at my cat falling off the counter this morning. Couldn't help it — that combination snort-laugh just escaped. Does anyone else snortle at their pets' mishaps?", postUrl: 'https://reddit.com/r/AskReddit/def456', upvotes: 23, comments: 8, postedAt: '8 minutes ago', submittedAt: '8 minutes ago', confidence: 72, checks: { wordPresent: true, naturalUse: true, notBot: true, subredditMatch: true, engagementOk: false }, previousApproval: 3, quality: 88 },
  3: { word: 'Vexion', definition: 'A feeling of mild but persistent irritation', partOfSpeech: 'noun', contributor: 'Carlos R.', email: 'carlos.r@gmail.com', subreddit: 'r/todayilearned', postText: "The vexion of watching someone type with two fingers when there's a keyboard shortcut for everything... TIL about 'input mode inefficiency' — apparently it's a studied phenomenon.", postUrl: 'https://reddit.com/r/todayilearned/ghi789', upvotes: 5, comments: 2, postedAt: '45 minutes ago', submittedAt: '23 minutes ago', confidence: 61, checks: { wordPresent: true, naturalUse: false, notBot: true, subredditMatch: false, engagementOk: false }, previousApproval: 1, quality: 71 },
};

const rejectReasons = [
  'Word not used naturally in context',
  'Word not present in post',
  'Post appears AI-generated',
  'Wrong subreddit for the word',
  'Post removed or deleted by Reddit',
  'Engagement too low (< 5 upvotes)',
  'Word used with incorrect meaning',
  'Other (add note)',
];

export default function ReviewDetail() {
  const router = useRouter();
  const { id } = useParams();
  const sub = submissions[id] || submissions[1];
  const [decision, setDecision] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const ids = Object.keys(submissions).map(Number);
  const currentIndex = ids.indexOf(Number(id) || 1);
  const prevId = ids[currentIndex - 1];
  const nextId = ids[currentIndex + 1];

  const handleSubmit = () => {
    if (!decision) return;
    if (decision === 'reject' && !rejectReason) return;
    setSubmitted(true);
    setTimeout(() => router.push('/reviewer/pending'), 1500);
  };

  const highlightWord = (text, word) => {
    const regex = new RegExp(`(${word.toLowerCase()}|${word}ed|${word}ing|${word}s)`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i} style={{ background: '#FEF08A', padding: '1px 2px', borderRadius: 3, fontWeight: 600 }}>{part}</mark> : part
    );
  };

  if (submitted) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: decision === 'approve' ? '#F0FDF4' : '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            {decision === 'approve' ? <CheckCircle size={32} color="#10B981" /> : <XCircle size={32} color="#EF4444" />}
          </div>
          <p style={{ fontWeight: 700, fontSize: 18, color: '#0F172A', margin: '0 0 6px' }}>
            {decision === 'approve' ? 'Submission Approved' : 'Submission Rejected'}
          </p>
          <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>Loading next submission...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => router.push('/reviewer/pending')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: 13, color: '#64748B', cursor: 'pointer', fontFamily: 'inherit' }}>
            <ArrowLeft size={14} /> Back to Queue
          </button>
          <div>
            <h1 style={{ fontWeight: 800, fontSize: 20, color: '#0F172A', margin: 0 }}>Reviewing: <span style={{ color: '#10B981' }}>{sub.word}</span></h1>
            <p style={{ fontSize: 12, color: '#94A3B8', margin: '2px 0 0' }}>Submitted {sub.submittedAt} · Auto-confidence: {sub.confidence}%</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {prevId && (
            <button onClick={() => router.push(`/reviewer/review/${prevId}`)}
              style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 12px', background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: 12, color: '#64748B', cursor: 'pointer', fontFamily: 'inherit' }}>
              <ChevronLeft size={14} /> Prev
            </button>
          )}
          {nextId && (
            <button onClick={() => router.push(`/reviewer/review/${nextId}`)}
              style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 12px', background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: 12, color: '#64748B', cursor: 'pointer', fontFamily: 'inherit' }}>
              Next <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
        {/* Left: Post Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Auto-check Banner */}
          <div style={{ padding: '14px 18px', borderRadius: 12, background: sub.confidence >= 80 ? '#F0FDF4' : sub.confidence >= 65 ? '#FFFBEB' : '#FEF2F2', border: `1px solid ${sub.confidence >= 80 ? '#BBF7D0' : sub.confidence >= 65 ? '#FDE68A' : '#FECACA'}`, display: 'flex', alignItems: 'center', gap: 12 }}>
            {sub.confidence >= 80 ? <CheckCircle size={18} color="#10B981" /> : <AlertTriangle size={18} color={sub.confidence >= 65 ? '#F59E0B' : '#EF4444'} />}
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, color: sub.confidence >= 80 ? '#065F46' : sub.confidence >= 65 ? '#92400E' : '#991B1B', margin: 0 }}>
                {sub.confidence >= 80 ? `Auto-check passed — ${sub.confidence}% confidence` : sub.confidence >= 65 ? `Auto-check uncertain — ${sub.confidence}% confidence, manual review needed` : `Auto-check flagged — ${sub.confidence}% confidence, likely reject`}
              </p>
              <p style={{ fontSize: 11, color: sub.confidence >= 80 ? '#047857' : sub.confidence >= 65 ? '#B45309' : '#B91C1C', margin: '2px 0 0' }}>
                {Object.values(sub.checks).filter(Boolean).length}/{Object.keys(sub.checks).length} automatic checks passed
              </p>
            </div>
          </div>

          {/* Post Preview */}
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', margin: 0 }}>Reddit Post Preview</p>
                <p style={{ fontSize: 12, color: '#94A3B8', margin: '2px 0 0' }}>{sub.subreddit}</p>
              </div>
              <a href={sub.postUrl} target="_blank" rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#10B981', fontWeight: 600, textDecoration: 'none' }}>
                Open on Reddit <ExternalLink size={12} />
              </a>
            </div>
            <div style={{ padding: '20px' }}>
              {/* Reddit-style card */}
              <div style={{ background: '#F8FAFC', borderRadius: 10, padding: '16px 18px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, #FF6314, #FF4500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 12, color: '#fff', fontWeight: 700 }}>R</span>
                  </div>
                  <span style={{ fontSize: 12, color: '#FF4500', fontWeight: 700 }}>{sub.subreddit}</span>
                  <span style={{ fontSize: 11, color: '#94A3B8' }}>· Posted by u/throwaway_user · {sub.postedAt}</span>
                </div>
                <p style={{ fontSize: 14, color: '#0F172A', lineHeight: 1.65, margin: 0 }}>
                  {highlightWord(sub.postText, sub.word)}
                </p>
                <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                  <span style={{ fontSize: 12, color: '#64748B' }}>▲ {sub.upvotes} upvotes</span>
                  <span style={{ fontSize: 12, color: '#64748B' }}>💬 {sub.comments} comments</span>
                </div>
              </div>
              <p style={{ fontSize: 11, color: '#94A3B8', margin: '10px 0 0' }}>
                Yellow highlight = detected word usage
              </p>
            </div>
          </div>

          {/* Checklist */}
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '20px' }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', margin: '0 0 14px' }}>Automated Checks</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { key: 'wordPresent', label: 'Word is present in the post' },
                { key: 'naturalUse', label: 'Word is used naturally in context' },
                { key: 'notBot', label: 'Post does not appear AI-generated' },
                { key: 'subredditMatch', label: 'Posted to assigned subreddit' },
                { key: 'engagementOk', label: 'Minimum engagement threshold met' },
              ].map(c => (
                <div key={c.key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {sub.checks[c.key]
                    ? <CheckCircle size={16} color="#10B981" />
                    : <XCircle size={16} color="#EF4444" />}
                  <span style={{ fontSize: 13, color: sub.checks[c.key] ? '#374151' : '#6B7280', textDecoration: sub.checks[c.key] ? 'none' : 'line-through' }}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Decision Panel */}
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '20px' }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', margin: '0 0 14px' }}>Your Decision</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              <button onClick={() => setDecision('approve')}
                style={{ padding: '14px', borderRadius: 12, border: `2px solid ${decision === 'approve' ? '#10B981' : '#E2E8F0'}`, background: decision === 'approve' ? '#F0FDF4' : '#fff', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14, fontWeight: 700, color: decision === 'approve' ? '#065F46' : '#374151', transition: 'all 0.15s' }}>
                <CheckCircle size={18} color={decision === 'approve' ? '#10B981' : '#94A3B8'} /> Approve
              </button>
              <button onClick={() => setDecision('reject')}
                style={{ padding: '14px', borderRadius: 12, border: `2px solid ${decision === 'reject' ? '#EF4444' : '#E2E8F0'}`, background: decision === 'reject' ? '#FEF2F2' : '#fff', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14, fontWeight: 700, color: decision === 'reject' ? '#991B1B' : '#374151', transition: 'all 0.15s' }}>
                <XCircle size={18} color={decision === 'reject' ? '#EF4444' : '#94A3B8'} /> Reject
              </button>
            </div>

            {decision === 'reject' && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Rejection Reason *</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {rejectReasons.map(r => (
                    <label key={r} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: rejectReason === r ? '#0F172A' : '#64748B' }}>
                      <input type="radio" name="reason" value={r} checked={rejectReason === r} onChange={() => setRejectReason(r)}
                        style={{ accentColor: '#EF4444' }} />
                      {r}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Internal Note (optional)</label>
              <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Add a note for your records..."
                style={{ width: '100%', padding: '10px 12px', fontSize: 13, border: '1.5px solid #E2E8F0', borderRadius: 10, fontFamily: 'inherit', outline: 'none', resize: 'vertical', minHeight: 70, boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#10B981'}
                onBlur={e => e.target.style.borderColor = '#E2E8F0'} />
            </div>

            <button onClick={handleSubmit}
              disabled={!decision || (decision === 'reject' && !rejectReason)}
              style={{ width: '100%', padding: '12px', background: !decision || (decision === 'reject' && !rejectReason) ? '#E2E8F0' : decision === 'approve' ? '#10B981' : '#EF4444', color: !decision || (decision === 'reject' && !rejectReason) ? '#94A3B8' : '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: !decision || (decision === 'reject' && !rejectReason) ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
              {decision === 'approve' ? 'Confirm Approval' : decision === 'reject' ? 'Confirm Rejection' : 'Select a Decision'}
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Word Info */}
          <div style={{ background: 'linear-gradient(135deg, #064E3B, #065F46)', borderRadius: 14, padding: '18px 20px', color: '#fff' }}>
            <p style={{ fontSize: 10, color: '#6EE7B7', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px' }}>Word to Find</p>
            <p style={{ fontSize: 24, fontWeight: 800, margin: '0 0 6px' }}>{sub.word}</p>
            <p style={{ fontSize: 11, color: '#A7F3D0', margin: '0 0 10px', fontStyle: 'italic' }}>{sub.partOfSpeech}</p>
            <p style={{ fontSize: 13, color: '#D1FAE5', margin: 0, lineHeight: 1.5 }}>{sub.definition}</p>
          </div>

          {/* Contributor Info */}
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '18px 20px' }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: '#0F172A', margin: '0 0 12px' }}>Contributor</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #10B981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={16} color="#fff" />
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, color: '#0F172A', margin: 0 }}>{sub.contributor}</p>
                <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{sub.email}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { label: 'Quality Score', val: `${sub.quality}%`, color: '#10B981' },
                { label: 'Past Approvals', val: sub.previousApproval, color: '#6366F1' },
              ].map(s => (
                <div key={s.label} style={{ padding: '10px', background: '#F8FAFC', borderRadius: 8, textAlign: 'center' }}>
                  <p style={{ fontSize: 16, fontWeight: 800, color: s.color, margin: 0 }}>{s.val}</p>
                  <p style={{ fontSize: 10, color: '#94A3B8', margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Submission Info */}
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '18px 20px' }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: '#0F172A', margin: '0 0 12px' }}>Submission Details</p>
            {[
              { label: 'Submitted', val: sub.submittedAt },
              { label: 'Post Age', val: sub.postedAt },
              { label: 'Upvotes', val: sub.upvotes },
              { label: 'Comments', val: sub.comments },
              { label: 'Subreddit', val: sub.subreddit },
              { label: 'Auto Score', val: `${sub.confidence}%` },
            ].map(d => (
              <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #F8FAFC' }}>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>{d.label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{d.val}</span>
              </div>
            ))}
          </div>

          {/* Queue Position */}
          <div style={{ background: '#F8FAFC', borderRadius: 14, border: '1px solid #E2E8F0', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Clock size={16} color="#94A3B8" />
            <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>
              Submission <strong>{currentIndex + 1}</strong> of <strong>{ids.length}</strong> in your queue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
