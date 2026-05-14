import { CustomLayout } from "@/components/customeLayout";
import { Layers, ChevronRight, GraduationCap } from "lucide-react";
import Link from "next/link";

const departmentData = [
  {
    faculty: "Faculty of Science",
    departments: [
      { name: "Physics", head: "Dr. A.K. Sharma", code: "PHY" },
      { name: "Chemistry", head: "Prof. S. Prasad", code: "CHE" },
      { name: "Mathematics", head: "Dr. R.N. Das", code: "MAT" },
      { name: "Botany", head: "Prof. M. Kumari", code: "BOT" },
      { name: "Zoology", head: "Dr. V.K. Singh", code: "ZOO" },
    ]
  },
  {
    faculty: "Faculty of Humanities & Arts",
    departments: [
      { name: "History", head: "Prof. B.P. Yadav", code: "HIS" },
      { name: "Political Science", head: "Dr. S.N. Mishra", code: "POL" },
      { name: "Economics", head: "Prof. J.K. Jha", code: "ECO" },
      { name: "Hindi", head: "Dr. P.K. Singh", code: "HIN" },
      { name: "English", head: "Prof. R.S. Roy", code: "ENG" },
      { name: "Psychology", head: "Dr. D.K. Mahto", code: "PSY" },
    ]
  }
];

export default function Departments() {
  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-16">
        
        {/* Header Section */}
        <div className="mb-12 border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 text-blue-900 mb-4">
            <Layers size={32} />
            <h1 className="text-4xl font-bold">Academic Departments</h1>
          </div>
          <p className="text-slate-500 max-w-3xl leading-relaxed">
            Our departments are the pillars of our institution, dedicated to delivering high-quality 
            education and fostering research under the guidelines of Purnea University.
          </p>
        </div>

        {/* Departments List Section */}
        <div className="flex flex-col gap-12">
          {departmentData.map((faculty, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                <div className="w-2 h-8 bg-blue-600 rounded-full" />
                {faculty.faculty}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faculty.departments.map((dept, dIdx) => (
                  <div 
                    key={dIdx}
                    className="group bg-white border border-slate-100 p-5 rounded-xl flex items-center justify-between hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                        <span className="text-xs font-bold text-blue-900">{dept.code}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 group-hover:text-blue-900 transition-colors">
                          Department of {dept.name}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium">HOD: {dept.head}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Department Resources Card */}
        <div className="mt-16 bg-[#002b5b] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Departmental Faculty & Research</h2>
            <p className="text-blue-100 text-sm max-w-md">
              Access the detailed profiles of our esteemed faculty members and explore current 
              research projects happening within each department.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all flex items-center gap-2">
              <GraduationCap size={20} />
              Faculty Directory
            </button>
          </div>
        </div>

      </div>
    </CustomLayout>
  );
}