'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

export default function BroadcastMessage() {
  const router = useRouter();
  const [recipientMode, setRecipientMode] = useState('all');
  const [channel, setChannel] = useState('email');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [previewMode, setPreviewMode] = useState('desktop');

  const audienceCount = 247;
  const query = 'segment="active_last_30d" AND role="linguist"';

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* TopAppBar */}
      <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, gap: 12 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Broadcast Message</h1>
          <span style={{ padding: '4px 12px', background: 'rgba(45,97,151,0.1)', color: '#2d6197', fontSize: 11, fontWeight: 700, borderRadius: 9999, textTransform: 'uppercase' }}>DRAFT</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
          <button style={{ padding: '10px 20px', border: '1px solid #a9b4b9', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#2a3439', background: 'transparent', cursor: 'pointer' }}>
            Schedule
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 24px',
            background: '#2d6197',
            color: '#f5f7ff',
            border: 'none',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
          }}>
            Send Now
            <span style={{ ...ms, fontSize: 18 }}>send</span>
          </button>
        </div>
      </header>

      {/* Recipient Banner */}
      <div style={{
        marginBottom: 32,
        padding: 16,
        background: 'rgba(210,228,255,0.3)',
        borderRadius: 12,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#d2e4ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#2d6197',
          }}>
            <span style={{ ...ms, fontSize: 20 }}>hub</span>
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 500, color: '#1c5489', margin: 0 }}>Live Audience Calculation</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: '#2d6197', margin: '4px 0 0 0' }}>Sending to {audienceCount.toLocaleString()} contributors.</p>
          </div>
        </div>
        <div style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.5)', borderRadius: 6, fontSize: 11, fontFamily: 'monospace', color: '#566166' }}>
          Query: {query}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
        {/* Left Column: Form */}
        <div style={{ flex: '1 1 400px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Recipient Selector */}
          <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, border: '1px solid rgba(169,180,185,0.1)' }}>
            <h3 style={{ fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 20px 0' }}>1. Target Audience</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 16 }}>
              {[
                { id: 'all', icon: 'public', label: 'All' },
                { id: 'segment', icon: 'filter_alt', label: 'Segment' },
                { id: 'manual', icon: 'edit_note', label: 'Manual' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setRecipientMode(opt.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    padding: 16,
                    borderRadius: 8,
                    border: recipientMode === opt.id ? '2px solid #2d6197' : '1px solid #a9b4b9',
                    background: recipientMode === opt.id ? 'rgba(210,228,255,0.3)' : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ ...ms, fontSize: 24, color: recipientMode === opt.id ? '#2d6197' : '#566166' }}>{opt.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: recipientMode === opt.id ? 700 : 500, color: recipientMode === opt.id ? '#2d6197' : '#566166' }}>
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Distribution Channel */}
          <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, border: '1px solid rgba(169,180,185,0.1)' }}>
            <h3 style={{ fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 16px 0' }}>2. Distribution Channel</h3>
            <div style={{ display: 'flex', gap: 24 }}>
              {[
                { id: 'email', label: 'Email Notification' },
                { id: 'inapp', label: 'In-App Alert' },
              ].map((ch) => (
                <label key={ch.id} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="channel"
                    checked={channel === ch.id}
                    onChange={() => setChannel(ch.id)}
                    style={{ width: 20, height: 20 }}
                  />
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#2a3439' }}>{ch.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Message Composition */}
          <div style={{ padding: 32, background: '#ffffff', borderRadius: 12, border: '1px solid rgba(169,180,185,0.1)' }}>
            <h3 style={{ fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 24px 0' }}>3. Message Composition</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#566166' }}>Subject Line</label>
              <input
                type="text"
                placeholder="e.g. New Project Guidelines Available"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: '#f0f4f7',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 14,
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#566166' }}>Body Content</label>
              <div style={{ border: '1px solid rgba(169,180,185,0.2)', borderRadius: 8, overflow: 'hidden' }}>
                {/* Toolbar */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, padding: '8px 16px', background: '#f0f4f7', borderBottom: '1px solid rgba(169,180,185,0.1)' }}>
                  {['format_bold', 'format_italic', 'format_list_bulleted', 'link', 'image'].map((icon) => (
                    <button key={icon} style={{ padding: 4, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}>
                      <span style={{ ...ms, fontSize: 20 }}>{icon}</span>
                    </button>
                  ))}
                </div>
                <textarea
                  placeholder="Draft your message here..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={8}
                  style={{
                    width: '100%',
                    padding: 16,
                    background: '#f7f9fb',
                    border: 'none',
                    fontSize: 14,
                    lineHeight: 1.6,
                    resize: 'none',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Preview */}
        <div style={{ flex: '1 1 350px', minWidth: 0 }}>
          <div style={{ position: 'sticky', top: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Live Preview</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => setPreviewMode('desktop')}
                  style={{ padding: 4, background: 'transparent', border: 'none', cursor: 'pointer', color: previewMode === 'desktop' ? '#2d6197' : '#a9b4b9' }}
                >
                  <span style={{ ...ms, fontSize: 22 }}>desktop_windows</span>
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  style={{ padding: 4, background: 'transparent', border: 'none', cursor: 'pointer', color: previewMode === 'mobile' ? '#2d6197' : '#a9b4b9' }}
                >
                  <span style={{ ...ms, fontSize: 22 }}>smartphone</span>
                </button>
              </div>
            </div>

            {/* Preview Card */}
            <div style={{
              background: '#e8eff3',
              borderRadius: 16,
              padding: 24,
              border: '1px solid rgba(169,180,185,0.1)',
            }}>
              <div style={{
                background: '#ffffff',
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}>
                {/* Email Header */}
                <div style={{ padding: 24, background: '#2d6197', color: '#f5f7ff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: 6,
                      background: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <span style={{ ...ms, fontSize: 16 }}>auto_awesome</span>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7 }}>Sentimental Grid Official</span>
                  </div>
                  <h4 style={{ fontSize: 20, fontWeight: 700, margin: 0, fontFamily: 'Manrope, sans-serif', lineHeight: 1.3 }}>
                    {subject || 'Monthly Performance Review & New Assignments'}
                  </h4>
                </div>

                {/* Email Body */}
                <div style={{ padding: 32 }}>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: '#2a3439', margin: '0 0 16px 0' }}>
                    Hello [Contributor Name],
                  </p>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: '#2a3439', margin: '0 0 16px 0' }}>
                    We have updated the word bank for the upcoming regional cycle. Your contributions over the last quarter have been instrumental in reaching our serenity thresholds.
                  </p>
                  <div style={{
                    padding: 16,
                    background: '#f0f4f7',
                    borderLeft: '4px solid #2d6197',
                    borderRadius: 8,
                    margin: '16px 0',
                  }}>
                    <p style={{ fontSize: 12, fontStyle: 'italic', color: '#566166', margin: 0 }}>
                      "The clarity of your recent data submissions has set a new benchmark for the Verification team."
                    </p>
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: '#2a3439', margin: '0 0 24px 0' }}>
                    Please review the attached PDF for specific role updates and new assignment structures.
                  </p>
                  <div style={{ padding: '16px 0' }}>
                    <a href="#" style={{
                      display: 'inline-block',
                      padding: '12px 24px',
                      background: '#2d6197',
                      color: '#f5f7ff',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      textDecoration: 'none',
                    }}>
                      Access Dashboard
                    </a>
                  </div>
                  <div style={{ paddingTop: 24, borderTop: '1px solid #e8eff3' }}>
                    <p style={{ fontSize: 12, color: '#566166', margin: 0 }}>
                      Best regards,<br />
                      <strong>Sentimental Grid Operations</strong>
                    </p>
                  </div>
                </div>

                {/* Email Footer */}
                <div style={{ padding: 24, background: '#f7f9fb', textAlign: 'center' }}>
                  <p style={{ fontSize: 10, color: '#a9b4b9', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 16px 0' }}>
                    You are receiving this because you are an active Contributor.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 16, color: '#a9b4b9' }}>
                    <span style={{ ...ms, fontSize: 16 }}>public</span>
                    <span style={{ ...ms, fontSize: 16 }}>mail</span>
                    <span style={{ ...ms, fontSize: 16 }}>settings</span>
                  </div>
                </div>
              </div>

              {/* Campaign Visual */}
              <div style={{ marginTop: 24, borderRadius: 12, overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=150&fit=crop"
                  alt="Campaign"
                  style={{ width: '100%', height: 130, objectFit: 'cover' }}
                />
                <div style={{ padding: 12, background: '#d9e4ea', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase' }}>Current Campaign Visual</span>
                  <button style={{ fontSize: 10, fontWeight: 700, color: '#2d6197', background: 'transparent', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}>
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
