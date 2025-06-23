'use client'

import Filters from "@/components/Filters";
import JobCardSection from "@/components/JobCardSection";
import JobFormModal from "@/components/JobFormModel";
import Navbar from "@/components/Navbar";
import { Suspense, useState } from "react";


function HomeContent() {

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Navbar onCreateJob={() => setShowForm(true)} />

      <Suspense fallback={<div>Loading Filters...</div>}>
        <Filters />

      </Suspense>


      <JobCardSection />

      {showForm && <JobFormModal onClose={() => setShowForm(false)} />}
    </>
  )
}

export default HomeContent
