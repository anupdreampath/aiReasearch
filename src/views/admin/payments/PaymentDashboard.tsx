'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const chartData = [
  { week: 'Week 01', paid: 40, failed: 5 },
  { week: 'Week 02', paid: 65, failed: 8 },
  { week: 'Week 03', paid: 85, failed: 2 },
  { week: 'Week 04', paid: 55, failed: 12 },
  { week: 'Week 05', paid: 75, failed: 4 },
  { week: 'Week 06', paid: 90, failed: 6 },
];

const recentTransactions = [
  { id: 1, contributor: 'Alex Morgan', initials: 'AM', amount: '$1,250.00', method: 'Wise', status: 'success', date: 'Oct 24, 2023' },
  { id: 2, contributor: 'Jordan Smith', initials: 'JS', amount: '$840.00', method: 'PayPal', status: 'failed', date: 'Oct 23, 2023' },
  { id: 3, contributor: 'Kate Lindon', initials: 'KL', amount: '$2,100.00', method: 'Bank Transfer', status: 'pending', date: 'Oct 22, 2023' },
  { id: 4, contributor: 'Ray Vance', initials: 'RV', amount: '$450.00', method: 'Wise', status: 'success', date: 'Oct 21, 2023' },
];

const statusStyles = {
  success: { bg: '#91feef', color: '#006259' },
  failed: { bg: '#fe8983', color: '#752121' },
  pending: { bg: '#d2e4ff', color: '#1c5489' },
};

