
import React from 'react';
import { Announcement, Event, Amenity, Resident, ForumTopic, FAQ, Rule, MapLocation } from './types';

export const COMMUNITY_CODE = "poloparkeast";
export const ADMIN_PASSCODE = "PPE2024";

export const ICONS = {
  Golf: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Pool: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12H3m18 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Social: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  Announcement: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>,
  Chat: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
  Location: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Calendar: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  User: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  Search: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Home: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Bell: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
  Settings: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Map: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
};

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: '1', title: 'Pool Maintenance Schedule', content: 'The north pool will be closed for resurfacing from Oct 10-15.', category: 'Maintenance', date: '2024-10-01', isPinned: true },
  { id: '2', title: 'BBQ Social Success!', content: 'Thank you to everyone who joined us for the Labor Day Social.', category: 'News', date: '2024-09-05' },
];

export const MOCK_EVENTS: Event[] = [
  { id: '1', title: 'Pickleball Mixer', date: '2024-10-12', time: '9:00 AM', location: 'Courts 1-4', category: 'Sports', description: 'Open play for all skill levels. Water provided.', capacity: 32, rsvps: 28 },
  { id: '2', title: 'Bingo Night', date: '2024-10-14', time: '6:30 PM', location: 'Main Clubhouse', category: 'Social', description: '$5 entry per card. Prizes for winners!', capacity: 100, rsvps: 65 },
  { id: '3', title: 'Golf Tournament', date: '2024-10-20', time: '8:00 AM', location: 'Championship Golf Course', category: 'Sports', description: 'Annual community golf tournament. Sign up early!', capacity: 72, rsvps: 50 },
  { id: '4', title: 'Yoga in the Park', date: '2024-10-16', time: '7:00 AM', location: 'Community Park', category: 'Sports', description: 'Morning yoga session. Bring your own mat.', capacity: 20, rsvps: 15 },
  { id: '5', title: 'Wine Tasting', date: '2024-10-25', time: '7:00 PM', location: 'The Grille', category: 'Social', description: 'Sample wines from around the world.', capacity: 40, rsvps: 35 },
];

export const MOCK_AMENITIES: Amenity[] = [
  { id: '1', name: 'Championship Golf Course', icon: 'Golf', hours: '6:00 AM - Dusk', rules: ['Tee times required', 'Proper attire only', 'No external coolers'], image: 'https://picsum.photos/800/600?random=1' },
  { id: '2', name: 'Saltwater Pool', icon: 'Pool', hours: '8:00 AM - 10:00 PM', rules: ['No glass at pool deck', 'Residents only', 'Shower before entry'], image: 'https://picsum.photos/800/600?random=2' },
  { id: '3', name: 'Main Clubhouse', icon: 'Home', hours: '8:00 AM - 11:00 PM', rules: ['No wet swimwear', 'Sign in guests'], image: 'https://picsum.photos/800/600?random=3' },
  { id: '4', name: 'Fitness Center', icon: 'Settings', hours: '24/7', rules: ['Wipe down equipment', 'Proper footwear required'], image: 'https://picsum.photos/800/600?random=4' },
  { id: '5', name: 'The Grille Dining', icon: 'Social', hours: '11:00 AM - 9:00 PM', rules: ['Reservations recommended for dinner'], image: 'https://picsum.photos/800/600?random=5' },
];

export const MOCK_MAP_LOCATIONS: MapLocation[] = [
  { id: 'm1', name: 'Main Clubhouse', type: 'amenity', x: 500, y: 500, description: 'Central hub for community activities.' },
  { id: 'm2', name: 'Championship Golf Course', type: 'amenity', x: 200, y: 300, description: '18-hole championship course.' },
  { id: 'm3', name: 'Saltwater Pool', type: 'amenity', x: 550, y: 450, description: 'Resort-style saltwater pool.' },
  { id: 'm4', name: 'Fitness Center', type: 'amenity', x: 450, y: 550, description: 'State-of-the-art fitness equipment.' },
  { id: 'm5', name: 'Community Park', type: 'amenity', x: 800, y: 200, description: 'Walking trails and picnic areas.' },
  { id: 'm6', name: 'Pickleball Courts', type: 'amenity', x: 600, y: 600, description: '6 lighted pickleball courts.' },
  { id: 'h1', name: '101 Oak St', type: 'home', x: 300, y: 400, available: true, description: '3 Bed, 2 Bath - $350,000' },
  { id: 'h2', name: '102 Oak St', type: 'home', x: 350, y: 400, available: false },
  { id: 'h3', name: '103 Oak St', type: 'home', x: 400, y: 400, available: true, description: '2 Bed, 2 Bath - $290,000' },
  { id: 'h4', name: '201 Pine Ln', type: 'home', x: 400, y: 300, available: false },
  { id: 'h5', name: '202 Pine Ln', type: 'home', x: 450, y: 300, available: true, description: '4 Bed, 3 Bath - $450,000' },
  { id: 'h6', name: '301 Maple Dr', type: 'home', x: 600, y: 350, available: false },
  { id: 'h7', name: '302 Maple Dr', type: 'home', x: 650, y: 350, available: false },
];

export const MOCK_RESIDENTS: Resident[] = [
  { id: '1', name: 'Bob Johnson', avatar: 'https://i.pravatar.cc/150?u=bob', points: 1250, messagingEnabled: true, interests: ['Golf', 'Woodworking'] },
  { id: '2', name: 'David Brown', avatar: 'https://i.pravatar.cc/150?u=david', points: 840, messagingEnabled: false, interests: ['Bingo', 'Social'] },
];

// Fixing MOCK_FORUM to match ForumTopic interface (replies is ForumReply[], content is string)
export const MOCK_FORUM: ForumTopic[] = [
  { 
    id: '1', 
    title: 'Best Local Plumber?', 
    author: 'Bob J.', 
    content: 'Looking for a reliable plumber for a kitchen leak.', 
    replies: [], 
    lastActivity: '2 hours ago', 
    category: 'Local Services' 
  },
  { 
    id: '2', 
    title: 'Activity: Chess Club start time?', 
    author: 'Sarah W.', 
    content: 'Can anyone confirm the start time for the chess club meeting this week?', 
    replies: [], 
    lastActivity: '1 day ago', 
    category: 'Activity Planning' 
  },
];

export const MOCK_FAQS: FAQ[] = [
  { question: "How do I pay my HOA dues?", answer: "HOA dues can be paid online through the portal or by check at the Main Clubhouse office. Payments are due on the 1st of each month." },
  { question: "Can I bring guests to the pool?", answer: "Yes, residents are allowed up to 2 guests per household. Guest passes are available at the office." },
  { question: "What are the trash pickup days?", answer: "Trash is collected every Tuesday morning. Recycling is collected every other Friday." },
  { question: "How do I book a tee time?", answer: "Tee times can be booked via the 'Amenities' section of this app or by calling the Pro Shop at ext. 402." }
];

export const MOCK_RULES: Rule[] = [
  { category: "Pets", content: "Pets must be on a leash at all times in common areas. Owners must pick up after their pets." },
  { category: "Golf Attire", content: "Collared shirts and soft spikes are required on the course. Denim is not permitted." },
  { category: "Quiet Hours", content: "Quiet hours are enforced from 10:00 PM to 7:00 AM daily." },
  { category: "Parking", content: "No overnight street parking is permitted. Guest parking is available at the Clubhouse." }
];
