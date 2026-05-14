import { CustomLayout } from "@/components/customeLayout";
import { 
  Beaker, 
  BookOpen, 
  FileText, 
  Globe, 
  Search, 
  ExternalLink,
  Award
} from "lucide-react";

const publications = [
  {
    title: "Automated Tree Species Identification via Bark Texture Features and SVM Classification",
    authors: "Danish Shamshee, Aman Raushan, Ankita Dhakad, et al.",
    journal: "International Journal of Computer Applications",
    year: "2026",
    tag: "Machine Learning"
  },
  {
    title: "Impact of Digital Transformation on Rural Education in Bihar",
    authors: "Dept. of Social Sciences",
    journal: "Academic Review Forum",
    year: "2025",
    tag: "Social Science"
  }
];

export default function Research() {
  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-16">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-blue-600 mb-4">
              <Beaker size={24} />
              <span className="font-bold uppercase tracking-widest text-xs">Innovation & Inquiry</span>
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-6">Research & Publications</h1>
            <p className="text-slate-600 leading-relaxed text-lg">
              Ramdev Sharda College encourages a culture of discovery. Our faculty and students 
              actively contribute to global knowledge through peer-reviewed journals and 
              interdisciplinary research projects affiliated with <strong>Purnea University</strong>.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-blue-50 px-6 py-4 rounded-2xl border border-blue-100 text-center">
              <span className="block text-2xl font-bold text-blue-900">12+</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Ongoing Projects</span>
            </div>
            <div className="bg-blue-50 px-6 py-4 rounded-2xl border border-blue-100 text-center">
              <span className="block text-2xl font-bold text-blue-900">45+</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Annual Papers</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content: Publications & Journals */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                <FileText size={24} className="text-blue-600" />
                Recent Publications
              </h2>
              <div className="flex flex-col gap-4">
                {publications.map((pub, i) => (
                  <div key={i} className="group p-6 bg-white border border-slate-100 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                        {pub.tag}
                      </span>
                      <span className="text-sm font-medium text-slate-400">{pub.year}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-900 transition-colors mb-2">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 italic">{pub.authors}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                        <Globe size={14} /> {pub.journal}
                      </span>
                      <button className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
                        View Paper <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <Search size={24} className="text-blue-600" />
                <h2 className="text-xl font-bold text-blue-900">Research Focus Areas</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Artificial Intelligence", "Environmental Science", "Regional Economics", "Linguistic Heritage"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar: Guidelines & Committee */}
          <div className="space-y-8">
            <div className="bg-blue-900 text-white p-8 rounded-3xl shadow-xl">
              <Award className="mb-4 text-blue-300" size={32} />
              <h3 className="text-xl font-bold mb-4">Research Grants</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                The college provides financial assistance for faculty and students to present 
                their work at national and international conferences.
              </p>
              <button className="w-full py-3 bg-white text-blue-900 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all">
                Download Guidelines
              </button>
            </div>

            <div className="p-8 border border-slate-100 rounded-3xl bg-white shadow-sm">
              <h3 className="text-lg font-bold text-blue-900 mb-6 flex items-center gap-2">
                <BookOpen size={20} className="text-blue-600" />
                Resources
              </h3>
              <ul className="space-y-4">
                {["Digital Library Access", "Plagiarism Policy", "Ethics Committee", "Submission Portal"].map((link, i) => (
                  <li key={i} className="text-sm font-medium text-slate-600 hover:text-blue-600 cursor-pointer flex items-center justify-between group">
                    {link}
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
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

// Helper component for the list
const ArrowRight = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);