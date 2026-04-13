'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button, Input, Select, Alert } from '../../../components/ui';

const steps = ['Personal Info', 'Reddit Account', 'Payment Setup', 'Done'];

export default function AccountSetup() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', country: '', reddit: '', paymentMethod: '', paypalEmail: '' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const StepContent = () => {
    if (step === 0) return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Input label="Full Name" value={form.name} onChange={v => set('name', v)} required />
        <Input label="Email Address" type="email" value={form.email} onChange={v => set('email', v)} required />
        <Select label="Country" value={form.country} onChange={v => set('country', v)} options={['India', 'Philippines', 'USA', 'UK', 'Nigeria', 'Mexico', 'Japan', 'Brazil', 'Pakistan', 'Bangladesh']} required />
      </div>
    );
    if (step === 1) return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Alert type="info" message="We need to verify your Reddit account to ensure it meets our quality requirements (6+ months old, 1,000+ karma)." />
        <Input label="Reddit Username" value={form.reddit} onChange={v => set('reddit', v)} placeholder="u/yourusername" required />
        <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: 12, fontSize: 12, color: '#64748B', lineHeight: 1.7 }}>
          <p style={{ fontWeight: 600, color: '#334155', marginBottom: 4 }}>Requirements:</p>
          <p>✓ Account age: 6+ months</p>
          <p>✓ Karma: 1,000+ combined</p>
          <p>✓ Account in good standing (no bans)</p>
        </div>
      </div>
    );
    if (step === 2) return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Select label="Payment Method" value={form.paymentMethod} onChange={v => set('paymentMethod', v)} options={['PayPal', 'Stripe', 'Bank Transfer']} required />
        <Input label="PayPal Email / Account" value={form.paypalEmail} onChange={v => set('paypalEmail', v)} placeholder="payments@youremail.com" required />
        <div style={{ padding: '12px 14px', background: '#ECFDF5', borderRadius: 12, fontSize: 12, color: '#065F46' }}>
          <p style={{ fontWeight: 600, margin: '0 0 2px' }}>Payment Terms</p>
          <p style={{ margin: 0 }}>You earn $5 per approved post. Payments processed within 24h of approval.</p>
        </div>
      </div>
    );
    return (
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        <div style={{ width: 64, height: 64, borderRadius: 20, background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <CheckCircle size={32} color="#10B981" />
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>You're all set!</h3>
        <p style={{ color: '#64748B', fontSize: 13, marginBottom: 24 }}>Your account is being reviewed. You'll receive your first task via email within 24 hours.</p>
        <Button variant="primary" onClick={() => router.push('/portal')} style={{ width: '100%' }}>Go to Dashboard</Button>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <Zap size={24} color="#fff" />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', margin: 0 }}>Account Setup</h2>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 24, flexWrap: 'wrap' }}>
          {steps.map((s, i) => (
            <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: i <= step ? '#4F46E5' : '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', position: 'relative', zIndex: 1 }}>
                {i < step ? <CheckCircle size={14} color="#fff" /> : <span style={{ fontSize: 11, fontWeight: 700, color: i <= step ? '#fff' : '#94A3B8' }}>{i + 1}</span>}
              </div>
              <span style={{ fontSize: 10, color: i <= step ? '#4F46E5' : '#94A3B8', fontWeight: i === step ? 700 : 400, textAlign: 'center' }}>{s}</span>
              {i < steps.length - 1 && <div style={{ position: 'absolute', height: 2, background: i < step ? '#4F46E5' : '#E2E8F0', top: 13 }} />}
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 20, padding: '28px', boxShadow: '0 8px 32px rgba(79,70,229,0.1)', boxSizing: 'border-box' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 20 }}>{steps[step]}</h3>
          <StepContent />
          {step < 3 && (
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              {step > 0 && <Button variant="secondary" icon={<ArrowLeft size={13} />} onClick={() => setStep(s => s - 1)}>Back</Button>}
              <Button variant="primary" iconRight={<ArrowRight size={13} />} onClick={() => setStep(s => s + 1)} style={{ flex: 1 }}>
                {step === 2 ? 'Finish Setup' : 'Continue'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
