import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const NavHeader = () => {
  return (
    <div className="navHeaderContainer w-full bg-white border-b border-gray-100 py-3 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
      
      {/* Left Section: Logo and College Name */}
      <div className="left flex items-center gap-4">
        <div className="logo relative w-20 h-20">
          {/* Replace with your actual logo path */}
          <div className="w-full h-full rounded-full border border-gray-200 flex items-center justify-center bg-slate-50">
            <span className="text-[10px] text-gray-400">LOGO</span>
          </div>
        </div>
        <div className="txt flex flex-col">
          <h1 className="text-xl font-bold text-[#1a237e] leading-tight">
            रामदेव शारदा कॉलेज, सालमरी, पूर्णिया
          </h1>
          <h1 className="text-lg font-bold text-[#1a237e] leading-tight uppercase tracking-tight">
            Ramdev Sharda College, Salmari, Purnea
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Affiliated to Purnea University, Purnea
          </p>
        </div>
      </div>

      {/* Right Section: Utility Nav, Contact, and CTA */}
      <div className="right flex flex-col items-end gap-2">
        
        {/* Top Row: Utility Links & Socials */}
        <div className="flex items-center gap-6 text-[13px] text-slate-600 font-medium">
          <Link href="#" className="hover:text-blue-700 transition-colors">Admission Portal</Link>
          <Link href="#" className="hover:text-blue-700 transition-colors">Gallery</Link>
          <Link href="#" className="hover:text-blue-700 transition-colors">Feedback</Link>
          <Link href="#" className="hover:text-blue-700 transition-colors">Location</Link>
          
          <div className="flex items-center gap-3 ml-2 border-l pl-4 border-gray-200 text-slate-500">
            <FaFacebook size={16} className="w-4 h-4 cursor-pointer hover:text-blue-600" />
            <FaXTwitter size={16} className="w-4 h-4 cursor-pointer hover:text-blue-400" />
            <FaInstagram size={16} className="w-4 h-4 cursor-pointer hover:text-pink-600" />
            <FaLinkedin size={16} className="w-4 h-4 cursor-pointer hover:text-blue-700" />
          </div>
        </div>

        {/* Bottom Row: Contact Info and Action Button */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end text-sm font-bold text-slate-800">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-pink-600 fill-pink-600" />
              <span>+91-XXXXX XXXXX</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-600 text-xs">
              <Mail className="w-4 h-4" />
              <span>rscollege@gmail.com</span>
            </div>
          </div>
          
          <Button size={'sm'} className="bg-[#002b5b] hover:bg-[#002b5b]/80 text-white font-bold px-4 rounded-md shadow-md text-xs cursor-pointer transition-all active:scale-95">
            Online Admission
          </Button>
        </div>
      </div>
    </div>
  );
};