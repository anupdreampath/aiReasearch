'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const recentExports = [
  {
    id: 1,
    name: 'Oct_Sentiment_Batch_01',
    date: 'Oct 24, 2023 · 14:20',
    format: 'CSV',
    size: '12.4 MB',
    details: 'Platform: X, Reddit | Status: Verified',
    status: 'Ready',
    statusBg: '#91feef',
    statusColor: '#006259',
  },
  {
    id: 2,
    name: 'Content_Metadata_Dump',
    date: 'Oct 22, 2023 · 09:15',
    format: 'JSON',
    size: '2.1 MB',
    details: 'No filters applied',
    status: 'Ready',
    statusBg: '#91feef',
    statusColor: '#006259',
  },
  {
    id: 3,
    name: 'Weekly_Audit_Large',
    date: 'Oct 20, 2023 · 18:45',
    format: 'CSV',
    size: '45.0 MB',
    details: 'Platform: Discord',
    status: 'Processing',
    statusBg: '#d5e3fc',
    statusColor: '#455367',
    processing: true,
  },
  {
    id: 4,
    name: 'User_Segment_Alpha',
    date: 'Oct 18, 2023 · 11:30',
    format: 'CSV',
    size: '0.8 MB',
    details: 'Segment: Experts',
    status: 'Failed',
    statusBg: '#fe8983',
    statusColor: '#752121',
  },
];

const platforms = [
  { label: 'X (Twitter)', checked: true },
  { label: 'Reddit', checked: true },
  { label: 'Discord', checked: false },
];

const statuses = [
  { label: 'Verified', checked: true },
  { label: 'Pending Review', checked: false },
  { label: 'Rejected', checked: false },
];

const columns = [
  { label: 'Post Text', checked: true },
  { label: 'Metadata', checked: true },
  { label: 'Comments', checked: false },
  { label: 'Author Info', checked: true },
  { label: 'Scores', checked: false },
];

