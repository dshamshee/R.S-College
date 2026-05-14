import { CustomLayout } from "@/components/customeLayout";
import { 
  Users2, 
  Music, 
  Lightbulb, 
  ShieldCheck, 
  Tv, 
  MapPin 
} from "lucide-react";

const auditoriumFeatures = [
  { 
    icon: <Users2 size={24} />, 
    title: "Large Capacity", 
    desc: "Fixed theater-style seating for over 500+ attendees with excellent sightlines." 
  },
  { 
    icon: <Music size={24} />, 
    title: "Acoustic Design", 
    desc: "Engineered wall paneling and soundproofing for high-fidelity audio performance." 
  },
  { 
    icon: <Lightbulb size={24} />, 
    title: "Stage Lighting", 
    desc: "Programmable DMX lighting rig with spotlights and ambient wash for performances." 
  },
  { 
    icon: <Tv size={24} />, 
    title: "LED Backdrop", 
    desc: "Main stage features a high-resolution P3 LED video wall for immersive visuals." 
  },
  { 
    icon: <ShieldCheck size={24} />, 
    title: "Safety First", 
    desc: "Multiple emergency exits, fire suppression systems, and 24/7 CCTV monitoring." 
  },
];

export default function Auditorium() {
  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-blue-900 mb-6">Central Auditorium</h1>
            <p className="text-slate-600 leading-relaxed text-lg">
                The pride of <strong>Ramdev Sharda College</strong>, our Central Auditorium serves as the 
                cultural and academic hub for mega-events, annual functions, and national-level 
                seminars affiliated with <strong>Purnea University</strong>.
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-center gap-4 shrink-0">
            <MapPin className="text-blue-600" size={32} />
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</p>
              <p className="text-sm font-bold text-blue-900">Block A, Main Campus</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Detailed Features */}
          <div className="lg:col-span-2 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {auditoriumFeatures.map((feature, i) => (
                <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Event Hosting Banner */}
            <div className="bg-blue-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center gap-8">
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-3">Host Your Grand Event</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Our auditorium is equipped to handle everything from theatrical plays to 
                  convocation ceremonies. We provide full technical support including sound 
                  engineers and stage hands.
                </p>
              </div>
              <button className="bg-white text-blue-900 px-8 py-3 rounded-xl font-bold whitespace-nowrap hover:bg-blue-50 transition-all">
                Event Booking
              </button>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="p-8 border border-slate-100 rounded-3xl bg-slate-50/50">
              <h3 className="text-lg font-bold text-blue-900 mb-6">Recent Events</h3>
              <div className="space-y-6">
                {[
                  { date: "Mar 10", title: "Annual Cultural Fest 2026" },
                  { date: "Feb 24", title: "Inter-College Debate Competition" },
                  { date: "Jan 15", title: "Purnea University Convocation" }
                ].map((event, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 h-fit rounded">
                      {event.date}
                    </div>
                    <p className="text-sm font-medium text-slate-700 leading-snug">{event.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 border border-slate-100 rounded-3xl bg-white shadow-sm">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Technical Helpdesk</h3>
                <p className="text-xs text-slate-500 mb-4">For stage setup and AV coordination, please contact the Estates Department.</p>
                <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Extension: 402
                </div>
            </div>
          </div>

        </div>
      </div>
    </CustomLayout>
  );
}