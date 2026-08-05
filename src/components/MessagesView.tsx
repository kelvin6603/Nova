import { Chat } from '../types';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';

interface MessagesViewProps {
  chats: Chat[];
}

export function MessagesView({ chats }: MessagesViewProps) {
  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto">
      <div className="px-6 py-4 sticky top-0 bg-zinc-950/80 backdrop-blur-xl z-10">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4">Messages</h1>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search conversations..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2.5 pl-10 pr-4 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
          />
        </div>
      </div>

      <div className="px-4 mt-2">
        <div className="space-y-1">
          {chats.map((chat, i) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-2xl hover:bg-zinc-900/50 cursor-pointer transition-colors"
            >
              <div className="relative">
                <img 
                  src={chat.profile.photos[0]} 
                  alt={chat.profile.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-zinc-950"
                />
                {chat.unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-zinc-950">
                    {chat.unread}
                  </span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-zinc-100 truncate">{chat.profile.name}</h3>
                  <span className="text-xs text-zinc-500 flex-shrink-0">
                    {chat.messages[chat.messages.length - 1].timestamp}
                  </span>
                </div>
                <p className={`text-sm truncate ${chat.unread > 0 ? 'text-zinc-200 font-medium' : 'text-zinc-500'}`}>
                  {chat.messages[chat.messages.length - 1].senderId === 'me' ? 'You: ' : ''}
                  {chat.lastMessage}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
