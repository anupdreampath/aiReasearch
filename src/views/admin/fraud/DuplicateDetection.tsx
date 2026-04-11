// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const duplicates = [
  {
    id: 1,
    submissionA: { contributor: 'Marcus K.', initials: 'MK', isPro: true, snippet: 'The economic impact of digital currencies...' },
    submissionB: { contributor: 'Janet S.', initials: 'JS', isPro: false, snippet: 'Digital currencies: Exploring economic shift...' },
    similarity: 94,
    detectedAt: 'Oct 12, 2:45 PM',
    isHighRisk: true,
  },
  {
    id: 2,
    submissionA: { contributor: 'Aaron L.', initials: 'AL', isPro: false, snippet: 'Semantic shifts in urban architecture...' },
    submissionB: { contributor: 'Riley H.', initials: 'RH', isPro: false, snippet: 'How cities evolve: Semantic architecture...' },
    similarity: 82,
    detectedAt: 'Oct 12, 1:12 PM',
    isHighRisk: false,
  },
  {
    id: 3,
    submissionA: { contributor: 'Elena M.', initials: 'EM', isPro: false, snippet: 'A historical review of sentiment grid...' },
    submissionB: { contributor: 'Archive v2.0', initials: 'Sys', isSystem: true, snippet: 'Sentimental Grid: A complete history...' },
    similarity: 98,
    detectedAt: 'Oct 11, 11:59 PM',
    isHighRisk: true,
  },
];

const stats = [
  { label: 'High Risk Detected', value: '42', trend: '+12%', trendColor: '#9f403d', trendIcon: 'trending_up', borderColor: '#fe8983' },
  { label: 'Total Clearances', value: '1,204', trend: 'Stable', trendColor: '#006b62', trendIcon: 'check', borderColor: '#91feef' },
  { label: 'Review Queue', value: '89', trend: '2h avg', trendColor: '#2d6197', trendIcon: 'timer', borderColor: '#d2e4ff' },
  { label: 'Archive Matches', value: '12.4k', trend: 'Indexed', trendColor: '#566166', trendIcon: 'database', borderColor: '#d5e3fc' },
];

