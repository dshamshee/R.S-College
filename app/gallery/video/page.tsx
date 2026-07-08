"use client";

import { CustomLayout } from "@/components/customeLayout";
import { useState } from "react";
import { 
  Play,  
  Video, 
  Calendar, 
  User, 
  X,
  Clapperboard
} from "lucide-react";
import { BsYoutube } from "react-icons/bs";

// Demo Data for Videos
const videoData = [
  // {
  //   id: "1",
  //   title: "Annual Day Celebrations 2025",
  //   thumbnail: "https://images.unsplash.com/photo-1514525253361-bee8a4874093?auto=format&fit=crop&q=80",
  //   url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual YouTube embed URL
  //   category: "Events",
  //   duration: "12:45",
  //   date: "Feb 15, 2025"
  // },
  // {
  //   id: "2",
  //   title: "A Glimpse of our Science Laboratories",
  //   thumbnail: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80",
  //   url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   category: "Campus Tour",
  //   duration: "05:20",
  //   date: "Jan 10, 2025"
  // },
  // {
  //   id: "3",
  //   title: "National Seminar on Digital India",
  //   thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80",
  //   url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   category: "Academic",
  //   duration: "45:00",
  //   date: "Dec 05, 2024"
  // },
  // {
  //   id: "4",
  //   title: "Sports Meet - Inter College Finals",
  //   thumbnail: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80",
  //   url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   category: "Sports",
  //   duration: "08:15",
  //   date: "Nov 20, 2024"
  // }
];

export default function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <CustomLayout>
      <div className="max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-16">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-red-50 rounded-2xl text-red-600 mb-4">
            <Clapperboard size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4 tracking-tight">Media Archive</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Experience life at <strong>Ramdev Sharda College</strong> through our video collection. 
            Watch highlights of campus events, guest lectures, and student activities.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {videoData.map((video) => (
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

        {/* Youtube Link Section */}
        <div className="mt-20 p-8 md:p-12 bg-slate-50 border border-slate-100 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm">
              <Video size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Subscribe to our Channel</h3>
              <p className="text-sm text-slate-500">Never miss a lecture or campus event update.</p>
            </div>
          </div>
          <button className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95">
            Visit YouTube
          </button>
        </div>
      </div>
    </CustomLayout>
  );
}