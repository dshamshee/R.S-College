"use client";

import { useState } from "react";
import { 
  Clock, 
  BookOpen, 
  MapPin, 
  Beaker,
  ChevronRight,
  ClipboardCheck
} from "lucide-react";

interface TimeTableRow {
  time: string;
  subject: string;
  room: string;
  teacher: string;
}

interface TimeTableData {
  BA: TimeTableRow[];
  BCOM: TimeTableRow[];
  LAB: TimeTableRow[];
}

export default function TimeTableClient({ timeTableData }: { timeTableData: TimeTableData }) {
  const [activeTab, setActiveTab] = useState<"BA" | "BCOM" | "LAB">("BA");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
      
      {/* Sidebar Navigation */}
      <div className="lg:col-span-1 space-y-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-2">Select Category</p>
        
        <button 
          onClick={() => setActiveTab("BA")}
          className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${activeTab === "BA" ? "bg-blue-600 text-white border-blue-600 shadow-lg" : "bg-white text-slate-600 border-slate-100 hover:border-blue-200"}`}
        >
          <div className="flex items-center gap-3 font-bold text-sm">
            <BookOpen size={18} /> B.A (Humanities)
          </div>
          <ChevronRight size={16} className={activeTab === "BA" ? "opacity-100" : "opacity-30"} />
        </button>

        <button 
          onClick={() => setActiveTab("BCOM")}
          className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${activeTab === "BCOM" ? "bg-blue-600 text-white border-blue-600 shadow-lg" : "bg-white text-slate-600 border-slate-100 hover:border-blue-200"}`}
        >
          <div className="flex items-center gap-3 font-bold text-sm">
            <ClipboardCheck size={18} /> B.Com (Commerce)
          </div>
          <ChevronRight size={16} className={activeTab === "BCOM" ? "opacity-100" : "opacity-30"} />
        </button>

        <button 
          onClick={() => setActiveTab("LAB")}
          className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${activeTab === "LAB" ? "bg-emerald-600 text-white border-emerald-600 shadow-lg" : "bg-white text-slate-600 border-slate-100 hover:border-emerald-200"}`}
        >
          <div className="flex items-center gap-3 font-bold text-sm">
            <Beaker size={18} /> Laboratory / Practical
          </div>
          <ChevronRight size={16} className={activeTab === "LAB" ? "opacity-100" : "opacity-30"} />
        </button>

        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 mt-6">
           <h4 className="text-xs font-bold text-blue-900 mb-2">Note:</h4>
           <p className="text-[11px] text-slate-500 leading-relaxed">
             Lab sessions are mandatory for Science students. Please bring your 
             lab manuals and ID cards for entry.
           </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-3">
        <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
          
          {/* Table Header Section */}
          <div className={`p-6 text-white flex items-center justify-between ${activeTab === 'LAB' ? 'bg-emerald-600' : 'bg-blue-900'}`}>
            <div>
              <h2 className="text-xl font-bold">
                {activeTab === "BA" ? "B.A. General Schedule" : activeTab === "BCOM" ? "B.Com. General Schedule" : "Science Practical Timing"}
              </h2>
              <p className="text-xs opacity-70">Showing timings for Monday - Saturday</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-md text-[10px] font-bold uppercase tracking-widest">
                Live Session 2026
              </div>
            </div>
          </div>

          {/* Scrollable Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Time</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subject</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Venue</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Faculty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {timeTableData[activeTab].map((row, i) => (
                  <tr key={i} className={`group hover:bg-slate-50/80 transition-colors ${row.subject === "Recess" ? "bg-slate-50/40" : ""}`}>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                        <Clock size={14} className="text-blue-500" />
                        {row.time}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`font-bold text-sm ${activeTab === 'LAB' ? 'text-emerald-700' : 'text-blue-900'}`}>
                        {row.subject}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                        <MapPin size={12} />
                        {row.room}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-slate-500 text-xs italic">
                      {row.teacher}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
