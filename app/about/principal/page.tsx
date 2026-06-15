import { CustomLayout } from "@/components/customeLayout";
import { 
  Quote, 
  Award, 
  GraduationCap, 
  Mail, 
  Calendar,
  Sparkles,
  BookOpen,
  Building2,
  Users,
  Compass,
  Globe
} from "lucide-react";
import Image from "next/image";

export default function Principal() {
  const visionMilestones = [
    {
      number: "1",
      title: "Academic Excellence",
      icon: GraduationCap,
      color: "border-blue-500 text-blue-600 bg-blue-50/50 dark:bg-blue-950/20",
      points: [
        "Introduce new, industry-relevant programs and courses.",
        "Strengthen research initiatives and encourage faculty-student collaborations.",
        "Establish specialized centers of learning in emerging fields such as AI, data science, and sustainable development."
      ]
    },
    {
      number: "2",
      title: "Infrastructure Growth",
      icon: Building2,
      color: "border-emerald-500 text-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20",
      points: [
        "Expand smart classrooms and digital learning platforms.",
        "Upgrade laboratories, libraries, and sports facilities.",
        "Develop eco-friendly campus initiatives to promote sustainability."
      ]
    },
    {
      number: "3",
      title: "Student Empowerment",
      icon: Users,
      color: "border-purple-500 text-purple-600 bg-purple-50/50 dark:bg-purple-950/20",
      points: [
        "Provide enhanced career guidance, internships, and placement opportunities.",
        "Launch leadership and entrepreneurship programs.",
        "Encourage participation in national and international competitions."
      ]
    },
    {
      number: "4",
      title: "Community Engagement",
      icon: Globe,
      color: "border-rose-500 text-rose-600 bg-rose-50/50 dark:bg-rose-950/20",
      points: [
        "Strengthen partnerships with industries, NGOs, and government bodies.",
        "Promote social responsibility through community service and outreach programs.",
        "Build alumni networks to support mentorship and career development."
      ]
    },
    {
      number: "5",
      title: "Global Outlook",
      icon: Compass,
      color: "border-amber-500 text-amber-600 bg-amber-50/50 dark:bg-amber-950/20",
      points: [
        "Foster international collaborations with universities and research institutions.",
        "Introduce student and faculty exchange programs.",
        "Position the college as a recognized institution in the global academic landscape."
      ]
    }
  ];

  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Photo Card and Quick Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative group">
              <div className="aspect-[3/4] bg-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl border-[10px] border-white relative z-10">
                <Image 
                  src="/images/principal.jpeg" 
                  alt="Prof. (Dr.) Shekhar Kumar Jaiswal" 
                  width={400} 
                  height={500} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  priority
                />
              </div>
              {/* Artistic Background Accent */}
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#002b5b] rounded-[2.5rem] -z-10 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-500" />
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl shadow-sm space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#002b5b] dark:text-blue-400">
                  Prof. (Dr.) Shekhar Kumar Jaiswal
                </h2>
                <p className="text-blue-600 dark:text-blue-500 font-semibold text-sm mt-1">
                  Principal, Ramdeo Sharda College
                </p>
              </div>
              
              <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <Award size={18} className="text-blue-600 shrink-0" />
                  <span>Ph.D. & Senior Professor</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <Calendar size={18} className="text-blue-600 shrink-0" />
                  <span>25+ Years in Academic Leadership</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <Mail size={18} className="text-blue-600 shrink-0" />
                  <span>principal@rds-college.in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Message & 5-Year Strategic Vision */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Principal's Message Section */}
            <section className="relative bg-white dark:bg-slate-900/40 p-6 md:p-10 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
              <Quote className="absolute -top-4 -left-4 text-blue-100 dark:text-blue-950/20 h-24 w-24 -z-10 select-none pointer-events-none" />
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-[#002b5b] dark:text-blue-400 mb-8">
                Principal's Message
              </h1>
              
              <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-justify text-sm md:text-base">
                <p className="text-lg md:text-xl font-medium text-slate-800 dark:text-slate-200 italic border-l-4 border-blue-600 pl-4">
                  Dear Students, Faculty, and Visitors,
                </p>
                <p>
                  It gives me immense pleasure to welcome you to <strong>Ramdeo Sharda College</strong>, an institution dedicated to nurturing talent, fostering innovation, and shaping responsible citizens. Education, in our view, is not merely the acquisition of knowledge but the cultivation of values, discipline, and a spirit of inquiry that prepares individuals for life’s challenges.
                </p>
                <p>
                  At Ramdeo Sharda College, we strive to create an environment where academic excellence goes hand in hand with holistic development. Our dedicated faculty, modern infrastructure, and student-centric approach ensure that every learner receives the guidance and opportunities needed to excel in their chosen field.
                </p>
                <p>
                  We encourage our students to think critically, act ethically, and contribute meaningfully to society. Beyond academics, we emphasize extracurricular activities, community engagement, and industry collaborations that broaden horizons and instill confidence.
                </p>
                <p>
                  As Principal, my vision is to see our college emerge as a hub of excellence where tradition meets modernity, and where every student is empowered to realize their potential. Together, let us continue to build a vibrant academic community that inspires growth, leadership, and lifelong learning.
                </p>
              </div>

              {/* Signature Block */}
              <div className="pt-8 flex flex-col items-end">
                <p className="font-bold text-[#002b5b] dark:text-blue-400">
                  Prof. (Dr.) Shekhar Kumar Jaiswal
                </p>
                <p className="text-xs text-slate-500 italic mt-1">
                  Principal, Ramdeo Sharda College
                </p>
              </div>
            </section>

            {/* 5-Year Strategic Vision Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#002b5b] dark:text-blue-400">
                  Principal's 5-Year Vision Statement
                </h2>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-justify text-sm md:text-base">
                At Ramdeo Sharda College, our journey ahead is guided by a clear vision: to transform our institution into a hub of academic excellence, innovation, and holistic development. Over the next five years, we aim to achieve the following milestones:
              </p>

              {/* Milestones Accordion/Grid */}
              <div className="space-y-6">
                {visionMilestones.map((milestone) => {
                  const Icon = milestone.icon;
                  return (
                    <div 
                      key={milestone.number}
                      className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex gap-4 md:gap-6"
                    >
                      <div className={`shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-lg ${milestone.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-lg md:text-xl font-bold text-[#002b5b] dark:text-blue-400">
                          {milestone.number}. {milestone.title}
                        </h3>
                        <ul className="list-disc list-outside pl-4 space-y-2 text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed">
                          {milestone.points.map((pt, idx) => (
                            <li key={idx} className="text-justify">
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>

        </div>
      </div>
    </CustomLayout>
  );
}