'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Icons
const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

const Check = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const Brain = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
    <path d="M6.003 5.125a3 3 0 0 0 .399 1.375" />
    <path d="m18.01 15.88-.586-.586a2 2 0 0 0-2.828 0" />
    <path d="m5.99 15.88.586-.586a2 2 0 0 1 2.828 0" />
  </svg>
);

const MessageCircle = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
);

const Zap = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const Target = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const Edit3 = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const Search = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const DollarSign = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const examples = [
  {
    keyword: 'borderline',
    post: 'Holy shit the gym is changing me',
    subreddit: 'r/Healthygamergg',
    why: 'Inspiring, high engagement post. The keyword was used seamlessly within the first 3 paragraphs.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
  },
  {
    keyword: 'Mango',
    post: 'Is there a dish or drink from your country which...',
    subreddit: 'r/AskTheWorld',
    why: 'Highly relevant post. Keyword included seamlessly and naturally in the conversation.',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=80',
  },
  {
    keyword: 'zombie apocalypse',
    post: 'Social media would actually be really helpful...',
    subreddit: 'r/Showerthoughts',
    why: 'Engaging content that fits the sub. Keyword used seamlessly within the first 3 paragraphs.',
    image: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=800&q=80',
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Content Creator",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    quote: "I've earned over $2,400 in my first month. The keywords are actually fun to work with, and seeing my posts go viral is addictive!",
  },
  {
    name: "Marcus Johnson",
    role: "Reddit Enthusiast",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    quote: "Finally a platform that pays me for what I already love doing. My highest post got 45k upvotes and I made $180 from it.",
  },
  {
    name: "Emily Rodriguez",
    role: "Student",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    quote: "LexiPost fits perfectly around my classes. I write posts between lectures and it covers my rent. Game changer!",
  },
];

