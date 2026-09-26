import { CustomLayout } from "@/components/customeLayout";
import type { Metadata } from "next";
import VideoGalleryClient from "@/components/VideoGalleryClient";
import { 
  Video, 
  Clapperboard
} from "lucide-react";

export const metadata: Metadata = {
  title: "Video Gallery",
  description: "Watch videos from Ramdeo Sharda College – campus events, guest lectures, cultural programs, and student activities. Subscribe to our channel for updates.",
  openGraph: {
    title: "Video Gallery – Ramdeo Sharda College",
    description: "Experience campus life through our video collection – events, lectures, and student activities at RDS College, Salmari.",
  },
};

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  category: string;
  duration: string;
  date: string;
}

// Demo Data for Videos
const videoData: VideoItem[] = [
  // {
  //   id: "1",
  //   title: "Annual Day Celebrations 2025",
  //   thumbnail: "https://images.unsplash.com/photo-1514525253361-bee8a4874093?auto=format&fit=crop&q=80",
  //   url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual YouTube embed URL
  //   category: "Events",
  //   duration: "12:45",
  //   date: "Feb 15, 2025"
  // },
];

export default function VideoGallery() {
  return (
    <CustomLayout headerImage="infrastructure.jpg">
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

        {/* Interactive Video Gallery (Client Component) */}
        <VideoGalleryClient videoData={videoData} />

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