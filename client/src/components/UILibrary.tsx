/**
 * 💎 UI COMPONENT LIBRARY
 * Production-grade, reusable UI components for the entire platform
 */

import React from 'react';

// ─── Card Component ───────────────────────────────────────────────
export interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ title, description, children, className = '', onClick }) => (
  <div
    onClick={onClick}
    className={`bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition cursor-pointer ${className}`}
  >
    {title && <h3 className="text-white font-bold mb-2">{title}</h3>}
    {description && <p className="text-slate-400 text-sm mb-4">{description}</p>}
    {children}
  </div>
);

// ─── Button Component ─────────────────────────────────────────────
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-100',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${sizes[size]} font-bold rounded-lg transition disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

// ─── Input Component ──────────────────────────────────────────────
export interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  disabled?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  type = 'text',
  disabled = false,
  className = '',
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange?.(e.target.value)}
    disabled={disabled}
    className={`bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 disabled:opacity-50 ${className}`}
  />
);

// ─── Modal Component ──────────────────────────────────────────────
export interface ModalProps {
  isOpen: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// ─── Table Component ──────────────────────────────────────────────
export interface TableProps {
  headers: string[];
  rows: (string | number | React.ReactNode)[][];
  className?: string;
}

export const Table: React.FC<TableProps> = ({ headers, rows, className = '' }) => (
  <div className={`overflow-x-auto ${className}`}>
    <table className="w-full text-slate-300">
      <thead>
        <tr className="border-b border-slate-700">
          {headers.map((header, idx) => (
            <th key={idx} className="text-left py-3 px-4 font-bold">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIdx) => (
          <tr key={rowIdx} className="border-b border-slate-700 hover:bg-slate-700">
            {row.map((cell, cellIdx) => (
              <td key={cellIdx} className="py-3 px-4">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Stat Card Component ──────────────────────────────────────────
export interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, change, icon }) => (
  <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
    <div className="flex items-center justify-between mb-2">
      <p className="text-slate-400 text-sm">{label}</p>
      {icon && <span className="text-2xl">{icon}</span>}
    </div>
    <p className="text-white text-3xl font-bold">{value}</p>
    {change !== undefined && (
      <p className={`text-sm mt-2 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {change >= 0 ? '+' : ''}{change}%
      </p>
    )}
  </div>
);

// ─── Alert Component ──────────────────────────────────────────────
export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
}

export const Alert: React.FC<AlertProps> = ({ type = 'info', title, message }) => {
  const colors = {
    info: 'bg-blue-900 border-blue-700 text-blue-100',
    success: 'bg-green-900 border-green-700 text-green-100',
    warning: 'bg-yellow-900 border-yellow-700 text-yellow-100',
    error: 'bg-red-900 border-red-700 text-red-100',
  };

  return (
    <div className={`rounded-lg p-4 border ${colors[type]}`}>
      {title && <p className="font-bold mb-1">{title}</p>}
      <p>{message}</p>
    </div>
  );
};

// ─── Loading Spinner ──────────────────────────────────────────────
export const Spinner: React.FC = () => (
  <div className="flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
  </div>
);

// ─── Badge Component ──────────────────────────────────────────────
export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-slate-700 text-slate-100',
    success: 'bg-green-700 text-green-100',
    warning: 'bg-yellow-700 text-yellow-100',
    error: 'bg-red-700 text-red-100',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
};

// ─── Tabs Component ───────────────────────────────────────────────
export interface TabsProps {
  tabs: Array<{ label: string; content: React.ReactNode }>;
}

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div>
      <div className="flex gap-2 border-b border-slate-700 mb-4">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 font-semibold transition ${
              activeTab === idx
                ? 'border-b-2 border-blue-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[activeTab]?.content}</div>
    </div>
  );
};
