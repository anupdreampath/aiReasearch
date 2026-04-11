'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { Button, Input, Alert } from '../../../components/ui';

interface LoginProps {
  mode?: 'admin' | 'user';
}

export default function Login({ mode = 'admin' }: LoginProps) {
  const router = useRouter();
  const isAdmin = mode === 'admin';

  const [email, setEmail] = useState(isAdmin ? 'admin@lexipost.io' : 'rahul.s@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      if (email && password) {
        sessionStorage.setItem(isAdmin ? 'lexipost_admin_auth' : 'lexipost_user_auth', 'true');
        router.push(isAdmin ? '/admin' : '/portal');
      }
      else setError('Please enter your credentials.');
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#EEF2FF', display: 'flex' }}>
      {/* Left Panel */}
      <div style={{ flex: 1, background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 48, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: '#4F46E520' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, borderRadius: '50%', background: '#10B98110' }} />
        <div style={{ position: 'relative', textAlign: 'center', maxWidth: 380 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Zap size={32} color="#fff" />
          </div>
          <h1 style={{ color: '#F8FAFC', fontSize: 32, fontWeight: 800, marginBottom: 12 }}>LexiPost</h1>
          <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.7 }}>
            {isAdmin
              ? 'Linguistic research coordination platform. Manage words, contributors, and data at scale.'
              : 'Create viral content, earn real money. Join thousands of creators making an impact.'}
          </p>
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {(isAdmin
              ? [
                  { label: '1,651 posts', sub: 'Collected across all words' },
                  { label: '156 contributors', sub: 'Active in 12 countries' },
                  { label: '89.4% success rate', sub: 'Industry-leading quality' },
                ]
              : [
                  { label: '$2.4M+ earned', sub: 'Paid out to creators worldwide' },
                  { label: '50K+ creators', sub: 'Active on the platform' },
                  { label: '$1,240/month avg', sub: 'Average creator earnings' },
                ]
            ).map(s => (
              <div key={s.label} style={{ background: '#FFFFFF10', borderRadius: 12, padding: '12px 16px', textAlign: 'left', backdropFilter: 'blur(8px)', border: '1px solid #FFFFFF15' }}>
                <p style={{ color: '#F8FAFC', fontWeight: 700, fontSize: 18, margin: 0 }}>{s.label}</p>
                <p style={{ color: '#64748B', fontSize: 12, margin: 0 }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ width: 480, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 56px', background: '#fff' }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>Welcome back</h2>
          <p style={{ color: '#64748B', fontSize: 14, marginBottom: 32 }}>
            {isAdmin ? 'Sign in to your admin account' : 'Sign in to your creator account'}
          </p>

          {error && <div style={{ marginBottom: 20 }}><Alert type="danger" message={error} onClose={() => setError('')} /></div>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="Email address" type="email" value={email} onChange={setEmail} placeholder={isAdmin ? 'admin@lexipost.io' : 'you@example.com'} icon={<Mail size={14} />} required />
            <div>
              <Input label="Password" type={showPw ? 'text' : 'password'} value={password} onChange={setPassword} placeholder="Enter your password" icon={<Lock size={14} />} required />
              <button onClick={() => setShowPw(p => !p)} style={{ position: 'absolute', right: 12, top: '50%', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'none' }}>
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8, marginBottom: 24 }}>
            <button onClick={() => router.push('/forgot-password')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4F46E5', fontSize: 13, fontWeight: 500, fontFamily: 'inherit' }}>Forgot password?</button>
          </div>

          <Button variant="primary" className="w-full" onClick={handleLogin} loading={loading} iconRight={<ArrowRight size={15} />} style={{ width: '100%' }}>
            {isAdmin ? 'Sign in to Dashboard' : 'Sign in to Portal'}
          </Button>

          <div style={{ marginTop: 24, padding: '16px', background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0' }}>
            <p style={{ fontSize: 12, color: '#64748B', textAlign: 'center', margin: 0 }}>
              Demo credentials: <strong style={{ color: '#0F172A' }}>{email}</strong> / <strong style={{ color: '#0F172A' }}>password123</strong>
            </p>
          </div>

          <p style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: '#94A3B8' }}>
            {isAdmin ? (
              <>
                Are you a contributor?{' '}
                <button onClick={() => router.push('/login')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4F46E5', fontWeight: 600, fontFamily: 'inherit' }}>Access creator portal</button>
              </>
            ) : (
              <>
                New to LexiPost?{' '}
                <button onClick={() => router.push('/portal/setup')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4F46E5', fontWeight: 600, fontFamily: 'inherit' }}>First time setup →</button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
