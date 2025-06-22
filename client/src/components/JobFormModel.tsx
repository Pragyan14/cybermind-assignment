"use client";

import { X } from "lucide-react";
import Input from "./ui/Input";
import Label from "./ui/Label";
import { useState } from "react";
import { useJobStore } from "@/store/jobStore";
import toast, { Toaster } from 'react-hot-toast';

export enum JobType {
    FULL_TIME = "FULL_TIME",
    PART_TIME = "PART_TIME",
    CONTRACT = "CONTRACT",
    INTERNSHIP = "INTERNSHIP"
}

export default function JobFormModal({ onClose }: { onClose: () => void }) {

    const { addJobs } = useJobStore();

    const [formData, setFormData] = useState<{
        jobTitle: string;
        companyName: string;
        location: string;
        jobType: JobType | "FULL_TIME";
        salaryMin: string;
        salaryMax: string;
        applicationDeadline: string;
        jobDescription: string;
    }>({
        jobTitle: "",
        companyName: "",
        location: "",
        jobType: "FULL_TIME",
        salaryMin: "",
        salaryMax: "",
        applicationDeadline: "",
        jobDescription: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const jobData = {
            title: formData.jobTitle,
            companyName: formData.companyName,
            location: formData.location,
            jobType: formData.jobType as "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP",
            salaryMin: Number(formData.salaryMin),
            salaryMax: Number(formData.salaryMax),
            applicationDeadline: new Date(formData.applicationDeadline).toISOString(),
            description: formData.jobDescription,
            requirements: "Node.js, PostgreSQL, Docker, Microservices.",
            responsibilities: "Design APIs, integrate databases, and optimize performance."
        }
        try {
            await addJobs(jobData);
            toast.success("Job added successfully");
            onClose();
        } catch (error) {
            console.log(error);
            toast.error("Failed to add job");
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative">
                <form onSubmit={handleSubmit}>
                    <button onClick={onClose} className="absolute top-2 right-2 cursor-pointer hover:scale-125"><X /></button>
                    <h2 className="text-xl font-semibold mb-4 text-center">Create Job Opening</h2>
                    <div className="space-y-6 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label label="Title" htmlFor="jobTitle" />
                                <Input
                                    id="jobTitle"
                                    placeholder="Full Stack Developer"
                                    value={formData.jobTitle}
                                    onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label label="Company Name" htmlFor="companyName" />
                                <Input
                                    id="companyName"
                                    placeholder="Amazon, Microsoft, Swiggy"
                                    value={formData.companyName}
                                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* location and job type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                            <Label label="Location" htmlFor="location" />
                            <Input
                                id="location"
                                placeholder="Preferred Location"
                                value={formData.location}
                                onChange={(e) => handleInputChange("location", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label label="Job Type" htmlFor="jobType" />
                            <select
                                id="jobType"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 text-sm"
                                value={formData.jobType}
                                onChange={(e) => handleInputChange("jobType", e.target.value)}
                            >
                                <option value="FULL_TIME" >FullTime</option>
                                <option value="PART_TIME">PartTime</option>
                                <option value="CONTRACT">Contract</option>
                                <option value="INTERNSHIP">Internship</option>
                            </select>
                        </div>
                    </div>

                    {/* Salary Range and Application Deadline */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                            <Label label="Salary Range (in Thousands)" />
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                                    <Input
                                        placeholder="40000"
                                        type="number"
                                        className="pl-8"
                                        value={formData.salaryMin}
                                        onChange={(e) => handleInputChange("salaryMin", e.target.value)}
                                    />
                                </div>
                                <div className="relative flex-1">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                                    <Input
                                        placeholder="50000"
                                        className="pl-8"
                                        type="number"
                                        value={formData.salaryMax}
                                        onChange={(e) => handleInputChange("salaryMax", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="applicationDeadline" label="Application Deadline" />
                            <div className="relative">
                                <Input
                                    id="applicationDeadline"
                                    value={formData.applicationDeadline}
                                    onChange={(e) => handleInputChange("applicationDeadline", e.target.value)}
                                    type="date"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="space-y-2 mb-4">
                        <Label htmlFor="jobDescription" label="Job Description" />
                        <textarea
                            id="jobDescription"
                            value={formData.jobDescription}
                            onChange={(e) => handleInputChange("jobDescription", e.target.value)}
                            placeholder="Please share a description to let the candidate know more about the job role"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 text-sm min-h-[120px]"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between pt-4">
                        <button
                            className="w-40 cursor-pointer px-4 py-2 rounded-md font-medium text-sm transition-colors duration-300 ease-in-out border-2 border-black text-black hover:bg-black hover:text-white">
                            Save Draft ↓
                        </button>
                        <input
                            type="submit"
                            value={"Publish →"}
                            className="w-40 cursor-pointer px-4 py-2 rounded-md font-medium text-sm transition-colors duration-300 ease-in-out bg-[#00AAFF] text-white hover:bg-[#00AAFF]/90"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
