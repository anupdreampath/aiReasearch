'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

export default function CreateAssignment() {
  const router = useRouter();
  const [word, setWord] = useState({
    term: 'Ephemeral',
    definition: '"Lasting for a very short time. Typical of the shifting nature of sentimental data sets."',
    tier: 'Academic Tier',
    initials: 'EP'
  });
  const [contributors, setContributors] = useState([
    { id: 1, name: 'Dr. Aris Thorne', score: '9.8', scoreBg: '#91feef', scoreColor: '#006259', role: 'Master Linguist', avatar: 'https://ui-avatars.com/api/?name=Aris+Thorne&background=006b62&color=fff&size=64', reliability: 'Tier 1 Reliability', warning: null },
    { id: 2, name: 'Elena Vance', score: '8.4', scoreBg: '#d2e4ff', scoreColor: '#1c5489', role: 'Late Submission Risk', avatar: 'https://ui-avatars.com/api/?name=Elena+Vance&background=9f403d&color=fff&size=64', reliability: 'Warning: Flagged', warning: 'Late Submission Risk' },
  ]);
  const [platform, setPlatform] = useState('Sentimental Grid Core');
  const [notify, setNotify] = useState(true);
  const [instructions, setInstructions] = useState('');

  const removeContributor = (id) => {
    setContributors(contributors.filter(c => c.id !== id));
  };

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* TopAppBar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button
            onClick={() => router.push('/admin/assignments')}
            style={{ fontSize: 14, fontWeight: 500, color: '#566166', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            Cancel
          </button>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Create Assignment</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#a9b4b9' }}>
            <span style={{ ...ms, fontSize: 22 }}>notifications</span>
          </button>
          <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#a9b4b9' }}>
            <span style={{ ...ms, fontSize: 22 }}>settings</span>
          </button>
          <button
            style={{
              padding: '10px 24px',
              background: '#2d6197',
              color: '#ffffff',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Assign
          </button>
        </div>
      </header>

      {/* Content Area - Two Columns */}
      <div style={{ display: 'flex', gap: 32 }}>
        {/* Left Column (55%) */}
        <section style={{ width: '55%', display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* Word Selector */}
          <div>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#566166', marginBottom: 12, fontFamily: 'Inter, sans-serif' }}>
              Select Target Word
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#f0f4f7', borderRadius: 8 }}>
                <span style={{ ...ms, fontSize: 20, color: '#717c82' }}>search</span>
                <input
                  type="text"
                  placeholder="Search dictionary..."
                  style={{ flex: 1, background: 'transparent', border: 'none', fontSize: 14, color: '#2a3439', outline: 'none' }}
                />
              </div>
              {/* Word Preview Card */}
              <div style={{ marginTop: 12, padding: 16, background: '#ffffff', borderRadius: 8, border: '1px solid rgba(169,180,185,0.15)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2d6197', margin: '0 0 8px 0', fontFamily: 'Manrope, sans-serif' }}>{word.term}</h3>
                    <p style={{ fontSize: 13, color: '#566166', fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>{word.definition}</p>
                  </div>
                  <span style={{ padding: '4px 10px', background: '#d5e3fc', color: '#455367', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderRadius: 9999 }}>
                    {word.tier}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contributors Selection */}
          <div>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#566166', marginBottom: 12, fontFamily: 'Inter, sans-serif' }}>
              Contributors
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 16, background: '#f0f4f7', borderRadius: 8, minHeight: 60 }}>
              {contributors.map(c => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: '#ffffff', borderRadius: 9999, border: '1px solid rgba(169,180,185,0.2)', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#2a3439' }}>{c.name}</span>
                  <span style={{ padding: '2px 6px', background: c.scoreBg, color: c.scoreColor, fontSize: 10, fontWeight: 700, borderRadius: 9999 }}>{c.score}</span>
                  <button
                    onClick={() => removeContributor(c.id)}
                    style={{ padding: 0, background: 'transparent', border: 'none', cursor: 'pointer', color: '#a9b4b9', display: 'flex', alignItems: 'center' }}
                  >
                    <span style={{ ...ms, fontSize: 16 }}>close</span>
                  </button>
                </div>
              ))}
              <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#2d6197' }}>
                <span style={{ ...ms, fontSize: 20 }}>add_circle</span>
                <span style={{ fontSize: 12, fontWeight: 700 }}>Add Contributor</span>
              </button>
            </div>
          </div>

          {/* Assignment Parameters Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#566166', marginBottom: 12, fontFamily: 'Inter, sans-serif' }}>
                Due Date
              </label>
              <input
                type="date"
                style={{ width: '100%', padding: '12px 16px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 14, color: '#2a3439' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#566166', marginBottom: 12, fontFamily: 'Inter, sans-serif' }}>
                Target Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 14, color: '#2a3439', cursor: 'pointer' }}
              >
                <option>Sentimental Grid Core</option>
                <option>Mobile Annotation Node</option>
                <option>External API Cluster</option>
              </select>
            </div>
          </div>

          {/* Editorial Instructions */}
          <div>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#566166', marginBottom: 12, fontFamily: 'Inter, sans-serif' }}>
              Editorial Instructions
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Specify context, nuances, and required references..."
              rows={4}
              style={{ width: '100%', padding: '12px 16px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 14, color: '#2a3439', resize: 'vertical', fontFamily: 'Inter, sans-serif' }}
            />
          </div>

          {/* Notify Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, background: '#f0f4f7', borderRadius: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ ...ms, fontSize: 20, color: '#2d6197' }}>notifications_active</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#2a3439', margin: 0 }}>Notify contributors immediately</p>
                <p style={{ fontSize: 11, color: '#566166', margin: 0 }}>Send automated dashboard and email alerts upon assignment creation.</p>
              </div>
            </div>
            <button
              onClick={() => setNotify(!notify)}
              style={{
                position: 'relative',
                width: 44,
                height: 24,
                borderRadius: 12,
                background: notify ? '#2d6197' : '#d9e4ea',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              <span style={{
                position: 'absolute',
                top: 2,
                left: notify ? 22 : 2,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: '#ffffff',
                transition: 'left 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
              }} />
            </button>
          </div>
        </section>

        {/* Right Column (45%) - Preview Card */}
        <section style={{ width: '45%', position: 'sticky', top: 24, height: 'fit-content' }}>
          <div style={{ background: '#ffffff', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(169,180,185,0.1)', boxShadow: '0 4px 12px rgba(42,52,57,0.04)' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: 'rgba(45,97,151,0.05)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Assignment Preview</h3>
              <span style={{ padding: '4px 8px', background: '#2d6197', color: '#ffffff', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', borderRadius: 4 }}>LIVE</span>
            </div>

            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
              {/* Word Summary */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{ width: 80, height: 80, background: 'rgba(45,97,151,0.1)', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#2d6197' }}>
                  <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Word</span>
                  <span style={{ fontSize: 28, fontWeight: 800 }}>{word.initials}</span>
                </div>
                <div>
                  <h4 style={{ fontSize: 24, fontWeight: 800, color: '#2a3439', margin: '0 0 4px 0', fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}>{word.term}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ ...ms, fontSize: 14, color: '#a9b4b9' }}>schedule</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#566166' }}>Due Oct 14, 2023</span>
                  </div>
                </div>
              </div>

              {/* Selected Resources */}
              <div>
                <h5 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#717c82', margin: '0 0 16px 0' }}>Selected Resources</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {contributors.map(c => (
                    <div
                      key={c.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 12,
                        background: c.warning ? 'rgba(254,137,131,0.08)' : '#f7f9fb',
                        borderRadius: 8,
                        borderLeft: c.warning ? '4px solid rgba(159,64,61,0.4)' : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img src={c.avatar} alt="" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                        <div>
                          <p style={{ fontSize: 14, fontWeight: 700, color: '#2a3439', margin: 0 }}>{c.name}</p>
                          <p style={{ fontSize: 10, fontWeight: 700, color: c.warning ? '#9f403d' : '#006b62', margin: 0 }}>{c.role}</p>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 12, fontWeight: 800, color: '#2a3439' }}>{c.score} Q-Score</div>
                        <div style={{ fontSize: 9, color: c.warning ? '#9f403d' : '#566166' }}>{c.reliability}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statistics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ padding: 16, background: '#e8eff3', borderRadius: 8 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#566166', margin: '0 0 4px 0' }}>Estimated Completion</p>
                  <p style={{ fontSize: 20, fontWeight: 800, color: '#2d6197', margin: 0, fontFamily: 'Manrope, sans-serif' }}>3.2 Days</p>
                  <p style={{ fontSize: 9, fontWeight: 700, color: '#006b62', margin: '4px 0 0 0' }}>+0.4 Faster than avg</p>
                </div>
                <div style={{ padding: 16, background: '#e8eff3', borderRadius: 8 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#566166', margin: '0 0 4px 0' }}>Expected Quality</p>
                  <p style={{ fontSize: 20, fontWeight: 800, color: '#2d6197', margin: 0, fontFamily: 'Manrope, sans-serif' }}>High</p>
                  <p style={{ fontSize: 9, fontWeight: 700, color: '#566166', margin: '4px 0 0 0' }}>Based on 14 assignments</p>
                </div>
              </div>

              {/* Risk Warning */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 16, background: 'rgba(254,137,131,0.15)', border: '1px solid rgba(159,64,61,0.15)', borderRadius: 8 }}>
                <span style={{ ...ms, fontSize: 20, color: '#9f403d' }}>report_problem</span>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#752121', margin: 0 }}>Critical Capacity Warning</p>
                  <p style={{ fontSize: 11, color: '#752121', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                    Elena Vance currently has 4 pending assignments. Selecting her may delay the delivery of 'Ephemeral' by 48+ hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Texture Gradient */}
            <div style={{ height: 4, background: 'linear-gradient(to right, #2d6197, #006b62, #526074)' }} />
          </div>
        </section>
      </div>
    </div>
  );
}
