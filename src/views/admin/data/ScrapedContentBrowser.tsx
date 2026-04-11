'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const mockPosts = [
  {
    id: 'ax429',
    word: 'Ambivalence',
    subreddit: 'r/philosophy',
    author: 'u/stark_logic',
    title: 'The duality of choice in modern existentialism...',
    upvotes: '1.2k',
    comments: '84',
    snapshot: '10/24 14:02',
    status: 'live',
  },
  {
    id: 'bz901',
    word: 'Euphoria',
    subreddit: 'r/music',
    author: 'u/sound_surfer',
    title: 'Unreleased tracks that give you instant...',
    upvotes: '4.5k',
    comments: '210',
    snapshot: '10/24 13:45',
    status: 'deleted',
  },
  {
    id: 'cq112',
    word: 'Melancholy',
    subreddit: 'r/photography',
    author: 'u/lens_crafter',
    title: 'Capturing the stillness of empty cities...',
    upvotes: '890',
    comments: '45',
    snapshot: '10/24 12:30',
    status: 'edited',
  },
  {
    id: 'dd774',
    word: 'Ambivalence',
    subreddit: 'r/askreddit',
    author: 'u/curious_mind',
    title: 'What\'s the most ambivalent feeling you\'ve ever...',
    upvotes: '12.1k',
    comments: '1.4k',
    snapshot: '10/24 11:15',
    status: 'live',
  },
];

const statusStyles = {
  live: { bg: '#91feef', color: '#006259' },
  deleted: { bg: '#fe8983', color: '#752121' },
  edited: { bg: '#d5e3fc', color: '#455367' },
  missing: { bg: '#e8eff3', color: '#566166' },
};

