"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Maximize2, 
  X, 
} from "lucide-react";

interface Photo {
  id: number;
  src: string;
  category: string;
  title: string;
}

const categories = ["All", "Campus", "Events", "Sports"];

export default function PhotoGalleryClient({ photos }: { photos: Photo[] }) {
  const [filter, setFilter] = useState("All");
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const filteredPhotos = filter === "All" 
    ? photos 
    : photos.filter(p => p.category === filter);

  return (
    <>
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
              src={encodeURI(photo.src)} 
              alt={photo.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div className="p-3 bg-white/25 backdrop-blur-md rounded-full text-white scale-90 group-hover:scale-100 transition-transform duration-500">
                <Maximize2 size={24} />
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
              src={encodeURI(selectedImg)} 
              alt="Enlarged view" 
              fill
              className="object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
