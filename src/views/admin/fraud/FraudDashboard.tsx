'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const stats = [
  { label: 'Active Flags', value: '1,284', trend: '+12%', trendUp: true, icon: 'flag', iconBg: '#fe8983', iconColor: '#9f403d' },
  { label: 'Duplicate Accounts', value: '432', trend: '-5%', trendUp: false, icon: 'content_copy', iconBg: '#d2e4ff', iconColor: '#2d6197' },
  { label: 'Suspicious IPs', value: '89', trend: 'Stable', trendUp: null, icon: 'lan', iconBg: '#91feef', iconColor: '#006b62' },
  { label: 'Banned Users (Month)', value: '156', trend: '+2.4%', trendUp: true, icon: 'person_off', iconBg: '#d5e3fc', iconColor: '#455367' },
];

const fraudEvents = [
  { day: 'Mon', height: 0 },
  { day: 'Tue', height: 32 },
  { day: 'Wed', height: 48 },
  { day: 'Thu', height: 40 },
  { day: 'Fri', height: 24 },
  { day: 'Sat', height: 56 },
  { day: 'Sun', height: 16 },
];

const recentEvents = [
  {
    id: 1,
    contributor: 'Alex Rivera',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Rivera&background=2d6197&color=fff&size=64',
    flagType: 'Bot Pattern',
    severity: 'High',
    severityBg: '#fe8983',
    severityColor: '#752121',
    detectedAt: '2 mins ago',
    action: 'Auto-Banned',
  },
  {
    id: 2,
    contributor: 'Sarah Chen',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=006b62&color=fff&size=64',
    flagType: 'Suspicious IP',
    severity: 'Medium',
    severityBg: '#d5e3fc',
    severityColor: '#455367',
    detectedAt: '14 mins ago',
    action: 'Flagged',
  },
  {
    id: 3,
    contributor: 'Marcus Thorne',
    avatar: 'https://ui-avatars.com/api/?name=Marcus+Thorne&background=526074&color=fff&size=64',
    flagType: 'Bulk Upload',
    severity: 'Low',
    severityBg: '#91feef',
    severityColor: '#006259',
    detectedAt: '42 mins ago',
    action: 'Reviewing',
  },
  {
    id: 4,
    contributor: 'Elena Vance',
    avatar: 'https://ui-avatars.com/api/?name=Elena+Vance&background=9f403d&color=fff&size=64',
    flagType: 'Spoofing Attempt',
    severity: 'Critical',
    severityBg: '#fe8983',
    severityColor: '#752121',
    detectedAt: '1 hour ago',
    action: 'Manual Block',
  },
];

