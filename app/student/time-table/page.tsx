"use client";

import { CustomLayout } from "@/components/customeLayout";
import { useState } from "react";
import { 
  Clock, 
  BookOpen, 
  Download, 
  MapPin, 
  Beaker,
  CalendarDays,
  ChevronRight,
  ClipboardCheck
} from "lucide-react";

// 1. Data Structure for all schedules
const timeTableData = {
  BA: [
    { time: "10:00 - 11:00", subject: "History / Hindi Literature", room: "Room 102", teacher: "Prof. R.K. Yadav" },
    { time: "11:00 - 12:00", subject: "Political Science", room: "Room 105", teacher: "Dr. S. Mishra" },
    { time: "12:00 - 12:30", subject: "Recess", room: "-", teacher: "-" },
    { time: "12:30 - 01:30", subject: "Sociology / Economics", room: "Room 108", teacher: "Dr. Anjali" },
    { time: "01:30 - 02:30", subject: "Psychology (Theory)", room: "Room 201", teacher: "Prof. Gupta" },
  ],
  BCOM: [
    { time: "10:00 - 11:00", subject: "Financial Accounting", room: "Room 302", teacher: "Dr. V.K. Singh" },
    { time: "11:00 - 12:00", subject: "Business Regulatory Framework", room: "Room 302", teacher: "Prof. Prasad" },
    { time: "12:00 - 12:30", subject: "Recess", room: "-", teacher: "-" },
    { time: "12:30 - 01:30", subject: "Corporate Accounting", room: "Room 304", teacher: "Dr. Sharma" },
    { time: "01:30 - 02:30", subject: "Principles of Marketing", room: "Room 305", teacher: "Prof. Sinha" },
  ],
  LAB: [
    { time: "10:00 - 01:00", subject: "Physics Lab (Group A)", room: "Science Block L1", teacher: "Lab Asst. Verma" },
    { time: "10:00 - 01:00", subject: "Chemistry Lab (Group B)", room: "Science Block L2", teacher: "Lab Asst. Khan" },
    { time: "01:30 - 04:00", subject: "Computer Lab (BCA/Voc)", room: "IT Center", teacher: "Danish Shamshee" },
    { time: "01:30 - 04:00", subject: "Botany Specimen Study", room: "Bio Lab", teacher: "Dr. Kumari" },
  ]
};

export default function TimeTable() {
  const [activeTab, setActiveTab] = useState<"BA" | "BCOM" | "LAB">("BA");

  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-16">
        
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-3">
              <CalendarDays size={16} /> Session 2026-27
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4">Academic Schedule</h1>
            <p className="text-slate-500 text-sm md:text-lg">
              Official lecture and practical timings for <strong>Ramdev Sharda College</strong> students.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-800 transition-all shadow-lg active:scale-95">
            <Download size={18} /> Download Full PDF
          </button>
        </div>

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
      </div>
    </CustomLayout>
  );
}