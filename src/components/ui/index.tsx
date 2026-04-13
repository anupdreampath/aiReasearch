'use client';

import React, { useState, ReactNode, CSSProperties, MouseEvent } from 'react';
import { Search, ChevronDown, X, Check, AlertCircle, Info, CheckCircle, XCircle, Loader } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// SENTIMENTAL GRID DESIGN SYSTEM + MAGIC MCP MODERN COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

const theme = {
  // Primary colors
  primary: '#2d6197',
  primaryContainer: '#d2e4ff',
  onPrimary: '#f5f7ff',
  onPrimaryContainer: '#1c5489',
  inversePrimary: '#92c1fe',
  primaryFixed: '#d2e4ff',
  primaryFixedDim: '#bad7ff',
  
  // Secondary colors
  secondary: '#526074',
  secondaryContainer: '#d5e3fc',
  onSecondary: '#f8f8ff',
  onSecondaryContainer: '#455367',
  onSecondaryFixed: '#324053',
  secondaryFixed: '#d5e3fc',
  secondaryFixedDim: '#c7d5ed',
  
  // Tertiary colors
  tertiary: '#006b62',
  tertiaryContainer: '#91feef',
  onTertiary: '#e2fff9',
  onTertiaryContainer: '#006259',
  onTertiaryFixed: '#004e47',
  tertiaryFixed: '#91feef',
  tertiaryFixedDim: '#83efe1',
  
  // Error colors
  error: '#9f403d',
  errorContainer: '#fe8983',
  onError: '#fff7f6',
  onErrorContainer: '#752121',
  
  // Surface colors
  background: '#f7f9fb',
  onBackground: '#2a3439',
  surface: '#f7f9fb',
  onSurface: '#2a3439',
  onSurfaceVariant: '#566166',
  surfaceVariant: '#d9e4ea',
  surfaceTint: '#2d6197',
  surfaceDim: '#cfdce3',
  surfaceBright: '#f7f9fb',
  surfaceContainer: '#e8eff3',
  surfaceContainerLow: '#f0f4f7',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerHigh: '#e1e9ee',
  surfaceContainerHighest: '#d9e4ea',
  inverseSurface: '#0b0f10',
  inverseOnSurface: '#9a9d9f',
  
  // Semantic colors
  success: '#006b62',
  danger: '#9f403d',
  warning: '#d97706',
  info: '#2d6197',
  
  // Outline
  outline: '#717c82',
  outlineVariant: '#a9b4b9',
  
  // Border Radius (from screenshot)
  radius: { 
    sm: '0.125rem',   // 2px
    md: '0.25rem',    // 4px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    full: '9999px' 
  },
  
  // Subtle shadows
  shadow: { 
    none: 'none',
    xs: '0 1px 2px rgba(42,52,57,0.04)',
    sm: '0 1px 3px rgba(42,52,57,0.06)', 
    md: '0 4px 6px rgba(42,52,57,0.04)',
  },
  
  // Typography
  font: {
    headline: "'Manrope', sans-serif",
    body: "'Inter', sans-serif",
  }
};

