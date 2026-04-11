'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const words = [
  { id: 1, name: 'Resilience', checked: true },
  { id: 2, name: 'Innovation', checked: true },
  { id: 3, name: 'Clarity', checked: false },
];

const contributors = [
  { id: 1, name: 'Sarah J.', avatar: 'https://ui-avatars.com/api/?name=Sarah+J&background=2d6197&color=fff&size=64', checked: true },
  { id: 2, name: 'Mark O.', avatar: 'https://ui-avatars.com/api/?name=Mark+O&background=006b62&color=fff&size=64', checked: true },
  { id: 3, name: 'Elena W.', avatar: 'https://ui-avatars.com/api/?name=Elena+W&background=9f403d&color=fff&size=64', checked: false },
];

const legendItems = [
  { color: '#006b62', label: 'Completed' },
  { color: '#2d6197', label: 'In Progress' },
  { color: '#465468', label: 'Scheduled' },
  { color: '#9f403d', label: 'Delayed' },
];

const generateCalendarData = () => {
  const data = {};
  data['29'] = { isPadding: true, day: 29 };
  data['30'] = { isPadding: true, day: 30 };
  data['1'] = { assignments: [
    { title: 'Resilience - Analysis', color: '#006b62', bg: '#91feef' },
    { title: 'Innovation - Intro', color: '#526074', bg: '#d5e3fc' },
  ]};
  data['2'] = { assignments: [{ title: 'Clarity - Final Draft', color: '#2d6197', bg: '#d2e4ff' }] };
  data['3'] = { assignments: [] };
  data['4'] = { assignments: [{ title: 'Synthesis - Delayed', color: '#9f403d', bg: 'rgba(254,137,131,0.3)' }] };
  data['5'] = { assignments: [] };
  data['6'] = { assignments: [] };
  data['7'] = { assignments: [] };
  data['8'] = { 
    featured: true,
    assignments: [
      { title: 'Quantum - Review', color: '#006b62', bg: '#91feef' },
      { title: 'Ethics - Mapping', color: '#2d6197', bg: '#d2e4ff' },
      { title: 'Vision - Drafting', color: '#526074', bg: '#d5e3fc' },
      { more: 4 },
    ]
  };
  data['9'] = { assignments: [] };
  data['10'] = { assignments: [] };
  data['11'] = { assignments: [] };
  data['12'] = { assignments: [] };
  for (let i = 13; i <= 31; i++) {
    if (i % 3 === 0) {
      data[String(i)] = { assignments: [{ title: `Word Task ${i}`, color: '#a9b4b9', bg: '#e8eff3' }] };
    } else {
      data[String(i)] = { assignments: [] };
    }
  }
  return data;
};

const calendarData = generateCalendarData();

const dayDetails = [
  { id: 1, title: 'Quantum Theory Expansion', contributor: 'Sarah Jenkins', status: 'COMPLETED', statusBg: '#91feef', statusColor: '#006259', time: '09:00 AM', size: '4.2 MB' },
  { id: 2, title: 'Ethics Protocol Mapping', contributor: 'Mark Owens', status: 'In Progress', statusBg: '#d2e4ff', statusColor: '#1c5489', progress: 65 },
  { id: 3, title: 'Visionary Architecture Intro', contributor: 'Elena White', status: 'Scheduled', statusBg: '#d5e3fc', statusColor: '#455367', note: '"Waiting for final draft of word taxonomy before starting initial mapping phase."' },
];

