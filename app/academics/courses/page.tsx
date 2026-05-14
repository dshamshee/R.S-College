import { CustomLayout } from "@/components/customeLayout";
import { BookOpen, GraduationCap, Microscope, Briefcase } from "lucide-react";

const courseData = [
  {
    stream: "Faculty of Science",
    icon: <Microscope className="text-blue-600" size={32} />,
    description: "In-depth undergraduate programs focused on analytical thinking and scientific research.",
    subjects: ["Physics", "Chemistry", "Mathematics", "Botany", "Zoology"]
  },
  {
    stream: "Faculty of Arts / Humanities",
    icon: <BookOpen className="text-blue-600" size={32} />,
    description: "Comprehensive study of culture, society, and languages to develop critical perspectives.",
    subjects: ["History", "Political Science", "Economics", "Psychology", "Philosophy", "Hindi", "English"]
  },
  {
    stream: "Faculty of Commerce",
    icon: <Briefcase className="text-blue-600" size={32} />,
    description: "Professional training in accounting, finance, and business management for future leaders.",
    subjects: ["Accountancy", "Business Environment", "Financial Management", "Business Statistics"]
  }
];

export default function Courses() {
  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-16">
        
        {/* Page Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <GraduationCap size={48} className="text-blue-900 mb-4" />
          <h1 className="text-4xl font-bold text-blue-900">Academic Programs</h1>
          <div className="w-24 h-1 bg-blue-600 mt-4 rounded-full" />
          <p className="text-slate-600 mt-6 max-w-2xl leading-relaxed">
            Ramdev Sharda College offers a wide array of undergraduate courses affiliated with 
            Purnea University, designed to foster intellectual growth and professional competence.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courseData.map((course, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
            >
              <div className="mb-6 bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center">
                {course.icon}
              </div>
              
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                {course.stream}
              </h3>
              
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {course.description}
              </p>

              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Available Subjects
                </p>
                <ul className="grid grid-cols-1 gap-2">
                  {course.subjects.map((subject, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-center gap-2 text-slate-700 text-sm font-medium"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {subject}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 p-10 bg-slate-50 rounded-3xl border border-dashed border-slate-300 text-center">
          <h2 className="text-2xl font-bold text-blue-900">Ready to start your journey?</h2>
          <p className="text-slate-600 mt-2">Check eligibility criteria and apply online for the current academic session.</p>
          <button className="mt-6 bg-blue-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-all active:scale-95">
            Admission Portal
          </button>
        </div>

      </div>
    </CustomLayout>
  );
}