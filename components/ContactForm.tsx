"use client";

import { useState } from "react";
import { 
  Send, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

export default function ContactForm() {
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
  );
}
