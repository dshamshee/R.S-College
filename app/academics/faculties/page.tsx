import { CustomLayout } from "@/components/customeLayout";
import { UserCheck, CheckCircle2 } from "lucide-react";

const facultyData = [
  {
    name: "Faculty of Science",
    head: "Dr. Arvind Kumar Sharma",
    designation: "Dean of Science",
    color: "border-blue-600",
    description: "Dedicated to advancing scientific knowledge through rigorous academic programs in Physics, Chemistry, and Biological Sciences.",
    pillars: ["Advanced Laboratory Research", "Scientific Methodologies", "Environmental Studies"]
  },
  {
    name: "Faculty of Humanities & Arts",
    head: "Prof. Brajesh Prasad Yadav",
    designation: "Dean of Arts",
    color: "border-emerald-600",
    description: "Focusing on the study of human culture, history, and social structures to develop critical thinking and societal awareness.",
    pillars: ["Linguistic Excellence", "Historical Documentation", "Cultural Heritage"]
  },
  {
    name: "Faculty of Social Sciences",
    head: "Dr. S.N. Mishra",
    designation: "Dean of Social Sciences",
    color: "border-orange-600",
    description: "Exploring the complexities of human behavior, political systems, and economic theories in a globalized world.",
    pillars: ["Socio-Economic Research", "Political Analysis", "Behavioral Sciences"]
  }
];

export default function Faculties() {
  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-16">

        {/* Title Section */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl font-bold text-blue-900 mb-6">Our Academic Faculties</h1>
          <p className="text-slate-600 leading-relaxed text-lg">
            Our academic structure is organized into specialized faculties to ensure high standards of teaching and research excellence under <strong>Purnea University</strong>.
          </p>
        </div>

        {/* Faculties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {facultyData.map((faculty, index) => (
            <div
              key={index}
              className={`group flex flex-col bg-white border-t-4 ${faculty.color} rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300`}
            >
              {/* Main Content Wrapper */}
              <div className="flex-grow flex flex-col items-start">

                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  {faculty.name}
                </h3>

                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                  {faculty.description}
                </p>

                {/* Pillars List */}
                <div className="w-full mt-auto mb-8">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Academic Focus</p>
                  <ul className="space-y-3">
                    {faculty.pillars.map((pillar, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                        <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                        {pillar}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer Profile Section */}
              <div className="pt-6 border-t border-slate-100 flex items-center gap-4 mt-auto">
                <div className="w-11 h-11 bg-blue-900 rounded-lg flex items-center justify-center text-white shrink-0">
                  <UserCheck size={22} />
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-bold text-slate-800 text-sm truncate">{faculty.head}</h4>
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                    {faculty.designation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section - Message from Administration */}
        <div className="mt-20 p-10 bg-slate-50 rounded-2xl border border-slate-100 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Academic Excellence</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Every faculty at Ramdev Sharda College is dedicated to providing an environment that
            encourages intellectual curiosity and professional growth.
          </p>
        </div>
      </div>
    </CustomLayout>
  );
}