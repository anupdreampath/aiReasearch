'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const mockChecks = [
  {
    id: 1,
    name: 'Schema Validation',
    description: 'Verify all JSON schemas match the expected structure.',
    status: 'passed',
    lastRun: '2 min ago',
    icon: 'schema',
  },
  {
    id: 2,
    name: 'Orphaned Post Detection',
    description: 'Identify posts that reference deleted assignments.',
    status: 'warning',
    lastRun: '5 min ago',
    count: 128,
    icon: 'link_off',
  },
  {
    id: 3,
    name: 'Redundant Content Check',
    description: 'Detect and flag posts with 95%+ similarity.',
    status: 'failed',
    lastRun: '1 hour ago',
    count: 14,
    icon: 'content_copy',
  },
  {
    id: 4,
    name: 'Foreign Key Consistency',
    description: 'Ensure all contributor_ids exist in the Users table.',
    status: 'passed',
    lastRun: '1 hour ago',
    icon: 'key',
  },
];

const mockIssues = [
  { id: 'CHK-2042', name: 'Redundant Content Check', type: 'Integrity Error', severity: 'High', detected: '2 hours ago' },
  { id: 'CHK-2041', name: 'Orphaned Post Detection', type: 'Missing Link', severity: 'Medium', detected: '5 hours ago' },
  { id: 'CHK-2040', name: 'Schema Validation', type: 'Schema Mismatch', severity: 'Low', detected: '1 day ago' },
];

const statusStyles = {
  passed: { bg: '#91feef', color: '#006259', icon: 'check_circle' },
  warning: { bg: '#d5e3fc', color: '#455367', icon: 'warning' },
  failed: { bg: '#fe8983', color: '#752121', icon: 'error' },
  running: { bg: '#d2e4ff', color: '#1c5489', icon: 'sync' },
};

const severityColors = {
  High: '#9f403d',
  Medium: '#526074',
  Low: '#006b62',
};

