"use client";

import { CustomLayout } from "@/components/customeLayout";
import { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.phone && !/^\+?[0-9\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("submitting");

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

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
                    Ramdeo Sharda College,<br />
                    Salmari, Katihar, Bihar - 854113, India
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
                    +91 6201798093
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
                    rdsclg@purnea.ac.in
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

          {/* Right Side: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 md:p-10 rounded-[2rem] shadow-xl">
            <h2 className="text-2xl font-bold text-[#002b5b] dark:text-blue-400 mb-6">Send Us a Message</h2>
            
            {status === "success" ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 p-8 rounded-2xl text-center space-y-4">
                <div className="inline-flex p-3 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 rounded-full">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-400">Message Sent Successfully!</h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-500 max-w-sm mx-auto">
                  Thank you for reaching out. Our administration team has received your message and will respond as soon as possible.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Form Group: Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-colors dark:bg-slate-950 dark:border-slate-800 ${
                        errors.name ? "border-rose-500 focus:border-rose-500" : "border-slate-200 dark:border-slate-800 focus:border-blue-500"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs font-semibold text-rose-500 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Your Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-colors dark:bg-slate-950 dark:border-slate-800 ${
                        errors.email ? "border-rose-500 focus:border-rose-500" : "border-slate-200 dark:border-slate-800 focus:border-blue-500"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs font-semibold text-rose-500 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Form Group: Phone & Subject */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 9876543210"
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-colors dark:bg-slate-950 dark:border-slate-800 ${
                        errors.phone ? "border-rose-500 focus:border-rose-500" : "border-slate-200 dark:border-slate-800 focus:border-blue-500"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs font-semibold text-rose-500 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Admission Inquiry"
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-colors dark:bg-slate-950 dark:border-slate-800 ${
                        errors.subject ? "border-rose-500 focus:border-rose-500" : "border-slate-200 dark:border-slate-800 focus:border-blue-500"
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-xs font-semibold text-rose-500 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                {/* Form Group: Message */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Message *</label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-colors dark:bg-slate-950 dark:border-slate-800 resize-none ${
                      errors.message ? "border-rose-500 focus:border-rose-500" : "border-slate-200 dark:border-slate-800 focus:border-blue-500"
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-xs font-semibold text-rose-500 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-4 px-6 bg-[#002b5b] hover:bg-[#002b5b]/90 text-white font-bold rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed cursor-pointer text-sm"
                >
                  {status === "submitting" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-500 border-t-white rounded-full animate-spin"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>

                {status === "error" && (
                  <p className="text-sm font-semibold text-rose-500 text-center flex items-center justify-center gap-1.5">
                    <AlertCircle size={16} /> Something went wrong. Please try again.
                  </p>
                )}

              </form>
            )}

          </div>

        </div>

      </div>
    </CustomLayout>
  );
}
