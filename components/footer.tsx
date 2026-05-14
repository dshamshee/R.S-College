import Link from "next/link";
import {Mail, X,} from "lucide-react";

export const Footer = () => {
  const footerSections = [
    {
      title: "Quick Links",
      links: ["NAAC & Accredition", "Tenders", "Alumni", "Departments", "Student Zone", "Exam & Results"],
    },
    {
      title: "Others Links",
      links: ["Mission", "Vision", "Objective", "Downloads", "Prospectus", "Contact Us"],
    },
    {
      title: "Important Links",
      links: [
        "Purnea University (Purnea)",
        "RTI",
        "UGC",
        "AICTE",
        "NAAC",
        "Anti-Ragging Act",
        "National Portal of India",
        "Government of Bihar",
      ],
    },
  ];

  return (
    <footer className="w-full flex flex-col font-sans">
      {/* Top Section: Links and Contact */}
      <div className="bg-[#002b5b] text-white py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {footerSections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold border-b border-blue-400/30 pb-2 w-fit pr-10">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link, i) => (
                  <li key={i} className="border-b border-blue-400/10 pb-1 last:border-0">
                    <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold border-b border-blue-400/30 pb-2 w-fit pr-10">
              Contact us
            </h3>
            <div className="text-sm text-gray-300 flex flex-col gap-2">
              <p className="font-medium text-white">Ramdev Sharda College</p>
              <p>Purnea, Bihar-854301,</p>
              <p className="mt-2">Ph : 0621-2222222</p>
              <p>Email : info@rscollege.ac.in</p>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <Mail className="w-6 h-6 cursor-pointer hover:text-blue-400 transition-all" />
              <X className="w-6 h-6 cursor-pointer hover:text-blue-400 transition-all" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright and Credits */}
      <div className="bg-[#dc2626] text-white py-4 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[12px] gap-4">
          <p>Copyright © 2009 Ramdev Sharda College, Purnea.</p>
          
          <div className="flex items-center gap-4">
            <p>Designed by : Vastaman Solutions | Site Admin | Site Visited :</p>
            {/* Visitor Counter Stylized */}
            <div className="flex gap-1 bg-black p-1 rounded">
              {["8", "2", "1", "8", "1", "2"].map((num, i) => (
                <span key={i} className="bg-[#1a1a1a] px-1 text-red-500 font-mono border border-gray-800">
                  {num}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};