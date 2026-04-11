'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const contributor = {
  name: 'Elena Vance',
  id: 'CONT-4482',
  role: 'Senior Language Expert',
  avatar: 'https://ui-avatars.com/api/?name=Elena+Vance&background=2d6197&color=fff&size=128',
  paymentMethod: 'Bank Transfer',
  last4: '4291',
  lastPaymentDate: 'Oct 24, 2023',
  totalEarnings: '$42,910.00',
  pendingAmount: '$1,845.50',
  nextPayout: 'NOV 01',
  trend: '+12%',
};

const ledgerEntries = [
  {
    id: 'W-99218',
    task: 'Semantic Mapping (En-Es)',
    type: 'Lexicon Unit',
    completedAt: 'Oct 26, 2023',
    amount: '$120.00',
    status: 'Pending',
    statusBg: '#fffbeb',
    statusColor: '#92400e',
    paymentDate: '—',
    paymentId: 'TX-Pending',
  },
  {
    id: 'W-98122',
    task: 'Contextual Synthesis',
    type: 'Batch Assignment',
    completedAt: 'Oct 24, 2023',
    amount: '$450.50',
    status: 'Paid',
    statusBg: '#91feef',
    statusColor: '#006259',
    paymentDate: 'Oct 24, 2023',
    paymentId: 'TX-44910283',
  },
  {
    id: 'W-97001',
    task: 'Linguistic Alignment',
    type: 'Critical Review',
    completedAt: 'Oct 20, 2023',
    amount: '$325.00',
    status: 'Paid',
    statusBg: '#91feef',
    statusColor: '#006259',
    paymentDate: 'Oct 21, 2023',
    paymentId: 'TX-44881722',
  },
  {
    id: 'W-96542',
    task: 'Data Verification Layer',
    type: 'Quality Audit',
    completedAt: 'Oct 18, 2023',
    amount: '$200.00',
    status: 'Paid',
    statusBg: '#91feef',
    statusColor: '#006259',
    paymentDate: 'Oct 21, 2023',
    paymentId: 'TX-44881722',
  },
  {
    id: 'W-96400',
    task: 'Nuance Detection Alpha',
    type: 'Specialized Data',
    completedAt: 'Oct 15, 2023',
    amount: '$750.00',
    status: 'Paid',
    statusBg: '#91feef',
    statusColor: '#006259',
    paymentDate: 'Oct 15, 2023',
    paymentId: 'TX-44339100',
  },
];

