// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const data = [
  { id:1, name:'Elena Vance', email:'elena.v@example.com', country:'United States', tenure:'2.4 years', quality:98, qColor:'#006b62', karma:'1.2k', tasks:'1,420', appr:'99.2%', earnings:'$12,450.00', status:'Active', sBg:'#91feef', sColor:'#006259', risk:null },
  { id:2, name:'Julian Thorne', email:'j.thorne@network.org', country:'Germany', tenure:'8 months', quality:42, qColor:'#9f403d', karma:'12', tasks:'45', appr:'65.0%', earnings:'$210.50', status:'High Risk', sBg:'#fe8983', sColor:'#752121', risk:'DUPLICATE ACCOUNT' },
  { id:3, name:'Amara Okafor', email:'amara.o@global.com', country:'Nigeria', tenure:'1.5 years', quality:89, qColor:'#2d6197', karma:'840', tasks:'812', appr:'94.5%', earnings:'$6,120.75', status:'Pending Review', sBg:'#d5e3fc', sColor:'#455367', risk:null },
  { id:4, name:'Liam Chen', email:'l.chen@techmail.io', country:'Taiwan', tenure:'3.1 years', quality:96, qColor:'#006b62', karma:'2.1k', tasks:'2,550', appr:'98.8%', earnings:'$22,890.00', status:'Active', sBg:'#91feef', sColor:'#006259', risk:null },
];

const th = { padding:'16px 24px', fontSize:10, fontWeight:700, color:'#566166', textTransform:'uppercase', letterSpacing:'0.05em', textAlign:'left', fontFamily:'Inter,sans-serif' };
const ms = { fontFamily:'Material Symbols Outlined' };

