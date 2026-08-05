import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Profile } from '../types';
import { MapPin, Sparkles, X, Heart, MessageCircle } from 'lucide-react';

interface DiscoverViewProps {
  profiles: Profile[];
}

export function DiscoverView({ profiles }: DiscoverViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const currentProfile = profiles[currentIndex];

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentProfile && activePhotoIndex < currentProfile.photos.length - 1) {
      setActivePhotoIndex(prev => prev + 1);
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex > 0) {
      setActivePhotoIndex(prev => prev - 1);
    }
  };

  const nextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setActivePhotoIndex(0);
    }
  };

  if (!currentProfile) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <Sparkles className="w-12 h-12 text-rose-500 mb-4 opacity-50" />
        <h2 className="text-xl font-semibold text-zinc-200 mb-2">You're all caught up!</h2>
        <p className="text-zinc-500 text-sm">We're finding more quality matches for you. Check back later.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Discover</h1>
          <p className="text-sm text-zinc-400">Your 6 picks for today</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-rose-400" />
        </div>
      </div>

      <div className="px-4">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentProfile.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full bg-[#FDFBF7] rounded-[2rem] overflow-hidden shadow-2xl relative"
          >
            {/* Photo Section */}
            <div className="relative aspect-[3/4] w-full">
              <img 
                src={currentProfile.photos[activePhotoIndex]} 
                alt={currentProfile.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              {/* Photo Navigation Overlays */}
              <div className="absolute inset-y-0 left-0 w-1/2 cursor-pointer" onClick={handlePrevPhoto} />
              <div className="absolute inset-y-0 right-0 w-1/2 cursor-pointer" onClick={handleNextPhoto} />

              {/* Photo Indicators */}
              <div className="absolute top-4 inset-x-4 flex gap-1 z-10">
                {currentProfile.photos.map((_, i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i === activePhotoIndex ? 'bg-white' : 'bg-white/30'}`} />
                ))}
              </div>

              {/* Basic Info */}
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <div className="flex items-end justify-between mb-2">
                  <h2 className="text-4xl font-bold font-serif">{currentProfile.name}, {currentProfile.age}</h2>
                </div>
                <div className="flex items-center gap-1.5 text-white/80 text-sm font-medium">
                  <MapPin className="w-4 h-4" />
                  {currentProfile.location} • {currentProfile.distance}
                </div>
              </div>
            </div>

            {/* Detailed Profile Info */}
            <div className="p-6 space-y-8 bg-[#FDFBF7] text-zinc-900">
              
              <section>
                <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-3">About Me</h3>
                <p className="text-zinc-800 text-base leading-relaxed">{currentProfile.bio}</p>
              </section>

              <section>
                <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-3">The Vibe</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.vibes.map(vibe => (
                    <span key={vibe} className="px-4 py-2 bg-rose-50 text-rose-700 rounded-full text-sm font-medium border border-rose-100">
                      {vibe}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.interests.map(interest => (
                    <span key={interest} className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium">
                      {interest}
                    </span>
                  ))}
                </div>
              </section>

              {currentProfile.prompts.map((prompt, i) => (
                <section key={i} className="bg-zinc-50 rounded-2xl p-5 border border-zinc-100 relative group cursor-pointer transition-colors hover:bg-rose-50">
                  <h3 className="text-sm font-serif italic text-zinc-600 mb-2">"{prompt.question}"</h3>
                  <p className="text-zinc-900 font-medium">{prompt.answer}</p>
                  
                  {/* Icebreaker button */}
                  <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500 text-white shadow-md">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </section>
              ))}

              <section className="pb-8">
                <div className="flex items-center justify-between p-4 bg-zinc-900 text-white rounded-2xl">
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-1">Intention</h3>
                    <p className="font-medium">{currentProfile.intention}</p>
                  </div>
                </div>
              </section>

            </div>

            {/* Action Bar */}
            <div className="sticky bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7] to-transparent flex justify-center gap-4 pb-8">
              <button onClick={nextProfile} className="w-14 h-14 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-zinc-600 transition-colors shadow-sm">
                <X className="w-6 h-6" />
              </button>
              <button onClick={nextProfile} className="flex-1 max-w-[200px] h-14 rounded-full bg-rose-500 flex items-center justify-center gap-2 text-white font-semibold shadow-lg shadow-rose-500/25 hover:bg-rose-600 transition-colors">
                <Heart className="w-5 h-5 fill-current" />
                <span>Send Like</span>
              </button>
            </div>
            
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