const glass = {
  light: { background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(20px) saturate(180%)', border: '1px solid rgba(255,255,255,0.3)' },
  card: { background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px) saturate(180%)', border: '1px solid rgba(255,255,255,0.4)' },
};

// MODERN BUTTON
interface ButtonProps {
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: any;
  iconRight?: any;
  onClick?: (e?: any) => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  style?: CSSProperties;
  [key: string]: any;
}
export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', icon, iconRight, onClick, disabled, className = '', type = 'button', loading }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const sizes = { sm: { padding: '6px 14px', fontSize: '12px', iconSize: 14 }, md: { padding: '9px 18px', fontSize: '13px', iconSize: 16 }, lg: { padding: '12px 24px', fontSize: '14px', iconSize: 18 } };
  const s = sizes[size];
  
  const variants = {
    primary: { 
      base: { background: theme.primary, color: theme.onPrimary }, 
      hover: { background: '#1d548a' },
    },
    secondary: { 
      base: { background: theme.secondaryContainer, color: theme.onSecondaryContainer }, 
      hover: { background: theme.secondaryFixedDim },
    },
    tertiary: { 
      base: { background: theme.tertiary, color: theme.onTertiary }, 
      hover: { background: '#005e56' },
    },
    ghost: { 
      base: { background: 'transparent', color: theme.onSurfaceVariant }, 
      hover: { background: theme.surfaceContainer },
    },
    danger: { 
      base: { background: theme.error, color: theme.onError }, 
      hover: { background: '#7a3329' },
    },
    outline: { 
      base: { background: 'transparent', color: theme.primary, border: `1px solid ${theme.outlineVariant}` }, 
      hover: { background: theme.primaryContainer },
    },
  };
  
  const v = variants[variant] || variants.primary;
  const stateStyle = isHovered ? (v.hover || v.base) : v.base;
  const disabledStyle = disabled || loading ? { opacity: 0.5, cursor: 'not-allowed' } : {};
  
  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={className} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onMouseDown={() => setIsPressed(true)} onMouseUp={() => setIsPressed(false)} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: s.padding, fontSize: s.fontSize, fontWeight: 600, borderRadius: theme.radius.full, border: 'none', cursor: disabled || loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)', whiteSpace: 'nowrap', ...v.base, ...stateStyle, ...disabledStyle }}>
      {loading ? <Loader size={s.iconSize} className="animate-spin" /> : icon && <span style={{ display: 'flex' }}>{React.cloneElement(icon as React.ReactElement<any>, { size: s.iconSize, strokeWidth: 2 })}</span>}
      {children}
      {!loading && iconRight && <span style={{ display: 'flex' }}>{React.cloneElement(iconRight as React.ReactElement<any>, { size: s.iconSize, strokeWidth: 2 })}</span>}
    </button>
  );
};

// MODERN BADGE
interface BadgeProps {
  children?: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'xs' | 'sm' | 'md';
  dot?: boolean;
  pulse?: boolean;
  [key: string]: any;
}
export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', size = 'sm', dot, pulse }) => {
  const variants = {
    default: { bg: theme.surfaceContainer, color: theme.onSurfaceVariant, border: theme.surfaceContainerHigh },
    primary: { bg: `${theme.primary}12`, color: theme.primary, border: `${theme.primary}30` },
    success: { bg: `${theme.success}12`, color: theme.success, border: `${theme.success}30` },
    danger: { bg: `${theme.danger}12`, color: theme.danger, border: `${theme.danger}30` },
    warning: { bg: 'rgba(217,119,6,0.12)', color: theme.warning, border: 'rgba(217,119,6,0.3)' },
    info: { bg: `${theme.info}12`, color: theme.info, border: `${theme.info}30` },
  };
  const v = variants[variant];
  const sizes = { xs: { padding: '2px 6px', fontSize: '10px' }, sm: { padding: '3px 8px', fontSize: '11px' }, md: { padding: '4px 10px', fontSize: '12px' } };
  const s = sizes[size];
  
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: s.padding, fontSize: s.fontSize, fontWeight: 600, borderRadius: theme.radius.full, background: v.bg, color: v.color, border: `1px solid ${v.border}`, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'inherit' }}>
      {dot && <span style={{ width: 5, height: 5, borderRadius: '50%', background: v.color, ...(pulse && { animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }) }} />}
      {children}
    </span>
  );
};

