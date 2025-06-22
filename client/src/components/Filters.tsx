"use client";

import { useState } from "react"
import { Search, MapPin, Briefcase, ChevronDown } from "lucide-react"
import { RangeSlider } from "@mantine/core"
import { useQueryState } from "nuqs";

export default function Filters() {
  const [salaryRange, setSalaryRange] = useState<[number, number]>([10, 30])
  const [location, setLocation] = useQueryState('location')
  const [jobType, setJobType] = useQueryState('jobType')
  const [title, setTitle] = useQueryState('title')

  const jobTypes = ["Full Time", "Part Time", "Contract", "Internship"]

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
                  onChange={(e) => {
                    const value = e.target.value;
                    setTitle(value === '' ? null : value);
                  }}
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
                  onChange={(e) => {
                    const value = e.target.value;
                    setLocation(value === '' ? null : value);
                  }}
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
                    <option key={type} value={type}>
                      {type}
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
                    ₹{salaryRange[0]}k - ₹{salaryRange[1]}k
                  </span>
                </div>
                <div className="px-2">
                  <RangeSlider
                    value={salaryRange}
                    onChange={setSalaryRange}
                    min={5}
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
