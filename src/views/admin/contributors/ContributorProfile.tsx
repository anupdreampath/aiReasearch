'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const historyData = [
  { id: 1, word: 'Ambivalence', taskId: '#9921', type: 'Sentiment Analysis', status: 'APPROVED', statusBg: '#91feef', statusColor: '#006259', date: 'Oct 24, 2023', earnings: '$0.45' },
  { id: 2, word: 'Ephemeral', taskId: '#9845', type: 'Phonetic Tagging', status: 'APPROVED', statusBg: '#91feef', statusColor: '#006259', date: 'Oct 23, 2023', earnings: '$0.60' },
  { id: 3, word: 'Nostalgia', taskId: '#9712', type: 'Contextual Mapping', status: 'APPROVED', statusBg: '#91feef', statusColor: '#006259', date: 'Oct 23, 2023', earnings: '$0.45' },
  { id: 4, word: 'Paradox', taskId: '#9650', type: 'Sentiment Analysis', status: 'REJECTED', statusBg: 'rgba(254,137,131,0.3)', statusColor: '#752121', date: 'Oct 22, 2023', earnings: '$0.00' },
  { id: 5, word: 'Melancholy', taskId: '#9521', type: 'Sentiment Analysis', status: 'PENDING', statusBg: '#d2e4ff', statusColor: '#1c5489', date: 'Oct 22, 2023', earnings: '$0.45' },
];

const currentAssignments = [
  { id: 1, name: 'ES Dialect Review', deadline: '2h left', icon: 'translate', color: '#2d6197', bg: '#d2e4ff' },
  { id: 2, name: 'Irony Classification', deadline: 'Ongoing batch', icon: 'psychology', color: '#526074', bg: '#d5e3fc' },
];

