import { CustomLayout } from "@/components/customeLayout";
import { 
  HeartPulse, 
  PhoneCall, 
  Stethoscope,  
  Clock, 
  UserPlus,
  Activity,
  AlertTriangle,
  Bandage
} from "lucide-react";

const medicalServices = [
  {
    title: "Primary Consultation",
    desc: "Daily check-ups and medical advice provided by our resident campus physician.",
    icon: <Stethoscope className="text-rose-600" size={24} />
  },
  {
    title: "First-Aid & Trauma",
    desc: "Immediate care for minor injuries, sports wounds, and emergency stabilization.",
    icon: <Bandage className="text-rose-600" size={24} />
  },
  {
    title: "Pathology Basics",
    desc: "Routine health screenings including blood pressure, glucose, and BMI monitoring.",
    icon: <Activity className="text-rose-600" size={24} />
  },
  {
    title: "Counseling Services",
    desc: "Mental health support and stress management sessions for academic well-being.",
    icon: <HeartPulse className="text-rose-600" size={24} />
  }
];

export default function Health() {
  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-[0.2em] mb-4">
              <Activity size={16} /> Campus Welfare
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-6">Student Health Center</h1>
            <p className="text-slate-600 leading-relaxed text-lg">
              The Health Center at <strong>Ramdev Sharda College</strong> is dedicated to 
              ensuring the physical and mental well-being of our students and staff. We 
              provide essential medical services and health education to foster a safe 
              and healthy learning environment.
            </p>
          </div>
          <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center text-white animate-pulse">
              <PhoneCall size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Emergency Line</p>
              <p className="text-sm font-bold text-rose-900">+91-XXXXX XXXXX</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content: Healthcare Services */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-blue-900 mb-8 flex items-center gap-2">
              <span className="w-2 h-8 bg-rose-600 rounded-full" />
              Available Medical Services
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {medicalServices.map((service, i) => (
                <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl hover:border-rose-200 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-rose-200 group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>

            {/* Health Awareness Note */}
            <div className="mt-12 p-8 bg-blue-900 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
               <HeartPulse className="absolute -bottom-4 -right-4 text-white/5" size={180} />
               <div className="relative z-10 flex-grow">
                  <h3 className="text-2xl font-bold mb-2">Annual Health Camps</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    We regularly organize free blood donation camps, eye check-up drives, 
                    and vaccination awareness programs in collaboration with local 
                    government health departments.
                  </p>
               </div>
            </div>
          </div>

          {/* Sidebar: Timing & Protocols */}
          <div className="space-y-8">
            <div className="p-8 border border-slate-100 rounded-3xl bg-slate-50/50">
              <h3 className="text-lg font-bold text-blue-900 mb-6 flex items-center gap-2">
                <Clock size={20} className="text-blue-600" />
                OPD Hours
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Monday - Saturday</span>
                  <span className="text-slate-800 font-bold">10:00 AM - 04:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-slate-200 pt-4">
                  <span className="text-slate-500 font-medium">Lunch Break</span>
                  <span className="text-slate-800 font-bold">01:30 PM - 02:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-slate-200 pt-4">
                  <span className="text-slate-500 font-medium">Emergency</span>
                  <span className="text-rose-600 font-bold uppercase text-[10px] tracking-widest">24/7 Available</span>
                </div>
              </div>
            </div>

            <div className="p-8 border border-slate-100 rounded-3xl bg-white shadow-sm">
              <h3 className="text-lg font-bold text-blue-900 mb-6 flex items-center gap-2">
                <AlertTriangle size={20} className="text-rose-500" />
                Safety Protocol
              </h3>
              <ul className="space-y-4">
                {[
                  "Students must carry their college ID for free consultation.",
                  "All medical records are kept strictly confidential.",
                  "Referrals to civil hospitals are provided for critical cases.",
                  "Masks are mandatory inside the medical center premises."
                ].map((rule, idx) => (
                  <li key={idx} className="flex gap-3 text-xs text-slate-600 leading-normal">
                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0 mt-1.5" />
                    {rule}
                  </li>
                ))}
              </ul>
              <button className="w-full mt-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                <UserPlus size={18} />
                Medical Registration
              </button>
            </div>
          </div>

        </div>
      </div>
    </CustomLayout>
  );
}