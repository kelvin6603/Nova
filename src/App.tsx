/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BottomNav } from './components/BottomNav';
import { DiscoverView } from './components/DiscoverView';
import { MatchesView } from './components/MatchesView';
import { MessagesView } from './components/MessagesView';
import { ProfileView } from './components/ProfileView';
import { mockProfiles, mockChats } from './data';
import { Tab } from './types';
import { initAuth, googleSignIn, logout, db } from './lib/firebase';
import { User } from 'firebase/auth';
import { LogIn } from 'lucide-react';
import { doc, getDocFromServer } from 'firebase/firestore';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('discover');
  const [needsAuth, setNeedsAuth] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setUser(user);
        setToken(token);
        setNeedsAuth(false);
      },
      () => setNeedsAuth(true)
    );
    
    // Test Firestore connection
    getDocFromServer(doc(db, 'test', 'connection')).catch(() => {});
    
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setUser(result.user);
        setNeedsAuth(false);
      }
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (needsAuth) {
    return (
      <div className="min-h-screen bg-zinc-950 font-sans text-zinc-50 flex items-center justify-center p-6">
        <div className="w-full max-w-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-rose-500 rounded-3xl rotate-12 flex items-center justify-center mb-8 shadow-2xl shadow-rose-500/20">
            <span className="text-white font-serif font-bold text-2xl -rotate-12">N</span>
          </div>
          <h1 className="text-3xl font-bold mb-3 tracking-tight">Welcome to NOVA</h1>
          <p className="text-zinc-400 mb-10 text-sm leading-relaxed">
            Meet someone worth staying for. Connect with Google to start exploring curated matches.
          </p>
          <button 
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full flex items-center justify-center gap-3 bg-white text-zinc-900 py-3.5 px-6 rounded-full font-semibold hover:bg-zinc-100 transition-colors disabled:opacity-50"
          >
            <LogIn className="w-5 h-5" />
            {isLoggingIn ? 'Connecting...' : 'Sign in with Google'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-50 flex justify-center overflow-hidden">
      <div className="w-full max-w-md bg-zinc-950 h-[100dvh] flex flex-col relative shadow-2xl border-x border-zinc-900/50">
        
        {/* Main Content Area */}
        {activeTab === 'discover' && <DiscoverView profiles={mockProfiles} />}
        {activeTab === 'matches' && <MatchesView profiles={mockProfiles} accessToken={token} />}
        {activeTab === 'messages' && <MessagesView chats={mockChats} />}
        {activeTab === 'profile' && <ProfileView user={user} onLogout={logout} />}

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onChange={setActiveTab} />
        
      </div>
    </div>
  );
}
