'use client'
import CollegeIntro from "@/components/collegeIntro";
import Enterence from "@/components/enterence"
import { FacultyMarquee } from "@/components/facultyMarquee";
import { ImportantLinks } from "@/components/importantLinks";
import { Mentors } from "@/components/mentors";
import { NonTeachingStaff } from "@/components/nonTeachingStaff";
import Updates from "@/components/updates";
import PrincipalBrief from "@/components/principalBrief";



export default function Home() {


  return (
    <div className="mainContainer pb-10">
      <Enterence />
      <CollegeIntro />
      <PrincipalBrief />
      <Updates />
      <ImportantLinks />
      <Mentors />
      <FacultyMarquee />
      <NonTeachingStaff />
    </div>
  );
}
