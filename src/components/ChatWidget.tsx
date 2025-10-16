import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen && user) {
      fetchMessages();
    }
  }, [isOpen, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('messages_chat')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setMessages(data);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !user) return;

    setLoading(true);

    // Add user message
    const userMsg = {
      user_id: user.id,
      message: inputMessage,
      sender: 'user',
      created_at: new Date().toISOString()
    };

    await supabase.from('messages_chat').insert(userMsg);
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(async () => {
      const botMsg = {
        user_id: user.id,
        message: 'Merci pour votre message ! Un conseiller vous répondra dans les plus brefs délais.',
        sender: 'bot',
        created_at: new Date().toISOString()
      };

      await supabase.from('messages_chat').insert(botMsg);
      setMessages(prev => [...prev, botMsg]);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col md:w-96 max-md:w-full max-md:h-full max-md:bottom-0 max-md:right-0 max-md:rounded-none">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-400 to-cyan-500 p-4 rounded-t-2xl max-md:rounded-none flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-teal-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold">Assistant Prévoyance</h3>
              <p className="text-white/80 text-sm">En ligne</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!user ? (
              <div className="text-center text-slate-500 mt-8">
                <p>Connectez-vous pour discuter avec nous</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-slate-500 mt-8">
                <p>Bonjour ! Comment puis-je vous aider ?</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {user && (
            <form onSubmit={sendMessage} className="p-4 border-t border-slate-200">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Votre message..."
                  className="flex-1"
                  disabled={loading}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-gradient-to-r from-teal-400 to-cyan-500"
                  disabled={loading}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
}