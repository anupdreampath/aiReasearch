'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const mockBatchData = [
  { method: 'Direct Deposit', amount: '$82.1k', icon: 'account_balance' },
  { method: 'Stripe Card', amount: '$34.2k', icon: 'credit_card' },
  { method: 'Digital Assets', amount: '$12.1k', icon: 'currency_bitcoin' },
];

const mockContributors = [
  {
    id: 1,
    name: 'Marcus Thorne',
    email: 'm.thorne@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Marcus+Thorne&background=9f403d&color=fff&size=64',
    method: 'account_balance',
    last4: '4412',
    amount: '$2,450.00',
    status: 'Flagged',
    statusBg: '#fe8983',
    statusColor: '#752121',
  },
  {
    id: 2,
    name: 'Elena Vance',
    email: 'e.vance@company.net',
    avatar: 'https://ui-avatars.com/api/?name=Elena+Vance&background=006b62&color=fff&size=64',
    method: 'credit_card',
    last4: '9011',
    amount: '$1,120.00',
    status: 'Ready',
    statusBg: '#91feef',
    statusColor: '#006259',
  },
  {
    id: 3,
    name: 'Sarah Jenkins',
    email: 'sj-finance@portal.io',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=526074&color=fff&size=64',
    method: 'account_balance',
    last4: '2284',
    amount: '$3,900.00',
    status: 'On Hold',
    statusBg: '#d5e3fc',
    statusColor: '#455367',
  },
];

