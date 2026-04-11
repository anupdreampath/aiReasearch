'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const rulesData = [
  {
    id: 1,
    name: 'High Performance - APAC Tier 1',
    status: 'Automated',
    statusBg: '#91feef',
    statusColor: '#006259',
    enabled: true,
    conditions: [
      { label: 'Quality Score', value: '> 80', color: '#2d6197' },
      { label: 'Region', value: '= India', color: '#2d6197' },
      { label: 'Tasks', value: '< 5 this week', color: '#2d6197' },
    ],
    action: {
      word: 'Sentiment Analysis',
      limit: '3 tasks',
    },
  },
  {
    id: 2,
    name: 'New Contributor Onboarding',
    status: 'Limited',
    statusBg: '#d5e3fc',
    statusColor: '#455367',
    enabled: true,
    conditions: [
      { label: 'Experience', value: '< 1 month', color: '#2d6197' },
      { label: 'Account Status', value: '= Verified', color: '#2d6197' },
    ],
    action: {
      word: 'Vocabulary Labeling',
      limit: '1 task',
    },
  },
  {
    id: 3,
    name: 'Weekend Bonus Overflow',
    status: 'Inactive',
    statusBg: '#e8eff3',
    statusColor: '#566166',
    enabled: false,
    conditions: [
      { label: 'Day', value: '= Saturday, Sunday', color: '#566166' },
    ],
    action: {
      word: 'Entity Recognition',
      limit: '10 tasks',
    },
  },
];

