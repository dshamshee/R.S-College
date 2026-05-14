// @/components/customeLayout.tsx
import Image from "next/image";

export const CustomLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="customLayoutContainer w-full min-h-screen bg-background">
            <div className="headImage relative w-full h-[300px] md:h-[450px]">
                <Image 
                    src="/images/Enterence.png" 
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