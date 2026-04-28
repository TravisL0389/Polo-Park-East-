
import React, { useState, useEffect } from 'react';

export const ImageWithFallback: React.FC<React.ImgHTMLAttributes<HTMLImageElement> & { fallback?: string }> = ({ src, fallback = 'https://via.placeholder.com/400x300?text=Polo+Park+East', ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <img
      {...props}
      src={imgSrc}
      onError={() => {
        if (imgSrc !== fallback) setImgSrc(fallback);
      }}
    />
  );
};

export const BubbleTile: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className, onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-bubble shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-border p-4 transition-all duration-200 ${onClick ? 'cursor-pointer active:opacity-70 active:shadow-none' : ''} ${className}`}
  >
    {children}
  </div>
);

export const GoldBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="bg-gold text-navy text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-black/5 shadow-sm">
    {children}
  </span>
);

export const Title: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <h2 className={`text-2xl text-heading font-bold mb-4 ${className}`}>{children}</h2>
);

export const SectionHeader: React.FC<{ title: string, subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold text-heading tracking-tight uppercase tracking-widest">{title}</h2>
    {subtitle && <p className="text-bodyText text-xs mt-1 font-medium">{subtitle}</p>}
  </div>
);

export const Button: React.FC<{ 
  children: React.ReactNode, 
  variant?: 'primary' | 'secondary' | 'outline',
  onClick?: () => void,
  className?: string,
  disabled?: boolean
}> = ({ children, variant = 'primary', onClick, className, disabled }) => {
  const variants = {
    primary: 'bg-gold text-navy shadow-sm active:bg-goldPressed active:opacity-90',
    secondary: 'bg-navy text-white shadow-sm active:opacity-80',
    outline: 'bg-white border border-border text-navy active:bg-tan/20'
  };

  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={`px-6 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export const Modal: React.FC<{ isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl overflow-hidden animate-slideUp">
        <div className="p-6 border-b border-border flex justify-between items-center bg-[#F8FAFC]">
          <h3 className="text-xl font-bold text-heading tracking-tight">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-tan/20 rounded-full text-bodyText">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh] hide-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Toast: React.FC<{ message: string, visible: boolean, onHide: () => void }> = ({ message, visible, onHide }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] bg-navy text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-white/10 animate-bounceIn">
      <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
      <span className="text-xs font-black uppercase tracking-widest">{message}</span>
    </div>
  );
};
