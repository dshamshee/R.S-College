"use client";

import { CustomLayout } from "@/components/customeLayout";
import { useState } from "react";
import Image from "next/image";
import { 
  Camera, 
  Maximize2, 
  X, 
  Filter,
  Image as ImageIcon
} from "lucide-react";

// Demo Data for Gallery
const photos = [
  { id: 1, src: "/images/campus-1.jpg", category: "Campus", title: "Main Administrative Block" },
  { id: 2, src: "/images/event-1.jpg", category: "Events", title: "Annual Cultural Fest 2025" },
  { id: 3, src: "/images/sports-1.jpg", category: "Sports", title: "Inter-College Cricket Final" },
  { id: 4, src: "/images/lab-1.jpg", category: "Campus", title: "Advanced Chemistry Lab" },
  { id: 5, src: "/images/event-2.jpg", category: "Events", title: "Seminar on Digital Innovation" },
  { id: 6, src: "/images/campus-2.jpg", category: "Campus", title: "College Library Wing" },
];

const categories = ["All", "Campus", "Events", "Sports"];

export default function PhotoGallery() {
  const [filter, setFilter] = useState("All");
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const filteredPhotos = filter === "All" 
    ? photos 
    : photos.filter(p => p.category === filter);

  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-16">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl text-blue-600 mb-4">
            <Camera size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4 tracking-tight">Visual Journey</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            A glimpse into the vibrant life at <strong>Ramdev Sharda College</strong>. 
            From academic milestones to sporting triumphs and campus beauty.
          </p>
        </div>

        {/* Filter Navigation - Scrollable on Mobile */}
        <div className="flex items-center justify-start md:justify-center gap-2 mb-12 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  filter === cat 
                  ? "bg-white text-blue-900 shadow-sm" 
                  : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div 
              key={photo.id}
              className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-200 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              onClick={() => setSelectedImg(photo.src)}
            >
              <Image 
                src={photo.src} 
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-1">{photo.category}</p>
                <h3 className="text-white font-bold text-lg leading-tight">{photo.title}</h3>
                <div className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
                  <Maximize2 size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox / Fullscreen Preview */}
        {selectedImg && (
          <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-lg flex items-center justify-center p-4 md:p-12">
            <button 
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 md:top-12 md:right-12 text-white/50 hover:text-white transition-colors"
            >
              <X size={40} />
            </button>
            <div className="relative w-full max-w-5xl aspect-video md:aspect-auto md:h-[80vh]">
              <Image 
                src={selectedImg} 
                alt="Enlarged view" 
                fill
                className="object-contain rounded-2xl"
              />
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-20 flex flex-col items-center">
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4 max-w-md">
            <ImageIcon className="text-blue-400" size={24} />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Images shown are property of R.S. College. Unauthorized reproduction 
              of media files is strictly prohibited under institutional guidelines.
            </p>
          </div>
        </div>
      </div>
    </CustomLayout>
  );
}