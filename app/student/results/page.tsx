import { CustomLayout } from "@/components/customeLayout";
import ResultForm from "@/components/ResultForm";
import { ClipboardCheck } from "lucide-react";

export default function Result() {
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

        {/* Interactive Form (Client Component) */}
        <ResultForm />

      </div>
    </CustomLayout>
  );
}