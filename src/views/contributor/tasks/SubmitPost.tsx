// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Link, CheckSquare, Square, CheckCircle } from 'lucide-react';

const taskData = {
  1: { word: 'Glorbify', definition: 'To make something unnecessarily complex or convoluted' },
  2: { word: 'Snortle', definition: 'A laugh that combines a snort and a chortle' },
  3: { word: 'Vexion', definition: 'A feeling of mild but persistent irritation' },
};

export default function SubmitPost() {
  const router = useRouter();
  const { id } = useParams();
  const task = taskData[id] || taskData[1];

  const [url, setUrl] = useState('');
  const [checks, setChecks] = useState({ wordIncluded: false, directLink: false, postLive: false });
  const [submitted, setSubmitted] = useState(false);
  const [urlError, setUrlError] = useState('');

  const allChecked = Object.values(checks).every(Boolean);
  const canSubmit = url.trim().length > 0 && allChecked;

  const toggleCheck = (key) => setChecks(c => ({ ...c, [key]: !c[key] }));

  const validateUrl = (val) => {
    setUrl(val);
    if (val && !val.startsWith('https://reddit.com/')) {
      setUrlError('URL must start with https://reddit.com/');
    } else {
      setUrlError('');
    }
  };

  const handleSubmit = () => {
    if (!canSubmit || urlError) return;
    setSubmitted(true);
    setTimeout(() => router.push(`/portal/tasks/${id}/status`), 1500);
  };

  if (submitted) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#0F4C81', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <CheckCircle size={36} color="#10B981" />
          </div>
          <h2 style={{ fontWeight: 800, fontSize: 22, color: '#2a3439', margin: '0 0 8px' }}>Submission Received!</h2>
          <p style={{ fontSize: 14, color: '#64748B', margin: 0 }}>Redirecting to your submission status...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <button onClick={() => router.push(`/portal/tasks/${id}`)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: 13, color: '#64748B', cursor: 'pointer', fontFamily: 'inherit' }}>
          <ArrowLeft size={14} /> Back to Task
        </button>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: 20, color: '#2a3439', margin: 0 }}>Submit Your Post</h1>
          <p style={{ fontSize: 12, color: '#94A3B8', margin: '2px 0 0' }}>For task: {task.word}</p>
        </div>
      </div>

      {/* Word reminder */}
      <div style={{ background: 'linear-gradient(135deg, #4338CA, #4F46E5)', borderRadius: 14, padding: '16px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div>
          <p style={{ fontSize: 11, color: '#A5B4FC', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 2px' }}>Word to post</p>
          <p style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>{task.word}</p>
          <p style={{ fontSize: 13, color: '#C7D2FE', margin: 0, fontStyle: 'italic' }}>{task.definition}</p>
        </div>
      </div>

      {/* URL Input */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '24px', marginBottom: 16 }}>
        <label style={{ fontSize: 14, fontWeight: 700, color: '#2a3439', display: 'block', marginBottom: 8 }}>
          Paste your Reddit post URL
        </label>
        <div style={{ position: 'relative' }}>
          <Link size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            type="url"
            value={url}
            onChange={e => validateUrl(e.target.value)}
            placeholder="https://reddit.com/r/subreddit/comments/..."
            style={{ width: '100%', padding: '12px 14px 12px 34px', fontSize: 13, border: `1.5px solid ${urlError ? '#DC2626' : '#E2E8F0'}`, borderRadius: 10, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', color: '#2a3439' }}
            onFocus={e => { if (!urlError) e.target.style.borderColor = '#0F4C81'; }}
            onBlur={e => { if (!urlError) e.target.style.borderColor = '#E2E8F0'; }}
          />
        </div>
        {urlError && <p style={{ fontSize: 11, color: '#DC2626', margin: '6px 0 0' }}>{urlError}</p>}
        <p style={{ fontSize: 11, color: '#94A3B8', margin: '8px 0 0' }}>Must be a direct link to the Reddit post, not a search result or profile page.</p>
      </div>

      {/* Pre-submission checklist */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '24px', marginBottom: 20 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#2a3439', margin: '0 0 16px' }}>Pre-submission checklist</p>
        <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 14px' }}>Please confirm each item before submitting:</p>
        {[
          { key: 'wordIncluded', label: `I included the word "${task.word}" naturally in my post` },
          { key: 'directLink', label: 'This is a direct link to the post (not a profile or search result)' },
          { key: 'postLive', label: 'My post is currently live and publicly visible on Reddit' },
        ].map(item => (
          <div key={item.key}
            onClick={() => toggleCheck(item.key)}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px', marginBottom: 8, borderRadius: 10, border: `1.5px solid ${checks[item.key] ? '#0D9488' : '#E2E8F0'}`, background: checks[item.key] ? '#0F4C81' : '#F8FAFC', cursor: 'pointer', transition: 'all 0.15s' }}>
            {checks[item.key]
              ? <CheckSquare size={18} color="#10B981" style={{ flexShrink: 0, marginTop: 1 }} />
              : <Square size={18} color="#CBD5E1" style={{ flexShrink: 0, marginTop: 1 }} />}
            <span style={{ fontSize: 13, color: checks[item.key] ? '#475569' : '#374151', lineHeight: 1.5 }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit || !!urlError}
        style={{ width: '100%', padding: '14px', background: canSubmit && !urlError ? 'linear-gradient(135deg, #10B981, #059669)' : '#E2E8F0', color: canSubmit && !urlError ? '#fff' : '#94A3B8', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: canSubmit && !urlError ? 'pointer' : 'not-allowed', fontFamily: 'inherit', transition: 'all 0.2s', marginBottom: 10 }}>
        {!canSubmit ? 'Complete the checklist to submit' : 'Submit My Post'}
      </button>
      <p onClick={() => router.push(`/portal/tasks/${id}`)}
        style={{ textAlign: 'center', fontSize: 13, color: '#94A3B8', cursor: 'pointer', margin: 0 }}>
        Cancel — I'll do this later
      </p>
    </div>
  );
}
