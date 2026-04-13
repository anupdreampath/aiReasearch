'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ms = { fontFamily: 'Material Symbols Outlined' };

const mockTemplates = [
  {
    id: 1,
    name: 'Submission Confirmation',
    subject: 'Your definition for {{word}} has been received!',
    status: 'Active',
    lastEdited: '2 days ago',
    description: 'Sent after a contributor submits a word definition.',
    body: `Hi {{contributor_name}},

Thank you for your submission for the word: **{{word}}**. 

Our editorial team has received your definition: 
*"{{definition}}"*

We will review your submission by **{{due_date}}**. You can track the status of this word and view other pending tasks at your dashboard here: 
{{submission_url}}

Best regards,
The Sentimental Grid Editorial Team`,
  },
  {
    id: 2,
    name: 'Monthly Finance Report',
    subject: 'Your monthly earnings summary',
    status: 'Inactive',
    lastEdited: 'Oct 12, 2023',
    description: 'Summary of monthly earnings for top contributors.',
    body: `Dear {{contributor_name}},

Your earnings for this month: **{{payment_amount}}**

Total submissions: {{total_submissions}}
Approved: {{approved_count}}

View full details at: {{dashboard_url}}

Regards,
Finance Team`,
  },
  {
    id: 3,
    name: 'Payment Disbursed',
    subject: 'Payment processed successfully',
    status: 'Active',
    lastEdited: '5 days ago',
    description: 'Triggered when a payment batch is processed successfully.',
    body: `Hi {{contributor_name}},

Your payment of **{{payment_amount}}** has been processed.

Method: {{payment_method}}
Reference: {{payment_reference}}

Thank you for your contributions.

Finance Team`,
  },
  {
    id: 4,
    name: 'Verification Needed',
    subject: 'New verification task assigned',
    status: 'Active',
    lastEdited: '1 week ago',
    description: 'Alert for editors regarding new pending verification tasks.',
    body: `Hi {{editor_name}},

A new word requires verification: **{{word}}**

Priority: {{priority_level}}
Deadline: {{due_date}}

Please review at your earliest convenience.

Admin Team`,
  },
];

const placeholders = [
  { code: 'contributor_name', description: "Recipient's full name" },
  { code: 'word', description: 'The specific dictionary term' },
  { code: 'definition', description: 'Text of the submitted definition' },
  { code: 'due_date', description: 'Review completion deadline' },
  { code: 'submission_url', description: 'Link to contributor dashboard' },
  { code: 'payment_amount', description: 'Assigned reward value' },
];

export default function EmailTemplates() {
  const router = useRouter();
  const [selected, setSelected] = useState(mockTemplates[0]);
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState(mockTemplates[0].subject);
  const [body, setBody] = useState(mockTemplates[0].body);

  const handleTemplateSelect = (template) => {
    setSelected(template);
    setSubject(template.subject);
    setBody(template.body);
  };

  const filteredTemplates = mockTemplates.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: 'calc(100vh - 80px)', margin: '-24px' }}>
      {/* Left: Template List */}
      <div style={{ flex: '1 1 280px', minWidth: 280, background: '#f0f4f7', overflowY: 'auto', padding: 24, borderRight: '1px solid rgba(169,180,185,0.3)' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', ...ms, fontSize: 18, color: '#a9b4b9' }}>search</span>
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 12px 10px 40px', background: '#ffffff', border: 'none', borderRadius: 8, fontSize: 13 }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              style={{
                padding: 16,
                background: selected.id === template.id ? '#ffffff' : '#f7f9fb',
                borderRadius: 12,
                cursor: 'pointer',
                borderLeft: selected.id === template.id ? '4px solid #2d6197' : '4px solid transparent',
                boxShadow: selected.id === template.id ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: '#2a3439', margin: 0 }}>{template.name}</h4>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: 9999,
                  background: template.status === 'Active' ? '#91feef' : '#e8eff3',
                  color: template.status === 'Active' ? '#006259' : '#566166',
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}>
                  {template.status}
                </span>
              </div>
              <p style={{ fontSize: 12, color: '#566166', margin: '0 0 12px 0' }}>{template.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: 11, color: '#a9b4b9', fontWeight: 500 }}>
                <span style={{ ...ms, fontSize: 14, marginRight: 4 }}>schedule</span>
                Last edited: {template.lastEdited}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Template Editor */}
      <div style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', background: '#f7f9fb' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: 32 }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {/* Form Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24, marginBottom: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Template Name</label>
                <input
                  type="text"
                  value={selected.name}
                  readOnly
                  style={{ width: '100%', padding: '12px 16px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, color: '#2a3439' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Subject Line</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', background: '#f0f4f7', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, color: '#2a3439' }}
                />
              </div>
            </div>

            {/* Editor */}
            <div style={{ marginBottom: 32 }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: '#566166', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>Email Body</label>
              <div style={{ border: '1px solid rgba(169,180,185,0.2)', borderRadius: 12, overflow: 'hidden', background: '#ffffff' }}>
                {/* Toolbar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 16px', borderBottom: '1px solid rgba(169,180,185,0.1)', background: 'rgba(232,239,243,0.3)' }}>
                  <button style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6, color: '#566166' }}>
                    <span style={{ ...ms, fontSize: 20 }}>format_bold</span>
                  </button>
                  <button style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6, color: '#566166' }}>
                    <span style={{ ...ms, fontSize: 20 }}>format_italic</span>
                  </button>
                  <button style={{ padding: 6, background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6, color: '#566166' }}>
                    <span style={{ ...ms, fontSize: 20 }}>link</span>
                  </button>
                  <div style={{ width: 1, height: 24, background: '#d9e4ea', margin: '0 8px' }} />
                  <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6, color: '#2d6197', fontSize: 12, fontWeight: 600 }}>
                    <span style={{ ...ms, fontSize: 18 }}>add_circle</span>
                    Insert Variable
                  </button>
                </div>
                {/* Content */}
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: 350,
                    padding: 24,
                    border: 'none',
                    background: '#ffffff',
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: '#2a3439',
                    resize: 'vertical',
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
              </div>
            </div>

            {/* Placeholders */}
            <div style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#2a3439', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ ...ms, fontSize: 18, color: '#2d6197' }}>info</span>
                Available Placeholders
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                {placeholders.map((ph) => (
                  <div key={ph.code} style={{ padding: 12, background: '#f0f4f7', borderRadius: 8, cursor: 'pointer' }}>
                    <code style={{ fontSize: 12, fontWeight: 600, color: '#2d6197', display: 'block', marginBottom: 4 }}>{ph.code}</code>
                    <span style={{ fontSize: 10, color: '#566166' }}>{ph.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ padding: '24px 32px', background: 'rgba(232,239,243,0.5)', borderTop: '1px solid rgba(169,180,185,0.2)', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 16 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', color: '#2d6197', background: 'transparent', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            <span style={{ ...ms, fontSize: 16 }}>send</span>
            Send Test Email
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 32px', background: '#2d6197', color: '#f5f7ff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(45,97,151,0.2)' }}>
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
}
