import Image from "next/image"
import { Card } from "./ui/card"

export const Mentors = () => {
  const mentors = [
    {
      name: "Lt Gen Syed Ata Hasnain (Retd.)",
      image: "/images/governor.avif",
      designation: "Hon'ble Chancellor-cum-Governor of Bihar"
    },
    {
      name: "Samrat Chaudhary",
      image: "/images/samrat-chaudhary.jpeg",
      designation: "Hon'ble Chief Minister, Bihar"
    },
    {
      name: "Sanjay Kumar",
      image: "/images/demouser.jpg",
      designation: "Principal"
    },
    // {
    //   name: "Rajesh Kumar",
    //   image: "/images/anant.png",
    //   designation: "Professor"
    // }
  ]

  return (
    <div className="MentorsContainer mt-10 flex flex-col items-center justify-center bg-slate-50 py-12 px-4 md:px-16">
      
      {/* Dynamic Heading with Responsive Lines */}
      <div className="flex items-center justify-center gap-4 md:gap-8 mb-12 w-full max-w-7xl">
        <hr className="flex-grow border-t-2 border-blue-900 opacity-20" />
        <h1 className="text-2xl md:text-3xl text-blue-900 font-bold whitespace-nowrap tracking-tight">
          Our Mentors
        </h1>
        <hr className="flex-grow border-t-2 border-blue-900 opacity-20" />
      </div>

      {/* Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
      <div className="mentorsGrid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {mentors.map((mentor, index) => (
          <Card 
            className="mentorCard group w-[400px] h-[400px] overflow-hidden rounded-2xl border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white" 
            key={index}
          >
            {/* Aspect ratio wrapper prevents layout shift */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <Image 
                src={mentor.image} 
                alt={mentor.name} 
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-center text-lg font-bold text-slate-800 leading-tight">
                {mentor.name}
              </h2>
              <p className="text-center text-xs font-semibold text-blue-600 uppercase tracking-widest mt-2">
                {mentor.designation}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}