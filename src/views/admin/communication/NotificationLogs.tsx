'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const mockLogs = [
  {
    id: 1,
    type: 'Email',
    icon: 'mail',
    iconBg: '#d2e4ff',
    iconColor: '#2d6197',
    recipient: 'sarah.jenkins@email.com',
    subject: 'Your definition has been approved',
    template: 'Submission Approved',
    status: 'Delivered',
    statusBg: '#91feef',
    statusColor: '#006259',
    sentAt: 'Today, 2:34 PM',
    opened: true,
    clicked: true,
  },
  {
    id: 2,
    type: 'Push',
    icon: 'notifications_active',
    iconBg: '#d5e3fc',
    iconColor: '#455367',
    recipient: 'Marcus Aurelius',
    subject: 'New assignment available',
    template: 'Assignment Notification',
    status: 'Sent',
    statusBg: '#e8eff3',
    statusColor: '#566166',
    sentAt: 'Today, 1:15 PM',
    opened: true,
    clicked: false,
  },
  {
    id: 3,
    type: 'SMS',
    icon: 'sms',
    iconBg: '#fe8983',
    iconColor: '#752121',
    recipient: '+1 (555) 123-4567',
    subject: 'Payment processed: $1,240.00',
    template: 'Payment SMS Alert',
    status: 'Failed',
    statusBg: '#fe8983',
    statusColor: '#752121',
    sentAt: 'Yesterday, 4:50 PM',
    opened: false,
    clicked: false,
  },
  {
    id: 4,
    type: 'Email',
    icon: 'mail',
    iconBg: '#d2e4ff',
    iconColor: '#2d6197',
    recipient: 'elena.rodriguez@company.net',
    subject: 'Verification deadline approaching',
    template: 'Deadline Reminder',
    status: 'Delivered',
    statusBg: '#91feef',
    statusColor: '#006259',
    sentAt: 'Oct 28, 9:20 AM',
    opened: true,
    clicked: true,
  },
  {
    id: 5,
    type: 'Email',
    icon: 'mail',
    iconBg: '#d2e4ff',
    iconColor: '#2d6197',
    recipient: 'team@lexipost.io',
    subject: 'Weekly contributor stats',
    template: 'Weekly Digest',
    status: 'Delivered',
    statusBg: '#91feef',
    statusColor: '#006259',
    sentAt: 'Oct 27, 8:00 AM',
    opened: true,
    clicked: false,
  },
];

const stats = [
  { label: 'Sent', value: '12,847', icon: 'send', color: '#2d6197' },
  { label: 'Delivered', value: '12,601', icon: 'check_circle', color: '#006b62' },
  { label: 'Failed', value: '246', icon: 'error', color: '#9f403d' },
  { label: 'Open Rate', value: '68.4%', icon: 'visibility', color: '#526074' },
];

