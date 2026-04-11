'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const schedules = [
  {
    id: 1,
    name: 'Weekly Sentiment Analysis',
    status: 'Active',
    statusBg: '#91feef',
    statusColor: '#006259',
    icon: 'calendar_today',
    iconBg: '#d2e4ff',
    iconColor: '#2d6197',
    filters: [
      { label: 'Word', value: 'blorple' },
      { label: 'Date', value: 'Last 7 days' },
    ],
    frequency: 'Daily',
    format: 'CSV',
    lastRun: 'Oct 24, 08:00 AM',
    nextRun: 'Oct 25, 08:00 AM',
  },
  {
    id: 2,
    name: 'Monthly Contributor Audit',
    status: 'Paused',
    statusBg: '#e8eff3',
    statusColor: '#566166',
    icon: 'event_repeat',
    iconBg: '#d5e3fc',
    iconColor: '#455367',
    filters: [
      { label: 'Type', value: 'All Contributors' },
      { label: 'Metric', value: 'Volume' },
    ],
    frequency: 'Monthly',
    format: 'JSON',
    lastRun: 'Sep 30, 11:59 PM',
    nextRun: '---',
    paused: true,
  },
  {
    id: 3,
    name: 'Verification Queue Dump',
    status: 'Active',
    statusBg: '#91feef',
    statusColor: '#006259',
    icon: 'update',
    iconBg: '#91feef',
    iconColor: '#006b62',
    filters: [
      { label: 'Status', value: 'Pending' },
    ],
    frequency: 'Weekly',
    format: 'CSV',
    lastRun: 'Oct 21, 04:00 AM',
    nextRun: 'Oct 28, 04:00 AM',
  },
];

const stats = [
  { label: 'Total Active', value: '12 Schedules', icon: 'trending_up', color: '#2d6197' },
  { label: 'Data Processed', value: '1.2 GB / mo', icon: 'save', color: '#006b62' },
  { label: 'Uptime', value: '99.98% Success', icon: 'history', color: '#526074' },
];

export default function ScheduledExports() {
  const router = useRouter();

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Scheduled Exports</h1>
          <p style={{ fontSize: 14, color: '#566166', margin: '8px 0 0 0' }}>Manage recurring data syncs and automated reports.</p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '12px 20px',
          background: '#2d6197',
          color: '#f5f7ff',
          border: 'none',
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(45,97,151,0.2)',
        }}>
          <span style={{ ...ms, fontSize: 20 }}>add</span>
          Create Schedule
        </button>
      </header>

      {/* Schedule Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            style={{
              padding: 24,
              background: '#ffffff',
              borderRadius: 12,
              border: '1px solid transparent',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{
                padding: 12,
                background: schedule.iconBg,
                borderRadius: 8,
                color: schedule.iconColor,
              }}>
                <span style={{ ...ms, fontSize: 30 }}>{schedule.icon}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: 0 }}>{schedule.name}</h3>
                  <span style={{
                    padding: '2px 10px',
                    borderRadius: 9999,
                    background: schedule.statusBg,
                    color: schedule.statusColor,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    {schedule.status}
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filters:</span>
                  {schedule.filters.map((f) => (
                    <div key={f.label} style={{
                      padding: '4px 8px',
                      background: '#f0f4f7',
                      borderRadius: 4,
                      fontSize: 12,
                      color: '#2a3439',
                      border: '1px solid rgba(169,180,185,0.1)',
                    }}>
                      {f.label}: <span style={{ fontWeight: 700, color: '#2d6197' }}>{f.value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#566166' }}>
                    <span style={{ ...ms, fontSize: 16 }}>sync</span>
                    <span>{schedule.frequency}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#566166' }}>
                    <span style={{ ...ms, fontSize: 16 }}>description</span>
                    <span>{schedule.format}</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16, opacity: schedule.paused ? 0.7 : 1 }}>
              <div style={{ display: 'flex', gap: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }}>Last Run</span>
                  <span style={{ fontSize: 13, color: '#2a3439', fontWeight: 600 }}>{schedule.lastRun}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }}>Next Run</span>
                  <span style={{ fontSize: 13, color: schedule.paused ? '#566166' : '#2a3439', fontWeight: 600 }}>{schedule.nextRun}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }} title="Edit">
                  <span style={{ ...ms, fontSize: 20 }}>edit</span>
                </button>
                <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: schedule.paused ? '#2d6197' : '#566166', borderRadius: 6 }} title={schedule.paused ? 'Resume' : 'Pause'}>
                  <span style={{ ...ms, fontSize: 20 }}>{schedule.paused ? 'play_circle' : 'pause_circle'}</span>
                </button>
                <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }} title="Delete">
                  <span style={{ ...ms, fontSize: 20 }}>delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Footer */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 48 }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ padding: 16, background: '#f0f4f7', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 16, border: '1px solid rgba(169,180,185,0.1)' }}>
            <div style={{ padding: 8, background: '#ffffff', borderRadius: 8, color: stat.color }}>
              <span style={{ ...ms, fontSize: 20 }}>{stat.icon}</span>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', marginTop: 4 }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ padding: '24px 0', marginTop: 40, borderTop: '1px solid #e8eff3', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, fontWeight: 500, color: '#a9b4b9', letterSpacing: '0.05em' }}>
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
