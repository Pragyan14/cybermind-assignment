'use client'

import { useJobStore } from "@/store/jobStore"
import JobCard from "./ui/JobCard"
import { Loader } from "lucide-react";

function JobCardSection() {

    const { jobs,hasFetched } = useJobStore();

    if (!hasFetched) return <Loader className="animate-spin mx-auto mt-32" />


    return (
        <div className="bg-[#FBFBFF] py-6">
            <div className="max-w-9/10 mx-auto w-full px-2">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                    {jobs.length !== 0 ? (
                        jobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))
                    ) : (
                        <div className="col-span-full flex justify-center items-center py-16">
                            <p className="text-gray-500 text-center text-lg">
                                No job found.
                            </p>
                        </div>
                    )
                    }

                </div>
            </div>
        </div>
    )
}

export default JobCardSection
