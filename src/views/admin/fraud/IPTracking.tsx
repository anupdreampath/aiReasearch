'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const stats = [
  { label: 'Unique IPs', value: '12,482', trend: '+4.2%', trendColor: '#006b62', icon: 'language', iconColor: '#2d6197' },
  { label: 'Shared IPs', value: '158', trend: '+12 today', trendColor: '#9f403d', icon: 'device_hub', iconColor: '#9f403d' },
  { label: 'Flagged IPs', value: '42', trend: 'Manual Review', trendColor: '#566166', icon: 'flag', iconColor: '#2a3439' },
];

const ipData = [
  {
    id: 1,
    contributor: 'Alex Rivera',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Rivera&background=2d6197&color=fff&size=64',
    ip: '192.168.1.104',
    country: 'United States',
    fingerprint: 'df_4a89...19',
    lastSeen: '2 mins ago',
    sharedWith: 4,
    status: 'Flagged',
    statusBg: '#fe8983',
    statusColor: '#752121',
    expanded: true,
    sharedUsers: [
      { name: 'Sarah Jenkins', avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=006b62&color=fff&size=64' },
      { name: 'David Wu', avatar: 'https://ui-avatars.com/api/?name=David+Wu&background=526074&color=fff&size=64' },
      { name: 'Maria Garcia', avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=9f403d&color=fff&size=64' },
    ],
  },
  {
    id: 2,
    contributor: 'Tom Bradi',
    avatar: 'https://ui-avatars.com/api/?name=Tom+Bradi&background=526074&color=fff&size=64',
    ip: '84.19.231.12',
    country: 'Germany',
    fingerprint: 'df_9c12...4a',
    lastSeen: '1 hour ago',
    sharedWith: 1,
    status: 'Secure',
    statusBg: '#91feef',
    statusColor: '#006259',
    expanded: false,
  },
  {
    id: 3,
    contributor: 'Elena Kozlova',
    avatar: 'https://ui-avatars.com/api/?name=Elena+Kozlova&background=006b62&color=fff&size=64',
    ip: '212.45.10.155',
    country: 'Russia',
    fingerprint: 'df_0b44...72',
    lastSeen: '4 hours ago',
    sharedWith: 2,
    status: 'Pending',
    statusBg: '#d9e4ea',
    statusColor: '#566166',
    expanded: false,
  },
];

const deviceDistribution = [
  { label: 'Chrome (Windows)', value: 64 },
  { label: 'Mobile App (iOS/Android)', value: 28 },
  { label: 'Safari (Mac)', value: 8 },
];

export default function IPTracking() {
  const router = useRouter();
  const [expandedRow, setExpandedRow] = useState(1);

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>IP &amp; Device Tracking</h1>
          <p style={{ fontSize: 14, color: '#566166', margin: '8px 0 0 0' }}>Monitoring access patterns and preventing multi-account abuse.</p>
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
          <span style={{ ...ms, fontSize: 20 }}>download</span>
          Export Report
        </button>
      </header>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 32 }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ padding: 24, background: '#ffffff', borderRadius: 12, border: '1px solid rgba(169,180,185,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ padding: 8, background: '#f0f4f7', borderRadius: 8, color: stat.iconColor }}>
                <span style={{ ...ms, fontSize: 20 }}>{stat.icon}</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: stat.trendColor, background: stat.trendColor === '#006b62' ? '#91feef' : stat.trendColor === '#9f403d' ? 'rgba(254,137,131,0.2)' : '#e8eff3', padding: '4px 8px', borderRadius: 9999 }}>
                {stat.trend}
              </span>
            </div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px 0' }}>{stat.label}</p>
            <h3 style={{ fontSize: 30, fontWeight: 800, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div style={{ padding: 16, background: '#e8eff3', borderRadius: 12, marginBottom: 32, display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', ...ms, fontSize: 20, color: '#566166' }}>search</span>
          <input type="text" placeholder="Search by IP address..." style={{ width: '100%', padding: '10px 16px 10px 44px', background: '#ffffff', border: 'none', borderRadius: 8, fontSize: 14 }} />
        </div>
        <select style={{ padding: '10px 16px', background: '#ffffff', border: 'none', borderRadius: 8, fontSize: 14, cursor: 'pointer', minWidth: 150 }}>
          <option>All Countries</option>
          <option>United States</option>
          <option>Germany</option>
          <option>India</option>
        </select>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#ffffff', padding: '8px 16px', borderRadius: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>Flagged Only</span>
          <div style={{ width: 40, height: 20, background: '#e8eff3', borderRadius: 9999, padding: 2, cursor: 'pointer' }}>
            <div style={{ width: 16, height: 16, background: '#ffffff', borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#ffffff', padding: '8px 16px', borderRadius: 8 }}>
          <span style={{ ...ms, fontSize: 16, color: '#566166' }}>calendar_today</span>
          <span style={{ fontSize: 14 }}>Oct 12 - Oct 24</span>
        </div>
      </div>

      {/* Data Table */}
      <div style={{ background: '#ffffff', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(169,180,185,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(232,239,243,0.5)' }}>
              {['Contributor', 'IP Address', 'Country', 'Device Fingerprint', 'Last Seen', 'Shared With', 'Status'].map((h) => (
                <th key={h} style={{ padding: '16px 24px', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'left' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ipData.map((row) => (
              <React.Fragment key={row.id}>
                <tr style={{ borderTop: '1px solid #e8eff3', cursor: 'pointer' }} onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img src={row.avatar} alt="" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                      <span style={{ fontSize: 14, fontWeight: 500, color: '#2a3439' }}>{row.contributor}</span>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px', fontSize: 14, fontFamily: 'monospace', color: '#2a3439' }}>{row.ip}</td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ ...ms, fontSize: 16, color: '#2d6197' }}>public</span>
                      <span style={{ fontSize: 14 }}>{row.country}</span>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <span style={{ fontSize: 12, fontFamily: 'monospace', background: '#f0f4f7', padding: '4px 8px', borderRadius: 4, color: '#566166' }}>{row.fingerprint}</span>
                  </td>
                  <td style={{ padding: '20px 24px', fontSize: 14, color: '#2a3439' }}>{row.lastSeen}</td>
                  <td style={{ padding: '20px 24px' }}>
                    {row.sharedWith > 1 ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, color: '#752121', background: '#fe8983', padding: '4px 8px', borderRadius: 9999, width: 'fit-content' }}>
                        <span style={{ ...ms, fontSize: 12 }}>warning</span>
                        {row.sharedWith} Users
                      </span>
                    ) : (
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#566166', background: '#e1e9ee', padding: '4px 8px', borderRadius: 9999, width: 'fit-content' }}>
                        1 User
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '6px 12px', borderRadius: 9999, background: row.statusBg, color: row.statusColor }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
                {expandedRow === row.id && row.sharedUsers && (
                  <tr style={{ background: 'rgba(232,239,243,0.3)', borderLeft: '4px solid #fe8983' }}>
                    <td colSpan={7} style={{ padding: '16px 48px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <p style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Also using this IP:</p>
                        <div style={{ display: 'flex', gap: 24, overflowX: 'auto', paddingBottom: 8 }}>
                          {row.sharedUsers.map((user) => (
                            <div key={user.name} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#ffffff', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(169,180,185,0.15)' }}>
                              <img src={user.avatar} alt="" style={{ width: 24, height: 24, borderRadius: '50%' }} />
                              <span style={{ fontSize: 12, fontWeight: 500 }}>{user.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ padding: '16px 24px', background: 'rgba(232,239,243,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 12, color: '#566166', margin: 0 }}>Showing 1-10 of 158 shared IP entries</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ padding: 6, background: '#ffffff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
              <span style={{ ...ms, fontSize: 16, color: '#566166' }}>chevron_left</span>
            </button>
            <button style={{ padding: '6px 12px', background: '#2d6197', color: '#f5f7ff', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>1</button>
            <button style={{ padding: '6px 12px', background: '#ffffff', color: '#2a3439', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>2</button>
            <button style={{ padding: '6px 12px', background: '#ffffff', color: '#2a3439', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>3</button>
            <button style={{ padding: 6, background: '#ffffff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
              <span style={{ ...ms, fontSize: 16, color: '#566166' }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 48 }}>
        {/* Device Distribution */}
        <div style={{ padding: 24, background: '#e8eff3', borderRadius: 12 }}>
          <h4 style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: '0 0 24px 0', fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ ...ms, fontSize: 20, color: '#2d6197' }}>insights</span>
            Device Fingerprint Distribution
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {deviceDistribution.map((device) => (
              <div key={device.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, color: '#2a3439', marginBottom: 4 }}>
                  <span>{device.label}</span>
                  <span>{device.value}%</span>
                </div>
                <div style={{ height: 8, background: '#d9e4ea', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${device.value}%`, background: '#2d6197', borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Protection Status */}
        <div style={{ padding: 24, background: '#e8eff3', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <div style={{ maxWidth: 240 }}>
            <h4 style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: '0 0 8px 0', fontFamily: 'Manrope, sans-serif', lineHeight: 1.2 }}>Automated Protection Active</h4>
            <p style={{ fontSize: 14, color: '#566166', margin: 0 }}>Sentimental Grid is currently blocking 14 suspected bot IPs automatically based on device fingerprint mismatch.</p>
          </div>
          <div style={{ position: 'relative', width: 96, height: 96 }}>
            <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle cx="48" cy="48" fill="transparent" r="40" stroke="#d9e4ea" strokeWidth="8" />
              <circle cx="48" cy="48" fill="transparent" r="40" stroke="#006b62" strokeDasharray="251.2" strokeDashoffset="62.8" strokeWidth="8" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>75%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '24px 0', marginTop: 48, borderTop: '1px solid #e8eff3', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, fontWeight: 500, color: '#a9b4b9', letterSpacing: '0.05em' }}>
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