export default function ContributorProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('History');

  const contributor = {
    name: 'Elena Rodriguez',
    initials: 'ER',
    email: 'elena.rod@sentimental.ai',
    location: 'Madrid, Spain',
    flag: '🇪🇸',
    joined: 'Jan 14, 2023',
    tags: ['SENIOR ANNOTATOR', 'SPANISH LQA'],
    status: 'ACTIVE',
    quality: 98,
    approvalRate: '99.4%',
    totalTasks: '12,482',
    earnings: '$4,820.50',
    rejectionRate: '0.6%',
  };

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* TopAppBar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => router.push('/admin/contributors')}
            style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#a9b4b9' }}
          >
            <span style={{ ...ms, fontSize: 24 }}>arrow_back</span>
          </button>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>{contributor.name}</h1>
          <span style={{
            padding: '4px 10px',
            background: '#91feef',
            color: '#006259',
            borderRadius: 9999,
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
          }}>{contributor.status}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 16px',
            background: '#f0f4f7',
            color: '#2d6197',
            border: 'none',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            <span style={{ ...ms, fontSize: 18 }}>edit</span>Edit Profile
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 16px',
            background: 'rgba(254,137,131,0.2)',
            color: '#752121',
            border: 'none',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            <span style={{ ...ms, fontSize: 18 }}>block</span>Ban Contributor
          </button>
          <div style={{ width: 1, height: 24, background: '#d9e4ea', margin: '0 4px' }} />
          <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}>
            <span style={{ ...ms, fontSize: 22 }}>notifications</span>
          </button>
          <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}>
            <span style={{ ...ms, fontSize: 22 }}>settings</span>
          </button>
        </div>
      </header>

      {/* Profile Hero */}
      <section style={{ display: 'flex', gap: 32, alignItems: 'flex-start', marginBottom: 32 }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 128, height: 128,
            background: '#2d6197',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, fontWeight: 800,
            color: '#f5f7ff',
            fontFamily: 'Manrope, sans-serif',
            boxShadow: '0 8px 24px rgba(45,97,151,0.2)',
          }}>
            {contributor.initials}
          </div>
          <div style={{
            position: 'absolute', bottom: -8, right: -8,
            background: '#ffffff',
            padding: 4,
            borderRadius: '50%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>
            <div style={{
              width: 40, height: 40,
              borderRadius: '50%',
              border: '3px solid #006b62',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#006b62' }}>{contributor.quality}%</span>
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#2a3439', margin: '0 0 12px 0', fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}>{contributor.name}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, fontSize: 14, color: '#566166', marginBottom: 20 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ ...ms, fontSize: 18, color: '#2d6197' }}>mail</span>{contributor.email}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ ...ms, fontSize: 18, color: '#2d6197' }}>location_on</span>{contributor.location} {contributor.flag}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ ...ms, fontSize: 18, color: '#2d6197' }}>calendar_today</span>Joined {contributor.joined}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {contributor.tags.map((tag, i) => (
              <span key={i} style={{
                padding: '6px 12px',
                background: '#f0f4f7',
                borderRadius: 9999,
                fontSize: 11,
                fontWeight: 700,
                color: '#566166',
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 40 }}>
        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, borderBottom: '2px solid rgba(45,97,151,0.1)' }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#566166', margin: '0 0 16px 0' }}>Approval Rate</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: '#006b62', fontFamily: 'Manrope, sans-serif' }}>{contributor.approvalRate}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#006b62', background: 'rgba(145,254,239,0.3)', padding: '4px 8px', borderRadius: 9999, display: 'flex', alignItems: 'center', gap: 2 }}>
              <span style={{ ...ms, fontSize: 12 }}>trending_up</span>+0.2%
            </span>
          </div>
        </div>
        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, borderBottom: '2px solid rgba(45,97,151,0.1)' }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#566166', margin: '0 0 16px 0' }}>Total Tasks</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>{contributor.totalTasks}</span>
            <span style={{ ...ms, fontSize: 24, color: '#a9b4b9' }}>task_alt</span>
          </div>
        </div>
        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, borderBottom: '2px solid rgba(45,97,151,0.1)' }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#566166', margin: '0 0 16px 0' }}>Total Earnings</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: '#2d6197', fontFamily: 'Manrope, sans-serif' }}>{contributor.earnings}</span>
            <span style={{ ...ms, fontSize: 24, color: '#a9b4b9' }}>account_balance_wallet</span>
          </div>
        </div>
        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, borderBottom: '2px solid rgba(159,64,61,0.1)' }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#566166', margin: '0 0 16px 0' }}>Rejection Rate</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: '#9f403d', fontFamily: 'Manrope, sans-serif' }}>{contributor.rejectionRate}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#9f403d', background: 'rgba(254,137,131,0.2)', padding: '4px 8px', borderRadius: 9999 }}>VERY LOW</span>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 32 }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Tabs Navigation */}
          <div style={{ display: 'flex', gap: 32, borderBottom: '1px solid #e8eff3', overflowX: 'auto' }}>
            {['History', 'Earnings', 'Risk Flags', 'Assignments'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  paddingBottom: 16,
                  fontSize: 14,
                  fontWeight: activeTab === tab ? 700 : 500,
                  color: activeTab === tab ? '#2d6197' : '#566166',
                  border: 'none',
                  borderBottom: activeTab === tab ? '2px solid #2d6197' : 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  whiteSpace: 'nowrap',
                }}
              >
                {tab}
                {tab === 'Risk Flags' && (
                  <span style={{ padding: '2px 6px', background: '#9f403d', color: '#ffffff', fontSize: 9, fontWeight: 700, borderRadius: 9999 }}>1</span>
                )}
              </button>
            ))}
          </div>

          {/* History Table */}
          <div style={{ background: '#ffffff', borderRadius: 12, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f0f4f7' }}>
                  <th style={{ padding: '12px 24px', fontSize: 10, fontWeight: 800, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left' }}>Word/Task ID</th>
                  <th style={{ padding: '12px 24px', fontSize: 10, fontWeight: 800, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left' }}>Type</th>
                  <th style={{ padding: '12px 24px', fontSize: 10, fontWeight: 800, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '12px 24px', fontSize: 10, fontWeight: 800, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '12px 24px', fontSize: 10, fontWeight: 800, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left' }}>Earnings</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((row, i) => (
                  <tr key={row.id} style={{ background: i % 2 === 1 ? 'rgba(240,244,247,0.5)' : 'transparent' }}>
                    <td style={{ padding: '16px 24px', fontSize: 13, fontWeight: 500, color: '#2a3439' }}>"{row.word}" {row.taskId}</td>
                    <td style={{ padding: '16px 24px', fontSize: 12, color: '#566166' }}>{row.type}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: 9999,
                        background: row.statusBg,
                        color: row.statusColor,
                        fontSize: 9,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>{row.status}</span>
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: 12, color: '#566166' }}>{row.date}</td>
                    <td style={{ padding: '16px 24px', fontSize: 13, fontWeight: 700, color: '#2a3439' }}>{row.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Quick Actions */}
          <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, boxShadow: '0 4px 12px rgba(42,52,57,0.04)' }}>
            <h4 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#566166', margin: '0 0 16px 0', paddingBottom: 8, borderBottom: '1px solid #e8eff3' }}>Quick Actions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px',
                background: '#2d6197',
                color: '#f5f7ff',
                border: 'none',
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
              }}>
                <span style={{ ...ms, fontSize: 20 }}>send</span>Send Message
              </button>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px',
                background: '#e8eff3',
                color: '#2a3439',
                border: 'none',
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
              }}>
                <span style={{ ...ms, fontSize: 20 }}>tune</span>Adjust Score
              </button>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px',
                background: 'transparent',
                color: '#526074',
                border: '1px solid #a9b4b9',
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
              }}>
                <span style={{ ...ms, fontSize: 20 }}>pause_circle</span>Suspend Account
              </button>
            </div>
          </div>

          {/* Active Flag */}
          <div style={{ padding: 24, background: 'rgba(254,137,131,0.08)', borderRadius: 12, border: '1px solid rgba(159,64,61,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#9f403d', marginBottom: 12 }}>
              <span style={{ ...ms, fontSize: 18, fontVariationSettings: "'FILL' 1" }}>warning</span>
              <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Flag</span>
            </div>
            <p style={{ fontSize: 12, fontWeight: 500, color: '#752121', lineHeight: 1.6, margin: 0 }}>
              Detected rapid task completion (3.2s avg) on 12-Oct. System flagged for potential automation.
            </p>
            <a href="#" style={{ fontSize: 11, fontWeight: 700, color: '#9f403d', textDecoration: 'underline', marginTop: 12, display: 'inline-block' }}>View Detail</a>
          </div>

          {/* Current Assignments */}
          <div style={{ padding: 16 }}>
            <h4 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#566166', margin: '0 0 16px 0' }}>Current Assignments</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {currentAssignments.map((a) => (
                <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 32, height: 32,
                    background: a.bg,
                    borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ ...ms, fontSize: 16, color: a.color }}>{a.icon}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#2a3439', margin: 0 }}>{a.name}</p>
                    <p style={{ fontSize: 10, color: '#566166', margin: 0 }}>{a.deadline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
