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
  '/reviewer': 'Dashboard',
  '/reviewer/pending': 'Pending Review',
  '/reviewer/queue': 'All Submissions',
  '/reviewer/bulk': 'Bulk Verify',
  '/reviewer/approved': 'Approved',
  '/reviewer/rejected': 'Rejected',
  '/reviewer/log': 'Rejection Log',
  '/reviewer/flagged': 'Flagged',
  '/reviewer/duplicates': 'Duplicates',
  '/reviewer/rules': 'Auto-Verify Rules',
  '/reviewer/stats': 'My Stats',
  '/reviewer/notifications': 'Notifications',
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

function formatDateShort(d: Date) {
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}

function getPresetRange(key: string): [Date, Date] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  switch (key) {
    case 'today': return [today, today];
    case '7d': { const s = new Date(today); s.setDate(s.getDate() - 6); return [s, today]; }
    case '30d': { const s = new Date(today); s.setDate(s.getDate() - 29); return [s, today]; }
    case 'this_month': return [new Date(today.getFullYear(), today.getMonth(), 1), today];
    case 'last_month': {
      const s = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const e = new Date(today.getFullYear(), today.getMonth(), 0);
      return [s, e];
    }
    case 'this_year': return [new Date(today.getFullYear(), 0, 1), today];
    default: return [new Date(today.getFullYear(), today.getMonth(), 1), today];
  }
}

const DATE_PRESETS = [
  { key: 'today', label: 'Today' },
  { key: '7d', label: 'Last 7 Days' },
  { key: '30d', label: 'Last 30 Days' },
  { key: 'this_month', label: 'This Month' },
  { key: 'last_month', label: 'Last Month' },
  { key: 'this_year', label: 'This Year' },
];