export default function HomePage() {
  const router = useRouter();
  const [activeExample, setActiveExample] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(20px)',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40,
              height: 40,
              background: 'linear-gradient(135deg, #2d6197 0%, #006b62 100%)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>L</span>
            </div>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>LexiPost</span>
          </div>
          
          {/* Desktop Nav */}
          <div style={{ display: 'none', alignItems: 'center', gap: 32, '@media (min-width: 768px)': { display: 'flex' } } as any}>
            <a href="#about" style={{ fontSize: 14, color: '#566166', textDecoration: 'none', fontWeight: 500 }}>About</a>
            <a href="#how-it-works" style={{ fontSize: 14, color: '#566166', textDecoration: 'none', fontWeight: 500 }}>How It Works</a>
            <a href="#examples" style={{ fontSize: 14, color: '#566166', textDecoration: 'none', fontWeight: 500 }}>Examples</a>
            <a href="#testimonials" style={{ fontSize: 14, color: '#566166', textDecoration: 'none', fontWeight: 500 }}>Testimonials</a>
            <button
              onClick={() => router.push('/login')}
              style={{
                padding: '10px 24px',
                background: '#2d6197',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'flex', '@media (min-width: 768px)': { display: 'none' } } as any}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{ 
            padding: '16px 24px', 
            borderTop: '1px solid rgba(0,0,0,0.05)',
            '@media (min-width: 768px)': { display: 'none' }
          } as any}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <a href="#about" style={{ fontSize: 14, color: '#566166', textDecoration: 'none', fontWeight: 500 }}>About</a>
              <a href="#how-it-works" style={{ fontSize: 14, color: '#566166', textDecoration: 'none', fontWeight: 500 }}>How It Works</a>
              <a href="#examples" style={{ fontSize: 14, color: '#566166', textDecoration: 'none', fontWeight: 500 }}>Examples</a>
              <a href="#testimonials" style={{ fontSize: 14, color: '#566166', textDecoration: 'none', fontWeight: 500 }}>Testimonials</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Grid Background */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '140px 24px 80px',
        background: 'linear-gradient(to bottom, #f7f9fb 0%, #ffffff 50%, #e8e8e8 88%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.8,
          backgroundImage: 'linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)',
          backgroundSize: '6rem 5rem',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)',
        }} />

        {/* Radial Accent */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 'calc(100% - 150px)',
          height: 750,
          width: '140%',
          transform: 'translateX(-50%)',
          borderRadius: '100%',
          background: 'radial-gradient(closest-side, #fff 82%, #000000)',
        }} />

        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', position: 'relative', zIndex: 10, '@media (max-width: 1024px)': { gridTemplateColumns: '1fr', gap: 48 } } as any}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              background: 'rgba(45,97,151,0.1)',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 700,
              color: '#2d6197',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 24,
            }}>
              AI-Powered Content Platform
              <ArrowRight className="w-4 h-4" />
            </div>
            <h1 style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 800,
              color: '#2a3439',
              lineHeight: 1.1,
              margin: '0 0 24px 0',
              fontFamily: 'Manrope, sans-serif',
              letterSpacing: '-0.02em',
            }}>
              Get Paid to Create{' '}
              <span style={{ 
                background: 'linear-gradient(135deg, #2d6197 0%, #006b62 100%)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Viral Reddit Posts
              </span>
            </h1>
            <p style={{
              fontSize: 20,
              color: '#566166',
              lineHeight: 1.6,
              marginBottom: 40,
              maxWidth: 500,
            }}>
              Choose any subreddit, craft engaging posts with our curated keywords, 
              and earn money while helping train the next generation of AI language models.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button
                onClick={() => router.push('/login')}
                style={{
                  padding: '16px 32px',
                  background: '#2d6197',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(45,97,151,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                Start Creating Posts
                <ArrowRight />
              </button>
              <a
                href="#about"
                style={{
                  padding: '16px 32px',
                  background: 'transparent',
                  color: '#2d6197',
                  border: '2px solid #2d6197',
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Learn More
              </a>
            </div>
          </div>
          
          {/* Hero Card with Reddit Post Mockup */}
          <div style={{ position: 'relative' }}>
            <div style={{
              background: '#ffffff',
              borderRadius: 24,
              padding: 32,
              boxShadow: '0 25px 80px rgba(0,0,0,0.12)',
              border: '1px solid #e1e9ee',
              position: 'relative',
              zIndex: 10,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#9f403d' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#006b62' }} />
              </div>
              
              <div style={{
                background: '#f7f9fb',
                borderRadius: 16,
                padding: 24,
                marginBottom: 20,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #2d6197, #006b62)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 700,
                  }}>
                    U
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#2a3439' }}>r/Showerthoughts</span>
                  <span style={{ fontSize: 12, color: '#566166' }}>• 2h ago</span>
                </div>
                <p style={{ fontSize: 15, color: '#2a3439', lineHeight: 1.6, margin: 0 }}>
                  Social media would actually be really helpful during a{' '}
                  <span style={{ 
                    background: 'linear-gradient(135deg, rgba(0,107,98,0.2), rgba(0,107,98,0.1))', 
                    padding: '2px 8px', 
                    borderRadius: 6, 
                    color: '#006b62', 
                    fontWeight: 600,
                    border: '1px solid rgba(0,107,98,0.3)',
                  }}>
                    zombie apocalypse
                  </span>{' '}
                  because you'd be able to see which of your friends got turned.
                </p>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 20 }}>
                  <span style={{ fontSize: 13, color: '#566166', display: 'flex', alignItems: 'center', gap: 4 }}>
                    ▲ 12.4k upvotes
                  </span>
                  <span style={{ fontSize: 13, color: '#566166', display: 'flex', alignItems: 'center', gap: 4 }}>
                    💬 847 comments
                  </span>
                </div>
                <span style={{ 
                  fontSize: 14, 
                  color: '#006b62', 
                  fontWeight: 700,
                  background: 'rgba(0,107,98,0.1)',
                  padding: '6px 12px',
                  borderRadius: 20,
                }}>
                  +$25.00
                </span>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div style={{
              position: 'absolute',
              top: -20,
              right: -20,
              background: 'linear-gradient(135deg, #006b62, #2d6197)',
              color: '#fff',
              padding: '14px 24px',
              borderRadius: 16,
              fontSize: 14,
              fontWeight: 700,
              boxShadow: '0 8px 30px rgba(0,107,98,0.4)',
              zIndex: 20,
            }}>
              🔥 Viral Post!
            </div>
            
            {/* Secondary floating card */}
            <div style={{
              position: 'absolute',
              bottom: -30,
              left: -30,
              background: '#fff',
              padding: 20,
              borderRadius: 16,
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              border: '1px solid #e1e9ee',
              zIndex: 20,
              maxWidth: 200,
            }}>
              <div style={{ fontSize: 12, color: '#566166', marginBottom: 8 }}>Earnings this month</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#2d6197' }}>$2,847</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{
        padding: '40px 24px',
        background: '#fff',
        borderTop: '1px solid #e1e9ee',
        borderBottom: '1px solid #e1e9ee',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center', '@media (max-width: 768px)': { gridTemplateColumns: 'repeat(2, 1fr)' } } as any}>
          <div>
            <div style={{ fontSize: 40, fontWeight: 800, color: '#2d6197', fontFamily: 'Manrope, sans-serif' }}>50K+</div>
            <div style={{ fontSize: 14, color: '#566166' }}>Active Creators</div>
          </div>
          <div>
            <div style={{ fontSize: 40, fontWeight: 800, color: '#006b62', fontFamily: 'Manrope, sans-serif' }}>$2.4M</div>
            <div style={{ fontSize: 14, color: '#566166' }}>Paid to Creators</div>
          </div>
          <div>
            <div style={{ fontSize: 40, fontWeight: 800, color: '#2d6197', fontFamily: 'Manrope, sans-serif' }}>1.2M+</div>
            <div style={{ fontSize: 14, color: '#566166' }}>Posts Created</div>
          </div>
          <div>
            <div style={{ fontSize: 40, fontWeight: 800, color: '#9f403d', fontFamily: 'Manrope, sans-serif' }}>45K+</div>
            <div style={{ fontSize: 14, color: '#566166' }}>Viral Posts</div>
          </div>
        </div>
      </section>

      {/* AI Training Section */}
      <section id="about" style={{
        padding: '120px 24px',
        background: '#f7f9fb',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 80px' }}>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 800,
              color: '#2a3439',
              marginBottom: 20,
              fontFamily: 'Manrope, sans-serif',
            }}>
              Training the Future of AI
            </h2>
            <p style={{
              fontSize: 18,
              color: '#566166',
              lineHeight: 1.6,
            }}>
              Every post you create helps train EchoWriting, our advanced language model. 
              Your carefully crafted content teaches AI to understand context, nuance, and natural human expression.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: 32,
            '@media (max-width: 968px)': { gridTemplateColumns: '1fr' }
          } as any}>
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: 'Contextual Understanding',
                desc: 'By using keywords naturally in context, you help our LLMs understand how words function in real conversations, not just dictionary definitions.',
                color: '#2d6197',
              },
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: 'Natural Language Processing',
                desc: 'Viral posts attract comments. We scrape and analyze these discussions to give our AI deeper context around word usage and meaning.',
                color: '#006b62',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'AI Model Grounding',
                desc: 'Proper contextual usage prevents AI confusion. Using words out of context harms our models and may result in account suspension.',
                color: '#9f403d',
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: '#ffffff',
                borderRadius: 20,
                padding: 40,
                border: '1px solid #e1e9ee',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}>
                <div style={{
                  width: 64,
                  height: 64,
                  background: `rgba(${item.color === '#2d6197' ? '45,97,151' : item.color === '#006b62' ? '0,107,98' : '159,64,61'}, 0.1)`,
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                  color: item.color,
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#2a3439', marginBottom: 12 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 15, color: '#566166', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{
        padding: '120px 24px',
        background: '#ffffff',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 80px' }}>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 800,
              color: '#2a3439',
              marginBottom: 20,
              fontFamily: 'Manrope, sans-serif',
            }}>
              How It Works
            </h2>
            <p style={{ fontSize: 18, color: '#566166' }}>
              Create viral content, get approved, get paid. It's that simple.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: 24,
            '@media (max-width: 1024px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
            '@media (max-width: 640px)': { gridTemplateColumns: '1fr' }
          } as any}>
            {[
              {
                step: '01',
                icon: <Target className="w-6 h-6" />,
                title: 'Choose Your Mission',
                desc: 'Select any subreddit and pick from our curated keywords. Each keyword has a limited number of uses.',
              },
              {
                step: '02',
                icon: <Edit3 className="w-6 h-6" />,
                title: 'Craft Your Post',
                desc: 'Write an engaging, viral-worthy post that naturally incorporates your chosen keyword within the first 3 paragraphs.',
              },
              {
                step: '03',
                icon: <Search className="w-6 h-6" />,
                title: 'Quality Review',
                desc: 'Our team reviews your submission for quality, engagement potential, and proper keyword integration.',
              },
              {
                step: '04',
                icon: <DollarSign className="w-6 h-6" />,
                title: 'Get Paid',
                desc: 'Once approved, post to Reddit. Higher engagement = higher pay. Watch your earnings grow with every viral post.',
              },
            ].map((item, i) => (
              <div key={i} style={{
                padding: 32,
                background: '#f7f9fb',
                borderRadius: 20,
                position: 'relative',
                border: '1px solid #e1e9ee',
              }}>
                <span style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  fontSize: 48,
                  fontWeight: 800,
                  color: 'rgba(45,97,151,0.06)',
                  fontFamily: 'Manrope, sans-serif',
                }}>
                  {item.step}
                </span>
                <div style={{
                  width: 48,
                  height: 48,
                  background: '#2d6197',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  marginBottom: 20,
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', marginBottom: 12 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 14, color: '#566166', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section with Images */}
      <section id="examples" style={{
        padding: '120px 24px',
        background: '#f7f9fb',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 60px' }}>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 800,
              color: '#2a3439',
              marginBottom: 20,
              fontFamily: 'Manrope, sans-serif',
            }}>
              Seamless Keyword Integration
            </h2>
            <p style={{ fontSize: 18, color: '#566166' }}>
              Great posts feel natural. The keyword should fit so well that readers don't even notice it's there.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '300px 1fr',
            gap: 0,
            background: '#ffffff',
            borderRadius: 24,
            overflow: 'hidden',
            border: '1px solid #e1e9ee',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
            '@media (max-width: 768px)': { gridTemplateColumns: '1fr' }
          } as any}>
            <div style={{ borderRight: '1px solid #e1e9ee', '@media (max-width: 768px)': { borderRight: 'none', borderBottom: '1px solid #e1e9ee' } } as any}>
              {examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setActiveExample(i)}
                  style={{
                    width: '100%',
                    padding: 24,
                    textAlign: 'left',
                    border: 'none',
                    borderBottom: i < examples.length - 1 ? '1px solid #e1e9ee' : 'none',
                    background: activeExample === i ? '#f7f9fb' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  <span style={{
                    display: 'inline-block',
                    padding: '6px 14px',
                    background: activeExample === i ? 'rgba(0,107,98,0.15)' : 'rgba(0,107,98,0.08)',
                    color: '#006b62',
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}>
                    {ex.keyword}
                  </span>
                  <div style={{ fontSize: 14, color: '#566166' }}>{ex.subreddit}</div>
                </button>
              ))}
            </div>
            <div style={{ padding: 48, '@media (max-width: 640px)': { padding: 24 } }}>
              {/* Image */}
              <div style={{
                width: '100%',
                height: 200,
                borderRadius: 16,
                overflow: 'hidden',
                marginBottom: 24,
                position: 'relative',
              }}>
                <img 
                  src={examples[activeExample].image} 
                  alt={examples[activeExample].keyword}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  color: '#fff',
                  fontSize: 24,
                  fontWeight: 700,
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}>
                  {examples[activeExample].subreddit}
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <span style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  background: 'rgba(0,107,98,0.1)',
                  color: '#006b62',
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 700,
                  marginBottom: 16,
                }}>
                  Keyword: {examples[activeExample].keyword}
                </span>
              </div>
              <h3 style={{ fontSize: 28, fontWeight: 700, color: '#2a3439', marginBottom: 16 }}>
                {examples[activeExample].post}
              </h3>
              <div style={{
                padding: 24,
                background: 'rgba(0,107,98,0.05)',
                borderRadius: 16,
                borderLeft: '4px solid #006b62',
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#006b62', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                  Why This Works
                </div>
                <p style={{ fontSize: 15, color: '#566166', margin: 0, lineHeight: 1.6 }}>
                  {examples[activeExample].why}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" style={{
        padding: '120px 24px',
        background: '#ffffff',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 80px' }}>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 800,
              color: '#2a3439',
              marginBottom: 20,
              fontFamily: 'Manrope, sans-serif',
            }}>
              Loved by Creators
            </h2>
            <p style={{ fontSize: 18, color: '#566166' }}>
              Join thousands of creators who are earning real money by doing what they love.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: 24,
            '@media (max-width: 968px)': { gridTemplateColumns: '1fr' }
          } as any}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                padding: 32,
                background: '#f7f9fb',
                borderRadius: 20,
                border: '1px solid #e1e9ee',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <img 
                    src={t.avatar} 
                    alt={t.name}
                    style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#2a3439' }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: '#566166' }}>{t.role}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {[...Array(5)].map((_, j) => (
                    <span key={j} style={{ color: '#f59e0b' }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: '#566166', lineHeight: 1.6, margin: 0 }}>
                  "{t.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section style={{
        padding: '120px 24px',
        background: '#f7f9fb',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            background: 'linear-gradient(135deg, #2d6197 0%, #006b62 100%)',
            borderRadius: 24,
            padding: '60px 48px',
            color: '#ffffff',
            '@media (max-width: 768px)': { padding: '40px 24px' }
          } as any}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: 800,
              marginBottom: 48,
              fontFamily: 'Manrope, sans-serif',
            }}>
              Quality Standards
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: 32,
              '@media (max-width: 768px)': { gridTemplateColumns: '1fr' }
            } as any}>
              {[
                {
                  icon: <Check className="w-6 h-6" />,
                  title: 'Authentic Engagement',
                  desc: 'Real, highly engaging posts. No spam, no forced keywords. Content that genuinely belongs in the chosen subreddit.',
                },
                {
                  icon: <Check className="w-6 h-6" />,
                  title: 'Seamless Integration',
                  desc: 'Keywords must flow naturally. They should feel like they belong there. Readers shouldn\'t notice anything unusual.',
                },
                {
                  icon: <span style={{ fontSize: 24 }}>⚠️</span>,
                  title: 'Context Matters',
                  desc: 'Using words out of context confuses our AI models and degrades training quality. Repeated violations will result in account suspension.',
                },
                {
                  icon: <Target className="w-6 h-6" />,
                  title: 'Viral Potential',
                  desc: 'Higher reach = more comments = better AI training data. Craft posts that spark genuine discussion and engagement.',
                },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{item.title}</h4>
                    <p style={{ fontSize: 14, opacity: 0.9, lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '120px 24px',
        background: '#ffffff',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 800,
            color: '#2a3439',
            marginBottom: 24,
            fontFamily: 'Manrope, sans-serif',
          }}>
            Ready to Start Creating?
          </h2>
          <p style={{
            fontSize: 18,
            color: '#566166',
            marginBottom: 40,
            lineHeight: 1.6,
          }}>
            Join thousands of creators who are getting paid to craft viral content 
            while helping train the next generation of AI.
          </p>
          <button
            onClick={() => router.push('/login')}
            style={{
              padding: '20px 48px',
              background: '#2d6197',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(45,97,151,0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            Create Your Free Account
            <ArrowRight />
          </button>
          <p style={{ fontSize: 14, color: '#566166', marginTop: 24 }}>
            No credit card required. Start earning today.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '60px 24px',
        background: '#2a3439',
        color: '#ffffff',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: 40,
            '@media (max-width: 768px)': { flexDirection: 'column', gap: 24 }
          } as any}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40,
                height: 40,
                background: '#ffffff',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ color: '#2d6197', fontSize: 20, fontWeight: 700 }}>L</span>
              </div>
              <span style={{ fontSize: 24, fontWeight: 800, fontFamily: 'Manrope, sans-serif' }}>LexiPost</span>
            </div>
            <div style={{ display: 'flex', gap: 32 }}>
              <a href="#about" style={{ color: '#a9b4b9', textDecoration: 'none', fontSize: 14 }}>About</a>
              <a href="#how-it-works" style={{ color: '#a9b4b9', textDecoration: 'none', fontSize: 14 }}>How It Works</a>
              <a href="#examples" style={{ color: '#a9b4b9', textDecoration: 'none', fontSize: 14 }}>Examples</a>
              <a href="#" style={{ color: '#a9b4b9', textDecoration: 'none', fontSize: 14 }}>Support</a>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: '#a9b4b9', margin: 0 }}>
              © 2024 LexiPost. Training the future of AI, one post at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

