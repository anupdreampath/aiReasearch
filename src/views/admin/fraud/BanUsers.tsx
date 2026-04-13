'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const enforcementActions = [
  {
    id: 1,
    contributor: 'Marcus Chen',
    contributorId: '88210',
    avatar: 'https://ui-avatars.com/api/?name=Marcus+Chen&background=526074&color=fff&size=64',
    actionType: 'Banned',
    actionBg: '#fe8983',
    actionColor: '#752121',
    reason: 'Systematic data manipulation...',
    timeline: 'Permanent',
    isPermanent: true,
  },
  {
    id: 2,
    contributor: 'Elena Rodriguez',
    contributorId: '45901',
    avatar: 'https://ui-avatars.com/api/?name=Elena+Rodriguez&background=2d6197&color=fff&size=64',
    actionType: 'Suspended',
    actionBg: '#d5e3fc',
    actionColor: '#455367',
    reason: 'Low quality verification submissions',
    timeline: 'Ends: Oct 24, 2023',
    startDate: 'Starts: Oct 17',
  },
  {
    id: 3,
    contributor: 'Julian Thorne',
    contributorId: '99104',
    avatar: 'https://ui-avatars.com/api/?name=Julian+Thorne&background=006b62&color=fff&size=64',
    actionType: 'Warned',
    actionBg: '#d9e4ea',
    actionColor: '#566166',
    reason: 'Repeated late assignment hand-ins',
    timeline: 'N/A - Warning only',
  },
];

const actionTypes = [
  { label: 'Warn', value: 'warn' },
  { label: 'Suspend 7d', value: 'suspend_7d' },
  { label: 'Suspend 30d', value: 'suspend_30d' },
  { label: 'Permanent Ban', value: 'ban' },
];