export default function Layout({ children, mode = 'admin' }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = mode === 'admin';
  const isReviewer = mode === 'reviewer';
  const title = getTitle(pathname);
  const accentColor = '#2d6197';
  const userName = isAdmin ? 'Admin User' : isReviewer ? 'Noor Hassani' : 'Dmitri Volkov';
  const userRole = isAdmin ? 'Super Admin' : isReviewer ? 'Senior Reviewer' : 'Contributor';
  const userInitials = isAdmin ? 'AU' : isReviewer ? 'SC' : 'RS';
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Date range selector state
  const [datePreset, setDatePreset] = useState('this_month');
  const [dateRange, setDateRange] = useState<[Date, Date]>(getPresetRange('this_month'));
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Auth guard — redirect to login if not authenticated
  useEffect(() => {
    const authKey = isAdmin ? 'lexipost_admin_auth' : isReviewer ? 'lexipost_reviewer_auth' : 'lexipost_user_auth';
    const loginPath = isAdmin ? '/auth/admin' : isReviewer ? '/reviewer/login' : '/login';
    const isAuthenticated = sessionStorage.getItem(authKey);
    if (!isAuthenticated) {
      router.replace(loginPath);
    } else {
      setAuthChecked(true);
    }
  }, [isAdmin, router]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
        setDatePickerOpen(false);
      }
    }
    if (profileOpen || datePickerOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [profileOpen, datePickerOpen]);

  const handlePresetSelect = (key: string) => {
    setDatePreset(key);
    setDateRange(getPresetRange(key));
    setDatePickerOpen(false);
  };

  const handleCustomApply = () => {
    if (customStart && customEnd) {
      const s = new Date(customStart);
      const e = new Date(customEnd);
      if (!isNaN(s.getTime()) && !isNaN(e.getTime()) && s <= e) {
        setDatePreset('custom');
        setDateRange([s, e]);
        setDatePickerOpen(false);
      }
    }
  };

  const profileMenuItems = isAdmin
    ? [
        { icon: 'dashboard', label: 'Dashboard', href: '/admin' },
        { icon: 'settings', label: 'Platform Settings', href: '/admin/settings' },
        { icon: 'manage_accounts', label: 'Role Management', href: '/admin/roles' },
        { icon: 'history', label: 'Activity Log', href: '/admin/activity-log' },
        { icon: 'security', label: 'Fraud Dashboard', href: '/admin/fraud' },
      ]
    : isReviewer
    ? [
        { icon: 'dashboard', label: 'Dashboard', href: '/reviewer' },
        { icon: 'schedule', label: 'Pending Queue', href: '/reviewer/pending' },
        { icon: 'bar_chart', label: 'My Stats', href: '/reviewer/stats' },
        { icon: 'notifications', label: 'Notifications', href: '/reviewer/notifications' },
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
            <p style={{ fontSize: 12, color: '#566166', fontFamily: 'Inter, sans-serif' }}>{isAdmin ? 'Admin Console' : isReviewer ? 'Reviewer Panel' : 'Contributor Portal'}</p>
          </div>

          {/* Right: Date + Actions + User */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Date Range Selector */}
            <div ref={datePickerRef} className="header-date-range" style={{ position: 'relative' }}>
              <button
                onClick={() => setDatePickerOpen(v => !v)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: datePickerOpen ? '#e1e9ee' : '#f0f4f7', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background 0.15s' }}
                onMouseEnter={e => { if (!datePickerOpen) e.currentTarget.style.background = '#e8eff3'; }}
                onMouseLeave={e => { if (!datePickerOpen) e.currentTarget.style.background = '#f0f4f7'; }}
              >
                <span style={{ fontSize: 18, color: '#566166', fontFamily: 'Material Symbols Outlined' }}>calendar_today</span>
                <span style={{ fontSize: 13, color: '#2a3439' }}>{formatDateShort(dateRange[0])} - {formatDateShort(dateRange[1])}</span>
                <span style={{ fontSize: 18, color: '#566166', fontFamily: 'Material Symbols Outlined', transform: datePickerOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>expand_more</span>
              </button>

              {datePickerOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  width: 280, background: '#fff', borderRadius: 12,
                  boxShadow: '0 8px 30px rgba(42,52,57,0.12), 0 2px 8px rgba(42,52,57,0.06)',
                  border: '1px solid #e1e9ee', overflow: 'hidden', zIndex: 100,
                }}>
                  <div style={{ padding: '10px 14px', borderBottom: '1px solid #e1e9ee' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#717c82', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Quick Select</p>
                  </div>
                  <div style={{ padding: '6px 0' }}>
                    {DATE_PRESETS.map(p => (
                      <button key={p.key} onClick={() => handlePresetSelect(p.key)}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '9px 14px', border: 'none',
                          background: datePreset === p.key ? '#f0f4f7' : 'transparent',
                          cursor: 'pointer', fontSize: 13,
                          color: datePreset === p.key ? '#2d6197' : '#2a3439',
                          fontWeight: datePreset === p.key ? 600 : 400,
                          fontFamily: 'Inter, sans-serif', textAlign: 'left', transition: 'background 0.1s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#f0f4f7'; }}
                        onMouseLeave={e => { if (datePreset !== p.key) e.currentTarget.style.background = 'transparent'; }}
                      >
                        {p.label}
                        {datePreset === p.key && <span style={{ fontSize: 16, fontFamily: 'Material Symbols Outlined', color: '#2d6197' }}>check</span>}
                      </button>
                    ))}
                  </div>
                  <div style={{ padding: '12px 14px', borderTop: '1px solid #e1e9ee' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#717c82', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 8px' }}>Custom Range</p>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                      <input type="date" value={customStart} onChange={e => setCustomStart(e.target.value)}
                        style={{ flex: 1, padding: '6px 8px', fontSize: 12, border: '1.5px solid #e1e9ee', borderRadius: 6, fontFamily: 'inherit', outline: 'none' }}
                        onFocus={e => e.target.style.borderColor = '#2d6197'}
                        onBlur={e => e.target.style.borderColor = '#e1e9ee'} />
                      <span style={{ fontSize: 12, color: '#717c82', alignSelf: 'center' }}>to</span>
                      <input type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)}
                        style={{ flex: 1, padding: '6px 8px', fontSize: 12, border: '1.5px solid #e1e9ee', borderRadius: 6, fontFamily: 'inherit', outline: 'none' }}
                        onFocus={e => e.target.style.borderColor = '#2d6197'}
                        onBlur={e => e.target.style.borderColor = '#e1e9ee'} />
                    </div>
                    <button onClick={handleCustomApply}
                      disabled={!customStart || !customEnd}
                      style={{
                        width: '100%', padding: '7px', background: customStart && customEnd ? '#2d6197' : '#e1e9ee',
                        color: customStart && customEnd ? '#fff' : '#717c82', border: 'none', borderRadius: 6,
                        fontSize: 12, fontWeight: 600, cursor: customStart && customEnd ? 'pointer' : 'not-allowed',
                        fontFamily: 'inherit', transition: 'all 0.15s',
                      }}>
                      Apply Range
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Help Center */}
            <button
              onClick={() => router.push('/help')}
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
              title="Help Center"
            >
              <span style={{ fontSize: 20, fontFamily: 'Material Symbols Outlined' }}>help</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => router.push(isAdmin ? '/admin/comms/logs' : isReviewer ? '/reviewer/notifications' : '/portal/notifications')}
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

            {/* Settings / Stats */}
            <button
              onClick={() => router.push(isAdmin ? '/admin/settings' : isReviewer ? '/reviewer/stats' : '/portal/profile')}
              style={{
                width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%',
                background: pathname.startsWith(isAdmin ? '/admin/settings' : isReviewer ? '/reviewer/stats' : '/portal/profile') ? '#e8eff3' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: pathname.startsWith(isAdmin ? '/admin/settings' : isReviewer ? '/reviewer/stats' : '/portal/profile') ? '#2d6197' : '#566166',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e8eff3'; }}
              onMouseLeave={e => { if (!pathname.startsWith(isAdmin ? '/admin/settings' : isReviewer ? '/reviewer/stats' : '/portal/profile')) e.currentTarget.style.background = 'transparent'; }}
              title={isAdmin ? 'Platform Settings' : isReviewer ? 'My Stats' : 'Profile Settings'}
            >
              <span style={{ fontSize: 20, fontFamily: 'Material Symbols Outlined' }}>{isReviewer ? 'bar_chart' : 'settings'}</span>
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
                      onClick={() => { setProfileOpen(false); sessionStorage.removeItem(isAdmin ? 'lexipost_admin_auth' : isReviewer ? 'lexipost_reviewer_auth' : 'lexipost_user_auth'); router.push(isAdmin ? '/auth/admin' : isReviewer ? '/reviewer/login' : '/login'); }}
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
