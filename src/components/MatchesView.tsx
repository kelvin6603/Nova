import { Profile } from '../types';
import { motion } from 'motion/react';
import { Sparkles, CalendarHeart, Video, Loader2 } from 'lucide-react';
import { ChemistryChart } from './ChemistryChart';
import { useState } from 'react';

interface MatchesViewProps {
  profiles: Profile[];
  accessToken: string | null;
}

export function MatchesView({ profiles, accessToken }: MatchesViewProps) {
  // Only show profiles that have a chemistry score
  const matches = profiles.filter(p => p.chemistryScore && p.matchDetails);
  
  const [isCreatingMeet, setIsCreatingMeet] = useState(false);
  const [meetLink, setMeetLink] = useState<string | null>(null);

  const createMeet = async () => {
    if (!accessToken) {
      alert("Please sign in first to create a Google Meet.");
      return;
    }
    setIsCreatingMeet(true);
    try {
      // Calls the Google Meet API to create a new meeting space
      const response = await fetch('https://meet.googleapis.com/v2/spaces', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}) // Empty body for default space creation
      });
      
      if (!response.ok) {
        throw new Error('Failed to create Google Meet space');
      }
      
      const data = await response.json();
      setMeetLink(data.meetingUri);
    } catch (error) {
      console.error("Meet error:", error);
      alert("Could not create meeting. Check console for details.");
    } finally {
      setIsCreatingMeet(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto">
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Matches</h1>
        <p className="text-sm text-zinc-400">People who liked you back</p>
      </div>

      <div className="px-4 flex flex-col gap-6">
        {matches.map((match, i) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden p-2"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative mb-4 bg-zinc-800">
              <img src={match.photos[0]} alt={match.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="text-white font-bold text-xl">{match.name}, {match.age}</h3>
                <p className="text-zinc-300 text-sm">{match.intention}</p>
              </div>

              {/* Chemistry Score Badge */}
              <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-rose-400 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xl">
                <Sparkles className="w-3.5 h-3.5" />
                {match.chemistryScore}% Match
              </div>
            </div>

            <div className="px-2 pb-2">
              <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-2">Compatibility</h4>
              <div className="bg-zinc-950/50 rounded-2xl border border-zinc-800/50 p-2 mb-4">
                <ChemistryChart data={match.matchDetails!} />
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <button className="flex-1 bg-zinc-800 border border-zinc-700 text-white rounded-xl py-3 text-sm font-medium hover:bg-zinc-700 transition-colors">
                  Send Message
                </button>
                <button className="w-12 flex items-center justify-center bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-xl hover:bg-rose-500 hover:text-white transition-colors" title="Date Mode">
                  <CalendarHeart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Date Mode Banner */}
      <div className="mx-4 mt-8 bg-gradient-to-br from-indigo-500/10 to-rose-500/10 border border-rose-500/20 rounded-2xl p-5 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-rose-400 mb-2">
            <Video className="w-5 h-5" />
            <span className="font-bold text-sm tracking-wide uppercase">Virtual Date</span>
          </div>
          <h3 className="text-zinc-100 font-semibold mb-1 text-lg">Schedule a video call</h3>
          <p className="text-zinc-400 text-sm mb-4">Instantly create a Google Meet link to chat face-to-face with your match securely.</p>
          
          {meetLink ? (
            <div className="bg-zinc-950/50 p-3 rounded-xl border border-rose-500/30 flex items-center justify-between">
              <span className="text-sm text-zinc-300 truncate mr-2">{meetLink}</span>
              <a href={meetLink} target="_blank" rel="noreferrer" className="flex-shrink-0 bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-rose-600 transition-colors">
                Join Call
              </a>
            </div>
          ) : (
            <button 
              onClick={createMeet} 
              disabled={isCreatingMeet}
              className="bg-white text-zinc-900 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-100 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isCreatingMeet && <Loader2 className="w-4 h-4 animate-spin" />}
              {isCreatingMeet ? 'Creating...' : 'Create Meet Link'}
            </button>
          )}
        </div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
