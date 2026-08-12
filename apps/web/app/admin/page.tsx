"use client";

import { BarChart3, AlertCircle, FileQuestion, Users, Settings } from "lucide-react";

export default function AdminDashboard() {
  // Mock data for Phase 0
  const gaps = [
    { id: 1, topic: "SSO Integration", frequency: 45, lastAsked: "2 hrs ago" },
    { id: 2, topic: "Export to CSV", frequency: 32, lastAsked: "4 hrs ago" },
    { id: 3, topic: "Custom Domain Setup", frequency: 28, lastAsked: "1 day ago" },
    { id: 4, topic: "Refund Policy", frequency: 15, lastAsked: "2 days ago" },
  ];

  return (
    <div className="flex h-screen bg-[#1A1A1A] text-[#EDEDED] font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-white text-xs">B</span>
            </div>
            Beacon Admin
          </h1>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 text-white">
            <AlertCircle size={18} className="text-escalation" />
            <span className="font-medium text-sm">Knowledge Gaps</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors">
            <BarChart3 size={18} />
            <span className="font-medium text-sm">Analytics</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors">
            <Users size={18} />
            <span className="font-medium text-sm">Conversations</span>
          </a>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors">
            <Settings size={18} />
            <span className="font-medium text-sm">Settings</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-10">
        <header className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-2">Knowledge Gaps</h2>
          <p className="text-white/60 text-sm">
            Topics users are asking about that the knowledge base cannot answer, ranked by frequency.
          </p>
        </header>

        <div className="grid gap-4">
          {gaps.map((gap) => (
            <div key={gap.id} className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="mt-1 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                  <FileQuestion size={18} className="text-white/80" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">{gap.topic}</h3>
                  <p className="text-xs text-white/50 flex items-center gap-3">
                    <span>Asked {gap.frequency} times</span>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span>Last asked {gap.lastAsked}</span>
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-lg text-sm font-medium hover:bg-primary/30 transition-colors">
                Add Document
              </button>
            </div>
          ))}
        </div>
        
        {/* Empty state example for docs */}
        <div className="mt-12 p-8 border border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <AlertCircle className="text-white/40" />
          </div>
          <h3 className="text-white font-medium mb-2">No more gaps detected</h3>
          <p className="text-white/50 text-sm max-w-sm">
            Your knowledge base is currently answering all incoming questions successfully.
          </p>
        </div>
      </main>
    </div>
  );
}
