// @ts-nocheck
'use client';

// Remaining contributor portal screens as named exports
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight, Clock, CheckCircle, XCircle, DollarSign, CreditCard, Bell,
  MessageSquare, TrendingUp, User, Star, HelpCircle, BookOpen, Send,
  ExternalLink, Settings, Shield, Award, AlertCircle, ChevronRight, Zap
} from 'lucide-react';
import { Card, CardHeader, Button, Badge, StatusBadge, PageHeader, ProgressBar, Alert, Input, Select, Textarea, Toggle, Avatar, Tabs, StatCard, SearchBar } from '../../components/ui';
import { mockAssignments, mockPayments } from '../../data/mockData';

const myAssignments = mockAssignments.filter(a => a.contributor === 'Rahul Sharma');
const myPayments = mockPayments.filter(p => p.contributor === 'Rahul Sharma');

// ─── Task List ────────────────────────────────────────────────────────────────
export function TaskList() {
  const router = useRouter();
  const [tab, setTab] = useState('active');
  const byStatus = { active: myAssignments.filter(a => a.status === 'assigned'), posted: myAssignments.filter(a => a.status === 'posted'), done: myAssignments.filter(a => ['verified', 'paid', 'rejected'].includes(a.status)) };
  const shown = byStatus[tab] || myAssignments;
  return (
    <div className="animate-fade-in">
      <PageHeader title="My Tasks" subtitle="All your assigned words and their status" />
      <div style={{ marginBottom: 16 }}>
        <Tabs tabs={[{ id: 'active', label: 'Active', count: byStatus.active.length }, { id: 'posted', label: 'Submitted', count: byStatus.posted.length }, { id: 'done', label: 'Completed', count: byStatus.done.length }]} active={tab} onChange={setTab} />
      </div>
      {shown.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: '#94A3B8' }}><Zap size={32} style={{ margin: '0 auto 12px', display: 'block' }} /><p>No tasks in this category</p></div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {shown.map(a => (
          <Card key={a.id} hover onClick={() => router.push(`/portal/tasks/${a.id}`)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 12, fontWeight: 900, color: '#fff', textTransform: 'uppercase' }}>{a.word.slice(0,2)}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <p style={{ fontWeight: 800, fontSize: 16, color: '#0F172A', margin: 0, fontStyle: 'italic' }}>{a.word}</p>
                  <StatusBadge status={a.status} />
                </div>
                <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#94A3B8' }}>
                  <span>{a.subreddit}</span><span>·</span><span>Due {a.dueDate}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 18, fontWeight: 800, color: '#10B981', margin: 0 }}>${a.amount}</p>
                <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>reward</p>
              </div>
              <ArrowRight size={16} color="#94A3B8" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Task History ─────────────────────────────────────────────────────────────
export function TaskHistory() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Task History" subtitle="All completed and past assignments" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {myAssignments.map(a => (
          <div key={a.id} style={{ padding: '14px', background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: a.status === 'paid' || a.status === 'verified' ? '#ECFDF5' : a.status === 'rejected' ? '#FEF2F2' : '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {(a.status === 'paid' || a.status === 'verified') ? <CheckCircle size={16} color="#10B981" /> : a.status === 'rejected' ? <XCircle size={16} color="#EF4444" /> : <Clock size={16} color="#4F46E5" />}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: 13, color: '#0F172A', margin: 0, fontStyle: 'italic' }}>{a.word}</p>
              <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{a.subreddit} · {a.completedAt || a.dueDate}</p>
            </div>
            <StatusBadge status={a.status} />
            <span style={{ fontWeight: 800, color: a.amount > 0 ? '#10B981' : '#94A3B8' }}>{a.amount > 0 ? `$${a.amount}` : '—'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Submission Status ─────────────────────────────────────────────────────────
export function SubmissionStatus() {
  const router = useRouter();
  return (
    <div className="animate-fade-in">
      <PageHeader title="Submission Status" subtitle="Track the status of your submitted posts" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
        <StatCard title="Submitted" value={myAssignments.filter(a => a.status !== 'assigned').length} icon={<Send size={20} />} color="#4F46E5" bg="#EEF2FF" />
        <StatCard title="Under Review" value={myAssignments.filter(a => a.status === 'posted').length} icon={<Clock size={20} />} color="#F59E0B" bg="#FFFBEB" />
        <StatCard title="Approved" value={myAssignments.filter(a => ['verified', 'paid'].includes(a.status)).length} icon={<CheckCircle size={20} />} color="#10B981" bg="#ECFDF5" />
      </div>
      {myAssignments.filter(a => a.status !== 'assigned').map(a => (
        <Card key={a.id} style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 13, background: a.status === 'paid' || a.status === 'verified' ? '#ECFDF5' : a.status === 'rejected' ? '#FEF2F2' : '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {a.status === 'paid' || a.status === 'verified' ? <CheckCircle size={20} color="#10B981" /> : a.status === 'rejected' ? <XCircle size={20} color="#EF4444" /> : <Clock size={20} color="#F59E0B" />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <p style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', margin: 0 }}>{a.word}</p>
                <StatusBadge status={a.status} />
              </div>
              <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>
                {a.status === 'posted' ? '⏳ Awaiting review — usually within 24h' :
                 a.status === 'verified' ? '✅ Approved! Payment processing...' :
                 a.status === 'paid' ? '💸 Paid! Check your earnings' :
                 a.status === 'rejected' ? '❌ Rejected — see feedback in notifications' : ''}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 16, fontWeight: 800, color: '#10B981', margin: 0 }}>${a.amount}</p>
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ display: 'flex', gap: 0, marginTop: 14 }}>
            {['Submitted', 'Scraping', 'Verification', 'Payment'].map((s, i) => {
              const stepIdx = { posted: 1, verified: 2, paid: 3, rejected: 1 };
              const active = (stepIdx[a.status] || 0) >= i;
              return (
                <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', height: 4, background: active ? '#4F46E5' : '#F1F5F9', borderRadius: i === 0 ? '999px 0 0 999px' : i === 3 ? '0 999px 999px 0' : 0 }} />
                  <span style={{ fontSize: 10, color: active ? '#4F46E5' : '#94A3B8', fontWeight: active ? 600 : 400 }}>{s}</span>
                </div>
              );
            })}
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── Performance Stats ────────────────────────────────────────────────────────
export function PerformanceStats() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Performance Stats" subtitle="Your track record and quality metrics" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
        <StatCard title="Approval Rate" value="97%" change="↑ 2% from last month" changeType="positive" icon={<Star size={20} />} color="#F59E0B" bg="#FFFBEB" />
        <StatCard title="Quality Score" value="94/100" change="Top 10% of contributors" changeType="positive" icon={<Award size={20} />} color="#4F46E5" bg="#EEF2FF" />
        <StatCard title="Avg Response Time" value="6.2h" change="↓ 1.3h from last month" changeType="positive" icon={<Clock size={20} />} color="#10B981" bg="#ECFDF5" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <CardHeader title="My Metrics" />
          {[
            { label: 'Total Tasks Completed', value: '46', max: null, color: '#4F46E5' },
            { label: 'Approval Rate', value: '97%', bar: 97, color: '#10B981' },
            { label: 'Rejection Rate', value: '3%', bar: 3, color: '#EF4444' },
            { label: 'Quality Score', value: '94/100', bar: 94, color: '#F59E0B' },
            { label: 'Avg Post Score (upvotes)', value: '156', max: null, color: '#8B5CF6' },
          ].map(m => (
            <div key={m.label} style={{ padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: m.bar !== undefined ? 6 : 0 }}>
                <span style={{ fontSize: 12, color: '#64748B' }}>{m.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: m.color }}>{m.value}</span>
              </div>
              {m.bar !== undefined && <ProgressBar value={m.bar} color={m.color} size="sm" />}
            </div>
          ))}
        </Card>
        <Card>
          <CardHeader title="Badge & Rank" />
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #F59E0B, #D97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(245,158,11,0.3)' }}>
              <Star size={36} fill="#fff" color="#fff" />
            </div>
            <p style={{ fontWeight: 800, fontSize: 20, color: '#0F172A', margin: '0 0 4px' }}>Gold Contributor</p>
            <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 20px' }}>Top 10% overall · 97% approval rate</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              {[{ v: '#1', l: 'This month' }, { v: '#8', l: 'All time' }].map(r => (
                <div key={r.l} style={{ padding: '10px 20px', background: '#FFF7ED', borderRadius: 12, border: '1px solid #FDE68A' }}>
                  <p style={{ fontSize: 20, fontWeight: 800, color: '#D97706', margin: 0 }}>{r.v}</p>
                  <p style={{ fontSize: 10, color: '#92400E', margin: 0 }}>{r.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 16, padding: '12px', background: '#ECFDF5', borderRadius: 12 }}>
            <p style={{ fontSize: 12, color: '#065F46', fontWeight: 600, margin: '0 0 4px' }}>Next milestone: Platinum</p>
            <p style={{ fontSize: 11, color: '#059669', margin: 0 }}>100 tasks with 95%+ approval rate</p>
            <ProgressBar value={46} max={100} color="#10B981" size="sm" style={{ marginTop: 8 }} />
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Earnings Dashboard ───────────────────────────────────────────────────────
export function EarningsDashboard() {
  const router = useRouter();
  return (
    <div className="animate-fade-in">
      <PageHeader title="My Earnings" subtitle="Track your income from completed tasks" />
      <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', borderRadius: 20, padding: '28px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 24 }}>
        <div>
          <p style={{ color: '#64748B', fontSize: 13, margin: 0 }}>Total Earned</p>
          <p style={{ color: '#34D399', fontSize: 44, fontWeight: 900, margin: '4px 0' }}>$230</p>
          <p style={{ color: '#94A3B8', fontSize: 12, margin: 0 }}>Across 46 approved posts</p>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 20 }}>
          {[{ label: 'This Month', value: '$10', color: '#818CF8' }, { label: 'Pending', value: '$10', color: '#FCD34D' }, { label: 'All Time', value: '$230', color: '#34D399' }].map(s => (
            <div key={s.label} style={{ textAlign: 'center', padding: '16px 20px', background: '#FFFFFF10', borderRadius: 14 }}>
              <p style={{ fontSize: 22, fontWeight: 800, color: s.color, margin: 0 }}>{s.value}</p>
              <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <Card>
          <CardHeader title="Earnings Breakdown" action={<Button variant="ghost" size="sm" onClick={() => router.push('/portal/earnings/history')}>Full History</Button>} />
          {myAssignments.filter(a => a.status === 'paid' || a.status === 'verified').map(a => (
            <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DollarSign size={16} color="#10B981" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 13, color: '#0F172A', margin: 0 }}>{a.word} — {a.subreddit}</p>
                <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{a.completedAt}</p>
              </div>
              <span style={{ fontWeight: 800, fontSize: 16, color: '#10B981' }}>${a.amount}</span>
            </div>
          ))}
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card>
            <CardHeader title="Payment Info" />
            <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: 12, marginBottom: 12 }}>
              <p style={{ fontSize: 11, color: '#94A3B8', margin: '0 0 2px' }}>Payment Method</p>
              <p style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', margin: 0 }}>PayPal</p>
              <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>rahul.s@gmail.com</p>
            </div>
            <Button variant="secondary" style={{ width: '100%' }} onClick={() => router.push('/portal/earnings/method')}>Update Payment Method</Button>
          </Card>
          <Card>
            <CardHeader title="Payout Schedule" />
            <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.8 }}>
              <p>💸 Payments trigger within 24h of approval</p>
              <p>📅 Batch payouts: daily at 9AM UTC</p>
              <p>✅ Minimum payout: $1</p>
              <p>⏱️ Processing time: 1-3 business days</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Payment History (Contributor) ────────────────────────────────────────────
