"use client";

import { useState } from "react";
import { Send, Bot, User, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  role: "user" | "bot";
  content: string;
  confidence_score?: number;
};

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      role: "bot",
      content: "Hello! How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEscalated, setIsEscalated] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isEscalated) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Dummy API call for Phase 0
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/api/v1/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          content: data.reply,
          confidence_score: data.confidence_score,
        };
        
        setMessages((prev) => [...prev, botMessage]);

        // Mock escalation if user asks for it (Phase 0 manual testing)
        if (userMessage.content.toLowerCase().includes("escalate")) {
          setIsEscalated(true);
        }
      } else {
        console.error("Failed to fetch response");
      }
    } catch (error) {
      console.error("Error connecting to chat API", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-4 relative pt-12">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Beacon Support</h1>
        <p className="text-sm opacity-70">Ask us anything about our product.</p>
      </header>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-start max-w-[85%] ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.role === "user"
                    ? "bg-primary text-white ml-3"
                    : "bg-black/5 mr-3"
                }`}
              >
                {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div
                className={`p-3 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-white"
                    : "bg-white border shadow-sm"
                }`}
              >
                {msg.content}
                
                {msg.role === "bot" && msg.confidence_score !== undefined && (
                  <div className="mt-2 text-xs border-t pt-2 opacity-60 flex items-center gap-1">
                    <FileText size={12} />
                    Citation: Source Docs (Conf: {msg.confidence_score.toFixed(2)})
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black/5 mr-3 flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="p-3 rounded-2xl bg-white border shadow-sm flex gap-1 items-center h-10">
                <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}

        <AnimatePresence>
          {isEscalated && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1], // Custom smooth ease-out from DESIGN.md
              }}
              className="mt-6 border-l-4 border-escalation bg-escalation/10 p-4 rounded-r-xl"
            >
              <h3 className="text-escalation font-medium flex items-center gap-2 mb-1">
                Handing this to a person
              </h3>
              <p className="text-sm opacity-80">
                I'm not completely confident in my answer. A human agent will take over this conversation shortly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="relative mt-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isEscalated ? "Conversation paused..." : "Type your message..."}
          disabled={isLoading || isEscalated}
          className="w-full bg-white border border-black/10 rounded-full py-3 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading || isEscalated}
          className="absolute right-2 top-2 bottom-2 aspect-square bg-primary text-white rounded-full flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
