import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import dbConnect from "@/config/dbConnection";
import FacultyModel from "@/models/faculty";
import { CustomLayout } from "@/components/customeLayout";
import { 
  GraduationCap, BookOpen, Mail, Phone, 
  Award, ArrowLeft, ShieldCheck, UserCheck 
} from "lucide-react";

export const dynamic = "force-dynamic";

interface FacultyPageProps {
  params: Promise<{ id: string }>;
}

import mongoose from "mongoose";
import { facultyData as staticFacultyData } from "@/lib/faculty-data";

export async function generateMetadata({ params }: FacultyPageProps): Promise<Metadata> {
  const { id } = await params;
  let faculty: any = null;

  try {
    await dbConnect();
    if (mongoose.Types.ObjectId.isValid(id)) {
      faculty = await FacultyModel.findById(id).lean();
    }
  } catch {
    // fallback below
  }

  if (!faculty) {
    faculty = staticFacultyData.find(
      (f: any, idx: number) => String(f._id || f.id || idx) === String(id) || encodeURIComponent(f.name) === id
    );
  }

  if (!faculty) {
    return {
      title: "Faculty Profile Not Found",
    };
  }

  return {
    title: `${faculty.name} – ${faculty.designation}`,
    description: `Profile of ${faculty.name}, ${faculty.designation} in the Department of ${faculty.department} at Ramdeo Sharda College, Salmari. Contact, achievements, and academic details.`,
    openGraph: {
      title: `${faculty.name} – Faculty Profile`,
      description: `${faculty.designation}, Department of ${faculty.department} at RDS College, Salmari.`,
      ...(faculty.image ? { images: [{ url: faculty.image, alt: faculty.name }] } : {}),
    },
  };
}

export default async function FacultyDetailPage({ params }: FacultyPageProps) {
  const { id } = await params;

  let faculty: any = null;


  try {
    await dbConnect();
    if (mongoose.Types.ObjectId.isValid(id)) {
      faculty = await FacultyModel.findById(id).lean();
    }
  } catch (error) {
    console.error("Error fetching faculty detail:", error);
  }

  // Fallback to static faculty data if not found in database
  if (!faculty) {
    faculty = staticFacultyData.find(
      (f: any, idx: number) => String(f._id || f.id || idx) === String(id) || encodeURIComponent(f.name) === id
    );
  }

  if (!faculty) {
    notFound();
  }

  const facultyData = {
    name: faculty.name,
    designation: faculty.designation,
    department: faculty.department,
    email: faculty.email,
    phone: faculty.phone,
    type: faculty.type,
    image: faculty.image,
    achivements: faculty.achivements || [],
  };

  return (
    <CustomLayout headerImage="academics.jpg">
      <div className="max-w-5xl mx-auto py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/academics/faculties"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-900 hover:text-blue-700 transition-colors bg-blue-50 px-4 py-2 rounded-xl"
          >
            <ArrowLeft size={16} />
            <span>Back to All Faculties</span>
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 md:h-44 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 relative" />

          {/* Profile Header Info */}
          <div className="relative px-6 sm:px-10 pb-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 sm:-mt-20 mb-8">
              
              {/* Profile Image */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-slate-100 flex-shrink-0">
                <Image
                  src={facultyData.image || "/images/placeholder.jpg"}
                  alt={facultyData.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Title & Badge */}
              <div className="text-center sm:text-left space-y-1 flex-grow">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2">
                  <UserCheck size={14} />
                  <span>{facultyData.type} STAFF</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  {facultyData.name}
                </h1>
                <p className="text-base sm:text-lg font-bold text-blue-900">
                  {facultyData.designation}
                </p>
                <p className="text-sm font-semibold text-slate-500 flex items-center justify-center sm:justify-start gap-1.5 pt-1">
                  <BookOpen size={16} className="text-blue-600" />
                  Department of {facultyData.department}
                </p>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
              
              {/* Contact & Department Details */}
              <div className="space-y-6">
                <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck size={18} className="text-blue-600" /> Official Profile Details
                </h3>

                <div className="bg-slate-50 rounded-2xl p-6 space-y-4 border border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Department
                    </span>
                    <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <BookOpen size={16} className="text-blue-600" />
                      {facultyData.department}
                    </p>
                  </div>

                  {facultyData.email && (
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${facultyData.email}`}
                        className="text-sm font-semibold text-blue-900 hover:underline flex items-center gap-2"
                      >
                        <Mail size={16} className="text-blue-600" />
                        {facultyData.email}
                      </a>
                    </div>
                  )}

                  {facultyData.phone && (
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Contact Phone
                      </span>
                      <a
                        href={`tel:${facultyData.phone}`}
                        className="text-sm font-semibold text-slate-800 hover:text-blue-900 flex items-center gap-2"
                      >
                        <Phone size={16} className="text-blue-600" />
                        {facultyData.phone}
                      </a>
                    </div>
                  )}

                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Institution
                    </span>
                    <p className="text-xs font-semibold text-slate-600">
                      Ramdeo Sharda College, Salmari (Purnea University)
                    </p>
                  </div>
                </div>
              </div>

              {/* Achievements & Academic Honors */}
              <div className="space-y-6">
                <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Award size={18} className="text-amber-600" /> Key Achievements & Contributions
                </h3>

                {facultyData.achivements && facultyData.achivements.length > 0 ? (
                  <div className="space-y-3">
                    {facultyData.achivements.map((achievement: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl"
                      >
                        <div className="p-2 bg-amber-100 text-amber-800 rounded-xl mt-0.5 shrink-0">
                          <Award size={16} />
                        </div>
                        <p className="text-sm font-medium text-amber-950 leading-relaxed">
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 bg-slate-50 border border-slate-100 rounded-2xl text-center text-slate-400">
                    <GraduationCap className="mx-auto mb-2 opacity-50" size={32} />
                    <p className="text-xs font-medium">No additional achievements listed yet.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

      </div>
    </CustomLayout>
  );
}
