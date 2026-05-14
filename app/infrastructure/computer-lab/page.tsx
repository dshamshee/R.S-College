import { CustomLayout } from "@/components/customeLayout";
import { 
  Monitor, 
  Cpu, 
  Wifi, 
  ShieldCheck, 
  Terminal, 
  Server, 
  Code2,
  HardDrive
} from "lucide-react";

const labSpecs = [
  {
    title: "High-End Workstations",
    desc: "Modern systems equipped with multi-core processors and dedicated RAM for heavy development tasks.",
    icon: <Monitor className="text-blue-600" size={24} />
  },
  {
    title: "Full-Stack Environment",
    desc: "Pre-installed support for Node.js, Bun runtime, and various database management systems.",
    icon: <Code2 className="text-blue-600" size={24} />
  },
  {
    title: "Gigabit Networking",
    desc: "High-speed fiber-optic internet and localized LAN for seamless project deployment and collaboration.",
    icon: <Wifi className="text-blue-600" size={24} />
  },
  {
    title: "Uninterrupted Power",
    desc: "Centralized industrial-grade UPS backup to ensure development sessions are never lost to outages.",
    icon: <Server className="text-blue-600" size={24} />
  }
];

export default function ComputerLab() {
  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-4">
              <Terminal size={16} /> Digital Excellence
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-6">Advanced Computer Center</h1>
            <p className="text-slate-600 leading-relaxed text-lg">
              The Advanced Computer Center at <strong>Ramdev Sharda College</strong> is a high-tech 
              hub designed to empower students with technical proficiency. From web development to 
              complex data analysis, our lab provides the computational resources required to excel 
              under <strong>Purnea University&apos;s</strong> academic standards.
            </p>
          </div>
          <div className="bg-blue-900 text-white p-6 rounded-2xl flex items-center gap-4 shrink-0 shadow-lg">
            <Cpu className="text-blue-300" size={32} />
            <div>
              <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Active nodes</p>
              <p className="text-sm font-bold">100+ Managed Terminals</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content: Technical Specs */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-blue-900 mb-8 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-600 rounded-full" />
              Technical Infrastructure
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {labSpecs.map((spec, i) => (
                <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
                    {spec.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{spec.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{spec.desc}</p>
                </div>
              ))}
            </div>

            {/* Dev Focus Banner */}
            <div className="mt-12 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-200 flex flex-col md:flex-row items-center gap-8 border-dashed">
               <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <HardDrive size={24} className="text-blue-600" />
                    Project Deployment Zone
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    The lab is optimized for modern web stacks. Students can test and deploy 
                    full-stack applications locally using Docker, Bun, and custom Git 
                    configurations optimized for student branch management.
                  </p>
               </div>
            </div>
          </div>

          {/* Sidebar: Access & Support */}
          <div className="space-y-8">
            <div className="p-8 border border-slate-100 rounded-3xl bg-white shadow-sm">
              <h3 className="text-lg font-bold text-blue-900 mb-6 flex items-center gap-2">
                <ShieldCheck size={20} className="text-blue-600" />
                Lab Protocol
              </h3>
              <ul className="space-y-4">
                {[
                  "Mandatory log-in/log-out via student ID.",
                  "Personal storage should be maintained on cloud drives.",
                  "Food and liquids are strictly prohibited in the terminal area.",
                  "Software installation requires administrator approval."
                ].map((rule, idx) => (
                  <li key={idx} className="flex gap-3 text-xs text-slate-600 leading-normal">
                    <div className="w-1 h-1 bg-blue-600 rounded-full shrink-0 mt-1.5" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-lg font-bold mb-4">Technical Support</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                Encountering hardware issues or software bugs? Reach out to our IT 
                infrastructure team for immediate assistance.
              </p>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Support Email</p>
                <p className="text-sm font-medium">it.support@rscollege.in</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </CustomLayout>
  );
}