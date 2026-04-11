'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import { Bell, Search, ChevronDown, Command } from 'lucide-react';

const PAGE_TITLES = {
  '/admin': 'Dashboard',
  '/admin/analytics': 'Analytics',
  '/admin/activity-log': 'Activity Log',
  '/admin/words': 'Words',
  '/admin/words/create': 'Create Word',
  '/admin/words/performance': 'Word Performance',
  '/admin/assignments': 'Assignments',
  '/admin/assignments/create': 'Create Assignment',
  '/admin/assignments/calendar': 'Calendar',
  '/admin/assignments/rules': 'Auto-Assignment Rules',
  '/admin/contributors': 'Contributors',
  '/admin/contributors/add': 'Add Contributors',
  '/admin/contributors/segments': 'Segmentation',
  '/admin/contributors/risk': 'Risk Panel',
  '/admin/submissions': 'Submission Queue',
  '/admin/submissions/pending': 'Pending Verification',
  '/admin/submissions/bulk': 'Bulk Verification',
  '/admin/submissions/rules': 'Auto-Verify Rules',
  '/admin/scraped': 'Scraped Content',
  '/admin/scraped/integrity': 'Data Integrity',
  '/admin/payments': 'Payments',
  '/admin/payments/pending': 'Pending Payments',
  '/admin/payments/process': 'Process Payments',
  '/admin/payments/history': 'Payment History',
  '/admin/payments/ledger': 'Earnings Ledger',
  '/admin/payments/failed': 'Failed Payments',
  '/admin/comms/templates': 'Email Templates',
  '/admin/comms/logs': 'Notification Logs',
  '/admin/comms/broadcast': 'Broadcast',
  '/admin/export': 'Data Export',
  '/admin/export/scheduled': 'Scheduled Exports',
  '/admin/export/reports': 'Report Generator',
  '/admin/fraud': 'Fraud Detection',
  '/admin/fraud/duplicates': 'Duplicate Detection',
  '/admin/fraud/ip': 'IP Tracking',
  '/admin/fraud/bans': 'Ban & Suspend',
  '/admin/roles': 'Role Management',
  '/admin/settings': 'Platform Settings',
  '/admin/settings/api': 'API Keys',
  '/admin/settings/storage': 'Storage',
  '/portal': 'Dashboard',
  '/portal/tasks': 'My Tasks',
  '/portal/tasks/history': 'Task History',
  '/portal/earnings': 'Earnings',
  '/portal/earnings/history': 'Payment History',
  '/portal/earnings/method': 'Payment Setup',
  '/portal/notifications': 'Notifications',
  '/portal/support': 'Support',
  '/portal/performance': 'Performance',
  '/portal/profile': 'Profile',
  '/portal/guidelines': 'Guidelines',
  '/portal/help': 'Help Center',
};

function getTitle(pathname) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  if (pathname.includes('/admin/words/') && pathname.includes('/edit')) return 'Edit Word';
  if (pathname.includes('/admin/words/')) return 'Word Details';
  if (pathname.includes('/admin/contributors/')) return 'Contributor Profile';
  if (pathname.includes('/admin/submissions/')) return 'Submission Detail';
  if (pathname.includes('/admin/scraped/')) return 'Content Detail';
  if (pathname.includes('/admin/assignments/') && pathname.split('/').length === 4) return 'Assignment Detail';
  if (pathname.includes('/portal/tasks/') && pathname.includes('/submit')) return 'Submit Post';
  if (pathname.includes('/portal/tasks/') && pathname.includes('/status')) return 'Submission Status';
  if (pathname.includes('/portal/tasks/')) return 'Task Detail';
  return 'LexiPost';
}

export default function Layout({ children, mode = 'admin' }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = mode === 'admin';
  const title = getTitle(pathname);
  const accentColor = '#2d6197';
  const userName = isAdmin ? 'Admin User' : 'Rahul Sharma';
  const userRole = isAdmin ? 'Super Admin' : 'Contributor';
  const userInitials = isAdmin ? 'AU' : 'RS';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f9fb' }}>
      <Sidebar mode={mode} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, marginLeft: 256 }}>
        {/* ── Header ── */}
        <header style={{
          height: 64, flexShrink: 0,
          background: 'rgba(247,249,251,0.8)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px',
          position: 'sticky', top: 0, zIndex: 40,
        }}>
          {/* Left: Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>{title}</h2>
            <div style={{ width: 1, height: 16, background: '#e1e9ee' }} />
            <p style={{ fontSize: 12, color: '#566166', fontFamily: 'Inter, sans-serif' }}>{isAdmin ? 'Admin Console' : 'Contributor Portal'}</p>
          </div>

          {/* Right: Date + Actions + User */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Date Range */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: '#f0f4f7', borderRadius: 8 }}>
              <span style={{ fontSize: 18, color: '#566166', fontFamily: 'Material Symbols Outlined' }}>calendar_today</span>
              <span style={{ fontSize: 13, color: '#2a3439', fontFamily: 'Inter, sans-serif' }}>Oct 01, 2023 - Oct 31, 2023</span>
              <span style={{ fontSize: 18, color: '#566166', fontFamily: 'Material Symbols Outlined' }}>expand_more</span>
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => router.push(isAdmin ? '/admin/comms/logs' : '/portal/notifications')}
              style={{
                width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#566166',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e8eff3'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ fontSize: 20, fontFamily: 'Material Symbols Outlined' }}>notifications</span>
            </button>

            {/* Settings */}
            <button
              style={{
                width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#566166',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e8eff3'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ fontSize: 20, fontFamily: 'Material Symbols Outlined' }}>settings</span>
            </button>

            {/* Avatar */}
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: '#d2e4ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <img 
                src={`https://ui-avatars.com/api/?name=${userName}&background=2d6197&color=fff&size=64`}
                alt="User avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </header>

        {/* ── Content ── */}
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }} className="animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
