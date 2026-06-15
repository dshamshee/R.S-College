import Image from "next/image";
import Link from "next/link";
import { Quote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrincipalBrief() {
  return (
    <section className="w-full py-16 px-4 md:px-8 flex justify-center bg-slate-50 dark:bg-slate-900/20 border-y border-slate-100 dark:border-slate-800/80">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* Left Column: Principal's Image with Decorative Elements */}
        <div className="lg:col-span-4 flex justify-center lg:justify-start">
          <div className="relative group max-w-[280px] w-full">
            <div className="aspect-[3/4] bg-slate-200 rounded-[2rem] overflow-hidden shadow-xl border-8 border-white relative z-10">
              <Image 
                src="/images/principal.jpeg" 
                alt="Prof. (Dr.) Shekhar Kumar Jaiswal" 
                width={300} 
                height={400} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Background color accent */}
            <div className="absolute -bottom-3 -right-3 w-full h-full bg-[#002b5b] rounded-[2rem] -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-500" />
          </div>
        </div>

        {/* Right Column: Message snippet and Action */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400">
              Leadership Message
            </span>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-[#002b5b] dark:text-blue-400 tracking-tight leading-tight">
              Principal's Message
            </h2>
            <div className="h-1 w-20 bg-blue-600 rounded-full" />
          </div>

          <div className="relative text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base space-y-4">
            <Quote className="absolute -top-6 -left-6 text-blue-200/50 dark:text-blue-950/20 h-16 w-16 -z-10 pointer-events-none select-none" />
            <p className="font-semibold text-slate-800 dark:text-slate-200 italic text-base md:text-lg">
              "Dear Students, Faculty, and Visitors,"
            </p>
            <p className="text-justify">
              It gives me immense pleasure to welcome you to Ramdeo Sharda College, an institution dedicated to nurturing talent, fostering innovation, and shaping responsible citizens. Education, in our view, is not merely the acquisition of knowledge but the cultivation of values, discipline, and a spirit of inquiry that prepares individuals for life's challenges.
            </p>
            <p className="text-justify hidden md:block">
              At Ramdeo Sharda College, we strive to create an environment where academic excellence goes hand in hand with holistic development. Our dedicated faculty, modern infrastructure, and student-centric approach ensure that every learner receives the guidance needed to excel...
            </p>
          </div>

          {/* Principal Info & Action Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-4 border-t border-slate-200/60 dark:border-slate-800">
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200 text-base">
                Prof. (Dr.) Shekhar Kumar Jaiswal
              </p>
              <p className="text-xs text-slate-500 font-medium">
                Principal, Ramdeo Sharda College
              </p>
            </div>
            
            <Link href="/about/principal">
              <Button className="bg-[#002b5b] hover:bg-blue-900 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 group flex items-center gap-2 cursor-pointer">
                Read Full Message
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