// GLASSMORPHISM CARD
interface CardProps {
  children?: ReactNode;
  className?: string;
  padding?: boolean;
  hover?: boolean;
  glass?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  [key: string]: any;
}
export const Card: React.FC<CardProps> = ({ children, className = '', padding = true, hover, glass: useGlass = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: theme.surfaceContainerLowest,
        borderRadius: theme.radius.xl,
        overflow: 'hidden',
        transition: 'all 0.15s ease',
        ...(padding ? { padding: '24px' } : {}),
        ...(hover && isHovered ? { background: theme.surfaceContainerLow } : {}),
      }}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  icon?: ReactNode;
  [key: string]: any;
}
export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, action, icon }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
      {icon && <div style={{ width: 32, height: 32, borderRadius: theme.radius.lg, background: theme.primaryContainer, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.primary }}>{icon}</div>}
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: theme.onSurface, margin: 0, fontFamily: theme.font.headline }}>{title}</h3>
        {subtitle && <p style={{ fontSize: '12px', color: theme.onSurfaceVariant, margin: '4px 0 0 0', fontFamily: theme.font.body }}>{subtitle}</p>}
      </div>
    </div>
    {action && <div>{action}</div>}
  </div>
);

// MODERN STAT CARD
interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative';
  icon?: ReactNode;
  [key: string]: any;
}
export const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType = 'positive', icon }) => {
  return (
    <div style={{ 
      background: theme.surfaceContainerLowest, 
      borderRadius: theme.radius.xl,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <div>
        <p style={{ 
          fontSize: '11px', 
          fontWeight: 500, 
          color: theme.onSurfaceVariant, 
          textTransform: 'uppercase', 
          letterSpacing: '0.05em',
          fontFamily: theme.font.body,
        }}>{title}</p>
        <h3 style={{ 
          fontSize: '30px', 
          fontWeight: 800, 
          color: theme.onSurface, 
          margin: '8px 0 0 0',
          fontFamily: theme.font.headline,
        }}>{value}</h3>
      </div>
      {change && (
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ 
            fontSize: '12px', 
            fontWeight: 700, 
            color: changeType === 'positive' ? theme.tertiary : theme.error,
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}>
            {changeType === 'positive' ? '↑' : '↓'} {change}
          </span>
        </div>
      )}
    </div>
  );
};

// MODERN INPUT
interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  icon?: ReactNode;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}
export const Input: React.FC<InputProps> = ({ label, placeholder, value, onChange, type = 'text', icon, error, hint, required, disabled, className = '' }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className={className}>
      {label && <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: theme.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>{label}{required && <span style={{ color: theme.danger }}> *</span>}</label>}
      <div style={{ position: 'relative' }}>
        {icon && <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: isFocused ? theme.primary : theme.onSurfaceVariant, display: 'flex', transition: 'color 0.15s' }}>{icon}</span>}
        <input type={type} value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} disabled={disabled} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} style={{ width: '100%', padding: icon ? '10px 12px 10px 40px' : '10px 12px', fontSize: '14px', color: theme.onSurface, background: isFocused ? theme.surfaceContainerLowest : theme.surfaceContainerLow, border: `1px solid ${error ? theme.danger : isFocused ? `${theme.primary}50` : 'transparent'}`, borderRadius: theme.radius.lg, outline: 'none', fontFamily: 'inherit', transition: 'all 0.2s', boxSizing: 'border-box', ...(disabled && { opacity: 0.6, cursor: 'not-allowed' }) }} />
      </div>
      {error && <p style={{ fontSize: '12px', color: theme.danger, margin: '4px 0 0 0' }}>{error}</p>}
      {hint && !error && <p style={{ fontSize: '12px', color: theme.onSurfaceVariant, margin: '4px 0 0 0' }}>{hint}</p>}
    </div>
  );
};

// TEXTAREA
interface TextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  rows?: number;
  error?: string;
  required?: boolean;
}
export const Textarea: React.FC<TextareaProps> = ({ label, placeholder, value, onChange, rows = 4, error, required }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div>
      {label && <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: theme.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>{label}{required && <span style={{ color: theme.danger }}> *</span>}</label>}
      <textarea value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} rows={rows} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} style={{ width: '100%', padding: '10px 12px', fontSize: '14px', color: theme.onSurface, background: isFocused ? theme.surfaceContainerLowest : theme.surfaceContainerLow, border: `1px solid ${error ? theme.danger : isFocused ? `${theme.primary}50` : 'transparent'}`, borderRadius: theme.radius.lg, outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', transition: 'all 0.2s' }} />
      {error && <p style={{ fontSize: '12px', color: theme.danger, margin: '4px 0 0 0' }}>{error}</p>}
    </div>
  );
};