export default function AssignmentCalendar() {
  const router = useRouter();
  const [view, setView] = useState('Month');

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      {/* TopAppBar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Assignment Calendar</h1>
          <div style={{ width: 1, height: 24, background: '#d9e4ea', margin: '0 8px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}>
              <span style={{ ...ms, fontSize: 20 }}>chevron_left</span>
            </button>
            <button style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}>
              <span style={{ ...ms, fontSize: 20 }}>chevron_right</span>
            </button>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#2a3439', marginLeft: 8, fontFamily: 'Inter, sans-serif' }}>October 2024</span>
            <button style={{ padding: '6px 12px', background: '#f0f4f7', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 500, color: '#566166', marginLeft: 16, cursor: 'pointer' }}>Today</button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', gap: 4, padding: 4, background: '#f0f4f7', borderRadius: 8 }}>
            <button onClick={() => setView('Month')} style={{ padding: '6px 16px', background: view === 'Month' ? '#ffffff' : 'transparent', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: view === 'Month' ? 600 : 500, color: view === 'Month' ? '#2d6197' : '#566166', cursor: 'pointer', boxShadow: view === 'Month' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>Month</button>
            <button onClick={() => setView('Week')} style={{ padding: '6px 16px', background: view === 'Week' ? '#ffffff' : 'transparent', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: view === 'Week' ? 600 : 500, color: view === 'Week' ? '#2d6197' : '#566166', cursor: 'pointer', boxShadow: view === 'Week' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>Week</button>
          </div>
          <div style={{ width: 1, height: 24, background: '#d9e4ea', margin: '0 4px' }} />
          <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}><span style={{ ...ms, fontSize: 22 }}>notifications</span></button>
          <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}><span style={{ ...ms, fontSize: 22 }}>settings</span></button>
        </div>
      </header>

      {/* Three Column Layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', gap: 0 }}>
        {/* Left Filter Sidebar */}
        <aside style={{ width: 240, background: '#f0f4f7', padding: 24, display: 'flex', flexDirection: 'column', gap: 32, overflowY: 'auto' }}>
          <section>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#566166', marginBottom: 16 }}>Filter by Word</label>
            <div style={{ position: 'relative', marginBottom: 12 }}>
              <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', ...ms, fontSize: 18, color: '#a9b4b9' }}>search</span>
              <input type="text" placeholder="Search words..." style={{ width: '100%', padding: '8px 12px 8px 36px', background: '#ffffff', border: 'none', borderRadius: 8, fontSize: 12 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {words.map(w => (
                <label key={w.id} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={w.checked} style={{ width: 14, height: 14, accentColor: '#2d6197' }} />
                  <span style={{ fontSize: 12, color: '#2a3439' }}>{w.name}</span>
                </label>
              ))}
            </div>
            <button style={{ fontSize: 10, fontWeight: 600, color: '#2d6197', background: 'transparent', border: 'none', cursor: 'pointer', marginTop: 8 }}>+ View 24 more</button>
          </section>

          <section>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#566166', marginBottom: 16 }}>Contributors</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {contributors.map(c => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img src={c.avatar} alt="" style={{ width: 24, height: 24, borderRadius: '50%' }} />
                  <span style={{ flex: 1, fontSize: 12, color: '#2a3439' }}>{c.name}</span>
                  <input type="checkbox" checked={c.checked} style={{ width: 14, height: 14, accentColor: '#2d6197' }} />
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid #d9e4ea' }}>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#566166', marginBottom: 16 }}>Status Legend</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {legendItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
                  <span style={{ fontSize: 12, color: '#566166' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* Calendar Grid */}
        <section style={{ flex: 1, background: '#e8eff3', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #d9e4ea', background: '#ffffff' }}>
            {DAYS.map(d => (
              <div key={d} style={{ padding: '12px 0', textAlign: 'center', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{d}</div>
            ))}
          </div>

          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateRows: 'repeat(5, 1fr)', overflowY: 'auto' }}>
            {(Object.entries(calendarData) as [string, any][]).map(([day, data]) => (
              <div key={day} style={{ minHeight: 140, padding: 8, background: data.isPadding ? 'rgba(232,239,243,0.3)' : data.featured ? 'rgba(45,97,151,0.05)' : '#ffffff', borderRight: '1px solid #d9e4ea', borderBottom: '1px solid #d9e4ea', cursor: data.isPadding ? 'default' : 'pointer', boxShadow: data.featured ? 'inset 0 0 0 2px rgba(45,97,151,0.2)' : 'none' }}>
                <span style={{ fontSize: 12, fontWeight: data.featured ? 700 : (data.isPadding ? 500 : 600), color: data.isPadding ? '#a9b4b9' : (data.featured ? '#2d6197' : '#2a3439') }}>{day}</span>
                <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {data.assignments?.map((a, i) => (
                    a.more ? (
                      <button key={i} style={{ fontSize: 10, fontWeight: 700, color: '#2d6197', background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px 0' }}>+ {a.more} more</button>
                    ) : (
                      <div key={i} style={{ padding: '4px 8px', borderRadius: 6, background: a.bg, borderLeft: `3px solid ${a.color}`, fontSize: 10, fontWeight: 500, color: '#2a3439', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.title}</div>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Detail Drawer */}
        <aside style={{ width: 380, background: '#ffffff', borderLeft: '1px solid #e8eff3', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 24px rgba(42,52,57,0.06)' }}>
          <div style={{ padding: 24, borderBottom: '1px solid #e8eff3', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2a3439', margin: 0 }}>Tuesday, Oct 8</h3>
              <p style={{ fontSize: 12, color: '#566166', margin: '4px 0 0 0' }}>7 Assignments Scheduled</p>
            </div>
            <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#a9b4b9' }}><span style={{ ...ms, fontSize: 20 }}>close</span></button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {dayDetails.map((item) => (
              <div key={item.id} style={{ padding: 16, borderRadius: 12, background: item.progress ? '#ffffff' : 'rgba(247,249,251,0.5)', border: '1px solid #e8eff3', borderLeft: item.progress ? '4px solid #2d6197' : '1px solid #e8eff3', boxShadow: item.progress ? '0 2px 8px rgba(0,0,0,0.04)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: '#2a3439', margin: 0 }}>{item.title}</h4>
                    <p style={{ fontSize: 11, color: '#566166', margin: '4px 0 0 0' }}>Contributor: <span style={{ color: '#2d6197', fontWeight: 600 }}>{item.contributor}</span></p>
                  </div>
                  <span style={{ padding: '4px 10px', borderRadius: 9999, background: item.statusBg, color: item.statusColor, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.status}</span>
                </div>

                {item.progress && (
                  <div style={{ width: '100%', height: 6, background: '#e8eff3', borderRadius: 999, overflow: 'hidden', marginBottom: 12 }}>
                    <div style={{ width: `${item.progress}%`, height: '100%', background: '#2d6197', borderRadius: 999 }} />
                  </div>
                )}

                {item.note && <p style={{ fontSize: 11, color: '#566166', fontStyle: 'italic', margin: '0 0 12px 0' }}>{item.note}</p>}

                {item.time && (
                  <div style={{ display: 'flex', gap: 16, fontSize: 10, color: '#566166', marginBottom: 12 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ ...ms, fontSize: 14 }}>schedule</span> {item.time}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ ...ms, fontSize: 14 }}>database</span> {item.size}</span>
                  </div>
                )}

                <div style={{ display: 'flex', gap: 8 }}>
                  {item.progress ? (
                    <button style={{ flex: 1, padding: '8px 0', background: '#2d6197', color: '#ffffff', border: 'none', borderRadius: 8, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }}>Update Progress</button>
                  ) : item.note ? (
                    <button style={{ flex: 1, padding: '8px 0', background: '#ffffff', color: '#566166', border: '1px solid #d9e4ea', borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>SEND REMINDER</button>
                  ) : (
                    <button style={{ flex: 1, padding: '8px 0', background: '#ffffff', color: '#566166', border: '1px solid #d9e4ea', borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>VIEW DATA</button>
                  )}
                  <button style={{ padding: '8px 10px', background: 'transparent', color: '#566166', border: '1px solid #d9e4ea', borderRadius: 8, cursor: 'pointer' }}>
                    <span style={{ ...ms, fontSize: 16 }}>{item.progress ? 'more_horiz' : 'edit'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: 24, background: '#f7f9fb', borderTop: '1px solid #e8eff3' }}>
            <button onClick={() => router.push('/admin/assignments/create')} style={{ width: '100%', padding: '12px 0', background: '#2a3439', color: '#ffffff', border: 'none', borderRadius: 12, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
              <span style={{ ...ms, fontSize: 16 }}>add</span>
              Add New Assignment
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
