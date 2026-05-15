"use client";
// @/components/customeLayout.tsx
import Image from "next/image";
import { usePathname } from "next/navigation";

export const CustomLayout = ({ children}: { children: React.ReactNode}) => {

    const pathname = usePathname();
    // console.log('pathname', pathname.split('/')[1]);

    const headerImage = pathname.split('/')[1] === 'about' ?
     'about-college.jpg' : pathname.split('/')[1] === 'infrastructure' ? 
     'infrastructure.jpg' : pathname.split('/')[1] === 'academics' ? 
     'academics.jpg' : pathname.split('/')[1] === 'gallery' ? 
     'infrastructure.jpg' : pathname.split('/')[1] === 'student-zone' ? 
     'student-zone' : 'student.jpg';

    return (
        <div className="customLayoutContainer w-full min-h-screen bg-background">
            <div className="headImage relative w-full h-[300px] md:h-[300px]">
                <Image 
                    src={`/images/${headerImage}`} 
                    alt="College Entrance" 
                    fill // Use fill for better responsiveness in Next.js
                    priority
                    className="object-cover" 
                />
                {/* Dark overlay to make text pop if you add a title over the image later */}
                <div className="absolute inset-0 bg-black/20" />
            </div>
            <main className="content">
                {children}
            </main>
        </div>
    )
}