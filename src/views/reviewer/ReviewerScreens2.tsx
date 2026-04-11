// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, AlertTriangle, Search, Info, ExternalLink, Flag, Eye } from 'lucide-react';

// Shared mock submissions (same as ReviewerScreens.jsx but extended)
const allSubs = [
  { id: 1, word: 'Glorbify', contributor: 'Rahul S.', subreddit: 'r/casualconversation', confidence: 94, submittedAt: '2m ago', upvotes: 47, postTitle: 'Had to glorbify my entire presentation...', flagReason: null },
  { id: 2, word: 'Snortle', contributor: 'Priya M.', subreddit: 'r/AskReddit', confidence: 72, submittedAt: '8m ago', upvotes: 23, postTitle: 'I full on snortled at my cat this morning', flagReason: null },
  { id: 3, word: 'Vexion', contributor: 'Carlos R.', subreddit: 'r/todayilearned', confidence: 61, submittedAt: '23m ago', upvotes: 5, postTitle: 'The vexion of watching someone type with two fingers', flagReason: 'Word Not Found' },
  { id: 4, word: 'Flumph', contributor: 'Aisha K.', subreddit: 'r/Showerthoughts', confidence: 88, submittedAt: '31m ago', upvotes: 34, postTitle: 'Sometimes life just flumphs you unexpectedly', flagReason: null },
  { id: 5, word: 'Zemble', contributor: 'Tom H.', subreddit: 'r/LifeProTips', confidence: 55, submittedAt: '45m ago', upvotes: 9, postTitle: 'LPT: Don\'t zemble your finances by ignoring small fees', flagReason: 'Suspicious URL' },
  { id: 6, word: 'Crumbit', contributor: 'Mei L.', subreddit: 'r/tifu', confidence: 79, submittedAt: '1h ago', upvotes: 61, postTitle: 'TIFU by crumbiting my boss on a company call', flagReason: 'Duplicate' },
];

function ConfBadge({ val }) {
  const c = val >= 80 ? '#10B981' : val >= 65 ? '#F59E0B' : '#EF4444';
  const bg = val >= 80 ? '#F0FDF4' : val >= 65 ? '#FFFBEB' : '#FEF2F2';
  return <span style={{ fontSize: 11, fontWeight: 700, color: c, background: bg, padding: '2px 8px', borderRadius: 20 }}>{val}%</span>;
}

const flagColors = {
  'Word Not Found': ['#EF4444', '#FEF2F2'],
  'Suspicious URL': ['#F59E0B', '#FFFBEB'],
  'Duplicate': ['#6366F1', '#EEF2FF'],
  'Spam': ['#EF4444', '#FEF2F2'],
  'Short Post': ['#64748B', '#F8FAFC'],
};

