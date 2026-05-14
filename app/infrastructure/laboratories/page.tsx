import { CustomLayout } from "@/components/customeLayout";
import { 
  FlaskConical, 
  Atom, 
  Microscope, 
  Cpu, 
  Dna, 
  ShieldCheck, 
  Settings 
} from "lucide-react";

const labData = [
  {
    department: "Physics Laboratory",
    icon: <Atom className="text-blue-600" size={32} />,
    equipment: ["Spectrometers", "Galvanometers", "Optical Benches", "Oscilloscopes"],
    desc: "Equipped for experiments in optics, electricity, and modern physics."
  },
  {
    department: "Chemistry Laboratory",
    icon: <FlaskConical className="text-blue-600" size={32} />,
    equipment: ["Centrifuges", "Digital Balances", "Distillation Units", "pH Meters"],
    desc: "Advanced setup for organic, inorganic, and physical chemistry analysis."
  },
  {
    department: "Zoology & Botany Lab",
    icon: <Dna className="text-blue-600" size={32} />,
    equipment: ["Compound Microscopes", "Dissection Kits", "Incubators", "Specimen Jars"],
    desc: "Specialized facilities for biological research and specimen study."
  },
  {
    department: "Computer Laboratory",
    icon: <Cpu className="text-blue-600" size={32} />,
    equipment: ["High-speed LAN", "Latest Workstations", "Python/Java Runtimes", "UPS Backup"],
    desc: "Modern computing environment for programming and data analysis."
  }
];

export default function Laboratories() {
  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-16">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-blue-900 mb-6">Scientific Laboratories</h1>
            <p className="text-slate-600 leading-relaxed text-lg">
                Practical learning is at the heart of our curriculum. At <strong>Ramdev Sharda College</strong>, 
                our well-equipped laboratories provide students with hands-on experience and the tools 
                necessary to bridge the gap between theory and discovery.
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex items-center gap-4 shrink-0">
            <ShieldCheck className="text-emerald-600" size={32} />
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Safety Status</p>
              <p className="text-sm font-bold text-emerald-900">ISO Certified Safety Standards</p>
            </div>
          </div>
        </div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {labData.map((lab, index) => (
            <div 
              key={index} 
              className="group bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col md:flex-row gap-8"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-200 group-hover:text-white transition-colors duration-300">
                {lab.icon}
              </div>
              
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-blue-900 mb-3">
                  {lab.department}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {lab.desc}
                </p>

                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Settings size={12} /> Key Equipment
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {lab.equipment.map((item, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-full border border-slate-200 group-hover:border-blue-100 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lab Resources Banner */}
        <div className="mt-20 p-12 bg-[#002b5b] rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Laboratory Guidelines</h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              All students must follow mandatory safety protocols, including wearing lab coats 
              and eye protection. Equipment booking for research projects should be done via 
              the Departmental Head.
            </p>
          </div>
          <button className="relative z-10 bg-white text-blue-900 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all active:scale-95">
            Download Lab Manuals
          </button>
        </div>

      </div>
    </CustomLayout>
  );
}