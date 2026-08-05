import { Profile, Chat } from './types';

export const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Elena',
    age: 28,
    location: 'Berlin, Germany',
    distance: '3 km away',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800'
    ],
    bio: 'Architect by day, amateur chef by night. Looking for someone to explore hidden cafes and art galleries with.',
    vibes: ['Creative', 'Thoughtful', 'Spontaneous'],
    interests: ['Architecture', 'Natural Wine', 'Film Photography', 'Jazz'],
    lifestyle: ['Early bird', 'Active', 'Non-smoker'],
    intention: 'Long-term relationship',
    prompts: [
      { question: 'A weekend well spent is...', answer: 'Browsing a flea market and ending up at a cozy wine bar.' },
      { question: 'My most irrational fear', answer: 'Pigeons walking towards me too confidently.' }
    ],
    chemistryScore: 92,
    matchDetails: {
      lifestyle: 91,
      interests: 84,
      goals: 95,
      personality: 76
    }
  },
  {
    id: '2',
    name: 'Julian',
    age: 31,
    location: 'Berlin, Germany',
    distance: '5 km away',
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800'
    ],
    bio: 'Product designer. Dog dad to a very hyper retriever. Let\'s argue about which pizza place is the best.',
    vibes: ['Humorous', 'Driven', 'Laid-back'],
    interests: ['Bouldering', 'Pizza', 'Dogs', 'Design'],
    lifestyle: ['Coffee addict', 'Weekend traveler', 'Social drinker'],
    intention: 'Long-term relationship',
    prompts: [
      { question: 'I geek out on...', answer: 'Mid-century modern furniture and perfectly brewed espresso.' },
      { question: 'First round is on me if...', answer: 'You can beat me at Mario Kart.' }
    ],
    chemistryScore: 88,
    matchDetails: {
      lifestyle: 85,
      interests: 92,
      goals: 90,
      personality: 82
    }
  },
  {
    id: '3',
    name: 'Sofia',
    age: 26,
    location: 'Berlin, Germany',
    distance: '2 km away',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&q=80&w=800'
    ],
    bio: 'Curator at an independent gallery. Always planning the next getaway.',
    vibes: ['Curious', 'Artistic', 'Warm'],
    interests: ['Contemporary Art', 'Live Music', 'Reading', 'Yoga'],
    lifestyle: ['Vegetarian', 'Morning runner', 'Tea drinker'],
    intention: 'Casual dating',
    prompts: [
      { question: 'The way to my heart is...', answer: 'A curated playlist and a thoughtful recommendation.' }
    ],
    chemistryScore: 78,
    matchDetails: {
      lifestyle: 80,
      interests: 75,
      goals: 60,
      personality: 88
    }
  }
];

export const mockChats: Chat[] = [
  {
    id: 'c1',
    profile: mockProfiles[1],
    lastMessage: 'I actually know the best spot for espresso nearby. ☕',
    unread: 1,
    messages: [
      { id: 'm1', senderId: '2', text: 'I saw you also geek out on espresso.', timestamp: '10:42 AM', isMine: false },
      { id: 'm2', senderId: 'me', text: 'Yes! Always on the hunt for the perfect shot.', timestamp: '10:45 AM', isMine: true },
      { id: 'm3', senderId: '2', text: 'I actually know the best spot for espresso nearby. ☕', timestamp: '10:50 AM', isMine: false }
    ]
  },
  {
    id: 'c2',
    profile: mockProfiles[2],
    lastMessage: 'Let\'s go to the new exhibition on Friday!',
    unread: 0,
    messages: [
      { id: 'm1', senderId: 'me', text: 'Your gallery curations are amazing.', timestamp: 'Yesterday', isMine: true },
      { id: 'm2', senderId: '3', text: 'Aw, thank you! Let\'s go to the new exhibition on Friday!', timestamp: 'Yesterday', isMine: false }
    ]
  }
];