export function ContributorPaymentHistory() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Payment History" subtitle="Your complete payout record" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {myPayments.map(p => (
          <Card key={p.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: p.status === 'completed' ? '#ECFDF5' : '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DollarSign size={20} color={p.status === 'completed' ? '#10B981' : '#F59E0B'} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <p style={{ fontWeight: 700, fontSize: 15, color: '#0F172A', margin: 0 }}>${p.amount}</p>
                  <StatusBadge status={p.status} />
                </div>
                <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>{p.method} · {p.assignments} tasks · {p.createdAt}</p>
                {p.paidAt && <p style={{ fontSize: 11, color: '#10B981', margin: 0 }}>✓ Paid on {p.paidAt}</p>}
              </div>
            </div>
          </Card>
        ))}
        {myPayments.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>No payment history yet</div>}
      </div>
    </div>
  );
}

// ─── Payment Method Setup ─────────────────────────────────────────────────────
export function PaymentMethodSetup() {
  const [method, setMethod] = useState('PayPal');
  const [email, setEmail] = useState('rahul.s@gmail.com');
  return (
    <div className="animate-fade-in">
      <PageHeader title="Payment Method" subtitle="Set up how you receive your earnings" />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <Card>
          <CardHeader title="Configure Payment" icon={<CreditCard size={16} />} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Select label="Payment Method" value={method} onChange={setMethod} options={[{ value: 'PayPal', label: 'PayPal (Recommended)' }, { value: 'Stripe', label: 'Stripe / Bank Card' }]} />
            <Input label={method === 'PayPal' ? 'PayPal Email' : 'Bank Account Email'} type="email" value={email} onChange={setEmail} required />
            <div style={{ padding: '12px 14px', background: '#EEF2FF', borderRadius: 12, fontSize: 12, color: '#4F46E5' }}>
              <p style={{ fontWeight: 600, margin: '0 0 4px' }}>How it works:</p>
              <p style={{ margin: 0 }}>Payments are sent to this account within 24h of task approval. Make sure the email is correct and can receive payments.</p>
            </div>
            <Button variant="primary" icon={<Shield size={14} />} style={{ width: '100%' }}>Save Payment Method</Button>
          </div>
        </Card>
        <Card>
          <CardHeader title="Current Method" />
          <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: 14, border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <CreditCard size={24} color="#4F46E5" />
            </div>
            <p style={{ fontWeight: 700, fontSize: 16, color: '#0F172A', margin: '0 0 4px' }}>PayPal</p>
            <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>rahul.s@gmail.com</p>
            <Badge variant="success" style={{ marginTop: 8 }}>Active</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Notifications ────────────────────────────────────────────────────────────
export function NotificationsScreen() {
  const notifications = [
    { id: 1, type: 'approval', title: 'Submission Approved!', message: 'Your "frumious" post was approved. $5 payment triggered.', time: '2 hours ago', read: false, color: '#10B981', bg: '#ECFDF5' },
    { id: 2, type: 'assignment', title: 'New Task Assigned', message: 'You\'ve been assigned the word "blorple". Due April 7.', time: '5 hours ago', read: false, color: '#4F46E5', bg: '#EEF2FF' },
    { id: 3, type: 'payment', title: 'Payment Sent', message: '$10 has been sent to your PayPal account.', time: '1 day ago', read: true, color: '#F59E0B', bg: '#FFFBEB' },
    { id: 4, type: 'reminder', title: 'Task Due Soon', message: 'Your "quiffle" assignment is due in 2 days.', time: '2 days ago', read: true, color: '#EF4444', bg: '#FEF2F2' },
  ];
  const icons = { approval: <CheckCircle size={18} />, assignment: <Zap size={18} />, payment: <DollarSign size={18} />, reminder: <AlertCircle size={18} /> };
  return (
    <div className="animate-fade-in">
      <PageHeader title="Notifications" subtitle={`${notifications.filter(n => !n.read).length} unread`}
        action={<Button variant="ghost" size="sm">Mark all read</Button>} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {notifications.map(n => (
          <Card key={n.id} style={{ border: n.read ? '1px solid #E2E8F0' : `1.5px solid ${n.color}30`, background: n.read ? '#fff' : n.bg }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: n.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: n.color, flexShrink: 0, border: `1px solid ${n.color}30` }}>
                {icons[n.type]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <p style={{ fontWeight: n.read ? 500 : 700, fontSize: 13, color: '#0F172A', margin: 0 }}>{n.title}</p>
                  <span style={{ fontSize: 11, color: '#94A3B8' }}>{n.time}</span>
                </div>
                <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>{n.message}</p>
              </div>
              {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.color, flexShrink: 0, marginTop: 4 }} />}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Support Chat ─────────────────────────────────────────────────────────────
export function SupportChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, from: 'support', text: 'Hi Rahul! How can we help you today?', time: '10:00' },
    { id: 2, from: 'me', text: 'I submitted a post but got a word not found error. The word is definitely in my post.', time: '10:02' },
    { id: 3, from: 'support', text: 'Thanks for reaching out! Can you share the URL? We\'ll manually review it for you within 2 hours.', time: '10:05' },
  ]);
  const send = () => {
    if (!message.trim()) return;
    setMessages(p => [...p, { id: Date.now(), from: 'me', text: message, time: new Date().toTimeString().slice(0,5) }]);
    setMessage('');
    setTimeout(() => setMessages(p => [...p, { id: Date.now(), from: 'support', text: 'Thanks for the message! Our team will respond shortly.', time: new Date().toTimeString().slice(0,5) }]), 1500);
  };
  return (
    <div className="animate-fade-in">
      <PageHeader title="Support Chat" subtitle="Get help from our team" />
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <Card>
          <div style={{ height: 400, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, padding: '4px 0', marginBottom: 16 }}>
            {messages.map(m => (
              <div key={m.id} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start', gap: 8 }}>
                {m.from === 'support' && <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>LP</span></div>}
                <div style={{ maxWidth: '70%', padding: '10px 14px', borderRadius: m.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: m.from === 'me' ? '#4F46E5' : '#F1F5F9', color: m.from === 'me' ? '#fff' : '#334155', fontSize: 13, lineHeight: 1.5 }}>
                  {m.text}
                  <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4, textAlign: 'right' }}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Type your message..." style={{ flex: 1, padding: '10px 14px', fontSize: 13, border: '1.5px solid #E2E8F0', borderRadius: 12, outline: 'none', fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor = '#4F46E5'} onBlur={e => e.target.style.borderColor = '#E2E8F0'} />
            <Button variant="primary" icon={<Send size={14} />} onClick={send} />
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Profile Settings ──────────────────────────────────────────────────────────
export function ProfileSettings() {
  const [form, setForm] = useState({ name: 'Rahul Sharma', email: 'rahul.s@gmail.com', country: 'India', reddit: 'u/rahul_sh', bio: '' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  return (
    <div className="animate-fade-in">
      <PageHeader title="Profile Settings" subtitle="Manage your account information" />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <Card>
          <CardHeader title="Personal Information" icon={<User size={16} />} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 8 }}>
              <Avatar name={form.name} size={60} color="#4F46E5" />
              <div>
                <p style={{ fontWeight: 700, fontSize: 16, color: '#0F172A', margin: 0 }}>{form.name}</p>
                <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>Gold Contributor · {form.country}</p>
                <Button variant="ghost" size="sm" style={{ marginTop: 4, padding: '4px 0' }}>Change Photo</Button>
              </div>
            </div>
            <Input label="Full Name" value={form.name} onChange={v => set('name', v)} />
            <Input label="Email" type="email" value={form.email} onChange={v => set('email', v)} />
            <Select label="Country" value={form.country} onChange={v => set('country', v)} options={['India', 'Philippines', 'USA', 'UK', 'Nigeria', 'Mexico']} />
            <Input label="Reddit Username" value={form.reddit} onChange={v => set('reddit', v)} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <Button variant="secondary">Cancel</Button>
              <Button variant="primary">Save Changes</Button>
            </div>
          </div>
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card>
            <CardHeader title="Account Stats" />
            {[{ label: 'Member Since', value: '2026-01-10' }, { label: 'Tasks Completed', value: '46' }, { label: 'Total Earned', value: '$230' }, { label: 'Approval Rate', value: '97%' }].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>{s.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>{s.value}</span>
              </div>
            ))}
          </Card>
          <Card>
            <CardHeader title="Preferences" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Toggle value={true} onChange={() => {}} label="Email notifications" />
              <Toggle value={true} onChange={() => {}} label="Task reminders" />
              <Toggle value={false} onChange={() => {}} label="Weekly digest" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Guidelines ───────────────────────────────────────────────────────────────
export function Guidelines() {
  const [section, setSection] = useState('overview');
  const tabs = [{ id: 'overview', label: 'Overview' }, { id: 'posting', label: 'How to Post' }, { id: 'quality', label: 'Quality Standards' }, { id: 'payments', label: 'Getting Paid' }];
  return (
    <div className="animate-fade-in">
      <PageHeader title="Guidelines & Training" subtitle="Everything you need to succeed as a contributor" />
      <div style={{ marginBottom: 20 }}><Tabs tabs={tabs} active={section} onChange={setSection} /></div>
      {section === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Card>
            <CardHeader title="Welcome to LexiPost" icon={<Star size={16} />} />
            <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.8 }}>
              <p>You're part of a linguistic research panel. Your job is to naturally incorporate new words into everyday Reddit conversations.</p>
              <p style={{ marginTop: 8 }}>This is real research — the words you use help linguists and researchers understand how language evolves naturally in online communities.</p>
            </div>
          </Card>
          <Card>
            <CardHeader title="Quick Rules" icon={<Shield size={16} />} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Use words naturally, not forcefully', 'Don\'t mention you\'re in a research study', 'Post in appropriate, relevant subreddits', 'Write genuine, authentic content', 'Submit within 7 days of assignment', 'One submission per assignment only'].map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <CheckCircle size={14} color="#10B981" flexShrink={0} />
                  <span style={{ fontSize: 13, color: '#334155' }}>{r}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
      {section === 'posting' && (
        <Card>
          <CardHeader title="How to Create a Post" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { step: 1, title: 'Understand the word', desc: 'Read the definition carefully. Think of a real situation where you\'d use this word.' },
              { step: 2, title: 'Choose the right subreddit', desc: 'Pick one of the suggested subreddits. Make sure the topic fits naturally.' },
              { step: 3, title: 'Write authentically', desc: 'Write like yourself. Don\'t copy the example — it\'s just to show you the style. Aim for 100+ words.' },
              { step: 4, title: 'Use the word naturally', desc: 'The word should appear at least once, in a way that flows naturally. Don\'t just stick it in randomly.' },
              { step: 5, title: 'Post and copy the URL', desc: 'After posting, copy the full URL from your browser bar. Don\'t delete the post.' },
              { step: 6, title: 'Submit within 24 hours', desc: 'Come back here and paste the URL. Our system will verify it automatically.' },
            ].map(s => (
              <div key={s.step} style={{ display: 'flex', gap: 14, padding: '14px', background: '#F8FAFC', borderRadius: 14 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: 14 }}>{s.step}</span>
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', margin: 0 }}>{s.title}</p>
                  <p style={{ fontSize: 13, color: '#64748B', margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      {section === 'quality' && (
        <Card>
          <CardHeader title="Quality Standards" subtitle="What we look for when reviewing your submission" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Word must appear in post', type: 'required', color: '#EF4444' },
              { label: 'Minimum 50 words', type: 'required', color: '#EF4444' },
              { label: 'Post in correct subreddit', type: 'required', color: '#EF4444' },
              { label: 'URL must be valid and active', type: 'required', color: '#EF4444' },
              { label: 'No duplicate content', type: 'required', color: '#EF4444' },
              { label: 'Natural use of word', type: 'preferred', color: '#10B981' },
              { label: '100+ words preferred', type: 'preferred', color: '#10B981' },
              { label: 'Relevant context to subreddit', type: 'preferred', color: '#10B981' },
            ].map(q => (
              <div key={q.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: '#F8FAFC', borderRadius: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: q.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: '#334155' }}>{q.label}</span>
                <Badge variant={q.type === 'required' ? 'danger' : 'success'} size="xs">{q.type}</Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
      {section === 'payments' && (
        <Card>
          <CardHeader title="Payment Guide" />
          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.8 }}>
            <p><strong style={{ color: '#0F172A' }}>How much do I earn?</strong><br />$5 per approved post. Some tasks may have higher rates.</p>
            <p style={{ marginTop: 12 }}><strong style={{ color: '#0F172A' }}>When do I get paid?</strong><br />Within 24 hours of your submission being approved.</p>
            <p style={{ marginTop: 12 }}><strong style={{ color: '#0F172A' }}>What if I'm rejected?</strong><br />You won't be paid for rejected posts. Check the rejection reason and improve your next submission.</p>
            <p style={{ marginTop: 12 }}><strong style={{ color: '#0F172A' }}>What payment methods are supported?</strong><br />PayPal and Stripe. Set yours in Settings → Payment Method.</p>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── Help Center ──────────────────────────────────────────────────────────────
export function HelpCenter() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const faqs = [
    { q: 'Why was my submission rejected?', a: 'Most rejections happen when the word isn\'t found in the post text, the content is too short (<50 words), or the post was in an irrelevant subreddit. Check your notification for the specific reason.' },
    { q: 'Can I delete my post after submitting?', a: 'Please don\'t delete your post after submitting! We need it to remain live for verification. Deleted posts will result in automatic rejection.' },
    { q: 'How long does verification take?', a: 'Auto-check runs instantly. Manual review (if needed) takes up to 24 hours. You\'ll be notified once reviewed.' },
    { q: 'My post was approved but I haven\'t been paid', a: 'Payments trigger within 24h and take 1-3 business days to arrive. Check your PayPal/Stripe account. If nothing after 5 days, contact support.' },
    { q: 'Can I submit comments instead of posts?', a: 'Generally no — we prefer top-level posts. However, some assignments may specify comments. Check your task instructions.' },
    { q: 'What happens if my Reddit account gets banned?', a: 'Contact support immediately. We can adjust your account status and won\'t penalize you for platform bans that aren\'t your fault.' },
  ];
  const filtered = faqs.filter(f => !search || f.q.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="animate-fade-in">
      <PageHeader title="Help Center" subtitle="Frequently asked questions and support" />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <div>
          <SearchBar value={search} onChange={setSearch} placeholder="Search FAQs..." style={{ marginBottom: 16 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((faq, i) => (
              <Card key={i}>
                <details style={{ cursor: 'pointer' }}>
                  <summary style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {faq.q} <ChevronRight size={16} color="#94A3B8" />
                  </summary>
                  <p style={{ fontSize: 13, color: '#64748B', margin: '12px 0 0', lineHeight: 1.7 }}>{faq.a}</p>
                </details>
              </Card>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card>
            <CardHeader title="Still need help?" icon={<HelpCircle size={16} />} />
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 14 }}>Can't find what you're looking for? Our team is here to help.</p>
            <Button variant="primary" icon={<MessageSquare size={14} />} onClick={() => router.push('/portal/support')} style={{ width: '100%' }}>Start Live Chat</Button>
          </Card>
          <Card>
            <CardHeader title="Quick Links" />
            {[{ label: 'View My Tasks', path: '/portal/tasks' }, { label: 'Earnings Dashboard', path: '/portal/earnings' }, { label: 'Payment Method', path: '/portal/earnings/method' }, { label: 'Guidelines', path: '/portal/guidelines' }].map(l => (
              <button key={l.label} onClick={() => router.push(l.path)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', background: 'none', border: 'none', borderBottom: '1px solid #F1F5F9', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, color: '#334155' }}>
                {l.label} <ArrowRight size={13} color="#94A3B8" />
              </button>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
