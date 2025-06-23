'use client'
import { useJobStore } from "@/store/jobStore";
import { getTimeAgo } from "@/utils/getTimeAgo";
import { Building, Layers, Trash, UserPlus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export type Job = {
    id: number;
    title: string;
    companyName: string;
    location: string;
    jobType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';
    salaryMin: number;
    salaryMax: number;
    description: string;
    requirements: string;
    responsibilities: string;
    applicationDeadline: string;
    createdAt: string;
};

type Props = {
    job: Job;
};

function JobCard({ job }: Props) {

    const {deleteJob, error} = useJobStore();

    const handleDelete = async (id: number) => {
        try{
            await deleteJob(id);
            toast.success("Job deleted successfully");
        }catch(error){
            console.log(error);
            toast.error("Failed to add job");
        }
    }

    return (
        <div className="bg-white p-4 shadow rounded-xl">
            <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-gray-500 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-xs text-white mt-1 text-center">
                        {job.companyName}
                    </span>
                </div>
                <div className="bg-[#B0D9FF] text-black py-2 px-3 rounded-lg text-sm font-medium">{getTimeAgo(job.createdAt)}</div>
            </div>

            {/* Job Title */}
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{job.title}</h3>

            {/* Job Details */}
            <div className="flex items-center gap-6 mb-4 text-sm text-[#5A5A5A]">
                <div className="flex items-center gap-1">
                    <UserPlus className="w-5 h-5" />
                    <span>1-3 yr Exp</span>
                </div>
                <div className="flex items-center gap-1">
                    <Building className="w-5 h-5" />
                    <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Layers className="w-5 h-5" />
                    <span>12LPA</span>
                </div>
            </div>

            {/* Description */}
            <div className="mb-4 text-md">
                {job.description}
            </div>

            {/* Apply Button */}
            <div className="flex flex-row gap-2">
                <button className="basis-3/4 bg-[#00AAFF] hover:bg-[#00AAFF]/90 text-white py-3 rounded-xl cursor-pointer">
                    Apply Now
                </button>
                <button
                    value={job.id}
                    onClick={() => {handleDelete(job.id)}}
                    className="basis-1/4 flex justify-center bg-[#FF4D4F] hover:bg-[#FF4D4F]/90 text-white py-3 rounded-xl cursor-pointer"
                >
                    <Trash />
                </button>
            </div>
        </div>
    )
}

export default JobCard
