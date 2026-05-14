'use client'
import CollegeIntro from "@/components/collegeIntro";
import Enterence from "@/components/enterence"
import Updates from "@/components/updates";



export default function Home() {


  return (
    <div className="mainContainer pb-10">
      <Enterence />
      <CollegeIntro />
      <Updates />
    </div>
  );
}