export default function DuplicateDetection() {
  const router = useRouter();
  const [threshold, setThreshold] = useState(85);

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 8, height: 32, background: '#2d6197', borderRadius: 4 }} />
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Duplicate Detection</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f0f4f7', padding: '6px 12px', borderRadius: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Threshold</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                style={{ width: 48, background: 'transparent', border: 'none', fontSize: 14, fontWeight: 700, color: '#2d6197', textAlign: 'right' }}
              />
              <span style={{ fontSize: 14, fontWeight: 700, color: '#2d6197' }}>%</span>
            </div>
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 20px',
            background: '#2d6197',
            color: '#f5f7ff',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            <span style={{ ...ms, fontSize: 20 }}>auto_fix_high</span>
            Bulk Reject All Above
          </button>
        </div>
      </header>

      {/* Info Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 32 }}>
        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, display: 'flex', gap: 16, border: '1px solid rgba(169,180,185,0.1)' }}>
          <div style={{ padding: 12, background: '#d2e4ff', borderRadius: '50%', color: '#1c5489' }}>
            <span style={{ ...ms, fontSize: 24 }}>info</span>
          </div>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: '0 0 8px 0', fontFamily: 'Manrope, sans-serif' }}>How Similarity is Calculated</h3>
            <p style={{ fontSize: 13, color: '#566166', margin: 0, lineHeight: 1.6 }}>
              Our engine uses a multi-vector semantic analysis combined with Jaccard overlap to detect structural and contextual duplicates. High similarity scores (&gt;85%) typically indicate near-verbatim copies or paraphrased content that may violate platform originality guidelines.
            </p>
            <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 500, color: '#566166' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fe8983' }} />
                High Risk (&gt;85%)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 500, color: '#566166' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#006b62' }} />
                Low Risk (&lt; 60%)
              </span>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', height: 140, background: '#2d6197' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(45,97,151,0.8), transparent)', zIndex: 1 }} />
          <div style={{ position: 'absolute', bottom: 24, left: 24, zIndex: 2 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#f5f7ff', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px 0', opacity: 0.8 }}>Scanning status</p>
            <p style={{ fontSize: 24, fontWeight: 800, color: '#f5f7ff', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Live Analysis</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <section style={{ padding: 16, background: '#e8eff3', borderRadius: 12, marginBottom: 32, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', ...ms, fontSize: 18, color: '#566166' }}>search</span>
          <input type="text" placeholder="Search by word or contributor..." style={{ width: '100%', padding: '10px 16px 10px 44px', background: '#ffffff', border: 'none', borderRadius: 8, fontSize: 14 }} />
        </div>
        <select style={{ padding: '10px 16px', background: '#ffffff', border: 'none', borderRadius: 8, fontSize: 14, cursor: 'pointer' }}>
          <option>All Words</option>
          <option>Sentiment</option>
          <option>Analysis</option>
          <option>Prediction</option>
        </select>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#ffffff', padding: '8px 16px', borderRadius: 8 }}>
          <span style={{ ...ms, fontSize: 18, color: '#566166' }}>calendar_today</span>
          <span style={{ fontSize: 14, fontWeight: 500 }}>Last 30 Days</span>
        </div>
        <select style={{ padding: '10px 16px', background: '#ffffff', border: 'none', borderRadius: 8, fontSize: 14, cursor: 'pointer' }}>
          <option>Pending</option>
          <option>Rejected</option>
          <option>Dismissed</option>
        </select>
        <button style={{ padding: 10, background: '#e1e9ee', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#2a3439' }}>
          <span style={{ ...ms, fontSize: 20 }}>tune</span>
        </button>
      </section>

      {/* Table */}
      <div style={{ background: '#ffffff', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(169,180,185,0.1)', marginBottom: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(232,239,243,0.5)' }}>
              {['Submission A', 'Submission B', 'Similarity Score', 'Detected At', 'Actions'].map((h, i) => (
                <th key={h} style={{ padding: '16px 24px', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: i === 4 ? 'right' : 'left' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {duplicates.map((dup, idx) => (
              <tr key={dup.id} style={{ background: idx % 2 === 0 ? 'transparent' : 'rgba(232,239,243,0.2)', borderTop: '1px solid #e8eff3' }}>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#d9e4ea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#566166' }}>
                      {dup.submissionA.initials}
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#2a3439', margin: 0 }}>
                        {dup.submissionA.contributor}
                        {dup.submissionA.isPro && (
                          <span style={{ fontSize: 10, fontWeight: 600, color: '#2d6197', background: '#d2e4ff', padding: '2px 6px', borderRadius: 4, marginLeft: 6 }}>Pro</span>
                        )}
                      </p>
                      <p style={{ fontSize: 12, color: '#566166', margin: '4px 0 0 0', width: 192, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{dup.submissionA.snippet}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: dup.submissionB.isSystem ? '#526074' : '#d9e4ea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: dup.submissionB.isSystem ? '#ffffff' : '#566166' }}>
                      {dup.submissionB.initials}
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#2a3439', margin: 0 }}>{dup.submissionB.contributor}</p>
                      <p style={{ fontSize: 12, color: '#566166', margin: '4px 0 0 0', width: 192, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{dup.submissionB.snippet}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 120 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: dup.isHighRisk ? '#9f403d' : '#2d6197' }}>{dup.similarity}% MATCH</span>
                    </div>
                    <div style={{ height: 6, background: '#e8eff3', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${dup.similarity}%`, background: dup.isHighRisk ? '#fe8983' : '#2d6197', borderRadius: 3 }} />
                    </div>
                  </div>
                </td>
                <td style={{ padding: '20px 24px', fontSize: 14, color: '#566166' }}>{dup.detectedAt}</td>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }} title="Keep A">
                      <span style={{ ...ms, fontSize: 20 }}>check_circle</span>
                    </button>
                    <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }} title="Keep B">
                      <span style={{ ...ms, fontSize: 20 }}>verified_user</span>
                    </button>
                    <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }} title="Reject Both">
                      <span style={{ ...ms, fontSize: 20 }}>cancel</span>
                    </button>
                    <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }} title="Dismiss">
                      <span style={{ ...ms, fontSize: 20 }}>close</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ padding: '16px 24px', background: 'rgba(232,239,243,0.3)', borderTop: '1px solid #e8eff3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 12, color: '#566166', margin: 0 }}>Showing 3 of 124 suspected duplicates</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ padding: '6px 12px', background: '#ffffff', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer', opacity: 0.5 }} disabled>Previous</button>
            <button style={{ padding: '6px 12px', background: '#ffffff', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Next</button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 32 }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ padding: 20, background: '#ffffff', borderRadius: 12, borderLeft: `4px solid ${stat.borderColor}`, border: '1px solid rgba(169,180,185,0.1)' }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px 0' }}>{stat.label}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <h4 style={{ fontSize: 28, fontWeight: 800, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>{stat.value}</h4>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: stat.trendColor }}>
                <span style={{ ...ms, fontSize: 14 }}>{stat.trendIcon}</span>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <button style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: '#2d6197',
        color: '#ffffff',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(45,97,151,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{ ...ms, fontSize: 28 }}>add</span>
      </button>

      {/* Footer */}
      <footer style={{ padding: '24px 0', borderTop: '1px solid #e8eff3', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, fontWeight: 500, color: '#a9b4b9', letterSpacing: '0.05em' }}>
        <div>© 2024 Sentimental Grid. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="#" style={{ color: '#a9b4b9', textDecoration: 'none' }}>System Status</a>
          <a href="#" style={{ color: '#a9b4b9', textDecoration: 'none' }}>Documentation</a>
          <a href="#" style={{ color: '#a9b4b9', textDecoration: 'none' }}>Support</a>
        </div>
      </footer>
    </div>
  );
}
