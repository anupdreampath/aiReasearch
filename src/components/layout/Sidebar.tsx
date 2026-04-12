'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const ADMIN_NAV = [
  { section: 'Overview', items: [
    { label: 'Dashboard', path: '/admin', icon: 'dashboard' },
    { label: 'Analytics', path: '/admin/analytics', icon: 'analytics' },
    { label: 'Activity Log', path: '/admin/activity-log', icon: 'history' },
  ]},
  { section: 'Words', items: [
    { label: 'Word List', path: '/admin/words', icon: 'list' },
    { label: 'Create Word', path: '/admin/words/create', icon: 'add_circle' },
    { label: 'Word Performance', path: '/admin/words/performance', icon: 'monitoring' },
  ]},
  { section: 'Assignments', items: [
    { label: 'Assignment List', path: '/admin/assignments', icon: 'assignment' },
    { label: 'Create Assignment', path: '/admin/assignments/create', icon: 'edit_note' },
    { label: 'Assignment Calendar', path: '/admin/assignments/calendar', icon: 'calendar_month' },
    { label: 'Auto-Assignment Rules', path: '/admin/assignments/rules', icon: 'smart_toy' },
  ]},
  { section: 'Contributors', items: [
    { label: 'Contributor List', path: '/admin/contributors', icon: 'group' },
    { label: 'Add Contributor', path: '/admin/contributors/add', icon: 'person_add' },
    { label: 'Contributor Segments', path: '/admin/contributors/segments', icon: 'groups_2' },
    { label: 'Risk & Flags', path: '/admin/contributors/risk', icon: 'gpp_maybe' },
  ]},
  { section: 'Verification', items: [
    { label: 'Submission Queue', path: '/admin/submissions', icon: 'playlist_add_check' },
    { label: 'Verification Queue', path: '/admin/submissions/pending', icon: 'verified' },
    { label: 'Bulk Verify', path: '/admin/submissions/bulk', icon: 'done_all' },
    { label: 'Auto-Verify Rules', path: '/admin/submissions/rules', icon: 'rule' },
  ]},
  { section: 'Data', items: [
    { label: 'Scraped Content', path: '/admin/scraped', icon: 'database' },
    { label: 'Data Integrity', path: '/admin/scraped/integrity', icon: 'fact_check' },
  ]},
  { section: 'Finance', items: [
    { label: 'Payment Dashboard', path: '/admin/payments', icon: 'account_balance_wallet' },
    { label: 'Pending Payments', path: '/admin/payments/pending', icon: 'pending' },
    { label: 'Process Payments', path: '/admin/payments/process', icon: 'payments' },
    { label: 'Payment History', path: '/admin/payments/history', icon: 'history' },
    { label: 'Earnings Ledger', path: '/admin/payments/ledger', icon: 'receipt_long' },
    { label: 'Failed Payments', path: '/admin/payments/failed', icon: 'error' },
  ]},
  { section: 'Comms', items: [
    { label: 'Email Templates', path: '/admin/comms/templates', icon: 'mail' },
    { label: 'Notification Logs', path: '/admin/comms/logs', icon: 'description' },
    { label: 'Broadcast Message', path: '/admin/comms/broadcast', icon: 'campaign' },
  ]},
  { section: 'Export', items: [
    { label: 'Data Export', path: '/admin/export', icon: 'file_download' },
    { label: 'Scheduled Exports', path: '/admin/export/scheduled', icon: 'schedule_send' },
    { label: 'Report Generator', path: '/admin/export/reports', icon: 'lab_profile' },
  ]},
  { section: 'System', items: [
    { label: 'Platform Settings', path: '/admin/settings', icon: 'settings' },
    { label: 'Rate Limits', path: '/admin/settings/rates', icon: 'speed' },
    { label: 'API Keys', path: '/admin/settings/api', icon: 'key' },
    { label: 'Storage Settings', path: '/admin/settings/storage', icon: 'storage' },
  ]},
  { section: 'Security', items: [
    { label: 'Fraud Dashboard', path: '/admin/fraud', icon: 'security' },
    { label: 'Duplicate Detection', path: '/admin/fraud/duplicates', icon: 'content_copy' },
    { label: 'IP Tracking', path: '/admin/fraud/ip', icon: 'location_on' },
    { label: 'Ban Users', path: '/admin/fraud/bans', icon: 'block' },
  ]},
];