// MODERN SELECT
interface SelectOption {
  value: string;
  label: string;
}
interface SelectProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: (string | SelectOption)[];
  placeholder?: string;
  required?: boolean;
  error?: string;
}
export const Select: React.FC<SelectProps> = ({ label, value, onChange, options = [], placeholder = 'Select...', required, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div>
      {label && <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: theme.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>{label}{required && <span style={{ color: theme.danger }}> *</span>}</label>}
      <div style={{ position: 'relative' }}>
        <select value={value} onChange={(e) => onChange?.(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} style={{ width: '100%', padding: '10px 36px 10px 12px', fontSize: '14px', color: value ? theme.onSurface : theme.onSurfaceVariant, background: isFocused ? theme.surfaceContainerLowest : theme.surfaceContainerLow, border: `1px solid ${error ? theme.danger : isFocused ? `${theme.primary}50` : 'transparent'}`, borderRadius: theme.radius.lg, outline: 'none', fontFamily: 'inherit', appearance: 'none', cursor: 'pointer', boxSizing: 'border-box', transition: 'all 0.2s' }}>
          <option value="">{placeholder}</option>
          {options.map((o: any) => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
        </select>
        <ChevronDown size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: theme.onSurfaceVariant, pointerEvents: 'none' }} />
      </div>
      {error && <p style={{ fontSize: '12px', color: theme.danger, margin: '4px 0 0 0' }}>{error}</p>}
    </div>
  );
};

// SEARCH BAR
interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  glass?: boolean;
  style?: CSSProperties;
}
export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = 'Search...', className = '', glass: useGlass = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className={className} style={{ position: 'relative', ...(useGlass && { background: glass.light.background, backdropFilter: glass.light.backdropFilter, borderRadius: theme.radius.full, border: glass.light.border }) }}>
      <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: isFocused ? theme.primary : theme.onSurfaceVariant, transition: 'color 0.15s' }} />
      <input value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} style={{ width: '100%', padding: useGlass ? '10px 12px 10px 40px' : '9px 12px 9px 36px', fontSize: '13px', color: theme.onSurface, background: useGlass ? 'transparent' : theme.surfaceContainerLow, border: `1px solid ${isFocused ? theme.primary : useGlass ? 'transparent' : theme.surfaceContainerLow}`, borderRadius: theme.radius.full, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'all 0.2s' }} />
    </div>
  );
};

