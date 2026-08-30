"use client";

import { useState } from "react";
import { 
  Play,  
  Calendar, 
  X,
} from "lucide-react";
import { BsYoutube } from "react-icons/bs";

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  category: string;
  duration: string;
  date: string;
}

export default function VideoGalleryClient({ videoData }: { videoData: VideoItem[] }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {videoData?.map((video) => (
          <div 
            key={video.id}
            className="group relative flex flex-col bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            {/* Thumbnail Container */}
            <div 
              className="relative aspect-video w-full overflow-hidden cursor-pointer"
              onClick={() => setActiveVideo(video.url)}
            >
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-100 group-hover:bg-black/40 transition-colors">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play fill="currentColor" size={24} className="ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>

            {/* Video Info */}
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 text-red-600 text-[10px] font-bold uppercase tracking-widest mb-3">
                <BsYoutube size={14} /> {video.category}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-blue-900 transition-colors">
                {video.title}
              </h3>
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {video.date}
                </div>
                <button 
                  onClick={() => setActiveVideo(video.url)}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Lightbox (Modal) */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-xl flex items-center justify-center p-4">
          <button 
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
          >
            <X size={40} />
          </button>
          
          <div className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              src={activeVideo}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
