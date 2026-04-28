import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  BookOpen,
  CalendarDays,
  CarFront,
  CircleDollarSign,
  Clock3,
  Download,
  ExternalLink,
  Flag,
  FlagTriangleRight,
  HeartHandshake,
  Home,
  Mail,
  MapPin,
  MessageCircleHeart,
  MessageSquareMore,
  Phone,
  Plane,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Trees,
  Users,
  Waves,
} from 'lucide-react';
import {
  startTransition,
  useDeferredValue,
  useEffect,
  useState,
} from 'react';

type Experience = 'community' | 'golf';
type CommunityView = 'overview' | 'residents' | 'explore' | 'concierge' | 'admin';
type GolfView = 'overview' | 'rates' | 'leagues' | 'course';
type ViewKey = CommunityView | GolfView;
type ChannelKey = 'general' | 'events' | 'marketplace' | 'golf';

interface FeatureItem {
  key?: string;
  title: string;
  copy: string;
  icon: typeof Home;
}

interface ResourceLink {
  key?: string;
  title: string;
  copy: string;
  href: string;
  residentOnly?: boolean;
}

interface GalleryImage {
  title: string;
  src: string;
  alt: string;
}

interface MessageItem {
  id: string;
  channel: ChannelKey;
  author: string;
  role: 'host' | 'resident';
  text: string;
  time: string;
}

interface ResidentAccess {
  fullName: string;
  homesite: string;
  grantedAt: string;
}