// ── R4 — Reviewer Bulk Verify ─────────────────────────────────────────────────
export function ReviewerBulkVerify() {
  const router = useRouter();
  const [decisions, setDecisions] = useState({});
  const [selected, setSelected] = useState(new Set());

  const decide = (id, action) => setDecisions(d => ({ ...d, [id]: action }));
  const toggleSelect = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };
  const bulkAction = (action) => {
    const updates = {};
    selected.forEach(id => { updates[id] = action; });
    setDecisions(d => ({ ...d, ...updates }));
    setSelected(new Set());
  };

  const undecided = allSubs.filter(s => !decisions[s.id]);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: 22, color: '#0F172A', margin: '0 0 4px' }}>Bulk Verify</h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>{undecided.length} submissions remaining · {Object.keys(decisions).length} decided</p>
        </div>
        {selected.size > 0 && (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => bulkAction('approve')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: '#10B981', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              <CheckCircle size={15} /> Approve {selected.size}
            </button>
            <button onClick={() => bulkAction('reject')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: '#EF4444', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              <XCircle size={15} /> Reject {selected.size}
            </button>
          </div>
        )}
      </div>

      {/* Keyboard shortcuts bar */}
      <div style={{ display: 'flex', gap: 12, padding: '10px 16px', background: '#0F172A', borderRadius: 10, marginBottom: 20 }}>
        <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>Keyboard shortcuts:</p>
        {[['A', 'Approve'], ['R', 'Reject'], ['Space', 'View Full'], ['↑↓', 'Navigate']].map(([k, l]) => (
          <span key={k} style={{ fontSize: 11, color: '#CBD5E1' }}>
            <span style={{ background: '#1E293B', padding: '2px 6px', borderRadius: 4, fontWeight: 700, color: '#fff' }}>{k}</span> {l}
          </span>
        ))}
      </div>

      {/* Card Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {allSubs.map(sub => {
          const dec = decisions[sub.id];
          const isSel = selected.has(sub.id);
          return (
            <div key={sub.id}
              style={{ background: '#fff', borderRadius: 14, border: `2px solid ${dec === 'approve' ? '#10B981' : dec === 'reject' ? '#EF4444' : isSel ? '#4F46E5' : '#E2E8F0'}`, padding: '18px', position: 'relative', opacity: dec ? 0.7 : 1, transition: 'all 0.15s' }}>
              {/* Checkbox + Decision badge */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <input type="checkbox" checked={isSel} onChange={() => toggleSelect(sub.id)}
                  style={{ accentColor: '#4F46E5', width: 14, height: 14, cursor: 'pointer', marginTop: 2 }} />
                {dec && (
                  <span style={{ fontSize: 11, fontWeight: 700, color: dec === 'approve' ? '#10B981' : '#EF4444', background: dec === 'approve' ? '#F0FDF4' : '#FEF2F2', padding: '2px 8px', borderRadius: 20 }}>
                    {dec === 'approve' ? '✓ Approved' : '✗ Rejected'}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>{sub.word}</span>
                <span style={{ fontSize: 11, color: '#64748B', background: '#F1F5F9', padding: '2px 8px', borderRadius: 20 }}>{sub.subreddit}</span>
              </div>
              <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 4px' }}>by {sub.contributor} · {sub.submittedAt}</p>
              <p style={{ fontSize: 12, color: '#374151', margin: '0 0 12px', fontStyle: 'italic' }}>"{sub.postTitle}"</p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <ConfBadge val={sub.confidence} />
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => router.push(`/reviewer/review/${sub.id}`)}
                    style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 10px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 7, color: '#64748B', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
                    <Eye size={12} /> View
                  </button>
                  <button onClick={() => decide(sub.id, 'approve')}
                    style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 10px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 7, color: '#10B981', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                    <CheckCircle size={12} /> Approve
                  </button>
                  <button onClick={() => decide(sub.id, 'reject')}
                    style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 10px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 7, color: '#EF4444', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                    <XCircle size={12} /> Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── R5 — Flagged Submissions ──────────────────────────────────────────────────
const flagged = allSubs.filter(s => s.flagReason);

export function FlaggedSubmissions() {
  const router = useRouter();
  const [reasonFilter, setReasonFilter] = useState('all');
  const [overrideModal, setOverrideModal] = useState(null);

  const reasons = ['all', ...new Set(flagged.map(s => s.flagReason))];
  const filtered = flagged.filter(s => reasonFilter === 'all' || s.flagReason === reasonFilter);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: 22, color: '#0F172A', margin: '0 0 4px' }}>Flagged Submissions</h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>{filtered.length} flagged submissions requiring action</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {reasons.map(r => {
            const [c, bg] = r !== 'all' ? (flagColors[r] || ['#94A3B8', '#F8FAFC']) : ['#374151', '#F1F5F9'];
            return (
              <button key={r} onClick={() => setReasonFilter(r)}
                style={{ padding: '7px 14px', borderRadius: 9, border: `1.5px solid ${reasonFilter === r ? c : '#E2E8F0'}`, background: reasonFilter === r ? bg : '#fff', color: reasonFilter === r ? c : '#64748B', fontSize: 12, fontWeight: reasonFilter === r ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize' }}>
                {r === 'all' ? 'All Flags' : r}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(sub => {
          const [flagColor, flagBg] = flagColors[sub.flagReason] || ['#94A3B8', '#F8FAFC'];
          return (
            <div key={sub.id} style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
              {/* Flag Banner */}
              <div style={{ padding: '10px 18px', background: flagBg, borderBottom: `2px solid ${flagColor}30`, display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertTriangle size={14} color={flagColor} />
                <span style={{ fontSize: 12, fontWeight: 700, color: flagColor }}>Flagged: {sub.flagReason}</span>
              </div>
              {/* Card Body */}
              <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: '#0F172A' }}>{sub.word}</span>
                    <span style={{ fontSize: 11, color: '#64748B', background: '#F1F5F9', padding: '2px 8px', borderRadius: 20 }}>{sub.subreddit}</span>
                  </div>
                  <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 4px' }}>by {sub.contributor} · {sub.submittedAt}</p>
                  <p style={{ fontSize: 12, color: '#374151', margin: 0, fontStyle: 'italic' }}>"{sub.postTitle}"</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ConfBadge val={sub.confidence} />
                  <button onClick={() => router.push(`/reviewer/review/${sub.id}`)}
                    style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, color: '#64748B', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
                    <Eye size={12} /> View
                  </button>
                  <button onClick={() => setOverrideModal(sub)}
                    style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, color: '#B45309', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                    <Flag size={12} /> Override Approve
                  </button>
                  <button
                    style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, color: '#EF4444', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                    <XCircle size={12} /> Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Override Confirmation Modal */}
      {overrideModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, maxWidth: 420, width: '100%', margin: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={18} color="#F59E0B" />
              </div>
              <p style={{ fontWeight: 700, fontSize: 16, color: '#0F172A', margin: 0 }}>Override Approval?</p>
            </div>
            <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 20px', lineHeight: 1.6 }}>
              You are approving <strong style={{ color: '#0F172A' }}>{overrideModal.word}</strong> by {overrideModal.contributor}, which was flagged for <strong style={{ color: '#EF4444' }}>{overrideModal.flagReason}</strong>. This action will be logged to your activity record.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button onClick={() => setOverrideModal(null)}
                style={{ padding: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 13, color: '#64748B', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
                Cancel
              </button>
              <button onClick={() => setOverrideModal(null)}
                style={{ padding: '10px', background: '#F59E0B', border: 'none', borderRadius: 10, fontSize: 13, color: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700 }}>
                Confirm Override
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── R6 — Reviewer Duplicate Detection (read-only) ─────────────────────────────
const dupPairs = [
  { id: 1, a: { contributor: 'Carlos R.', title: 'The vexion of watching someone type with two fingers...' }, b: { contributor: 'Pham T.', title: 'The vexion of watching someone type slowly with two fingers...' }, similarity: 94, detectedAt: '2h ago' },
  { id: 2, a: { contributor: 'Tom H.', title: 'LPT: Don\'t zemble your finances by ignoring small fees' }, b: { contributor: 'Nia W.', title: 'LPT: Never zemble your finances by ignoring small fees monthly' }, similarity: 88, detectedAt: '4h ago' },
  { id: 3, a: { contributor: 'Aisha K.', title: 'Sometimes life just flumphs you unexpectedly' }, b: { contributor: 'Sam K.', title: 'Life just flumphs you sometimes when you least expect it' }, similarity: 76, detectedAt: '6h ago' },
];

export function ReviewerDuplicates() {
  return (
    <div>
      <div style={{ marginBottom: 16, padding: '12px 16px', background: '#EEF2FF', borderRadius: 10, border: '1px solid #C7D2FE', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        <Info size={15} color="#4F46E5" style={{ marginTop: 1, flexShrink: 0 }} />
        <p style={{ fontSize: 12, color: '#3730A3', margin: 0, lineHeight: 1.5 }}>
          <strong>Read-only view.</strong> You can flag pairs for admin review. Direct rejection is managed by admins. Contact your admin to take action on duplicates.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: 22, color: '#0F172A', margin: '0 0 4px' }}>Duplicate Detection</h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>Similarity threshold: 85% · {dupPairs.filter(p => p.similarity >= 85).length} pairs above threshold</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {dupPairs.map(pair => (
          <div key={pair.id} style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: pair.similarity >= 85 ? '#EF4444' : '#F59E0B' }}>
                  {pair.similarity}% similar
                </span>
                <div style={{ width: 120, height: 6, background: '#F1F5F9', borderRadius: 3 }}>
                  <div style={{ height: 6, width: `${pair.similarity}%`, background: pair.similarity >= 85 ? '#EF4444' : '#F59E0B', borderRadius: 3 }} />
                </div>
                {pair.similarity >= 85 && <span style={{ fontSize: 10, fontWeight: 700, color: '#EF4444', background: '#FEF2F2', padding: '2px 6px', borderRadius: 20 }}>Above threshold</span>}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ fontSize: 11, color: '#94A3B8' }}>{pair.detectedAt}</span>
                <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, color: '#EF4444', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                  <Flag size={12} /> Flag for Admin
                </button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[{ label: 'Submission A', ...pair.a }, { label: 'Submission B', ...pair.b }].map(s => (
                <div key={s.label} style={{ padding: '12px 14px', background: '#F8FAFC', borderRadius: 10 }}>
                  <p style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 4px' }}>{s.label}</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', margin: '0 0 2px' }}>{s.contributor}</p>
                  <p style={{ fontSize: 12, color: '#64748B', margin: 0, fontStyle: 'italic' }}>"{s.title}"</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── R7 — Reviewer Auto-Verify Rules (read-only) ───────────────────────────────
const rules = [
  { id: 1, name: 'Word Detection Check', type: 'Word Detection', config: 'Word must appear at least once in post body', weight: 40, lastTriggered: '2 minutes ago', active: true },
  { id: 2, name: 'Spam Score Filter', type: 'Spam Check', config: 'Spam score must be below 30/100', weight: 25, lastTriggered: '5 minutes ago', active: true },
  { id: 3, name: 'Duplicate Post Check', type: 'Duplicate Check', config: 'Similarity with existing posts < 85%', weight: 20, lastTriggered: '1 hour ago', active: true },
  { id: 4, name: 'Minimum Length Filter', type: 'Length Check', config: 'Post body must be at least 50 characters', weight: 15, lastTriggered: '30 minutes ago', active: true },
];

const typeColors = { 'Word Detection': '#10B981', 'Spam Check': '#EF4444', 'Duplicate Check': '#6366F1', 'Length Check': '#F59E0B' };

export function ReviewerAutoVerifyRules() {
  return (
    <div>
      <div style={{ marginBottom: 16, padding: '12px 16px', background: '#FEF9C3', borderRadius: 10, border: '1px solid #FDE047', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        <Info size={15} color="#854D0E" style={{ marginTop: 1, flexShrink: 0 }} />
        <p style={{ fontSize: 12, color: '#713F12', margin: 0, lineHeight: 1.5 }}>
          <strong>These rules are managed by admins.</strong> This is a read-only view. Contact your admin to request changes to auto-verification rules.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: 22, color: '#0F172A', margin: '0 0 4px' }}>Auto-Verify Rules</h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>Rules run in order. Combined confidence score determines auto-approval.</p>
        </div>
      </div>

      {/* Threshold card */}
      <div style={{ background: '#fff', borderRadius: 14, border: '2px solid #E2E8F0', padding: '18px 20px', marginBottom: 16 }}>
        <p style={{ fontSize: 12, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>Auto-Approve Threshold</p>
        <p style={{ fontSize: 24, fontWeight: 800, color: '#4F46E5', margin: 0 }}>≥ 80% confidence</p>
        <p style={{ fontSize: 12, color: '#64748B', margin: '4px 0 0' }}>Submissions above this score are auto-approved without manual review</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {rules.map((rule, i) => {
          const tc = typeColors[rule.type] || '#94A3B8';
          return (
            <div key={rule.id} style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '18px 20px', opacity: rule.active ? 1 : 0.6 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>Rule {i + 1}</span>
                    <p style={{ fontWeight: 700, fontSize: 15, color: '#0F172A', margin: 0 }}>{rule.name}</p>
                    <span style={{ fontSize: 11, fontWeight: 600, color: tc, background: `${tc}20`, padding: '2px 8px', borderRadius: 20 }}>{rule.type}</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 8px' }}>{rule.config}</p>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <span style={{ fontSize: 11, color: '#94A3B8' }}>Confidence weight: <strong style={{ color: '#374151' }}>{rule.weight}%</strong></span>
                    <span style={{ fontSize: 11, color: '#94A3B8' }}>Last triggered: <strong style={{ color: '#374151' }}>{rule.lastTriggered}</strong></span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: rule.active ? '#10B981' : '#94A3B8', background: rule.active ? '#F0FDF4' : '#F8FAFC', padding: '3px 8px', borderRadius: 20 }}>
                    {rule.active ? 'Active' : 'Inactive'}
                  </span>
                  <span style={{ fontSize: 11, color: '#94A3B8', fontStyle: 'italic' }}>Read-only</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
