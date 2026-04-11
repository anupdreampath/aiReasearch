'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ClipboardList, DollarSign, CheckCircle, Clock, Star, ArrowRight, Zap, TrendingUp, Bell } from 'lucide-react';
import { Card, CardHeader, StatCard, Button, Badge, StatusBadge, PageHeader, ProgressBar, Alert, Avatar } from '../../../components/ui';
import { mockAssignments, mockPayments } from '../../../data/mockData';

const myAssignments = mockAssignments.filter(a => a.contributor === 'Rahul Sharma');
const myPayments = mockPayments.filter(p => p.contributor === 'Rahul Sharma');

export default function ContributorDashboard() {
  const router = useRouter();
  const activeTask = myAssignments.find(a => a.status === 'assigned');
  const pendingTask = myAssignments.find(a => a.status === 'posted');

  return (
    <div className="animate-fade-in">
      {/* Welcome */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', borderRadius: 20, padding: '24px 28px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 20, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: '#4F46E520' }} />
        <Avatar name="Rahul Sharma" size={56} color="#818CF8" />
        <div style={{ flex: 1 }}>
          <p style={{ color: '#94A3B8', fontSize: 13, margin: 0 }}>Welcome back,</p>
          <h2 style={{ color: '#0F4C81', fontSize: 22, fontWeight: 800, margin: '2px 0 6px' }}>Rahul Sharma</h2>
          <div style={{ display: 'flex', gap: 16 }}>
            <div><span style={{ fontSize: 18, fontWeight: 800, color: '#475569' }}>48</span><span style={{ fontSize: 11, color: '#2563EB', marginLeft: 4 }}>tasks done</span></div>
            <div><span style={{ fontSize: 18, fontWeight: 800, color: '#34D399' }}>97%</span><span style={{ fontSize: 11, color: '#2563EB', marginLeft: 4 }}>approval rate</span></div>
            <div><span style={{ fontSize: 18, fontWeight: 800, color: '#FCD34D' }}>$230</span><span style={{ fontSize: 11, color: '#2563EB', marginLeft: 4 }}>earned</span></div>
          </div>
        </div>
        {activeTask && (
          <div style={{ background: '#FFFFFF10', borderRadius: 14, padding: '12px 16px', backdropFilter: 'blur(8px)', border: '1px solid #FFFFFF15' }}>
            <p style={{ color: '#94A3B8', fontSize: 11, margin: '0 0 4px' }}>Active task</p>
            <p style={{ color: '#475569', fontWeight: 800, fontSize: 16, margin: '0 0 8px', fontStyle: 'italic' }}>{activeTask.word}</p>
            <Button variant="primary" size="sm" iconRight={<ArrowRight size={12} />} onClick={() => router.push(`/portal/tasks/${activeTask.id}`)}>View Task</Button>
          </div>
        )}
      </div>

      {/* Active task alert */}
      {activeTask && (
        <div style={{ marginBottom: 16 }}>
          <Alert type="info" title={`New assignment: "${activeTask.word}"`} message={`Due ${activeTask.dueDate} · ${activeTask.subreddit} · $${activeTask.amount} upon approval`}
            action={<Button variant="primary" size="sm" onClick={() => router.push(`/portal/tasks/${activeTask.id}`)}>Start Task</Button>} />
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        <StatCard title="Active Tasks" value={myAssignments.filter(a => a.status === 'assigned').length} icon={<ClipboardList size={20} />} color="#4F46E5" bg="#EEF2FF" />
        <StatCard title="Pending Review" value={myAssignments.filter(a => a.status === 'posted').length} icon={<Clock size={20} />} color="#F59E0B" bg="#FFFBEB" />
        <StatCard title="Approved" value={myAssignments.filter(a => ['verified', 'paid'].includes(a.status)).length} icon={<CheckCircle size={20} />} color="#10B981" bg="#ECFDF5" />
        <StatCard title="Pending Pay" value={`$${myPayments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0)}`} icon={<DollarSign size={20} />} color="#F59E0B" bg="#FFFBEB" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        {/* Task List */}
        <Card>
          <CardHeader title="My Assignments" subtitle="Recent and active tasks"
            action={<Button variant="outline" size="sm" onClick={() => router.push('/portal/tasks')}>View All</Button>} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {myAssignments.map(a => (
              <div key={a.id} onClick={() => router.push(`/portal/tasks/${a.id}`)}
                style={{ padding: '12px 14px', borderRadius: 14, background: '#0F4C81', border: '1px solid #F1F5F9', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 900, color: '#DC2626', textTransform: 'uppercase' }}>{a.word.slice(0,2)}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <p style={{ fontWeight: 700, fontSize: 14, color: '#2a3439', margin: 0, fontStyle: 'italic' }}>{a.word}</p>
                    <StatusBadge status={a.status} />
                  </div>
                  <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{a.subreddit} · Due {a.dueDate}</p>
                </div>
                <span style={{ fontWeight: 800, color: '#0D9488', fontSize: 15 }}>${a.amount}</span>
                <ArrowRight size={14} color="#94A3B8" />
              </div>
            ))}
          </div>
        </Card>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Performance */}
          <Card>
            <CardHeader title="My Performance" icon={<Star size={16} />} />
            {[
              { label: 'Approval Rate', value: 97, color: '#0D9488' },
              { label: 'Quality Score', value: 94, color: '#DC2626' },
              { label: 'Completion Rate', value: 96, color: '#D97706' },
            ].map(m => (
              <div key={m.label} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: '#2563EB' }}>{m.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: m.color }}>{m.value}%</span>
                </div>
                <ProgressBar value={m.value} color={m.color} size="sm" />
              </div>
            ))}
          </Card>

          {/* Quick earnings */}
          <Card>
            <CardHeader title="Earnings" icon={<DollarSign size={16} />} action={<Button variant="ghost" size="sm" onClick={() => router.push('/portal/earnings')}>View</Button>} />
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <p style={{ fontSize: 32, fontWeight: 800, color: '#0D9488', margin: 0 }}>$230</p>
              <p style={{ fontSize: 12, color: '#94A3B8', margin: '4px 0 16px' }}>Total earned</p>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div><p style={{ fontSize: 16, fontWeight: 800, color: '#D97706', margin: 0 }}>$10</p><p style={{ fontSize: 10, color: '#94A3B8', margin: 0 }}>Pending</p></div>
                <div style={{ width: 1, background: '#E2E8F0' }} />
                <div><p style={{ fontSize: 16, fontWeight: 800, color: '#DC2626', margin: 0 }}>$220</p><p style={{ fontSize: 10, color: '#94A3B8', margin: 0 }}>Paid</p></div>
              </div>
            </div>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader title="Tips for Success" icon={<Zap size={16} />} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'Use the word naturally in context',
                'Post in suggested subreddits',
                'Aim for 100+ word posts',
                'Submit URL within 24h of posting',
                'Don\'t force the word — make it flow',
              ].map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#DC2626', flexShrink: 0 }}>{i+1}.</span>
                  <p style={{ fontSize: 12, color: '#2563EB', margin: 0, lineHeight: 1.5 }}>{tip}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
