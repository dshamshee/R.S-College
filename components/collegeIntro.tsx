import { Target, Eye, CheckCircle2, Award, BookOpen, Sparkles, GraduationCap } from "lucide-react";

export default function CollegeIntro() {
  const whyChooseUs = [
    {
      title: "Academic Excellence",
      desc: "Experienced faculty and well-structured programs across diverse disciplines.",
    },
    {
      title: "Modern Infrastructure",
      desc: "Smart classrooms, advanced laboratories, and a resource-rich library.",
    },
    {
      title: "Holistic Development",
      desc: "Focus on extracurricular, sports, and cultural activities alongside academics.",
    },
    {
      title: "Industry Connect",
      desc: "Internships, workshops, and collaborations with leading organizations.",
    },
    {
      title: "Student-Centric Approach",
      desc: "Personalized mentoring, career guidance, and support services.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 px-4 md:px-8 flex justify-center bg-background transition-colors duration-300">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Welcome, Mission & Vision */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400">
              <Sparkles className="w-3.5 h-3.5" /> Welcome to Excellence
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#002b5b] dark:text-blue-400 tracking-tight leading-tight">
              Welcome to Ramdeo Sharda College
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg text-justify">
              At Ramdeo Sharda College, we believe education is more than just academics—it is about nurturing talent, inspiring innovation, and shaping future leaders. Established with a vision to provide quality education and holistic development, our institution has grown into a hub of excellence where tradition meets modernity.
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Mission Card */}
            <div id="mission" className="group p-6 bg-gradient-to-br from-blue-900 to-[#002b5b] text-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-blue-300 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Our Mission</h3>
              <p className="text-blue-100 text-sm leading-relaxed text-justify">
                To empower students with knowledge, skills, and values that prepare them to excel in their chosen fields and contribute meaningfully to society.
              </p>
            </div>

            {/* Vision Card */}
            <div id="vision" className="group p-6 bg-card border border-border/80 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Our Vision</h3>
              <p className="text-muted-foreground text-sm leading-relaxed text-justify">
                To be recognized as a leading institution that fosters creativity, critical thinking, and lifelong learning in a dynamic global environment.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Why Choose Us */}
        <div id="objective" className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200/60 dark:border-slate-800">
            <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-bold text-[#002b5b] dark:text-blue-400">
              Why Choose Us?
            </h3>
          </div>

          <div className="space-y-6">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="flex gap-4 group">
                <div className="mt-1 shrink-0 w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm md:text-base mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}