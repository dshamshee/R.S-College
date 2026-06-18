import Image from "next/image";
import { Phone, Mail } from "lucide-react";

export const NavHeader = () => {
  return (
    <div className="navHeaderContainer w-full bg-white border-b border-gray-100 py-4 px-4 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-y-6 lg:gap-x-6">
        
        {/* Left Section: Logo and College Name */}
        <div className="left flex items-center gap-3 md:gap-4 w-full lg:w-auto">
          <div className="logo relative shrink-0 w-16 h-16 md:w-20 md:h-20">
            <Image
              src="/images/logo.jpg"
              alt="Ramdeo Sharda College Logo"
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div className="txt flex flex-col">
            <h1 className="text-base md:text-xl font-bold text-[#1a237e] leading-tight">
              रामदेव शारदा कॉलेज, सालमरी, कटिहार
            </h1>
            <h1 className="text-sm md:text-lg font-bold text-[#1a237e] leading-tight uppercase tracking-tight">
              {process.env.COLLEGE_NAME}, {process.env.COLLEGE_CITY}, {process.env.COLLEGE_DISTRICT}
            </h1>
            <p className="text-[10px] md:text-sm text-slate-500 font-medium italic">
              Affiliated to {process.env.UNIVERSITY_NAME}, {process.env.UNIVERSITY_DISTRICT}
            </p>
          </div>
        </div>

        {/* Right Section: Contact Info */}
        <div className="right flex flex-col items-center lg:items-end gap-3 w-full lg:w-auto">
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 md:gap-6 w-full">
            {/* Contact Info: Stacked on mobile, side-by-side on desktop */}
            <div className="flex flex-row lg:flex-col items-center lg:items-end gap-x-4 gap-y-0 text-xs md:text-sm font-bold text-slate-800">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-pink-600 fill-pink-600" />
                <span className="whitespace-nowrap">+91-{process.env.COLLEGE_PHONE}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 font-semibold text-slate-600 text-[10px] md:text-xs">
                <Mail className="w-3.5 h-3.5" />
                <span>{process.env.COLLEGE_EMAIL}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};