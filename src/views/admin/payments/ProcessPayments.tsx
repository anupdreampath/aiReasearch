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
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Process Payments</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => router.push('/admin/payments')} style={{ fontSize: 14, fontWeight: 500, color: '#566166', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            Cancel
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 20px',
            background: '#2d6197',
            color: '#f5f7ff',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            Confirm & Send
            <span style={{ ...ms, fontSize: 16 }}>send</span>
          </button>
        </div>
      </header>

      {/* Bento Grid Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 24, marginBottom: 32 }}>
        {/* Total Amount Hero Card */}
        <div style={{ padding: 32, background: '#ffffff', borderRadius: 12, border: '1px solid #f0f4f7', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Batch Amount</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 16 }}>
              <span style={{ fontSize: 48, fontWeight: 800, color: '#2d6197', fontFamily: 'Manrope, sans-serif' }}>$128,450</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#566166' }}>.00 USD</span>
            </div>
          </div>
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #f0f4f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#d2e4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2d6197' }}>
                <span style={{ ...ms, fontSize: 20 }}>group</span>
              </div>
              <div>
                <p style={{ fontSize: 24, fontWeight: 700, color: '#2a3439', margin: 0 }}>412</p>
                <p style={{ fontSize: 11, color: '#566166', margin: 0 }}>Contributors</p>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#006b62', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>READY TO DISBURSE</p>
              <p style={{ fontSize: 10, color: '#566166', margin: '4px 0 0 0' }}>Batch ID: #PAY-2023-90X</p>
            </div>
          </div>
        </div>

        {/* Breakdown & Risk Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {mockBatchData.map((item) => (
            <div key={item.method} style={{ padding: 20, background: '#f0f4f7', borderRadius: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ ...ms, fontSize: 24, color: '#1d548a', marginBottom: 16 }}>{item.icon}</span>
              <div>
                <p style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: 0 }}>{item.amount}</p>
                <p style={{ fontSize: 11, color: '#566166', margin: '4px 0 0 0', fontWeight: 500 }}>{item.method}</p>
              </div>
            </div>
          ))}
          {/* Warning Card */}
          <div style={{ gridColumn: '1 / -1', padding: 24, background: 'rgba(254,137,131,0.1)', border: '1px solid rgba(159,64,61,0.2)', borderRadius: 12, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fe8983', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#752121', flexShrink: 0 }}>
              <span style={{ ...ms, fontSize: 20 }}>warning</span>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#752121', margin: 0 }}>Batch Risk Assessment</h3>
              <p style={{ fontSize: 13, color: '#752121', margin: '8px 0 0 0' }}>14 contributors in this batch have active risk flags — review before sending to avoid merchant account restrictions.</p>
              <button style={{ marginTop: 12, fontSize: 10, fontWeight: 700, color: '#9f403d', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                View Flagged Items <span style={{ ...ms, fontSize: 12 }}>chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Table Section */}
      <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f0f4f7', overflow: 'hidden', marginBottom: 32 }}>
        <div style={{ padding: '20px 32px', borderBottom: '1px solid #f0f4f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(247,249,251,0.5)' }}>
          <h2 style={{ fontSize: 12, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Review Batch Details</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', ...ms, fontSize: 14, color: '#a9b4b9' }}>search</span>
              <input type="text" placeholder="Search contributor..." style={{ padding: '8px 12px 8px 36px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 12, width: 256 }} />
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#566166', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <span style={{ ...ms, fontSize: 14 }}>filter_list</span> Filter
            </button>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(232,239,243,0.5)' }}>
              <th style={{ padding: '16px 32px', width: 40 }}>
                <input type="checkbox" checked={selected.length === mockContributors.length} onChange={selectAll} style={{ width: 16, height: 16 }} />
              </th>
              {['Contributor', 'Method', 'Amount', 'Status', 'Actions'].map((h, i) => (
                <th key={h} style={{ padding: 16, fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: i === 4 ? 'right' : 'left' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockContributors.map((contributor) => (
              <tr key={contributor.id} style={{ borderTop: '1px solid #f0f4f7' }}>
                <td style={{ padding: '20px 32px' }}>
                  <input type="checkbox" checked={selected.includes(contributor.id)} onChange={() => toggleSelect(contributor.id)} style={{ width: 16, height: 16 }} />
                </td>
                <td style={{ padding: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={contributor.avatar} alt="" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#2a3439', margin: 0 }}>{contributor.name}</p>
                      <p style={{ fontSize: 11, color: '#566166', margin: '2px 0 0 0' }}>{contributor.email}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#566166' }}>
                    <span style={{ ...ms, fontSize: 16 }}>{contributor.method}</span>
                    <span style={{ fontSize: 12 }}>•••• {contributor.last4}</span>
                  </div>
                </td>
                <td style={{ padding: 20, fontSize: 14, fontWeight: 700, color: '#2a3439' }}>{contributor.amount}</td>
                <td style={{ padding: 20 }}>
                  <span style={{
                    padding: '4px 10px',
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
                <td style={{ padding: 20, textAlign: 'right' }}>
                  <button style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }}>
                    <span style={{ ...ms, fontSize: 20 }}>more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: '16px 32px', background: '#f7f9fb', borderTop: '1px solid #f0f4f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: 12, color: '#566166', margin: 0 }}>Showing 1-10 of 412 entries</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#a9b4b9' }}>
              <span style={{ ...ms, fontSize: 18 }}>chevron_left</span>
            </button>
            <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#a9b4b9' }}>
              <span style={{ ...ms, fontSize: 18 }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Confirmation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid #e8eff3' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, maxWidth: 500 }}>
          <div style={{ width: 48, height: 48, background: '#f0f4f7', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.6 }}>
            <span style={{ ...ms, fontSize: 24, color: '#566166' }}>security</span>
          </div>
          <p style={{ fontSize: 12, color: '#566166', lineHeight: 1.6, margin: 0 }}>
            Payments will be processed via <strong>Stripe Connect</strong>. Estimated delivery: <strong>1-3 business days</strong>. Funds will be debited from your primary vault automatically. By confirming, you agree to our Terms of Service for institutional disbursements.
          </p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 40px',
          background: '#2d6197',
          color: '#f5f7ff',
          border: 'none',
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 700,
          cursor: 'pointer',
        }}>
          <span style={{ ...ms, fontSize: 16 }}>verified</span>
          Finalize & Process Batch
        </button>
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
