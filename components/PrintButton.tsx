"use client";

import { Download } from "lucide-react";

export default function PrintButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-800 transition-all shadow-lg active:scale-95 no-print cursor-pointer"
    >
      <Download size={18} /> PDF Calendar
    </button>
  );
}
