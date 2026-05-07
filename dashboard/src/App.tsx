import React, { useState } from 'react';
import { 
  Shield, 
  Terminal, 
  Settings, 
  Users, 
  Activity, 
  MessageSquare, 
  Hash,
  Bell,
  Cpu,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

const App = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex h-screen bg-[#1E1F22]">
      {/* Guild Sidebar (Mini) */}
      <aside className="w-20 bg-[#1E1F22] flex flex-col items-center py-4 gap-3 border-r border-black/20">
        <div className="w-12 h-12 bg-[#5865F2] rounded-2xl flex items-center justify-center text-white shadow-lg cursor-pointer hover:rounded-xl transition-all">
          <Globe size={24} />
        </div>
        <div className="w-8 h-[2px] bg-white/10 rounded-full" />
        <div className="w-12 h-12 bg-[#313338] rounded-full flex items-center justify-center text-[#5865F2] cursor-pointer hover:bg-[#5865F2] hover:text-white transition-all">
          <Plus size={24} />
        </div>
      </aside>

      {/* Main Sidebar */}
      <aside className="w-60 bg-[#2B2D31] flex flex-col">
        <div className="h-12 px-4 flex items-center border-b border-black/20 shadow-sm">
          <span className="font-bold text-white tracking-tight">BotNexus Dashboard</span>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {[
            { id: 'overview', icon: Activity, label: 'System Overview' },
            { id: 'commands', icon: Terminal, label: 'Command Logs' },
            { id: 'moderation', icon: Shield, label: 'Moderation' },
            { id: 'settings', icon: Settings, label: 'Bot Settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                activeTab === item.id 
                ? 'bg-[#3F4147] text-white' 
                : 'text-[#949BA4] hover:bg-[#35373C] hover:text-[#DBDEE1]'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main View */}
      <main className="flex-1 bg-[#313338] flex flex-col">
        <header className="h-12 px-6 flex items-center justify-between border-b border-black/20 shadow-sm bg-[#313338]">
          <div className="flex items-center gap-2 text-[#949BA4]">
            <Hash size={20} />
            <span className="font-bold text-white">{activeTab.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-4">
            <Bell size={20} className="text-[#B5BAC1]" />
            <Users size={20} className="text-[#B5BAC1]" />
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-12 gap-6">
            {/* Bot Status Card */}
            <section className="col-span-8 bg-[#2B2D31] rounded-lg p-6 border border-black/10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#5865F2] rounded-full flex items-center justify-center text-white text-2xl font-bold">BN</div>
                  <div>
                    <h2 className="text-xl font-bold text-white">BotNexus Pro <span className="text-xs bg-[#5865F2] px-1.5 py-0.5 rounded ml-2 uppercase">BOT</span></h2>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="status-indicator" />
                      <span className="text-sm text-[#B5BAC1]">Online & Functional</span>
                    </div>
                  </div>
                </div>
                <button className="btn-blurple">Manage Profile</button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#1E1F22] p-4 rounded-md">
                  <div className="flex items-center gap-2 text-[#949BA4] mb-1">
                    <Users size={14} />
                    <span className="text-xs font-bold uppercase">Total Servers</span>
                  </div>
                  <span className="text-2xl font-bold text-white">1,240</span>
                </div>
                <div className="bg-[#1E1F22] p-4 rounded-md">
                  <div className="flex items-center gap-2 text-[#949BA4] mb-1">
                    <MessageSquare size={14} />
                    <span className="text-xs font-bold uppercase">Commands Run</span>
                  </div>
                  <span className="text-2xl font-bold text-white">45.2k</span>
                </div>
                <div className="bg-[#1E1F22] p-4 rounded-md">
                  <div className="flex items-center gap-2 text-[#949BA4] mb-1">
                    <Cpu size={14} />
                    <span className="text-xs font-bold uppercase">RAM Usage</span>
                  </div>
                  <span className="text-2xl font-bold text-white">142MB</span>
                </div>
              </div>
            </section>

            {/* Right Panel: Recent Logs */}
            <section className="col-span-4 bg-[#2B2D31] rounded-lg p-6 border border-black/10">
              <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { user: 'Neo', action: '!kick @Spammer', time: '2m ago', color: 'text-[#ED4245]' },
                  { user: 'Admin', action: '!clear 50', time: '15m ago', color: 'text-[#FEE75C]' },
                  { user: 'System', action: 'Bot Restarted', time: '1h ago', color: 'text-[#57F287]' },
                ].map((log, i) => (
                  <div key={i} className="flex flex-col gap-1 border-b border-white/5 pb-3 last:border-0">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-white">{log.user}</span>
                      <span className="text-[#949BA4]">{log.time}</span>
                    </div>
                    <code className={`text-[13px] ${log.color}`}>{log.action}</code>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

const Plus = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

export default App;