export default function AutoAssignmentRules() {
  const router = useRouter();
  const [rules, setRules] = useState(rulesData);
  const [search, setSearch] = useState('');

  const toggleRule = (id) => {
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* TopAppBar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Auto-Assignment Rules</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: 10, fontWeight: 500, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Assignments</span>
            <span style={{ ...ms, fontSize: 12, color: '#a9b4b9' }}>chevron_right</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#2d6197', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rules Engine</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', ...ms, fontSize: 18, color: '#a9b4b9' }}>search</span>
            <input
              type="text"
              placeholder="Search rules..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '10px 12px 10px 40px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13, width: 256 }}
            />
          </div>
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px',
              background: '#2d6197',
              color: '#f5f7ff',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <span style={{ ...ms, fontSize: 18 }}>add</span>
            Add Rule
          </button>
          <div style={{ width: 1, height: 24, background: '#d9e4ea', margin: '0 4px' }} />
          <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}>
            <span style={{ ...ms, fontSize: 22 }}>notifications</span>
          </button>
          <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}>
            <span style={{ ...ms, fontSize: 22 }}>settings</span>
          </button>
          <img
            src="https://ui-avatars.com/api/?name=Admin+User&background=2d6197&color=fff&size=64"
            alt=""
            style={{ width: 32, height: 32, borderRadius: '50%' }}
          />
        </div>
      </header>

      {/* Info Banner */}
      <section style={{ position: 'relative', overflow: 'hidden', borderRadius: 12, background: 'rgba(210,228,255,0.3)', padding: 24, display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 32 }}>
        <div style={{ flexShrink: 0, width: 48, height: 48, background: '#2d6197', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ ...ms, fontSize: 24, color: '#f5f7ff' }}>info</span>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1c5489', margin: 0, fontFamily: 'Manrope, sans-serif' }}>How Auto-Assignment Works</h3>
          <p style={{ fontSize: 13, color: 'rgba(28,84,137,0.8)', margin: '8px 0 0 0', lineHeight: 1.6, maxWidth: 700 }}>
            The Rules Engine automatically distributes incoming linguistic tasks to contributors based on pre-defined logic. When a new task enters the system, it traverses this list from top to bottom. The first rule that matches all conditions will trigger the assignment and set the task limits.
          </p>
        </div>
        <div style={{ position: 'absolute', right: -40, top: -40, opacity: 0.1 }}>
          <span style={{ ...ms, fontSize: 180, color: '#2d6197' }}>auto_awesome</span>
        </div>
      </section>

      {/* Rules Card List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
        {rules.map((rule) => (
          <div
            key={rule.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              padding: 24,
              background: rule.enabled ? '#ffffff' : 'rgba(247,249,251,0.5)',
              borderRadius: 12,
              opacity: rule.enabled ? 1 : 0.75,
              transition: 'all 0.3s',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: rule.enabled ? '#2a3439' : '#a9b4b9', margin: 0, fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', gap: 12 }}>
                  {rule.name}
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: 9999,
                    background: rule.statusBg,
                    color: rule.statusColor,
                    fontSize: 9,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>{rule.status}</span>
                </h4>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32 }}>
                {/* Conditions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ ...ms, fontSize: 14 }}>filter_alt</span> Conditions
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {rule.conditions.map((cond, i) => (
                      <span key={i} style={{
                        padding: '6px 12px',
                        background: '#f0f4f7',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 500,
                        color: rule.enabled ? '#566166' : '#a9b4b9',
                        border: '1px solid rgba(169,180,185,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}>
                        {cond.label} <span style={{ color: cond.color, fontWeight: 700 }}>{cond.value}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ width: 1, height: 40, background: '#e8eff3' }} />

                {/* Action */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ ...ms, fontSize: 14 }}>bolt</span> Action
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: rule.enabled ? '#566166' : '#a9b4b9' }}>Assign word:</span>
                      <span style={{
                        padding: '4px 10px',
                        background: rule.enabled ? 'rgba(45,97,151,0.08)' : '#f0f4f7',
                        color: rule.enabled ? '#2d6197' : '#a9b4b9',
                        borderRadius: 6,
                        fontWeight: 700,
                        fontSize: 11,
                      }}>{rule.action.word}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderLeft: '1px solid #e8eff3', paddingLeft: 16 }}>
                      <span style={{ color: rule.enabled ? '#566166' : '#a9b4b9' }}>Limit:</span>
                      <span style={{ fontWeight: 700, color: rule.enabled ? '#2a3439' : '#a9b4b9' }}>{rule.action.limit}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingTop: 16, borderTop: '1px solid #f0f4f7' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <button
                  onClick={() => toggleRule(rule.id)}
                  style={{
                    position: 'relative',
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    background: rule.enabled ? '#2d6197' : '#d9e4ea',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    top: 2,
                    left: rule.enabled ? 22 : 2,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: '#ffffff',
                    transition: 'left 0.2s',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                  }} />
                </button>
                <span style={{ fontSize: 9, fontWeight: 700, color: rule.enabled ? '#2d6197' : '#a9b4b9', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {rule.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }}>
                  <span style={{ ...ms, fontSize: 20 }}>edit</span>
                </button>
                <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#9f403d', borderRadius: 6 }}>
                  <span style={{ ...ms, fontSize: 20 }}>delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Footer (Bento Style) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 40 }}>
        {/* System Throughput */}
        <div style={{
          padding: 32,
          background: 'linear-gradient(135deg, #2a3439 0%, #465468 100%)',
          borderRadius: 16,
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 200,
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.6 }}>System Throughput</span>
            <h4 style={{ fontSize: 32, fontWeight: 800, margin: '8px 0 0 0', fontFamily: 'Manrope, sans-serif' }}>
              14,209 <span style={{ fontSize: 16, fontWeight: 500, opacity: 0.5 }}>tasks assigned</span>
            </h4>
            <p style={{ fontSize: 13, opacity: 0.7, margin: '16px 0 0 0', maxWidth: 400, lineHeight: 1.6 }}>
              Auto-assignment rules have handled 94% of all tasks in the last 7 days, reducing manual overhead by 82 hours.
            </p>
          </div>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 16, marginTop: 24 }}>
            <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: 8, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 9, opacity: 0.6 }}>Success Rate</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>99.8%</span>
            </div>
            <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: 8, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 9, opacity: 0.6 }}>Avg. Time to Assign</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>1.2s</span>
            </div>
          </div>
          <div style={{ position: 'absolute', right: -60, bottom: -60, opacity: 0.15 }}>
            <span style={{ ...ms, fontSize: 240, color: '#ffffff' }}>query_stats</span>
          </div>
        </div>

        {/* Contributor Capacity */}
        <div style={{ padding: 32, background: '#ffffff', borderRadius: 16, border: '1px solid #e8eff3', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#a9b4b9' }}>Contributor Capacity</span>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: '#566166' }}>Active Contributors</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#2d6197' }}>124</span>
            </div>
            <div style={{ width: '100%', height: 6, background: '#f0f4f7', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: '65%', height: '100%', background: '#2d6197', borderRadius: 999 }} />
            </div>
            <p style={{ fontSize: 11, color: '#566166', lineHeight: 1.5 }}>Current assignment load is at 65% capacity. You have room for ~400 more tasks this period.</p>
          </div>
          <button style={{ marginTop: 'auto', fontSize: 11, fontWeight: 700, color: '#2d6197', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
            View Detailed Metrics <span style={{ ...ms, fontSize: 12 }}>arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '24px 0', borderTop: '1px solid #e8eff3', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, fontWeight: 500, color: '#a9b4b9', letterSpacing: '0.05em' }}>
        <div>© 2024 Sentimental Grid. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="#" style={{ color: '#a9b4b9', textDecoration: 'none', transition: 'color 0.15s' }}>System Status</a>
          <a href="#" style={{ color: '#a9b4b9', textDecoration: 'none', transition: 'color 0.15s' }}>Documentation</a>
          <a href="#" style={{ color: '#a9b4b9', textDecoration: 'none', transition: 'color 0.15s' }}>Support</a>
        </div>
      </footer>
    </div>
  );
}