export default function DataIntegrityChecker() {
  const router = useRouter();
  const [runningCheck, setRunningCheck] = useState(null);

  const runCheck = (id) => {
    setRunningCheck(id);
    setTimeout(() => setRunningCheck(null), 2000);
  };

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* TopAppBar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Data Integrity Checker</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: 10, fontWeight: 500, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Data</span>
            <span style={{ ...ms, fontSize: 12, color: '#a9b4b9' }}>chevron_right</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#2d6197', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Integrity Tools</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', ...ms, fontSize: 18, color: '#a9b4b9' }}>search</span>
            <input
              type="text"
              placeholder="Search integrity logs..."
              style={{ padding: '10px 12px 10px 40px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13, maxWidth: 256, width: '100%' }}
            />
          </div>
        </div>
      </header>

      {/* Info Banner */}
      <section style={{ position: 'relative', overflow: 'hidden', borderRadius: 12, background: 'rgba(210,228,255,0.3)', padding: 24, display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 32 }}>
        <div style={{ flexShrink: 0, width: 48, height: 48, background: '#2d6197', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ ...ms, fontSize: 24, color: '#f5f7ff' }}>info</span>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1c5489', margin: 0, fontFamily: 'Manrope, sans-serif' }}>System Health Dashboard</h3>
          <p style={{ fontSize: 13, color: 'rgba(28,84,137,0.8)', margin: '8px 0 0 0', lineHeight: 1.6, maxWidth: 700 }}>
            Run automated checks to ensure the referential and semantic integrity of your scraped data. 
            Results are logged and can be exported for external audit.
          </p>
        </div>
      </section>

      {/* Health Score & Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 32 }}>
        {/* Health Score */}
        <div style={{ padding: 32, background: '#ffffff', borderRadius: 12, border: '1px solid #f0f4f7', textAlign: 'center' }}>
          <h4 style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 24px 0' }}>Health Score</h4>
          <div style={{ position: 'relative', width: 144, height: 144, margin: '0 auto', borderRadius: '50%', background: 'conic-gradient(#2d6197 0% 94%, #fe8983 94% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 120, height: 120, borderRadius: '50%', background: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: '#2d6197', fontFamily: 'Manrope, sans-serif' }}>94%</span>
              <span style={{ fontSize: 11, color: '#566166' }}>Pass Rate</span>
            </div>
          </div>
          <p style={{ fontSize: 13, color: '#566166', margin: '24px 0 0 0' }}>2 of 12 checks require attention.</p>
        </div>

        {/* Quick Actions */}
        <div style={{ padding: 32, background: '#ffffff', borderRadius: 12, border: '1px solid #f0f4f7', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Quick Actions</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: 16,
              background: '#f7f9fb',
              border: '1px solid #e8eff3',
              borderRadius: 8,
              cursor: 'pointer',
            }}>
              <span style={{ ...ms, fontSize: 24, color: '#2d6197' }}>play_arrow</span>
              <div style={{ textAlign: 'left' }}>
                <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#2a3439' }}>Run All Checks</span>
                <span style={{ fontSize: 11, color: '#566166' }}>Execute full suite</span>
              </div>
            </button>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: 16,
              background: '#f7f9fb',
              border: '1px solid #e8eff3',
              borderRadius: 8,
              cursor: 'pointer',
            }}>
              <span style={{ ...ms, fontSize: 24, color: '#2d6197' }}>download</span>
              <div style={{ textAlign: 'left' }}>
                <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#2a3439' }}>Export Logs</span>
                <span style={{ fontSize: 11, color: '#566166' }}>Download JSON</span>
              </div>
            </button>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: 16,
              background: '#f7f9fb',
              border: '1px solid #e8eff3',
              borderRadius: 8,
              cursor: 'pointer',
            }}>
              <span style={{ ...ms, fontSize: 24, color: '#2d6197' }}>schedule</span>
              <div style={{ textAlign: 'left' }}>
                <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#2a3439' }}>Schedule Checks</span>
                <span style={{ fontSize: 11, color: '#566166' }}>Set up automation</span>
              </div>
            </button>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: 16,
              background: '#f7f9fb',
              border: '1px solid #e8eff3',
              borderRadius: 8,
              cursor: 'pointer',
            }}>
              <span style={{ ...ms, fontSize: 24, color: '#2d6197' }}>history</span>
              <div style={{ textAlign: 'left' }}>
                <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#2a3439' }}>View History</span>
                <span style={{ fontSize: 11, color: '#566166' }}>Past results</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Active Integrity Checks */}
      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#2a3439', margin: '0 0 20px 0', fontFamily: 'Manrope, sans-serif' }}>Active Integrity Checks</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 32 }}>
        {mockChecks.map((check) => (
          <div key={check.id} style={{ padding: 24, background: '#ffffff', borderRadius: 12, border: '1px solid #f0f4f7', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 8,
              background: statusStyles[check.status].bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ ...ms, fontSize: 24, color: statusStyles[check.status].color }}>
                {runningCheck === check.id ? 'sync' : statusStyles[check.status].icon}
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: '#2a3439', margin: 0 }}>{check.name}</h4>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: 9999,
                  background: statusStyles[check.status].bg,
                  color: statusStyles[check.status].color,
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}>
                  {runningCheck === check.id ? 'Running' : check.status}
                </span>
              </div>
              <p style={{ fontSize: 13, color: '#566166', margin: '0 0 12px 0' }}>{check.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: '#a9b4b9' }}>Last run: {check.lastRun}</span>
                {check.count && (
                  <span style={{ fontSize: 12, fontWeight: 700, color: statusStyles[check.status].color }}>
                    {check.count} {check.status === 'warning' ? 'Warnings' : 'Errors'}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => runCheck(check.id)}
              disabled={runningCheck === check.id}
              style={{
                padding: '8px 16px',
                background: runningCheck === check.id ? '#f0f4f7' : '#2d6197',
                color: runningCheck === check.id ? '#a9b4b9' : '#f5f7ff',
                border: 'none',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                cursor: runningCheck === check.id ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span style={{ ...ms, fontSize: 14 }}>{runningCheck === check.id ? 'sync' : 'play_arrow'}</span>
              {runningCheck === check.id ? 'Running' : 'Run'}
            </button>
          </div>
        ))}
      </div>

      {/* Recent Issues */}
      <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, border: '1px solid #f0f4f7', marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Recent Issues</h4>
          <button style={{ fontSize: 12, fontWeight: 700, color: '#2d6197', background: 'transparent', border: 'none', cursor: 'pointer' }}>View All</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #f0f4f7' }}>
              {['Check ID', 'Check Name', 'Error Type', 'Severity', 'Detected'].map((h) => (
                <th key={h} style={{ padding: '12px 0', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'left' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockIssues.map((issue) => (
              <tr key={issue.id} style={{ borderBottom: '1px solid #f0f4f7' }}>
                <td style={{ padding: '16px 0', fontSize: 13, fontWeight: 600, color: '#2a3439' }}>{issue.id}</td>
                <td style={{ padding: '16px 0', fontSize: 13, color: '#566166' }}>{issue.name}</td>
                <td style={{ padding: '16px 0', fontSize: 13, color: '#566166' }}>{issue.type}</td>
                <td style={{ padding: '16px 0' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: 9999,
                    background: `${severityColors[issue.severity]}20`,
                    color: severityColors[issue.severity],
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}>
                    {issue.severity}
                  </span>
                </td>
                <td style={{ padding: '16px 0', fontSize: 13, color: '#a9b4b9' }}>{issue.detected}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '24px 0', borderTop: '1px solid #e8eff3', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 11, fontWeight: 500, color: '#a9b4b9', letterSpacing: '0.05em' }}>
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
