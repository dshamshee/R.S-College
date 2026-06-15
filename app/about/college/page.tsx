import { CustomLayout } from "@/components/customeLayout";
import { 
  BookOpen, 
  Target, 
  Award, 
  ShieldCheck, 
  Lightbulb, 
  Users, 
  HeartHandshake, 
  GraduationCap, 
  Building, 
  Briefcase, 
  Sparkles 
} from "lucide-react";

export default function AboutCollege() {
  const coreValues = [
    {
      title: "Excellence",
      desc: "Striving for the highest standards in teaching, research, and learning.",
      icon: Award,
      color: "from-blue-500 to-indigo-600",
      lightColor: "text-blue-600 bg-blue-50 dark:bg-blue-950/40"
    },
    {
      title: "Integrity",
      desc: "Promoting honesty, transparency, and accountability in all endeavors.",
      icon: ShieldCheck,
      color: "from-emerald-500 to-teal-600",
      lightColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40"
    },
    {
      title: "Innovation",
      desc: "Encouraging creativity, critical thinking, and problem-solving.",
      icon: Lightbulb,
      color: "from-amber-500 to-orange-600",
      lightColor: "text-amber-600 bg-amber-50 dark:bg-amber-950/40"
    },
    {
      title: "Inclusivity",
      desc: "Building a diverse and supportive environment for all students.",
      icon: Users,
      color: "from-purple-500 to-pink-600",
      lightColor: "text-purple-600 bg-purple-50 dark:bg-purple-950/40"
    },
    {
      title: "Community Service",
      desc: "Inspiring social responsibility and active engagement with society.",
      icon: HeartHandshake,
      color: "from-rose-500 to-red-600",
      lightColor: "text-rose-600 bg-rose-50 dark:bg-rose-950/40"
    }
  ];

  const whatWeOffer = [
    {
      title: "Experienced Faculty & Programs",
      desc: "Well-structured academic courses taught by veteran educators across multiple streams.",
      icon: GraduationCap
    },
    {
      title: "Modern Infrastructure",
      desc: "Equipped with smart classrooms, state-of-the-art labs, and a resource-rich library.",
      icon: Building
    },
    {
      title: "Industry Connect & Placement",
      desc: "Opportunities for internships, hands-on workshops, and collaborations with leading companies.",
      icon: Briefcase
    },
    {
      title: "Vibrant Campus Life",
      desc: "A rich mix of extracurricular programs, sports events, and cultural activities.",
      icon: Sparkles
    }
  ];

  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-16">
        
        {/* Main Title & Hero Introduction */}
        <div className="flex flex-col gap-6 text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <span className="self-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400">
            About Our Institution
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-[#002b5b] dark:text-blue-400 tracking-tight leading-tight">
            Education is the Foundation of Progress & Empowerment
          </h1>
          <div className="text-slate-600 dark:text-slate-300 text-sm md:text-lg leading-relaxed space-y-6 text-justify md:text-center">
            <p>
              At Ramdeo Sharda College, we believe education is the foundation of progress and empowerment. Established with a vision to provide quality learning and holistic development, our institution has grown into a center of excellence where tradition meets innovation.
            </p>
            <p>
              We are committed to nurturing talent, fostering creativity, and shaping future leaders who can contribute meaningfully to society. With a blend of academic rigor, modern infrastructure, and a student-centric approach, we ensure that every learner receives the guidance and opportunities needed to excel in their chosen field.
            </p>
          </div>
        </div>

        {/* Section: Core Values */}
        <div className="mb-20 md:mb-28">
          <div className="flex items-center gap-3 justify-center mb-12">
            <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-[#002b5b] dark:text-blue-400">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div 
                  key={idx} 
                  className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${value.lightColor} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#002b5b] dark:text-blue-400 mb-3 group-hover:text-blue-600 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                  {/* Subtle decorative color bar */}
                  <div className={`absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r ${value.color} rounded-t-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: What We Offer */}
        <div className="bg-slate-50 dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-100/60 dark:border-slate-800/80 p-8 md:p-16 mb-20 shadow-sm">
          <div className="flex items-center gap-3 justify-center mb-12">
            <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-[#002b5b] dark:text-blue-400">
              What We Offer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {whatWeOffer.map((offer, idx) => {
              const Icon = offer.icon;
              return (
                <div key={idx} className="flex gap-5 group">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700/60 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-[#002b5b] group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {offer.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {offer.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final Quote/Outro Section */}
        <div className="text-center max-w-3xl mx-auto mt-12 py-8 border-t border-slate-200/60 dark:border-slate-800">
          <p className="text-lg md:text-2xl font-medium text-slate-800 dark:text-slate-200 italic leading-relaxed mb-4">
            "At Ramdeo Sharda College, we don’t just educate—we inspire. We prepare students to face challenges with confidence, embrace opportunities with enthusiasm, and lead with vision and purpose."
          </p>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Ramdeo Sharda College, Salmari
          </span>
        </div>

      </div>
    </CustomLayout>
  );
}