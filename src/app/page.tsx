'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */
const stats = [
  { value: '50K+', label: 'Active Creators' },
  { value: '$2.4M', label: 'Total Earned' },
  { value: '100M+', label: 'Monthly Views' },
  { value: '4.9/5', label: 'Creator Rating' },
];

const features = [
  {
    title: 'AI-Curated Keywords',
    description: 'Personalized keyword suggestions that fit naturally into your writing style.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=70',
    tag: 'AI',
  },
  {
    title: 'Real-Time Analytics',
    description: 'Watch your earnings grow live with transparent dashboards and breakdowns.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=70',
    tag: 'Data',
  },
  {
    title: 'Smart Matching',
    description: 'We match you with subreddits where your voice naturally fits best.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=70',
    tag: 'Match',
  },
  {
    title: 'Instant Payouts',
    description: 'Get paid directly to your bank. No delays, no minimums, no hidden fees.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=70',
    tag: 'Pay',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Content Creator',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=70',
    quote: "I've earned over $2,400 in my first month. The keywords are fun to work with and seeing posts go viral is addictive.",
    earnings: '$2,400+',
  },
  {
    name: 'Marcus Johnson',
    role: 'Reddit Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=70',
    quote: 'Finally a platform that pays me for what I love doing. My highest post got 45k upvotes — $180 from one post.',
    earnings: '$1,850/mo',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Student & Writer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=70',
    quote: 'LexiPost fits perfectly around my classes. I write posts between lectures and it covers my rent.',
    earnings: '$890/mo',
  },
];

const steps = [
  { num: '01', title: 'Choose Your Subreddit', desc: 'Pick any community that interests you from hundreds of active subreddits.' },
  { num: '02', title: 'Get AI Keywords', desc: 'Receive curated keywords that fit naturally — zero awkwardness guaranteed.' },
  { num: '03', title: 'Earn Real Money', desc: 'Post and earn based on engagement. Weekly payouts, no minimums.' },
];

const marqueeItems = [
  'AI-Powered', 'Viral Content', 'Earn Money', 'Reddit Posts',
  'Weekly Payouts', 'Smart Keywords', '50K+ Creators', '$2.4M Earned',
];

/* ─────────────────────────────────────────────
   STAGGER WRAPPER (simple, no scroll listeners)
   ───────────────────────────────────────────── */
const stagger = {
  container: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0, 1] } },
  },
};

