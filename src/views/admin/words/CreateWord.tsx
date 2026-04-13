'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const subreddits = [
  { id: 1, name: 'r/linguistics' },
  { id: 2, name: 'r/etymology' },
  { id: 3, name: 'r/neologisms' },
];

const platforms = [
  { id: 'reddit', name: 'Reddit', checked: true },
  { id: 'twitter', name: 'Twitter / X', checked: false },
  { id: 'bluesky', name: 'Bluesky', checked: false },
];

export default function CreateWord() {
  const router = useRouter();
  const [rootLexeme, setRootLexeme] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('Noun');
  const [targetCount, setTargetCount] = useState(100);
  const [looseDefinition, setLooseDefinition] = useState('');
  const [exampleUsage, setExampleUsage] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [selectedPlatforms, setSelectedPlatforms] = useState(platforms.map(p => p.id));
  const [suggestedSubreddits, setSuggestedSubreddits] = useState(subreddits);
  const [newSubreddit, setNewSubreddit] = useState('');

  const handlePlatformToggle = (platformId) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleAddSubreddit = () => {
    if (newSubreddit.trim()) {
      setSuggestedSubreddits(prev => [...prev, { id: Date.now(), name: newSubreddit.trim() }]);
      setNewSubreddit('');
    }
  };

  const handleRemoveSubreddit = (id) => {
    setSuggestedSubreddits(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto' }}>
      {/* Top Action Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>Create Word</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <button style={{ padding: '8px 16px', fontSize: 13, fontWeight: 600, color: '#526074', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            Save Draft
          </button>
          <button style={{
            padding: '8px 20px',
            background: 'linear-gradient(90deg, #2d6197, #1d548a)',
            color: '#f5f7ff',
            border: 'none',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(45,97,151,0.2)',
          }}>
            Publish
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {/* Left Column */}
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Word Input Section */}
            <div style={{ padding: 20, background: '#ffffff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Root Lexeme</label>
                  <input
                    type="text"
                    value={rootLexeme}
                    onChange={(e) => setRootLexeme(e.target.value)}
                    placeholder="Enter term..."
                    style={{
                      width: '100%',
                      fontSize: 28,
                      fontWeight: 800,
                      color: '#2a3439',
                      background: '#f0f4f7',
                      border: 'none',
                      borderRadius: 8,
                      padding: '16px 20px',
                      fontFamily: 'Manrope, sans-serif',
                    }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Part of Speech</label>
                    <select
                      value={partOfSpeech}
                      onChange={(e) => setPartOfSpeech(e.target.value)}
                      style={{ width: '100%', padding: '12px 16px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500 }}
                    >
                      <option>Noun</option>
                      <option>Verb</option>
                      <option>Adjective</option>
                      <option>Adverb</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Target Post Count</label>
                    <input
                      type="number"
                      value={targetCount}
                      onChange={(e) => setTargetCount(parseInt(e.target.value))}
                      style={{ width: '100%', padding: '12px 16px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Definitions Section */}
            <div style={{ padding: 20, background: '#ffffff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Loose Definition</label>
                <textarea
                  value={looseDefinition}
                  onChange={(e) => setLooseDefinition(e.target.value)}
                  placeholder="Describe the semantic range..."
                  rows={3}
                  style={{ width: '100%', padding: '16px 20px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 14, resize: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Example Usage</label>
                <textarea
                  value={exampleUsage}
                  onChange={(e) => setExampleUsage(e.target.value)}
                  placeholder="Insert a contextual sentence..."
                  rows={3}
                  style={{ width: '100%', padding: '16px 20px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 14, resize: 'none', fontStyle: 'italic' }}
                />
              </div>
            </div>

            {/* Image Dropzone */}
            <div style={{ padding: 20, background: '#ffffff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Visual Asset (Optional)</label>
              <div style={{
                border: '2px dashed rgba(169,180,185,0.3)',
                borderRadius: 12,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(240,244,247,0.5)',
                cursor: 'pointer',
              }}>
                <span style={{ ...ms, fontSize: 40, color: '#a9b4b9', marginBottom: 12 }}>cloud_upload</span>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#2a3439', margin: 0 }}>Click to upload or drag and drop</p>
                <p style={{ fontSize: 12, color: '#566166', margin: '4px 0 0 0' }}>SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Subreddits & Platform */}
            <div style={{ padding: 20, background: '#ffffff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Suggested Subreddits */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Suggested Subreddits</label>
                  <button
                    onClick={handleAddSubreddit}
                    style={{ fontSize: 10, fontWeight: 700, color: '#2d6197', display: 'flex', alignItems: 'center', gap: 4, background: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    <span style={{ ...ms, fontSize: 12 }}>add</span>
                    ADD NEW
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {suggestedSubreddits.map((sub) => (
                    <span key={sub.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 12px',
                      background: 'rgba(213,227,252,0.5)',
                      color: '#455367',
                      borderRadius: 9999,
                      fontSize: 12,
                      fontWeight: 700,
                    }}>
                      {sub.name}
                      <button
                        onClick={() => handleRemoveSubreddit(sub.id)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                      >
                        <span style={{ ...ms, fontSize: 14, color: '#9f403d' }}>close</span>
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={newSubreddit}
                  onChange={(e) => setNewSubreddit(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSubreddit()}
                  placeholder="Add subreddit..."
                  style={{ width: '100%', padding: '8px 12px', marginTop: 12, background: '#f0f4f7', border: 'none', borderRadius: 6, fontSize: 12 }}
                />
              </div>

              {/* Distribution Platforms */}
              <div>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Distribution Platforms</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {platforms.map((platform) => (
                    <label key={platform.id} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                      <div
                        onClick={() => handlePlatformToggle(platform.id)}
                        style={{
                          width: 20,
                          height: 20,
                          border: selectedPlatforms.includes(platform.id) ? '2px solid #2d6197' : '2px solid rgba(169,180,185,0.3)',
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: selectedPlatforms.includes(platform.id) ? '#2d6197' : 'transparent',
                        }}
                      >
                        {selectedPlatforms.includes(platform.id) && (
                          <span style={{ ...ms, fontSize: 14, color: '#f5f7ff', fontWeight: 700 }}>check</span>
                        )}
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 500, color: '#2a3439' }}>{platform.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Status and Notes */}
            <div style={{ padding: 20, background: '#ffffff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Entity Status */}
              <div>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Entity Status</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      style={{ display: 'none' }}
                    />
                    <div style={{
                      width: 48,
                      height: 24,
                      background: isActive ? '#2d6197' : '#e1e9ee',
                      borderRadius: 9999,
                      position: 'relative',
                      transition: 'background 0.2s',
                    }}>
                      <div style={{
                        width: 16,
                        height: 16,
                        background: '#ffffff',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: 4,
                        left: isActive ? 28 : 4,
                        transition: 'left 0.2s',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      }} />
                    </div>
                  </label>
                  <span style={{ fontSize: 14, fontWeight: 700, color: isActive ? '#2d6197' : '#566166' }}>{isActive ? 'Active' : 'Draft'}</span>
                </div>
              </div>

              {/* Internal Admin Notes */}
              <div>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Internal Admin Notes</label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Confidential documentation regarding sentiment mapping and grid positioning..."
                  rows={6}
                  style={{ width: '100%', padding: '16px 20px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 14, resize: 'none' }}
                />
              </div>
            </div>

            {/* Analytical Insights Card */}
            <div style={{
              padding: 24,
              background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
              borderRadius: 12,
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              color: '#ffffff',
            }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 16px 0', fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ ...ms, fontSize: 18, color: '#92c1fe' }}>analytics</span>
                Analytical Insights
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#a9b4b9', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Complexity Score</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#92c1fe' }}>High (84)</span>
                </div>
                <div style={{ height: 6, background: '#2a3439', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '84%', background: '#92c1fe', borderRadius: 3 }} />
                </div>
                <p style={{ fontSize: 12, color: '#a9b4b9', margin: 0, lineHeight: 1.6 }}>
                  Current lexical density suggests high engagement potential within r/linguistics. Recommended verification threshold: Tier 2.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
