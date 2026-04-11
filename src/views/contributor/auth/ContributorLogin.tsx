'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Mail, ArrowRight, Lock } from 'lucide-react';
import { Button, Input, Alert } from '../../../components/ui';

export default function ContributorLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('rahul.s@gmail.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); router.push('/portal'); }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Zap size={28} color="#fff" />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>Contributor Portal</h1>
          <p style={{ color: '#64748B', fontSize: 14 }}>Sign in to see your assignments</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 20, padding: '32px', boxShadow: '0 10px 40px rgba(79,70,229,0.1)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Input label="Email" type="email" value={email} onChange={setEmail} icon={<Mail size={14} />} required />
            <Input label="Password" type="password" value={password} onChange={setPassword} icon={<Lock size={14} />} required />
            <Button variant="primary" onClick={handleLogin} loading={loading} iconRight={<ArrowRight size={14} />} style={{ width: '100%', marginTop: 8 }}>Sign In</Button>
          </div>
          <div style={{ marginTop: 20, padding: 14, background: '#F8FAFC', borderRadius: 12, textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: '#94A3B8', margin: '0 0 4px' }}>Or use your magic link from email</p>
            <button onClick={() => router.push('/portal/setup')} style={{ fontSize: 13, color: '#4F46E5', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>First time setup →</button>
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#94A3B8' }}>
          Admin?{' '}
          <button onClick={() => router.push('/login')} style={{ color: '#4F46E5', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Go to admin panel</button>
        </p>
      </div>
    </div>
  );
}
