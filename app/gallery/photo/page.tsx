import { CustomLayout } from "@/components/customeLayout";
import PhotoGalleryClient from "@/components/PhotoGalleryClient";
import { 
  Camera, 
  Image as ImageIcon
} from "lucide-react";

// Real Data for Gallery from public/images/gallery
const photos = [
  { id: 1, src: "/images/gallery/1.jpeg", category: "Campus", title: "College Main Building Entrance" },
  { id: 2, src: "/images/gallery/2.jpeg", category: "Campus", title: "Academic Block and Courtyard" },
  { id: 3, src: "/images/gallery/3.jpeg", category: "Events", title: "Institutional Celebrations" },
  { id: 4, src: "/images/gallery/4.jpeg", category: "Campus", title: "Lush Green Campus Environment" },
  { id: 5, src: "/images/gallery/5.jpeg", category: "Events", title: "College Seminar Hall Event" },
  { id: 6, src: "/images/gallery/6.jpeg", category: "Sports", title: "Annual Athletic Meet" },
  { id: 7, src: "/images/gallery/7.jpeg", category: "Campus", title: "Students Group in Campus" },
  { id: 8, src: "/images/gallery/8.jpeg", category: "Campus", title: "Main College Gate" },
  { id: 9, src: "/images/gallery/9.jpeg", category: "Campus", title: "Classroom Corridor" },
  { id: 10, src: "/images/gallery/10.jpeg", category: "Events", title: "Cultural Festival Dance" },
  { id: 11, src: "/images/gallery/11.jpeg", category: "Sports", title: "Football Match Group" },
  { id: 12, src: "/images/gallery/12.jpeg", category: "Sports", title: "Inter-College Cricket Tournament" },
  { id: 13, src: "/images/gallery/13.jpeg", category: "Campus", title: "College Gardens Lawn View" },
  { id: 14, src: "/images/gallery/14.jpeg", category: "Campus", title: "Students Interactive Zone" },
  { id: 15, src: "/images/gallery/15.jpeg", category: "Events", title: "Guest Lecture Series" },
  { id: 16, src: "/images/gallery/16.jpeg", category: "Sports", title: "Kabaddi Matches" },
  { id: 17, src: "/images/gallery/17.jpeg", category: "Sports", title: "Volleyball Tournament Matches" },
  { id: 18, src: "/images/gallery/18.jpeg", category: "Events", title: "NSS Camp In Action" },
  { id: 19, src: "/images/gallery/19.jpeg", category: "Events", title: "NSS Volunteer Activities" },
  { id: 20, src: "/images/gallery/20.jpeg", category: "Campus", title: "Resource Center Desk" },
  { id: 21, src: "/images/gallery/21.jpeg", category: "Campus", title: "Central Library Reading Room" },
  { id: 22, src: "/images/gallery/22.jpeg", category: "Events", title: "Independence Day Flag Hoisting" },
  { id: 23, src: "/images/gallery/23.jpeg", category: "Campus", title: "Administrative Block Corridors" },
  { id: 24, src: "/images/gallery/24.jpeg", category: "Campus", title: "Administrative Wing" },
  { id: 25, src: "/images/gallery/25.jpeg", category: "Sports", title: "Indoor Sports Room" },
  { id: 26, src: "/images/gallery/26.jpeg", category: "Events", title: "Science Exhibition Presentation" },
  { id: 27, src: "/images/gallery/27.jpeg", category: "Campus", title: "College Parking Area" },
  { id: 28, src: "/images/gallery/28.jpeg", category: "Events", title: "Inauguration Ceremony" },
  { id: 29, src: "/images/gallery/29.jpeg", category: "Campus", title: "College Campus Pathway" },
  { id: 30, src: "/images/gallery/30.jpeg", category: "Campus", title: "Green Canopy Pathway" },
  { id: 31, src: "/images/gallery/31.jpeg", category: "Events", title: "Student Guidance Seminar" },
  { id: 32, src: "/images/gallery/32.jpeg", category: "Events", title: "Institutional Meeting" },
  { id: 33, src: "/images/gallery/33.jpeg", category: "Events", title: "Career Counseling Session" },
  { id: 34, src: "/images/gallery/34.jpeg", category: "Campus", title: "Physics Lab Facility" },
  { id: 35, src: "/images/gallery/35.jpeg", category: "Campus", title: "Computer Science Laboratory" },
  { id: 36, src: "/images/gallery/36.jpeg", category: "Sports", title: "Sports Complex Lawn" },
  { id: 37, src: "/images/gallery/37.jpeg", category: "Sports", title: "Badminton Tournament Finals" },
  { id: 38, src: "/images/gallery/38.jpeg", category: "Events", title: "Teacher Training Workshop" },
  { id: 39, src: "/images/gallery/39.jpeg", category: "Events", title: "Faculty Development Program" },
  { id: 40, src: "/images/gallery/40.jpeg", category: "Campus", title: "Garden Pathway Accent" },
  { id: 41, src: "/images/gallery/41.jpeg", category: "Campus", title: "Main Garden Lawn" }
];

export default function PhotoGallery() {
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
            From academic milestones to sporting triumphs and campus beauty.
          </p>
        </div>

        {/* Interactive Gallery (Client Component) */}
        <PhotoGalleryClient photos={photos} />

        {/* Footer Note */}
        <div className="mt-20 flex flex-col items-center">
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4 max-w-md">
            <ImageIcon className="text-blue-400" size={24} />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Images shown are property of R.D.S. College. Unauthorized reproduction 
              of media files is strictly prohibited under institutional guidelines.
            </p>
          </div>
        </div>
      </div>
    </CustomLayout>
  );
}