export default function DataExport() {
  const router = useRouter();
  const [exportFormat, setExportFormat] = useState('CSV');

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* TopNavBar */}
      <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, gap: 12 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Data Export</h1>
          <div style={{ width: 1, height: 16, background: 'rgba(169,180,185,0.3)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#566166', fontSize: 13, fontWeight: 500 }}>
            <span style={{ ...ms, fontSize: 16 }}>folder_open</span>
            <span>Workspace</span>
            <span style={{ ...ms, fontSize: 14 }}>chevron_right</span>
            <span style={{ color: '#2d6197', fontWeight: 600 }}>Exports</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: '#f0f4f7', borderRadius: 8, maxWidth: 256, width: '100%' }}>
            <span style={{ ...ms, fontSize: 18, color: '#a9b4b9' }}>search</span>
            <input type="text" placeholder="Search export history..." style={{ background: 'transparent', border: 'none', fontSize: 13, flex: 1 }} />
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
        {/* Left: Filters Card */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ padding: 32, background: '#ffffff', borderRadius: 12, border: '1px solid rgba(169,180,185,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ ...ms, fontSize: 22, color: '#2d6197' }}>tune</span>
                Export Parameters
              </h2>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#a9b4b9', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Config — A34</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Word & Date */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Word multi-select</label>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f0f4f7', borderRadius: 8, cursor: 'pointer' }}>
                    <span style={{ fontSize: 13, color: '#2a3439' }}>5 Words selected</span>
                    <span style={{ ...ms, fontSize: 18, color: '#a9b4b9' }}>expand_more</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Date Range</label>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f0f4f7', borderRadius: 8, cursor: 'pointer' }}>
                    <span style={{ fontSize: 13, color: '#2a3439' }}>Oct 01 - Oct 31, 2023</span>
                    <span style={{ ...ms, fontSize: 18, color: '#a9b4b9' }}>calendar_today</span>
                  </div>
                </div>
              </div>

              {/* Platform & Status */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 32 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Platform</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {platforms.map((p) => (
                      <label key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked={p.checked} style={{ width: 16, height: 16 }} />
                        <span style={{ fontSize: 13, color: '#2a3439' }}>{p.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Submission Status</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {statuses.map((s) => (
                      <label key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked={s.checked} style={{ width: 16, height: 16 }} />
                        <span style={{ fontSize: 13, color: '#2a3439' }}>{s.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contributor Segment */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contributor Segment</label>
                <select style={{ padding: '10px 14px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
                  <option>Top 10% Contributors</option>
                  <option>Regional Experts</option>
                  <option>New Registered Users</option>
                  <option>All Segments</option>
                </select>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: '#e8eff3' }} />

              {/* Format & Columns */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 32 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Export Format</label>
                  <div style={{ display: 'flex', background: '#f0f4f7', padding: 4, borderRadius: 8 }}>
                    {['CSV', 'JSON'].map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setExportFormat(fmt)}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: 6,
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: 13,
                          fontWeight: 500,
                          background: exportFormat === fmt ? '#ffffff' : 'transparent',
                          color: exportFormat === fmt ? '#2d6197' : '#566166',
                          boxShadow: exportFormat === fmt ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                        }}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Include Columns</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {columns.map((c) => (
                      <label key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked={c.checked} style={{ width: 14, height: 14 }} />
                        <span style={{ fontSize: 12, color: '#566166' }}>{c.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, paddingTop: 16 }}>
                <button style={{
                  flex: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '14px 20px',
                  background: 'linear-gradient(135deg, #2d6197 0%, #1d548a 100%)',
                  color: '#f5f7ff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(45,97,151,0.2)',
                }}>
                  <span style={{ ...ms, fontSize: 20 }}>download</span>
                  Export Scraped Posts
                </button>
                <button style={{
                  flex: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '14px 20px',
                  background: '#f0f4f7',
                  color: '#566166',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}>
                  <span style={{ ...ms, fontSize: 20 }}>description</span>
                  Export Metadata Only
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Recent Exports */}
        <section style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid rgba(169,180,185,0.1)', overflow: 'hidden', flex: 1 }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e8eff3', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ ...ms, fontSize: 22, color: '#526074' }}>history</span>
                Recent Exports
              </h2>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#2d6197', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <span style={{ ...ms, fontSize: 18 }}>refresh</span>
                Refresh list
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(232,239,243,0.5)' }}>
                    {['Export Name', 'Details', 'Status', 'Action'].map((h, i) => (
                      <th key={h} style={{ padding: '16px 24px', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: i === 3 ? 'right' : 'left' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentExports.map((exp) => (
                    <tr key={exp.id} style={{ borderTop: '1px solid #e8eff3' }}>
                      <td style={{ padding: '20px 24px' }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#2a3439' }}>{exp.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#a9b4b9', marginTop: 4 }}>
                          <span style={{ ...ms, fontSize: 12 }}>event</span>
                          {exp.date}
                        </div>
                      </td>
                      <td style={{ padding: '20px 24px' }}>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          <span style={{ padding: '2px 8px', background: '#d5e3fc', color: '#455367', fontSize: 10, fontWeight: 700, borderRadius: 9999, textTransform: 'uppercase' }}>
                            {exp.format}
                          </span>
                          <span style={{ padding: '2px 8px', background: '#f0f4f7', color: '#566166', fontSize: 10, borderRadius: 9999 }}>
                            {exp.size}
                          </span>
                        </div>
                        <div style={{ fontSize: 10, color: '#a9b4b9', marginTop: 6 }}>{exp.details}</div>
                      </td>
                      <td style={{ padding: '20px 24px' }}>
                        <span style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                          padding: '6px 12px',
                          borderRadius: 9999,
                          background: exp.statusBg,
                          color: exp.statusColor,
                          fontSize: 11,
                          fontWeight: 700,
                        }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: exp.statusColor, ...(exp.processing && { animation: 'pulse 1.5s infinite' }) }} />
                          {exp.status}
                        </span>
                      </td>
                      <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                        <button
                          disabled={exp.processing}
                          style={{
                            padding: 8,
                            background: 'transparent',
                            border: 'none',
                            cursor: exp.processing ? 'not-allowed' : 'pointer',
                            color: exp.status === 'Failed' ? '#9f403d' : exp.processing ? '#a9b4b9' : '#2d6197',
                            borderRadius: 6,
                          }}
                        >
                          <span style={{ ...ms, fontSize: 20 }}>
                            {exp.processing ? 'hourglass_empty' : exp.status === 'Failed' ? 'error' : 'download'}
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div style={{ padding: 16, background: 'rgba(232,239,243,0.3)', borderTop: '1px solid #e8eff3', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, color: '#566166' }}>Showing 4 of 28 recent exports</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ padding: '6px 12px', background: '#ffffff', border: '1px solid rgba(169,180,185,0.3)', borderRadius: 6, fontSize: 12, fontWeight: 700, color: '#2a3439', cursor: 'pointer' }}>
                  Previous
                </button>
                <button style={{ padding: '6px 12px', background: '#ffffff', border: '1px solid rgba(169,180,185,0.3)', borderRadius: 6, fontSize: 12, fontWeight: 700, color: '#2a3439', cursor: 'pointer' }}>
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginTop: 32 }}>
            <div style={{ padding: 20, background: 'rgba(45,97,151,0.05)', borderRadius: 12, border: '1px solid rgba(45,97,151,0.1)', display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(45,97,151,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2d6197' }}>
                <span style={{ ...ms, fontSize: 24 }}>auto_awesome</span>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#2d6197' }}>Smart Automations</div>
                <div style={{ fontSize: 10, color: '#566166', marginTop: 2 }}>Schedule recurring weekly exports to S3 bucket</div>
              </div>
            </div>
            <div style={{ padding: 20, background: 'rgba(82,96,116,0.05)', borderRadius: 12, border: '1px solid rgba(82,96,116,0.1)', display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(82,96,116,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#526074' }}>
                <span style={{ ...ms, fontSize: 24 }}>api</span>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#526074' }}>Developer API</div>
                <div style={{ fontSize: 10, color: '#566166', marginTop: 2 }}>Integrate export triggers directly into your CI/CD</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer style={{ padding: '24px 0', marginTop: 40, borderTop: '1px solid #e8eff3', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, fontWeight: 500, color: '#a9b4b9', letterSpacing: '0.05em', gap: 12 }}>
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
