// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const faqs = [
  { q: 'Why was my submission rejected?', a: 'Most rejections happen when the word isn\'t found in the post text, the content is too short (<50 words), or the post was in an irrelevant subreddit. Check your notification for the specific reason.' },
  { q: 'Can I delete my post after submitting?', a: 'Please don\'t delete your post after submitting! We need it to remain live for verification. Deleted posts will result in automatic rejection.' },
  { q: 'How long does verification take?', a: 'Auto-check runs instantly. Manual review (if needed) takes up to 24 hours. You\'ll be notified once reviewed.' },
  { q: 'My post was approved but I haven\'t been paid', a: 'Payments trigger within 24h and take 1-3 business days to arrive. Check your PayPal/Stripe account. If nothing after 5 days, contact support.' },
  { q: 'Can I submit comments instead of posts?', a: 'Generally no — we prefer top-level posts. However, some assignments may specify comments. Check your task instructions.' },
  { q: 'What happens if my Reddit account gets banned?', a: 'Contact support immediately. We can adjust your account status and won\'t penalize you for platform bans that aren\'t your fault.' },
  { q: 'How much do I earn per task?', a: '$5 per approved post is the standard rate. Some tasks may offer higher rates based on difficulty or specific subreddit requirements.' },
  { q: 'When do payments process?', a: 'Payments are triggered within 24 hours of approval. Batch payouts run daily at 9AM UTC. Minimum payout is $1.' },
  { q: 'How do I improve my quality score?', a: 'Use words naturally in context, write longer posts (100+ words), post in relevant subreddits, and submit URLs promptly. Consistency matters more than volume.' },
];

const tickets = [
  { id: 'TK-1042', subject: 'Payment not received for task #38', status: 'open', date: '2026-04-10', lastReply: '2 hours ago' },
  { id: 'TK-1038', subject: 'Word not detected in my post', status: 'resolved', date: '2026-04-08', lastReply: '1 day ago' },
  { id: 'TK-1025', subject: 'Account verification issue', status: 'resolved', date: '2026-04-03', lastReply: '5 days ago' },
];

const forumTopics = [
  { title: 'Tips for getting 100% approval rate', author: 'Sarah C.', replies: 24, views: 1240, tag: 'Tips', hot: true },
  { title: 'Which subreddits give the best engagement?', author: 'Marcus J.', replies: 18, views: 890, tag: 'Strategy' },
  { title: 'How I earned $500 in my first month', author: 'Emily R.', replies: 31, views: 2100, tag: 'Success Story', hot: true },
  { title: 'Understanding the quality score system', author: 'Dev Team', replies: 12, views: 670, tag: 'Official' },
  { title: 'Best time to post on Reddit for upvotes', author: 'Alex K.', replies: 15, views: 780, tag: 'Strategy' },
  { title: 'New payment methods coming soon!', author: 'Dev Team', replies: 8, views: 450, tag: 'Official' },
];

