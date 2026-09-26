import { CustomLayout } from "@/components/customeLayout";
import type { Metadata } from "next";
import { collegeDetails } from "@/config/collegeDetails";
import ContactForm from "@/components/ContactForm";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact Ramdeo Sharda College, ${collegeDetails.address}, ${collegeDetails.district}, ${collegeDetails.state} – ${collegeDetails.pincode}. Phone: ${collegeDetails.phone}, Email: ${collegeDetails.email}. Office hours, campus map, and inquiry form.`,
  openGraph: {
    title: "Contact Ramdeo Sharda College, Salmari",
    description: `Reach us at ${collegeDetails.phone} or ${collegeDetails.email}. Visit our campus at ${collegeDetails.address}, ${collegeDetails.district}.`,
  },
};

export default function ContactPage() {
  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-16">
        
        {/* Page Header */}
        <div className="flex flex-col gap-6 text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <span className="self-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400">
            Get In Touch
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-[#002b5b] dark:text-blue-400 tracking-tight leading-tight">
            Contact Our Institution
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Have queries about admissions, courses, or events? Reach out to us. Our administrative team is here to assist you.
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Contact Information & Google Map */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Info Cards */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl shadow-sm space-y-6">
              
              {/* Location Card */}
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">Campus Address</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {collegeDetails.name},<br />
                    {collegeDetails.address}, {collegeDetails.district}, {collegeDetails.state} - {collegeDetails.pincode}, India
                  </p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="flex gap-4 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">Phone Number</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {collegeDetails.phone}
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex gap-4 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-pink-50 dark:bg-pink-950/40 text-pink-600 flex items-center justify-center">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">Email Support</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {collegeDetails.email}
                  </p>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="flex gap-4 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">Office Hours</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Monday - Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

            </div>

            {/* Google Map Embed */}
            <div className="relative group overflow-hidden rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 aspect-video lg:aspect-auto lg:h-[280px]">
              <iframe
                title="Ramdeo Sharda College Location"
                src="https://maps.google.com/maps?q=Ramdeo%20Sharda%20College,%20Salmari,%20Katihar,%20Bihar&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              ></iframe>
            </div>

          </div>

          {/* Right Side: Interactive Contact Form (Client Component) */}
          <ContactForm />

        </div>

      </div>
    </CustomLayout>
  );
}
