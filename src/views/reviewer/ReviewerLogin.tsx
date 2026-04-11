'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileCheck, Eye, EyeOff, Shield, CheckCircle2, Clock, BarChart3 } from 'lucide-react';

export default function ReviewerLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('sarah.chen@lexipost.io');
  const [password, setPassword] = useState('password123');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push('/reviewer'), 1000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#0F172A' }}>
      {/* Left Panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px', background: 'linear-gradient(135deg, #064E3B 0%, #065F46 50%, #047857 100%)' }}>
        <div style={{ maxWidth: 440 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck size={22} color="#fff" />
            </div>
            <div>
              <p style={{ color: '#fff', fontWeight: 800, fontSize: 20, margin: 0 }}>LexiPost</p>
              <p style={{ color: '#6EE7B7', fontSize: 12, margin: 0, fontWeight: 500 }}>Reviewer Panel</p>
            </div>
          </div>

          <h1 style={{ color: '#fff', fontSize: 36, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
            Review.<br />Approve.<br />Improve quality.
          </h1>
          <p style={{ color: '#A7F3D0', fontSize: 15, margin: '0 0 48px', lineHeight: 1.6 }}>
            Your review decisions directly impact contributor earnings and data quality for ML training.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: <CheckCircle2 size={18} />, label: 'Approve', val: '1,284', sub: 'posts this month' },
              { icon: <Clock size={18} />, label: 'Avg Review Time', val: '47s', sub: 'per submission' },
              { icon: <BarChart3 size={18} />, label: 'Queue Today', val: '6', sub: 'submissions pending' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: 'rgba(255,255,255,0.08)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ color: '#6EE7B7' }}>{s.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#A7F3D0', fontSize: 11, margin: 0 }}>{s.label}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: '#fff', fontWeight: 800, fontSize: 18, margin: 0 }}>{s.val}</p>
                  <p style={{ color: '#6EE7B7', fontSize: 10, margin: 0 }}>{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ width: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, background: '#fff' }}>
        <div style={{ width: '100%', maxWidth: 360 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #10B981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={18} color="#fff" />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 15, margin: 0, color: '#0F172A' }}>Reviewer Portal</p>
              <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>LexiPost Quality Control</p>
            </div>
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>Sign in</h2>
          <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 28px' }}>Access your reviewer dashboard</p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', fontSize: 13, border: '1.5px solid #E2E8F0', borderRadius: 10, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#10B981'}
                onBlur={e => e.target.style.borderColor = '#E2E8F0'}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '10px 40px 10px 14px', fontSize: 13, border: '1.5px solid #E2E8F0', borderRadius: 10, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#10B981'}
                  onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 0 }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '12px', background: loading ? '#6EE7B7' : 'linear-gradient(135deg, #10B981, #059669)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
              {loading ? 'Signing in...' : 'Sign In to Reviewer Panel'}
            </button>
          </form>

          <div style={{ margin: '24px 0', padding: '14px', background: '#F0FDF4', borderRadius: 10, border: '1px solid #BBF7D0' }}>
            <p style={{ fontSize: 11, color: '#065F46', fontWeight: 600, margin: '0 0 4px' }}>Demo credentials</p>
            <p style={{ fontSize: 11, color: '#047857', margin: 0 }}>sarah.chen@lexipost.io / password123</p>
          </div>

          <p style={{ textAlign: 'center', fontSize: 12, color: '#94A3B8', margin: '16px 0 0' }}>
            Not a reviewer?{' '}
            <span onClick={() => router.push('/login')} style={{ color: '#10B981', cursor: 'pointer', fontWeight: 600 }}>Admin login</span>
            {' '}·{' '}
            <span onClick={() => router.push('/portal/login')} style={{ color: '#10B981', cursor: 'pointer', fontWeight: 600 }}>Contributor login</span>
          </p>
        </div>
      </div>
    </div>
  );
}
