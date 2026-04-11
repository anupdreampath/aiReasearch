// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const wordsData = [
  { id: 1, word: 'Serendipity', pos: 'Noun', definition: 'The occurrence and development of events...', posts: 142, target: 500, status: 'Active', statusBg: '#91feef', statusColor: '#006259', created: 'Oct 12, 2023', selected: true },
  { id: 2, word: 'Ephemeral', pos: 'Adjective', definition: 'Lasting for a very short time.', posts: 89, target: 100, status: 'Paused', statusBg: '#d5e3fc', statusColor: '#455367', created: 'Oct 14, 2023', selected: false },
  { id: 3, word: 'Luminous', pos: 'Adjective', definition: 'Full of or shedding light; bright or shining.', posts: 250, target: 250, status: 'Complete', statusBg: '#e8eff3', statusColor: '#566166', created: 'Sep 28, 2023', selected: true },
  { id: 4, word: 'Resilient', pos: 'Adjective', definition: 'Able to withstand or recover quickly...', posts: 42, target: 1000, status: 'Active', statusBg: '#91feef', statusColor: '#006259', created: 'Oct 20, 2023', selected: false },
  { id: 5, word: 'Mellifluous', pos: 'Adjective', definition: 'Sweet or musical; pleasant to hear.', posts: 12, target: 300, status: 'Active', statusBg: '#91feef', statusColor: '#006259', created: 'Oct 22, 2023', selected: true },
];

const thStyle = {
  padding: '16px',
  fontSize: '11px',
  fontWeight: 700,
  color: '#566166',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  textAlign: 'left',
  fontFamily: 'Inter, sans-serif',
};