export default function HelpCenterPage() {
  const router = useRouter();
  const [tab, setTab] = useState('faqs');
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(f => !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  const tabs = [
    { id: 'faqs', label: 'FAQs', icon: 'help_outline' },
    { id: 'tickets', label: 'My Tickets', icon: 'confirmation_number' },
    { id: 'forums', label: 'Community', icon: 'forum' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fb', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <style>{`
        .help-container { max-width: 960px; margin: 0 auto; padding: 0 24px; }
        .help-card { background: #fff; border: 1px solid #e1e9ee; border-radius: 14px; overflow: hidden; }
        .help-card-pad { padding: 20px 24px; }
        @media (max-width: 640px) {
          .help-hero h1 { font-size: 28px !important; }
          .help-hero p { font-size: 14px !important; }
          .help-grid-2 { grid-template-columns: 1fr !important; }
          .help-card-pad { padding: 16px; }
          .help-tabs { gap: 0 !important; }
          .help-tab { padding: 10px 12px !important; font-size: 12px !important; }
          .forum-meta { display: none !important; }
        }
      `}</style>

      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid #e1e9ee', padding: '14px 0' }}>
        <div className="help-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => router.push('/')}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: '#2d6197', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>L</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 16, color: '#2a3439' }}>LexiPost</span>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <button onClick={() => router.push('/login')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#566166', fontFamily: 'inherit' }}>Login</button>
            <button onClick={() => router.push('/login')} style={{ padding: '8px 18px', borderRadius: 8, background: '#2d6197', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit' }}>Get Started</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="help-hero" style={{ background: 'linear-gradient(135deg, #2d6197, #1a4670)', padding: '56px 24px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: 40, fontWeight: 800, margin: '0 0 10px', fontFamily: "'Manrope', sans-serif" }}>Help Center</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, margin: '0 0 28px' }}>Find answers, track your tickets, and join the community</p>
        <div style={{ maxWidth: 500, margin: '0 auto', position: 'relative' }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 20, fontFamily: 'Material Symbols Outlined', color: 'rgba(255,255,255,0.4)' }}>search</span>
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setTab('faqs'); }}
            placeholder="Search for help..."
            style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: 12, border: '2px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 15, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="help-container" style={{ marginTop: -20 }}>
        <div className="help-tabs" style={{ display: 'flex', gap: 6, background: '#fff', borderRadius: 12, padding: 6, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e1e9ee', marginBottom: 28 }}>
          {tabs.map(t => (
            <button key={t.id} className="help-tab" onClick={() => setTab(t.id)} style={{
              flex: 1, padding: '12px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: tab === t.id ? '#2d6197' : 'transparent',
              color: tab === t.id ? '#fff' : '#566166',
              fontWeight: 600, fontSize: 14, fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.15s',
            }}>
              <span style={{ fontSize: 18, fontFamily: 'Material Symbols Outlined' }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* ─── FAQs ─── */}
        {tab === 'faqs' && (
          <div>
            {filteredFaqs.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#717c82' }}>
                <span style={{ fontSize: 48, fontFamily: 'Material Symbols Outlined', display: 'block', marginBottom: 12, opacity: 0.3 }}>search_off</span>
                <p style={{ fontSize: 15, margin: 0 }}>No results for "{search}"</p>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {filteredFaqs.map((faq, i) => (
                <div key={i} className="help-card" style={{ cursor: 'pointer' }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="help-card-pad" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                      <span style={{ fontSize: 20, fontFamily: 'Material Symbols Outlined', color: '#2d6197', flexShrink: 0 }}>help</span>
                      <span style={{ fontWeight: 600, fontSize: 14, color: '#2a3439' }}>{faq.q}</span>
                    </div>
                    <span style={{ fontSize: 20, fontFamily: 'Material Symbols Outlined', color: '#a9b4b9', transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)' }}>expand_more</span>
                  </div>
                  {openFaq === i && (
                    <div style={{ padding: '0 24px 20px 56px', fontSize: 13, color: '#566166', lineHeight: 1.7 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Tickets ─── */}
        {tab === 'tickets' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: 0 }}>My Support Tickets</h3>
              <button style={{ padding: '8px 16px', borderRadius: 8, background: '#2d6197', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 16, fontFamily: 'Material Symbols Outlined' }}>add</span>
                New Ticket
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tickets.map(t => (
                <div key={t.id} className="help-card help-card-pad" style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: t.status === 'open' ? '#d2e4ff' : '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 20, fontFamily: 'Material Symbols Outlined', color: t.status === 'open' ? '#2d6197' : '#10B981' }}>
                      {t.status === 'open' ? 'pending' : 'check_circle'}
                    </span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 600, fontSize: 14, color: '#2a3439' }}>{t.subject}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#717c82', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <span>{t.id}</span>
                      <span>Opened {t.date}</span>
                      <span>Last reply: {t.lastReply}</span>
                    </div>
                  </div>
                  <span style={{ padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: t.status === 'open' ? '#d2e4ff' : '#ecfdf5', color: t.status === 'open' ? '#2d6197' : '#059669', textTransform: 'capitalize' }}>{t.status}</span>
                </div>
              ))}
            </div>
            {tickets.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#717c82' }}>
                <span style={{ fontSize: 48, fontFamily: 'Material Symbols Outlined', display: 'block', marginBottom: 12, opacity: 0.3 }}>inbox</span>
                <p>No tickets yet</p>
              </div>
            )}
          </div>
        )}

        {/* ─── Forums ─── */}
        {tab === 'forums' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: 0 }}>Community Forums</h3>
              <button style={{ padding: '8px 16px', borderRadius: 8, background: '#2d6197', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 16, fontFamily: 'Material Symbols Outlined' }}>edit</span>
                New Post
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {forumTopics.map((topic, i) => (
                <div key={i} className="help-card help-card-pad" style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: topic.tag === 'Official' ? '#d2e4ff' : topic.hot ? '#fef3c7' : '#f7f9fb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 20, fontFamily: 'Material Symbols Outlined', color: topic.tag === 'Official' ? '#2d6197' : topic.hot ? '#d97706' : '#717c82' }}>
                      {topic.tag === 'Official' ? 'verified' : topic.hot ? 'local_fire_department' : 'chat_bubble_outline'}
                    </span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 600, fontSize: 14, color: '#2a3439' }}>{topic.title}</span>
                      {topic.hot && <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: '#fef3c7', color: '#92400e' }}>HOT</span>}
                    </div>
                    <div style={{ fontSize: 12, color: '#717c82', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <span>by {topic.author}</span>
                      <span className="forum-meta">{topic.replies} replies</span>
                      <span className="forum-meta">{topic.views.toLocaleString()} views</span>
                    </div>
                  </div>
                  <span style={{ padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: topic.tag === 'Official' ? '#d2e4ff' : topic.tag === 'Tips' ? '#ecfdf5' : topic.tag === 'Success Story' ? '#fef3c7' : '#f7f9fb', color: topic.tag === 'Official' ? '#2d6197' : topic.tag === 'Tips' ? '#059669' : topic.tag === 'Success Story' ? '#92400e' : '#566166' }}>
                    {topic.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '48px 0 32px', color: '#a9b4b9', fontSize: 13 }}>
          <p>Can't find what you need? Log in and use the chat widget for instant support.</p>
          <p style={{ marginTop: 8 }}>&copy; 2024 LexiPost. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
