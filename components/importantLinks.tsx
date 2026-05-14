import { 
    LinkIcon, 
    Users, 
    BookOpen, 
    Briefcase, 
    Lightbulb, 
    Building2, 
    ClipboardCheck, 
    Image as ImageIcon, 
    PenTool, 
    FileText, 
    Trophy 
  } from "lucide-react";
  import { LinkCard } from "./linksCard";
  
  export const ImportantLinks = () => {
      return (
          <div className="max-w-7xl mx-auto p-5 mt-10">
              {/* Header Section */}
              <div className="flex items-center justify-center gap-8 mb-12">
                  <hr className="hidden md:block w-24 border-t-2 border-blue-900" />
                  <h1 className="text-2xl text-blue-900 font-bold whitespace-nowrap">
                      Important Links
                  </h1>
                  <hr className="hidden md:block w-24 border-t-2 border-blue-900" />
              </div>
  
              {/* Links Grid - Flex used to match the specific alignment in image_87ac2b.png */}
              <div className="flex flex-wrap justify-center gap-4">
                  {/* Top Row - 6 Items */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      <LinkCard icon={<Users size={40} />} title="Workshop" link="#" />
                      <LinkCard icon={<BookOpen size={40} />} title="Seminar & Conference" link="#" />
                      <LinkCard icon={<FileText size={40} />} title="Magazine & Journal" link="#" />
                      <LinkCard icon={<Briefcase size={40} />} title="Job Opportunities" link="#" />
                      <LinkCard icon={<Lightbulb size={40} />} title="Innovation Cell" link="#" />
                      <LinkCard icon={<Building2 size={40} />} title="Infrastructure" link="#" />
                  </div>
  
                  {/* Bottom Row - 5 Items centered */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      <LinkCard icon={<ClipboardCheck size={40} />} title="Grievance & Redressal" link="#" />
                      <LinkCard icon={<ImageIcon size={40} />} title="Gallery" link="#" />
                      <LinkCard icon={<PenTool size={40} />} title="Best Practises" link="#" />
                      <LinkCard icon={<FileText size={40} />} title="Audit Reports" link="#" />
                      <LinkCard icon={<Trophy size={40} />} title="Achievements" link="#" />
                  </div>
              </div>
          </div>
      )
  }