// @ts-nocheck
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, StatCard } from '../../../components/ui';

export default function AdminDashboard() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="animate-fade-in" style={{ maxWidth: 1600, margin: '0 auto' }}>
      {/* Stat Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 32 }}>
        <StatCard title="Total Words" value="124,502" change="12%" changeType="positive" />
        <StatCard title="Active Assignments" value="842" change="4%" changeType="positive" />
        <StatCard title="Pending Verifications" value="156" change="8%" changeType="negative" />
        <StatCard title="Payments Pending" value="$12,480" change="On Schedule" changeType="positive" />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '70% 30%', gap: 32, marginBottom: 32 }}>
        <Card padding={true}>
          <ChartHeader timeRange={timeRange} setTimeRange={setTimeRange} />
          <PostsPerDayChart timeRange={timeRange} />
        </Card>
        <Card padding={true}>
          <SubmissionStatusDonut />
        </Card>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
        <Card padding={true}>
          <RecentSubmissionsTable router={router} />
        </Card>
        <Card padding={true}>
          <RecentActivityFeed router={router} />
        </Card>
      </div>
    </div>
  );
}

function ChartHeader({ timeRange, setTimeRange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
      <div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Posts per day</h3>
        <p style={{ fontSize: 12, color: '#566166', margin: '4px 0 0 0', fontFamily: 'Inter, sans-serif' }}>Frequency of content submissions</p>
      </div>
      <div style={{ display: 'flex', background: '#f0f4f7', padding: 4, borderRadius: 8 }}>
        <button onClick={() => setTimeRange('7d')} style={tabButtonStyle(timeRange === '7d')}>7d</button>
        <button onClick={() => setTimeRange('30d')} style={tabButtonStyle(timeRange === '30d')}>30d</button>
        <button onClick={() => setTimeRange('90d')} style={tabButtonStyle(timeRange === '90d')}>90d</button>
      </div>
    </div>
  );
}

function tabButtonStyle(active) {
  return {
    padding: '6px 12px',
    fontSize: 12,
    fontWeight: active ? 700 : 500,
    background: active ? '#ffffff' : 'transparent',
    border: 'none',
    borderRadius: 6,
    color: active ? '#2d6197' : '#566166',
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer',
  };
}

function PostsPerDayChart({ timeRange }) {
  // Different chart data based on selected time range
  const chartData = {
    '7d': { path: "M0 170 Q 50 165, 100 175 T 200 155 T 300 165 T 400 140 T 500 155 T 600 130 T 700 145 T 800 120", labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] },
    '30d': { path: "M0 160 Q 40 150, 80 165 T 160 140 T 240 155 T 320 130 T 400 145 T 480 120 T 560 135 T 640 110 T 720 125 T 800 100", labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'] },
    '90d': { path: "M0 150 Q 100 130, 200 145 T 400 120 T 600 135 T 800 100", labels: ['Month 1', 'Month 2', 'Month 3'] },
  };

  const data = chartData[timeRange];

  return (
    <div style={{ width: '100%', height: 256, position: 'relative' }}>
      <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 800 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2d6197', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: '#2d6197', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <path d={data.path + " L 800 200 L 0 200 Z"} fill="url(#chartGradient)" />
        <path d={data.path} fill="none" stroke="#2d6197" strokeWidth="3" />
        <line x1="0" y1="50" x2="800" y2="50" stroke="#e1e9ee" strokeDasharray="4" />
        <line x1="0" y1="100" x2="800" y2="100" stroke="#e1e9ee" strokeDasharray="4" />
        <line x1="0" y1="150" x2="800" y2="150" stroke="#e1e9ee" strokeDasharray="4" />
      </svg>
      <div style={{ position: 'absolute', bottom: -20, left: 0, width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#566166', fontFamily: 'Inter, sans-serif' }}>
        {data.labels.map((label, i) => <span key={i}>{label}</span>)}
      </div>
    </div>
  );
}

function SubmissionStatusDonut() {
  return (
    <>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: '0 0 8px 0', fontFamily: 'Manrope, sans-serif' }}>Submission status</h3>
      <p style={{ fontSize: 12, color: '#566166', margin: '0 0 32px 0', fontFamily: 'Inter, sans-serif' }}>Breakdown by current review state</p>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <svg style={{ width: 160, height: 160, transform: 'rotate(-90deg)' }}>
          <circle cx="80" cy="80" r="60" fill="transparent" stroke="#e1e9ee" strokeWidth="12" />
          <circle cx="80" cy="80" r="60" fill="transparent" stroke="#2d6197" strokeDasharray="376" strokeDashoffset="100" strokeWidth="12" />
          <circle cx="80" cy="80" r="60" fill="transparent" stroke="#006b62" strokeDasharray="376" strokeDashoffset="280" strokeWidth="12" />
          <circle cx="80" cy="80" r="60" fill="transparent" stroke="#9f403d" strokeDasharray="376" strokeDashoffset="350" strokeWidth="12" />
        </svg>
        <div style={{ position: 'absolute', textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: 24, fontWeight: 700, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>2.4k</span>
          <span style={{ fontSize: 10, color: '#566166', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>Total</span>
        </div>
      </div>
      <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <LegendItem color="#2d6197" label="Verified" value="64%" />
        <LegendItem color="#006b62" label="Pending" value="22%" />
        <LegendItem color="#9f403d" label="Flagged" value="14%" />
      </div>
    </>
  );
}

function LegendItem({ color, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
        <span style={{ fontSize: 12, color: '#566166', fontFamily: 'Inter, sans-serif' }}>{label}</span>
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: '#2a3439', fontFamily: 'Inter, sans-serif' }}>{value}</span>
    </div>
  );
}

function RecentSubmissionsTable({ router }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Recent submissions</h3>
        <button
          onClick={() => router.push('/admin/submissions')}
          style={{ fontSize: 12, fontWeight: 700, color: '#2d6197', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Inter, sans-serif' }}
        >
          View All Submissions <span style={{ fontSize: 16, fontFamily: 'Material Symbols Outlined' }}>arrow_forward</span>
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e8eff3' }}>
            <th style={tableHeaderStyle}>Contributor</th>
            <th style={tableHeaderStyle}>Word</th>
            <th style={tableHeaderStyle}>Submitted</th>
            <th style={tableHeaderStyle}>Status</th>
            <th style={{ ...tableHeaderStyle, textAlign: 'right' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          <TableRow 
            name="Felix Chen" 
            role="Top Tier Contributor" 
            word="Ephemeral" 
            time="2 mins ago" 
            status="Verified" 
            statusColor="#91feef" 
            statusTextColor="#006259"
          />
          <TableRow 
            name="Sarah J. Miller" 
            role="New Member" 
            word="Melancholy" 
            time="14 mins ago" 
            status="Reviewing" 
            statusColor="#d2e4ff" 
            statusTextColor="#1c5489"
          />
          <TableRow 
            name="David Vogt" 
            role="Senior Editor" 
            word="Resilience" 
            time="1 hour ago" 
            status="Flagged" 
            statusColor="#fe8983" 
            statusTextColor="#752121"
          />
        </tbody>
      </table>
    </>
  );
}

const tableHeaderStyle = {
  padding: '0 0 16px 0',
  fontSize: 10,
  fontWeight: 700,
  color: '#566166',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  textAlign: 'left',
  fontFamily: 'Inter, sans-serif',
};

function TableRow({ name, role, word, time, status, statusColor, statusTextColor }) {
  return (
    <tr>
      <td style={tableCellStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e8eff3', overflow: 'hidden' }}>
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=64`} alt="" style={{ width: '100%', height: '100%' }} />
          </div>
          <div>
            <p style={{ fontWeight: 700, color: '#2a3439', fontSize: 12, margin: 0, fontFamily: 'Inter, sans-serif' }}>{name}</p>
            <p style={{ fontSize: 10, color: '#566166', margin: 0, fontFamily: 'Inter, sans-serif' }}>{role}</p>
          </div>
        </div>
      </td>
      <td style={tableCellStyle}>
        <span style={{ fontWeight: 700, color: '#2d6197', fontSize: 13, fontFamily: 'Manrope, sans-serif' }}>{word}</span>
      </td>
      <td style={{ ...tableCellStyle, fontSize: 12, color: '#566166', fontFamily: 'Inter, sans-serif' }}>{time}</td>
      <td style={tableCellStyle}>
        <span style={{ padding: '4px 12px', background: statusColor, color: statusTextColor, fontSize: 10, fontWeight: 700, borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif' }}>{status}</span>
      </td>
      <td style={{ ...tableCellStyle, textAlign: 'right' }}>
        <button style={{ padding: 4, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}>
          <span style={{ fontSize: 20, fontFamily: 'Material Symbols Outlined' }}>more_vert</span>
        </button>
      </td>
    </tr>
  );
}

const tableCellStyle = {
  padding: '16px 0',
  borderTop: '1px solid #f0f4f7',
};

function RecentActivityFeed({ router }) {
  return (
    <>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: '0 0 32px 0', fontFamily: 'Manrope, sans-serif' }}>Recent activity</h3>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 12, top: 8, bottom: 8, width: 1, background: '#e1e9ee' }} />
        
        <ActivityItem icon="person_add" iconBg="#2d6197" title="New Contributor Joined" desc="Marco Diaz registered via invitation link." time="10:42 AM" />
        <ActivityItem icon="verified" iconBg="#006b62" title="Verification Rule Updated" desc="Auto-reject logic updated for duplicate submissions." time="09:15 AM" />
        <ActivityItem icon="payments" iconBg="#526074" title="Payout Processed" desc="Monthly earnings released for 142 contributors." time="Yesterday" />
        <ActivityItem icon="warning" iconBg="#9f403d" title="Security Alert" desc="Multiple failed login attempts detected on IP 192.168.1.1." time="Yesterday" last />
      </div>
      <button
        onClick={() => router.push('/admin/activity-log')}
        style={{ marginTop: 32, paddingTop: 16, width: '100%', textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#566166', background: 'none', border: 'none', borderTop: '1px solid #e8eff3', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}
      >
        View Full History
      </button>
    </>
  );
}

function ActivityItem({ icon, iconBg, title, desc, time, last }) {
  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: last ? 0 : 24, position: 'relative' }}>
      <div style={{ width: 24, height: 24, borderRadius: '50%', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
        <span style={{ fontSize: 14, color: '#fff', fontFamily: 'Material Symbols Outlined' }}>{icon}</span>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Inter, sans-serif' }}>{title}</p>
        <p style={{ fontSize: 10, color: '#566166', margin: '4px 0 0 0', lineHeight: 1.5, fontFamily: 'Inter, sans-serif' }}>{desc}</p>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#2d6197', marginTop: 8, display: 'block', fontFamily: 'Inter, sans-serif' }}>{time}</span>
      </div>
    </div>
  );
}