export default function BanUsers() {
  const router = useRouter();
  const [selectedAction, setSelectedAction] = useState('ban');
  const [notifyUser, setNotifyUser] = useState(true);

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, gap: 12 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Ban &amp; Suspend Users</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 32 }}>
        {/* Left Column: Active Bans Table */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Filter Bar */}
          <div style={{ padding: 16, background: '#ffffff', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', ...ms, fontSize: 16, color: '#566166' }}>search</span>
              <input type="text" placeholder="Search contributors..." style={{ width: '100%', padding: '10px 16px 10px 40px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 14 }} />
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, color: '#2a3439', cursor: 'pointer' }}>
              <span style={{ ...ms, fontSize: 16 }}>filter_list</span>
              Filters
            </button>
          </div>

          {/* Table */}
          <div style={{ background: '#ffffff', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(169,180,185,0.1)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr style={{ background: 'rgba(232,239,243,0.5)' }}>
                    {['Contributor', 'Action Type', 'Reason', 'Timeline', 'Actions'].map((h, i) => (
                      <th key={h} style={{ padding: '16px 24px', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: i === 4 ? 'right' : 'left' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {enforcementActions.map((action) => (
                    <tr key={action.id} style={{ borderTop: '1px solid #e8eff3' }}>
                      <td style={{ padding: '20px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <img src={action.avatar} alt="" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                          <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: '#2a3439', margin: 0 }}>{action.contributor}</p>
                            <p style={{ fontSize: 11, color: '#566166', margin: '2px 0 0 0' }}>ID: {action.contributorId}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '20px 24px' }}>
                        <span style={{ padding: '4px 10px', background: action.actionBg, color: action.actionColor, borderRadius: 9999, fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>
                          {action.actionType}
                        </span>
                      </td>
                      <td style={{ padding: '20px 24px' }}>
                        <p style={{ fontSize: 12, color: '#566166', margin: 0, width: 128, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{action.reason}</p>
                      </td>
                      <td style={{ padding: '20px 24px' }}>
                        {action.isPermanent ? (
                          <span style={{ padding: '4px 10px', background: '#d9e4ea', color: '#2a3439', borderRadius: 9999, fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>
                            {action.timeline}
                          </span>
                        ) : (
                          <div>
                            <p style={{ fontSize: 10, fontWeight: 600, color: '#2a3439', margin: '0 0 2px 0' }}>{action.timeline}</p>
                            {action.startDate && <p style={{ fontSize: 9, color: '#566166', margin: 0, textTransform: 'uppercase' }}>{action.startDate}</p>}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '20px 24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                          {action.actionType !== 'Warned' && (
                            <button style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#006b62', borderRadius: 6 }} title={action.actionType === 'Banned' ? 'Lift Ban' : 'Extend'}>
                              <span style={{ ...ms, fontSize: 18 }}>{action.actionType === 'Banned' ? 'gavel' : 'more_time'}</span>
                            </button>
                          )}
                          <button style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#2d6197', borderRadius: 6 }} title="View Profile">
                            <span style={{ ...ms, fontSize: 18 }}>visibility</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div style={{ padding: '16px 24px', background: 'rgba(232,239,243,0.3)', borderTop: '1px solid #e8eff3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: 12, color: '#566166', margin: 0 }}>Showing 3 of 14 active enforcement actions</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ padding: '6px 12px', border: '1px solid rgba(169,180,185,0.3)', borderRadius: 6, fontSize: 12, fontWeight: 600, color: '#566166', background: 'transparent', cursor: 'pointer' }}>Prev</button>
                <button style={{ padding: '6px 12px', border: '1px solid rgba(169,180,185,0.3)', borderRadius: 6, fontSize: 12, fontWeight: 600, color: '#566166', background: 'transparent', cursor: 'pointer' }}>Next</button>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Take Action Form */}
        <aside>
          <div style={{ background: '#ffffff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 24px rgba(42,52,57,0.05)', border: '1px solid rgba(169,180,185,0.1)', position: 'sticky', top: 96 }}>
            <div style={{ padding: 24, background: '#1d548a', color: '#f5f7ff' }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Take Action</h3>
              <p style={{ fontSize: 12, color: 'rgba(245,247,255,0.7)', margin: '4px 0 0 0' }}>Submit a new administrative enforcement</p>
            </div>

            <form style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Contributor Search */}
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Contributor</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', ...ms, fontSize: 16, color: '#566166' }}>person_search</span>
                  <input type="text" placeholder="Search by name or ID..." style={{ width: '100%', padding: '10px 16px 10px 40px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 14 }} />
                </div>
              </div>

              {/* Action Type */}
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Action Type</label>
                <select
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  style={{ width: '100%', padding: '10px 16px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 14, cursor: 'pointer' }}
                >
                  {actionTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Warning for Permanent Ban */}
              {selectedAction === 'ban' && (
                <div style={{ padding: 12, background: 'rgba(254,137,131,0.2)', borderRadius: 8, display: 'flex', gap: 12, alignItems: 'flex-start', border: '1px solid rgba(254,137,131,0.3)' }}>
                  <span style={{ ...ms, fontSize: 20, color: '#9f403d' }}>warning</span>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#752121', margin: '0 0 4px 0' }}>Irreversible Action</p>
                    <p style={{ fontSize: 11, color: '#752121', margin: 0, opacity: 0.8 }}>Permanent bans remove all platform access. This cannot be undone automatically by the system.</p>
                  </div>
                </div>
              )}

              {/* Reason */}
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                  <span>Reason</span>
                  <span style={{ fontSize: 10, fontWeight: 400, fontStyle: 'italic', color: '#9f403d' }}>Required</span>
                </label>
                <textarea placeholder="Provide detailed justification for this action..." rows={3} style={{ width: '100%', padding: '10px 16px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 14, resize: 'none' }} />
              </div>

              {/* Notify Toggle */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#2a3439', margin: '0 0 2px 0' }}>Notify Contributor</p>
                  <p style={{ fontSize: 12, color: '#566166', margin: 0 }}>Send automated email notification</p>
                </div>
                <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="checkbox" checked={notifyUser} onChange={(e) => setNotifyUser(e.target.checked)} style={{ display: 'none' }} />
                  <div style={{
                    width: 44,
                    height: 24,
                    background: notifyUser ? '#2d6197' : '#e1e9ee',
                    borderRadius: 9999,
                    position: 'relative',
                    transition: 'background 0.2s',
                  }}>
                    <div style={{
                      width: 20,
                      height: 20,
                      background: '#ffffff',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: 2,
                      left: notifyUser ? 22 : 2,
                      transition: 'left 0.2s',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    }} />
                  </div>
                </label>
              </div>

              {/* Internal Note */}
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Internal Note</label>
                <textarea placeholder="Private notes for other admins..." rows={2} style={{ width: '100%', padding: '10px 16px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 14, resize: 'none', fontStyle: 'italic' }} />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  background: selectedAction === 'ban' ? '#9f403d' : '#2d6197',
                  color: '#fff7f6',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: selectedAction === 'ban' ? '0 4px 12px rgba(159,64,61,0.3)' : '0 4px 12px rgba(45,97,151,0.3)',
                }}
              >
                <span style={{ ...ms, fontSize: 18 }}>shield_lock</span>
                Confirm {selectedAction === 'ban' ? 'Permanent Ban' : selectedAction === 'warn' ? 'Warning' : 'Suspension'}
              </button>
            </form>
          </div>

          {/* Security Health */}
          <div style={{ marginTop: 24, padding: 16, borderLeft: '4px solid #006b62', background: 'rgba(145,254,239,0.1)', borderRadius: '0 8px 8px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ ...ms, fontSize: 24, color: '#006b62' }}>verified_user</span>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#2a3439', textTransform: 'uppercase', margin: '0 0 2px 0' }}>Security Health</p>
              <p style={{ fontSize: 10, color: '#566166', margin: 0 }}>98.2% Active Contributors in good standing</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer style={{ padding: '24px 0', marginTop: 48, borderTop: '1px solid #e8eff3', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, fontWeight: 500, color: '#a9b4b9', letterSpacing: '0.05em', gap: 12 }}>
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
