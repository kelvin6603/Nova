import { Tab } from '../types';
import { Compass, Heart, MessageSquare, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

export function BottomNav({ activeTab, onChange }: BottomNavProps) {
  const tabs = [
    { id: 'discover', icon: Compass, label: 'Discover' },
    { id: 'matches', icon: Heart, label: 'Matches' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'profile', icon: User, label: 'Profile' },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800/50 pb-safe pt-2 px-6 z-50">
      <div className="flex justify-between items-center h-14">
        {tabs.map(({ id, icon: Icon, label }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className="flex flex-col items-center justify-center w-16 gap-1"
            >
              <div className={`relative p-2 rounded-full transition-colors ${isActive ? 'text-rose-400' : 'text-zinc-500 hover:text-zinc-300'}`}>
                {isActive && (
                  <span className="absolute inset-0 bg-rose-500/10 rounded-full blur-sm" />
                )}
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className="relative z-10" />
              </div>
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-rose-400' : 'text-zinc-600'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