export default function WordList() {
  const router = useRouter();
  const [words, setWords] = useState(wordsData);
  const [search, setSearch] = useState('');

  const selectedCount = words.filter(w => w.selected).length;

  const toggleSelect = (id) => {
    setWords(words.map(w => w.id === id ? { ...w, selected: !w.selected } : w));
  };

  const selectAll = () => {
    const allSelected = words.every(w => w.selected);
    setWords(words.map(w => ({ ...w, selected: !allSelected })));
  };

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* TopAppBar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Words</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => router.push('/admin/words/create')}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px',
              background: '#2d6197',
              color: '#ffffff',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <span style={{ ...ms, fontSize: 18 }}>add</span>
            Add Word
          </button>
          <div style={{ width: 1, height: 24, background: '#d9e4ea', margin: '0 8px' }} />
          <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}>
            <span style={{ ...ms, fontSize: 22 }}>notifications</span>
          </button>
          <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}>
            <span style={{ ...ms, fontSize: 22 }}>settings</span>
          </button>
          <img
            src="https://ui-avatars.com/api/?name=Admin+User&background=2d6197&color=fff&size=64"
            alt=""
            style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid #ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          />
        </div>
      </header>

      {/* Filter Bar */}
      <section style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, padding: 20, background: '#ffffff', borderRadius: 12, marginBottom: 24, boxShadow: '0 8px 24px rgba(42,52,57,0.04)' }}>
        <div style={{ flex: 1, minWidth: 300, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', ...ms, fontSize: 20, color: '#566166' }}>search</span>
          <input
            type="text"
            placeholder="Search words, definitions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 12px 10px 44px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 14, color: '#2a3439' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <select style={{ padding: '10px 16px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13, color: '#566166', cursor: 'pointer' }}>
            <option>Part of Speech</option>
            <option>Noun</option>
            <option>Verb</option>
            <option>Adjective</option>
            <option>Adverb</option>
          </select>
          <select style={{ padding: '10px 16px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13, color: '#566166', cursor: 'pointer' }}>
            <option>Status</option>
            <option>All</option>
            <option>Active</option>
            <option>Paused</option>
            <option>Complete</option>
          </select>
          <select style={{ padding: '10px 16px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 13, color: '#566166', cursor: 'pointer' }}>
            <option>Sort by</option>
            <option>Created Date</option>
            <option>A-Z</option>
            <option>Target Count</option>
          </select>
          <button style={{ padding: 10, background: '#f0f4f7', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#566166' }}>
            <span style={{ ...ms, fontSize: 20 }}>filter_list</span>
          </button>
        </div>
      </section>

      {/* Bulk Action Toolbar */}
      {selectedCount > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1c5489', color: '#f5f7ff', padding: '12px 24px', borderRadius: 8, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>{selectedCount} words selected</span>
            <div style={{ width: 1, height: 16, background: 'rgba(245,247,255,0.2)' }} />
            <div style={{ display: 'flex', gap: 16 }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, background: 'transparent', border: 'none', color: '#f5f7ff', cursor: 'pointer' }}>
                <span style={{ ...ms, fontSize: 16 }}>delete</span>Delete Selected
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, background: 'transparent', border: 'none', color: '#f5f7ff', cursor: 'pointer' }}>
                <span style={{ ...ms, fontSize: 16 }}>published_with_changes</span>Change Status
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, background: 'transparent', border: 'none', color: '#f5f7ff', cursor: 'pointer' }}>
                <span style={{ ...ms, fontSize: 16 }}>download</span>Export Selected
              </button>
            </div>
          </div>
          <button style={{ background: 'transparent', border: 'none', color: 'rgba(245,247,255,0.7)', cursor: 'pointer' }}>
            <span style={{ ...ms, fontSize: 20 }}>close</span>
          </button>
        </div>
      )}

      {/* Table */}
      <div style={{ background: '#ffffff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 24px rgba(42,52,57,0.04)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f0f4f7' }}>
              <th style={{ ...thStyle, width: 48, paddingLeft: 24 }}>
                <input type="checkbox" checked={words.every(w => w.selected)} onChange={selectAll} style={{ width: 16, height: 16, accentColor: '#2d6197' }} />
              </th>
              <th style={thStyle}>Word</th>
              <th style={thStyle}>Part of Speech</th>
              <th style={thStyle}>Definition</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Posts</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Target</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Created</th>
              <th style={{ ...thStyle, textAlign: 'right', paddingRight: 24 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {words.map((w) => (
              <tr
                key={w.id}
                style={{
                  borderTop: '1px solid #f0f4f7',
                  background: w.selected ? 'rgba(232,239,243,0.5)' : 'transparent',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = w.selected ? 'rgba(232,239,243,0.7)' : '#f7f9fb'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = w.selected ? 'rgba(232,239,243,0.5)' : 'transparent'; }}
              >
                <td style={{ padding: '16px 24px' }}>
                  <input type="checkbox" checked={w.selected} onChange={() => toggleSelect(w.id)} style={{ width: 16, height: 16, accentColor: '#2d6197' }} />
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#2a3439' }}>{w.word}</span>
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ fontSize: 12, color: '#566166' }}>{w.pos}</span>
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ fontSize: 12, color: '#566166', maxWidth: 200, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {w.definition}
                  </span>
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#2a3439' }}>{w.posts}</span>
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#a9b4b9' }}>{w.target}</span>
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    display: 'inline-flex',
                    padding: '4px 10px',
                    borderRadius: 9999,
                    background: w.statusBg,
                    color: w.statusColor,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    {w.status}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ fontSize: 12, color: '#566166' }}>{w.created}</span>
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <button
                      onClick={() => router.push(`/admin/words/${w.id}`)}
                      style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }}
                    >
                      <span style={{ ...ms, fontSize: 18 }}>visibility</span>
                    </button>
                    <button
                      onClick={() => router.push(`/admin/words/${w.id}/edit`)}
                      style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }}
                    >
                      <span style={{ ...ms, fontSize: 18 }}>edit</span>
                    </button>
                    <button
                      onClick={() => confirm(`Archive word "${w.word}"?`) && alert(`Archived ${w.word}`)}
                      style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#9f403d', borderRadius: 6 }}
                    >
                      <span style={{ ...ms, fontSize: 18 }}>archive</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: 'rgba(240,244,247,0.5)', borderTop: '1px solid #f0f4f7' }}>
          <p style={{ fontSize: 12, color: '#566166', margin: 0 }}>Showing 1 to 5 of 248 entries</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#a9b4b9' }}>
              <span style={{ ...ms, fontSize: 20 }}>chevron_left</span>
            </button>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#2d6197', color: '#ffffff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>1</button>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: '#566166', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>2</button>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: '#566166', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>3</button>
            <span style={{ padding: '0 8px', color: '#a9b4b9' }}>...</span>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: '#566166', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>42</button>
            <button style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}>
              <span style={{ ...ms, fontSize: 20 }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid (Bento Style) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 32 }}>
        {/* Total Vocabulary */}
        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, boxShadow: '0 8px 24px rgba(42,52,57,0.04)' }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#566166', margin: '0 0 16px 0' }}>Total Vocabulary</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>12,482</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#006b62', display: 'flex', alignItems: 'center' }}>
              <span style={{ ...ms, fontSize: 12, marginRight: 2 }}>trending_up</span>+4%
            </span>
          </div>
        </div>

        {/* Active Words */}
        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, boxShadow: '0 8px 24px rgba(42,52,57,0.04)' }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#566166', margin: '0 0 16px 0' }}>Active Words</p>
          <span style={{ fontSize: 32, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>3,105</span>
        </div>

        {/* Target Completion */}
        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, boxShadow: '0 8px 24px rgba(42,52,57,0.04)' }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#566166', margin: '0 0 16px 0' }}>Target Completion</p>
          <span style={{ fontSize: 32, fontWeight: 800, color: '#2a3439', fontFamily: 'Manrope, sans-serif' }}>68%</span>
          <div style={{ marginTop: 16, height: 4, width: '100%', background: '#f0f4f7', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '68%', background: '#2d6197', borderRadius: 999 }} />
          </div>
        </div>

        {/* Post Distribution */}
        <div style={{ padding: 24, background: '#ffffff', borderRadius: 12, boxShadow: '0 8px 24px rgba(42,52,57,0.04)' }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#566166', margin: '0 0 16px 0' }}>Post Distribution</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 40 }}>
            <div style={{ width: 4, height: 24, background: '#2d6197', borderRadius: 999 }} />
            <div style={{ width: 4, height: 32, background: 'rgba(45,97,151,0.8)', borderRadius: 999 }} />
            <div style={{ width: 4, height: 16, background: 'rgba(45,97,151,0.4)', borderRadius: 999 }} />
            <div style={{ width: 4, height: 40, background: '#2d6197', borderRadius: 999 }} />
            <div style={{ width: 4, height: 28, background: 'rgba(45,97,151,0.6)', borderRadius: 999 }} />
            <div style={{ width: 4, height: 20, background: 'rgba(45,97,151,0.3)', borderRadius: 999 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
