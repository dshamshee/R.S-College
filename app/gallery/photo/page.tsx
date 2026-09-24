import { CustomLayout } from "@/components/customeLayout";
import PhotoGalleryClient from "@/components/PhotoGalleryClient";
import dbConnect from "@/config/dbConnection";
import GalleryModel from "@/models/galarry";
import { Camera, Image as ImageIcon } from "lucide-react";

export const dynamic = "force-dynamic";

// Static fallback items
const staticPhotos = [
  { id: 1, src: "/images/gallery/1.jpeg", category: "Campus", types: "ACADEMIC", title: "College Main Building Entrance" },
  { id: 2, src: "/images/gallery/2.jpeg", category: "Campus", types: "ACADEMIC", title: "Academic Block and Courtyard" },
  { id: 3, src: "/images/gallery/3.jpeg", category: "Events", types: "EVENT", title: "Institutional Celebrations" },
  { id: 4, src: "/images/gallery/4.jpeg", category: "Campus", types: "OTHER", title: "Lush Green Campus Environment" },
  { id: 5, src: "/images/gallery/5.jpeg", category: "Events", types: "EVENT", title: "College Seminar Hall Event" },
  { id: 6, src: "/images/gallery/6.jpeg", category: "Sports", types: "FESTIVAL", title: "Annual Athletic Meet" },
  { id: 7, src: "/images/gallery/7.jpeg", category: "Campus", types: "OTHER", title: "Students Group in Campus" },
  { id: 8, src: "/images/gallery/8.jpeg", category: "Campus", types: "OTHER", title: "Main College Gate" },
];

export default async function PhotoGallery() {
  let dbGalleryItems: any[] = [];

  try {
    await dbConnect();
    const result = await GalleryModel.find({}).sort({ createdAt: -1 }).lean();
    dbGalleryItems = JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Failed to load db gallery items:", error);
  }

  // Combine database gallery items with static fallback if DB is empty
  const allMediaItems = dbGalleryItems.length > 0 ? dbGalleryItems : staticPhotos;

  return (
    <CustomLayout headerImage="infrastructure.jpg">
      <div className="max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-16">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl text-blue-600 mb-4">
            <Camera size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4 tracking-tight">Visual Journey</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            A glimpse into the vibrant life at <strong>Ramdeo Sharda College</strong>. 
            From academic milestones to cultural festivals, sporting triumphs, and events.
          </p>
        </div>

        {/* Interactive Gallery (Client Component) */}
        <PhotoGalleryClient items={allMediaItems} />

        {/* Footer Note */}
        <div className="mt-20 flex flex-col items-center">
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4 max-w-md">
            <ImageIcon className="text-blue-400" size={24} />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Images and videos shown are property of R.D.S. College. Unauthorized reproduction 
              of media files is strictly prohibited under institutional guidelines.
            </p>
          </div>
        </div>
      </div>
    </CustomLayout>
  );
}