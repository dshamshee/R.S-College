import { CustomLayout } from "@/components/customeLayout";
import { 
  Trophy, 
  Dumbbell, 
  Target, 
  Users, 
  Map, 
  Medal, 
  ChevronRight,
  Timer
} from "lucide-react";

const sportsFacilities = [
  {
    category: "Outdoor Sports",
    items: [
      { name: "Cricket Ground", spec: "Full-size pitch with practice nets" },
      { name: "Football Field", spec: "Natural turf with standard dimensions" },
      { name: "Volleyball Court", spec: "Two outdoor clay courts with floodlights" },
      { name: "Athletic Track", spec: "400m perimeter track for running events" }
    ]
  },
  {
    category: "Indoor & Fitness",
    items: [
      { name: "Gymnasium", spec: "Modern strength & cardio equipment" },
      { name: "Badminton Court", spec: "Indoor wooden flooring court" },
      { name: "Table Tennis", spec: "Four professional-grade tables" },
      { name: "Yoga Hall", spec: "Quiet space for meditation and flexibility" }
    ]
  }
];

export default function Sports() {
  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-[0.2em] mb-4">
              <Trophy size={16} /> Athletics & Fitness
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-6">Sports Complex</h1>
            <p className="text-slate-600 leading-relaxed text-lg">
              At <strong>Ramdev Sharda College</strong>, we believe in a sound mind in a sound body. 
              Our comprehensive sports infrastructure provides students with the opportunity 
              to excel in competitive sports and maintain a healthy lifestyle through 
              diverse athletic facilities.
            </p>
          </div>
          <div className="bg-emerald-900 text-white p-8 rounded-3xl flex items-center gap-6 shrink-0 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-1">Upcoming Event</p>
              <p className="text-sm font-bold">Annual Sports Meet 2026</p>
              <p className="text-xs text-emerald-100/70 mt-2 flex items-center gap-1">
                <Timer size={12} /> Starts in 12 Days
              </p>
            </div>
            <Medal className="text-emerald-500/20 absolute -right-4 -bottom-4" size={100} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content: Facilities */}
          <div className="lg:col-span-2 space-y-12">
            {sportsFacilities.map((group, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold text-blue-900 mb-8 flex items-center gap-2">
                  <span className="w-2 h-8 bg-emerald-500 rounded-full" />
                  {group.category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.items.map((item, i) => (
                    <div key={i} className="group p-6 bg-white border border-slate-100 rounded-2xl hover:border-emerald-200 hover:shadow-md transition-all flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                          <Target size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">{item.name}</h3>
                          <p className="text-xs text-slate-500">{item.spec}</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Coach Section */}
            <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-200 flex flex-col md:flex-row items-center gap-8">
               <div className="w-20 h-20 bg-blue-900 rounded-2xl flex items-center justify-center text-white shrink-0">
                  <Users size={40} />
               </div>
               <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Professional Mentorship</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Our Physical Education department is led by experienced coaches who 
                    provide specialized training for inter-college and university-level 
                    competitions under the <strong>Purnea University</strong> sports board.
                  </p>
               </div>
            </div>
          </div>

          {/* Sidebar: Achievements & Info */}
          <div className="space-y-8">
            <div className="p-8 border border-slate-100 rounded-3xl bg-white shadow-sm">
              <h3 className="text-lg font-bold text-blue-900 mb-6 flex items-center gap-2">
                <Medal size={20} className="text-emerald-500" />
                Recent Glory
              </h3>
              <div className="space-y-6">
                {[
                  { title: "Zonal Cricket Champions", year: "2025" },
                  { title: "Inter-College Table Tennis Gold", year: "2025" },
                  { title: "District Athletics (400m) Silver", year: "2024" }
                ].map((award, i) => (
                  <div key={i} className="flex flex-col border-l-2 border-slate-100 pl-4 py-1">
                    <span className="text-xs font-bold text-emerald-600 mb-1">{award.year}</span>
                    <span className="text-sm font-medium text-slate-800 leading-tight">{award.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 border border-slate-100 rounded-3xl bg-slate-900 text-white">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-emerald-400">
                <Map size={20} />
                Facility Usage
              </h3>
              <ul className="space-y-4 text-xs text-slate-400 leading-relaxed">
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 mt-1" />
                  Sports equipment can be issued against Student ID cards.
                </li>
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 mt-1" />
                  Indoor facilities are open from 6:00 AM to 8:00 AM and 4:00 PM to 6:00 PM.
                </li>
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 mt-1" />
                  Proper athletic attire is mandatory in the Gymnasium and Track.
                </li>
              </ul>
              <button className="w-full mt-8 py-3 bg-emerald-500 text-white rounded-xl font-bold text-sm hover:bg-emerald-400 transition-all">
                Join College Team
              </button>
            </div>
          </div>

        </div>
      </div>
    </CustomLayout>
  );
}