"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Mail, Phone, BookOpen, GraduationCap, ArrowRight, Eye } from "lucide-react";
import { facultyData as staticFacultyData } from "@/lib/faculty-data";

export const FacultyMarquee = () => {
  const [faculties, setFaculties] = useState<any[]>([]);

  useEffect(() => {
    const loadFaculties = async () => {
      try {
        const res = await axios.get("/api/faculty");
        if (res.data.success && res.data.data && res.data.data.length > 0) {
          setFaculties(res.data.data);
        } else {
          setFaculties(staticFacultyData);
        }
      } catch (err) {
        console.error("Failed to load dynamic faculties, using fallback:", err);
        setFaculties(staticFacultyData);
      }
    };
    loadFaculties();
  }, []);

  const teachingStaff = faculties.filter((f) => !f.type || f.type === "TEACHING");
  const displayStaff = teachingStaff.length > 0 ? teachingStaff : faculties;
  const duplicated = [...displayStaff, ...displayStaff];

  return (
    <section className="faculty-marquee-section w-full py-16 bg-gradient-to-b from-slate-50 to-white">
      {/* Section Header */}
      <div className="flex items-center justify-center gap-4 md:gap-8 mb-14 w-full max-w-7xl mx-auto px-4">
        <hr className="flex-grow border-t-2 border-blue-900 opacity-20" />
        <div className="flex flex-col items-center gap-1 text-center">
          <h2 className="text-2xl md:text-3xl text-blue-900 font-bold whitespace-nowrap tracking-tight">
            Our Faculties
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Meet the brilliant minds shaping futures at Ramdeo Sharda College
          </p>
        </div>
        <hr className="flex-grow border-t-2 border-blue-900 opacity-20" />
      </div>

      {/* Marquee Wrapper */}
      <div className="marquee-wrapper">
        <div className="marquee-fade-left" />
        <div className="marquee-fade-right" />

        {/* Scrolling track */}
        <div className="marquee-track">
          {duplicated.map((faculty, index) => {
            const facultyId = faculty._id || faculty.id || encodeURIComponent(faculty.name);
            const detailUrl = `/academics/faculties/${facultyId}`;

            return (
              <div
                key={`${faculty.name}-${index}`}
                className="flip-card"
              >
                <div className="flip-card-inner">
                  {/* ───── FRONT ───── */}
                  <div className="flip-card-front">
                    <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500" />
                    <div className="relative w-full h-[220px] bg-gradient-to-br from-slate-100 to-slate-50">
                      <Image
                        src={faculty.image || "/images/placeholder.jpg"}
                        alt={faculty.name}
                        fill
                        sizes="280px"
                        className="object-contain"
                      />
                    </div>
                    <div className="p-4 space-y-2 text-center flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-base font-bold text-slate-800 leading-tight line-clamp-1">
                          {faculty.name?.trim()}
                        </h3>
                        <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider line-clamp-1">
                          {faculty.designation}
                        </p>
                      </div>

                      {/* View More Button on Front */}
                      <Link
                        href={detailUrl}
                        className="mt-2 inline-flex items-center justify-center gap-1 px-4 py-1.5 bg-blue-900 text-white rounded-lg text-xs font-bold hover:bg-blue-800 transition-colors shadow-sm"
                      >
                        <Eye size={14} /> View More
                      </Link>
                    </div>
                  </div>

                  {/* ───── BACK ───── */}
                  <div className="flip-card-back">
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
                      <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-2 border-white" />
                      <div className="absolute bottom-8 left-4 w-20 h-20 rounded-full border-2 border-white" />
                    </div>

                    <div className="relative flex flex-col items-center justify-between h-full p-5 space-y-3">
                      {/* Avatar */}
                      <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/20 ring-offset-2 ring-offset-blue-900 flex-shrink-0">
                        <Image
                          src={faculty.image || "/images/placeholder.jpg"}
                          alt={faculty.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>

                      <div className="text-center space-y-0.5">
                        <h3 className="text-sm font-bold text-white leading-tight">
                          {faculty.name?.trim()}
                        </h3>
                        <p className="text-[10px] font-semibold text-blue-300 uppercase tracking-wider">
                          {faculty.designation}
                        </p>
                      </div>

                      <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full" />

                      <div className="w-full space-y-1.5 text-xs text-left">
                        {faculty.department && (
                          <div className="flex items-center gap-2 text-blue-100/90">
                            <BookOpen className="w-3.5 h-3.5 flex-shrink-0 text-blue-400" />
                            <span className="line-clamp-1">{faculty.department}</span>
                          </div>
                        )}
                        {faculty.email && (
                          <div className="flex items-center gap-2 text-blue-100/90">
                            <Mail className="w-3.5 h-3.5 flex-shrink-0 text-blue-400" />
                            <span className="line-clamp-1 text-[11px]">{faculty.email}</span>
                          </div>
                        )}
                        {faculty.phone && (
                          <div className="flex items-center gap-2 text-blue-100/90">
                            <Phone className="w-3.5 h-3.5 flex-shrink-0 text-blue-400" />
                            <span className="text-[11px]">{faculty.phone}</span>
                          </div>
                        )}
                      </div>

                      {/* View More Redirect Button on Back */}
                      <Link
                        href={detailUrl}
                        className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-2 bg-white text-blue-950 hover:bg-blue-50 rounded-xl text-xs font-bold transition-all shadow-md"
                      >
                        <span>View More Profile</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* View All Faculties Button */}
      <div className="mt-12 text-center">
        <Link
          href="/academics/faculties"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-950 text-white rounded-full font-bold text-sm hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <span>Explore All Faculties Directory</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};
