import { CustomLayout } from "@/components/customeLayout";
import type { Metadata } from "next";
import TimeTableClient from "@/components/TimeTableClient";
import { 
  Download,
  CalendarDays,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Class Time Table",
  description: "View the weekly class timetable for B.A, B.Sc, and B.Com programs at Ramdeo Sharda College, Salmari. Subject-wise schedule with room and teacher details.",
  openGraph: {
    title: "Timetable – RDS College, Salmari",
    description: "Official class schedule for all undergraduate programs – B.A, B.Sc, and B.Com at Ramdeo Sharda College.",
  },
};

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

        {/* Interactive Time Table (Client Component) */}
        <TimeTableClient timeTableData={timeTableData} />

      </div>
    </CustomLayout>
  );
}