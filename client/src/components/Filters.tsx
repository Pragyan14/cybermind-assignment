"use client";

import { Search, MapPin, Briefcase, ChevronDown } from "lucide-react"
import { RangeSlider } from "@mantine/core"
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import { useJobStore } from "@/store/jobStore";
import { useEffect } from "react";

export default function Filters() {

  const { getJobs } = useJobStore();

  const [salaryMin, setSalaryMin] = useQueryState('salaryMin', parseAsInteger);
  const [salaryMax, setSalaryMax] = useQueryState('salaryMax', parseAsInteger);
  const [location, setLocation] = useQueryState('location')
  const [jobType, setJobType] = useQueryState('jobType', parseAsString.withOptions({shallow:false}))
  const [title, setTitle] = useQueryState('title')

  const jobTypes = [
  { label: "Full Time", value: "FULL_TIME" },
  { label: "Part Time", value: "PART_TIME" },
  { label: "Contract", value: "CONTRACT" },
  { label: "Internship", value: "INTERNSHIP" },
];

  useEffect(() => {
    const filters: Record<string, string | number> = {};
    if (title) filters.title = title;
    if (jobType) filters.jobType = jobType;
    if (location) filters.location = location;
    if (salaryMin !== null) filters.salaryMin = salaryMin*1000;
    if (salaryMax !== null) filters.salaryMax = salaryMax*1000;
    
    getJobs(filters);
  }, [title, jobType, location, salaryMin, salaryMax, getJobs]);  
  

  return (
    <div className="w-full">
      <div className="w-ful max-w-9/10 mx-auto">
        <div className="bg-white py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 items-end">
            {/* Search Input */}
            <div className="lg:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search By Job Title, Role"
                  value={title || ''}
                  onChange={(e) => {setTitle(e.target.value || null)}}
                  className="w-full pl-10 pr-4 py-3 border-r border-gray-200 text-sm"
                />
              </div>
            </div>

            {/* Location Input */}
            <div className="lg:col-span-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Preferred Location"
                  value={location || ''}
                  onChange={(e) => {setLocation(e.target.value || null)}}
                  className="w-full pl-10 pr-4 py-3 border-r border-gray-200 text-sm"
                />
              </div>
            </div>

            {/* Job Type Dropdown */}
            <div className="lg:col-span-1">
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={jobType || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setJobType(value === '' ? null : value);
                  }}
                  className="w-full pl-10 pr-10 py-3 border-r border-gray-200 text-sm appearance-none bg-white"
                >
                  <option value="">Job type</option>
                  {jobTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
              </div>
            </div>

            {/* Salary Range Slider */}
            <div className="lg:col-span-1 px-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-medium text-gray-700">
                  <span>Salary Per Month</span>
                  <span>
                    ₹{salaryMin || 10}k - ₹{salaryMax || 30}k
                  </span>
                </div>
                <div className="px-2">
                  <RangeSlider
                    value={[salaryMin || 10, salaryMax || 30]}
                    onChange={([min, max]) => {
                      setSalaryMin(min);
                      setSalaryMax(max);
                    }}
                    min={10}
                    max={100}
                    step={5}
                    color="black"
                    size="sm"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