export default function NotificationLogs() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, gap: 12 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Notification Logs</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', ...ms, fontSize: 16, color: '#a9b4b9' }}>search</span>
            <input
              type="text"
              placeholder="Search logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '10px 12px 10px 40px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13, maxWidth: 240, width: '100%' }}
            />
          </div>
          <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: '50%' }}>
            <span style={{ ...ms, fontSize: 20 }}>filter_list</span>
          </button>
          <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: '50%' }}>
            <span style={{ ...ms, fontSize: 20 }}>refresh</span>
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 32 }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ padding: 20, background: '#ffffff', borderRadius: 12, border: '1px solid #f0f4f7', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: `${stat.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ ...ms, fontSize: 24, color: stat.color }}>{stat.icon}</span>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>{stat.label}</p>
              <p style={{ fontSize: 24, fontWeight: 800, color: '#2a3439', margin: '4px 0 0 0', fontFamily: 'Manrope, sans-serif' }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div style={{ padding: 16, background: '#ffffff', borderRadius: 12, border: '1px solid #f0f4f7', marginBottom: 24, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: 4 }}>Type</label>
          <select style={{ padding: '8px 32px 8px 12px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            <option>All Types</option>
            <option>Email</option>
            <option>SMS</option>
            <option>Push</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: 4 }}>Status</label>
          <select style={{ padding: '8px 32px 8px 12px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            <option>All Statuses</option>
            <option>Delivered</option>
            <option>Failed</option>
            <option>Pending</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: 4 }}>Date Range</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: '#f0f4f7', borderRadius: 8 }}>
            <span style={{ ...ms, fontSize: 14, color: '#a9b4b9' }}>calendar_today</span>
            <span style={{ fontSize: 13, color: '#2a3439' }}>Last 7 days</span>
          </div>
        </div>
        <button style={{ marginLeft: 'auto', padding: '8px 16px', background: 'transparent', border: 'none', fontSize: 13, fontWeight: 600, color: '#2d6197', cursor: 'pointer' }}>
          Export Logs
        </button>
      </div>

      {/* Table */}
      <div style={{ background: '#ffffff', borderRadius: 12, overflow: 'hidden', border: '1px solid #f0f4f7' }}>
        <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
          <thead>
            <tr style={{ background: 'rgba(232,239,243,0.5)' }}>
              {['Type', 'Recipient', 'Subject / Message', 'Template', 'Status', 'Sent', 'Engagement', 'Actions'].map((h, i) => (
                <th key={h} style={{ padding: '16px 20px', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: i === 7 ? 'right' : 'left' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockLogs.map((log) => (
              <tr key={log.id} style={{ borderTop: '1px solid #e8eff3', background: selected === log.id ? 'rgba(45,97,151,0.05)' : 'transparent' }}>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: log.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ ...ms, fontSize: 18, color: log.iconColor }}>{log.icon}</span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#2a3439' }}>{log.type}</span>
                  </div>
                </td>
                <td style={{ padding: '16px 20px', fontSize: 13, color: '#2a3439', fontWeight: 500 }}>{log.recipient}</td>
                <td style={{ padding: '16px 20px', fontSize: 13, color: '#566166' }}>{log.subject}</td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ fontSize: 12, color: '#2d6197', fontWeight: 500 }}>{log.template}</span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: 9999,
                    background: log.statusBg,
                    color: log.statusColor,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}>
                    {log.status}
                  </span>
                </td>
                <td style={{ padding: '16px 20px', fontSize: 12, color: '#566166' }}>{log.sentAt}</td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {log.opened && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#006b62' }}>
                        <span style={{ ...ms, fontSize: 14 }}>visibility</span> Opened
                      </span>
                    )}
                    {log.clicked && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#2d6197' }}>
                        <span style={{ ...ms, fontSize: 14 }}>ads_click</span> Clicked
                      </span>
                    )}
                    {!log.opened && !log.clicked && log.status === 'Delivered' && (
                      <span style={{ fontSize: 11, color: '#a9b4b9' }}>—</span>
                    )}
                  </div>
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  <button style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}>
                    <span style={{ ...ms, fontSize: 18 }}>more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {/* Pagination */}
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f7f9fb', borderTop: '1px solid #e8eff3' }}>
          <p style={{ fontSize: 12, color: '#566166', margin: 0 }}>Showing <strong>1-5</strong> of <strong>12,847</strong> notifications</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#a9b4b9', borderRadius: 6 }} disabled>
              <span style={{ ...ms, fontSize: 18 }}>chevron_left</span>
            </button>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: '#2d6197', color: '#ffffff', fontSize: 12, fontWeight: 700, border: 'none' }}>1</button>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: 'transparent', color: '#566166', fontSize: 12, fontWeight: 500, border: 'none', cursor: 'pointer' }}>2</button>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: 'transparent', color: '#566166', fontSize: 12, fontWeight: 500, border: 'none', cursor: 'pointer' }}>3</button>
            <span style={{ fontSize: 12, color: '#566166' }}>...</span>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: 'transparent', color: '#566166', fontSize: 12, fontWeight: 500, border: 'none', cursor: 'pointer' }}>50</button>
            <button style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }}>
              <span style={{ ...ms, fontSize: 18 }}>chevron_right</span>
            </button>
          </div>
        </div>
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
