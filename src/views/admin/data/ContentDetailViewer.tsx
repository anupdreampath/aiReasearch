'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const mockPost = {
  id: '2k-81x00_A',
  subreddit: 'r/linguistics',
  author: 'u/analytical_engine',
  title: 'Analyzing the lexical shifts in sentimental discourse over the last decade',
  content: `It's fascinating to observe how certain emotive terms have undergone a complete semantic re-evaluation. Our recent scraping data suggests that words like sentimental are no longer viewed as purely nostalgic but are being weaponized in political rhetoric as a marker of perceived intellectual weakness.

We've tracked over 500,000 instances across Reddit and Twitter. The correlation between negative sentiment scores and the use of "affective adjectives" is reaching statistical significance. I've attached the raw JSON for anyone interested in the N-gram analysis.`,
  word: 'sentimental',
  upvotes: '12.4k',
  comments: 1204,
  status: 'Verified',
  createdAt: '2023-10-12 14:32:01',
  snapshotAt: '2023-10-14 09:15:00',
  platform: 'Reddit',
  postUrl: 'reddit.com/r/ling...',
};

const mockComments = [
  {
    id: 1,
    author: 'u/joshua_tree',
    points: '342',
    time: '2h ago',
    content: 'This methodology seems robust, but how are you accounting for sarcastic usage? In many subreddits, "sentimental" is used ironically to mock earnestness.',
    isOp: false,
    replies: [
      {
        id: 2,
        author: 'u/analytical_engine',
        points: '128',
        time: '1h ago',
        content: 'Excellent point. We\'re using a BERT-based transformer model specifically fine-tuned on the "r/sarcasm" dataset to detect linguistic inversions. It\'s not perfect, but it filters out about 85% of irony.',
        isOp: true,
      },
    ],
  },
  {
    id: 3,
    author: 'u/matrix_reloader',
    points: '89',
    time: '4h ago',
    content: 'Can you share the hyperparameters for the scraping script? I\'m trying to reproduce this for a similar study on "nostalgia".',
    isOp: false,
    replies: [],
  },
];

