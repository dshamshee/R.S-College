import { CustomLayout } from "@/components/customeLayout";
import { Button } from "@/components/ui/button";
import { 
  Book, 
  Search, 
  Globe, 
  Clock, 
  FileText, 
  Coffee, 
  Database,
  ArrowRight
} from "lucide-react";

const libraryStats = [
  { label: "Total Books", value: "50,000+" },
  { label: "Journals", value: "120+" },
  { label: "Digital Records", value: "5,000+" },
  { label: "Daily Visitors", value: "200+" },
];

const libraryServices = [
  {
    title: "Reference Section",
    desc: "A vast collection of encyclopedias, dictionaries, and rare academic manuscripts.",
    icon: <Search className="text-blue-600" size={24} />
  },
  {
    title: "Digital Resource Center",
    desc: "High-speed workstations providing access to E-Journals and online databases.",
    icon: <Globe className="text-blue-600" size={24} />
  },
  {
    title: "Periodical Section",
    desc: "Access to current newspapers, weekly magazines, and monthly research journals.",
    icon: <FileText className="text-blue-600" size={24} />
  },
  {
    title: "Reading Hall",
    desc: "A spacious, climate-controlled environment designed for deep focused study.",
    icon: <Coffee className="text-blue-600" size={24} />
  }
];

export default function Library() {
  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-16">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-4">
              <Book size={16} /> Knowledge Hub
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-6">Central Library</h1>
            <p className="text-slate-600 leading-relaxed text-lg">
              The Central Library at <strong>Ramdev Sharda College</strong> is the heart of 
              our academic community. Affiliated with <strong>Purnea University</strong>, 
              it serves as a gateway to global knowledge, offering an extensive collection 
              of physical and digital resources to support students and faculty in their 
              academic pursuits.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {libraryStats.map((stat, i) => (
              <div key={i} className="bg-blue-50 border border-blue-100 p-6 rounded-2xl text-center">
                <span className="block text-2xl font-bold text-blue-900">{stat.value}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content: Services */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-blue-900 mb-8 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-600 rounded-full" />
              Library Services & Sections
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {libraryServices.map((service, i) => (
                <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>

            {/* E-Resources Banner */}
            <div className="mt-12 p-10 bg-slate-900 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-8 overflow-hidden relative">
               <Database className="absolute -bottom-4 -right-4 text-white/5" size={160} />
               <div className="relative z-10 flex-grow">
                  <h3 className="text-2xl font-bold mb-2">OPAC & Digital Access</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Search the entire library catalog from your mobile or laptop. 
                    Access e-books and remote databases through our N-LIST subscription.
                  </p>
               </div>
               <Button className="relative cursor-pointer z-10 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-500 transition-all">
                  Search Catalog <ArrowRight size={18} />
               </Button>
            </div>
          </div>

          {/* Sidebar: Rules & Timing */}
          <div className="space-y-8">
            <div className="p-8 border border-slate-100 rounded-3xl bg-slate-50/50">
              <h3 className="text-lg font-bold text-blue-900 mb-6 flex items-center gap-2">
                <Clock size={20} className="text-blue-600" />
                Working Hours
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Monday - Friday</span>
                  <span className="text-slate-800 font-bold">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-slate-200 pt-4">
                  <span className="text-slate-500 font-medium">Saturday</span>
                  <span className="text-slate-800 font-bold">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-slate-200 pt-4">
                  <span className="text-slate-500 font-medium">Sunday</span>
                  <span className="text-pink-600 font-bold">Closed</span>
                </div>
              </div>
            </div>

            <div className="p-8 border border-slate-100 rounded-3xl bg-white shadow-sm">
              <h3 className="text-lg font-bold text-blue-900 mb-6">Library Rules</h3>
              <ul className="space-y-4">
                {[
                  "Maintain absolute silence in reading areas.",
                  "Identity card is mandatory for entry and issue.",
                  "A maximum of 3 books can be issued for 14 days.",
                  "Laptops are allowed in designated zones only."
                ].map((rule, idx) => (
                  <li key={idx} className="flex gap-3 text-xs text-slate-600 leading-normal">
                    <div className="w-1 h-1 bg-blue-600 rounded-full shrink-0 mt-1.5" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </CustomLayout>
  );
}