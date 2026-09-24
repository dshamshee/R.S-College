"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Maximize2, 
  X, 
  Film,
  Play
} from "lucide-react";

export interface GalleryMediaItem {
  _id?: string;
  id?: number | string;
  title?: string;
  description?: string;
  types?: "EVENT" | "FESTIVAL" | "ACADEMIC" | "OTHER" | string;
  image?: string | null;
  video?: string | null;
  src?: string; // fallback for static items
  category?: string;
}

const categories = ["ALL", "EVENT", "FESTIVAL", "ACADEMIC", "OTHER"];

export default function PhotoGalleryClient({ items }: { items: GalleryMediaItem[] }) {
  const [filter, setFilter] = useState("ALL");
  const [selectedMedia, setSelectedMedia] = useState<{ src: string; isVideo: boolean; title?: string } | null>(null);

  const filteredItems = filter === "ALL" 
    ? items 
    : items.filter(item => {
        const itemType = (item.types || item.category || "").toUpperCase();
        return itemType === filter;
      });

  return (
    <>
      {/* Filter Navigation - Scrollable on Mobile */}
      <div className="flex items-center justify-start md:justify-center gap-2 mb-12 overflow-x-auto pb-4 no-scrollbar">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                filter === cat 
                ? "bg-blue-950 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 text-slate-400 bg-slate-50 rounded-3xl border border-slate-100">
          <p className="text-base font-semibold">No media items found for &quot;{filter}&quot;.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((media, idx) => {
            const mediaSrc = media.image || media.src;
            const isVideo = Boolean(media.video);
            const mediaTypeTag = (media.types || media.category || "GALLERY").toUpperCase();

            return (
              <div 
                key={media._id || media.id || idx}
                className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-900 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                onClick={() => {
                  if (isVideo && media.video) {
                    setSelectedMedia({ src: media.video, isVideo: true, title: media.title });
                  } else if (mediaSrc) {
                    setSelectedMedia({ src: mediaSrc, isVideo: false, title: media.title });
                  }
                }}
              >
                {mediaSrc ? (
                  <Image 
                    src={encodeURI(mediaSrc)} 
                    alt={media.title || "Gallery image"}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : isVideo && media.video ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-slate-900">
                    <video src={media.video} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white">
                        <Play size={28} className="ml-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    No Media
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-extrabold rounded-lg uppercase tracking-wider">
                  {mediaTypeTag}
                </div>

                {/* Title Overlay */}
                {media.title && (
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                    <p className="text-xs font-bold truncate">{media.title}</p>
                  </div>
                )}

                {/* Hover Overlay Icon */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="p-3 bg-white/25 backdrop-blur-md rounded-full text-white scale-90 group-hover:scale-100 transition-transform duration-500">
                    {isVideo ? <Film size={24} /> : <Maximize2 size={24} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox / Fullscreen Preview */}
      {selectedMedia && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-lg flex flex-col items-center justify-center p-4 md:p-12">
          <button 
            onClick={() => setSelectedMedia(null)}
            className="absolute top-6 right-6 md:top-12 md:right-12 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X size={36} />
          </button>

          {selectedMedia.title && (
            <p className="text-white text-base font-bold mb-4 text-center max-w-xl">
              {selectedMedia.title}
            </p>
          )}

          <div className="relative w-full max-w-5xl aspect-video md:aspect-auto md:h-[80vh] flex items-center justify-center">
            {selectedMedia.isVideo ? (
              <video 
                src={selectedMedia.src} 
                controls 
                autoPlay 
                className="max-w-full max-h-full rounded-2xl shadow-2xl"
              />
            ) : (
              <Image 
                src={encodeURI(selectedMedia.src)} 
                alt="Enlarged view" 
                fill
                className="object-contain rounded-2xl"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
