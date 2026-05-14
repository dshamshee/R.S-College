import Image from "next/image"
import { Card } from "./ui/card"

export const Mentors = ()=>{

    const mentors = [
        {
            name: "Aditya Suman",
            image: "/images/samrat-chaudhary.jpeg",
            designation: "Director"
        },
        {
            name: "Amit Kumar",
            image: "/images/tejaswi.jpg",
            designation: "Deputy Director"
        },
        {
            name: "Sanjay Kumar",
            image: "/images/teju.jpg",
            designation: "Associate Professor"
        },
        {
            name: "Rajesh Kumar",
            image: "/images/anant.png",
            designation: "Professor"
        }
    ]

    return(
        <div className="MentorsContainer mt-10 flex flex-col items-center justify-center bg-gray-400/20 p-5">
            <div className="flex items-center justify-center gap-8 mb-12">
                  <hr className="hidden md:block w-24 border-t-2 border-blue-900" />
                  <h1 className="text-2xl text-blue-900 font-bold whitespace-nowrap">
                      Our Mentors
                  </h1>
                  <hr className="hidden md:block w-24 border-t-2 border-blue-900" />
              </div>

            <div className="mentorsGrid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {
                    mentors.map((mentor, index)=>{
                        return(
                            <Card className="mentorCard rounded-md w-[300px] h-[300px]  bg-background" key={index}>
                                <Image src={mentor.image} alt={mentor.name} width={300} height={200} className="w-[300px] h-[200px] object-contain rounded-md" />
                                <div className="flex flex-col items-center justify-center">
                                <h2 className="text-center text-xl font-bold">{mentor.name}</h2>
                                <p className="text-center text-sm text-gray-500">{mentor.designation}</p>
                                </div>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}