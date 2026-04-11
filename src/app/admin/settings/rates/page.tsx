'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const initialLimits = [
  { id: 'api_calls', name: 'API Calls', limit: 1000, window: 'per hour', description: 'Total API requests per API key' },
  { id: 'scraping', name: 'Scraping Requests', limit: 500, window: 'per hour', description: 'Reddit post scraping operations' },
  { id: 'exports', name: 'Data Exports', limit: 50, window: 'per day', description: 'CSV/JSON export downloads' },
  { id: 'emails', name: 'Email Sends', limit: 2000, window: 'per hour', description: 'Bulk email notifications' },
  { id: 'payments', name: 'Payment Processing', limit: 100, window: 'per hour', description: 'Payment batch operations' },
  { id: 'logins', name: 'Login Attempts', limit: 10, window: 'per minute', description: 'Failed login attempts per IP' },
];

export default function RateLimitsPage() {
  const router = useRouter();
  const [limits, setLimits] = useState(initialLimits);
  const [saved, setSaved] = useState(false);

  const updateLimit = (id: string, value: number) => {
    setLimits(limits.map(l => l.id === id ? { ...l, limit: value } : l));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Rate Limits</h1>
          <p style={{ fontSize: 14, color: '#566166', margin: '8px 0 0 0' }}>Configure system-wide rate limiting thresholds</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => router.push('/admin/settings')}
            style={{
              padding: '10px 20px',
              border: '1px solid #e1e9ee',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              color: '#566166',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            Back to Settings
          </button>
          <button
            onClick={handleSave}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px',
              background: '#2d6197',
              color: '#ffffff',
              border: 'none',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <span style={{ ...ms, fontSize: 18 }}>save</span>
            Save Changes
          </button>
        </div>
      </header>

      {/* Saved notification */}
      {saved && (
        <div style={{
          padding: '12px 16px',
          background: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: 8,
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{ ...ms, fontSize: 20, color: '#155724' }}>check_circle</span>
          <span style={{ fontSize: 14, color: '#155724' }}>Rate limits saved successfully</span>
        </div>
      )}

      {/* Rate Limits List */}
      <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #e1e9ee', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f7f9fb' }}>
            <tr>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Endpoint</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</th>
              <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Limit</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Window</th>
            </tr>
          </thead>
          <tbody>
            {limits.map((limit, index) => (
              <tr key={limit.id} style={{ borderTop: '1px solid #e1e9ee', background: index % 2 === 1 ? '#fafbfc' : '#ffffff' }}>
                <td style={{ padding: '20px 24px' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#2a3439' }}>{limit.name}</span>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <span style={{ fontSize: 13, color: '#566166' }}>{limit.description}</span>
                </td>
                <td style={{ padding: '20px 24px', textAlign: 'center' }}>
                  <input
                    type="number"
                    value={limit.limit}
                    onChange={(e) => updateLimit(limit.id, parseInt(e.target.value) || 0)}
                    style={{
                      width: 100,
                      padding: '8px 12px',
                      border: '1px solid #d9e4ea',
                      borderRadius: 6,
                      fontSize: 14,
                      textAlign: 'center',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  />
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <span style={{ fontSize: 13, color: '#566166' }}>{limit.window}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Usage Stats */}
      <div style={{ marginTop: 32, padding: 24, background: '#f7f9fb', borderRadius: 12 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#2a3439', margin: '0 0 16px 0' }}>Current Usage Statistics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <div style={{ padding: 16, background: '#ffffff', borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: '#566166', marginBottom: 8 }}>API Calls (Last Hour)</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#2d6197' }}>847 <span style={{ fontSize: 12, color: '#566166', fontWeight: 400 }}>/ 1,000</span></div>
            <div style={{ marginTop: 8, height: 4, background: '#e1e9ee', borderRadius: 2 }}>
              <div style={{ width: '84.7%', height: '100%', background: '#2d6197', borderRadius: 2 }} />
            </div>
          </div>
          <div style={{ padding: 16, background: '#ffffff', borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: '#566166', marginBottom: 8 }}>Scraping (Last Hour)</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#006b62' }}>234 <span style={{ fontSize: 12, color: '#566166', fontWeight: 400 }}>/ 500</span></div>
            <div style={{ marginTop: 8, height: 4, background: '#e1e9ee', borderRadius: 2 }}>
              <div style={{ width: '46.8%', height: '100%', background: '#006b62', borderRadius: 2 }} />
            </div>
          </div>
          <div style={{ padding: 16, background: '#ffffff', borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: '#566166', marginBottom: 8 }}>Failed Logins (Last Min)</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#9f403d' }}>3 <span style={{ fontSize: 12, color: '#566166', fontWeight: 400 }}>/ 10</span></div>
            <div style={{ marginTop: 8, height: 4, background: '#e1e9ee', borderRadius: 2 }}>
              <div style={{ width: '30%', height: '100%', background: '#9f403d', borderRadius: 2 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: 48, padding: '24px 0', borderTop: '1px solid #e8eff3', textAlign: 'center', fontSize: 11, color: '#a9b4b9' }}>
        © 2024 Sentimental Grid. All rights reserved.
      </footer>
    </div>
  );
}
