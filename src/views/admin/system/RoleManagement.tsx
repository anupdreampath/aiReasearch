'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const roles = [
  {
    id: 1,
    name: 'Admin',
    users: 8,
    description: 'Full system access, including financial settings and user management.',
    selected: true,
    userCountBg: '#91feef',
    userCountColor: '#006259',
  },
  {
    id: 2,
    name: 'Reviewer',
    users: 24,
    description: 'Verification and audit capabilities for word submissions.',
    selected: false,
    userCountBg: '#d5e3fc',
    userCountColor: '#455367',
  },
  {
    id: 3,
    name: 'Contributor',
    users: 142,
    description: 'Submit data and track personal assignment performance.',
    selected: false,
    userCountBg: '#d5e3fc',
    userCountColor: '#455367',
  },
  {
    id: 4,
    name: 'Regional Lead',
    users: 2,
    description: 'Localized management and reporting for specific grids.',
    selected: false,
    userCountBg: '#d5e3fc',
    userCountColor: '#455367',
    dashed: true,
  },
];

const permissions = [
  { section: 'Data Management', view: true, edit: true, delete: true, approve: true },
  { section: 'Financial Records', view: true, edit: true, delete: false, approve: true },
  { section: 'User Accounts', view: true, edit: true, delete: true, approve: null },
  { section: 'System Audit', view: true, edit: false, delete: false, approve: false },
];

