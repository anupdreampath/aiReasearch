'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button, Input, Alert } from '../../../components/ui';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 440, background: '#fff', borderRadius: 24, boxShadow: '0 20px 60px rgba(15,23,42,0.1)', overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', padding: '32px 40px', textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: '#FFFFFF20', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Zap size={28} color="#fff" />
          </div>
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: 0 }}>Reset Password</h1>
          <p style={{ color: '#C7D2FE', fontSize: 13, marginTop: 6 }}>We'll send you a reset link</p>
        </div>
        <div style={{ padding: '32px 40px' }}>
          {!sent ? (
            <>
              <p style={{ color: '#64748B', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>Enter the email address associated with your account and we'll send you a link to reset your password.</p>
              <Input label="Email address" type="email" value={email} onChange={setEmail} placeholder="admin@lexipost.io" icon={<Mail size={14} />} required className="mb-6" />
              <div style={{ marginBottom: 16 }}>
                <Button variant="primary" onClick={handleSubmit} loading={loading} style={{ width: '100%' }}>Send Reset Link</Button>
              </div>
              <Button variant="ghost" icon={<ArrowLeft size={14} />} onClick={() => router.push('/login')} style={{ width: '100%' }}>Back to sign in</Button>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <CheckCircle size={28} color="#10B981" />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>Check your email</h3>
              <p style={{ color: '#64748B', fontSize: 13, lineHeight: 1.6, marginBottom: 24 }}>We've sent a password reset link to <strong>{email || 'your email'}</strong>. The link will expire in 30 minutes.</p>
              <Button variant="primary" onClick={() => router.push('/login')} style={{ width: '100%' }}>Return to Sign In</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
