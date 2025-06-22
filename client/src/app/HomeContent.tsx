'use client'

import Filters from "@/components/Filters";
import JobCardSection from "@/components/JobCardSection";
import JobFormModal from "@/components/JobFormModel";
import Navbar from "@/components/Navbar";
import { useState } from "react";


function HomeContent() {

    const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Navbar onCreateJob={() => setShowForm(true)}/>

      <Filters />
      
      <JobCardSection/>

      {showForm && <JobFormModal onClose={() => setShowForm(false)} />}
    </>
  )
}

export default HomeContent