/* ─────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────── */
export default function HomePage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* ═══════ NAV ═══════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center font-black text-sm">L</div>
            <span className="font-bold text-lg tracking-tight">LexiPost</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-white/50 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-white/50 hover:text-white transition-colors">How It Works</a>
            <a href="#testimonials" className="text-sm text-white/50 hover:text-white transition-colors">Testimonials</a>
            <button onClick={() => router.push('/login')} className="px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-violet-500 to-cyan-500 hover:opacity-90 transition-opacity">
              Login
            </button>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white/60">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="18" y2="18" /></>}
            </svg>
          </button>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden overflow-hidden border-t border-white/[0.06] bg-[#09090b]">
              <div className="px-6 py-5 space-y-4">
                <a href="#features" className="block text-white/60">Features</a>
                <a href="#how-it-works" className="block text-white/60">How It Works</a>
                <a href="#testimonials" className="block text-white/60">Testimonials</a>
                <button onClick={() => router.push('/login')} className="w-full py-3 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 font-semibold text-sm">Login</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* BG — pure CSS, no JS */}
        <div className="absolute inset-0 hero-bg" />
        <div className="absolute inset-0 hero-grid opacity-[0.03]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-white/60">AI-Powered Content Platform</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.9] tracking-tight mb-8">
            Get Paid to<br className="hidden sm:block" /> Create{' '}
            <span className="hero-gradient-text">Viral Content</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed">
            Choose any subreddit, craft engaging posts with AI-curated keywords, and earn real money while building your online presence.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => router.push('/login')} className="group px-8 py-4 rounded-full font-bold bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              Start Earning Today
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
            </button>
            <a href="#how-it-works" className="px-8 py-4 rounded-full border border-white/15 text-white/70 font-bold hover:bg-white/5 transition-colors text-center">
              See How It Works
            </a>
          </motion.div>

          <motion.div
            initial="hidden" animate="show" variants={stagger.container}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-10 border-t border-white/[0.06]"
          >
            {stats.map((s, i) => (
              <motion.div key={i} variants={stagger.item} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-white/90">{s.value}</div>
                <div className="text-sm text-white/30 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CSS-only scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce-slow" />
          </div>
        </div>
      </section>

      {/* ═══════ MARQUEE — CSS only ═══════ */}
      <section className="py-6 border-y border-white/[0.06] overflow-hidden marquee-fade">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee-item">{item}</span>
          ))}
        </div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-4 block">Features</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              Everything You Need<br /><span className="text-white/25">to Succeed</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger.container} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div key={i} variants={stagger.item} className="group rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-colors duration-300">
                <div className="relative h-52 overflow-hidden">
                  <img src={f.image} alt={f.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-bold">{f.tag}</div>
                </div>
                <div className="p-7">
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ STATEMENT ═══════ */}
      <section className="py-28 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tight">
            Your words have power.
          </h2>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tight text-white/25 mt-2">
            We help you monetize them.
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 mx-auto mt-10 rounded-full" />
        </motion.div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section id="how-it-works" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400 mb-4 block">How It Works</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              Three Steps to<br /><span className="text-white/25">Start Earning</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger.container} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div key={i} variants={stagger.item} className="relative p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-sm font-black mb-6">{step.num}</div>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-white/35 text-sm leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 border-t border-dashed border-white/10" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section id="testimonials" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-emerald-400 mb-4 block">Testimonials</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              Loved by<br /><span className="text-white/25">Creators</span>
            </h2>
          </motion.div>

          {/* Slider */}
          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0, 1] }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-12"
              >
                <div className="flex items-center gap-4 mb-8">
                  <img src={testimonials[activeTestimonial].avatar} alt={testimonials[activeTestimonial].name} loading="lazy" className="w-14 h-14 rounded-full object-cover ring-2 ring-white/10" />
                  <div>
                    <h4 className="font-bold">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-sm text-white/40">{testimonials[activeTestimonial].role}</p>
                  </div>
                  <div className="ml-auto px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/20">
                    <span className="text-emerald-400 font-bold text-sm">{testimonials[activeTestimonial].earnings}</span>
                  </div>
                </div>

                <p className="text-lg md:text-xl text-white/60 leading-relaxed italic">
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </p>

                <div className="flex gap-1 mt-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-center gap-5 mt-8">
              <button onClick={() => setActiveTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActiveTestimonial(i)} className={`h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? 'w-8 bg-gradient-to-r from-violet-500 to-cyan-500' : 'w-2 bg-white/20'}`} />
                ))}
              </div>
              <button onClick={() => setActiveTestimonial((p) => (p + 1) % testimonials.length)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ EARNINGS ═══════ */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
              Your Earnings,{' '}
              <span className="hero-gradient-text">Transparent</span>
            </h2>
            <p className="text-lg text-white/35 max-w-xl mx-auto mb-14">
              See exactly how your content generates revenue. No hidden fees.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger.container} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { label: 'Per Upvote', value: '$0.08', sub: 'Scales with engagement' },
              { label: 'Per Comment', value: '$0.12', sub: 'Quality interactions' },
              { label: 'Per 1K Views', value: '$2.00+', sub: 'Bonus for viral posts' },
            ].map((item, i) => (
              <motion.div key={i} variants={stagger.item} className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-colors duration-300">
                <div className="text-3xl font-black mb-2 text-white/90">{item.value}</div>
                <div className="text-sm font-semibold text-white/50 mb-1">{item.label}</div>
                <div className="text-xs text-white/25">{item.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-28 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative max-w-4xl mx-auto text-center">
          <div className="absolute inset-0 hero-bg rounded-3xl opacity-50" />
          <div className="relative py-20 px-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              Ready to Start{' '}
              <span className="hero-gradient-text">Earning?</span>
            </h2>
            <p className="text-lg text-white/35 max-w-xl mx-auto mb-10">
              Join thousands of creators making money from their Reddit expertise. No experience necessary.
            </p>
            <button onClick={() => router.push('/login')} className="group px-10 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 hover:opacity-90 transition-opacity inline-flex items-center gap-3">
              Get Started Free
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
            </button>
          </div>
        </motion.div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-white/[0.06] py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center font-black text-xs">L</div>
                <span className="font-bold">LexiPost</span>
              </div>
              <p className="text-sm text-white/25 leading-relaxed">Earn money creating authentic Reddit content.</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4 text-white/50">Product</h4>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'API', 'Changelog'].map((link) => (
                  <li key={link}><a href="#" className="text-sm text-white/25 hover:text-white/50 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4 text-white/50">Account</h4>
              <ul className="space-y-2">
                <li><a href="/login" className="text-sm text-white/25 hover:text-white/50 transition-colors">Creator Login</a></li>
                <li><a href="/reviewer/login" className="text-sm text-white/25 hover:text-white/50 transition-colors">Reviewer Login</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4 text-white/50">Legal</h4>
              <ul className="space-y-2">
                {['Privacy', 'Terms', 'Security'].map((link) => (
                  <li key={link}><a href="#" className="text-sm text-white/25 hover:text-white/50 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/15">&copy; 2024 LexiPost. All rights reserved.</p>
            <div className="flex gap-6">
              {['Twitter', 'GitHub', 'Discord'].map((s) => (
                <a key={s} href="#" className="text-sm text-white/15 hover:text-white/40 transition-colors">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
