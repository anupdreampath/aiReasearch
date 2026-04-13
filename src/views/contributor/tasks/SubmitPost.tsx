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
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#d2e4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <CheckCircle size={36} color="#10B981" />
          </div>
          <h2 style={{ fontWeight: 800, fontSize: 22, color: '#2a3439', margin: '0 0 8px' }}>Submission Received!</h2>
          <p style={{ fontSize: 14, color: '#566166', margin: 0 }}>Redirecting to your submission status...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, width: '100%', margin: '0 auto', padding: '0 16px', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <button onClick={() => router.push(`/portal/tasks/${id}`)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: '#fff', border: '1.5px solid #e1e9ee', borderRadius: 10, fontSize: 13, color: '#566166', cursor: 'pointer', fontFamily: 'inherit' }}>
          <ArrowLeft size={14} /> Back to Task
        </button>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: 20, color: '#2a3439', margin: 0 }}>Submit Your Post</h1>
          <p style={{ fontSize: 12, color: '#717c82', margin: '2px 0 0' }}>For task: {task.word}</p>
        </div>
      </div>

      {/* Word reminder */}
      <div style={{ background: 'linear-gradient(135deg, #2d6197, #1a4670)', borderRadius: 14, padding: '16px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div>
          <p style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.75)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 2px' }}>Word to post</p>
          <p style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>{task.word}</p>
          <p style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.8)', margin: 0, fontStyle: 'italic' }}>{task.definition}</p>
        </div>
      </div>

      {/* URL Input */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e1e9ee', padding: '24px', marginBottom: 16, boxSizing: 'border-box' }}>
        <label style={{ fontSize: 14, fontWeight: 700, color: '#2a3439', display: 'block', marginBottom: 8 }}>
          Paste your Reddit post URL
        </label>
        <div style={{ position: 'relative' }}>
          <Link size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#717c82' }} />
          <input
            type="url"
            value={url}
            onChange={e => validateUrl(e.target.value)}
            placeholder="https://reddit.com/r/subreddit/comments/..."
            style={{ width: '100%', padding: '12px 14px 12px 34px', fontSize: 13, border: `1.5px solid ${urlError ? '#DC2626' : '#e1e9ee'}`, borderRadius: 10, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', color: '#2a3439' }}
            onFocus={e => { if (!urlError) e.target.style.borderColor = '#2d6197'; }}
            onBlur={e => { if (!urlError) e.target.style.borderColor = '#e1e9ee'; }}
          />
        </div>
        {urlError && <p style={{ fontSize: 11, color: '#DC2626', margin: '6px 0 0' }}>{urlError}</p>}
        <p style={{ fontSize: 11, color: '#717c82', margin: '8px 0 0' }}>Must be a direct link to the Reddit post, not a search result or profile page.</p>
      </div>

      {/* Pre-submission checklist */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e1e9ee', padding: '24px', marginBottom: 20, boxSizing: 'border-box' }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#2a3439', margin: '0 0 16px' }}>Pre-submission checklist</p>
        <p style={{ fontSize: 12, color: '#566166', margin: '0 0 14px' }}>Please confirm each item before submitting:</p>
        {[
          { key: 'wordIncluded', label: `I included the word "${task.word}" naturally in my post` },
          { key: 'directLink', label: 'This is a direct link to the post (not a profile or search result)' },
          { key: 'postLive', label: 'My post is currently live and publicly visible on Reddit' },
        ].map(item => (
          <div key={item.key}
            onClick={() => toggleCheck(item.key)}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px', marginBottom: 8, borderRadius: 10, border: `1.5px solid ${checks[item.key] ? '#2d6197' : '#e1e9ee'}`, background: checks[item.key] ? '#eef4ff' : '#F8FAFC', cursor: 'pointer', transition: 'all 0.15s', boxSizing: 'border-box' }}>
            {checks[item.key]
              ? <CheckSquare size={18} color="#10B981" style={{ flexShrink: 0, marginTop: 1 }} />
              : <Square size={18} color="#CBD5E1" style={{ flexShrink: 0, marginTop: 1 }} />}
            <span style={{ fontSize: 13, color: checks[item.key] ? '#2a3439' : '#566166', lineHeight: 1.5 }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit || !!urlError}
        style={{ width: '100%', padding: '14px', background: canSubmit && !urlError ? 'linear-gradient(135deg, #10B981, #059669)' : '#e1e9ee', color: canSubmit && !urlError ? '#fff' : '#717c82', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: canSubmit && !urlError ? 'pointer' : 'not-allowed', fontFamily: 'inherit', transition: 'all 0.2s', marginBottom: 10, boxSizing: 'border-box' }}>
        {!canSubmit ? 'Complete the checklist to submit' : 'Submit My Post'}
      </button>
      <p onClick={() => router.push(`/portal/tasks/${id}`)}
        style={{ textAlign: 'center', fontSize: 13, color: '#717c82', cursor: 'pointer', margin: 0 }}>
        Cancel — I'll do this later
      </p>
    </div>
  );
}
