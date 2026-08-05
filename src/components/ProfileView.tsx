import { Settings, ShieldCheck, Sparkles, Zap, LogOut, Users, Loader2 } from 'lucide-react';
import { User } from 'firebase/auth';
import { useState } from 'react';
import { getAccessToken } from '../lib/firebase';

interface ProfileViewProps {
  user: User | null;
  onLogout: () => void;
}

interface Contact {
  resourceName: string;
  names?: { displayName: string }[];
  emailAddresses?: { value: string }[];
}

export function ProfileView({ user, onLogout }: ProfileViewProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);

  const fetchContacts = async () => {
    setIsLoadingContacts(true);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch('https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses&pageSize=5', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }

      const data = await response.json();
      if (data.connections) {
        setContacts(data.connections);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setIsLoadingContacts(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto">
      <div className="px-6 py-4 flex justify-between items-center sticky top-0 bg-zinc-950/80 backdrop-blur-xl z-10">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Profile</h1>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button 
            onClick={onLogout}
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-rose-400 transition-colors"
            title="Log out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-4 mt-4">
        {/* User Snapshot */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <img 
              src={user?.photoURL || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"} 
              alt="My Profile" 
              className="w-28 h-28 rounded-full object-cover border-4 border-zinc-900 shadow-xl"
            />
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-zinc-800 border-4 border-zinc-950 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-zinc-100 mb-1">{user?.displayName || 'Alex'}, 29</h2>
          <p className="text-zinc-400 text-sm">Long-term relationship</p>
        </div>

        {/* Invite Friends / Contacts */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Invite Friends</h3>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-5">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-zinc-100 font-semibold mb-1">Dating is better with friends</h4>
                <p className="text-zinc-400 text-sm">Invite your single friends from Google Contacts to join NOVA.</p>
              </div>
            </div>
            
            {contacts.length > 0 ? (
              <div className="space-y-3 mb-4">
                {contacts.map((contact, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                    <div className="truncate pr-4">
                      <p className="text-sm font-medium text-zinc-200 truncate">{contact.names?.[0]?.displayName || 'Unknown'}</p>
                      <p className="text-xs text-zinc-500 truncate">{contact.emailAddresses?.[0]?.value}</p>
                    </div>
                    <button className="shrink-0 bg-white text-zinc-900 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-zinc-100">
                      Invite
                    </button>
                  </div>
                ))}
              </div>
            ) : null}

            <button 
              onClick={fetchContacts}
              disabled={isLoadingContacts}
              className="w-full bg-zinc-800 text-zinc-200 font-semibold py-3 rounded-full hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoadingContacts && <Loader2 className="w-4 h-4 animate-spin" />}
              {contacts.length > 0 ? 'Load More Contacts' : 'Sync Google Contacts'}
            </button>
          </div>
        </div>

        {/* Subscription Tiers */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold px-2 mb-2">Subscriptions</h3>
          
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-900 border border-zinc-800 rounded-3xl p-5 relative overflow-hidden group hover:border-zinc-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  NOVA+
                </h4>
                <p className="text-zinc-400 text-sm">Convenience & Visibility</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-white">€14.99</span>
                <span className="text-zinc-500 text-xs block">/month</span>
              </div>
            </div>
            <ul className="space-y-2 mb-5">
              {['See who liked you', 'Advanced filters', '5 Super Likes/week'].map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full bg-zinc-800 text-white font-semibold py-3 rounded-full hover:bg-zinc-700 transition-colors">
              Upgrade to NOVA+
            </button>
          </div>

          <div className="bg-gradient-to-br from-rose-500/10 to-indigo-500/10 border border-rose-500/30 rounded-3xl p-5 relative overflow-hidden shadow-2xl shadow-rose-500/5">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-24 h-24 text-rose-500" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                    NOVA ELITE
                    <span className="bg-rose-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Pro</span>
                  </h4>
                  <p className="text-zinc-400 text-sm">The Ultimate Experience</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-white">€29.99</span>
                  <span className="text-zinc-500 text-xs block">/month</span>
                </div>
              </div>
              <ul className="space-y-2 mb-5">
                {['Everything in NOVA+', 'AI profile optimization', 'Premium date recommendations'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-200">
                    <Zap className="w-3 h-3 text-rose-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white text-zinc-900 font-bold py-3 rounded-full shadow-lg shadow-white/10 hover:bg-zinc-100 transition-colors">
                Get NOVA Elite
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
