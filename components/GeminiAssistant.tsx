import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { generateArchitectResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

export const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to the construct. Query the architecture.' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    const loadingMsg: ChatMessage = { role: 'model', text: '...', isLoading: true };
    setMessages(prev => [...prev, loadingMsg]);

    const responseText = await generateArchitectResponse(input);

    setMessages(prev => [
      ...prev.filter(m => !m.isLoading),
      { role: 'model', text: responseText }
    ]);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-16 h-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-cyan-500/20 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-ping opacity-20"></div>
          <Sparkles className="w-6 h-6 text-cyan-300 group-hover:text-white transition-colors" />
        </button>
      )}

      {isOpen && (
        <div className="w-80 sm:w-96 bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[500px] transition-all duration-300">
          {/* Header */}
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-xs tracking-widest uppercase text-slate-400">Architect AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-cyan-900/30 border border-cyan-500/20 text-cyan-100'
                      : 'bg-white/5 border border-white/10 text-slate-300'
                  }`}
                >
                  {msg.isLoading ? <span className="animate-pulse">Thinking...</span> : msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5 bg-slate-900/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about the vision..."
                className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-slate-600 focus:ring-0"
              />
              <button
                onClick={handleSend}
                className="text-cyan-500 hover:text-cyan-300 transition-colors"
                disabled={!input.trim()}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
