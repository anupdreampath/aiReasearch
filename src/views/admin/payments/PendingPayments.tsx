'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const mockPayments = [
  {
    id: 1,
    contributor: 'Sarah Jenkins',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=fe8983&color=fff&size=64',
    word: 'Luminescence',
    amount: '$1,250.00',
    approvedAt: 'Oct 02, 2023',
    daysWaiting: 12,
    method: 'WIRE',
    methodBg: '#d5e3fc',
    methodColor: '#455367',
    risk: 'Duplicate IP',
  },
  {
    id: 2,
    contributor: 'David Chen',
    avatar: 'https://ui-avatars.com/api/?name=David+Chen&background=2d6197&color=fff&size=64',
    word: 'Mellifluous',
    amount: '$840.00',
    approvedAt: 'Oct 10, 2023',
    daysWaiting: 4,
    method: 'STRIPE',
    methodBg: '#91feef',
    methodColor: '#006259',
    risk: null,
  },
  {
    id: 3,
    contributor: 'Dr. Elena Rodriguez',
    avatar: 'https://ui-avatars.com/api/?name=Elena+Rodriguez&background=006b62&color=fff&size=64',
    word: 'Petrichor',
    amount: '$2,100.00',
    approvedAt: 'Oct 05, 2023',
    daysWaiting: 9,
    method: 'PAYPAL',
    methodBg: '#d2e4ff',
    methodColor: '#1c5489',
    risk: null,
  },
  {
    id: 4,
    contributor: 'Marcus Kim',
    avatar: null,
    initials: 'MK',
    word: 'Ineffable',
    amount: '$320.00',
    approvedAt: 'Oct 13, 2023',
    daysWaiting: 1,
    method: 'WIRE',
    methodBg: '#d5e3fc',
    methodColor: '#455367',
    risk: null,
  },
];