// MODERN TABLE (Zebra Stripes - No Horizontal Lines)
interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => ReactNode;
}
interface TableProps {
  columns: TableColumn[];
  data: any[];
  onRowClick?: (row: any) => void;
  emptyMessage?: string;
}
export const Table: React.FC<TableProps> = ({ columns, data, onRowClick, emptyMessage = 'No data found' }) => {
  return (
    <div style={{ overflowX: 'auto', borderRadius: theme.radius.lg }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '13px' }}>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={col.key} style={{ padding: '12px 16px', textAlign: col.align || 'left', fontWeight: 600, color: theme.onSurfaceVariant, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap', background: theme.surfaceContainerLow, borderBottom: 'none', ...(idx === 0 && { borderRadius: '8px 0 0 0' }), ...(idx === columns.length - 1 && { borderRadius: '0 8px 0 0' }) }}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={columns.length} style={{ padding: '32px 16px', textAlign: 'center', color: theme.onSurfaceVariant }}>{emptyMessage}</td></tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} onClick={() => onRowClick?.(row)} style={{ cursor: onRowClick ? 'pointer' : 'default', transition: 'background 0.15s', background: i % 2 === 0 ? theme.surface : `${theme.surfaceContainerLow}50` }} onMouseEnter={(e) => { e.currentTarget.style.background = theme.surfaceContainer; }} onMouseLeave={(e) => { e.currentTarget.style.background = i % 2 === 0 ? theme.surface : `${theme.surfaceContainerLow}50`; }}>
                {columns.map((col) => <td key={col.key} style={{ padding: '12px 16px', color: theme.onSurface, verticalAlign: 'middle', textAlign: col.align || 'left', borderBottom: 'none' }}>{col.render ? col.render(row[col.key], row) : row[col.key]}</td>)}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// GLASSMORPHISM MODAL
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  footer?: ReactNode;
  glass?: boolean;
}
export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children, size = 'md', footer, glass: useGlass = true }) => {
  if (!open) return null;
  const sizes = { sm: 420, md: 560, lg: 720, xl: 900 };
  
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div style={{ position: 'relative', background: useGlass ? glass.card.background : theme.surface, backdropFilter: useGlass ? glass.card.backdropFilter : 'none', borderRadius: theme.radius.xl, border: useGlass ? glass.card.border : `1px solid ${theme.surfaceContainerLow}`, width: '100%', maxWidth: sizes[size], maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: theme.shadow.md, animation: 'fadeIn 0.2s ease' }}>
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${theme.surfaceContainerLow}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: theme.onSurface, margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: theme.radius.lg, border: 'none', background: theme.surfaceContainerLow, cursor: 'pointer', color: theme.onSurfaceVariant, transition: 'all 0.15s' }} onMouseEnter={(e) => { e.currentTarget.style.background = theme.surfaceContainer; e.currentTarget.style.color = theme.onSurface; }} onMouseLeave={(e) => { e.currentTarget.style.background = theme.surfaceContainerLow; e.currentTarget.style.color = theme.onSurfaceVariant; }}><X size={16} /></button>
        </div>
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>{children}</div>
        {footer && <div style={{ padding: '12px 24px', borderTop: `1px solid ${theme.surfaceContainerLow}`, display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>{footer}</div>}
      </div>
    </div>
  );
};

// MODERN ALERT
interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  message: ReactNode;
  onClose?: () => void;
  action?: ReactNode;
  [key: string]: any;
}
export const Alert: React.FC<AlertProps> = ({ type = 'info', title, message, onClose }) => {
  const styles = {
    info: { bg: `${theme.info}12`, border: `${theme.info}30`, icon: <Info size={18} color={theme.info} />, titleColor: theme.info },
    success: { bg: `${theme.success}12`, border: `${theme.success}30`, icon: <CheckCircle size={18} color={theme.success} />, titleColor: theme.success },
    warning: { bg: 'rgba(217,119,6,0.12)', border: 'rgba(217,119,6,0.3)', icon: <AlertCircle size={18} color={theme.warning} />, titleColor: theme.warning },
    danger: { bg: `${theme.danger}12`, border: `${theme.danger}30`, icon: <XCircle size={18} color={theme.danger} />, titleColor: theme.danger },
  };
  const s = styles[type];
  
  return (
    <div style={{ padding: '12px 16px', background: s.bg, border: `1px solid ${s.border}`, borderRadius: theme.radius.lg, display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <span style={{ flexShrink: 0, marginTop: 2 }}>{s.icon}</span>
      <div style={{ flex: 1 }}>
        {title && <p style={{ fontWeight: 600, fontSize: '13px', color: s.titleColor, margin: '0 0 4px 0' }}>{title}</p>}
        <p style={{ fontSize: '13px', color: theme.onSurface, margin: 0 }}>{message}</p>
      </div>
      {onClose && <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.onSurfaceVariant, padding: 0, display: 'flex' }}><X size={16} /></button>}
    </div>
  );
};

