import { CustomLayout } from "@/components/customeLayout";
import { 
  Quote, 
  Award, 
  GraduationCap, 
  Mail, 
  Calendar,
  Sparkles 
} from "lucide-react";
import Image from "next/image";

export default function Principal() {
  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Profile Image & Quick Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative group">
              <div className="aspect-[3/4] bg-slate-200 rounded-3xl overflow-hidden shadow-2xl border-8 border-white relative z-10">
                {/* Replace with actual principal image */}
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                  {/* <GraduationCap size={80} /> */}
                  <Image src="/images/samrat-chaudhary.jpeg" alt="Principal" width={300} height={300} className="w-full h-full object-cover rounded-3xl" />
                </div>
              </div>
              {/* Decorative background element */}
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-blue-900 rounded-3xl -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
            </div>

            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-blue-900">Dr. Samrat Chaudhary</h2>
                <p className="text-blue-600 font-semibold text-sm">Principal, R.S. College</p>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Award size={18} className="text-blue-600" />
                  <span>Ph.D. in [Specialization]</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Calendar size={18} className="text-blue-600" />
                  <span>20+ Years of Experience</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail size={18} className="text-blue-600" />
                  <span>principal@rscollege.in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message & Vision */}
          <div className="lg:col-span-8 space-y-10">
            <section className="relative">
              <Quote className="absolute -top-6 -left-6 text-blue-100 h-20 w-20 -z-10" />
              <h1 className="text-4xl font-bold text-blue-900 mb-8">Principal&apos;s Message</h1>
              
              <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed text-justify">
                <p className="text-lg font-medium text-slate-800 italic">
                  &quot;Education is the most powerful weapon which you can use to change the world.&quot;
                </p>
                <p>
                  Welcome to <strong>Ramdev Sharda College</strong>, Salmari. It is a matter of great pride 
                  to lead an institution that has been a beacon of light for students in rural Purnea 
                  for decades. Our mission is to provide an environment where academic excellence 
                  meets character building.
                </p>
                <p>
                  As an affiliate of <strong>Purnea University</strong>, we are committed to implementing 
                  the National Education Policy (NEP) while ensuring our students remain rooted in 
                  their cultural values. We focus not just on degree completion, but on creating 
                  market-ready professionals and responsible citizens.
                </p>
                <p>
                  I invite all aspiring students to join our community and embark on a journey of 
                  self-discovery and technical proficiency. Together, let us build a brighter 
                  future for our nation.
                </p>
              </div>
            </section>

            {/* Strategic Vision Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm text-blue-600">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-bold text-blue-900 mb-2">Digital Integration</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Leading the college toward a complete paperless administration and AI-enabled 
                  learning tools for modern pedagogy.
                </p>
              </div>
              
              <div className="p-8 bg-slate-900 text-white rounded-3xl">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4 text-blue-300">
                  <Award size={20} />
                </div>
                <h3 className="font-bold mb-2">Academic Excellence</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Consistently striving for high NAAC accreditation and fostering a 
                  culture of research among faculty and students.
                </p>
              </div>
            </div>

            {/* Signature Section */}
            <div className="pt-10 flex flex-col items-end">
              <div className="w-48 h-16 border-b border-slate-300 mb-2" />
              <p className="font-bold text-blue-900">Dr. Samrat Chaudhary</p>
              <p className="text-sm text-slate-500 italic">Principal, R.S. College</p>
            </div>
          </div>

        </div>
      </div>
    </CustomLayout>
  );
}