export default function EarningsLedger() {
  const router = useRouter();

  const totalPending = ledgerEntries
    .filter(e => e.status === 'Pending')
    .reduce((sum, e) => sum + parseFloat(e.amount.replace(/[$,]/g, '')), 0);

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* TopAppBar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <h1 style={{ fontSize: 18, fontWeight: 900, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Earnings Ledger</h1>
          <div style={{ position: 'relative', width: 320 }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', ...ms, fontSize: 14, color: '#a9b4b9' }}>search</span>
            <input
              type="text"
              placeholder="Search contributors..."
              style={{ width: '100%', padding: '10px 12px 10px 40px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13 }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: '50%' }}>
            <span style={{ ...ms, fontSize: 20 }}>notifications</span>
          </button>
          <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: '50%' }}>
            <span style={{ ...ms, fontSize: 20 }}>help</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 16, borderLeft: '1px solid rgba(169,180,185,0.2)' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#2a3439', margin: 0 }}>Admin User</p>
              <p style={{ fontSize: 10, color: '#566166', margin: 0 }}>Global Oversight</p>
            </div>
            <img src="https://ui-avatars.com/api/?name=Admin+User&background=2d6197&color=fff&size=64" alt="" style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(169,180,185,0.3)' }} />
          </div>
        </div>
      </header>

      {/* Bento Grid - Contributor Info & Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '4fr 8fr', gap: 24, marginBottom: 32 }}>
        {/* Contributor Card */}
        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, border: '1px solid rgba(169,180,185,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <img src={contributor.avatar} alt="" style={{ width: 56, height: 56, borderRadius: '50%' }} />
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>{contributor.name}</h3>
              <p style={{ fontSize: 13, color: '#566166', margin: '4px 0 0 0' }}>{contributor.role} • #{contributor.id}</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #e8eff3' }}>
              <span style={{ fontSize: 13, color: '#566166' }}>Payment Method</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#2a3439', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ ...ms, fontSize: 14 }}>account_balance</span>
                {contributor.paymentMethod} (****{contributor.last4})
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
              <span style={{ fontSize: 13, color: '#566166' }}>Last Payment Date</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#2a3439' }}>{contributor.lastPaymentDate}</span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ padding: 24, background: '#f0f4f7', borderRadius: 12 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 0' }}>Total Lifetime Earnings</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <h4 style={{ fontSize: 28, fontWeight: 800, color: '#2d6197', margin: 0, fontFamily: 'Manrope, sans-serif' }}>{contributor.totalEarnings}</h4>
              <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 12, fontWeight: 700, color: '#006b62' }}>
                <span style={{ ...ms, fontSize: 12 }}>trending_up</span> {contributor.trend}
              </span>
            </div>
          </div>
          <div style={{ padding: 24, background: 'rgba(45,97,151,0.05)', borderRadius: 12, border: '1px solid rgba(45,97,151,0.1)' }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 0' }}>Pending Amount</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <h4 style={{ fontSize: 28, fontWeight: 800, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>{contributor.pendingAmount}</h4>
              <span style={{ padding: '2px 8px', background: '#d2e4ff', color: '#1c5489', fontSize: 10, fontWeight: 700, borderRadius: 9999 }}>
                NEXT PAYOUT: {contributor.nextPayout}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid rgba(169,180,185,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e8eff3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Task Ledger Details</h3>
            <p style={{ fontSize: 11, color: '#566166', margin: '4px 0 0 0' }}>Historical record of all completed word assignments and payouts.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#e8eff3', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700, color: '#2a3439', cursor: 'pointer' }}>
              <span style={{ ...ms, fontSize: 14 }}>filter_list</span> Filter
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#2d6197', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700, color: '#f5f7ff', cursor: 'pointer', boxShadow: '0 2px 8px rgba(45,97,151,0.2)' }}>
              <span style={{ ...ms, fontSize: 14 }}>ios_share</span> Export Ledger
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(232,239,243,0.5)' }}>
                {['Task / Word', 'Completed At', 'Amount', 'Payment Status', 'Payment Date', 'Payment ID'].map((h, i) => (
                  <th key={h} style={{
                    padding: '16px 24px',
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#566166',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    textAlign: i === 2 ? 'right' : i === 1 || i === 3 ? 'center' : 'left',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ledgerEntries.map((entry, index) => (
                <tr key={entry.id} style={{ borderTop: '1px solid #e8eff3', background: index % 2 === 1 ? 'rgba(232,239,243,0.1)' : 'transparent' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#2a3439', margin: 0 }}>{entry.task}</p>
                    <p style={{ fontSize: 10, color: '#566166', margin: '4px 0 0 0' }}>ID: {entry.id} • {entry.type}</p>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: 13, color: '#566166', textAlign: 'center' }}>{entry.completedAt}</td>
                  <td style={{ padding: '16px 24px', fontSize: 14, fontWeight: 700, color: '#2a3439', textAlign: 'right' }}>{entry.amount}</td>
                  <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 10px',
                      borderRadius: 9999,
                      background: entry.statusBg,
                      color: entry.statusColor,
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}>
                      {entry.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: 13, color: '#566166' }}>{entry.paymentDate}</td>
                  <td style={{ padding: '16px 24px', fontSize: 11, fontFamily: 'monospace', color: '#566166' }}>{entry.paymentId}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background: 'rgba(232,239,243,0.3)' }}>
                <td style={{ padding: '20px 24px', fontSize: 14, fontWeight: 700, color: '#2a3439', textAlign: 'right' }} colSpan={2}>Page Totals:</td>
                <td style={{ padding: '20px 24px', fontSize: 20, fontWeight: 800, color: '#2d6197', textAlign: 'right', fontFamily: 'Manrope, sans-serif' }}>
                  ${totalPending.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td style={{ padding: '20px 24px' }} colSpan={3}></td>
              </tr>
            </tfoot>
          </table>
        </div>
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
