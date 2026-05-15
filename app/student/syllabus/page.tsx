"use client";

import { CustomLayout } from "@/components/customeLayout";
import { useState } from "react";
import { 
  Beaker, 
  Palette, 
  TrendingUp, 
  Briefcase, 
  Download, 
  ChevronDown,
  BookOpen,
  GraduationCap
} from "lucide-react";

const streams = [
  {
    id: "science",
    title: "Science – UG",
    icon: <Beaker className="text-emerald-600" />,
    color: "bg-emerald-50",
    subjects: ["Physics", "Chemistry", "Mathematics", "Zoology", "Botany", "Statistics"]
  },
  {
    id: "arts",
    title: "Arts & Social Science",
    icon: <Palette className="text-rose-600" />,
    color: "bg-rose-50",
    subjects: ["History", "Political Science", "Economics", "Sociology", "Geography"]
  },
  {
    id: "commerce",
    title: "Commerce – UG",
    icon: <TrendingUp className="text-blue-600" />,
    color: "bg-blue-50",
    subjects: ["Financial Accounting", "Business Law", "Audit & Taxation"]
  },
  {
    id: "vocational",
    title: "Professional Courses",
    icon: <Briefcase className="text-amber-600" />,
    color: "bg-amber-50",
    subjects: ["BCA", "BBM", "Biotechnology", "Library Science"]
  }
];

export default function Syllabus() {
  const [activeStream, setActiveStream] = useState<string | null>(null);

  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-16">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4 flex items-center justify-center md:justify-start gap-3">
            <GraduationCap size={48} className="text-blue-600" />
            Curriculum Hub
          </h1>
          <p className="text-slate-500 max-w-2xl leading-relaxed">
            Explore and download the latest CBCS-based syllabus for 2026 academic sessions. 
            Select your department below to view subject-wise distributions.
          </p>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {streams.map((stream) => (
            <div 
              key={stream.id}
              className={`relative overflow-hidden group cursor-pointer border rounded-[2rem] transition-all duration-300 ${
                activeStream === stream.id 
                ? "ring-2 ring-blue-600 border-transparent shadow-xl" 
                : "border-slate-100 bg-white hover:border-blue-200"
              }`}
              onClick={() => setActiveStream(activeStream === stream.id ? null : stream.id)}
            >
              <div className="p-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${stream.color}`}>
                  {stream.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{stream.title}</h3>
                <p className="text-xs text-slate-400 font-medium">Click to view subjects</p>
              </div>

              {/* Subject Dropdown (Mobile-Optimized) */}
              <div className={`overflow-hidden transition-all duration-500 ${activeStream === stream.id ? "max-h-[1000px] border-t border-slate-50 bg-slate-50/50" : "max-h-0"}`}>
                <div className="p-4 space-y-2">
                  {stream.subjects.map((subject) => (
                    <div 
                      key={subject} 
                      className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl hover:shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen size={14} className="text-slate-400" />
                        <span className="text-sm font-bold text-slate-700">{subject}</span>
                      </div>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Download size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Helper Section */}
        <div className="mt-20 p-10 bg-blue-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-10">
          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-3">Can&apos;t find your subject?</h2>
            <p className="text-blue-100/70 text-sm">
              If your specialized paper is not listed here, please check the 
              Purnea University main website or contact the department head.
            </p>
          </div>
          <button className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all whitespace-nowrap shadow-lg">
            Contact Registrar
          </button>
        </div>
      </div>
    </CustomLayout>
  );
}