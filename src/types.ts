export type Tab = 'discover' | 'matches' | 'messages' | 'profile';

export interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  distance: string;
  photos: string[];
  bio: string;
  vibes: string[];
  interests: string[];
  lifestyle: string[];
  intention: string;
  prompts: {
    question: string;
    answer: string;
  }[];
  chemistryScore?: number;
  matchDetails?: {
    lifestyle: number;
    interests: number;
    goals: number;
    personality: number;
  };
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMine: boolean;
}

export interface Chat {
  id: string;
  profile: Profile;
  lastMessage: string;
  unread: number;
  messages: Message[];
}
