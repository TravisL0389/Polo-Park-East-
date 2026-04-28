
import { Announcement, Event, ForumTopic, ChatMessage, RSVPStatus, Resident } from '../types';
import { MOCK_ANNOUNCEMENTS, MOCK_EVENTS, MOCK_FORUM, MOCK_RESIDENTS } from '../constants';

const KEYS = {
  ANNOUNCEMENTS: 'ppe_announcements',
  EVENTS: 'ppe_events',
  FORUM: 'ppe_forum',
  MESSAGES: 'ppe_messages',
  RSVPS: 'ppe_user_rsvps',
  RESIDENTS: 'ppe_residents'
};

const get = <T>(key: string, fallback: T): T => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

const set = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const db = {
  init: () => {
    if (!localStorage.getItem(KEYS.ANNOUNCEMENTS)) set(KEYS.ANNOUNCEMENTS, MOCK_ANNOUNCEMENTS);
    if (!localStorage.getItem(KEYS.EVENTS)) set(KEYS.EVENTS, MOCK_EVENTS);
    if (!localStorage.getItem(KEYS.FORUM)) set(KEYS.FORUM, MOCK_FORUM.map(t => ({ 
      ...t, 
      replies: t.replies || [], 
      content: t.content || 'Start of the discussion thread.' 
    })));
    if (!localStorage.getItem(KEYS.RESIDENTS)) set(KEYS.RESIDENTS, MOCK_RESIDENTS);
    if (!localStorage.getItem(KEYS.RSVPS)) set(KEYS.RSVPS, []);
    if (!localStorage.getItem(KEYS.MESSAGES)) set(KEYS.MESSAGES, []);
  },

  getAnnouncements: (): Announcement[] => get(KEYS.ANNOUNCEMENTS, []),
  saveAnnouncement: (a: Announcement) => {
    const list = db.getAnnouncements();
    set(KEYS.ANNOUNCEMENTS, [a, ...list]);
  },

  getEvents: (): Event[] => get(KEYS.EVENTS, []),
  saveEvent: (e: Event) => {
    const list = db.getEvents();
    set(KEYS.EVENTS, [e, ...list]);
  },
  updateEventRSVP: (eventId: string, oldStatus: string | null, newStatus: 'yes' | 'no' | 'maybe') => {
    const events = db.getEvents();
    const rsvps = db.getUserRSVPs();
    
    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex > -1) {
      if (oldStatus === 'yes' && newStatus !== 'yes') events[eventIndex].rsvps -= 1;
      if (newStatus === 'yes' && oldStatus !== 'yes') events[eventIndex].rsvps += 1;
      set(KEYS.EVENTS, events);
    }

    const rsvpIndex = rsvps.findIndex(r => r.eventId === eventId);
    if (rsvpIndex > -1) rsvps[rsvpIndex].status = newStatus;
    else rsvps.push({ eventId, status: newStatus });
    set(KEYS.RSVPS, rsvps);
    return { events, rsvps };
  },

  getUserRSVPs: (): RSVPStatus[] => get(KEYS.RSVPS, []),

  getForum: (): ForumTopic[] => get(KEYS.FORUM, []),
  saveTopic: (topic: ForumTopic) => {
    const list = db.getForum();
    set(KEYS.FORUM, [topic, ...list]);
  },
  saveReply: (topicId: string, reply: any) => {
    const list = db.getForum();
    const index = list.findIndex(t => t.id === topicId);
    if (index > -1) {
      list[index].replies = [...(list[index].replies || []), reply];
      list[index].lastActivity = 'Just now';
      set(KEYS.FORUM, list);
    }
  },

  getResidents: (): Resident[] => get(KEYS.RESIDENTS, []),
  
  getMessages: (): ChatMessage[] => get(KEYS.MESSAGES, []).map(m => ({ ...m, timestamp: new Date(m.timestamp) })),
  sendMessage: (msg: ChatMessage) => {
    const list = db.getMessages();
    set(KEYS.MESSAGES, [...list, msg]);
  }
};
