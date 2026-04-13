'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  FileCheck, Clock, CheckCircle, XCircle, BarChart3, LogOut,
  Bell, ChevronDown, Search, List, AlertTriangle, Copy, Shield, Menu, X
} from 'lucide-react';
import { Avatar, Badge } from '../ui';

const NAV = [
  { label: 'Dashboard', path: '/reviewer', icon: <List size={16} /> },
  { label: 'Verification Queue', path: '/reviewer/pending', icon: <Clock size={16} />, badge: 6 },
  { label: 'Bulk Verify', path: '/reviewer/bulk', icon: <CheckCircle size={16} /> },
  { label: 'Flagged', path: '/reviewer/flagged', icon: <AlertTriangle size={16} />, badge: 3 },
  { label: 'Duplicate Detection', path: '/reviewer/duplicates', icon: <Copy size={16} /> },
  { label: 'Auto-Verify Rules', path: '/reviewer/rules', icon: <Shield size={16} /> },
  { label: 'Rejection Log', path: '/reviewer/log', icon: <XCircle size={16} /> },
  { label: 'My Stats', path: '/reviewer/stats', icon: <BarChart3 size={16} /> },
];

export default function ReviewerLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isActive = (path) => path === '/reviewer' ? pathname === path : pathname.startsWith(path);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#EEF2FF' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 49, display: 'none' }}
          className="reviewer-overlay"
        />
      )}
      <style>{`
        @media (max-width: 768px) {
          .reviewer-overlay { display: block !important; }
        }
      `}</style>

      {/* Sidebar */}
      <aside
        className={`reviewer-sidebar ${sidebarOpen ? 'open' : 'closed'}`}
        style={{
          width: 220,
          background: '#0F172A',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        {/* Logo */}
        <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, #10B981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck size={18} color="#fff" />
            </div>
            <div>
              <p style={{ color: '#F8FAFC', fontWeight: 700, fontSize: 14, margin: 0 }}>LexiPost</p>
              <p style={{ color: '#10B981', fontSize: 10, margin: 0, fontWeight: 600 }}>Reviewer Panel</p>
            </div>
          </div>
          {/* Mobile close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="reviewer-hamburger"
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              border: 'none',
              background: '#1E293B',
              borderRadius: 8,
              cursor: 'pointer',
              color: '#94A3B8',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Queue Summary */}
        <div style={{ margin: '12px 10px', padding: '12px', background: '#1E293B', borderRadius: 12, border: '1px solid #334155' }}>
          <p style={{ color: '#94A3B8', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px' }}>Today's Queue</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {[{ label: 'Pending', val: 6, color: '#F59E0B' }, { label: 'Done', val: 18, color: '#10B981' }].map(s => (
              <div key={s.label} style={{ textAlign: 'center', padding: '6px', background: '#0F172A', borderRadius: 8 }}>
                <p style={{ fontSize: 18, fontWeight: 800, color: s.color, margin: 0 }}>{s.val}</p>
                <p style={{ fontSize: 9, color: '#64748B', margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '4px 8px' }}>
          {NAV.map(item => (
            <button key={item.path} onClick={() => { router.push(item.path); setSidebarOpen(false); }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 10px', borderRadius: 9, border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 13, fontWeight: isActive(item.path) ? 600 : 400,
                textAlign: 'left', marginBottom: 2, transition: 'all 0.1s',
                background: isActive(item.path) ? '#10B98120' : 'transparent',
                color: isActive(item.path) ? '#34D399' : '#94A3B8',
                borderLeft: isActive(item.path) ? '2px solid #10B981' : '2px solid transparent',
              }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ color: isActive(item.path) ? '#10B981' : '#64748B' }}>{item.icon}</span>
                {item.label}
              </span>
              {item.badge && (
                <span style={{ background: '#EF4444', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 20, padding: '1px 6px', minWidth: 18, textAlign: 'center' }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid #1E293B' }}>
          <button onClick={() => router.push('/login')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', borderRadius: 9, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, color: '#EF4444', background: 'transparent' }}>
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="reviewer-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Header */}
        <header className="reviewer-header" style={{ height: 60, background: '#fff', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Mobile hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="reviewer-hamburger"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                borderRadius: 8,
                color: '#64748B',
              }}
            >
              <Menu size={20} />
            </button>
            <div className="reviewer-header-search" style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input placeholder="Search submissions..." style={{ padding: '7px 12px 7px 30px', fontSize: 13, background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 10, outline: 'none', fontFamily: 'inherit', width: 200 }}
                onFocus={e => e.target.style.borderColor = '#10B981'}
                onBlur={e => e.target.style.borderColor = '#E2E8F0'} />
            </div>
          </div>
          <div className="reviewer-header-center" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>Reviewer Panel</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => router.push('/reviewer/notifications')} style={{ position: 'relative', background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748B' }}>
              <Bell size={15} />
              <span style={{ position: 'absolute', top: 7, right: 7, width: 7, height: 7, borderRadius: '50%', background: '#EF4444', border: '1.5px solid #fff' }} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <Avatar name="Sarah Chen" size={32} color="#10B981" />
              <div className="mobile-hide">
                <p style={{ fontSize: 12, fontWeight: 600, color: '#0F172A', margin: 0 }}>Sarah Chen</p>
                <p style={{ fontSize: 10, color: '#94A3B8', margin: 0 }}>Senior Reviewer</p>
              </div>
              <ChevronDown size={12} color="#94A3B8" className="mobile-hide" />
            </div>
          </div>
        </header>

        <main style={{ flex: 1, padding: '24px', overflowY: 'auto', overflowX: 'hidden', maxWidth: '100%' }} className="animate-fade-in layout-content">
          {children}
        </main>
      </div>
    </div>
  );
}
