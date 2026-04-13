'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const mockHistory = [
  {
    id: '#PAY-9921',
    contributor: 'Sarah Jenkins',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=2d6197&color=fff&size=64',
    amount: '$1,240.00',
    method: 'STRIPE',
    methodBg: '#d5e3fc',
    methodColor: '#455367',
    status: 'Paid',
    statusBg: '#91feef',
    statusColor: '#006259',
    paidAt: 'Oct 24, 14:30',
    reference: 'ch_3N8x...9uP',
  },
  {
    id: '#PAY-9918',
    contributor: 'Marcus Aurelius',
    avatar: 'https://ui-avatars.com/api/?name=Marcus+Aurelius&background=9f403d&color=fff&size=64',
    amount: '$450.00',
    method: 'BANK_TRF',
    methodBg: '#d5e3fc',
    methodColor: '#455367',
    status: 'Failed',
    statusBg: '#fe8983',
    statusColor: '#752121',
    paidAt: '—',
    reference: 'ERR_AUTH_01',
  },
  {
    id: '#PAY-9915',
    contributor: 'Elena Rodriguez',
    avatar: 'https://ui-avatars.com/api/?name=Elena+Rodriguez&background=006b62&color=fff&size=64',
    amount: '$3,100.00',
    method: 'PAYPAL',
    methodBg: '#d5e3fc',
    methodColor: '#455367',
    status: 'Pending',
    statusBg: '#e8eff3',
    statusColor: '#566166',
    paidAt: '—',
    reference: 'PEND_9x22...',
  },
];

const stats = [
  { label: 'Successful Rate', value: '94.2%', change: '+2.1%', changeType: 'positive', icon: 'check_circle', iconColor: '#006b62' },
  { label: 'Avg. Payout Time', value: '2.4 Days', change: 'Stable', changeType: 'neutral', icon: 'schedule', iconColor: '#2d6197' },
  { label: 'Refund Volume', value: '$1,102', change: '+0.5%', changeType: 'negative', icon: 'undo', iconColor: '#9f403d' },
];

