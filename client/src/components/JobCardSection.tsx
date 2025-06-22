'use client'

import { useJobStore } from "@/store/jobStore"
import JobCard, { Job } from "./JobCard"
import { useEffect } from "react";
import { Loader } from "lucide-react";

function JobCardSection() {

    const { jobs, error, isLoading, getJobs, hasFetched } = useJobStore();

    useEffect(() => {
        getJobs();
    }, [getJobs])

    console.log(jobs);

    if(!hasFetched) return <Loader className="animate-spin mx-auto mt-32" />


    return (
        <div className="bg-[#FBFBFF] py-6">
            <div className="max-w-9/10 mx-auto w-full px-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {jobs.length !== 0 ? (
                        jobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-8">
                            No Job yet. Add one above!
                        </p>
                    )
                    }

                </div>
            </div>
        </div>
    )
}

export default JobCardSection
