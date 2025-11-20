import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import type { Database } from "@/types/supabase";

type DbMessage = Database["public"]["Tables"]["messages_chat"]["Row"];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<DbMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const fetchMessages = useCallback(async () => {
    if (!user) return;
    setHistoryLoading(true);
    try {
      const { data, error } = await supabase
        .from("messages_chat")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(data ?? []);
    } catch (err) {
      console.error("Erreur de chargement des messages :", err);
      setMessages([]);
    } finally {
      setHistoryLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (isOpen && user) {
      void fetchMessages();
    }
  }, [isOpen, user, fetchMessages]);

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel(`chat-user-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages_chat",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const newMessage = payload.new as DbMessage;
          setMessages((prev) => {
            const exists = prev.some((msg) => msg.id === newMessage.id);
            if (exists) return prev;
            return [...prev, newMessage];
          });
        }
      );

    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        void fetchMessages();
      }
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, fetchMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!inputMessage.trim() || !user) return;

    setLoading(true);
    const content = inputMessage.trim();
    setInputMessage("");

    try {
      const { error } = await supabase.from("messages_chat").insert({
        user_id: user.id,
        message: content,
        sender: "user",
      });

      if (error) throw error;
    } catch (err) {
      console.error("Impossible d’envoyer le message :", err);
      setInputMessage(content);
    } finally {
      setLoading(false);
    }
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
            ) : historyLoading ? (
              <div className="mt-8 flex flex-col items-center gap-3 text-slate-500">
                <Loader2 className="h-6 w-6 animate-spin text-teal-500" />
                <p>Chargement de la conversation…</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-slate-500 mt-8">
                <p>Bonjour ! Comment puis-je vous aider ?</p>
              </div>
            ) : (
              messages.map((msg) => {
                const isUser = msg.sender === "user";
                const isAdvisor =
                  msg.sender === "admin" || msg.sender === "bot";
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${
                        isUser
                          ? "bg-teal-600 text-white"
                          : "bg-slate-100 text-slate-900"
                      }`}
                    >
                      {isAdvisor && (
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal-700">
                          Conseiller
                        </p>
                      )}
                      {msg.message}
                    </div>
                  </div>
                );
              })
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
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
}