export default function PaymentHistory() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const totalAmount = mockHistory.reduce((sum, tx) => sum + parseFloat(tx.amount.replace(/[$,]/g, '')), 0);

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* TopAppBar */}
      <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, gap: 12 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Payment History</h1>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', ...ms, fontSize: 16, color: '#a9b4b9' }}>search</span>
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '8px 12px 8px 40px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13, maxWidth: 256, width: '100%' }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 16px',
            background: '#d2e4ff',
            color: '#1c5489',
            border: 'none',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            <span style={{ ...ms, fontSize: 18 }}>download</span>
            Export CSV
          </button>
        </div>
      </header>

      {/* Filter Bar */}
      <div style={{ padding: 16, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', borderRadius: 12, border: '1px solid rgba(169,180,185,0.15)', marginBottom: 32, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: 4 }}>Date range</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: '#f0f4f7', borderRadius: 8 }}>
            <span style={{ ...ms, fontSize: 14, color: '#a9b4b9' }}>calendar_today</span>
            <input type="text" value="Oct 1, 2023 - Oct 31, 2023" style={{ background: 'transparent', border: 'none', fontSize: 13, fontWeight: 500, color: '#2a3439', maxWidth: 180, width: '100%' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: 4 }}>Contributor</label>
          <select style={{ padding: '8px 32px 8px 12px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', minWidth: 160 }}>
            <option>All Contributors</option>
            <option>Sarah Jenkins</option>
            <option>Marcus Aurelius</option>
            <option>Elena Rodriguez</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: 4 }}>Method</label>
          <select style={{ padding: '8px 32px 8px 12px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            <option>All Methods</option>
            <option>Bank Transfer</option>
            <option>Stripe</option>
            <option>PayPal</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: 4 }}>Status</label>
          <div style={{ display: 'flex', gap: 4, padding: 4, background: '#f0f4f7', borderRadius: 8 }}>
            {['All', 'Paid', 'Pending', 'Failed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '4px 12px',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === tab ? '#ffffff' : 'transparent',
                  color: activeTab === tab ? '#2d6197' : '#566166',
                  boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <button style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 600, color: '#2d6197', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 4 }}>
          Clear Filters
        </button>
      </div>

      {/* Table Container */}
      <div style={{ background: '#ffffff', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(169,180,185,0.1)', marginBottom: 32 }}>
        <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
          <thead>
            <tr style={{ background: 'rgba(232,239,243,0.5)' }}>
              {['Payment ID', 'Contributor', 'Amount', 'Method', 'Status', 'Paid At', 'External Reference', 'Actions'].map((h, i) => (
                <th key={h} style={{ padding: '16px 24px', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: i === 7 ? 'right' : 'left' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockHistory.map((tx) => (
              <tr key={tx.id} style={{ borderTop: '1px solid #e8eff3' }}>
                <td style={{ padding: '20px 24px', fontFamily: 'monospace', fontSize: 12, color: '#526074' }}>{tx.id}</td>
                <td style={{ padding: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={tx.avatar} alt="" style={{ width: 28, height: 28, borderRadius: '50%' }} />
                    <span style={{ fontSize: 14, fontWeight: 500, color: '#2a3439' }}>{tx.contributor}</span>
                  </div>
                </td>
                <td style={{ padding: 20, fontSize: 14, fontWeight: 700, color: '#2a3439' }}>{tx.amount}</td>
                <td style={{ padding: 20 }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: 9999,
                    background: tx.methodBg,
                    color: tx.methodColor,
                    fontSize: 10,
                    fontWeight: 700,
                  }}>
                    {tx.method}
                  </span>
                </td>
                <td style={{ padding: 20 }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: 9999,
                    background: tx.statusBg,
                    color: tx.statusColor,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}>
                    {tx.status}
                  </span>
                </td>
                <td style={{ padding: 20, fontSize: 13, color: '#566166' }}>{tx.paidAt}</td>
                <td style={{ padding: 20, fontSize: 11, color: '#566166', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tx.reference}</td>
                <td style={{ padding: 20, textAlign: 'right' }}>
                  {tx.status === 'Paid' && (
                    <button style={{ fontSize: 11, fontWeight: 600, color: '#2d6197', background: 'transparent', border: 'none', cursor: 'pointer' }}>View Receipt</button>
                  )}
                  {tx.status === 'Failed' && (
                    <button style={{ fontSize: 11, fontWeight: 600, color: '#9f403d', background: 'transparent', border: 'none', cursor: 'pointer' }}>Retry</button>
                  )}
                  {tx.status === 'Pending' && (
                    <button style={{ fontSize: 11, fontWeight: 600, color: '#2d6197', background: 'transparent', border: 'none', cursor: 'pointer' }}>View Details</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ background: 'rgba(232,239,243,0.3)', borderTop: '2px solid #e8eff3' }}>
              <td style={{ padding: '16px 24px', fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }} colSpan={2}>Total for period</td>
              <td style={{ padding: '16px 24px', fontSize: 18, fontWeight: 800, color: '#2d6197', fontFamily: 'Manrope, sans-serif' }}>${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
              <td style={{ padding: '16px 24px', textAlign: 'right' }} colSpan={5}>
                <span style={{ fontSize: 11, color: '#566166' }}>{mockHistory.length} Transactions shown in this view</span>
              </td>
            </tr>
          </tfoot>
        </table>
        </div>

        {/* Pagination */}
        <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f7f9fb', borderTop: '1px solid #e8eff3' }}>
          <p style={{ fontSize: 12, color: '#566166', margin: 0 }}>Showing <strong>1-10</strong> of <strong>248</strong> payments</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#a9b4b9', borderRadius: 6 }} disabled>
              <span style={{ ...ms, fontSize: 18 }}>chevron_left</span>
            </button>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: '#2d6197', color: '#ffffff', fontSize: 12, fontWeight: 700, border: 'none' }}>1</button>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: 'transparent', color: '#566166', fontSize: 12, fontWeight: 500, border: 'none', cursor: 'pointer' }}>2</button>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: 'transparent', color: '#566166', fontSize: 12, fontWeight: 500, border: 'none', cursor: 'pointer' }}>3</button>
            <span style={{ fontSize: 12, color: '#566166' }}>...</span>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: 'transparent', color: '#566166', fontSize: 12, fontWeight: 500, border: 'none', cursor: 'pointer' }}>25</button>
            <button style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }}>
              <span style={{ ...ms, fontSize: 18 }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bento Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, marginBottom: 40 }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ padding: 24, background: '#ffffff', borderRadius: 12, border: '1px solid rgba(169,180,185,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</span>
              <span style={{ ...ms, fontSize: 20, color: stat.iconColor }}>{stat.icon}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>{stat.value}</span>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                color: stat.changeType === 'positive' ? '#006b62' : stat.changeType === 'negative' ? '#9f403d' : '#566166',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}>
                {stat.changeType !== 'neutral' && <span style={{ ...ms, fontSize: 12 }}>{stat.changeType === 'positive' ? 'arrow_upward' : 'arrow_upward'}</span>}
                {stat.change}
              </span>
            </div>
            <p style={{ fontSize: 10, color: '#566166', margin: '8px 0 0 0' }}>
              {stat.label === 'Successful Rate' && 'Compared to previous 30 days'}
              {stat.label === 'Avg. Payout Time' && 'Within KPI threshold'}
              {stat.label === 'Refund Volume' && 'Active disputes: 2'}
            </p>
          </div>
        ))}
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