export default function ContentDetailViewer() {
  const router = useRouter();
  const { id } = useParams();
  const [showRawJson, setShowRawJson] = useState(true);

  const post = mockPost;

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
      {/* TopAppBar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, padding: '16px 0', marginBottom: 24, borderBottom: '1px solid #e8eff3' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 style={{ fontSize: 16, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Post ID: {post.id}</h1>
          <span style={{
            padding: '2px 8px',
            borderRadius: 9999,
            background: '#91feef',
            color: '#006259',
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>{post.status}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 16px',
            background: '#e8eff3',
            color: '#2a3439',
            border: 'none',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
          }}>
            <span style={{ ...ms, fontSize: 16 }}>refresh</span>
            Re-scrape
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 16px',
            background: '#2d6197',
            color: '#f5f7ff',
            border: 'none',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
          }}>
            <span style={{ ...ms, fontSize: 16 }}>ios_share</span>
            Export Thread
          </button>
          <div style={{ width: 1, height: 24, background: '#e8eff3' }} />
          <button
            onClick={() => router.push('/admin/scraped')}
            style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#9f403d', borderRadius: '50%' }}
          >
            <span style={{ ...ms, fontSize: 20 }}>close</span>
          </button>
        </div>
      </header>

      {/* Content Area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', margin: '0 -24px', padding: '0 24px', flexWrap: 'wrap' }}>
        {/* Left: Content & Comments (65%) */}
        <section style={{ flex: '1 1 400px', height: '100%', overflowY: 'auto', paddingRight: 40 }}>
          {/* Post Header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#566166', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <span>{post.subreddit}</span>
              <span>•</span>
              <span>Posted by {post.author}</span>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#2a3439', margin: '0 0 24px 0', fontFamily: 'Manrope, sans-serif', lineHeight: 1.3 }}>
              Analyzing the lexical shifts in <span style={{ background: '#d2e4ff', color: '#1c5489', padding: '0 6px', borderRadius: 4 }}>{post.word}</span> discourse over the last decade
            </h1>
            <div style={{ fontSize: 16, lineHeight: 1.7, color: '#2a3439' }}>
              <p style={{ marginBottom: 16 }}>
                It's fascinating to observe how certain emotive terms have undergone a complete semantic re-evaluation. Our recent scraping data suggests that words like <span style={{ background: '#d2e4ff', color: '#1c5489', padding: '0 4px', borderRadius: 4, fontWeight: 600 }}>{post.word}</span> are no longer viewed as purely nostalgic but are being weaponized in political rhetoric as a marker of perceived intellectual weakness.
              </p>
              <p>
                We've tracked over 500,000 instances across Reddit and Twitter. The correlation between negative sentiment scores and the use of "affective adjectives" is reaching statistical significance. I've attached the raw JSON for anyone interested in the N-gram analysis.
              </p>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e8eff3', margin: '40px 0' }} />

          {/* Comments Section */}
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: '0 0 32px 0', fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', gap: 8 }}>
              Comments <span style={{ fontSize: 13, color: '#566166', fontWeight: 400 }}>({post.comments.toLocaleString()})</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {mockComments.map((comment) => (
                <div key={comment.id}>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: comment.isOp ? '#d2e4ff' : '#e8eff3',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: comment.isOp ? '#2d6197' : '#566166',
                        fontSize: 12, fontWeight: 700,
                      }}>
                        {comment.isOp ? 'OP' : comment.author[2].toUpperCase()}
                      </div>
                      <div style={{ width: 2, flex: 1, background: '#f0f4f7', marginTop: 8 }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: comment.isOp ? '#2d6197' : '#2a3439' }}>{comment.author}</span>
                        <span style={{ fontSize: 12, color: '#566166' }}>{comment.points} pts • {comment.time}</span>
                      </div>
                      <p style={{ fontSize: 14, lineHeight: 1.6, color: '#2a3439', margin: 0 }}>{comment.content}</p>
                      <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                        <button style={{ fontSize: 12, fontWeight: 700, color: '#2d6197', background: 'transparent', border: 'none', cursor: 'pointer' }}>Reply</button>
                        <button style={{ fontSize: 12, fontWeight: 700, color: '#2d6197', background: 'transparent', border: 'none', cursor: 'pointer' }}>Report</button>
                      </div>
                    </div>
                  </div>
                  {/* Replies */}
                  {comment.replies.map((reply) => (
                    <div key={reply.id} style={{ display: 'flex', gap: 16, marginTop: 24, marginLeft: 48 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: '#d2e4ff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#2d6197',
                          fontSize: 12, fontWeight: 700,
                        }}>
                          OP
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#2d6197' }}>{reply.author}</span>
                          <span style={{ fontSize: 12, color: '#566166' }}>{reply.points} pts • {reply.time}</span>
                        </div>
                        <p style={{ fontSize: 14, lineHeight: 1.6, color: '#2a3439', margin: 0 }}>{reply.content}</p>
                        <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                          <button style={{ fontSize: 12, fontWeight: 700, color: '#2d6197', background: 'transparent', border: 'none', cursor: 'pointer' }}>Reply</button>
                          <button style={{ fontSize: 12, fontWeight: 700, color: '#2d6197', background: 'transparent', border: 'none', cursor: 'pointer' }}>Report</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <button style={{
              width: '100%',
              marginTop: 32,
              padding: '12px',
              background: '#ffffff',
              border: '1px solid #e8eff3',
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 600,
              color: '#566166',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}>
              <span style={{ ...ms, fontSize: 16 }}>expand_more</span>
              Load More Comments
            </button>
          </div>
        </section>

        {/* Right: Metadata (35%) */}
        <section style={{ flex: '1 1 280px', height: '100%', overflowY: 'auto', paddingLeft: 32, borderLeft: '1px solid #e8eff3' }}>
          {/* Metadata Card */}
          <div style={{ padding: 24, background: '#ffffff', borderRadius: 16, border: '1px solid #f0f4f7', marginBottom: 24 }}>
            <h4 style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.2em', margin: '0 0 24px 0' }}>Post Metadata</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { label: 'Author', value: post.author, color: '#2d6197' },
                { label: 'Subreddit', value: post.subreddit },
                { label: 'Platform', value: post.platform, icon: 'retweet', iconColor: '#ea580c' },
                { label: 'Post URL', value: post.postUrl, link: true },
                { label: 'Created At', value: post.createdAt },
                { label: 'Snapshot At', value: post.snapshotAt },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                  <span style={{ color: '#566166' }}>{item.label}</span>
                  <span style={{ fontWeight: 600, color: item.color || '#2a3439', display: 'flex', alignItems: 'center', gap: 4 }}>
                    {item.icon && <span style={{ ...ms, fontSize: 16, color: item.iconColor }}>{item.icon}</span>}
                    {item.link ? (
                      <a href="#" style={{ color: '#2d6197', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                        {item.value}
                        <span style={{ ...ms, fontSize: 14 }}>open_in_new</span>
                      </a>
                    ) : item.value}
                  </span>
                </div>
              ))}
              <hr style={{ border: 'none', borderTop: '1px solid #f0f4f7', margin: '4px 0' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 16 }}>
                <div style={{ padding: 16, background: '#f0f4f7', borderRadius: 12 }}>
                  <span style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', marginBottom: 4 }}>Upvotes</span>
                  <span style={{ fontSize: 24, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>{post.upvotes}</span>
                </div>
                <div style={{ padding: 16, background: '#f0f4f7', borderRadius: 12 }}>
                  <span style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', marginBottom: 4 }}>Comments</span>
                  <span style={{ fontSize: 24, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>{post.comments.toLocaleString()}</span>
                </div>
              </div>
              <div style={{ paddingTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase' }}>Post Status</span>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: 9999,
                    background: '#91feef',
                    color: '#006259',
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>Processed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Raw JSON Toggle */}
          <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #f0f4f7', marginBottom: 24, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 20, background: '#1e293b', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ ...ms, fontSize: 16, color: '#60a5fa' }}>code</span>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Raw Scraped Data</span>
              </div>
              <button
                onClick={() => setShowRawJson(!showRawJson)}
                style={{
                  width: 36, height: 20, borderRadius: 10,
                  background: showRawJson ? '#60a5fa' : '#475569',
                  border: 'none', cursor: 'pointer',
                  position: 'relative',
                }}
              >
                <span style={{
                  position: 'absolute',
                  top: 2, left: showRawJson ? 18 : 2,
                  width: 16, height: 16, borderRadius: '50%',
                  background: '#ffffff',
                  transition: 'left 0.2s',
                }} />
              </button>
            </div>
            {showRawJson && (
              <div style={{ padding: 20, fontFamily: 'monospace', fontSize: 11, color: '#94a3b8', background: '#1e293b', lineHeight: 1.6, maxHeight: 160, overflowY: 'auto' }}>
                <pre style={{ margin: 0 }}>{`{
  "id": "${post.id}",
  "author_id": "t2_analytical",
  "score": 12402,
  "sentiment": {
    "score": -0.82,
    "confidence": 0.94
  },
  "keywords": ["sentimental", "discourse", "linguistic"],
  "content_hash": "a82f...12c8",
  "scraped_engine": "v4.2-alpha"
}`}</pre>
              </div>
            )}
          </div>

          {/* Assignment Link */}
          <a href="#" style={{
            display: 'block',
            padding: 20,
            background: 'rgba(45,97,151,0.08)',
            border: '1px solid rgba(45,97,151,0.2)',
            borderRadius: 16,
            textDecoration: 'none',
            transition: 'background 0.15s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#2d6197', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Original Assignment</span>
              <span style={{ ...ms, fontSize: 16, color: '#2d6197' }}>arrow_forward</span>
            </div>
            <h5 style={{ fontSize: 14, fontWeight: 700, color: '#1c5489', margin: '0 0 4px 0' }}>Lexical Shifts Q4 Campaign</h5>
            <p style={{ fontSize: 12, color: '#566166', margin: 0 }}>Assigned to Data Validation Team B • Oct 2023</p>
          </a>
        </section>
      </div>
    </div>
  );
}
