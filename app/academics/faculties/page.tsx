import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CustomLayout } from "@/components/customeLayout";
import dbConnect from "@/config/dbConnection";
import FacultyModel from "@/models/faculty";
import { facultyData as staticFacultyData } from "@/lib/faculty-data";
import { UserCheck, CheckCircle2, BookOpen, Mail, Phone, ArrowRight, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Faculty Members & Academic Staff",
  description: "Meet the distinguished faculty members of Ramdeo Sharda College, Salmari. View profiles, qualifications, and contact details of our teaching staff across Science, Arts, and Commerce departments.",
  openGraph: {
    title: "Faculty Directory – Ramdeo Sharda College",
    description: "Browse the complete directory of faculty members at RDS College with their designations, departments, and academic profiles.",
  },
};

export const dynamic = "force-dynamic";

const academicDivisions = [
  {
    name: "Faculty of Science",
    head: "Dr. Ali Ahmad Ansari",
    designation: "Dean of Science",
    color: "border-blue-600",
    description: "Dedicated to advancing scientific knowledge through rigorous academic programs in Physics, Chemistry, and Biological Sciences.",
    pillars: ["Advanced Laboratory Research", "Scientific Methodologies", "Environmental Studies"]
  },
  {
    name: "Faculty of Humanities & Arts",
    head: "Dr. Mandeep Kumar",
    designation: "Dean of Arts",
    color: "border-emerald-600",
    description: "Focusing on the study of human culture, history, and social structures to develop critical thinking and societal awareness.",
    pillars: ["Linguistic Excellence", "Historical Documentation", "Cultural Heritage"]
  },
  {
    name: "Faculty of Social Sciences",
    head: "Dr. Manoj Kumar Yadav",
    designation: "Dean of Social Sciences",
    color: "border-orange-600",
    description: "Exploring the complexities of human behavior, political systems, and economic theories in a globalized world.",
    pillars: ["Socio-Economic Research", "Political Analysis", "Behavioral Sciences"]
  }
];

export default async function FacultiesPage() {
  let dbFaculties: any[] = [];

  try {
    await dbConnect();
    const result = await FacultyModel.find({}).sort({ name: 1 }).lean();
    dbFaculties = JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Failed to load db faculties:", error);
  }

  const facultiesList = dbFaculties.length > 0 ? dbFaculties : staticFacultyData;

  return (
    <CustomLayout headerImage="academics.jpg">
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-16 space-y-20">

        {/* Title Section */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-900 rounded-lg text-xs font-bold uppercase tracking-wider mb-4">
            <GraduationCap size={16} /> Academic Directory
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-6 tracking-tight">
            Our Academic Faculties & Staff
          </h1>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg">
            Our academic structure is organized into specialized faculties and departments to ensure high standards of teaching and research excellence under <strong>Purnea University</strong>.
          </p>
        </div>

        {/* Individual Faculty Members Grid */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800">Faculty Members Profile</h2>
              <p className="text-xs text-slate-500 font-medium">Click on any faculty member to view full credentials & profile</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-900 text-xs font-bold rounded-full">
              {facultiesList.length} Members
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultiesList.map((faculty, index) => {
              const facultyId = faculty._id || faculty.id || encodeURIComponent(faculty.name);
              const detailHref = `/academics/faculties/${facultyId}`;

              return (
                <div
                  key={facultyId || index}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm flex-shrink-0 bg-slate-100">
                        <Image
                          src={faculty.image || "/images/placeholder.jpg"}
                          alt={faculty.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="font-extrabold text-slate-900 text-base leading-tight group-hover:text-blue-900 transition-colors">
                          {faculty.name}
                        </h3>
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mt-1">
                          {faculty.designation}
                        </p>
                        <span className="inline-block mt-2 text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                          {faculty.department}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
                      {faculty.email && (
                        <p className="flex items-center gap-2 truncate">
                          <Mail size={14} className="text-blue-500 flex-shrink-0" />
                          <span className="truncate">{faculty.email}</span>
                        </p>
                      )}
                      {faculty.phone && (
                        <p className="flex items-center gap-2 truncate">
                          <Phone size={14} className="text-blue-500 flex-shrink-0" />
                          <span>{faculty.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {faculty.type || "FACULTY"}
                    </span>
                    <Link
                      href={detailHref}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-700 transition-colors bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-sm hover:shadow"
                    >
                      <span>View Profile</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Faculties Divisions Section */}
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-6">Academic Divisions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {academicDivisions.map((faculty, index) => (
              <div
                key={index}
                className={`group flex flex-col bg-white border-t-4 ${faculty.color} rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex-grow flex flex-col items-start">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">
                    {faculty.name}
                  </h3>
                  <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                    {faculty.description}
                  </p>
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
        </div>

        {/* Bottom Section */}
        <div className="p-10 bg-slate-50 rounded-2xl border border-slate-100 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Academic Excellence</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Every faculty at Ramdeo Sharda College is dedicated to providing an environment that
            encourages intellectual curiosity and professional growth.
          </p>
        </div>
      </div>
    </CustomLayout>
  );
}