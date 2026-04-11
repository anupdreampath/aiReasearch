'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const failedPayments = [
  {
    id: 1,
    contributor: 'Julianne DeMarco',
    email: 'julianne.d@example.com',
    initials: 'JD',
    initialsBg: '#dbeafe',
    initialsColor: '#1d4ed8',
    amount: '$1,240.00',
    method: 'Stripe',
    methodBg: '#d5e3fc',
    methodColor: '#455367',
    reason: 'Insufficient Funds',
    attemptedAt: 'Oct 24, 14:22',
    retryCount: 1,
  },
  {
    id: 2,
    contributor: 'Robert Kincaid',
    email: 'r.kincaid@agency.co',
    initials: 'RK',
    initialsBg: '#f3e8ff',
    initialsColor: '#7c3aed',
    amount: '$450.00',
    method: 'PayPal',
    methodBg: '#d5e3fc',
    methodColor: '#455367',
    reason: 'Authentication Failed',
    attemptedAt: 'Oct 23, 09:15',
    retryCount: 3,
  },
  {
    id: 3,
    contributor: 'Aria Sterling',
    email: 'aria@studio-s.com',
    initials: 'AS',
    initialsBg: '#d1fae5',
    initialsColor: '#047857',
    amount: '$3,100.00',
    method: 'Bank',
    methodBg: '#d5e3fc',
    methodColor: '#455367',
    reason: 'Invalid SWIFT/BIC',
    attemptedAt: 'Oct 23, 11:45',
    retryCount: 0,
  },
  {
    id: 4,
    contributor: 'Lucas Miller',
    email: 'lucas.m@freelance.org',
    initials: 'LM',
    initialsBg: '#fef3c7',
    initialsColor: '#b45309',
    amount: '$820.00',
    method: 'Stripe',
    methodBg: '#d5e3fc',
    methodColor: '#455367',
    reason: 'Expired Card',
    attemptedAt: 'Oct 22, 18:30',
    retryCount: 2,
  },
];

const stats = [
  { label: 'Top Reason', value: '42%', subtext: 'Insufficient Funds', icon: 'analytics', color: '#2d6197', progress: 42 },
  { label: 'Recovery Rate', value: '68.4%', subtext: 'Succeeded after retry', icon: 'trending_up', color: '#006b62', progress: 68 },
];

