"use client";

import { useState } from "react";
import { 
  Download, 
  BookOpen,
} from "lucide-react";

interface Stream {
  id: string;
  title: string;
  iconName: string;
  color: string;
  subjects: string[];
}

const iconMap: Record<string, React.ReactNode> = {};

export default function SyllabusClient({ streams }: { streams: Stream[] }) {
  const [activeStream, setActiveStream] = useState<string | null>(null);

  return (
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
              <BookOpen size={28} />
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
  );
}
