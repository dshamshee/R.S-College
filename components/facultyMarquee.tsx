'use client'

import Image from "next/image"
import { facultyData } from "@/lib/faculty-data"
import { Mail, Phone, BookOpen, GraduationCap } from "lucide-react"

export const FacultyMarquee = () => {
  const teachingStaff = facultyData.filter((f) => f.type === "TEACHING")
  const duplicated = [...teachingStaff, ...teachingStaff]

  return (
    <section className="faculty-marquee-section w-full py-16 bg-gradient-to-b from-slate-50 to-white">
      {/* Section Header */}
      <div className="flex items-center justify-center gap-4 md:gap-8 mb-14 w-full max-w-7xl mx-auto px-4">
        <hr className="flex-grow border-t-2 border-blue-900 opacity-20" />
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-2xl md:text-3xl text-blue-900 font-bold whitespace-nowrap tracking-tight">
            Our Faculties
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Meet the brilliant minds shaping futures
          </p>
        </div>
        <hr className="flex-grow border-t-2 border-blue-900 opacity-20" />
      </div>

      {/* Marquee Wrapper — overflow clip on this div, NOT on section */}
      <div className="marquee-wrapper">
        {/* Fade overlays */}
        <div className="marquee-fade-left" />
        <div className="marquee-fade-right" />

        {/* Scrolling track */}
        <div className="marquee-track">
          {duplicated.map((faculty, index) => (
            <div
              key={`${faculty.name}-${index}`}
              className="flip-card"
            >
              <div className="flip-card-inner">
                {/* ───── FRONT ───── */}
                <div className="flip-card-front">
                  <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500" />
                  <div className="relative w-full h-[240px] bg-gradient-to-br from-slate-100 to-slate-50">
                    <Image
                      src={faculty.image}
                      alt={faculty.name}
                      fill
                      sizes="280px"
                      className="object-contain"
                    />
                  </div>
                  <div className="p-5 space-y-1.5 text-center">
                    <h3 className="text-base font-bold text-slate-800 leading-tight line-clamp-1">
                      {faculty.name.trim()}
                    </h3>
                    <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider line-clamp-2">
                      {faculty.designation}
                    </p>
                  </div>
                </div>

                {/* ───── BACK ───── */}
                <div className="flip-card-back">
                  {/* Decorative circles */}
                  <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
                    <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-2 border-white" />
                    <div className="absolute bottom-8 left-4 w-20 h-20 rounded-full border-2 border-white" />
                  </div>

                  <div className="relative flex flex-col items-center justify-center h-full p-6 space-y-4">
                    {/* Avatar */}
                    <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-white/20 ring-offset-2 ring-offset-blue-900 flex-shrink-0">
                      <Image
                        src={faculty.image}
                        alt={faculty.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    <div className="text-center space-y-1">
                      <h3 className="text-lg font-bold text-white leading-tight">
                        {faculty.name.trim()}
                      </h3>
                      <p className="text-[11px] font-semibold text-blue-300 uppercase tracking-wider">
                        {faculty.designation}
                      </p>
                    </div>

                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full" />

                    <div className="w-full space-y-3">
                      {faculty.department && (
                        <div className="flex items-center gap-3 text-blue-100/80 text-sm">
                          <BookOpen className="w-4 h-4 flex-shrink-0 text-blue-400" />
                          <span className="line-clamp-1">{faculty.department}</span>
                        </div>
                      )}
                      {faculty.email && (
                        <a
                          href={`mailto:${faculty.email}`}
                          className="flex items-center gap-3 text-blue-100/80 text-sm hover:text-white transition-colors"
                        >
                          <Mail className="w-4 h-4 flex-shrink-0 text-blue-400" />
                          <span className="line-clamp-1 text-xs">{faculty.email}</span>
                        </a>
                      )}
                      {faculty.phone && (
                        <a
                          href={`tel:${faculty.phone}`}
                          className="flex items-center gap-3 text-blue-100/80 text-sm hover:text-white transition-colors"
                        >
                          <Phone className="w-4 h-4 flex-shrink-0 text-blue-400" />
                          <span>{faculty.phone}</span>
                        </a>
                      )}
                      {!faculty.department && !faculty.email && !faculty.phone && (
                        <div className="flex items-center gap-3 text-blue-300/50 text-sm italic">
                          <GraduationCap className="w-4 h-4 flex-shrink-0" />
                          <span>Contact details not available</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