export default function PendingPayments() {
  const router = useRouter();
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const selectAll = () => {
    setSelected(selected.length === mockPayments.length ? [] : mockPayments.map(p => p.id));
  };

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* TopAppBar */}
      <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Pending Payments</h1>
          <span style={{ fontSize: 13, color: '#566166', marginTop: 4, display: 'block' }}>Total Pending: $42,850.00</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', ...ms, fontSize: 18, color: '#a9b4b9' }}>search</span>
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '10px 12px 10px 40px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13, maxWidth: 256, width: '100%' }}
            />
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px',
            background: '#ffffff',
            border: '1px solid #e8eff3',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            color: '#2a3439',
            cursor: 'pointer',
          }}>
            <span style={{ ...ms, fontSize: 16 }}>ios_share</span>
            Export
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px',
            background: '#2d6197',
            color: '#f5f7ff',
            border: 'none',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
          }}>
            <span style={{ ...ms, fontSize: 16 }}>bolt</span>
            Process All
          </button>
        </div>
      </header>

      {/* Filter Bar */}
      <div style={{ padding: 20, background: '#ffffff', borderRadius: 12, marginBottom: 24, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 160 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: 4 }}>Word</label>
          <select style={{ padding: '10px 32px 10px 12px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer', appearance: 'none' }}>
            <option>All Words</option>
            <option>Serendipity</option>
            <option>Ephemeral</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 160 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: 4 }}>Contributor</label>
          <select style={{ padding: '10px 32px 10px 12px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer', appearance: 'none' }}>
            <option>All Contributors</option>
            <option>Top Tier (5.0)</option>
            <option>New Registered</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 160 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: 4 }}>Payment Method</label>
          <select style={{ padding: '10px 32px 10px 12px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer', appearance: 'none' }}>
            <option>All Methods</option>
            <option>Wire Transfer</option>
            <option>Stripe Connect</option>
            <option>PayPal</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 160 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: 4 }}>Date Range</label>
          <button style={{ padding: '10px 12px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13, color: '#566166', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <span>Oct 01 - Oct 14</span>
            <span style={{ ...ms, fontSize: 14 }}>calendar_today</span>
          </button>
        </div>
        <button style={{ padding: 10, background: 'transparent', border: 'none', cursor: 'pointer', color: '#2d6197', borderRadius: 8 }}>
          <span style={{ ...ms, fontSize: 20 }}>filter_list</span>
        </button>
      </div>

      {/* Bulk Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <input
            type="checkbox"
            checked={selected.length === mockPayments.length}
            onChange={selectAll}
            style={{ width: 16, height: 16, cursor: 'pointer' }}
          />
          <span style={{ fontSize: 13, fontWeight: 500, color: '#566166' }}>Select All (128 items)</span>
        </div>
        {selected.length > 0 && (
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 16px',
            background: '#d2e4ff',
            color: '#2d6197',
            border: '1px solid #bad7ff',
            borderRadius: 9999,
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
          }}>
            <span style={{ ...ms, fontSize: 16 }}>credit_score</span>
            Pay Selected ({selected.length})
          </button>
        )}
      </div>

      {/* Payments Table */}
      <div style={{ background: '#ffffff', borderRadius: 12, overflow: 'hidden', marginBottom: 32 }}>
        <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
          <thead>
            <tr style={{ background: 'rgba(232,239,243,0.5)' }}>
              <th style={{ padding: 16, width: 40 }}>
                <input type="checkbox" checked={selected.length === mockPayments.length} onChange={selectAll} style={{ width: 16, height: 16 }} />
              </th>
              {['Contributor', 'Word', 'Amount', 'Approved At', 'Days Waiting', 'Method', 'Actions'].map((h, i) => (
                <th key={h} style={{ padding: 16, fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: i === 6 ? 'right' : 'left' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockPayments.map((payment, index) => (
              <tr key={payment.id} style={{ background: index % 2 === 1 ? 'rgba(247,249,251,0.5)' : '#ffffff', transition: 'background 0.15s' }}>
                <td style={{ padding: 16 }}>
                  <input type="checkbox" checked={selected.includes(payment.id)} onChange={() => toggleSelect(payment.id)} style={{ width: 16, height: 16 }} />
                </td>
                <td style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ position: 'relative' }}>
                      {payment.avatar ? (
                        <img src={payment.avatar} alt="" style={{ width: 36, height: 36, borderRadius: '50%' }} />
                      ) : (
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#e8eff3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#566166' }}>
                          {payment.initials}
                        </div>
                      )}
                      {payment.risk && (
                        <span style={{
                          position: 'absolute', top: -2, right: -2, width: 16, height: 16, borderRadius: '50%', background: '#9f403d', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <span style={{ ...ms, fontSize: 10, color: '#ffffff' }}>warning</span>
                        </span>
                      )}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#2a3439', margin: 0 }}>{payment.contributor}</p>
                      {payment.risk ? (
                        <p style={{ fontSize: 11, color: '#9f403d', margin: 0, fontWeight: 600 }}>Risk: {payment.risk}</p>
                      ) : (
                        <p style={{ fontSize: 11, color: '#566166', margin: 0 }}>Contributor</p>
                      )}
                    </div>
                  </div>
                </td>
                <td style={{ padding: 16, fontSize: 13, color: '#2a3439' }}>{payment.word}</td>
                <td style={{ padding: 16, fontSize: 13, fontWeight: 700, color: '#2a3439' }}>{payment.amount}</td>
                <td style={{ padding: 16, fontSize: 13, color: '#566166' }}>{payment.approvedAt}</td>
                <td style={{ padding: 16 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '6px 12px',
                    borderRadius: 8,
                    background: payment.daysWaiting > 7 ? 'rgba(254,137,131,0.3)' : '#f0f4f7',
                    width: 'fit-content',
                  }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: payment.daysWaiting > 7 ? '#9f403d' : '#a9b4b9',
                    }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: payment.daysWaiting > 7 ? '#752121' : '#566166' }}>
                      {payment.daysWaiting} Days
                    </span>
                  </div>
                </td>
                <td style={{ padding: 16 }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: 9999,
                    background: payment.methodBg,
                    color: payment.methodColor,
                    fontSize: 10,
                    fontWeight: 700,
                  }}>
                    {payment.method}
                  </span>
                </td>
                <td style={{ padding: 16, textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
                    <button style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#2d6197', borderRadius: 6 }}>
                      <span style={{ ...ms, fontSize: 18 }}>payments</span>
                    </button>
                    <button style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#a9b4b9', borderRadius: 6 }}>
                      <span style={{ ...ms, fontSize: 18 }}>pause_circle</span>
                    </button>
                    <button style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#a9b4b9', borderRadius: 6 }}>
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
        <div style={{ padding: 16, background: '#f7f9fb', borderTop: '1px solid #e8eff3', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: '#566166' }}>Showing 1-4 of 128 results</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: '1px solid #e8eff3', background: '#ffffff', color: '#a9b4b9', cursor: 'pointer' }}>
              <span style={{ ...ms, fontSize: 16 }}>chevron_left</span>
            </button>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, background: '#2d6197', color: '#ffffff', fontSize: 12, fontWeight: 700, border: 'none' }}>1</button>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: '1px solid #e8eff3', background: '#ffffff', color: '#566166', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>2</button>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: '1px solid #e8eff3', background: '#ffffff', color: '#566166', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>3</button>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: '1px solid #e8eff3', background: '#ffffff', color: '#a9b4b9', cursor: 'pointer' }}>
              <span style={{ ...ms, fontSize: 16 }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Statistics Bento */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, marginBottom: 40 }}>
        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Pending Payouts</span>
            <span style={{ ...ms, fontSize: 20, color: '#2d6197' }}>account_balance_wallet</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>$42.8k</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#006b62' }}>+12% vs last week</span>
          </div>
          <div style={{ marginTop: 16, height: 6, background: '#f0f4f7', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '72%', background: '#2d6197', borderRadius: 3 }} />
          </div>
        </div>

        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Avg. Delay</span>
            <span style={{ ...ms, fontSize: 20, color: '#9f403d' }}>timer</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>4.2 Days</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#9f403d' }}>+0.5d spike</span>
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 4 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i === 3 ? '#9f403d' : '#e8eff3' }} />
            ))}
          </div>
        </div>

        <div style={{ padding: 24, background: '#2d6197', borderRadius: 12, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -20, bottom: -20, opacity: 0.1 }}>
            <span style={{ ...ms, fontSize: 120, color: '#ffffff' }}>payments</span>
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(245,247,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Auto-Process Queue</span>
              <span style={{ ...ms, fontSize: 20, color: '#f5f7ff' }}>auto_awesome</span>
            </div>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#ffffff', fontFamily: 'Manrope, sans-serif' }}>45 Tasks</span>
            <p style={{ fontSize: 12, color: 'rgba(245,247,255,0.7)', margin: '4px 0 16px 0' }}>Ready for automated disbursement</p>
            <button style={{
              width: '100%',
              padding: '10px',
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              border: 'none',
              borderRadius: 8,
              color: '#ffffff',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}>
              Resume Automations
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '24px 0', borderTop: '1px solid #e8eff3', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, fontWeight: 500, color: '#a9b4b9', letterSpacing: '0.05em', gap: 12 }}>
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
