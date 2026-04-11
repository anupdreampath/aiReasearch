// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Trash2, X, Plus } from 'lucide-react';
import { Card, CardHeader, Button, Input, Textarea, Select, Alert, PageHeader, Badge, Modal } from '../../../components/ui';
import { mockWords } from '../../../data/mockData';

export default function EditWord() {
  const { id } = useParams();
  const router = useRouter();
  const word = mockWords.find(w => w.id === parseInt(id)) || mockWords[0];
  const [form, setForm] = useState({ word: word.word, definition: word.definition, partOfSpeech: word.partOfSpeech, exampleUsage: word.exampleUsage || '', status: word.status, subreddits: [...(word.subreddits || [])] });
  const [sub, setSub] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const addSub = () => { if (sub.trim()) { set('subreddits', [...form.subreddits, sub.trim().startsWith('r/') ? sub.trim() : `r/${sub.trim()}`]); setSub(''); } };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSaved(true); setTimeout(() => router.push(`/admin/words/${id}`), 1000); }, 1000);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        breadcrumb={`Word Management / ${word.word} / Edit`}
        title={`Edit "${word.word}"`}
        subtitle="Modify this word's details, definition, or targeting"
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="ghost" icon={<Trash2 size={14} />} onClick={() => setDeleteModal(true)} style={{ color: '#EF4444' }}>Delete</Button>
            <Button variant="secondary" icon={<ArrowLeft size={14} />} onClick={() => router.push(`/admin/words/${id}`)}>Cancel</Button>
            <Button variant="primary" icon={<Save size={14} />} onClick={handleSave} loading={loading}>Save Changes</Button>
          </div>
        }
      />
      {saved && <div style={{ marginBottom: 16 }}><Alert type="success" message="Changes saved successfully!" /></div>}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <CardHeader title="Word Details" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Input label="Word" value={form.word} onChange={v => set('word', v)} required />
              <Textarea label="Definition" value={form.definition} onChange={v => set('definition', v)} rows={3} required />
              <Select label="Part of Speech" value={form.partOfSpeech} onChange={v => set('partOfSpeech', v)} options={['noun', 'verb', 'adjective', 'adverb', 'interjection']} required />
              <Textarea label="Example Usage" value={form.exampleUsage} onChange={v => set('exampleUsage', v)} rows={2} />
            </div>
          </Card>
          <Card>
            <CardHeader title="Status & Targeting" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Select label="Status" value={form.status} onChange={v => set('status', v)} options={[{ value: 'active', label: 'Active' }, { value: 'paused', label: 'Paused' }, { value: 'draft', label: 'Draft' }, { value: 'completed', label: 'Completed' }]} />
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#334155', marginBottom: 6 }}>Subreddits</label>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input value={sub} onChange={e => setSub(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSub()} placeholder="r/..." style={{ flex: 1, padding: '9px 12px', fontSize: 14, border: '1.5px solid #E2E8F0', borderRadius: 12, outline: 'none', fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor = '#4F46E5'} onBlur={e => e.target.style.borderColor = '#E2E8F0'} />
                  <Button variant="primary" size="sm" icon={<Plus size={13} />} onClick={addSub}>Add</Button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {form.subreddits.map(s => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: '#EEF2FF', borderRadius: 20, fontSize: 12, color: '#4F46E5' }}>
                      {s} <button onClick={() => set('subreddits', form.subreddits.filter(x => x !== s))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#818CF8', display: 'flex', padding: 0 }}><X size={10} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
        <Card>
          <CardHeader title="Word Stats" subtitle="Current performance" />
          {[{ label: 'Total Posts', value: word.postsCount, color: '#4F46E5' }, { label: 'Assigned Users', value: word.assignedCount, color: '#10B981' }, { label: 'Created', value: word.createdAt, color: '#64748B' }].map(s => (
            <div key={s.label} style={{ padding: '12px 0', borderBottom: '1px solid #F1F5F9' }}>
              <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{s.label}</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
            </div>
          ))}
          <div style={{ marginTop: 12 }}><Alert type="warning" message="Editing an active word will not affect existing assignments. New assignments will use updated details." /></div>
        </Card>
      </div>
      <Modal open={deleteModal} onClose={() => setDeleteModal(false)} title="Delete Word" size="sm"
        footer={<><Button variant="secondary" onClick={() => setDeleteModal(false)}>Cancel</Button><Button variant="danger" onClick={() => router.push('/admin/words')}>Delete Word</Button></>}>
        <Alert type="danger" title="This action cannot be undone" message={`Deleting "${word.word}" will remove all associated assignments and prevent new posts. Existing scraped data will be preserved.`} />
        <div style={{ marginTop: 16, padding: 12, background: '#F8FAFC', borderRadius: 12 }}>
          <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>⚠️ {word.postsCount} posts will be archived. {word.assignedCount} active assignments will be cancelled.</p>
        </div>
      </Modal>
    </div>
  );
}
