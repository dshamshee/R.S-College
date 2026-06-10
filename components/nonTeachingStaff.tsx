import Image from "next/image"
import { facultyData } from "@/lib/faculty-data"
import { Briefcase } from "lucide-react"

export const NonTeachingStaff = () => {
  const nonTeachingStaff = facultyData.filter((f) => f.type === "NON-TEACHING")

  return (
    <section className="w-full py-16 px-4 md:px-16 bg-white">
      {/* Section Header */}
      <div className="flex items-center justify-center gap-4 md:gap-8 mb-14 w-full max-w-7xl mx-auto">
        <hr className="flex-grow border-t-2 border-blue-900 opacity-20" />
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-2xl md:text-3xl text-blue-900 font-bold whitespace-nowrap tracking-tight">
            Non-Teaching Staff
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            The backbone of our institution
          </p>
        </div>
        <hr className="flex-grow border-t-2 border-blue-900 opacity-20" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {nonTeachingStaff.map((staff, index) => (
          <div
            key={index}
            className="group relative rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-100 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-500 overflow-hidden"
          >
            {/* Decorative corner */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-blue-500/5 rounded-full group-hover:scale-[3] transition-transform duration-700" />

            {/* Image */}
            <div className="relative w-full h-[180px] bg-gradient-to-br from-slate-100 to-blue-50/30 overflow-hidden">
              <Image
                src={staff.image}
                alt={staff.name}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Badge overlay */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                <Briefcase className="w-3 h-3 text-indigo-500" />
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                  {staff.designation}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 text-center">
              <h3 className="text-sm font-bold text-slate-800 leading-tight">
                {staff.name}
              </h3>
              <div className="mt-2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