interface ConciergeMessage {
  id: string;
  sender: 'resident' | 'concierge';
  text: string;
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface AdminSession {
  username: string;
  signedInAt: string;
}

interface EditableUpdateItem {
  title: string;
  copy: string;
  meta: string;
}

interface EditableEventItem {
  title: string;
  copy: string;
  image: string;
  label: string;
  date: string;
}

interface EditableAmenityItem {
  title: string;
  image: string;
}

interface EditableNeighborItem {
  author: string;
  text: string;
  time: string;
}

interface EditableRateItem {
  title: string;
  value: string;
  note: string;
}

interface EditableLeagueItem {
  title: string;
  copy: string;
}

interface SiteContent {
  heroBadge: string;
  heroTitle: string;
  heroText: string;
  heroImage: string;
  residentAppEyebrow: string;
  residentAppTitle: string;
  residentAppSubtitle: string;
  residentAppBullets: string[];
  residentUpdates: EditableUpdateItem[];
  eventHighlights: EditableEventItem[];
  amenitySpotlights: EditableAmenityItem[];
  golfPanelTitle: string;
  golfPanelSubtitle: string;
  golfPanelImage: string;
  golfRates: EditableRateItem[];
  golfLeagues: EditableLeagueItem[];
  golfScorecardImage: string;
  neighborPreview: EditableNeighborItem[];
  footerDescription: string;
  footerQuickLinks: string[];
}

const communityHeroStats = [
  { label: 'Resident-owned homesites', value: '237' },
  { label: 'Community style', value: '55+ modular home park' },
  { label: 'Location', value: 'Davenport, Florida' },
];

const communityHighlights: FeatureItem[] = [
  {
    title: 'Warm Florida lifestyle',
    copy:
      'The park blends golf, lake views, clubhouse social life, and a quieter pace that still keeps residents connected.',
    icon: SunMedium,
  },
  {
    title: 'Resident-first operations',
    copy:
      'The public site already points people to board communications, forms, fee schedules, and new resident resources. The new platform makes those easier to reach.',
    icon: ShieldCheck,
  },
  {
    title: 'Neighbors who actually know each other',
    copy:
      'Chat channels, event response tools, and resident-only download access make the digital side feel as social as the neighborhood itself.',
    icon: HeartHandshake,
  },
];

const amenityHighlights: FeatureItem[] = [
  {
    title: 'Clubhouse and hall',
    copy:
      'A refreshed resident hub for announcements, events, entertainment, clubs, and community updates.',
    icon: Home,
  },
  {
    title: 'Pool and active recreation',
    copy:
      'The existing park site highlights pool life, golf, and social activity. The new app keeps those areas front and center.',
    icon: Waves,
  },
  {
    title: 'Golf and lake scenery',
    copy:
      'Polo Park East stands out because residents get both a golf identity and a scenic Florida neighborhood atmosphere.',
    icon: FlagTriangleRight,
  },
];

const residentResources: ResourceLink[] = [
  {
    title: 'Member login',
    copy: 'Jump to secure member content, profile access, and protected resident documents.',
    href: 'https://poloparkeast.com/membership-login/',
    residentOnly: true,
  },
  {
    title: 'Fee schedule',
    copy: 'Quick access to community fee information without digging through menus.',
    href: 'https://poloparkeast.com/fee-schedule/',
    residentOnly: true,
  },
  {
    title: 'Forms library',
    copy: 'Central entry point for paperwork, requests, and day-to-day resident tasks.',
    href: 'https://poloparkeast.com/forms/',
    residentOnly: true,
  },
  {
    title: 'New residents',
    copy: 'Helpful onboarding information for people settling into Polo Park East.',
    href: 'https://poloparkeast.com/new-residents/',
    residentOnly: true,
  },
  {
    title: 'Calendar',
    copy: 'The current park calendar becomes easier to scan on desktop and mobile.',
    href: 'https://poloparkeast.com/calendar/',
  },
  {
    title: 'Board communications',
    copy: 'A cleaner launch point for board notices, updates, and financial documents.',
    href: 'https://poloparkeast.com/board-communications/',
    residentOnly: true,
  },
];

const communityFacts = [
  'Official site positioning: resident-owned 55+ manufactured/modular home community in Davenport, Florida.',
  'Public site messaging highlights proximity to Disney, SeaWorld, Universal, Orlando International Airport, Legoland, fishing, boating, and Atlantic or Gulf beaches.',
  'The park history page notes resident purchase closure on March 28, 1996, 55+ certification in 2000, and final development completion in 2001.',
];

const exploreNotes = [
  {
    title: 'Where it sits',
    copy:
      'The official site places Polo Park East on US 27 just south of US 192 in Polk County, inside the Four Corners area.',
    icon: MapPin,
  },
  {
    title: 'Why people choose it',
    copy:
      'It offers a modular home park lifestyle with golf, lake access, social programming, and quick drives to Central Florida attractions.',
    icon: Trees,
  },
  {
    title: 'Travel convenience',
    copy:
      'The community is positioned as an easy launch point for airports, theme parks, day trips, and seasonal guests.',
    icon: Plane,
  },
];

const emergencyContacts = [
  {
    title: 'Main office',
    value: '(863) 424-6932',
    copy: 'Official site lists Monday through Friday office hours as 9:30 AM to 12:30 PM.',
    href: 'tel:8634246932',
    icon: Phone,
  },
  {
    title: 'Golf pro shop',
    value: '(863) 424-0093',
    copy: 'Golf site lists tee times, memberships, and rental club questions through the pro shop.',
    href: 'tel:8634240093',
    icon: FlagTriangleRight,
  },
  {
    title: 'Golf email',
    value: 'ppeproshop@gmail.com',
    copy: 'Use the current golf contact email shown on the official golf site.',
    href: 'mailto:ppeproshop@gmail.com',
    icon: Mail,
  },
];

const golfHeroStats = [
  { label: 'Course type', value: 'Semi-private executive' },
  { label: 'Advance booking', value: 'Up to 1 week' },
  { label: 'Tee sets', value: '5 sets of tees' },
];

const golfFacts: FeatureItem[] = [
  {
    title: 'Separate but connected',
    copy:
      'The golf experience has its own look and structure, but it stays inside the same Polo Park East ecosystem so residents and guests never feel lost.',
    icon: FlagTriangleRight,
  },
  {
    title: 'Daily play and leagues',
    copy:
      'Public openings, memberships, weekly scrambles, and resident golf programming all deserve their own dedicated hub.',
    icon: CalendarDays,
  },
  {
    title: 'Built for quick decisions',
    copy:
      'Rates, tee time guidance, leagues, and scorecard information are surfaced immediately instead of being buried in multiple pages.',
    icon: Flag,
  },
];

const golfRates = [
  { title: '9 holes', value: '$20', note: 'Tax not included.' },
  { title: 'Second 9', value: '$10', note: 'Same-day add-on after your first round.' },
  { title: '9-hole scramble', value: '$16', note: 'Official rate shown on the golf site.' },
  { title: '18-hole scramble', value: '$20', note: 'Official rate shown on the golf site.' },
  { title: 'Twilight special', value: '$15', note: 'Call ahead for current daily timing.' },
  { title: 'Rental clubs', value: '$25', note: 'Available through the pro shop.' },
  { title: 'Rider fee', value: '$9', note: 'For non-playing riders.' },
];

const golfLeagues = [
  {
    title: "Men's scramble",
    copy: 'Wednesday and Saturday from 8:00 AM to 11:00 AM. The site recommends arriving by 7:30 AM.',
  },
  {
    title: "Ladies' scramble",
    copy: 'Tuesday and Thursday from 8:00 AM to 10:00 AM. The site recommends arriving by 7:30 AM.',
  },
  {
    title: 'Membership and tee times',
    copy: 'Call the pro shop for openings, seasonal details, and the current tournament or league calendar.',
  },
];

const golfLinks: ResourceLink[] = [
  {
    title: 'Book tee times',
    copy: 'Launch the official Polo Park East Golf booking flow.',
    href: 'https://www.poloparkeastgolf.com/',
  },
  {
    title: 'Facilities',
    copy: 'See the official course and facilities overview.',
    href: 'https://www.poloparkeastgolf.com/facilities/',
  },
  {
    title: 'Scorecard',
    copy: 'Jump straight to the current scorecard page.',
    href: 'https://www.poloparkeastgolf.com/scorecard/',
  },
  {
    title: 'Membership',
    copy: 'Use the official membership page as the conversion path for golfers.',
    href: 'https://www.poloparkeastgolf.com/membership/',
  },
];

const residentPulse = [
  {
    title: 'Board communications',
    copy: 'Minutes, agendas, notices, and resident documents stay prominent instead of buried in old menus.',
    meta: 'Documents',
  },
  {
    title: 'Community calendar',
    copy: 'Coffee breaks, social nights, activities, and resident updates all flow back to the calendar and activity pages.',
    meta: 'Calendar',
  },
  {
    title: 'New resident resources',
    copy: 'Onboarding, forms, fee schedules, and helpful day-one information are grouped into one cleaner resident toolkit.',
    meta: 'Residents',
  },
];

const homeEventHighlights = [
  {
    title: 'Coffee & conversation',
    copy: 'Clubhouse-friendly social programming pulled from the current community events rhythm.',
    image: '/images/ppe-clubhouse.jpg',
    label: 'Social',
    date: 'May 24',
  },
  {
    title: 'Lakeside gatherings',
    copy: 'Scenic common areas become part of the digital story instead of just a rotating image on the old site.',
    image: '/images/ppe-lake-sunrise.jpg',
    label: 'Lifestyle',
    date: 'May 27',
  },
  {
    title: 'Golf club activity',
    copy: 'Leagues, tee times, and resident golf meetups connect directly into the dedicated golf microsite.',
    image: '/images/ppe-course-lake.jpg',
    label: 'Golf',
    date: 'May 31',
  },
];

const amenitySpotlights = [
  { title: 'Clubhouse', image: '/images/ppe-clubhouse.jpg' },
  { title: 'Swimming Pool', image: '/images/ppe-pool.jpg' },
  { title: 'Neighborhood Views', image: '/images/ppe-neighborhood.jpg' },
  { title: 'Lakefront', image: '/images/ppe-lake-sunrise.jpg' },
  { title: 'Golf Course', image: '/images/ppe-course-lake.jpg' },
];

const residentAppBullets = [
  'Community updates',
  'Event calendar',
  'HOA documents',
  'Forms and resources',
  'Neighbor chat',
  'Important alerts',
];

const neighborPreview = [
  {
    author: 'Janet S.',
    text: 'Does anyone know a good handyman in the area?',
    time: '2m ago',
  },
  {
    author: 'Rick W.',
    text: 'Reminder: Coffee social at the clubhouse this week.',
    time: '15m ago',
  },
  {
    author: 'Linda B.',
    text: 'Selling my golf cart. Message me if you want details.',
    time: '1h ago',
  },
];

const footerQuickLinks = [
  'About Us',
  'Amenities',
  'Residents',
  'Events',
  'HOA Documents',
  'Contact Us',
];

const DEFAULT_SITE_CONTENT: SiteContent = {
  heroBadge: 'A resident-owned 55+ golf community',
  heroTitle: 'Welcome Home to Polo Park East',
  heroText:
    'A refreshed digital front door for the Davenport community, built around resident tools, neighborhood connection, amenities, and golf.',
  heroImage: '/images/ppe-sign-hero.jpeg',
  residentAppEyebrow: 'PPE resident app',
  residentAppTitle: 'Your community in the palm of your hand.',
  residentAppSubtitle: 'Add the resident app to your home screen after verification.',
  residentAppBullets: [...residentAppBullets],
  residentUpdates: residentPulse.map((item) => ({ ...item })),
  eventHighlights: homeEventHighlights.map((item) => ({ ...item })),
  amenitySpotlights: amenitySpotlights.map((item) => ({ ...item })),
  golfPanelTitle: 'Polo Park East Golf Club',
  golfPanelSubtitle: 'A premier 9-hole golf experience',
  golfPanelImage: '/images/golf-hero.jpg',
  golfRates: golfRates.map((item) => ({ ...item })),
  golfLeagues: golfLeagues.map((item) => ({ ...item })),
  golfScorecardImage: '/images/golf-tile-3.png',
  neighborPreview: neighborPreview.map((item) => ({ ...item })),
  footerDescription:
    'A resident-owned 55+ modular home community offering golf, scenic Florida lakeside living, and a warm neighborhood atmosphere.',
  footerQuickLinks: [...footerQuickLinks],
};

const communityGallery: GalleryImage[] = [
  {
    title: 'Entrance and arrival',
    src: '/images/ppe-sign-hero.jpeg',
    alt: 'Polo Park East entrance sign',
  },
  {
    title: 'Memory lake sunrise',
    src: '/images/ppe-lake-sunrise.jpg',
    alt: 'Sunrise over one of the community lakes',
  },
  {
    title: 'Neighborhood streetscape',
    src: '/images/ppe-neighborhood.jpg',
    alt: 'Neighborhood homes inside Polo Park East',
  },
  {
    title: 'Resident pool area',
    src: '/images/ppe-pool.jpg',
    alt: 'Community pool at Polo Park East',
  },
  {
    title: 'Clubhouse hall',
    src: '/images/ppe-clubhouse.jpg',
    alt: 'Clubhouse interior at Polo Park East',
  },
  {
    title: 'Golf and lake view',
    src: '/images/ppe-course-lake.jpg',
    alt: 'Golf course view near the lake at Polo Park East',
  },
];

const golfGallery: GalleryImage[] = [
  {
    title: 'Golf home hero',
    src: '/images/golf-hero.jpg',
    alt: 'Polo Park East Golf hero image',
  },
  {
    title: 'Course sign',
    src: '/images/golf-sign.jpg',
    alt: 'Polo Park East Golf course sign',
  },
  {
    title: 'Playable course views',
    src: '/images/golf-tile-1.png',
    alt: 'Golf course image tile from the official golf site',
  },
  {
    title: 'Club and course atmosphere',
    src: '/images/golf-tile-2.png',
    alt: 'Golf lifestyle image tile from the official golf site',
  },
  {
    title: 'Scorecard and strategy',
    src: '/images/golf-tile-3.png',
    alt: 'Golf site promotional tile for Polo Park East Golf',
  },
];

const starterMessages: MessageItem[] = [
  {
    id: 'seed-1',
    channel: 'general',
    author: 'PPE Welcome Team',
    role: 'host',
    text: 'Welcome to the new resident chat. Share introductions, recommendations, and community questions here.',
    time: 'Today · 8:15 AM',
  },
  {
    id: 'seed-2',
    channel: 'events',
    author: 'Activities Desk',
    role: 'host',
    text: 'Use this channel for clubhouse events, volunteer needs, card nights, and special gatherings.',
    time: 'Today · 8:30 AM',
  },
  {
    id: 'seed-3',
    channel: 'marketplace',
    author: 'Neighbors Exchange',
    role: 'host',
    text: 'Post furniture, decor, golf gear, and helpful services that residents may want to buy, sell, or recommend.',
    time: 'Today · 9:00 AM',
  },
  {
    id: 'seed-4',
    channel: 'golf',
    author: 'Golf Club',
    role: 'host',
    text: 'This is the place for scramble meetups, tee time coordination, and league reminders.',
    time: 'Today · 9:20 AM',
  },
];

const conciergeStarters = [
  'What makes Polo Park East a good fit for new residents?',
  'How do I get to the resident documents and fee schedule?',
  'What are the current golf rates and league times?',
  'How can I install the resident app on my phone?',
];

const communityFaqs = [
  {
    question: 'What kind of community is Polo Park East?',
    answer:
      'The official site positions it as a resident-owned 55+ modular and manufactured home park community in Davenport, Florida with golf and lake access.',
  },
  {
    question: 'Where can residents find secure information?',
    answer:
      'The current site uses member login, new resident, forms, board communications, and fee schedule pages. The rebuild surfaces those as a cleaner resident toolkit.',
  },
  {
    question: 'How does the mobile app work?',
    answer:
      'Verified residents can install this experience like an app on their phone and return to chat, updates, and resident resources from their home screen.',
  },
];

const siteRules = [
  { category: 'Resident access', content: 'Keep the install flow and resident-only links behind the resident gate.' },
  { category: 'Community safety', content: 'Emergency and sensitive issues should still route to the office or local emergency services.' },
  { category: 'Golf information', content: 'Rates, hours, and events should stay tied to the official golf site as the source of truth.' },
];

const channelMeta: Record<ChannelKey, { title: string; description: string }> = {
  general: {
    title: 'General',
    description: 'Introductions, park life, and everyday questions.',
  },
  events: {
    title: 'Events',
    description: 'Clubhouse happenings, social gatherings, and reminders.',
  },
  marketplace: {
    title: 'Buy / Sell',
    description: 'Furniture, services, seasonal items, and helpful finds.',
  },
  golf: {
    title: 'Golf Club',
    description: 'Tee times, league chatter, and pairing up for rounds.',
  },
};

const storageKeys = {
  resident: 'ppe_resident_access_v2',
  chat: 'ppe_neighbor_chat_v1',
  admin: 'ppe_admin_session_v1',
  siteContent: 'ppe_site_content_v1',
};

const adminAccounts = [
  { username: 'officeadmin', passcode: 'PPEOFFICE2026' },
  { username: 'boardadmin', passcode: 'PPEBOARD2026' },
] as const;

const officialImageChoices = [
  { label: 'Community sign hero', src: '/images/ppe-sign-hero.jpeg' },
  { label: 'Lake sunrise', src: '/images/ppe-lake-sunrise.jpg' },
  { label: 'Pool', src: '/images/ppe-pool.jpg' },
  { label: 'Golf course lake', src: '/images/ppe-course-lake.jpg' },
  { label: 'Clubhouse', src: '/images/ppe-clubhouse.jpg' },
  { label: 'Neighborhood', src: '/images/ppe-neighborhood.jpg' },
  { label: 'Golf hero', src: '/images/golf-hero.jpg' },
  { label: 'Golf sign', src: '/images/golf-sign.jpg' },
  { label: 'Golf tile 1', src: '/images/golf-tile-1.png' },
  { label: 'Golf tile 2', src: '/images/golf-tile-2.png' },
  { label: 'Golf tile 3', src: '/images/golf-tile-3.png' },
];

const communityNav: Array<{ key: CommunityView; label: string }> = [
  { key: 'overview', label: 'Overview' },
  { key: 'residents', label: 'Residents' },
  { key: 'explore', label: 'Explore' },
  { key: 'concierge', label: 'AI Concierge' },
];

const golfNav: Array<{ key: GolfView; label: string }> = [
  { key: 'overview', label: 'Golf Home' },
  { key: 'rates', label: 'Rates' },
  { key: 'leagues', label: 'Leagues' },
  { key: 'course', label: 'Course Views' },
];

function cloneSiteContent(source: SiteContent = DEFAULT_SITE_CONTENT): SiteContent {
  return {
    heroBadge: source.heroBadge,
    heroTitle: source.heroTitle,
    heroText: source.heroText,
    heroImage: source.heroImage,
    residentAppEyebrow: source.residentAppEyebrow,
    residentAppTitle: source.residentAppTitle,
    residentAppSubtitle: source.residentAppSubtitle,
    residentAppBullets: [...source.residentAppBullets],
    residentUpdates: source.residentUpdates.map((item) => ({ ...item })),
    eventHighlights: source.eventHighlights.map((item) => ({ ...item })),
    amenitySpotlights: source.amenitySpotlights.map((item) => ({ ...item })),
    golfPanelTitle: source.golfPanelTitle,
    golfPanelSubtitle: source.golfPanelSubtitle,
    golfPanelImage: source.golfPanelImage,
    golfRates: source.golfRates.map((item) => ({ ...item })),
    golfLeagues: source.golfLeagues.map((item) => ({ ...item })),
    golfScorecardImage: source.golfScorecardImage,
    neighborPreview: source.neighborPreview.map((item) => ({ ...item })),
    footerDescription: source.footerDescription,
    footerQuickLinks: [...source.footerQuickLinks],
  };
}

function readStoredResident(): ResidentAccess | null {
  try {
    const raw = window.localStorage.getItem(storageKeys.resident);
    return raw ? (JSON.parse(raw) as ResidentAccess) : null;
  } catch {
    return null;
  }
}

function readStoredChat(): MessageItem[] {
  try {
    const raw = window.localStorage.getItem(storageKeys.chat);
    return raw ? (JSON.parse(raw) as MessageItem[]) : starterMessages;
  } catch {
    return starterMessages;
  }
}

function readStoredAdminSession(): AdminSession | null {
  try {
    const raw = window.localStorage.getItem(storageKeys.admin);
    return raw ? (JSON.parse(raw) as AdminSession) : null;
  } catch {
    return null;
  }
}

function readStoredSiteContent(): SiteContent {
  try {
    const raw = window.localStorage.getItem(storageKeys.siteContent);

    if (!raw) {
      return cloneSiteContent(DEFAULT_SITE_CONTENT);
    }

    const parsed = JSON.parse(raw) as Partial<SiteContent>;

    return cloneSiteContent({
      ...DEFAULT_SITE_CONTENT,
      ...parsed,
      residentAppBullets: Array.isArray(parsed.residentAppBullets)
        ? parsed.residentAppBullets
        : DEFAULT_SITE_CONTENT.residentAppBullets,
      residentUpdates: Array.isArray(parsed.residentUpdates)
        ? parsed.residentUpdates
        : DEFAULT_SITE_CONTENT.residentUpdates,
      eventHighlights: Array.isArray(parsed.eventHighlights)
        ? parsed.eventHighlights
        : DEFAULT_SITE_CONTENT.eventHighlights,
      amenitySpotlights: Array.isArray(parsed.amenitySpotlights)
        ? parsed.amenitySpotlights
        : DEFAULT_SITE_CONTENT.amenitySpotlights,
      golfRates: Array.isArray(parsed.golfRates)
        ? parsed.golfRates
        : DEFAULT_SITE_CONTENT.golfRates,
      golfLeagues: Array.isArray(parsed.golfLeagues)
        ? parsed.golfLeagues
        : DEFAULT_SITE_CONTENT.golfLeagues,
      neighborPreview: Array.isArray(parsed.neighborPreview)
        ? parsed.neighborPreview
        : DEFAULT_SITE_CONTENT.neighborPreview,
      footerQuickLinks: Array.isArray(parsed.footerQuickLinks)
        ? parsed.footerQuickLinks
        : DEFAULT_SITE_CONTENT.footerQuickLinks,
    });
  } catch {
    return cloneSiteContent(DEFAULT_SITE_CONTENT);
  }
}

function formatTimestamp() {
  return new Date().toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function buildLocalConciergeReply(question: string) {
  const normalized = question.toLowerCase();

  if (normalized.includes('golf') || normalized.includes('tee') || normalized.includes('rate')) {
    return 'The golf side of the platform highlights current official rates like $20 for 9 holes, $10 for a second 9, twilight at $15, and rental clubs at $25. The pro shop number is (863) 424-0093.';
  }

  if (
    normalized.includes('resident') ||
    normalized.includes('fee') ||
    normalized.includes('forms') ||
    normalized.includes('login')
  ) {
    return 'Use the Residents section for the member login, fee schedule, forms, board communications, and new resident links. Once verified, you can also install the app to your phone.';
  }

  if (normalized.includes('office') || normalized.includes('contact') || normalized.includes('phone')) {
    return 'The main office number on the official site is (863) 424-6932, with listed office hours Monday through Friday from 9:30 AM to 12:30 PM.';
  }

  if (normalized.includes('where') || normalized.includes('location') || normalized.includes('drive')) {
    return 'Polo Park East is presented on the official site as being on US 27 just south of US 192 in Davenport, Florida, with quick access to Four Corners destinations and Orlando-area attractions.';
  }

  if (normalized.includes('app') || normalized.includes('install') || normalized.includes('download')) {
    return 'Residents can unlock the install flow in the Residents area. On supported devices the platform prompts for install, and on iPhone it gives Add to Home Screen guidance.';
  }

  return 'Polo Park East works best when residents can quickly move between community updates, resident-only tools, and the golf hub. Try asking about resident resources, golf rates, office contacts, or installing the app.';
}

function AppShellCard({
  title,
  copy,
  icon: Icon,
}: FeatureItem) {
  return (
    <article className="surface-card">
      <div className="surface-icon">
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <h3>{title}</h3>
      <p>{copy}</p>
    </article>
  );
}

function LinkCard({
  title,
  copy,
  href,
  residentOnly,
}: ResourceLink) {
  return (
    <a className="link-card" href={href} target="_blank" rel="noreferrer">
      <div>
        <div className="link-card-header">
          <h3>{title}</h3>
          {residentOnly ? <span>Residents</span> : null}
        </div>
        <p>{copy}</p>
      </div>
      <ExternalLink size={18} strokeWidth={1.9} />
    </a>
  );
}

function SectionNav({
  items,
  active,
  onSelect,
}: {
  items: Array<{ key: ViewKey; label: string }>;
  active: ViewKey;
  onSelect: (next: ViewKey) => void;
}) {
  return (
    <div className="section-nav" aria-label="Section navigation">
      {items.map((item) => (
        <button
          key={item.key}
          className={item.key === active ? 'is-active' : ''}
          onClick={() => onSelect(item.key)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function GalleryGrid({ items }: { items: GalleryImage[] }) {
  return (
    <div className="gallery-grid">
      {items.map((item) => (
        <figure key={item.title} className="gallery-card">
          <img src={item.src} alt={item.alt} />
          <figcaption>{item.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function App() {
  const [experience, setExperience] = useState<Experience>('community');
  const [communityView, setCommunityView] = useState<CommunityView>('overview');
  const [golfView, setGolfView] = useState<GolfView>('overview');
  const [siteContent, setSiteContent] = useState<SiteContent>(() => cloneSiteContent());
  const [adminDraft, setAdminDraft] = useState<SiteContent>(() => cloneSiteContent());
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminNotice, setAdminNotice] = useState('');
  const [residentAccess, setResidentAccess] = useState<ResidentAccess | null>(null);
  const [residentName, setResidentName] = useState('');
  const [homesite, setHomesite] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [residentNotice, setResidentNotice] = useState('');
  const [messages, setMessages] = useState<MessageItem[]>(starterMessages);
  const [channel, setChannel] = useState<ChannelKey>('general');
  const [draftMessage, setDraftMessage] = useState('');
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installState, setInstallState] = useState<'idle' | 'available' | 'installed'>('idle');
  const [installNotice, setInstallNotice] = useState('');
  const [conciergeMessages, setConciergeMessages] = useState<ConciergeMessage[]>([
    {
      id: 'welcome',
      sender: 'concierge',
      text:
        'Welcome to the new Polo Park East digital concierge. Ask about resident tools, community details, golf rates, or how to install the app.',
    },
  ]);
  const [conciergeInput, setConciergeInput] = useState('');
  const [isConciergeLoading, setIsConciergeLoading] = useState(false);
  const deferredConciergeInput = useDeferredValue(conciergeInput);

  useEffect(() => {
    const storedContent = readStoredSiteContent();
    setSiteContent(storedContent);
    setAdminDraft(cloneSiteContent(storedContent));
    setAdminSession(readStoredAdminSession());
    setResidentAccess(readStoredResident());
    setMessages(readStoredChat());
    setInstallState(
      window.matchMedia('(display-mode: standalone)').matches ? 'installed' : 'idle',
    );
  }, []);

  useEffect(() => {
    const handlePrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setInstallState('available');
    };

    const handleInstalled = () => {
      setInstallPrompt(null);
      setInstallState('installed');
      setInstallNotice('Resident app installed. You can launch it from your home screen.');
    };

    window.addEventListener('beforeinstallprompt', handlePrompt);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handlePrompt);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKeys.chat, JSON.stringify(messages));
  }, [messages]);

  const activeCommunityView = communityView;
  const activeGolfView = golfView;
  const communitySectionNav = adminSession
    ? [...communityNav, { key: 'admin' as CommunityView, label: 'Admin CMS' }]
    : communityNav;
  const visibleMessages = messages.filter((message) => message.channel === channel);
  const headerNavItems =
    experience === 'community'
      ? [
          {
            label: 'Home',
            active: communityView === 'overview',
            onClick: () => setCommunityView('overview'),
          },
          {
            label: 'About Us',
            active: communityView === 'explore',
            onClick: () => setCommunityView('explore'),
          },
          {
            label: 'Amenities',
            active: communityView === 'explore',
            onClick: () => setCommunityView('explore'),
          },
          {
            label: 'Residents',
            active: communityView === 'residents',
            onClick: () => setCommunityView('residents'),
          },
          {
            label: 'AI Concierge',
            active: communityView === 'concierge',
            onClick: () => setCommunityView('concierge'),
          },
        ]
      : [
          {
            label: 'Overview',
            active: golfView === 'overview',
            onClick: () => setGolfView('overview'),
          },
          {
            label: 'Tee Times',
            active: golfView === 'overview',
            onClick: () => setGolfView('overview'),
          },
          {
            label: 'Rates',
            active: golfView === 'rates',
            onClick: () => setGolfView('rates'),
          },
          {
            label: 'Leagues',
            active: golfView === 'leagues',
            onClick: () => setGolfView('leagues'),
          },
          {
            label: 'Photos',
            active: golfView === 'course',
            onClick: () => setGolfView('course'),
          },
        ];

  const switchExperience = (
    next: Experience,
    targetView?: CommunityView | GolfView,
  ) => {
    startTransition(() => {
      setExperience(next);
      if (next === 'community') {
        setCommunityView((targetView as CommunityView | undefined) ?? 'overview');
      } else {
        setGolfView((targetView as GolfView | undefined) ?? 'overview');
      }
    });
  };

  const unlockResidentAccess = () => {
    if (!residentName.trim() || !homesite.trim()) {
      setResidentNotice('Add your full name and homesite before continuing.');
      return;
    }

    if (accessCode.trim().toUpperCase() !== 'PPE55') {
      setResidentNotice('Use the office-issued resident access code to unlock the install and chat features.');
      return;
    }

    const nextAccess = {
      fullName: residentName.trim(),
      homesite: homesite.trim(),
      grantedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(storageKeys.resident, JSON.stringify(nextAccess));
    setResidentAccess(nextAccess);
    setResidentNotice('Resident access approved for this device.');
    setCommunityView('residents');
  };

  const clearResidentAccess = () => {
    window.localStorage.removeItem(storageKeys.resident);
    setResidentAccess(null);
    setInstallNotice('');
    setInstallPrompt(null);
    setResidentName('');
    setHomesite('');
    setAccessCode('');
  };

  const updateAdminField = <K extends keyof SiteContent>(field: K, value: SiteContent[K]) => {
    setAdminDraft((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateStringListItem = (
    field: 'residentAppBullets' | 'footerQuickLinks',
    index: number,
    value: string,
  ) => {
    setAdminDraft((current) => {
      const next = cloneSiteContent(current);
      next[field][index] = value;
      return next;
    });
  };

  const updateObjectListItem = (
    field:
      | 'residentUpdates'
      | 'eventHighlights'
      | 'amenitySpotlights'
      | 'golfRates'
      | 'golfLeagues'
      | 'neighborPreview',
    index: number,
    key: string,
    value: string,
  ) => {
    setAdminDraft((current) => {
      const next = cloneSiteContent(current);
      const nextItem = next[field][index] as unknown as Record<string, string> | undefined;

      if (nextItem) {
        nextItem[key] = value;
      }

      return next;
    });
  };

  const readUploadedImage = async (file?: File | null) => {
    if (!file) {
      return null;
    }

    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error('Unable to read the selected image.'));
      reader.readAsDataURL(file);
    });
  };

  const applyUploadedAdminImage = async (
    file: File | null | undefined,
    onComplete: (nextImage: string) => void,
  ) => {
    try {
      const uploadedImage = await readUploadedImage(file);

      if (!uploadedImage) {
        return;
      }

      onComplete(uploadedImage);
      setAdminNotice('Image updated in the admin draft. Save changes to publish it.');
    } catch {
      setAdminNotice('That image could not be loaded. Please try another file.');
    }
  };

  const openAdminSection = () => {
    switchExperience('community', 'admin');
    setAdminNotice('');
  };

  const loginAdmin = () => {
    const matchedAccount = adminAccounts.find(
      (account) =>
        account.username === adminUsername.trim().toLowerCase()
        && account.passcode === adminPasscode.trim(),
    );

    if (!matchedAccount) {
      setAdminNotice('Admin access denied. Use a valid Polo Park East admin username and passcode.');
      return;
    }

    const nextSession = {
      username: matchedAccount.username,
      signedInAt: new Date().toISOString(),
    };

    window.localStorage.setItem(storageKeys.admin, JSON.stringify(nextSession));
    setAdminSession(nextSession);
    setAdminDraft(cloneSiteContent(siteContent));
    setAdminNotice('Admin access approved for this device.');
    setAdminUsername('');
    setAdminPasscode('');
    setCommunityView('admin');
  };

  const saveAdminContent = () => {
    const nextContent = cloneSiteContent(adminDraft);
    window.localStorage.setItem(storageKeys.siteContent, JSON.stringify(nextContent));
    setSiteContent(nextContent);
    setAdminDraft(cloneSiteContent(nextContent));
    setAdminNotice('Homepage, golf panel, and footer content were saved for admins on this device.');
  };

  const resetAdminDraft = () => {
    setAdminDraft(cloneSiteContent(siteContent));
    setAdminNotice('Unsaved admin edits were discarded.');
  };

  const restoreDefaultContent = () => {
    const defaults = cloneSiteContent(DEFAULT_SITE_CONTENT);
    window.localStorage.removeItem(storageKeys.siteContent);
    setSiteContent(defaults);
    setAdminDraft(cloneSiteContent(defaults));
    setAdminNotice('Default launch content was restored.');
  };

  const logoutAdmin = () => {
    window.localStorage.removeItem(storageKeys.admin);
    setAdminSession(null);
    setAdminDraft(cloneSiteContent(siteContent));
    setAdminNotice('Admin session cleared from this device.');
    setCommunityView('overview');
  };

  const handleInstallApp = async () => {
    if (!residentAccess) {
      setInstallNotice('Resident verification is required before install options appear.');
      return;
    }

    if (installPrompt) {
      await installPrompt.prompt();
      const result = await installPrompt.userChoice;
      if (result.outcome === 'accepted') {
        setInstallState('installed');
        setInstallNotice('The Polo Park East resident app was added to this device.');
      } else {
        setInstallNotice('Install was dismissed. You can try again any time from this device.');
      }
      setInstallPrompt(null);
      return;
    }

    setInstallNotice(
      'If you are on iPhone or iPad, tap Share and choose Add to Home Screen. On desktop, use your browser install option.',
    );
  };

  const postNeighborMessage = () => {
    if (!residentAccess || !draftMessage.trim()) {
      return;
    }

    const nextMessage: MessageItem = {
      id: `${Date.now()}`,
      channel,
      author: residentAccess.fullName,
      role: 'resident',
      text: draftMessage.trim(),
      time: `Today · ${formatTimestamp()}`,
    };

    startTransition(() => {
      setMessages((current) => [...current, nextMessage]);
      setDraftMessage('');
    });
  };

  const askConcierge = async (prefilled?: string) => {
    const prompt = (prefilled ?? conciergeInput).trim();
    if (!prompt || isConciergeLoading) {
      return;
    }

    const nextUserMessage: ConciergeMessage = {
      id: `${Date.now()}`,
      sender: 'resident',
      text: prompt,
    };

    startTransition(() => {
      setConciergeMessages((current) => [...current, nextUserMessage]);
      setConciergeInput('');
    });

    setIsConciergeLoading(true);

    let reply = buildLocalConciergeReply(prompt);

    try {
      const { chatWithAI } = await import('./services/geminiService');
      const aiReply = await chatWithAI(prompt, {
        announcements: [],
        events: [],
        amenities: siteContent.amenitySpotlights.map((item) => ({
          id: item.title,
          name: item.title,
          icon: item.title,
          hours: 'See official site',
          rules: [],
          image: '',
        })),
        faqs: communityFaqs,
        rules: siteRules,
      });

      if (aiReply && !aiReply.toLowerCase().includes('api key not configured')) {
        reply = aiReply;
      }
    } catch {
      reply = buildLocalConciergeReply(prompt);
    } finally {
      setIsConciergeLoading(false);
    }

    const nextConciergeMessage: ConciergeMessage = {
      id: `${Date.now()}-reply`,
      sender: 'concierge',
      text: reply,
    };

    startTransition(() => {
      setConciergeMessages((current) => [...current, nextConciergeMessage]);
    });
  };

  const renderImageField = (
    label: string,
    value: string,
    onSelect: (nextValue: string) => void,
    onUpload: (file: File | null | undefined) => Promise<void>,
  ) => (
    <div className="admin-image-field">
      <label>
        {label}
        <input
          value={value}
          onChange={(event) => onSelect(event.target.value)}
          placeholder="Paste an image URL, use a project image path, or upload a file"
        />
      </label>
      <label>
        Choose from official image library
        <select value={value} onChange={(event) => onSelect(event.target.value)}>
          <option value="">Select an official image</option>
          {officialImageChoices.map((item) => (
            <option key={item.src} value={item.src}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <label className="admin-upload-label">
        Upload replacement image
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            void onUpload(event.target.files?.[0]);
            event.currentTarget.value = '';
          }}
        />
      </label>
      <div className="admin-image-preview">
        <img src={value} alt={label} />
      </div>
    </div>
  );

  const renderCommunityView = () => {
    if (activeCommunityView === 'admin') {
      return (
        <div className="page-grid">
          <section className="surface-panel admin-shell">
            <div className="section-heading">
              <div>
                <h2>Admin content studio</h2>
                <p>
                  Approved admins can update homepage text, golf panel details, preview
                  cards, footer copy, and imagery from one place.
                </p>
              </div>
              <div className="meta-chip">
                <ShieldCheck size={16} />
                Admin only
              </div>
            </div>

            {!adminSession ? (
              <div className="admin-gate">
                <div className="admin-gate-copy">
                  <h3>Secure the editing side</h3>
                  <p>
                    This admin area is limited to approved Polo Park East admins. Sign in
                    to update launch copy, swap homepage photos, and manage the live
                    on-device content set.
                  </p>
                  <ul>
                    <li>Update homepage, resident-app, and golf panel copy</li>
                    <li>Select official images or upload replacements for this device</li>
                    <li>Save or restore launch content without editing code</li>
                  </ul>
                </div>

                <div className="admin-auth-panel">
                  <label>
                    Admin username
                    <input
                      value={adminUsername}
                      onChange={(event) => setAdminUsername(event.target.value)}
                      placeholder="Approved admin username"
                    />
                  </label>
                  <label>
                    Admin passcode
                    <input
                      value={adminPasscode}
                      onChange={(event) => setAdminPasscode(event.target.value)}
                      placeholder="Admin passcode"
                      type="password"
                    />
                  </label>
                  <button className="primary-button" onClick={loginAdmin} type="button">
                    Enter admin section
                  </button>
                  <p className="muted-note">
                    Current build note: this is a client-side admin gate for launch prep.
                    Replace it with server-side auth before public production rollout.
                  </p>
                </div>
              </div>
            ) : (
              <div className="admin-dashboard">
                <div className="admin-toolbar">
                  <div className="resident-badge">
                    <ShieldCheck size={16} />
                    Signed in as {adminSession.username}
                  </div>
                  <div className="admin-toolbar-actions">
                    <button className="primary-button" onClick={saveAdminContent} type="button">
                      Save content
                    </button>
                    <button className="secondary-button" onClick={resetAdminDraft} type="button">
                      Discard edits
                    </button>
                    <button className="ghost-button" onClick={restoreDefaultContent} type="button">
                      Restore defaults
                    </button>
                    <button className="ghost-button" onClick={logoutAdmin} type="button">
                      Log out
                    </button>
                  </div>
                </div>

                <div className="admin-grid">
                  <article className="admin-card">
                    <div className="section-heading compact">
                      <div>
                        <h2>Hero section</h2>
                      </div>
                    </div>
                    <div className="admin-form-grid">
                      <label>
                        Hero badge
                        <input
                          value={adminDraft.heroBadge}
                          onChange={(event) => updateAdminField('heroBadge', event.target.value)}
                        />
                      </label>
                      <label>
                        Hero title
                        <input
                          value={adminDraft.heroTitle}
                          onChange={(event) => updateAdminField('heroTitle', event.target.value)}
                        />
                      </label>
                      <label className="full-span">
                        Hero body
                        <textarea
                          value={adminDraft.heroText}
                          onChange={(event) => updateAdminField('heroText', event.target.value)}
                        />
                      </label>
                    </div>
                    {renderImageField(
                      'Hero image',
                      adminDraft.heroImage,
                      (nextValue) => updateAdminField('heroImage', nextValue),
                      async (file) => {
                        await applyUploadedAdminImage(file, (nextImage) =>
                          updateAdminField('heroImage', nextImage));
                      },
                    )}
                  </article>

                  <article className="admin-card">
                    <div className="section-heading compact">
                      <div>
                        <h2>Resident app panel</h2>
                      </div>
                    </div>
                    <div className="admin-form-grid">
                      <label>
                        Eyebrow
                        <input
                          value={adminDraft.residentAppEyebrow}
                          onChange={(event) =>
                            updateAdminField('residentAppEyebrow', event.target.value)}
                        />
                      </label>
                      <label>
                        Title
                        <input
                          value={adminDraft.residentAppTitle}
                          onChange={(event) =>
                            updateAdminField('residentAppTitle', event.target.value)}
                        />
                      </label>
                      <label className="full-span">
                        Subtitle
                        <textarea
                          value={adminDraft.residentAppSubtitle}
                          onChange={(event) =>
                            updateAdminField('residentAppSubtitle', event.target.value)}
                        />
                      </label>
                    </div>
                    <div className="admin-list-grid">
                      {adminDraft.residentAppBullets.map((item, index) => (
                        <label key={`${item}-${index}`}>
                          App bullet {index + 1}
                          <input
                            value={item}
                            onChange={(event) =>
                              updateStringListItem('residentAppBullets', index, event.target.value)}
                          />
                        </label>
                      ))}
                    </div>
                  </article>

                  <article className="admin-card full-width">
                    <div className="section-heading compact">
                      <div>
                        <h2>Resident updates</h2>
                      </div>
                    </div>
                    <div className="admin-list-grid three-up">
                      {adminDraft.residentUpdates.map((item, index) => (
                        <div key={`${item.title}-${index}`} className="admin-list-card">
                          <label>
                            Title
                            <input
                              value={item.title}
                              onChange={(event) =>
                                updateObjectListItem('residentUpdates', index, 'title', event.target.value)}
                            />
                          </label>
                          <label>
                            Meta label
                            <input
                              value={item.meta}
                              onChange={(event) =>
                                updateObjectListItem('residentUpdates', index, 'meta', event.target.value)}
                            />
                          </label>
                          <label>
                            Copy
                            <textarea
                              value={item.copy}
                              onChange={(event) =>
                                updateObjectListItem('residentUpdates', index, 'copy', event.target.value)}
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="admin-card full-width">
                    <div className="section-heading compact">
                      <div>
                        <h2>Community highlight cards</h2>
                      </div>
                    </div>
                    <div className="admin-list-grid three-up">
                      {adminDraft.eventHighlights.map((item, index) => (
                        <div key={`${item.title}-${index}`} className="admin-list-card">
                          <label>
                            Title
                            <input
                              value={item.title}
                              onChange={(event) =>
                                updateObjectListItem('eventHighlights', index, 'title', event.target.value)}
                            />
                          </label>
                          <label>
                            Label
                            <input
                              value={item.label}
                              onChange={(event) =>
                                updateObjectListItem('eventHighlights', index, 'label', event.target.value)}
                            />
                          </label>
                          <label>
                            Date
                            <input
                              value={item.date}
                              onChange={(event) =>
                                updateObjectListItem('eventHighlights', index, 'date', event.target.value)}
                            />
                          </label>
                          <label>
                            Copy
                            <textarea
                              value={item.copy}
                              onChange={(event) =>
                                updateObjectListItem('eventHighlights', index, 'copy', event.target.value)}
                            />
                          </label>
                          {renderImageField(
                            `Highlight image ${index + 1}`,
                            item.image,
                            (nextValue) =>
                              updateObjectListItem('eventHighlights', index, 'image', nextValue),
                            async (file) => {
                              await applyUploadedAdminImage(file, (nextImage) =>
                                updateObjectListItem('eventHighlights', index, 'image', nextImage));
                            },
                          )}
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="admin-card full-width">
                    <div className="section-heading compact">
                      <div>
                        <h2>Amenities ribbon</h2>
                      </div>
                    </div>
                    <div className="admin-list-grid three-up">
                      {adminDraft.amenitySpotlights.map((item, index) => (
                        <div key={`${item.title}-${index}`} className="admin-list-card">
                          <label>
                            Amenity title
                            <input
                              value={item.title}
                              onChange={(event) =>
                                updateObjectListItem('amenitySpotlights', index, 'title', event.target.value)}
                            />
                          </label>
                          {renderImageField(
                            `Amenity image ${index + 1}`,
                            item.image,
                            (nextValue) =>
                              updateObjectListItem('amenitySpotlights', index, 'image', nextValue),
                            async (file) => {
                              await applyUploadedAdminImage(file, (nextImage) =>
                                updateObjectListItem('amenitySpotlights', index, 'image', nextImage));
                            },
                          )}
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="admin-card">
                    <div className="section-heading compact">
                      <div>
                        <h2>Golf panel</h2>
                      </div>
                    </div>
                    <div className="admin-form-grid">
                      <label>
                        Golf title
                        <input
                          value={adminDraft.golfPanelTitle}
                          onChange={(event) => updateAdminField('golfPanelTitle', event.target.value)}
                        />
                      </label>
                      <label>
                        Golf subtitle
                        <input
                          value={adminDraft.golfPanelSubtitle}
                          onChange={(event) =>
                            updateAdminField('golfPanelSubtitle', event.target.value)}
                        />
                      </label>
                    </div>
                    {renderImageField(
                      'Golf panel image',
                      adminDraft.golfPanelImage,
                      (nextValue) => updateAdminField('golfPanelImage', nextValue),
                      async (file) => {
                        await applyUploadedAdminImage(file, (nextImage) =>
                          updateAdminField('golfPanelImage', nextImage));
                      },
                    )}
                    {renderImageField(
                      'Golf scorecard image',
                      adminDraft.golfScorecardImage,
                      (nextValue) => updateAdminField('golfScorecardImage', nextValue),
                      async (file) => {
                        await applyUploadedAdminImage(file, (nextImage) =>
                          updateAdminField('golfScorecardImage', nextImage));
                      },
                    )}
                  </article>

                  <article className="admin-card">
                    <div className="section-heading compact">
                      <div>
                        <h2>Footer</h2>
                      </div>
                    </div>
                    <div className="admin-form-grid">
                      <label className="full-span">
                        Footer description
                        <textarea
                          value={adminDraft.footerDescription}
                          onChange={(event) =>
                            updateAdminField('footerDescription', event.target.value)}
                        />
                      </label>
                    </div>
                    <div className="admin-list-grid">
                      {adminDraft.footerQuickLinks.map((item, index) => (
                        <label key={`${item}-${index}`}>
                          Quick link {index + 1}
                          <input
                            value={item}
                            onChange={(event) =>
                              updateStringListItem('footerQuickLinks', index, event.target.value)}
                          />
                        </label>
                      ))}
                    </div>
                  </article>

                  <article className="admin-card full-width">
                    <div className="section-heading compact">
                      <div>
                        <h2>Golf rates and leagues</h2>
                      </div>
                    </div>
                    <div className="admin-list-grid three-up">
                      {adminDraft.golfRates.map((item, index) => (
                        <div key={`${item.title}-${index}`} className="admin-list-card">
                          <label>
                            Rate title
                            <input
                              value={item.title}
                              onChange={(event) =>
                                updateObjectListItem('golfRates', index, 'title', event.target.value)}
                            />
                          </label>
                          <label>
                            Price/value
                            <input
                              value={item.value}
                              onChange={(event) =>
                                updateObjectListItem('golfRates', index, 'value', event.target.value)}
                            />
                          </label>
                          <label>
                            Note
                            <textarea
                              value={item.note}
                              onChange={(event) =>
                                updateObjectListItem('golfRates', index, 'note', event.target.value)}
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="admin-list-grid three-up">
                      {adminDraft.golfLeagues.map((item, index) => (
                        <div key={`${item.title}-${index}`} className="admin-list-card">
                          <label>
                            League title
                            <input
                              value={item.title}
                              onChange={(event) =>
                                updateObjectListItem('golfLeagues', index, 'title', event.target.value)}
                            />
                          </label>
                          <label>
                            League details
                            <textarea
                              value={item.copy}
                              onChange={(event) =>
                                updateObjectListItem('golfLeagues', index, 'copy', event.target.value)}
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="admin-card full-width">
                    <div className="section-heading compact">
                      <div>
                        <h2>Neighbor chat preview</h2>
                      </div>
                    </div>
                    <div className="admin-list-grid three-up">
                      {adminDraft.neighborPreview.map((item, index) => (
                        <div key={`${item.author}-${index}`} className="admin-list-card">
                          <label>
                            Resident name
                            <input
                              value={item.author}
                              onChange={(event) =>
                                updateObjectListItem('neighborPreview', index, 'author', event.target.value)}
                            />
                          </label>
                          <label>
                            Time label
                            <input
                              value={item.time}
                              onChange={(event) =>
                                updateObjectListItem('neighborPreview', index, 'time', event.target.value)}
                            />
                          </label>
                          <label>
                            Preview text
                            <textarea
                              value={item.text}
                              onChange={(event) =>
                                updateObjectListItem('neighborPreview', index, 'text', event.target.value)}
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                  </article>
                </div>
              </div>
            )}

            {adminNotice ? <p className="inline-note admin-note">{adminNotice}</p> : null}
          </section>
        </div>
      );
    }

    if (activeCommunityView === 'residents') {
      return (
        <div className="page-grid">
          <section className="surface-panel">
            <div className="section-heading">
              <div>
                <h2>Resident access and mobile app</h2>
                <p>
                  The install flow stays resident-only. Once approved on a device,
                  residents can return to updates, tools, and chat from their home screen.
                </p>
              </div>
              {residentAccess ? (
                <button className="ghost-button" type="button" onClick={clearResidentAccess}>
                  Reset access
                </button>
              ) : null}
            </div>

            {!residentAccess ? (
              <div className="resident-gate">
                <div className="resident-gate-copy">
                  <h3>Unlock the resident side</h3>
                  <p>
                    Use your name, homesite, and office-issued access code to reveal
                    the resident install prompt and neighbor chat.
                  </p>
                  <ul>
                    <li>Resident-only install flow for phones and tablets</li>
                    <li>Private community links like fee schedules and forms</li>
                    <li>Neighbor channels for events, golf, and buy/sell posts</li>
                  </ul>
                </div>
                <div className="resident-form">
                  <label>
                    Full name
                    <input
                      value={residentName}
                      onChange={(event) => setResidentName(event.target.value)}
                      placeholder="Your full name"
                    />
                  </label>
                  <label>
                    Homesite or lot
                    <input
                      value={homesite}
                      onChange={(event) => setHomesite(event.target.value)}
                      placeholder="Example: Lot 117"
                    />
                  </label>
                  <label>
                    Resident access code
                    <input
                      value={accessCode}
                      onChange={(event) => setAccessCode(event.target.value)}
                      placeholder="Office-issued code"
                    />
                  </label>
                  <button className="primary-button" onClick={unlockResidentAccess} type="button">
                    Verify resident access
                  </button>
                  {residentNotice ? <p className="inline-note">{residentNotice}</p> : null}
                </div>
              </div>
            ) : (
              <div className="resident-ready">
                <div className="resident-profile">
                  <div className="resident-badge">
                    <BadgeCheck size={18} />
                    Verified for {residentAccess.fullName}
                  </div>
                  <p>
                    Homesite: <strong>{residentAccess.homesite}</strong>
                  </p>
                  <p>Resident install is now available on this device.</p>
                </div>
                <div className="install-panel">
                  <h3>Download the resident app</h3>
                  <p>
                    This web app is configured to install like a mobile app for residents.
                    Use the install button below or your browser’s app install option.
                  </p>
                  <div className="cta-row">
                    <button className="primary-button" onClick={handleInstallApp} type="button">
                      <Download size={18} />
                      {installState === 'installed' ? 'Installed' : 'Install resident app'}
                    </button>
                    <a
                      className="secondary-button"
                      href="https://poloparkeast.com/membership-login/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Member login
                      <ArrowRight size={18} />
                    </a>
                  </div>
                  {installNotice ? <p className="inline-note">{installNotice}</p> : null}
                </div>
              </div>
            )}
          </section>

          <section className="surface-panel">
            <div className="section-heading">
              <div>
                <h2>Neighbor chat</h2>
                <p>
                  A private, easy-to-read channel system made for community questions,
                  event chatter, golf meetups, and resident marketplace posts.
                </p>
              </div>
              <div className="meta-chip">
                <MessageCircleHeart size={16} />
                Local resident channel demo
              </div>
            </div>

            <div className="chat-layout">
              <aside className="chat-sidebar">
                {Object.entries(channelMeta).map(([key, value]) => (
                  <button
                    key={key}
                    className={channel === key ? 'chat-channel is-active' : 'chat-channel'}
                    onClick={() => setChannel(key as ChannelKey)}
                    type="button"
                  >
                    <strong>{value.title}</strong>
                    <span>{value.description}</span>
                  </button>
                ))}
              </aside>

              <div className="chat-panel">
                <div className="chat-messages">
                  {visibleMessages.map((message) => (
                    <article
                      key={message.id}
                      className={message.role === 'resident' ? 'message-bubble resident' : 'message-bubble'}
                    >
                      <div className="message-meta">
                        <strong>{message.author}</strong>
                        <span>{message.time}</span>
                      </div>
                      <p>{message.text}</p>
                    </article>
                  ))}
                </div>

                <div className="chat-composer">
                  <textarea
                    disabled={!residentAccess}
                    value={draftMessage}
                    onChange={(event) => setDraftMessage(event.target.value)}
                    placeholder={
                      residentAccess
                        ? 'Share a quick update with neighbors...'
                        : 'Verify resident access to post in chat.'
                    }
                  />
                  <button
                    className="primary-button"
                    onClick={postNeighborMessage}
                    type="button"
                    disabled={!residentAccess}
                  >
                    Post to {channelMeta[channel].title}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="surface-panel">
            <div className="section-heading">
              <div>
                <h2>Resident toolkit</h2>
                <p>
                  These links carry over the current site’s practical resident functions
                  while making them faster to find on phones and tablets.
                </p>
              </div>
            </div>
            <div className="link-grid">
              {residentResources.map((item) => (
                <LinkCard
                  key={item.title}
                  title={item.title}
                  copy={item.copy}
                  href={item.href}
                  residentOnly={item.residentOnly}
                />
              ))}
            </div>
          </section>

          <section className="surface-panel">
            <div className="section-heading">
              <div>
                <h2>Helpful contacts</h2>
                <p>
                  The new resident section keeps the community’s key phone and email
                  details prominent for quick access.
                </p>
              </div>
            </div>
            <div className="stat-grid compact">
              {emergencyContacts.map((contact) => (
                <a key={contact.title} className="stat-card contact-card" href={contact.href}>
                  <div className="surface-icon">
                    <contact.icon size={20} strokeWidth={1.9} />
                  </div>
                  <small>{contact.title}</small>
                  <strong>{contact.value}</strong>
                  <p>{contact.copy}</p>
                </a>
              ))}
            </div>
          </section>
        </div>
      );
    }

    if (activeCommunityView === 'explore') {
      return (
        <div className="page-grid">
          <section className="surface-panel">
            <div className="section-heading">
              <div>
                <h2>Explore the community</h2>
                <p>
                  The public site already sells a strong sense of place. The redesign
                  keeps that atmosphere but presents it with more confidence and clarity.
                </p>
              </div>
            </div>
            <div className="stat-grid compact">
              {exploreNotes.map((item) => (
                <AppShellCard
                  key={item.title}
                  title={item.title}
                  copy={item.copy}
                  icon={item.icon}
                />
              ))}
            </div>
            <div className="fact-list">
              {communityFacts.map((fact) => (
                <div key={fact} className="fact-row">
                  <BadgeCheck size={18} />
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="surface-panel">
            <div className="section-heading">
              <div>
                <h2>Photo story</h2>
                <p>
                  These images were pulled from the official community site so the
                  redesign reflects the actual park rather than generic placeholders.
                </p>
              </div>
            </div>
            <GalleryGrid items={communityGallery} />
          </section>
        </div>
      );
    }

    if (activeCommunityView === 'concierge') {
      return (
        <div className="page-grid concierge-layout">
          <section className="surface-panel concierge-panel">
            <div className="section-heading">
              <div>
                <h2>AI concierge</h2>
                <p>
                  A warmer, easier entry point for resident questions about the community,
                  the golf side, and the app itself.
                </p>
              </div>
              <div className="meta-chip">
                <Sparkles size={16} />
                AI assisted
              </div>
            </div>
            <div className="concierge-thread">
              {conciergeMessages.map((message) => (
                <article
                  key={message.id}
                  className={
                    message.sender === 'resident'
                      ? 'concierge-bubble resident'
                      : 'concierge-bubble'
                  }
                >
                  <strong>{message.sender === 'resident' ? 'You' : 'PPE Concierge'}</strong>
                  <p>{message.text}</p>
                </article>
              ))}
              {isConciergeLoading ? (
                <article className="concierge-bubble">
                  <strong>PPE Concierge</strong>
                  <p>Thinking through the best answer for you now.</p>
                </article>
              ) : null}
            </div>

            <div className="concierge-composer">
              <textarea
                value={conciergeInput}
                onChange={(event) => setConciergeInput(event.target.value)}
                placeholder="Ask about golf, office contacts, resident tools, or installing the app..."
              />
              <button className="primary-button" onClick={() => askConcierge()} type="button">
                Send question
              </button>
            </div>
          </section>

          <section className="surface-panel">
            <div className="section-heading">
              <div>
                <h2>Quick prompts</h2>
                <p>
                  These starter questions are tuned to the real structure of the
                  current community and golf sites.
                </p>
              </div>
            </div>
            <div className="prompt-stack">
              {conciergeStarters.map((prompt) => (
                <button
                  key={prompt}
                  className="prompt-button"
                  onClick={() => askConcierge(prompt)}
                  type="button"
                >
                  <MessageSquareMore size={18} />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
            <div className="faq-list">
              {communityFaqs.map((faq) => (
                <article key={faq.question} className="faq-card">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
            <p className="muted-note">
              Draft input preview: {deferredConciergeInput || 'No pending message'}
            </p>
          </section>
        </div>
      );
    }

    return (
      <div className="page-grid concept-home-page">
        <section className="concept-home-layout">
          <div className="concept-home-main">
            <section className="concept-hero-card">
              <img src={siteContent.heroImage} alt="Polo Park East entrance sign" />
              <div className="concept-hero-copy">
                <div className="concept-hero-badge">
                  <BadgeCheck size={16} />
                  {siteContent.heroBadge}
                </div>
                <h1>{siteContent.heroTitle}</h1>
                <p>{siteContent.heroText}</p>
                <div className="cta-row">
                  <button
                    className="primary-button"
                    onClick={() => setCommunityView('explore')}
                    type="button"
                  >
                    Learn more about our community
                    <ArrowRight size={18} />
                  </button>
                  <button
                    className="secondary-button"
                    onClick={() => setCommunityView('residents')}
                    type="button"
                  >
                    Open resident portal
                    <BadgeCheck size={18} />
                  </button>
                </div>
              </div>
            </section>

            <section className="quick-link-strip">
              <button onClick={() => setCommunityView('explore')} type="button">
                <Home size={20} />
                <span>Community Info</span>
              </button>
              <button onClick={() => setCommunityView('explore')} type="button">
                <Waves size={20} />
                <span>Amenities</span>
              </button>
              <button onClick={() => setCommunityView('residents')} type="button">
                <CalendarDays size={20} />
                <span>Calendar</span>
              </button>
              <button onClick={() => setCommunityView('residents')} type="button">
                <BookOpen size={20} />
                <span>HOA Documents</span>
              </button>
              <button onClick={() => setCommunityView('residents')} type="button">
                <ShieldCheck size={20} />
                <span>Forms & Resources</span>
              </button>
              <button onClick={() => setCommunityView('residents')} type="button">
                <Phone size={20} />
                <span>Contact Us</span>
              </button>
            </section>

            <div className="concept-dashboard-grid">
              <section className="surface-panel updates-panel">
                <div className="section-heading compact">
                  <div>
                    <h2>Resident updates</h2>
                  </div>
                  <button className="text-link-button" onClick={() => setCommunityView('residents')} type="button">
                    View all
                  </button>
                </div>
                <div className="update-list">
                  {siteContent.residentUpdates.map((item) => (
                    <article key={item.title} className="update-row">
                      <div className="update-icon">
                        <BellRing size={18} />
                      </div>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.copy}</p>
                        <span>{item.meta}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="surface-panel events-panel">
                <div className="section-heading compact">
                  <div>
                    <h2>Community highlights</h2>
                  </div>
                  <button className="text-link-button" onClick={() => setCommunityView('explore')} type="button">
                    View calendar
                  </button>
                </div>
                <div className="event-card-grid">
                  {siteContent.eventHighlights.map((item) => (
                    <article key={item.title} className="event-preview-card">
                      <img src={item.image} alt={item.title} />
                      <div className="event-preview-copy">
                        <div className="event-date-chip">{item.date}</div>
                        <span>{item.label}</span>
                        <h3>{item.title}</h3>
                        <p>{item.copy}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <section className="surface-panel amenities-ribbon">
              <div className="section-heading compact">
                <div>
                  <h2>Our amenities</h2>
                </div>
                <button className="text-link-button" onClick={() => setCommunityView('explore')} type="button">
                  View all amenities
                </button>
              </div>
              <div className="amenity-ribbon-grid">
                {siteContent.amenitySpotlights.map((item) => (
                  <article key={item.title} className="amenity-ribbon-card">
                    <img src={item.image} alt={item.title} />
                    <span>{item.title}</span>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="concept-home-side">
            <section className="resident-app-preview">
              <div className="resident-app-head">
                <span>{siteContent.residentAppEyebrow}</span>
                <strong>{siteContent.residentAppTitle}</strong>
              </div>
              <div className="resident-app-list">
                {siteContent.residentAppBullets.map((item) => (
                  <div key={item} className="resident-app-row">
                    <BadgeCheck size={15} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="resident-phone-mock">
                <img src="/images/ppe-logo.png" alt="Polo Park East app preview" />
                <div>
                  <strong>Polo Park East</strong>
                  <span>{siteContent.residentAppSubtitle}</span>
                </div>
              </div>
            </section>

            <section className="golf-preview-panel">
              <div className="golf-preview-head">
                <div>
                  <h2>{siteContent.golfPanelTitle}</h2>
                  <p>{siteContent.golfPanelSubtitle}</p>
                </div>
              </div>
              <div className="golf-preview-nav">
                <button onClick={() => switchExperience('golf')} type="button">Overview</button>
                <button onClick={() => switchExperience('golf', 'rates')} type="button">Rates</button>
                <button onClick={() => switchExperience('golf', 'leagues')} type="button">Leagues</button>
                <button onClick={() => switchExperience('golf', 'course')} type="button">Photos</button>
              </div>
              <img className="golf-preview-image" src={siteContent.golfPanelImage} alt="Polo Park East golf course" />
              <div className="golf-booking-banner">
                <div>
                  <strong>Book your tee time</strong>
                  <span>Up to 7 days in advance</span>
                </div>
                <a href="https://www.poloparkeastgolf.com/" target="_blank" rel="noreferrer">
                  Book tee time
                </a>
              </div>
              <div className="golf-preview-grid">
                <article className="golf-info-card">
                  <h3>Rates</h3>
                  {siteContent.golfRates.slice(0, 4).map((rate) => (
                    <div key={rate.title} className="golf-rate-row">
                      <span>{rate.title}</span>
                      <strong>{rate.value}</strong>
                    </div>
                  ))}
                </article>
                <article className="golf-info-card">
                  <h3>Leagues & scrambles</h3>
                  <ul>
                    {siteContent.golfLeagues.map((league) => (
                      <li key={league.title}>{league.copy}</li>
                    ))}
                  </ul>
                </article>
              </div>
              <div className="golf-scorecard-panel">
                <div className="golf-scorecard-card">
                  <h3>Scorecard highlights</h3>
                  <div className="golf-score-header">
                    <span>Hole</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                  </div>
                  <div className="golf-score-row">
                    <span>Par</span>
                    <span>4</span>
                    <span>3</span>
                    <span>4</span>
                    <span>3</span>
                    <span>4</span>
                    <span>3</span>
                    <span>4</span>
                    <span>3</span>
                    <span>4</span>
                  </div>
                  <div className="golf-score-row">
                    <span>Yards</span>
                    <span>320</span>
                    <span>150</span>
                    <span>350</span>
                    <span>130</span>
                    <span>300</span>
                    <span>120</span>
                    <span>310</span>
                    <span>160</span>
                    <span>280</span>
                  </div>
                  <a href="https://www.poloparkeastgolf.com/scorecard/" target="_blank" rel="noreferrer">
                    View full scorecard
                  </a>
                </div>
                <img src={siteContent.golfScorecardImage} alt="Polo Park East golf course promotional image" />
              </div>
              <div className="golf-contact-strip">
                <span>Davenport, FL</span>
                <span>(863) 424-0093</span>
                <span>7 AM - 2 PM daily</span>
              </div>
            </section>

            <section className="neighbor-chat-card">
              <div className="neighbor-chat-head">
                <div>
                  <strong>Neighbor Chat</strong>
                  <span>Residents only</span>
                </div>
              </div>
              <div className="neighbor-chat-list">
                {siteContent.neighborPreview.map((item) => (
                  <article key={`${item.author}-${item.time}`} className="neighbor-chat-row">
                    <div className="neighbor-avatar">{item.author.slice(0, 1)}</div>
                    <div>
                      <strong>{item.author}</strong>
                      <p>{item.text}</p>
                    </div>
                    <span>{item.time}</span>
                  </article>
                ))}
              </div>
              <button
                className="primary-button chat-open-button"
                onClick={() => setCommunityView('residents')}
                type="button"
              >
                Open chat
              </button>
            </section>
          </aside>
        </section>

        <section className="concept-footer">
          <div className="concept-footer-brand">
            <img src="/images/ppe-logo.png" alt="Polo Park East logo" />
            <div>
              <strong>Polo Park East</strong>
              <p>
                {siteContent.footerDescription}
              </p>
            </div>
          </div>
          <div className="concept-footer-links">
            <span>Quick links</span>
            <div>
              {siteContent.footerQuickLinks.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    if (item === 'Residents' || item === 'HOA Documents') {
                      setCommunityView('residents');
                      return;
                    }
                    if (item === 'Amenities' || item === 'About Us') {
                      setCommunityView('explore');
                      return;
                    }
                    if (item === 'Events') {
                      setCommunityView('explore');
                      return;
                    }
                    setCommunityView('residents');
                  }}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="concept-footer-social">
            <span>Connect with us</span>
            <p>Use the resident portal for member resources, updates, and community notices.</p>
            <a href="https://poloparkeast.com/membership-login/" target="_blank" rel="noreferrer">
              Resident login
            </a>
          </div>
        </section>
      </div>
    );
  };

  const renderGolfView = () => {
    if (activeGolfView === 'rates') {
      return (
        <div className="page-grid">
          <section className="surface-panel">
            <div className="section-heading">
              <div>
                <h2>Golf rates</h2>
                <p>
                  The current rates are elevated into a clean, easy-to-compare layout
                  so golfers do not need to hunt through a traditional golf site menu.
                </p>
              </div>
            </div>
            <div className="rate-grid">
              {siteContent.golfRates.map((rate) => (
                <article key={rate.title} className="rate-card">
                  <div className="surface-icon">
                    <CircleDollarSign size={22} strokeWidth={1.9} />
                  </div>
                  <h3>{rate.title}</h3>
                  <strong>{rate.value}</strong>
                  <p>{rate.note}</p>
                </article>
              ))}
            </div>
            <p className="muted-note">
              Rates were pulled from the official golf site and should still be verified by the pro shop before public launch.
            </p>
          </section>

          <section className="surface-panel">
            <div className="section-heading">
              <div>
                <h2>Golf action links</h2>
                <p>
                  Clear conversion paths matter more than old-school menu depth on a golf microsite.
                </p>
              </div>
            </div>
            <div className="link-grid">
              {golfLinks.map((item) => (
                <LinkCard
                  key={item.title}
                  title={item.title}
                  copy={item.copy}
                  href={item.href}
                  residentOnly={item.residentOnly}
                />
              ))}
            </div>
          </section>
        </div>
      );
    }

    if (activeGolfView === 'leagues') {
      return (
        <div className="page-grid">
          <section className="surface-panel">
            <div className="section-heading">
              <div>
                <h2>Leagues and recurring play</h2>
                <p>
                  The golf hub gets its own recurring-play experience so weekly golfers
                  can find the essentials in seconds.
                </p>
              </div>
            </div>
            <div className="stat-grid compact">
              {siteContent.golfLeagues.map((league) => (
                <article key={league.title} className="surface-card">
                  <div className="surface-icon">
                    <CalendarDays size={22} strokeWidth={1.8} />
                  </div>
                  <h3>{league.title}</h3>
                  <p>{league.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="surface-panel split-panel">
            <div>
              <div className="section-heading">
                <div>
                  <h2>Connected resident experience</h2>
                  <p>
                    Residents can move from golf planning to neighbor chat without leaving
                    the broader Polo Park East platform.
                  </p>
                </div>
              </div>
              <div className="fact-list">
                <div className="fact-row">
                  <Users size={18} />
                  <span>Coordinate scramble groups in the resident chat.</span>
                </div>
                <div className="fact-row">
                  <Clock3 size={18} />
                  <span>Pin league reminders where residents already check updates.</span>
                </div>
                <div className="fact-row">
                  <Download size={18} />
                  <span>Carry golf details into the resident mobile app experience.</span>
                </div>
              </div>
            </div>
            <div className="mini-gallery single">
              <img src="/images/golf-sign.jpg" alt="Golf sign at Polo Park East" />
            </div>
          </section>
        </div>
      );
    }

    if (activeGolfView === 'course') {
      return (
        <div className="page-grid">
          <section className="surface-panel">
            <div className="section-heading">
              <div>
                <h2>Course views and atmosphere</h2>
                <p>
                  The golf side now feels like a real destination instead of a generic
                  golf template, while still keeping official photos and booking paths.
                </p>
              </div>
            </div>
            <GalleryGrid items={golfGallery} />
          </section>
        </div>
      );
    }

    return (
      <div className="page-grid">
        <section className="hero-card golf-hero">
          <div className="hero-copy">
            <h1>Polo Park East Golf now has its own modern microsite.</h1>
            <p>
              A dedicated golf experience for rates, leagues, memberships, course
              visuals, and tee time actions, while still staying connected to the
              main resident platform.
            </p>
            <div className="cta-row">
              <a
                className="primary-button"
                href="https://www.poloparkeastgolf.com/"
                target="_blank"
                rel="noreferrer"
              >
                Book official tee time
                <ExternalLink size={18} />
              </a>
              <button
                className="secondary-button"
                onClick={() => switchExperience('community')}
                type="button"
              >
                Back to community site
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="hero-media">
            <img src="/images/golf-hero.jpg" alt="Polo Park East Golf course" />
            <div className="hero-overlay-card">
              <div className="meta-chip">
                <FlagTriangleRight size={16} />
                Golf-first experience
              </div>
              <ul>
                <li>Semi-private executive course</li>
                <li>Five tee sets and weekly scrambles</li>
                <li>Fast path to rates, memberships, and tee times</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="surface-panel">
          <div className="stat-grid">
            {golfHeroStats.map((item) => (
              <article key={item.label} className="stat-card">
                <small>{item.label}</small>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="surface-panel">
          <div className="stat-grid compact">
            {golfFacts.map((item) => (
              <AppShellCard
                key={item.title}
                title={item.title}
                copy={item.copy}
                icon={item.icon}
              />
            ))}
          </div>
        </section>

        <section className="surface-panel split-panel">
          <div>
            <div className="section-heading">
              <div>
                <h2>Key golf details pulled forward</h2>
                <p>
                  The redesign turns the current course information into a faster,
                  cleaner planning tool for both residents and public golfers.
                </p>
              </div>
            </div>
            <div className="fact-list">
              <div className="fact-row">
                <Phone size={18} />
                <span>Pro shop phone: (863) 424-0093</span>
              </div>
              <div className="fact-row">
                <Mail size={18} />
                <span>Official golf email: ppeproshop@gmail.com</span>
              </div>
              <div className="fact-row">
                <Clock3 size={18} />
                <span>Golf site lists daily hours as 7:00 AM to 2:00 PM.</span>
              </div>
              <div className="fact-row">
                <CarFront size={18} />
                <span>Advance tee times: up to one week out.</span>
              </div>
            </div>
          </div>
          <div className="mini-gallery single">
            <img src="/images/golf-tile-1.png" alt="Golf course detail" />
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="app-shell" data-experience={experience}>
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <header className="topbar">
        <div className="brand-block">
          <img src="/images/ppe-logo.png" alt="Polo Park East logo" />
          <div>
            <span>Polo Park East</span>
            <strong>Resident-owned 55+ modular home community</strong>
          </div>
        </div>

        <nav className="primary-nav" aria-label="Primary">
          {headerNavItems.map((item) => (
            <button
              key={item.label}
              className={item.active ? 'is-active' : ''}
              onClick={item.onClick}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="topbar-actions">
          <button
            className="ghost-button admin-trigger-button"
            onClick={openAdminSection}
            type="button"
          >
            <ShieldCheck size={16} />
            {adminSession ? 'Admin CMS' : 'Admin'}
          </button>
            <button
              className="resident-login-button"
              onClick={() => {
              switchExperience('community', 'residents');
              }}
              type="button"
            >
            <BadgeCheck size={16} />
            Resident Login
          </button>
          <button
            className="golf-club-button"
            onClick={() => switchExperience('golf')}
            type="button"
          >
            <FlagTriangleRight size={16} />
            Golf Club
          </button>
        </div>
      </header>

      <main className="main-shell">
        <section className="headline-strip">
          <div>
            <p>
              Modern, welcoming, and built around the real rhythm of Polo Park East life:
              resident resources, neighborhood connection, lakeside living, and golf.
            </p>
          </div>
          <div className="headline-chips">
            <span>
              <MapPin size={15} />
              Davenport, FL
            </span>
            <span>
              <Users size={15} />
              Resident app
            </span>
            <span>
              <Sparkles size={15} />
              AI concierge
            </span>
            <span>
              <FlagTriangleRight size={15} />
              Golf club
            </span>
          </div>
        </section>

        <SectionNav
          items={experience === 'community' ? communitySectionNav : golfNav}
          active={experience === 'community' ? activeCommunityView : activeGolfView}
          onSelect={(next) => {
            if (experience === 'community') {
              setCommunityView(next as CommunityView);
            } else {
              setGolfView(next as GolfView);
            }
          }}
        />

        {experience === 'community' ? renderCommunityView() : renderGolfView()}
      </main>
    </div>
  );
}

export default App;