function PgBtn({ children }) {
  return <button style={{ width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',background:'transparent',color:'#2a3439',border:'none',borderRadius:8,fontSize:12,fontWeight:700,cursor:'pointer' }} onMouseEnter={e=>e.currentTarget.style.background='#e8eff3'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>{children}</button>;
}

export default function ContributorList() {
  const router = useRouter();
  const [qMin, setQMin] = useState(85);
  const [riskOnly, setRiskOnly] = useState(false);

  return (
    <div style={{ maxWidth:1600, margin:'0 auto' }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24, flexWrap:'wrap', gap:12 }}>
        <div>
          <h1 style={{ fontSize:24, fontWeight:800, color:'#2a3439', margin:0, fontFamily:'Manrope,sans-serif' }}>Contributors</h1>
          <p style={{ fontSize:13, color:'#566166', margin:'4px 0 0', fontFamily:'Inter,sans-serif' }}>Managing the global data architect network</p>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
          <button style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 16px', background:'#e1e9ee', color:'#455367', border:'none', borderRadius:8, fontSize:13, fontWeight:500, cursor:'pointer' }}>
            <span style={{...ms,fontSize:18}}>upload_file</span>Import CSV
          </button>
          <button onClick={()=>nav('/admin/contributors/add')} style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 16px', background:'#2d6197', color:'#fff', border:'none', borderRadius:8, fontSize:13, fontWeight:700, cursor:'pointer' }}>
            <span style={{...ms,fontSize:18}}>add</span>Add Contributor
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <section style={{ background:'#f0f4f7', borderRadius:12, padding:24, marginBottom:32 }}>
        <div style={{ display:'flex', gap:16, flexWrap:'wrap', alignItems:'flex-end', marginBottom:16 }}>
          <div style={{ flex:1, minWidth:240 }}>
            <label style={{ display:'block', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em', color:'#566166', marginBottom:8 }}>Search Contributor</label>
            <div style={{ position:'relative' }}>
              <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', ...ms, fontSize:18, color:'#a9b4b9' }}>search</span>
              <input type="text" placeholder="Name or email address..." style={{ width:'100%', padding:'10px 12px 10px 40px', background:'#fff', border:'none', borderRadius:8, fontSize:13 }}/>
            </div>
          </div>
          <div style={{ width:160, minWidth:120, flex:'1 1 120px' }}>
            <label style={{ display:'block', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em', color:'#566166', marginBottom:8 }}>Country</label>
            <select style={{ width:'100%', padding:'10px 12px', background:'#fff', border:'none', borderRadius:8, fontSize:13, color:'#566166' }}>
              <option>All Countries</option><option>United States</option><option>Germany</option><option>India</option>
            </select>
          </div>
          <div style={{ width:160, minWidth:120, flex:'1 1 120px' }}>
            <label style={{ display:'block', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em', color:'#566166', marginBottom:8 }}>Status</label>
            <select style={{ width:'100%', padding:'10px 12px', background:'#fff', border:'none', borderRadius:8, fontSize:13, color:'#566166' }}>
              <option>Any Status</option><option>Active</option><option>Pending</option><option>Suspended</option>
            </select>
          </div>
        </div>
        <div style={{ display:'flex', gap:24, alignItems:'center', flexWrap:'wrap' }}>
          <div style={{ width:256 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
              <label style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em', color:'#566166' }}>Quality Score (Min)</label>
              <span style={{ fontSize:12, fontWeight:700, color:'#2d6197' }}>{qMin}%</span>
            </div>
            <input type="range" min="0" max="100" value={qMin} onChange={e=>setQMin(e.target.value)} style={{ width:'100%', height:6, borderRadius:999, appearance:'none', background:`linear-gradient(to right,#2d6197 ${qMin}%,#d9e4ea ${qMin}%)`, cursor:'pointer' }}/>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ fontSize:14, fontWeight:500, color:'#2a3439' }}>Risk Flag Only</span>
            <button onClick={()=>setRiskOnly(!riskOnly)} style={{ position:'relative', width:44, height:24, borderRadius:12, background:riskOnly?'#2d6197':'#d9e4ea', border:'none', cursor:'pointer' }}>
              <span style={{ position:'absolute', top:2, left:riskOnly?22:2, width:20, height:20, borderRadius:'50%', background:'#fff', transition:'left 0.2s', boxShadow:'0 1px 3px rgba(0,0,0,0.15)' }}/>
            </button>
          </div>
          <button style={{ padding:10, background:'#d9e4ea', border:'none', borderRadius:8, cursor:'pointer', color:'#566166' }}><span style={{...ms,fontSize:22}}>filter_list</span></button>
        </div>
      </section>

      {/* Table */}
      <div style={{ background:'#fff', borderRadius:12, overflow:'hidden', boxShadow:'0 8px 24px rgba(42,52,57,0.04)' }}>
        <div className="mobile-table-wrap">
        <table style={{ width:'100%', borderCollapse:'collapse', minWidth:900 }}>
          <thead><tr style={{ background:'rgba(232,239,243,0.5)' }}>
            <th style={th}>Contributor</th>
            <th style={th}>Account Stats</th>
            <th style={th}>Performance</th>
            <th style={{...th,textAlign:'center'}}>Tasks</th>
            <th style={{...th,textAlign:'right'}}>Earnings</th>
            <th style={th}>Status &amp; Risk</th>
            <th style={{...th,textAlign:'right'}}>Actions</th>
          </tr></thead>
          <tbody>
            {data.map(c=>(
              <tr key={c.id} style={{ borderTop:'1px solid rgba(232,239,243,0.5)', background:c.risk?'rgba(254,137,131,0.05)':'transparent' }}
                onMouseEnter={e=>{e.currentTarget.style.background=c.risk?'rgba(254,137,131,0.08)':'#f7f9fb'}}
                onMouseLeave={e=>{e.currentTarget.style.background=c.risk?'rgba(254,137,131,0.05)':'transparent'}}>
                <td style={{ padding:'20px 24px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <img src={`https://ui-avatars.com/api/?name=${c.name.replace(' ','+')}&background=random&size=80`} alt="" style={{ width:40, height:40, borderRadius:'50%' }}/>
                    <div>
                      <p style={{ fontSize:14, fontWeight:700, color:'#2a3439', margin:0 }}>{c.name}</p>
                      <p style={{ fontSize:12, color:'#566166', margin:0 }}>{c.email}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding:'20px 24px' }}>
                  <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#566166' }}><span style={{...ms,fontSize:14}}>public</span>{c.country}</div>
                    <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#566166' }}><span style={{...ms,fontSize:14}}>calendar_today</span>{c.tenure}</div>
                  </div>
                </td>
                <td style={{ padding:'20px 24px' }}>
                  <div style={{ width:128 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                      <span style={{ fontSize:10, fontWeight:700, color:c.qColor }}>{c.quality}% Quality</span>
                      <span style={{ fontSize:10, fontWeight:500, color:'#566166' }}>Karma: {c.karma}</span>
                    </div>
                    <div style={{ height:6, background:'#e8eff3', borderRadius:999 }}>
                      <div style={{ height:'100%', width:`${c.quality}%`, background:c.qColor, borderRadius:999 }}/>
                    </div>
                  </div>
                </td>
                <td style={{ padding:'20px 24px', textAlign:'center' }}>
                  <span style={{ fontSize:14, fontWeight:600, color:'#2a3439' }}>{c.tasks}</span>
                  <p style={{ fontSize:10, color:'#566166', margin:0 }}>{c.appr} Appr.</p>
                </td>
                <td style={{ padding:'20px 24px', textAlign:'right', fontWeight:700, color:'#2a3439', fontFamily:'Manrope,sans-serif' }}>{c.earnings}</td>
                <td style={{ padding:'20px 24px' }}>
                  <div style={{ display:'flex', flexDirection:'column', gap:4, alignItems:'flex-start' }}>
                    <span style={{ padding:'4px 10px', borderRadius:9999, background:c.sBg, color:c.sColor, fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em' }}>{c.status}</span>
                    {c.risk&&<span style={{ fontSize:9, fontWeight:700, color:'#9f403d', display:'flex', alignItems:'center', gap:4 }}><span style={{...ms,fontSize:10,fontVariationSettings:"'FILL' 1"}}>report</span>{c.risk}</span>}
                  </div>
                </td>
                <td style={{ padding:'20px 24px', textAlign:'right' }}>
                  <div style={{ display:'flex', justifyContent:'flex-end', gap:4 }}>
                    <button onClick={()=>nav(`/admin/contributors/${c.id}`)} style={{ padding:6, background:'transparent', border:'none', cursor:'pointer', color:'#566166', borderRadius:4 }}><span style={{...ms,fontSize:20}}>visibility</span></button>
                    <button style={{ padding:6, background:'transparent', border:'none', cursor:'pointer', color:'#566166', borderRadius:4 }}><span style={{...ms,fontSize:20}}>edit</span></button>
                    <button style={{ padding:6, background:'transparent', border:'none', cursor:'pointer', color:'#9f403d', borderRadius:4 }}><span style={{...ms,fontSize:20}}>{c.risk?'block':'flag'}</span></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {/* Pagination */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px', background:'rgba(232,239,243,0.2)', borderTop:'1px solid #e8eff3', flexWrap:'wrap', gap:12 }}>
          <p style={{ fontSize:12, color:'#566166', margin:0 }}>Showing <span style={{ fontWeight:700, color:'#2a3439' }}>1 - 25</span> of <span style={{ fontWeight:700, color:'#2a3439' }}>1,240</span> contributors</p>
          <div style={{ display:'flex', alignItems:'center', gap:4 }}>
            <button style={{ padding:8, background:'transparent', border:'none', cursor:'pointer', color:'#a9b4b9' }}><span style={{...ms,fontSize:22}}>chevron_left</span></button>
            <button style={{ width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',background:'#2d6197',color:'#fff',border:'none',borderRadius:8,fontSize:12,fontWeight:700,cursor:'pointer' }}>1</button>
            <PgBtn>2</PgBtn><PgBtn>3</PgBtn>
            <span style={{ padding:'0 8px', color:'#a9b4b9' }}>...</span>
            <PgBtn>50</PgBtn>
            <button style={{ padding:8, background:'transparent', border:'none', cursor:'pointer', color:'#566166' }}><span style={{...ms,fontSize:22}}>chevron_right</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}
