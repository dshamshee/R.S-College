import { CustomLayout } from "@/components/customeLayout";
import { BookOpen, Target, History } from "lucide-react";

export default function Aboutcollege() {
    return (
        <CustomLayout>
            <div className="max-w-7xl mx-auto py-12 px-6 md:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

                    {/* Sidebar: Quick Info */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <h3 className="text-blue-900 font-bold text-lg mb-4 border-b pb-2">Quick Links</h3>
                            <ul className="flex flex-col gap-3 text-sm text-slate-600 font-medium">
                                <li className="hover:text-blue-600 cursor-pointer">College Administration</li>
                                <li className="hover:text-blue-600 cursor-pointer">Academic Calendar</li>
                                <li className="hover:text-blue-600 cursor-pointer">Code of Conduct</li>
                                <li className="hover:text-blue-600 cursor-pointer">Infrastructure</li>
                            </ul>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 flex flex-col gap-10">
                        {/* Section: History */}
                        <section className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 text-blue-900">
                                <History size={28} />
                                <h2 className="text-3xl font-bold">Our History</h2>
                            </div>
                            <div className="flex flex-col gap-6">
                                {/* Paragraph 1: History & Vision */}
                                <p className="text-slate-600 leading-relaxed text-justify">
                                    Established with a core vision to provide quality education to the rural masses,
                                    <strong> Ramdev Sharda College</strong> has served as a cornerstone of academic
                                    excellence in Salmari, Purnea for decades. Since its inception, the institution
                                    has dedicated itself to fostering an environment where intellectual growth and social
                                    responsibility go hand in hand, empowering students from all walks of life.
                                </p>

                                {/* Paragraph 2: Academic Commitment */}
                                <p className="text-slate-600 leading-relaxed text-justify">
                                    The college is committed to empowering its scholars through a diverse range of
                                    undergraduate programs tailored to meet modern industry standards. By
                                    ensuring students are well-equipped with both theoretical knowledge and practical
                                    skills, we prepare them to navigate the complexities of an ever-evolving global
                                    landscape with confidence and integrity.
                                </p>

                                {/* Paragraph 3: Holistic Development */}
                                <p className="text-slate-600 leading-relaxed text-justify">
                                    Beyond academics, our focus remains steadfast on character building and technical
                                    proficiency. As an affiliate of <strong>Purnea University</strong>, the college
                                    stands as a beacon of higher education, providing the necessary infrastructure
                                    and mentorship for aspiring professionals to transition into leadership roles
                                    within their communities.
                                </p>

                                {/* Paragraph 4: Future Outlook */}
                                <p className="text-slate-600 leading-relaxed text-justify">
                                    Continuing its legacy of service, the college constantly integrates new educational
                                    methodologies and digital resources. Our goal is to bridge the gap between traditional
                                    values and contemporary professional requirements, ensuring that every student who
                                    walks through our gates is ready to contribute to the nation&apos;s progress.
                                </p>
                            </div>
                        </section>

                        {/* Section: Mission & Vision */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-8 bg-blue-900 text-white rounded-2xl shadow-lg flex flex-col gap-4">
                                <Target size={32} className="text-blue-300" />
                                <h3 className="text-xl font-bold">Our Mission</h3>
                                <p className="text-blue-100 text-sm leading-relaxed">
                                    To provide inclusive and quality education that empowers students
                                    to achieve their full potential and contribute meaningfully to society.
                                </p>
                            </div>
                            <div className="p-8 bg-white border border-blue-100 rounded-2xl shadow-sm flex flex-col gap-4">
                                <BookOpen size={32} className="text-blue-600" />
                                <h3 className="text-xl font-bold text-blue-900">Our Vision</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    To emerge as a premier center of learning that bridges the gap between
                                    traditional values and modern educational requirements.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </CustomLayout>
    );
}