const CONTRIBUTOR_NAV = [
  { section: 'Main', items: [
    { label: 'Dashboard', path: '/portal', icon: 'dashboard' },
  ]},
  { section: 'Tasks', items: [
    { label: 'My Tasks', path: '/portal/tasks', icon: 'assignment' },
    { label: 'Task History', path: '/portal/tasks/history', icon: 'history' },
  ]},
  { section: 'Earnings', items: [
    { label: 'Earnings', path: '/portal/earnings', icon: 'payments' },
    { label: 'Payment History', path: '/portal/earnings/history', icon: 'receipt' },
    { label: 'Payment Method', path: '/portal/earnings/method', icon: 'credit_card' },
  ]},
  { section: 'Account', items: [
    { label: 'Notifications', path: '/portal/notifications', icon: 'notifications' },
    { label: 'Performance', path: '/portal/performance', icon: 'trending_up' },
    { label: 'Profile', path: '/portal/profile', icon: 'person' },
  ]},
  { section: 'Help', items: [
    { label: 'Guidelines', path: '/portal/guidelines', icon: 'menu_book' },
    { label: 'Help Center', path: '/help', icon: 'help' },
  ]},
];

export default function Sidebar({ mode = 'admin', mobileOpen = false, onClose }: { mode?: string; mobileOpen?: boolean; onClose?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const nav = mode === 'admin' ? ADMIN_NAV : CONTRIBUTOR_NAV;
  const isAdmin = mode === 'admin';

  const isActive = (path) => {
    if (path === '/admin' || path === '/portal') return pathname === path;
    return pathname.startsWith(path);
  };

  const handleNav = (path) => {
    router.push(path);
    if (onClose) onClose();
  };

  return (
    <>
    {mobileOpen && <div onClick={onClose} className="sidebar-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 49 }} />}
    <style>{`
      @media (max-width: 768px) {
        .sidebar-panel { transform: ${mobileOpen ? 'translateX(0)' : 'translateX(-100%)'} !important; transition: transform 0.25s ease !important; }
        .layout-main { margin-left: 0 !important; }
        .layout-header { padding: 0 16px !important; }
        .layout-content { padding: 16px !important; }
      }
    `}</style>
    <aside className="sidebar-panel" style={{
      width: 256,
      minHeight: '100vh',
      background: '#f7f9fb',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100vh',
      overflowY: 'auto',
      zIndex: 50,
      borderRight: '1px solid #e1e9ee',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 24px 16px' }}>
        <h1 style={{ 
          fontSize: '18px', 
          fontWeight: 800, 
          color: '#2a3439', 
          margin: 0,
          fontFamily: 'Manrope, sans-serif',
        }}>Sentimental Grid</h1>
        <span style={{ 
          display: 'inline-block',
          marginTop: '4px',
          padding: '2px 8px',
          background: 'rgba(45,97,151,0.1)',
          color: '#2d6197',
          fontSize: '10px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          borderRadius: '4px',
        }}>
          {isAdmin ? 'Admin Console' : 'Contributor Portal'}
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0 12px 16px', overflowY: 'auto' }}>
        {nav.map(section => (
          <div key={section.section} style={{ marginBottom: 20 }}>
            <p style={{
              padding: '0 12px',
              marginBottom: '8px',
              fontSize: '10px',
              fontWeight: 700,
              color: '#566166',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontFamily: 'Inter, sans-serif',
            }}>
              {section.section}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {section.items.map(item => {
                const active = isActive(item.path);
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      fontWeight: active ? 600 : 500,
                      textAlign: 'left',
                      background: active ? '#2d6197' : 'transparent',
                      color: active ? '#ffffff' : '#566166',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={e => { 
                      if (!active) { 
                        e.currentTarget.style.background = '#e8eff3'; 
                        e.currentTarget.style.color = '#2a3439'; 
                      }
                    }}
                    onMouseLeave={e => { 
                      if (!active) { 
                        e.currentTarget.style.background = 'transparent'; 
                        e.currentTarget.style.color = '#566166'; 
                      }
                    }}
                  >
                    <span style={{
                      fontSize: '18px',
                      fontFamily: 'Material Symbols Outlined',
                      fontVariationSettings: active ? "'FILL' 1, 'wght' 500" : "'FILL' 0, 'wght' 400",
                      width: 18,
                      height: 18,
                      lineHeight: '18px',
                      overflow: 'hidden',
                      display: 'inline-block',
                      flexShrink: 0,
                    }}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Menu */}
      <div style={{ 
        padding: '12px', 
        borderTop: '1px solid #e1e9ee',
        flexShrink: 0,
        background: '#f7f9fb',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <NavButton icon="manage_accounts" label="Role Management" onClick={() => handleNav('/admin/roles')} />
          <NavButton icon="history" label="Activity Log" onClick={() => handleNav('/admin/activity-log')} />
          <NavButton icon="person" label="Profile" onClick={() => handleNav('/portal/profile')} />
        </div>
      </div>
    </aside>
    </>
  );
}

function NavButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 12px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        fontSize: '13px',
        fontWeight: 500,
        textAlign: 'left',
        background: 'transparent',
        color: '#566166',
        transition: 'all 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#e8eff3'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
    >
      <span style={{ fontSize: '18px', fontFamily: 'Material Symbols Outlined', width: 18, height: 18, lineHeight: '18px', overflow: 'hidden', display: 'inline-block', flexShrink: 0 }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
