// @ts-nocheck
'use client';

import React, { useState, useRef, useEffect } from 'react';

const botReplies = [
  "Thanks for reaching out! Our team will respond shortly.",
  "I've noted your concern. A support agent will follow up within 2 hours.",
  "That's a great question! Let me check on that for you.",
  "I understand. Could you provide more details so we can help faster?",
  "Got it! Your issue has been escalated to our support team.",
];

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: "Hi! I'm LexiBot. How can I help you today?", time: formatTime() },
  ]);
  const [unread, setUnread] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  function formatTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  const send = () => {
    if (!message.trim()) return;
    const userMsg = { id: Date.now(), from: 'me', text: message.trim(), time: formatTime() };
    setMessages(p => [...p, userMsg]);
    setMessage('');

    setTimeout(() => {
      const reply = botReplies[Math.floor(Math.random() * botReplies.length)];
      setMessages(p => [...p, { id: Date.now(), from: 'bot', text: reply, time: formatTime() }]);
      if (!open) setUnread(u => u + 1);
    }, 1200);
  };

  return (
    <>
      <style>{`
        .fc-widget { position: fixed; bottom: 24px; right: 24px; z-index: 9999; font-family: 'Inter', -apple-system, sans-serif; }
        .fc-bubble { width: 56px; height: 56px; border-radius: 50%; background: #2d6197; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(45,97,151,0.35); transition: transform 0.2s, box-shadow 0.2s; position: relative; }
        .fc-bubble:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(45,97,151,0.45); }
        .fc-bubble:active { transform: scale(0.95); }
        .fc-badge { position: absolute; top: -4px; right: -4px; width: 20px; height: 20px; border-radius: 50%; background: #EF4444; color: #fff; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; border: 2px solid #fff; }
        .fc-panel { position: absolute; bottom: 68px; right: 0; width: 380px; max-width: calc(100vw - 32px); height: 520px; max-height: calc(100vh - 120px); background: #fff; border-radius: 20px; box-shadow: 0 12px 48px rgba(0,0,0,0.15); display: flex; flex-direction: column; overflow: hidden; animation: fc-slide-up 0.25s ease; }
        @keyframes fc-slide-up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .fc-header { padding: 18px 20px; background: #2d6197; display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .fc-header-avatar { width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .fc-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
        .fc-messages::-webkit-scrollbar { width: 4px; }
        .fc-messages::-webkit-scrollbar-thumb { background: #e1e9ee; border-radius: 4px; }
        .fc-msg { max-width: 80%; padding: 10px 14px; font-size: 13px; line-height: 1.5; }
        .fc-msg-bot { background: #f7f9fb; color: #2a3439; border-radius: 4px 16px 16px 16px; align-self: flex-start; border: 1px solid #e1e9ee; }
        .fc-msg-me { background: #2d6197; color: #fff; border-radius: 16px 16px 4px 16px; align-self: flex-end; }
        .fc-msg-time { font-size: 10px; opacity: 0.5; margin-top: 4px; text-align: right; }
        .fc-input-bar { display: flex; gap: 8px; padding: 14px 16px; border-top: 1px solid #e1e9ee; background: #fff; flex-shrink: 0; }
        .fc-input { flex: 1; padding: 10px 14px; border: 1.5px solid #e1e9ee; border-radius: 12px; font-size: 13px; font-family: inherit; outline: none; color: #2a3439; min-width: 0; }
        .fc-input:focus { border-color: #2d6197; }
        .fc-send { width: 40px; height: 40px; border-radius: 12px; background: #2d6197; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: opacity 0.15s; }
        .fc-send:hover { opacity: 0.85; }
        .fc-send:disabled { opacity: 0.4; cursor: not-allowed; }
        .fc-quick { display: flex; gap: 6px; flex-wrap: wrap; padding: 0 16px 12px; }
        .fc-quick-btn { padding: 6px 12px; border-radius: 20px; border: 1px solid #e1e9ee; background: #f7f9fb; font-size: 12px; color: #566166; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .fc-quick-btn:hover { background: #d2e4ff; color: #2d6197; border-color: #2d6197; }
        @media (max-width: 480px) {
          .fc-panel { width: calc(100vw - 16px); right: -16px; bottom: 64px; height: calc(100vh - 100px); border-radius: 16px; }
          .fc-widget { bottom: 16px; right: 16px; }
        }
      `}</style>

      <div className="fc-widget">
        {open && (
          <div className="fc-panel">
            {/* Header */}
            <div className="fc-header">
              <div className="fc-header-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>LexiBot Support</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>Usually replies within minutes</div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontSize: 20, padding: 4 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Messages */}
            <div className="fc-messages" ref={scrollRef}>
              {messages.map(m => (
                <div key={m.id} className={`fc-msg ${m.from === 'me' ? 'fc-msg-me' : 'fc-msg-bot'}`}>
                  {m.text}
                  <div className="fc-msg-time">{m.time}</div>
                </div>
              ))}
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div className="fc-quick">
                {['My submission was rejected', 'Payment not received', 'How do I start?'].map(q => (
                  <button key={q} className="fc-quick-btn" onClick={() => { setMessage(q); setTimeout(() => { setMessage(''); const userMsg = { id: Date.now(), from: 'me', text: q, time: formatTime() }; setMessages(p => [...p, userMsg]); setTimeout(() => { const reply = botReplies[Math.floor(Math.random() * botReplies.length)]; setMessages(p => [...p, { id: Date.now(), from: 'bot', text: reply, time: formatTime() }]); }, 1200); }, 50); }}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="fc-input-bar">
              <input
                className="fc-input"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Type your message..."
              />
              <button className="fc-send" onClick={send} disabled={!message.trim()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Floating bubble */}
        <button className="fc-bubble" onClick={() => setOpen(!open)}>
          {!open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          )}
          {unread > 0 && !open && <span className="fc-badge">{unread}</span>}
        </button>
      </div>
    </>
  );
}
