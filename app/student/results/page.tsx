"use client";

import { CustomLayout } from "@/components/customeLayout";
import { useState } from "react";
import { 
  Search, 
  ClipboardCheck, 
  AlertTriangle, 
  RefreshCcw,
  XCircle,
  HelpCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function Result() {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleCheckResult = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating backend search delay
    setTimeout(() => {
      setLoading(false);
      setShowError(true);
    }, 1200);
  };

  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-16 min-h-[80vh] flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl text-blue-600 mb-4">
            <ClipboardCheck size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4 tracking-tight">Result Portal</h1>
          <p className="text-slate-500 max-w-lg mx-auto text-sm md:text-base">
            Please enter your examination details accurately to fetch your digital scorecard.
          </p>
        </div>

        {/* Form Card */}
        <div className="w-full max-w-md bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5">
          <form onSubmit={handleCheckResult} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Registration Number</label>
              <input 
                required
                type="text" 
                placeholder="e.g. REG-2026-001"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-sm font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Roll Number</label>
              <input 
                required
                type="text" 
                placeholder="Enter Examination Roll No."
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-sm font-medium"
              />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Search size={18} />
                  Find My Result
                </>
              )}
            </button>
          </form>
        </div>

        {/* --- ERROR POPUP --- */}
        <Dialog open={showError} onOpenChange={setShowError}>
          <DialogContent className="max-w-sm rounded-[2rem] p-0 overflow-hidden border-none shadow-2xl">
            <div className="bg-amber-500 p-8 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                <AlertTriangle size={32} className="text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold">Result Not Found</DialogTitle>
              <DialogDescription className="text-amber-100 mt-2 font-medium">
                We couldn&apos;t locate any records matching the details provided.
              </DialogDescription>
            </div>

            <div className="p-8 space-y-6 bg-white">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-slate-100 rounded-full text-slate-400 mt-0.5">
                        <RefreshCcw size={14} />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                        Please double-check your <strong>Registration</strong> and <strong>Roll Number</strong> for typos.
                    </p>
                </div>
                <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-slate-100 rounded-full text-slate-400 mt-0.5">
                        <XCircle size={14} />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                        Ensure you have selected the correct <strong>Session/Semester</strong> from the list.
                    </p>
                </div>
                <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-slate-100 rounded-full text-slate-400 mt-0.5">
                        <HelpCircle size={14} />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                        If the issue persists, contact the <strong>IT Support Desk</strong> or the <strong>Registrar&apos;s Office</strong>.
                    </p>
                </div>
              </div>

              <button 
                onClick={() => setShowError(false)}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-95"
              >
                Try Again
              </button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </CustomLayout>
  );
}