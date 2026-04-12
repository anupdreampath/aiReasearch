'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Auth guard — redirect to login if not authenticated
  useEffect(() => {
    const authKey = isAdmin ? 'lexipost_admin_auth' : 'lexipost_user_auth';
    const isAuthenticated = sessionStorage.getItem(authKey);
    if (!isAuthenticated) {
      router.replace(isAdmin ? '/auth/admin' : '/login');
    } else {
      setAuthChecked(true);
    }
  }, [isAdmin, router]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [profileOpen]);

  const profileMenuItems = isAdmin
    ? [
        { icon: 'dashboard', label: 'Dashboard', href: '/admin' },
        { icon: 'settings', label: 'Platform Settings', href: '/admin/settings' },
        { icon: 'manage_accounts', label: 'Role Management', href: '/admin/roles' },
        { icon: 'history', label: 'Activity Log', href: '/admin/activity-log' },
        { icon: 'security', label: 'Fraud Dashboard', href: '/admin/fraud' },
      ]
    : [
        { icon: 'dashboard', label: 'Dashboard', href: '/portal' },
        { icon: 'person', label: 'Profile', href: '/portal/profile' },
        { icon: 'assignment', label: 'My Tasks', href: '/portal/tasks' },
        { icon: 'account_balance_wallet', label: 'Earnings', href: '/portal/earnings' },
        { icon: 'help', label: 'Help Center', href: '/portal/help' },
      ];

  if (!authChecked) {
    return <div style={{ minHeight: '100vh', background: '#f7f9fb' }} />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f9fb' }}>
      <Sidebar mode={mode} mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="layout-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, marginLeft: 256 }}>
        {/* ── Header ── */}
        <header className="layout-header" style={{
          height: 64, flexShrink: 0,
          background: 'rgba(247,249,251,0.8)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px',
          position: 'sticky', top: 0, zIndex: 40,
        }}>
          {/* Left: Hamburger + Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => setSidebarOpen(true)}
              className="hamburger-btn"
              style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 8, color: '#566166' }}
            >
              <span style={{ fontSize: 22, fontFamily: 'Material Symbols Outlined' }}>menu</span>
            </button>
            <style>{`@media (max-width: 768px) { .hamburger-btn { display: flex !important; } .header-date-range { display: none !important; } }`}</style>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>{title}</h2>
            <div style={{ width: 1, height: 16, background: '#e1e9ee' }} />
            <p style={{ fontSize: 12, color: '#566166', fontFamily: 'Inter, sans-serif' }}>{isAdmin ? 'Admin Console' : 'Contributor Portal'}</p>
          </div>

          {/* Right: Date + Actions + User */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Date Range */}
            <div className="header-date-range" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: '#f0f4f7', borderRadius: 8 }}>
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
              onClick={() => router.push(isAdmin ? '/admin/settings' : '/portal/profile')}
              style={{
                width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%',
                background: pathname.startsWith(isAdmin ? '/admin/settings' : '/portal/profile') ? '#e8eff3' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: pathname.startsWith(isAdmin ? '/admin/settings' : '/portal/profile') ? '#2d6197' : '#566166',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e8eff3'; }}
              onMouseLeave={e => { if (!pathname.startsWith(isAdmin ? '/admin/settings' : '/portal/profile')) e.currentTarget.style.background = 'transparent'; }}
              title={isAdmin ? 'Platform Settings' : 'Profile Settings'}
            >
              <span style={{ fontSize: 20, fontFamily: 'Material Symbols Outlined' }}>settings</span>
            </button>

            {/* Avatar / Profile Dropdown */}
            <div ref={profileRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: '#d2e4ff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.15s',
                  outline: profileOpen ? '2px solid #2d6197' : '2px solid transparent',
                  outlineOffset: 2,
                }}
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${userName}&background=2d6197&color=fff&size=64`}
                  alt="User avatar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </button>

              {profileOpen && (
                <div
                  style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                    width: 240, background: '#fff', borderRadius: 12,
                    boxShadow: '0 8px 30px rgba(42,52,57,0.12), 0 2px 8px rgba(42,52,57,0.06)',
                    border: '1px solid #e1e9ee',
                    overflow: 'hidden', zIndex: 100,
                    animation: 'fadeIn 0.15s ease',
                  }}
                >
                  {/* User info header */}
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid #e1e9ee', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
                    }}>
                      <img
                        src={`https://ui-avatars.com/api/?name=${userName}&background=2d6197&color=fff&size=64`}
                        alt={userName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#2a3439', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userName}</div>
                      <div style={{ fontSize: 11, color: '#717c82' }}>{userRole}</div>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div style={{ padding: '6px 0' }}>
                    {profileMenuItems.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => { setProfileOpen(false); router.push(item.href); }}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                          padding: '9px 16px', border: 'none', background: pathname === item.href ? '#f0f4f7' : 'transparent',
                          cursor: 'pointer', fontSize: 13, color: pathname === item.href ? '#2d6197' : '#2a3439',
                          fontFamily: 'Inter, sans-serif', textAlign: 'left', transition: 'background 0.1s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#f0f4f7'; }}
                        onMouseLeave={e => { if (pathname !== item.href) e.currentTarget.style.background = 'transparent'; }}
                      >
                        <span style={{ fontSize: 18, fontFamily: 'Material Symbols Outlined', color: pathname === item.href ? '#2d6197' : '#566166' }}>{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Logout */}
                  <div style={{ borderTop: '1px solid #e1e9ee', padding: '6px 0' }}>
                    <button
                      onClick={() => { setProfileOpen(false); sessionStorage.removeItem(isAdmin ? 'lexipost_admin_auth' : 'lexipost_user_auth'); router.push(isAdmin ? '/auth/admin' : '/login'); }}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                        padding: '9px 16px', border: 'none', background: 'transparent',
                        cursor: 'pointer', fontSize: 13, color: '#9f403d',
                        fontFamily: 'Inter, sans-serif', textAlign: 'left', transition: 'background 0.1s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#fff7f6'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <span style={{ fontSize: 18, fontFamily: 'Material Symbols Outlined', color: '#9f403d' }}>logout</span>
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── Content ── */}
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }} className="animate-fade-in layout-content">
          {children}
        </main>
      </div>
    </div>
  );
}
