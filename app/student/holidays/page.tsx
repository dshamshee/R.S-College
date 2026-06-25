"use client";

import { CustomLayout } from "@/components/customeLayout";
import { useState, useEffect } from "react";
import axios from "axios";
import { 
  CalendarDays, 
  Palmtree, 
  Moon, 
  Sun, 
  Info, 
  Download,
  CalendarCheck,
  Loader2
} from "lucide-react";

export default function Holidays() {
  const [holidays, setHolidays] = useState<any[]>([]);
  const [vacations, setVacations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get('/api/holidays');
        if (response.data.success) {
          const data = response.data.data;
          if (data) {
            setHolidays(data.holidays || []);
            setVacations(data.vacations || []);
          }
        }
      } catch (error) {
        console.error("Failed to fetch holidays:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHolidays();
  }, []);

  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-3">
              <CalendarDays size={16} /> Academic Session 2026-27
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4">Holiday Calendar</h1>
            <p className="text-slate-500 text-sm md:text-lg leading-relaxed">
              Official list of holidays observed at <strong>Ramdev Sharda College</strong>. 
              These dates are subject to change as per the notifications from 
              <strong> Purnea University</strong> and the State Government.
            </p>
          </div>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-800 transition-all shadow-lg active:scale-95 no-print cursor-pointer"
          >
            <Download size={18} /> PDF Calendar
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-blue-900" size={40} />
          </div>
        ) : holidays.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-sm bg-white border border-slate-100 rounded-2xl shadow-sm">
            No holidays published in the calendar yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content: Holiday Table */}
            <div className="lg:col-span-2 overflow-x-auto table-container">
              <div className="min-w-full inline-block align-middle">
                <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm bg-white">
                  <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 font-bold text-blue-900 uppercase tracking-wider text-[10px]">Date</th>
                        <th className="px-6 py-4 font-bold text-blue-900 uppercase tracking-wider text-[10px]">Occasion</th>
                        <th className="px-6 py-4 font-bold text-blue-900 uppercase tracking-wider text-[10px] hidden md:table-cell">Day</th>
                        <th className="px-6 py-4 font-bold text-blue-900 uppercase tracking-wider text-[10px]">Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {holidays.map((holiday, i) => {
                        const dateObj = new Date(holiday.date);
                        const formattedDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                        const weekday = dateObj.toLocaleDateString("en-US", { weekday: "long" });

                        return (
                          <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                            <td className="px-6 py-5 font-bold text-slate-800 whitespace-nowrap">{formattedDate}</td>
                            <td className="px-6 py-5 text-slate-600 font-medium">{holiday.occasion}</td>
                            <td className="px-6 py-5 text-slate-400 hidden md:table-cell">{weekday}</td>
                            <td className="px-6 py-5">
                              <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-tight ${
                                holiday.type === "Gazetted" 
                                ? "bg-emerald-100 text-emerald-700" 
                                : "bg-blue-100 text-blue-700"
                              }`}>
                                {holiday.type}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar: Seasonal Vacations & Notes */}
            <div className="space-y-8 sidebar-section">
              {/* Vacation Card */}
              <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
                 <Palmtree className="absolute -bottom-6 -right-6 text-white/5" size={150} />
                 <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                   <CalendarCheck className="text-blue-400" />
                   Long Vacations
                 </h3>
                 <div className="space-y-6 relative z-10">
                   {vacations.length === 0 ? (
                     <p className="text-xs text-slate-400">No long vacations scheduled.</p>
                   ) : (
                     vacations.map((vacation, i) => {
                       const startObj = new Date(vacation.startDate);
                       const endObj = new Date(vacation.endDate);
                       const formattedStart = startObj.toLocaleDateString("en-US", { month: "long", day: "2-digit" });
                       const formattedEnd = endObj.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" });
                       return (
                         <div key={i} className="border-l-2 border-blue-500/30 pl-4">
                           <p className="text-[10px] uppercase font-bold text-blue-400 tracking-widest">{vacation.name}</p>
                           <p className="text-sm">{formattedStart} - {formattedEnd}</p>
                         </div>
                       );
                     })
                   )}
                 </div>
              </div>

              {/* Note Section */}
              <div className="p-8 border border-slate-100 rounded-[2rem] bg-slate-50 flex gap-4">
                <Info className="text-blue-600 shrink-0" size={24} />
                <div className="space-y-2">
                  <h4 className="font-bold text-blue-900 text-sm">Note to Students</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    In case of festivals depending on the visibility of the moon, 
                    changes in dates will be notified through the official notice board.
                  </p>
                </div>
              </div>

              {/* Visual Icons for categories */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white border border-slate-100 rounded-2xl flex flex-col items-center text-center">
                   <Sun className="text-orange-500 mb-3" size={24} />
                   <p className="text-[10px] font-bold text-slate-400 uppercase">Gazetted</p>
                   <p className="text-xs text-slate-600">National Holidays</p>
                </div>
                <div className="p-6 bg-white border border-slate-100 rounded-2xl flex flex-col items-center text-center">
                   <Moon className="text-indigo-500 mb-3" size={24} />
                   <p className="text-[10px] font-bold text-slate-400 uppercase">Local</p>
                   <p className="text-xs text-slate-600">State Festivals</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      <style>{`
        @media print {
          /* Hide layout header, footer, sidebar and print button */
          header, footer, nav, button, .sidebar-section, .no-print, .headerContainer, .footerContainer, [role="navigation"], .navHeaderContainer, .headImage {
            display: none !important;
          }
          /* Reset container margins & paddings for printing */
          body, main, .max-w-7xl, .table-container {
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
            color: black !important;
          }
          /* Eliminate layout grids that disrupt vertical flow */
          .grid {
            display: block !important;
          }
          /* Prevent page-break issues by resetting overflow and display */
          .table-container, 
          .table-container > div, 
          .table-container > div > div {
            overflow: visible !important;
            display: block !important;
            width: 100% !important;
            border: none !important;
            box-shadow: none !important;
          }
          table {
            width: 100% !important;
            border-collapse: collapse !important;
            page-break-inside: auto !important;
          }
          tr {
            page-break-inside: avoid !important;
            page-break-after: auto !important;
          }
          thead {
            display: table-header-group !important;
          }
          /* Eliminate shadows & borders on print to save ink */
          .shadow-sm, .shadow-xl, .shadow-md {
            box-shadow: none !important;
          }
        }
      `}</style>
    </CustomLayout>
  );
}