export default function PaymentDashboard() {
  const router = useRouter();

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* TopAppBar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Payments</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', ...ms, fontSize: 18, color: '#a9b4b9' }}>search</span>
            <input
              type="text"
              placeholder="Search transactions..."
              style={{ padding: '8px 12px 8px 40px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13, width: 256 }}
            />
          </div>
          <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: '50%' }}>
            <span style={{ ...ms, fontSize: 20 }}>notifications</span>
          </button>
          <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: '50%' }}>
            <span style={{ ...ms, fontSize: 20 }}>help_outline</span>
          </button>
        </div>
      </header>

      {/* Quick Actions */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
        <button
          onClick={() => router.push('/admin/payments/process')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '12px 20px',
            background: '#2d6197',
            color: '#f5f7ff',
            border: 'none',
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          <span style={{ ...ms, fontSize: 20 }}>bolt</span>
          Process Batch Payments
        </button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '12px 20px',
          background: '#ffffff',
          color: '#2a3439',
          border: '1px solid #e8eff3',
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
        }}>
          <span style={{ ...ms, fontSize: 20 }}>file_download</span>
          Export Ledger
        </button>
        <button
          onClick={() => router.push('/admin/payments/failed')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '12px 20px',
            background: 'rgba(254,137,131,0.3)',
            color: '#752121',
            border: 'none',
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          <span style={{ ...ms, fontSize: 20 }}>warning</span>
          View Failed Payments
        </button>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 32 }}>
        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, border: '1px solid #f0f4f7' }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 0' }}>Total Paid Out</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>$142,500.00</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 8px', background: 'rgba(145,254,239,0.3)', color: '#006259', borderRadius: 9999, fontSize: 11, fontWeight: 700 }}>
              <span style={{ ...ms, fontSize: 14 }}>trending_up</span> 12%
            </span>
          </div>
        </div>
        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, border: '1px solid #f0f4f7' }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 0' }}>Pending Amount</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>$12,480.00</span>
            <span style={{ ...ms, fontSize: 20, color: '#a9b4b9' }}>hourglass_empty</span>
          </div>
        </div>
        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, border: '1px solid #f0f4f7' }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 0' }}>Failed Payments</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#9f403d', fontFamily: 'Manrope, sans-serif' }}>24</span>
            <span style={{ padding: '2px 8px', background: 'rgba(254,137,131,0.2)', color: '#9f403d', borderRadius: 9999, fontSize: 11, fontWeight: 700 }}>Critical</span>
          </div>
        </div>
        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, border: '1px solid #f0f4f7' }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 0' }}>This Month Spend</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>$48,200.00</span>
            <div style={{ width: 64, height: 6, background: '#f0f4f7', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '65%', background: '#2d6197', borderRadius: 3 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div style={{ padding: 32, background: '#ffffff', borderRadius: 12, border: '1px solid #f0f4f7', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: '#2a3439', margin: '0 0 4px 0', fontFamily: 'Manrope, sans-serif' }}>Payments over time</h4>
            <p style={{ fontSize: 13, color: '#566166', margin: 0 }}>Weekly distribution of Paid vs. Failed transactions</p>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#2d6197' }} />
              <span style={{ fontSize: 12, color: '#566166' }}>Paid</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#9f403d' }} />
              <span style={{ fontSize: 12, color: '#566166' }}>Failed</span>
            </div>
          </div>
        </div>
        <div style={{ height: 256, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, padding: '0 16px' }}>
          {chartData.map((data) => (
            <div key={data.week} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100%', maxWidth: 40, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 2, height: 200 }}>
                <div style={{ width: '100%', background: 'rgba(159,64,61,0.3)', borderRadius: '2px 2px 0 0', height: `${data.failed * 2}px` }} />
                <div style={{ width: '100%', background: '#2d6197', borderRadius: '0 0 2px 2px', height: `${data.paid * 2}px` }} />
              </div>
              <span style={{ marginTop: 12, fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase' }}>{data.week}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Two Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32, marginBottom: 40 }}>
        {/* Recent Transactions */}
        <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #f0f4f7', overflow: 'hidden' }}>
          <div style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(232,239,243,0.3)' }}>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Recent transactions</h4>
            <button onClick={() => router.push('/admin/payments/history')} style={{ fontSize: 13, fontWeight: 700, color: '#2d6197', background: 'transparent', border: 'none', cursor: 'pointer' }}>View all</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(232,239,243,0.5)' }}>
                {['Contributor', 'Amount', 'Method', 'Status', 'Date'].map((h, i) => (
                  <th key={h} style={{ padding: '12px 32px', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: i === 4 ? 'right' : 'left' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx.id} style={{ borderTop: '1px solid #f0f4f7' }}>
                  <td style={{ padding: '16px 32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: tx.status === 'success' ? '#d5e3fc' : tx.status === 'failed' ? '#fe8983' : '#d2e4ff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 700,
                        color: tx.status === 'success' ? '#455367' : tx.status === 'failed' ? '#752121' : '#1c5489',
                      }}>
                        {tx.initials}
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#2a3439' }}>{tx.contributor}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 32px', fontSize: 14, fontWeight: 500, color: '#2a3439' }}>{tx.amount}</td>
                  <td style={{ padding: '16px 32px', fontSize: 12, color: '#566166' }}>{tx.method}</td>
                  <td style={{ padding: '16px 32px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: 9999,
                      background: statusStyles[tx.status].bg,
                      color: statusStyles[tx.status].color,
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}>
                      {tx.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 32px', textAlign: 'right', fontSize: 12, color: '#566166' }}>{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Method Breakdown */}
        <div style={{ padding: 32, background: '#ffffff', borderRadius: 12, border: '1px solid #f0f4f7', display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ fontSize: 16, fontWeight: 700, color: '#2a3439', margin: '0 0 32px 0', fontFamily: 'Manrope, sans-serif' }}>Payment method breakdown</h4>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {/* CSS Conic Gradient Pie Chart */}
            <div style={{
              width: 192, height: 192, borderRadius: '50%',
              background: 'conic-gradient(#2d6197 0% 45%, #526074 45% 75%, #006b62 75% 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: 128, height: 128, borderRadius: '50%',
                background: '#ffffff',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total</span>
                <span style={{ fontSize: 24, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>$154K</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Bank Transfer', value: '$69,300', color: '#2d6197' },
              { label: 'PayPal', value: '$46,200', color: '#526074' },
              { label: 'Wise', value: '$38,500', color: '#006b62' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 2, background: item.color }} />
                  <span style={{ fontSize: 14, color: '#566166' }}>{item.label}</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#2a3439' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '24px 0', borderTop: '1px solid #e8eff3', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, fontWeight: 500, color: '#a9b4b9', letterSpacing: '0.05em' }}>
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
