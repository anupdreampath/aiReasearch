'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const mockAssignments = [
  { id: 'AS-4402', word: 'Serendipity', contributor: 'Elena M.', contributorInitials: 'EM', platform: 'web', assignedAt: 'Oct 12, 2023', dueDate: 'Oct 24, 2023', status: 'assigned', isOverdue: true },
  { id: 'AS-4405', word: 'Melancholy', contributor: 'Julian Frost', contributorInitials: 'JF', platform: 'mobile', assignedAt: 'Oct 14, 2023', dueDate: 'Today', status: 'posted', isToday: true },
  { id: 'AS-4412', word: 'Ephemeral', contributor: 'Sarah Chen', contributorInitials: 'SC', platform: 'api', assignedAt: 'Oct 20, 2023', dueDate: 'Nov 02, 2023', status: 'verified' },
  { id: 'AS-4388', word: 'Solitude', contributor: 'David Kim', contributorInitials: 'DK', platform: 'web', assignedAt: 'Oct 05, 2023', dueDate: 'Oct 15, 2023', status: 'paid' },
];

export default function AssignmentList() {
  const router = useRouter();
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const selectAll = () => {
    setSelected(selected.length === mockAssignments.length ? [] : mockAssignments.map(a => a.id));
  };

  const getStatusBadge = (status) => {
    const styles = {
      assigned: { bg: '#f0f4f7', color: '#566166' },
      posted: { bg: '#d2e4ff', color: '#1c5489' },
      verified: { bg: '#91feef', color: '#006259' },
      paid: { bg: '#006b62', color: '#ffffff' },
    };
    const s = styles[status] || styles.assigned;
    return {
      padding: '4px 10px',
      background: s.bg,
      color: s.color,
      fontSize: '10px',
      fontWeight: 700,
      borderRadius: '9999px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontFamily: 'Inter, sans-serif',
    };
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      web: 'language',
      mobile: 'smartphone',
      api: 'api',
    };
    return icons[platform] || 'language';
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: 1600, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Assignments</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => router.push('/admin/assignments/create')}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px',
              background: '#2d6197',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(45,97,151,0.3)',
            }}
          >
            <span style={{ fontSize: 18, fontFamily: 'Material Symbols Outlined' }}>add</span>
            Create Assignment
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ background: '#f0f4f7', borderRadius: '12px', padding: '24px', marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: '#566166', fontFamily: 'Material Symbols Outlined' }}>search</span>
            <input
              type="text"
              placeholder="Search by word or contributor..."
              style={{
                width: '100%',
                padding: '10px 12px 10px 40px',
                background: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                color: '#2a3439',
              }}
            />
          </div>
          {/* Dropdowns */}
          <select style={{ padding: '10px 12px', background: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '13px', fontFamily: 'Inter, sans-serif', color: '#566166' }}>
            <option>Word Pool</option>
            <option>Nostalgia</option>
            <option>Ethereal</option>
          </select>
          <select style={{ padding: '10px 12px', background: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '13px', fontFamily: 'Inter, sans-serif', color: '#566166' }}>
            <option>Contributor</option>
            <option>Sarah J.</option>
            <option>Michael K.</option>
          </select>
          <select style={{ padding: '10px 12px', background: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '13px', fontFamily: 'Inter, sans-serif', color: '#566166' }}>
            <option>All Statuses</option>
            <option>Assigned</option>
            <option>Posted</option>
            <option>Verified</option>
            <option>Paid</option>
          </select>
          <select style={{ padding: '10px 12px', background: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '13px', fontFamily: 'Inter, sans-serif', color: '#566166' }}>
            <option>Platform</option>
            <option>Web</option>
            <option>Mobile App</option>
            <option>API</option>
          </select>
        </div>

        {/* Date Range & Bulk Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#ffffff', padding: '8px 12px', borderRadius: '8px' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Due Date Range</span>
              <input type="date" style={{ border: 'none', fontSize: '12px', fontFamily: 'Inter, sans-serif', color: '#566166', background: 'transparent' }} />
              <span style={{ color: '#566166' }}>—</span>
              <input type="date" style={{ border: 'none', fontSize: '12px', fontFamily: 'Inter, sans-serif', color: '#566166', background: 'transparent' }} />
            </div>
            <button style={{ fontSize: '12px', fontWeight: 700, color: '#2d6197', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Clear Filters</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '12px', color: '#566166', fontFamily: 'Inter, sans-serif' }}>{selected.length} selected</span>
            <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', background: '#e1e9ee', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#566166', fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>
              <span style={{ fontSize: 16, fontFamily: 'Material Symbols Outlined' }}>swap_horiz</span>
              Reassign Selected
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', background: '#e1e9ee', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#566166', fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>
              <span style={{ fontSize: 16, fontFamily: 'Material Symbols Outlined' }}>done_all</span>
              Mark Complete
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(42,52,57,0.04)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f7f9fb' }}>
            <tr>
              <th style={{ padding: '16px', width: 40 }}>
                <input
                  type="checkbox"
                  checked={selected.length === mockAssignments.length}
                  onChange={selectAll}
                  style={{ width: 16, height: 16 }}
                />
              </th>
              <th style={{ padding: '16px', fontSize: '10px', fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>Word</th>
              <th style={{ padding: '16px', fontSize: '10px', fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>Contributor</th>
              <th style={{ padding: '16px', fontSize: '10px', fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>Platform</th>
              <th style={{ padding: '16px', fontSize: '10px', fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>Assigned</th>
              <th style={{ padding: '16px', fontSize: '10px', fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>Due Date</th>
              <th style={{ padding: '16px', fontSize: '10px', fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>Status</th>
              <th style={{ padding: '16px', fontSize: '10px', fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right', fontFamily: 'Inter, sans-serif' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockAssignments.map((row, index) => (
              <tr key={row.id} style={{ background: index % 2 === 1 ? '#fafbfc' : '#ffffff' }}>
                <td style={{ padding: '16px' }}>
                  <input
                    type="checkbox"
                    checked={selected.includes(row.id)}
                    onChange={() => toggleSelect(row.id)}
                    style={{ width: 16, height: 16 }}
                  />
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#2a3439', fontFamily: 'Inter, sans-serif' }}>{row.word}</span>
                  <div style={{ fontSize: '10px', color: '#566166', fontFamily: 'Inter, sans-serif' }}>ID: #{row.id}</div>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#d2e4ff', color: '#1c5489', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>
                      {row.contributorInitials}
                    </div>
                    <span style={{ fontSize: '14px', color: '#566166', fontFamily: 'Inter, sans-serif' }}>{row.contributor}</span>
                  </div>
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '6px', background: '#f0f4f7', borderRadius: '6px', color: '#566166' }}>
                    <span style={{ fontSize: 18, fontFamily: 'Material Symbols Outlined' }}>{getPlatformIcon(row.platform)}</span>
                  </span>
                </td>
                <td style={{ padding: '16px', fontSize: '13px', color: '#566166', fontFamily: 'Inter, sans-serif' }}>{row.assignedAt}</td>
                <td style={{ padding: '16px' }}>
                  {row.isOverdue ? (
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#9f403d', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Inter, sans-serif' }}>
                      <span style={{ fontSize: 14, fontFamily: 'Material Symbols Outlined' }}>warning</span>
                      {row.dueDate}
                    </span>
                  ) : row.isToday ? (
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#d97706', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Inter, sans-serif' }}>
                      <span style={{ fontSize: 14, fontFamily: 'Material Symbols Outlined' }}>schedule</span>
                      {row.dueDate}
                    </span>
                  ) : (
                    <span style={{ fontSize: '13px', color: row.status === 'paid' ? '#566166' : '#006b62', fontFamily: 'Inter, sans-serif' }}>{row.dueDate}</span>
                  )}
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={getStatusBadge(row.status)}>{row.status}</span>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                    <button
                      onClick={() => router.push(`/admin/assignments/${row.id}`)}
                      style={{ padding: '4px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}
                      title="View assignment"
                    >
                      <span style={{ fontSize: 20, fontFamily: 'Material Symbols Outlined' }}>visibility</span>
                    </button>
                    <button
                      onClick={() => alert(`Reassign ${row.word} to another contributor`)}
                      style={{ padding: '4px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}
                      title="Reassign contributor"
                    >
                      <span style={{ fontSize: 20, fontFamily: 'Material Symbols Outlined' }}>sync_alt</span>
                    </button>
                    <button
                      onClick={() => confirm(`Delete assignment ${row.id}?`) && alert(`Deleted ${row.id}`)}
                      style={{ padding: '4px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}
                      title="Delete assignment"
                    >
                      <span style={{ fontSize: 20, fontFamily: 'Material Symbols Outlined' }}>delete_outline</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: '#f7f9fb', borderTop: '1px solid #e1e9ee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '12px', color: '#566166', fontFamily: 'Inter, sans-serif' }}>Showing</span>
            <select style={{ background: 'transparent', border: 'none', fontSize: '12px', fontWeight: 700, color: '#2a3439', fontFamily: 'Inter, sans-serif' }}>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span style={{ fontSize: '12px', color: '#566166', fontFamily: 'Inter, sans-serif' }}>of 432 assignments</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button style={{ padding: '4px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#a9b4b9' }} disabled>
              <span style={{ fontSize: 20, fontFamily: 'Material Symbols Outlined' }}>chevron_left</span>
            </button>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#2d6197', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 700, fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>1</button>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: '#566166', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 700, fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>2</button>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: '#566166', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 700, fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>3</button>
            <span style={{ padding: '0 8px', color: '#a9b4b9', fontFamily: 'Inter, sans-serif' }}>...</span>
            <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: '#566166', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 700, fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>18</button>
            <button style={{ padding: '4px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}>
              <span style={{ fontSize: 20, fontFamily: 'Material Symbols Outlined' }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 48, textAlign: 'center' }}>
        <p style={{ fontSize: '10px', color: '#a9b4b9', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>© 2023 Sentimental Grid Architectural Data Systems</p>
      </div>
    </div>
  );
}
