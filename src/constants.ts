
// ============================================================================
// CONSTANTS - Relief Data
// ============================================================================
 interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FooterSection {
  title: string;
  links: string[];
}

export const TagLines: readonly string[] = [
  'Find calm between the waves',
  'A moment of calm, one wave at a time',
  'Breathe with the ocean',
  'Your digital ocean break',
];

export type ReliefMood = "calm" | "deep" | "storm" | "night";

export interface ReliefCard {
  id: number;
  title: string;
  text: string;
  mood: ReliefMood;
}

export const reliefCards: ReliefCard[] = [
  { id: 1, title: "Wave Breathing", text: "Breathe in as the wave rises. Breathe out as it falls.", mood: "calm" },
  { id: 2, title: "Let It Drift", text: "Imagine your thoughts floating away like driftwood.", mood: "calm" },
  { id: 3, title: "Stay Afloat", text: "You don't need to fight the ocean. Just stay afloat.", mood: "deep" },
  { id: 4, title: "Deep Water Calm", text: "The deeper you go, the quieter it becomes.", mood: "deep" },
  { id: 5, title: "One Wave Only", text: "Focus on this wave. Nothing else exists.", mood: "calm" },
  { id: 6, title: "Tides Change", text: "No feeling is permanent. Like tides, it will pass.", mood: "storm" },
  { id: 7, title: "Ocean Pause", text: "Pause for 10 seconds. Let the ocean hold the moment.", mood: "calm" },
  { id: 8, title: "Silent Sea", text: "You don't need answers right now. Silence is enough.", mood: "night" },
  { id: 9, title: "Floating Mind", text: "Let your mind float. No direction needed.", mood: "calm" },
  { id: 10, title: "Breathe with Blue", text: "Inhale calm. Exhale tension.", mood: "calm" },
  { id: 11, title: "Night Ocean", text: "The ocean rests too. You're allowed to rest.", mood: "night" },
  { id: 12, title: "Storm Reminder", text: "Even storms have an end.", mood: "storm" },
  { id: 13, title: "Gentle Horizon", text: "Look toward the horizon. Things are wider than they seem.", mood: "deep" },
  { id: 14, title: "Weightless", text: "You are lighter than your thoughts.", mood: "deep" },
  { id: 15, title: "Slow Down", text: "The ocean never rushes.", mood: "calm" },
  { id: 16, title: "Drop the Anchor", text: "You are safe in this moment.", mood: "deep" },
  { id: 17, title: "Salt Air Reset", text: "Imagine the smell of salt air. Reset.", mood: "calm" },
  { id: 18, title: "Still Waters", text: "Stillness is also progress.", mood: "night" },
  { id: 19, title: "Release", text: "Let go of what you can't control.", mood: "storm" },
  { id: 20, title: "Return to Shore", text: "You can always return to calm.", mood: "calm" },
];

export type MusicMood = "calm" | "deep" | "storm" | "night";

export interface MusicSuggestion {
  id: number;
  song: string;
  artist: string;
  line: string;
  mood: MusicMood;
}

export const musicSuggestions: MusicSuggestion[] = [
  { id: 1, song: "What a Wonderful World", artist: "Louis Armstrong", line: "I see trees of green", mood: "calm" },
  { id: 2, song: "Yellow", artist: "Coldplay", line: "Look how they shine for you", mood: "calm" },
  { id: 3, song: "Ocean Eyes", artist: "Billie Eilish", line: "I've been watching you for some time", mood: "calm" },
  { id: 4, song: "L-O-V-E", artist: "Nat King Cole", line: "L is for the way you look at me", mood: "calm" },
  { id: 5, song: "Perfect", artist: "Ed Sheeran", line: "We were just kids when we fell in love", mood: "calm" },
  { id: 6, song: "Waves", artist: "Mr Probz", line: "My face above the water", mood: "deep" },
  { id: 7, song: "At Last", artist: "Etta James", line: "At last, my love has come along", mood: "deep" },
  { id: 8, song: "Let Her Go", artist: "Passenger", line: "Only know you love her when you let her go", mood: "deep" },
  { id: 9, song: "Georgia on My Mind", artist: "Ray Charles", line: "Georgia, Georgia", mood: "deep" },
  { id: 10, song: "The Scientist", artist: "Coldplay", line: "Nobody said it was easy", mood: "deep" },
  { id: 11, song: "Fly Me to the Moon", artist: "Frank Sinatra", line: "Let me play among the stars", mood: "night" },
  { id: 12, song: "Fix You", artist: "Coldplay", line: "Lights will guide you home", mood: "night" },
  { id: 13, song: "Ain't No Sunshine", artist: "Bill Withers", line: "Ain't no sunshine when she's gone", mood: "night" },
  { id: 14, song: "Chasing Cars", artist: "Snow Patrol", line: "If I lay here", mood: "night" },
  { id: 15, song: "Dream a Little Dream of Me", artist: "Ella Fitzgerald", line: "Sweet dreams till sunbeams find you", mood: "night" },
  { id: 16, song: "Someone Like You", artist: "Adele", line: "Never mind, I'll find someone like you", mood: "storm" },
  { id: 17, song: "Skyfall", artist: "Adele", line: "Let the sky fall", mood: "storm" },
  { id: 18, song: "Lose Yourself", artist: "Eminem", line: "You only get one shot", mood: "storm" },
  { id: 19, song: "Feeling Good", artist: "Nina Simone", line: "It's a new dawn", mood: "storm" },
  { id: 20, song: "A Change Is Gonna Come", artist: "Sam Cooke", line: "It's been a long time coming", mood: "storm" },
];



export const FEATURES: Feature[] = [
  { icon: "⚡", title: "Lightning Fast", description: "Optimized performance for the best user experience" },
  { icon: "🎨", title: "Beautiful Design", description: "Stunning visuals that captivate your audience" },
  { icon: "🔒", title: "Secure", description: "Enterprise-grade security for your peace of mind" },
  { icon: "📱", title: "Responsive", description: "Perfect experience on any device or screen size" },
  { icon: "🚀", title: "Scalable", description: "Grows with your business needs seamlessly" },
  { icon: "💎", title: "Premium Quality", description: "Attention to detail in every aspect" }
];

export const FOOTER_SECTIONS: FooterSection[] = [
  { title: "Product", links: ["Features", "Pricing", "Updates"] },
  { title: "Company", links: ["About", "Careers", "Blog"] },
  { title: "Connect", links: ["Twitter", "LinkedIn", "GitHub"] },
];
