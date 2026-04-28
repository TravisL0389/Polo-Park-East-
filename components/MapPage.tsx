import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { MapLocation } from '../types';
import { MOCK_MAP_LOCATIONS } from '../constants';
import { SectionHeader, BubbleTile, GoldBadge } from './UI';
import { MapPin, Home, Info } from 'lucide-react';

export const MapPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [filter, setFilter] = useState<'all' | 'amenity' | 'home'>('all');

  const filteredLocations = MOCK_MAP_LOCATIONS.filter(loc => filter === 'all' || loc.type === filter);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <SectionHeader title="Community Map" />
      
      <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar pb-2">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${filter === 'all' ? 'bg-navy text-white' : 'bg-white text-navy border border-border'}`}
        >
          All Locations
        </button>
        <button 
          onClick={() => setFilter('amenity')}
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${filter === 'amenity' ? 'bg-navy text-white' : 'bg-white text-navy border border-border'}`}
        >
          Amenities
        </button>
        <button 
          onClick={() => setFilter('home')}
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${filter === 'home' ? 'bg-navy text-white' : 'bg-white text-navy border border-border'}`}
        >
          Available Homes
        </button>
      </div>

      <div className="flex-1 relative bg-white rounded-bubble overflow-hidden shadow-lg border-4 border-white min-h-[400px]">
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          centerOnInit
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <button onClick={() => zoomIn()} className="bg-white p-2 rounded-full shadow-md text-navy hover:bg-gray-50">+</button>
                <button onClick={() => zoomOut()} className="bg-white p-2 rounded-full shadow-md text-navy hover:bg-gray-50">-</button>
                <button onClick={() => resetTransform()} className="bg-white p-2 rounded-full shadow-md text-navy hover:bg-gray-50">↺</button>
              </div>
              <TransformComponent wrapperClass="w-full h-full" contentClass="w-full h-full min-h-[400px] min-w-[800px] relative bg-[#e5e7eb]">
                {/* Background Map Image or SVG representation */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#0F2233 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                {/* Roads */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 800">
                  <path d="M 100 400 L 900 400 M 500 100 L 500 700 M 200 100 L 200 700 M 800 100 L 800 700" stroke="#cbd5e1" strokeWidth="20" strokeLinecap="round" />
                  <text x="850" y="390" fill="#94a3b8" fontSize="12" fontWeight="bold">Main Blvd</text>
                  <text x="510" y="150" fill="#94a3b8" fontSize="12" fontWeight="bold">Clubhouse Dr</text>
                </svg>

                {filteredLocations.map(loc => {
                  if (loc.type === 'home' && !loc.available && filter !== 'all') return null;
                  
                  return (
                    <div 
                      key={loc.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 ${selectedLocation?.id === loc.id ? 'z-20 scale-125' : 'z-10'}`}
                      style={{ left: loc.x, top: loc.y }}
                      onClick={() => setSelectedLocation(loc)}
                    >
                      {loc.type === 'amenity' ? (
                        <div className="bg-navy text-gold p-2 rounded-full shadow-lg border-2 border-white">
                          <MapPin size={24} />
                        </div>
                      ) : (
                        <div className={`${loc.available ? 'bg-green-600' : 'bg-gray-400'} text-white p-2 rounded-full shadow-lg border-2 border-white`}>
                          <Home size={20} />
                        </div>
                      )}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded text-[10px] font-bold text-navy whitespace-nowrap shadow-sm border border-gray-100">
                        {loc.name}
                      </div>
                    </div>
                  );
                })}
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>

      {selectedLocation && (
        <BubbleTile className="animate-fadeIn mt-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-heading">{selectedLocation.name}</h3>
            {selectedLocation.type === 'home' && selectedLocation.available && (
              <GoldBadge>For Sale</GoldBadge>
            )}
            {selectedLocation.type === 'amenity' && (
              <GoldBadge>Amenity</GoldBadge>
            )}
          </div>
          {selectedLocation.description && (
            <p className="text-sm text-bodyText mb-4">{selectedLocation.description}</p>
          )}
          <div className="flex items-center text-xs text-navy/60 font-bold uppercase tracking-wider">
            <Info size={14} className="mr-1" />
            {selectedLocation.type === 'home' ? 'Residential Property' : 'Community Facility'}
          </div>
        </BubbleTile>
      )}
    </div>
  );
};
