'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const metrics = [
  { label: 'Posts Count', checked: true },
  { label: 'Approval Rate', checked: false },
  { label: 'Rejection Rate', checked: false },
  { label: 'Cost Per Word', checked: false },
  { label: 'Avg Upvotes', checked: true },
  { label: 'Avg Comments', checked: false },
];

const recentReports = [
  {
    id: 1,
    name: 'Monthly_Efficiency_Oct.pdf',
    icon: 'description',
    iconBg: '#d2e4ff',
    iconColor: '#2d6197',
    generatedAt: '2 days ago',
    type: 'Table',
  },
  {
    id: 2,
    name: 'Contributor_ROI_Final.csv',
    icon: 'insights',
    iconBg: '#91feef',
    iconColor: '#006b62',
    generatedAt: '5 days ago',
    type: 'Bar Chart',
  },
];

const vizTypes = [
  { id: 'table', icon: 'table_chart', label: 'Table' },
  { id: 'bar', icon: 'bar_chart', label: 'Bar' },
  { id: 'line', icon: 'show_chart', label: 'Line' },
  { id: 'pie', icon: 'pie_chart', label: 'Pie' },
];

export default function ReportGenerator() {
  const router = useRouter();
  const [selectedViz, setSelectedViz] = useState('table');
  const [reportName, setReportName] = useState('');

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
      {/* TopAppBar */}
      <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, gap: 12 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Report Generator</h1>
          <div style={{ width: 1, height: 24, background: 'rgba(169,180,185,0.3)' }} />
          <span style={{ fontSize: 14, fontWeight: 500, color: '#566166' }}>Export / Report Generator</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
          <button style={{ padding: '10px 20px', border: '1px solid rgba(45,97,151,0.2)', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#2d6197', background: 'transparent', cursor: 'pointer' }}>
            Save Report
          </button>
          <button
            onClick={() => {
              // Generate dummy CSV report data
              const csvData = [
                ['Report Name', reportName || 'Q3 Performance Summary'],
                ['Generated At', new Date().toLocaleString()],
                ['Date Range', 'Oct 1, 2023 - Dec 31, 2023'],
                [''],
                ['Metric', 'Value', 'Change', 'Status'],
                ['Posts Count', '1,247', '+12%', 'Active'],
                ['Approval Rate', '87.3%', '+3.2%', 'Good'],
                ['Rejection Rate', '12.7%', '-3.2%', 'Improving'],
                ['Cost Per Word', '$0.42', '-8%', 'Optimized'],
                ['Avg Upvotes', '24.5', '+15%', 'Growing'],
                ['Avg Comments', '3.2', '+5%', 'Stable'],
                [''],
                ['Word', 'Posts', 'Contributors', 'Status', 'Revenue'],
                ['Serendipity', '142', '8', 'Active', '$142.00'],
                ['Ephemeral', '89', '5', 'Active', '$89.00'],
                ['Luminous', '250', '12', 'Complete', '$250.00'],
                ['Resilient', '42', '3', 'Active', '$42.00'],
                ['Mellifluous', '12', '2', 'Active', '$12.00'],
                [''],
                ['Contributor', 'Words Assigned', 'Posts Submitted', 'Approval Rate', 'Earnings'],
                ['Elena M.', '24', '156', '92%', '$624.00'],
                ['Julian Frost', '18', '98', '88%', '$392.00'],
                ['Sarah Chen', '31', '203', '94%', '$812.00'],
                ['David Kim', '15', '87', '85%', '$348.00'],
              ];

              const csvContent = csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
              const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = (reportName || 'Report') + '.csv';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 24px',
              background: 'linear-gradient(135deg, #2d6197 0%, #1d548a 100%)',
              color: '#f5f7ff',
              border: 'none',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(45,97,151,0.2)',
            }}
          >
            <span style={{ ...ms, fontSize: 18 }}>download</span>
            Download
          </button>
          <div style={{ display: 'flex', gap: 4, marginLeft: 16 }}>
            {['notifications', 'help', 'settings'].map((icon) => (
              <button key={icon} style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: '50%' }}>
                <span style={{ ...ms, fontSize: 20 }}>{icon}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, flex: 1, overflow: 'hidden' }}>
        {/* Left Column: Controls & History */}
        <section style={{ flex: '1 1 350px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 24, overflowY: 'auto' }}>
          {/* Configuration Card */}
          <div style={{ padding: 32, background: '#ffffff', borderRadius: 12, border: '1px solid rgba(169,180,185,0.1)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: '0 0 24px 0', fontFamily: 'Manrope, sans-serif' }}>Configuration</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Report Name */}
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Report Name</label>
                <input
                  type="text"
                  placeholder="e.g. Q3 Performance Summary"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 14 }}
                />
              </div>

              {/* Metrics */}
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Metrics</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 8 }}>
                  {metrics.map((m) => (
                    <label key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: '#f0f4f7', borderRadius: 8, cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked={m.checked} style={{ width: 16, height: 16 }} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: '#2a3439' }}>{m.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Group By & Date Range */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Group By</label>
                  <select defaultValue="Date" style={{ width: '100%', padding: '12px 16px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
                    <option>Word</option>
                    <option>Date</option>
                    <option>Contributor</option>
                    <option>Platform</option>
                    <option>Region</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Date Range</label>
                  <div style={{ position: 'relative' }}>
                    <input type="text" defaultValue="Oct 1, 2023 - Dec 31, 2023" style={{ width: '100%', padding: '12px 40px 12px 16px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13 }} />
                    <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', ...ms, fontSize: 18, color: '#a9b4b9' }}>calendar_today</span>
                  </div>
                </div>
              </div>

              {/* Visualization Type */}
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Visualization Type</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {vizTypes.map((viz) => (
                    <button
                      key={viz.id}
                      onClick={() => setSelectedViz(viz.id)}
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 4,
                        padding: 12,
                        borderRadius: 8,
                        border: selectedViz === viz.id ? '1px solid #2d6197' : '1px solid transparent',
                        background: selectedViz === viz.id ? 'rgba(45,97,151,0.1)' : '#f0f4f7',
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ ...ms, fontSize: 24, color: selectedViz === viz.id ? '#2d6197' : '#566166' }}>{viz.icon}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: selectedViz === viz.id ? '#2d6197' : '#566166', textTransform: 'uppercase' }}>{viz.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button style={{
              width: '100%',
              marginTop: 24,
              padding: '16px 24px',
              background: '#2a3439',
              color: '#f5f7ff',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}>
              <span style={{ ...ms, fontSize: 20 }}>bolt</span>
              Generate Preview
            </button>
          </div>

          {/* Recent Reports */}
          <div style={{ padding: 32, background: '#ffffff', borderRadius: 12, border: '1px solid rgba(169,180,185,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Recent Reports</h3>
              <a href="#" style={{ fontSize: 11, fontWeight: 700, color: '#2d6197', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none' }}>View All</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {recentReports.map((report) => (
                <div key={report.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, background: 'rgba(232,239,243,0.5)', borderRadius: 8, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 6, background: report.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: report.iconColor }}>
                      <span style={{ ...ms, fontSize: 20 }}>{report.icon}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#2a3439', margin: 0 }}>{report.name}</p>
                      <p style={{ fontSize: 11, color: '#566166', margin: '4px 0 0 0' }}>Generated {report.generatedAt} • {report.type}</p>
                    </div>
                  </div>
                  <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}>
                    <span style={{ ...ms, fontSize: 20 }}>more_vert</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Column: Preview Pane */}
        <section style={{ flex: '1 1 350px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{
            flex: 1,
            background: '#ffffff',
            borderRadius: 12,
            border: '2px dashed rgba(169,180,185,0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Decorative Background */}
            <div style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.03,
              background: 'radial-gradient(circle at center, #2d6197, transparent 70%)',
              pointerEvents: 'none',
            }} />
            
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 48 }}>
              <div style={{
                width: 128,
                height: 128,
                marginBottom: 32,
                background: '#f0f4f7',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#a9b4b9',
              }}>
                <span style={{ ...ms, fontSize: 64, fontVariationSettings: "'wght' 200" }}>analytics</span>
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: '#2a3439', margin: '0 0 12px 0', fontFamily: 'Manrope, sans-serif' }}>Ready to Analyze</h3>
              <p style={{ fontSize: 14, color: '#566166', maxWidth: 320, margin: '0 0 32px 0' }}>Adjust your filters on the left and click "Generate Preview" to see your data visualized here.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 16, width: '100%', maxWidth: 320 }}>
                <div style={{ padding: 16, background: 'rgba(232,239,243,0.3)', borderRadius: 8, border: '1px solid rgba(169,180,185,0.1)' }}>
                  <div style={{ width: 32, height: 4, background: 'rgba(45,97,151,0.2)', borderRadius: 2, marginBottom: 8 }} />
                  <div style={{ width: 48, height: 4, background: 'rgba(45,97,151,0.1)', borderRadius: 2 }} />
                </div>
                <div style={{ padding: 16, background: 'rgba(232,239,243,0.3)', borderRadius: 8, border: '1px solid rgba(169,180,185,0.1)' }}>
                  <div style={{ width: 48, height: 4, background: 'rgba(0,107,98,0.2)', borderRadius: 2, marginBottom: 8 }} />
                  <div style={{ width: 32, height: 4, background: 'rgba(0,107,98,0.1)', borderRadius: 2 }} />
                </div>
              </div>
            </div>

            {/* Watermark */}
            <div style={{ position: 'absolute', bottom: 48, right: 48, opacity: 0.08 }}>
              <span style={{ ...ms, fontSize: 120, fontVariationSettings: "'FILL' 1" }}>query_stats</span>
            </div>
          </div>

          {/* Preview Options */}
          <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', opacity: 0.5, gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live Preview Status</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#a9b4b9' }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: '#566166' }}>Awaiting Input...</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }}>
                <span style={{ ...ms, fontSize: 20 }}>zoom_in</span>
              </button>
              <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }}>
                <span style={{ ...ms, fontSize: 20 }}>refresh</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer style={{ padding: '24px 0', marginTop: 24, borderTop: '1px solid #e8eff3', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, fontWeight: 500, color: '#a9b4b9', letterSpacing: '0.05em', gap: 12 }}>
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