export default function ScrapedContentBrowser() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState(mockPosts[0]);
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* TopAppBar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Scraped Content</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', ...ms, fontSize: 18, color: '#a9b4b9' }}>search</span>
            <input
              type="text"
              placeholder="Search data points..."
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
            <span style={{ ...ms, fontSize: 18 }}>download</span>
            Export All
          </button>
          <div style={{ width: 1, height: 24, background: '#d9e4ea', margin: '0 4px' }} />
          <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}>
            <span style={{ ...ms, fontSize: 22 }}>notifications</span>
          </button>
          <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}>
            <span style={{ ...ms, fontSize: 22 }}>help_outline</span>
          </button>
          <img
            src="https://ui-avatars.com/api/?name=Admin+User&background=2d6197&color=fff&size=64"
            alt=""
            style={{ width: 32, height: 32, borderRadius: '50%' }}
          />
        </div>
      </header>

      {/* Summary Bento Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 32 }}>
        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Posts Scraped</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>1,284,902</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#006b62' }}>+12%</span>
          </div>
        </div>
        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live Posts</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>842,109</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: '#566166' }}>65.5% active</span>
          </div>
        </div>
        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Deleted Posts</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: '#9f403d', fontFamily: 'Manrope, sans-serif' }}>321,044</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#9f403d' }}>-3%</span>
          </div>
        </div>
        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Posts This Week</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>42,831</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#006b62' }}>New High</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ padding: 16, background: 'rgba(240,244,247,0.5)', borderRadius: 12, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 16, marginBottom: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 140 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: 4 }}>Keyword</label>
          <select style={{ padding: '10px 12px', background: '#ffffff', border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
            <option>All Words</option>
            <option>Ambivalence</option>
            <option>Euphoria</option>
            <option>Melancholy</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 140 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: 4 }}>Subreddit</label>
          <input type="text" placeholder="e.g. r/science" style={{ padding: '10px 12px', background: '#ffffff', border: 'none', borderRadius: 8, fontSize: 13 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 180 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: 4 }}>Date Range</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', ...ms, fontSize: 14, color: '#a9b4b9' }}>calendar_today</span>
            <input type="text" placeholder="Oct 01 - Oct 24, 2023" style={{ padding: '10px 12px 10px 36px', background: '#ffffff', border: 'none', borderRadius: 8, fontSize: 13, width: '100%' }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 140 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: 4 }}>Status</label>
          <select style={{ padding: '10px 12px', background: '#ffffff', border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
            <option>All Statuses</option>
            <option>Live</option>
            <option>Deleted</option>
            <option>Edited</option>
            <option>Missing</option>
          </select>
        </div>
        <button style={{ padding: '10px 24px', background: '#e8eff3', color: '#2a3439', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          Apply Filters
        </button>
      </div>

      {/* Content Table */}
      <div style={{ background: '#ffffff', borderRadius: 12, overflow: 'hidden', marginBottom: 32 }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(232,239,243,0.3)' }}>
                {['ID', 'Word', 'Subreddit', 'Author', 'Post Title', 'Metrics', 'Snapshot', 'Status', 'Actions'].map((h, i) => (
                  <th key={h} style={{ padding: '16px', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: i === 8 ? 'right' : 'left', borderBottom: '1px solid rgba(169,180,185,0.1)', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockPosts.map((post, index) => (
                <tr
                  key={post.id}
                  onClick={() => { setSelectedPost(post); setDrawerOpen(true); }}
                  style={{ cursor: 'pointer', transition: 'background 0.15s', background: index % 2 === 1 ? 'rgba(247,249,251,0.5)' : '#ffffff' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(232,239,243,0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 1 ? 'rgba(247,249,251,0.5)' : '#ffffff'}
                >
                  <td style={{ padding: '16px', fontFamily: 'monospace', fontSize: 12, color: '#566166' }}>#{post.id}</td>
                  <td style={{ padding: '16px', fontSize: 14, fontWeight: 600, color: '#2d6197' }}>{post.word}</td>
                  <td style={{ padding: '16px', fontSize: 13, color: '#2a3439' }}>{post.subreddit}</td>
                  <td style={{ padding: '16px', fontSize: 13, color: '#566166' }}>{post.author}</td>
                  <td style={{ padding: '16px', fontSize: 13, color: '#2a3439', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.title}</td>
                  <td style={{ padding: '16px', fontSize: 12, whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ ...ms, fontSize: 14 }}>thumb_up</span> {post.upvotes}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ ...ms, fontSize: 14 }}>comment</span> {post.comments}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontSize: 12, color: '#566166' }}>{post.snapshot}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: 9999,
                      background: statusStyles[post.status].bg,
                      color: statusStyles[post.status].color,
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}>
                      {post.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                      <button onClick={(e) => { e.stopPropagation(); setSelectedPost(post); setDrawerOpen(true); }} style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }}>
                        <span style={{ ...ms, fontSize: 20 }}>visibility</span>
                      </button>
                      <button onClick={(e) => e.stopPropagation()} style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }}>
                        <span style={{ ...ms, fontSize: 20 }}>refresh</span>
                      </button>
                      <button onClick={(e) => e.stopPropagation()} style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }}>
                        <span style={{ ...ms, fontSize: 20 }}>ios_share</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(169,180,185,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: '#566166' }}>Showing 1 to 10 of 1,284,902 results</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 8 }}>
              <span style={{ ...ms, fontSize: 18 }}>chevron_left</span>
            </button>
            <span style={{ padding: '6px 12px', background: '#d2e4ff', color: '#2d6197', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>1</span>
            <span style={{ padding: '6px 12px', color: '#566166', borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>2</span>
            <span style={{ padding: '6px 12px', color: '#566166', borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>3</span>
            <span style={{ fontSize: 12, color: '#566166' }}>...</span>
            <span style={{ padding: '6px 12px', color: '#566166', borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>128,491</span>
            <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 8 }}>
              <span style={{ ...ms, fontSize: 18 }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '24px 0', borderTop: '1px solid #e8eff3', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, fontWeight: 500, color: '#a9b4b9', letterSpacing: '0.05em' }}>
        <div>© 2024 Sentimental Grid. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="#" style={{ color: '#a9b4b9', textDecoration: 'none' }}>System Status</a>
          <a href="#" style={{ color: '#a9b4b9', textDecoration: 'none' }}>Documentation</a>
          <a href="#" style={{ color: '#a9b4b9', textDecoration: 'none' }}>Support</a>
        </div>
      </footer>

      {/* Content Detail Drawer */}
      {drawerOpen && selectedPost && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 480,
          height: '100vh',
          background: '#ffffff',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.1)',
          zIndex: 60,
          borderLeft: '1px solid #e8eff3',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ padding: 24, borderBottom: '1px solid #e8eff3', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Content Detail</h3>
            <button onClick={() => setDrawerOpen(false)} style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: '50%' }}>
              <span style={{ ...ms, fontSize: 20 }}>close</span>
            </button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: 9999,
                  background: statusStyles[selectedPost.status].bg,
                  color: statusStyles[selectedPost.status].color,
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}>
                  {selectedPost.status}
                </span>
                <span style={{ fontSize: 12, color: '#566166', fontFamily: 'monospace' }}>ID: {selectedPost.id}</span>
              </div>
              <h4 style={{ fontSize: 24, fontWeight: 800, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif', lineHeight: 1.3 }}>
                The duality of choice in modern existentialism and the resulting emotional ambivalence.
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: '#566166' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ ...ms, fontSize: 16 }}>account_circle</span> {selectedPost.author}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ ...ms, fontSize: 16 }}>forum</span> {selectedPost.subreddit}
                </span>
              </div>
            </div>

            <div style={{ padding: 24, background: '#f0f4f7', borderRadius: 12, border: '1px solid rgba(169,180,185,0.1)' }}>
              <h5 style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 12px 0' }}>Scraped Content Body</h5>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: '#2a3439', margin: 0 }}>
                "When we consider the weight of freedom, we often find ourselves stuck between two equally valid paths. This post explores how Kierkegaard's concept of 'dread' manifests as modern-day word-usage patterns in digital spaces..."
              </p>
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(169,180,185,0.2)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <span style={{ display: 'block', fontSize: 10, color: '#566166', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 4 }}>Word Target</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#2d6197' }}>{selectedPost.word}</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: 10, color: '#566166', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 4 }}>Language Score</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#2a3439' }}>0.842 (Complex)</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h5 style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Metadata History</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'Initial Scraping', value: '10/24 14:02:11' },
                  { label: 'Last Verified', value: '10/24 16:55:04' },
                  { label: 'Sentiment Vector', value: '[0.21, -0.45, 0.98]' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, background: '#ffffff', borderRadius: 8, border: '1px solid #f0f4f7', fontSize: 13 }}>
                    <span style={{ color: '#566166' }}>{item.label}</span>
                    <span style={{ fontWeight: 600, color: '#2a3439' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: 24, background: '#e8eff3', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ height: 128, background: 'linear-gradient(90deg, #2d6197 0%, #006b62 100%)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ ...ms, fontSize: 48, color: '#ffffff', opacity: 0.5 }}>monitoring</span>
              </div>
              <p style={{ fontSize: 12, color: '#566166', fontStyle: 'italic', margin: 0 }}>Emotional volatility spikes observed near the 4-hour mark of the thread's existence.</p>
            </div>
          </div>
          <div style={{ padding: 24, borderTop: '1px solid #e8eff3', background: '#ffffff', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, borderRadius: 8, border: '1px solid #a9b4b9', background: 'transparent', color: '#2a3439', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              <span style={{ ...ms, fontSize: 16 }}>refresh</span>
              Re-scrape Row
            </button>
            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, borderRadius: 8, border: 'none', background: '#2d6197', color: '#f5f7ff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              <span style={{ ...ms, fontSize: 16 }}>download</span>
              Export Metadata
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