const assignedUsers = [
  { name: 'Marcus Chen', email: 'm.chen@sentimental.ai', avatar: 'https://ui-avatars.com/api/?name=Marcus+Chen&background=2d6197&color=fff&size=64' },
  { name: 'Sarah Jenkins', email: 's.jenkins@sentimental.ai', avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=006b62&color=fff&size=64' },
  { name: 'David Miller', email: 'd.miller@sentimental.ai', avatar: 'https://ui-avatars.com/api/?name=David+Miller&background=526074&color=fff&size=64' },
];

export default function RoleManagement() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [roleName, setRoleName] = useState('Admin');
  const [roleDesc, setRoleDesc] = useState('Full system access, including financial settings, user management, and global system configurations.');

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 40 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Role Management</h1>
          <p style={{ fontSize: 14, color: '#566166', margin: '8px 0 0 0' }}>Configure access levels and administrative permissions</p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 24px',
          background: '#2d6197',
          color: '#f5f7ff',
          border: 'none',
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(45,97,151,0.2)',
        }}>
          <span style={{ ...ms, fontSize: 20 }}>add</span>
          Create Role
        </button>
      </header>

      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {/* Left: Role List */}
        <section style={{ flex: '1 1 300px' }}>
          <h3 style={{ fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Available Roles</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => {
                  setSelectedRole(role);
                  setRoleName(role.name);
                }}
                style={{
                  padding: 20,
                  background: selectedRole.id === role.id ? '#ffffff' : '#e8eff3',
                  borderRadius: 12,
                  borderLeft: selectedRole.id === role.id ? '4px solid #2d6197' : '4px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: role.dashed ? '2px dashed rgba(169,180,185,0.3)' : '1px solid rgba(169,180,185,0.1)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#2a3439' }}>{role.name}</span>
                      <span style={{
                        padding: '2px 8px',
                        background: role.userCountBg,
                        color: role.userCountColor,
                        borderRadius: 9999,
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}>
                        {role.users} Users
                      </span>
                    </div>
                    <p style={{ fontSize: 12, color: '#566166', margin: 0, lineHeight: 1.5 }}>{role.description}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }}>
                      <span style={{ ...ms, fontSize: 20 }}>edit</span>
                    </button>
                    <button style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166', borderRadius: 6 }}>
                      <span style={{ ...ms, fontSize: 20 }}>delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right: Role Detail */}
        <section style={{ flex: '1 1 400px' }}>
          <div style={{
            padding: 32,
            background: '#ffffff',
            borderRadius: 12,
            boxShadow: '0 8px 24px rgba(42,52,57,0.06)',
            border: '1px solid rgba(169,180,185,0.1)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
              <h4 style={{ fontSize: 20, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Edit Role: {roleName}</h4>
              <div style={{ display: 'flex', gap: 12 }}>
                <button style={{ padding: '8px 20px', fontSize: 13, fontWeight: 600, color: '#566166', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  Discard
                </button>
                <button style={{ padding: '8px 20px', fontSize: 13, fontWeight: 600, color: '#f5f7ff', background: '#2d6197', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                  Save Role
                </button>
              </div>
            </div>

            {/* Role Meta Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, marginLeft: 4 }}>Role Name</label>
                <input
                  type="text"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500 }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, marginLeft: 4 }}>Description</label>
                <textarea
                  value={roleDesc}
                  onChange={(e) => setRoleDesc(e.target.value)}
                  rows={2}
                  style={{ width: '100%', padding: '12px 16px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, lineHeight: 1.6, resize: 'none' }}
                />
              </div>
            </div>

            {/* Permissions Grid */}
            <div style={{ marginBottom: 40 }}>
              <h5 style={{ fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, marginLeft: 4 }}>Permission Policy</h5>
              <div style={{ background: '#e8eff3', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
                  <thead>
                    <tr style={{ background: 'rgba(225,233,238,0.5)' }}>
                      <th style={{ padding: '12px 16px', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'left' }}>Section</th>
                      <th style={{ padding: '12px 16px', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>View</th>
                      <th style={{ padding: '12px 16px', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>Edit</th>
                      <th style={{ padding: '12px 16px', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>Delete</th>
                      <th style={{ padding: '12px 16px', fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>Approve</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((perm, idx) => (
                      <tr key={perm.section} style={{ background: idx % 2 === 0 ? 'transparent' : 'rgba(232,239,243,0.5)', borderTop: '1px solid rgba(169,180,185,0.1)' }}>
                        <td style={{ padding: '16px', fontSize: 14, fontWeight: 500, color: '#2a3439' }}>{perm.section}</td>
                        <td style={{ padding: '16px', textAlign: 'center' }}>
                          <input type="checkbox" checked={perm.view} style={{ width: 16, height: 16 }} />
                        </td>
                        <td style={{ padding: '16px', textAlign: 'center' }}>
                          <input type="checkbox" checked={perm.edit} style={{ width: 16, height: 16 }} />
                        </td>
                        <td style={{ padding: '16px', textAlign: 'center' }}>
                          <input type="checkbox" checked={perm.delete} style={{ width: 16, height: 16 }} />
                        </td>
                        <td style={{ padding: '16px', textAlign: 'center' }}>
                          {perm.approve === null ? (
                            <span style={{ fontSize: 10, color: '#566166', fontStyle: 'italic' }}>N/A</span>
                          ) : (
                            <input type="checkbox" checked={perm.approve} style={{ width: 16, height: 16 }} />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </div>

            {/* Assigned Users */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h5 style={{ fontSize: 11, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Assigned Users</h5>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    placeholder="Add user by email..."
                    style={{ maxWidth: 192, width: '100%', padding: '6px 12px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 12 }}
                  />
                  <button style={{ padding: 6, background: '#d5e3fc', border: 'none', borderRadius: 6, cursor: 'pointer', color: '#455367' }}>
                    <span style={{ ...ms, fontSize: 18 }}>person_add</span>
                  </button>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                {assignedUsers.map((user) => (
                  <div key={user.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, background: '#e8eff3', borderRadius: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img src={user.avatar} alt="" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 700, color: '#2a3439', margin: 0 }}>{user.name}</p>
                        <p style={{ fontSize: 10, color: '#566166', margin: '2px 0 0 0' }}>{user.email}</p>
                      </div>
                    </div>
                    <button style={{ padding: 4, background: 'transparent', border: 'none', cursor: 'pointer', color: '#566166' }}>
                      <span style={{ ...ms, fontSize: 16 }}>close</span>
                    </button>
                  </div>
                ))}
                <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, background: 'rgba(232,239,243,0.3)', border: '2px dashed rgba(169,180,185,0.2)', borderRadius: 8, fontSize: 12, fontWeight: 500, color: '#566166', cursor: 'pointer' }}>
                  <span style={{ ...ms, fontSize: 16 }}>group</span>
                  View 5 More Users
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Stats */}
      <footer style={{ display: 'flex', gap: 24, marginTop: 48, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, padding: 24, background: '#ffffff', borderRadius: 12, border: '1px solid rgba(169,180,185,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#d5e3fc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#455367' }}>
              <span style={{ ...ms, fontSize: 20 }}>shield_person</span>
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px 0' }}>Role Efficiency</p>
              <p style={{ fontSize: 24, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>94.2%</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: '#006b62', display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
              <span style={{ ...ms, fontSize: 12 }}>trending_up</span>
              Optimal distribution
            </p>
            <p style={{ fontSize: 10, color: '#566166', margin: '4px 0 0 0' }}>Compared to benchmark</p>
          </div>
        </div>
        <div style={{ flex: 1, padding: 24, background: '#ffffff', borderRadius: 12, border: '1px solid rgba(169,180,185,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#d2e4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1c5489' }}>
              <span style={{ ...ms, fontSize: 20 }}>history_edu</span>
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px 0' }}>Recent Changes</p>
              <p style={{ fontSize: 24, fontWeight: 700, color: '#2a3439', margin: 0, fontFamily: 'Manrope, sans-serif' }}>12</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: '#566166' }}>Last 24 hours</p>
            <p style={{ fontSize: 10, color: '#566166', margin: '4px 0 0 0' }}>Audit log is up-to-date</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
