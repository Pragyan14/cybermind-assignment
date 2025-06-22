import axios from 'axios';
import { create } from 'zustand'

type Job = {
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
    createdAt: string
};

type JobFilters = {
    title?: string;
    location?: string;
    jobType?: Job['jobType'];
    salaryMin?: number;
    salaryMax?: number;
};

type JobStore = {
    jobs: Job[];
    error: string | null;
    isLoading: boolean;
    hasFetched: boolean;

    getJobs: (filters?: JobFilters) => Promise<boolean>;
}

export const useJobStore = create<JobStore>((set) => ({
    jobs: [],
    error: null,
    isLoading: false,
    hasFetched: false,

    getJobs: async (filters = {}) => {
        try {
            const query = new URLSearchParams(filters as any).toString();
            const res = await axios.get(`http://localhost:5000/api/jobs?${query}`);
            set({ jobs: res.data, error: null, hasFetched: true })
            return true;
        } catch (error) {
            set({ error: 'Failed to fetch jobs' });
            return false;
        }
    }
}))
