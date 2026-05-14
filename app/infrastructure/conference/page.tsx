import { CustomLayout } from "@/components/customeLayout";
import { 
  Users, 
  Video, 
  Mic2, 
  Wind, 
  Presentation, 
  CheckCircle 
} from "lucide-react";

const amenities = [
  { icon: <Users size={24} />, title: "Capacity", desc: "Seating for 150+ delegates in a comfortable executive layout." },
  { icon: <Video size={24} />, title: "Video Conferencing", desc: "High-definition camera setup for hybrid meetings and webinars." },
  { icon: <Mic2 size={24} />, title: "Audio System", desc: "Surround sound with wireless collars and handheld microphones." },
  { icon: <Wind size={24} />, title: "Air Conditioned", desc: "Fully climate-controlled environment for year-round events." },
  { icon: <Presentation size={24} />, title: "Digital Projection", desc: "Dual 4K laser projectors with automated motorized screens." },
];

export default function ConferenceHall() {
  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-16">
        
        {/* Title & Introduction */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl font-bold text-blue-900 mb-6">Smart Conference Hall</h1>
          <p className="text-slate-600 leading-relaxed text-lg">
            Our state-of-the-art Conference Hall at <strong>Ramdev Sharda College</strong> is designed to host 
            academic seminars, board meetings, and international workshops. It combines sophisticated 
            interiors with modern multimedia technology to provide a world-class experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Features Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-blue-900 mb-8 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-600 rounded-full" />
              Technical Specifications & Amenities
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {amenities.map((item, i) => (
                <div key={i} className="group p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-blue-300 transition-all duration-300">
                  <div className="mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Usage Guidelines */}
            <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <h3 className="text-xl font-bold text-blue-900 mb-6">Usage Guidelines</h3>
                <ul className="space-y-4">
                    {[
                        "Prior booking via the Administrative Office is mandatory.",
                        "Food and beverages are restricted inside the main hall area.",
                        "Technical support must be requested 24 hours in advance.",
                        "Available for both departmental and external academic events."
                    ].map((text, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                            <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                            {text}
                        </li>
                    ))}
                </ul>
            </div>
          </div>

          {/* Sidebar: Booking Info */}
          <div className="space-y-8">
            <div className="bg-blue-900 text-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-bold mb-4">Venue Booking</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-8">
                Faculty members and department heads can book the hall for official 
                seminars and guest lectures through the faculty portal.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-xs border-b border-blue-800 pb-2">
                  <span className="text-blue-300 uppercase font-bold">Weekdays</span>
                  <span>08:00 AM - 06:00 PM</span>
                </div>
                <div className="flex justify-between text-xs border-b border-blue-800 pb-2">
                  <span className="text-blue-300 uppercase font-bold">Weekends</span>
                  <span>On-Request Only</span>
                </div>
              </div>
              <button className="w-full py-3 bg-white text-blue-900 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all">
                Check Availability
              </button>
            </div>

            <div className="p-8 border border-slate-100 rounded-3xl bg-white shadow-sm">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Gallery</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-20 bg-slate-200 rounded-lg animate-pulse" />
                <div className="h-20 bg-slate-200 rounded-lg animate-pulse" />
                <div className="h-20 bg-slate-200 rounded-lg animate-pulse" />
                <div className="h-20 bg-slate-200 rounded-lg animate-pulse" />
              </div>
              <p className="text-[10px] text-slate-400 mt-4 text-center uppercase font-bold tracking-widest">
                View All Infrastructure Photos
              </p>
            </div>
          </div>

        </div>
      </div>
    </CustomLayout>
  );
}