export default function ProcessPayments() {
  const router = useRouter();
  const [selected, setSelected] = useState([2, 3]);

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const selectAll = () => {
    setSelected(selected.length === mockContributors.length ? [] : mockContributors.map(c => c.id));
  };

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* TopAppBar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Process Payments</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={() => router.push('/admin/payments')} style={{ fontSize: 13, fontWeight: 500, color: '#566166', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            Cancel
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '9px 16px',
            background: '#2d6197',
            color: '#f5f7ff',
            border: 'none',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            Confirm & Send
            <span style={{ ...ms, fontSize: 16 }}>send</span>
          </button>
        </div>
      </header>

      {/* Bento Grid Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 24 }}>
        {/* Total Amount Hero Card */}
        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, border: '1px solid #f0f4f7' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Batch Amount</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 36, fontWeight: 800, color: '#2d6197', fontFamily: 'Manrope, sans-serif' }}>$128,450</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#566166' }}>.00 USD</span>
          </div>
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #f0f4f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#d2e4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2d6197' }}>
                <span style={{ ...ms, fontSize: 18 }}>group</span>
              </div>
              <div>
                <p style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', margin: 0 }}>412</p>
                <p style={{ fontSize: 10, color: '#566166', margin: 0 }}>Contributors</p>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#006b62', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>READY TO DISBURSE</p>
              <p style={{ fontSize: 10, color: '#566166', margin: '2px 0 0 0' }}>Batch ID: #PAY-2023-90X</p>
            </div>
          </div>
        </div>

        {/* Breakdown & Risk Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 12 }}>
          {mockBatchData.map((item) => (
            <div key={item.method} style={{ padding: 16, background: '#f0f4f7', borderRadius: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ ...ms, fontSize: 22, color: '#1d548a', marginBottom: 12 }}>{item.icon}</span>
              <div>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#2a3439', margin: 0 }}>{item.amount}</p>
                <p style={{ fontSize: 10, color: '#566166', margin: '2px 0 0 0', fontWeight: 500 }}>{item.method}</p>
              </div>
            </div>
          ))}
          {/* Warning Card */}
          <div style={{ gridColumn: '1 / -1', padding: 16, background: 'rgba(254,137,131,0.1)', border: '1px solid rgba(159,64,61,0.2)', borderRadius: 12, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#fe8983', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#752121', flexShrink: 0 }}>
              <span style={{ ...ms, fontSize: 18 }}>warning</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#752121', margin: 0 }}>Batch Risk Assessment</h3>
              <p style={{ fontSize: 12, color: '#752121', margin: '6px 0 0 0', lineHeight: 1.5 }}>14 contributors in this batch have active risk flags — review before sending.</p>
              <button style={{ marginTop: 8, fontSize: 10, fontWeight: 700, color: '#9f403d', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                View Flagged Items <span style={{ ...ms, fontSize: 12 }}>chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Table Section */}
      <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f0f4f7', overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f4f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(247,249,251,0.5)', flexWrap: 'wrap', gap: 10 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Review Batch Details</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', ...ms, fontSize: 14, color: '#a9b4b9' }}>search</span>
              <input type="text" placeholder="Search contributor..." style={{ padding: '7px 10px 7px 32px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 12, width: '100%', maxWidth: 200, boxSizing: 'border-box' }} />
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, color: '#566166', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <span style={{ ...ms, fontSize: 14 }}>filter_list</span> Filter
            </button>
          </div>
        </div>
        <div className="mobile-table-wrap">
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 580 }}>
            <thead>
              <tr style={{ background: 'rgba(232,239,243,0.5)' }}>
                <th style={{ padding: '12px 16px', width: 40 }}>
                  <input type="checkbox" checked={selected.length === mockContributors.length} onChange={selectAll} style={{ width: 16, height: 16 }} />
                </th>
                {['Contributor', 'Method', 'Amount', 'Status', ''].map((h, i) => (
                  <th key={i} style={{ padding: '12px 14px', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: i === 4 ? 'right' : 'left' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockContributors.map((contributor) => (
                <tr key={contributor.id} style={{ borderTop: '1px solid #f0f4f7' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <input type="checkbox" checked={selected.includes(contributor.id)} onChange={() => toggleSelect(contributor.id)} style={{ width: 16, height: 16 }} />
                  </td>
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src={contributor.avatar} alt="" style={{ width: 30, height: 30, borderRadius: '50%' }} />
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: '#2a3439', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contributor.name}</p>
                        <p style={{ fontSize: 10, color: '#566166', margin: '1px 0 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contributor.email}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#566166' }}>
                      <span style={{ ...ms, fontSize: 14 }}>{contributor.method}</span>
                      <span style={{ fontSize: 11 }}>•••• {contributor.last4}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px', fontSize: 13, fontWeight: 700, color: '#2a3439' }}>{contributor.amount}</td>
                  <td style={{ padding: '14px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: 9999,
                      background: contributor.statusBg,
                      color: contributor.statusColor,
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}>
                      {contributor.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px', textAlign: 'right' }}>
                    <button style={{ padding: 4, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }}>
                      <span style={{ ...ms, fontSize: 18 }}>more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 16px', background: '#f7f9fb', borderTop: '1px solid #f0f4f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontSize: 12, color: '#566166', margin: 0 }}>Showing 1-10 of 412 entries</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#a9b4b9' }}>
              <span style={{ ...ms, fontSize: 18 }}>chevron_left</span>
            </button>
            <button style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#a9b4b9' }}>
              <span style={{ ...ms, fontSize: 18 }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Confirmation */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid #e8eff3', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flex: '1 1 250px', minWidth: 0 }}>
          <div style={{ width: 40, height: 40, background: '#f0f4f7', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.6, flexShrink: 0 }}>
            <span style={{ ...ms, fontSize: 20, color: '#566166' }}>security</span>
          </div>
          <p style={{ fontSize: 11, color: '#566166', lineHeight: 1.6, margin: 0 }}>
            Payments will be processed via <strong>Stripe Connect</strong>. Estimated delivery: <strong>1-3 business days</strong>. Funds will be debited from your primary vault automatically.
          </p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '12px 24px',
          background: '#2d6197',
          color: '#f5f7ff',
          border: 'none',
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 700,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          <span style={{ ...ms, fontSize: 16 }}>verified</span>
          Finalize & Process Batch
        </button>
      </div>

      {/* Footer */}
      <footer style={{ padding: '20px 0', marginTop: 32, borderTop: '1px solid #e8eff3', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, fontWeight: 500, color: '#a9b4b9', letterSpacing: '0.05em', flexWrap: 'wrap', gap: 12 }}>
        <div>© 2024 Sentimental Grid. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a href="#" style={{ color: '#a9b4b9', textDecoration: 'none' }}>System Status</a>
          <a href="#" style={{ color: '#a9b4b9', textDecoration: 'none' }}>Documentation</a>
          <a href="#" style={{ color: '#a9b4b9', textDecoration: 'none' }}>Support</a>
        </div>
      </footer>
    </div>
  );
}