// MODERN TOGGLE
interface ToggleProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  label?: string;
}
export const Toggle: React.FC<ToggleProps> = ({ value, onChange, label }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', userSelect: 'none' }}>
      <div onClick={() => onChange?.(!value)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ width: 44, height: 24, borderRadius: theme.radius.full, background: value ? theme.primary : theme.surfaceContainerHigh, position: 'relative', transition: 'background 0.2s', flexShrink: 0, ...(isHovered && !value && { background: theme.surfaceContainer }) }}>
        <div style={{ width: 18, height: 18, borderRadius: '50%', background: theme.surface, position: 'absolute', top: 3, left: value ? 23 : 3, transition: 'left 0.2s cubic-bezier(0.4,0,0.2,1)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
      </div>
      {label && <span style={{ fontSize: '14px', color: theme.onSurface, fontWeight: 500 }}>{label}</span>}
    </label>
  );
};

// MODERN CHECKBOX
interface CheckboxProps {
  checked?: boolean;
  onChange?: (value: boolean) => void;
  label?: string;
}
export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', userSelect: 'none' }}>
      <div onClick={() => onChange?.(!checked)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ width: 20, height: 20, borderRadius: theme.radius.md, border: `2px solid ${checked ? theme.primary : isHovered ? theme.primary : theme.surfaceContainerHigh}`, background: checked ? theme.primary : theme.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s', flexShrink: 0 }}>
        {checked && <Check size={12} color={theme.onPrimary} strokeWidth={3} />}
      </div>
      {label && <span style={{ fontSize: '14px', color: theme.onSurface }}>{label}</span>}
    </label>
  );
};

// MODERN PROGRESS BAR
interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  glass?: boolean;
  style?: CSSProperties;
  [key: string]: any;
}
export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max = 100, color = theme.primary, size = 'md', label, glass: useGlass = false }) => {
  const pct = Math.min((value / max) * 100, 100);
  const heights = { sm: 4, md: 8, lg: 12 };
  
  return (
    <div>
      {label && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px', color: theme.onSurfaceVariant }}><span>{label}</span><span>{Math.round(pct)}%</span></div>}
      <div style={{ height: heights[size], background: useGlass ? `${theme.surfaceContainerHigh}50` : theme.surfaceContainerLow, borderRadius: theme.radius.full, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: theme.radius.full, transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)' }} />
      </div>
    </div>
  );
};

// MODERN AVATAR
interface AvatarProps {
  name: string;
  size?: number;
  color?: string;
  image?: string;
}
export const Avatar: React.FC<AvatarProps> = ({ name, size = 36, color = theme.primary, image }) => {
  const initials = name?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || '??';
  
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: image ? 'transparent' : `${color}20`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.35, fontWeight: 700, flexShrink: 0, border: `2px solid ${color}30`, overflow: 'hidden', ...(image && { backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }) }}>
      {!image && initials}
    </div>
  );
};

// MODERN TABS
interface Tab {
  id: string;
  label: string;
  count?: number;
}
interface TabsProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}
export const Tabs: React.FC<TabsProps> = ({ tabs, active, onChange }) => {
  return (
    <div style={{ display: 'flex', gap: '4px', background: theme.surfaceContainerLow, borderRadius: theme.radius.lg, padding: '4px' }}>
      {tabs.map((tab) => (
        <button key={tab.id} onClick={() => onChange(tab.id)} style={{ flex: 1, padding: '8px 16px', fontSize: '13px', fontWeight: 500, borderRadius: theme.radius.md, border: 'none', cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit', background: active === tab.id ? theme.surface : 'transparent', color: active === tab.id ? theme.onSurface : theme.onSurfaceVariant, boxShadow: active === tab.id ? theme.shadow.xs : 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          {tab.label}
          {tab.count !== undefined && <Badge variant={active === tab.id ? 'primary' : 'default'} size="xs">{tab.count}</Badge>}
        </button>
      ))}
    </div>
  );
};

// MODERN EMPTY STATE
interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  glass?: boolean;
}
export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action, glass: useGlass = false }) => {
  return (
    <div style={{ padding: '44px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', background: useGlass ? glass.card.background : 'transparent', backdropFilter: useGlass ? glass.card.backdropFilter : 'none', borderRadius: theme.radius.lg, border: useGlass ? glass.card.border : 'none' }}>
      <div style={{ width: 56, height: 56, borderRadius: theme.radius.xl, background: theme.surfaceContainerLow, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.onSurfaceVariant }}>{icon}</div>
      <div>
        <p style={{ fontWeight: 600, color: theme.onSurface, margin: '0 0 4px 0', fontSize: '16px' }}>{title}</p>
        {description && <p style={{ fontSize: '13px', color: theme.onSurfaceVariant, margin: 0 }}>{description}</p>}
      </div>
      {action}
    </div>
  );
};

