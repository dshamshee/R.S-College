import { UpdatesType } from "@/models/updates";
import { UpdatesCard } from "./updatesCard";
import { Bell, FileText, Landmark } from "lucide-react";
import dbConnect from "@/config/dbConnection";
import UpdatesModel from "@/models/updates";

async function getUpdates(): Promise<UpdatesType[]> {
  try {
    await dbConnect();
    const updates = await UpdatesModel.find().lean();
    // Serialize Mongoose documents to plain objects
    return JSON.parse(JSON.stringify(updates));
  } catch (error) {
    console.error("Failed to fetch updates:", error);
    return [];
  }
}

export default async function Updates() {
  const updates = await getUpdates();

  const filtered = {
    notice: updates.filter(u => u.type === "NOTICE"),
    examination: updates.filter(u => u.type === "EXAMINATION"),
    tender: updates.filter(u => u.type === "TENDER")
  };

  return (
    <div className="updatesContainer w-full bg-slate-50 py-10 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">Latest Updates</h2>
          <p className="text-slate-500 text-sm">Stay informed with the latest college announcements</p>
        </div>

        {/* Grid System: 1 column on mobile, 3 on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Notice Column */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-3 px-2 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Bell size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Notice Board</h3>
            </div>
            <UpdatesCard updates={filtered.notice} borderColor="border-l-blue-500" />
          </section>

          {/* Examination Column */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-3 px-2 mb-2">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                <FileText size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Examinations</h3>
            </div>
            <UpdatesCard updates={filtered.examination} borderColor="border-l-emerald-500" />
          </section>

          {/* Tender Column */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-3 px-2 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                <Landmark size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Tenders</h3>
            </div>
            <UpdatesCard updates={filtered.tender} borderColor="border-l-orange-500" />
          </section>

        </div>
      </div>
    </div>
  );
}