const flaggedContributors = [
  { name: 'James Wilson', issue: 'Duplicate Account Pattern', count: 12, countBg: '#fe8983', countColor: '#752121', avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=2d6197&color=fff&size=64' },
  { name: 'Priya Sharma', issue: 'Metadata Mismatch', count: 8, countBg: '#fe8983', countColor: '#752121', avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=006b62&color=fff&size=64' },
  { name: 'Tomás Rodriguez', issue: 'IP Velocity Threshold', count: 5, countBg: '#d5e3fc', countColor: '#455367', avatar: 'https://ui-avatars.com/api/?name=Tomas+Rodriguez&background=526074&color=fff&size=64' },
];

const quickLinks = [
  { title: 'Duplicate Detection', desc: 'Audit matching user fingerprints', icon: 'content_copy' },
  { title: 'IP Tracking', desc: 'Monitor geo-velocity events', icon: 'location_on' },
  { title: 'Ban Users', desc: 'Manage blacklists and appeals', icon: 'block' },
];

export default function FraudDashboard() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('Weekly');

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto' }}>
      {/* Header */}
      <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, gap: 12 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Fraud & Quality Control</h1>
          <div style={{ width: 1, height: 16, background: 'rgba(169,180,185,0.3)' }} />
          <span style={{ fontSize: 14, fontWeight: 500, color: '#566166' }}>Security &gt; Fraud Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search suspicious entries..."
              style={{ maxWidth: 256, width: '100%', padding: '8px 40px 8px 16px', background: '#f0f4f7', border: 'none', borderRadius: 9999, fontSize: 13 }}
            />
            <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', ...ms, fontSize: 18, color: '#a9b4b9' }}>search</span>
          </div>
          <div style={{ display: 'flex', gap: 16, color: '#566166' }}>
            {['notifications', 'help', 'settings'].map((icon) => (
              <button key={icon} style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '50%' }}>
                <span style={{ ...ms, fontSize: 20 }}>{icon}</span>
              </button>
            ))}
            <img src="https://ui-avatars.com/api/?name=Admin+User&background=2d6197&color=fff&size=64" alt="" style={{ width: 32, height: 32, borderRadius: '50%' }} />
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 32 }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ padding: 24, background: '#ffffff', borderRadius: 12, border: '1px solid rgba(169,180,185,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ padding: 8, background: stat.iconBg, borderRadius: 8, color: stat.iconColor }}>
                <span style={{ ...ms, fontSize: 20 }}>{stat.icon}</span>
              </div>
              {stat.trendUp !== null && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: stat.trendUp ? '#9f403d' : '#006b62' }}>
                  <span style={{ ...ms, fontSize: 14 }}>{stat.trendUp ? 'trending_up' : 'trending_down'}</span>
                  {stat.trend}
                </span>
              )}
              {stat.trendUp === null && (
                <span style={{ fontSize: 12, fontWeight: 700, color: '#566166' }}>{stat.trend}</span>
              )}
            </div>
            <p style={{ fontSize: 13, fontWeight: 500, color: '#566166', margin: '0 0 4px 0' }}>{stat.label}</p>
            <h3 style={{ fontSize: 30, fontWeight: 800, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Chart Section */}
      <section style={{ padding: 32, background: '#ffffff', borderRadius: 12, marginBottom: 32, border: '1px solid rgba(169,180,185,0.1)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, gap: 12 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Fraud events over time</h3>
            <p style={{ fontSize: 13, color: '#566166', margin: '4px 0 0 0' }}>Real-time detection and logging metrics</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Daily', 'Weekly', 'Monthly'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 9999,
                  border: 'none',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  background: timeRange === range ? '#2d6197' : '#f0f4f7',
                  color: timeRange === range ? '#f5f7ff' : '#2a3439',
                  boxShadow: timeRange === range ? '0 4px 12px rgba(45,97,151,0.2)' : 'none',
                }}
              >
                {range}
              </button>
            ))}
            <div style={{ width: 1, height: 32, background: 'rgba(169,180,185,0.3)', margin: '0 8px' }} />
            <select style={{ padding: '8px 16px', background: '#f0f4f7', border: 'none', borderRadius: 9999, fontSize: 13, cursor: 'pointer' }}>
              <option>All Event Types</option>
              <option>Account Takeover</option>
              <option>Payment Fraud</option>
              <option>Bot Activity</option>
            </select>
          </div>
        </div>

        {/* Chart */}
        <div style={{ position: 'relative', height: 256, background: '#f0f4f7', borderRadius: 8, overflow: 'hidden' }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }}>
            <path d="M0 200 Q 250 25, 500 150 T 1000 75" fill="none" stroke="#2d6197" strokeWidth="2" />
            <path d="M0 225 Q 300 50, 600 175 T 1000 125" fill="none" stroke="#006b62" strokeWidth="2" opacity="0.5" />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 16px 32px' }}>
            {fraudEvents.map((event) => (
              <div key={event.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                {event.height > 0 && (
                  <div style={{ width: 8, height: event.height * 2, background: '#2d6197', borderRadius: '4px 4px 0 0' }} />
                )}
                <span style={{ fontSize: 10, fontWeight: 500, color: '#566166', textTransform: 'uppercase' }}>{event.day}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, marginBottom: 32 }}>
        {/* Recent Events Table */}
        <div style={{ background: '#ffffff', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(169,180,185,0.1)' }}>
          <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(169,180,185,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Recent fraud events</h3>
            <button style={{ fontSize: 13, fontWeight: 600, color: '#2d6197', background: 'transparent', border: 'none', cursor: 'pointer' }}>View All</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
              <thead>
                <tr style={{ background: 'rgba(232,239,243,0.5)' }}>
                  {['Contributor', 'Flag Type', 'Severity', 'Detected At', 'Action Taken'].map((h) => (
                    <th key={h} style={{ padding: 16, fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'left' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentEvents.map((event) => (
                  <tr key={event.id} style={{ borderTop: '1px solid #e8eff3' }}>
                    <td style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img src={event.avatar} alt="" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                      <span style={{ fontSize: 14, fontWeight: 500, color: '#2a3439' }}>{event.contributor}</span>
                    </td>
                    <td style={{ padding: 16, fontSize: 14, color: '#2a3439' }}>{event.flagType}</td>
                    <td style={{ padding: 16 }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: 9999,
                        background: event.severityBg,
                        color: event.severityColor,
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}>
                        {event.severity}
                      </span>
                    </td>
                    <td style={{ padding: 16, fontSize: 14, color: '#566166' }}>{event.detectedAt}</td>
                    <td style={{ padding: 16 }}>
                      <span style={{ padding: '4px 8px', background: '#f0f4f7', borderRadius: 6, fontSize: 11, fontWeight: 600, color: '#2a3439' }}>
                        {event.action}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Flagged Contributors */}
        <div style={{ padding: 32, background: '#ffffff', borderRadius: 12, border: '1px solid rgba(169,180,185,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Top flagged contributors</h3>
            <span style={{ ...ms, fontSize: 20, color: '#566166' }}>more_vert</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {flaggedContributors.map((user) => (
              <div key={user.name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ position: 'relative' }}>
                  <img src={user.avatar} alt="" style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid #e8eff3' }} />
                  <div style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: user.countBg,
                    color: user.countColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 700,
                  }}>
                    {user.count}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: '#2a3439', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</h4>
                  <p style={{ fontSize: 12, color: '#566166', margin: '4px 0 0 0' }}>{user.issue}</p>
                </div>
                <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#2d6197' }}>
                  <span style={{ ...ms, fontSize: 20 }}>chevron_right</span>
                </button>
              </div>
            ))}
          </div>
          <button style={{
            width: '100%',
            marginTop: 32,
            padding: '12px 24px',
            background: '#f0f4f7',
            border: 'none',
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 600,
            color: '#2a3439',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}>
            View Analytics Report
            <span style={{ ...ms, fontSize: 16 }}>arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
        {quickLinks.map((link) => (
          <a
            key={link.title}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/admin/fraud/${link.title.toLowerCase().replace(/\s+/g, '-')}`);
            }}
            style={{
              padding: 24,
              background: '#e8eff3',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div style={{ padding: 12, background: '#ffffff', borderRadius: 8, color: '#2d6197' }}>
              <span style={{ ...ms, fontSize: 20 }}>{link.icon}</span>
            </div>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#2a3439', margin: 0 }}>{link.title}</h4>
              <p style={{ fontSize: 12, color: '#566166', margin: '4px 0 0 0' }}>{link.desc}</p>
            </div>
          </a>
        ))}
      </section>

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
