
import React from 'react';
import { PageType } from '../types';
import { ICONS } from '../constants';
import { ImageWithFallback } from './UI';

interface LayoutProps {
  children: React.ReactNode;
  activePage: PageType;
  setActivePage: (page: PageType) => void;
  unreadCount: number;
  logo?: string | null;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, setActivePage, unreadCount, logo }) => {
  const NavItem = ({ page, label, icon: Icon }: { page: PageType, label: string, icon: React.FC }) => (
    <button
      onClick={() => setActivePage(page)}
      className={`flex flex-col items-center justify-center space-y-1 transition-all px-1 py-3 flex-1 outline-none ${
        activePage === page ? 'text-gold' : 'text-white/30 hover:text-white/50'
      }`}
    >
      <Icon />
      <span className="text-[8px] font-black uppercase tracking-widest text-center truncate w-full">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col max-w-5xl mx-auto md:shadow-2xl md:my-8 bg-[#EFE6D6] md:rounded-3xl overflow-hidden relative border-x border-border">
      {/* Header - Navy (#0F2233) */}
      <header className="bg-navy px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg border-b border-white/5">
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActivePage('home')}>
          <div className="w-10 h-10 rounded-full border border-gold/40 bg-white flex items-center justify-center shadow-md overflow-hidden group-active:opacity-80 transition-opacity">
            <ImageWithFallback src={logo || "/brand/logo.png"} alt="Logo" className="w-8 h-8 object-contain" />
          </div>
          <div>
            <h1 className="text-gold text-lg leading-tight uppercase tracking-widest font-black">Polo Park East</h1>
            <p className="text-white/30 text-[9px] uppercase font-black tracking-widest">55+ Golf Community</p>
          </div>
        </div>
        
        <button 
          onClick={() => setActivePage('admin')}
          className="text-white/20 hover:text-white/60 transition-colors text-[9px] uppercase font-black tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
        >
          Admin
        </button>
      </header>

      {/* Main Content Area - Light Tan Background (#EFE6D6) */}
      <main className="flex-1 overflow-y-auto px-5 py-6 md:px-10 bg-[#EFE6D6] hide-scrollbar relative">
        {children}
      </main>

      {/* Mobile Bottom Navigation - Navy (#0F2233) */}
      <nav className="bottom-nav md:static bg-navy px-1 md:px-4 flex justify-between items-center max-w-5xl mx-auto w-full h-[80px] shadow-[0_-8px_20px_rgba(0,0,0,0.3)] border-t border-white/5">
        <NavItem page="home" label="Home" icon={ICONS.Home} />
        <NavItem page="events" label="Events" icon={ICONS.Calendar} />
        <NavItem page="amenities" label="Amenities" icon={ICONS.Golf} />
        <NavItem page="directory" label="Neighbors" icon={ICONS.User} />
        <NavItem page="forum" label="Forum" icon={ICONS.Chat} />
        <NavItem page="ai" label="Concierge" icon={() => (
           <div className={`p-1.5 rounded-full border transition-all w-9 h-9 flex items-center justify-center ${activePage === 'ai' ? 'bg-gold border-gold' : 'bg-white/5 border-white/10'}`}>
             <svg className={`w-4 h-4 ${activePage === 'ai' ? 'text-navy' : 'text-white/30'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
           </div>
        )} />
      </nav>
    </div>
  );
};

export default Layout;