// MODERN PAGE HEADER
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  breadcrumb?: ReactNode;
  glass?: boolean;
  [key: string]: any;
}
export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, action, breadcrumb, glass: useGlass = false }) => {
  return (
    <div style={{ marginBottom: '24px', ...(useGlass && { background: glass.card.background, backdropFilter: glass.card.backdropFilter, border: glass.card.border, borderRadius: theme.radius.lg, padding: '24px' }) }} className="animate-fade-in">
      {breadcrumb && <p style={{ fontSize: '12px', color: theme.onSurfaceVariant, margin: '0 0 4px 0' }}>{breadcrumb}</p>}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 0 }}>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: theme.onSurface, margin: 0, letterSpacing: '-0.02em' }}>{title}</h1>
          {subtitle && <p style={{ fontSize: '14px', color: theme.onSurfaceVariant, margin: '4px 0 0 0' }}>{subtitle}</p>}
        </div>
        {action && <div style={{ flexShrink: 0, maxWidth: '100%' }}>{action}</div>}
      </div>
    </div>
  );
};

// STATUS BADGE
interface StatusBadgeProps {
  status: string;
}
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const map = { active: 'success', inactive: 'default', paused: 'warning', completed: 'primary', draft: 'default', assigned: 'info', posted: 'primary', verified: 'success', paid: 'success', rejected: 'danger', pending: 'warning', approved: 'success', suspended: 'danger', failed: 'danger', investigating: 'warning', monitoring: 'warning', resolved: 'success', processing: 'info', cancelled: 'default' };
  const displayStatus = status?.charAt(0).toUpperCase() + status?.slice(1);
  return <Badge variant={map[status] || 'default'} dot pulse={status === 'processing' || status === 'pending'}>{displayStatus}</Badge>;
};

// MODERN DIVIDER
interface DividerProps {
  label?: string;
}
export const Divider: React.FC<DividerProps> = ({ label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '8px 0' }}>
    <div style={{ flex: 1, height: 1, background: theme.surfaceContainerLow }} />
    {label && <span style={{ fontSize: '10px', color: theme.onSurfaceVariant, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>}
    <div style={{ flex: 1, height: 1, background: theme.surfaceContainerLow }} />
  </div>
);

// MODERN SKELETON
interface SkeletonProps {
  width?: string | number;
  height?: number;
  rounded?: boolean;
  glass?: boolean;
}
export const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = 16, rounded = false, glass: useGlass = false }) => (
  <div style={{ width, height, borderRadius: rounded ? theme.radius.full : theme.radius.md, background: useGlass ? 'linear-gradient(90deg, rgba(226,232,240,0.5) 25%, rgba(203,213,225,0.5) 50%, rgba(226,232,240,0.5) 75%)' : 'linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
);

// THEME EXPORT
export { theme, glass };

// DEFAULT EXPORT
export default { Button, Badge, Card, CardHeader, StatCard, Input, Textarea, Select, SearchBar, Table, Modal, Alert, Toggle, Checkbox, ProgressBar, Avatar, Tabs, EmptyState, PageHeader, StatusBadge, Divider, Skeleton, theme, glass };

