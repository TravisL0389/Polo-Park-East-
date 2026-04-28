
export type PageType = 'home' | 'events' | 'amenities' | 'directory' | 'forum' | 'ai' | 'admin' | 'messaging' | 'notifications' | 'forum_detail' | 'map';

export interface MapLocation {
  id: string;
  name: string;
  type: 'home' | 'amenity' | 'road';
  x: number;
  y: number;
  description?: string;
  available?: boolean; // For homes
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'News' | 'Maintenance' | 'Board';
  date: string;
  isPinned?: boolean;
}

export interface RSVPStatus {
  eventId: string;
  status: 'yes' | 'no' | 'maybe' | null;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Social' | 'Sports' | 'Meeting';
  description: string;
  capacity: number;
  rsvps: number;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  hours: string;
  rules: string[];
  image: string;
}

export interface Resident {
  id: string;
  name: string;
  avatar: string;
  points: number;
  messagingEnabled: boolean;
  interests: string[];
}

export interface ForumReply {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface ForumTopic {
  id: string;
  title: string;
  author: string;
  content: string;
  replies: ForumReply[];
  lastActivity: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'resident';
  receiverId?: string; // For resident-to-resident
  text: string;
  timestamp: Date;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Rule {
  category: string;
  content: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'announcement' | 'event' | 'message';
  timestamp: Date;
  read: boolean;
}
