import { CustomLayout } from "@/components/customeLayout";
import SyllabusClient from "@/components/SyllabusClient";
import { GraduationCap } from "lucide-react";

const streams = [
  {
    id: "science",
    title: "Science – UG",
    iconName: "beaker",
    color: "bg-emerald-50",
    subjects: ["Physics", "Chemistry", "Mathematics", "Zoology", "Botany", "Statistics"]
  },
  {
    id: "arts",
    title: "Arts & Social Science",
    iconName: "palette",
    color: "bg-rose-50",
    subjects: ["History", "Political Science", "Economics", "Sociology", "Geography"]
  },
  {
    id: "commerce",
    title: "Commerce – UG",
    iconName: "trending-up",
    color: "bg-blue-50",
    subjects: ["Financial Accounting", "Business Law", "Audit & Taxation"]
  },
  {
    id: "vocational",
    title: "Professional Courses",
    iconName: "briefcase",
    color: "bg-amber-50",
    subjects: ["BCA", "BBM", "Biotechnology", "Library Science"]
  }
];

export default function Syllabus() {
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

        {/* Interactive Syllabus Grid (Client Component) */}
        <SyllabusClient streams={streams} />

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