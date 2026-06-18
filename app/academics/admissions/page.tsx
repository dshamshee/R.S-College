import { CustomLayout } from "@/components/customeLayout";
import { 
  ClipboardList, 
  CheckCircle, 
  FileText, 
  CreditCard 
} from "lucide-react";

const steps = [
  {
    title: "Registration",
    desc: "Create an account on the Purnea University OFSS portal.",
    icon: <ClipboardList className="text-blue-600" />
  },
  {
    title: "Document Upload",
    desc: "Upload your 10th & 12th marksheet, SLC, and Caste certificate.",
    icon: <FileText className="text-blue-600" />
  },
  {
    title: "Fee Payment",
    desc: "Pay the application fee securely through the online portal.",
    icon: <CreditCard className="text-blue-600" />
  },
  {
    title: "Merit List",
    desc: "Wait for the university to release the selection list.",
    icon: <CheckCircle className="text-blue-600" />
  }
];

export default function Admissions() {
  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-16">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Admissions 2026-27</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Your journey toward academic excellence starts here. Follow our streamlined 
            process to secure your seat at Ramdev Sharda College.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left: Admission Process Steps */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">1</span>
              Application Process
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {steps.map((step, i) => (
                <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-blue-200 transition-all">
                  <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Eligibility Table */}
            <div className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">2</span>
                Eligibility Criteria
              </h2>
              <div className="overflow-hidden border border-slate-100 rounded-xl">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Course</th>
                      <th className="px-6 py-4">Minimum Qualification</th>
                      <th className="px-6 py-4">Required Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-6 py-4 font-semibold text-blue-900">B.Sc (Hons)</td>
                      <td className="px-6 py-4">12th Science / Intermediate</td>
                      <td className="px-6 py-4">45% in Aggregate</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-semibold text-blue-900">B.A (Hons)</td>
                      <td className="px-6 py-4">12th Arts / Science / Commerce</td>
                      <td className="px-6 py-4">45% in Aggregate</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-semibold text-blue-900">B.Com (Hons)</td>
                      <td className="px-6 py-4">12th Commerce / Science</td>
                      <td className="px-6 py-4">45% in Aggregate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-8">
            <div className="p-8 border border-slate-100 rounded-[2rem] bg-slate-50/50 shadow-sm">
              <h4 className="font-bold text-blue-900 mb-3 text-lg">Need Help?</h4>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Contact our admission helpdesk for any queries related to forms, documents, eligibility, or online payments.
              </p>
              <p className="text-base font-bold text-slate-800 flex items-center gap-2">
                Phone: +91 6201798093
              </p>
            </div>
          </div>

        </div>
      </div>
    </CustomLayout>
  );
}