export default function FailedPayments() {
  const router = useRouter();

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 900, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Failed Payments</h1>
          <p style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#9f403d', margin: '8px 0 0 0' }}>
            <span style={{ ...ms, fontSize: 18 }}>trending_down</span>
            Total Failed: $12,450.00
          </p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '12px 20px',
          background: '#2d6197',
          color: '#f5f7ff',
          border: 'none',
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
        }}>
          <span style={{ ...ms, fontSize: 18 }}>refresh</span>
          Bulk Retry
        </button>
      </header>

      {/* Alert Banner */}
      <div style={{
        marginBottom: 32,
        padding: 16,
        background: 'rgba(254,137,131,0.2)',
        border: '1px solid rgba(159,64,61,0.3)',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#fe8983',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#752121',
          }}>
            <span style={{ ...ms, fontSize: 20 }}>warning</span>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#752121', margin: 0 }}>24 payments have failed.</p>
            <p style={{ fontSize: 13, color: '#752121', opacity: 0.8, margin: '4px 0 0 0' }}>Retry or update payment details to reconcile these balances.</p>
          </div>
        </div>
        <button style={{ fontSize: 12, fontWeight: 700, color: '#752121', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
          Review All
        </button>
      </div>

      {/* Filter Bar */}
      <div style={{ marginBottom: 24, padding: 16, background: '#f0f4f7', borderRadius: 12, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
        {[
          { label: 'Method', options: ['All Methods', 'Stripe Connect', 'PayPal', 'Bank Transfer'] },
          { label: 'Date', options: ['Last 30 Days', 'Last 7 Days', 'Current Billing Cycle'] },
          { label: 'Reason', options: ['All Reasons', 'Insufficient Funds', 'Expired Card', 'System Error'] },
        ].map((filter) => (
          <div key={filter.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{filter.label}</span>
            <select style={{ padding: '6px 32px 6px 12px', background: '#ffffff', border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
              {filter.options.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button style={{ padding: 8, background: '#ffffff', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#566166' }}>
            <span style={{ ...ms, fontSize: 20 }}>filter_alt</span>
          </button>
          <button style={{ padding: 8, background: '#ffffff', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#566166' }}>
            <span style={{ ...ms, fontSize: 20 }}>download</span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div style={{ background: '#ffffff', borderRadius: 12, overflow: 'hidden', border: '1px solid #e8eff3', marginBottom: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f0f4f7' }}>
              {['Contributor', 'Amount', 'Method', 'Failure Reason', 'Attempted At', 'Retry Count', 'Actions'].map((h, i) => (
                <th key={h} style={{
                  padding: '16px 24px',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#566166',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  textAlign: i === 6 ? 'right' : 'left',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {failedPayments.map((payment, index) => (
              <tr key={payment.id} style={{ borderTop: '1px solid #e8eff3', background: index % 2 === 1 ? 'rgba(232,239,243,0.2)' : 'transparent' }}>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: payment.initialsBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: payment.initialsColor,
                      fontSize: 12,
                      fontWeight: 700,
                    }}>
                      {payment.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#2a3439' }}>{payment.contributor}</div>
                      <div style={{ fontSize: 11, color: '#566166' }}>{payment.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', fontFamily: 'monospace', fontSize: 14, fontWeight: 500, color: '#2a3439' }}>{payment.amount}</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: 9999,
                    background: payment.methodBg,
                    color: payment.methodColor,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}>
                    {payment.method}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: 14, fontWeight: 500, color: '#9f403d' }}>{payment.reason}</td>
                <td style={{ padding: '16px 24px', fontSize: 13, color: '#566166' }}>{payment.attemptedAt}</td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {[0, 1, 2].map((dot) => (
                      <div
                        key={dot}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: dot < payment.retryCount ? '#9f403d' : '#e8eff3',
                        }}
                      />
                    ))}
                    <span style={{ fontSize: 12, fontWeight: 500, color: '#566166', marginLeft: 4 }}>{payment.retryCount}/3</span>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
                    <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#2d6197', borderRadius: 6 }}>
                      <span style={{ ...ms, fontSize: 18 }}>refresh</span>
                    </button>
                    <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#9f403d', borderRadius: 6 }}>
                      <span style={{ ...ms, fontSize: 18 }}>block</span>
                    </button>
                    <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }}>
                      <span style={{ ...ms, fontSize: 18 }}>mail</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ padding: 16, background: 'rgba(232,239,243,0.3)', borderTop: '1px solid #e8eff3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#566166' }}>Showing 1 to 4 of 24 failed payments</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button disabled style={{ padding: '6px 12px', background: '#ffffff', border: 'none', borderRadius: 6, fontSize: 13, color: '#a9b4b9', cursor: 'not-allowed' }}>
              Previous
            </button>
            <button style={{ padding: '6px 12px', background: '#ffffff', border: 'none', borderRadius: 6, fontSize: 13, color: '#2a3439', cursor: 'pointer' }}>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ padding: 24, background: '#f0f4f7', borderRadius: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</span>
              <span style={{ ...ms, fontSize: 20, color: stat.color }}>{stat.icon}</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>{stat.value}</div>
            <div style={{ fontSize: 13, color: '#566166', marginTop: 4 }}>{stat.subtext}</div>
            <div style={{ width: '100%', height: 6, background: '#e8eff3', borderRadius: 9999, marginTop: 16, overflow: 'hidden' }}>
              <div style={{ width: `${stat.progress}%`, height: '100%', background: stat.color, borderRadius: 9999 }} />
            </div>
          </div>
        ))}
        <div style={{ padding: 24, background: 'rgba(45,97,151,0.05)', borderRadius: 12, border: '1px solid rgba(45,97,151,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#2d6197', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Auto-Retry System</span>
            <span style={{ ...ms, fontSize: 20, color: '#2d6197' }}>bolt</span>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#2a3439' }}>Active</div>
          <div style={{ fontSize: 13, color: '#566166', marginTop: 4 }}>Next pass in 4h 12m</div>
          <button style={{ marginTop: 16, fontSize: 11, fontWeight: 700, color: '#2d6197', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            Configuration Settings →
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <button style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: '#2d6197',
        color: '#f5f7ff',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(45,97,151,0.3)',
      }}>
        <span style={{ ...ms, fontSize: 24 }}>add</span>
      </button>

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
