import Filters from "@/components/Filters";
import JobCardSection from "@/components/JobCardSection";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <>

      <Navbar />

      <Filters />
      
      <JobCardSection/>

    </>
  )
}
