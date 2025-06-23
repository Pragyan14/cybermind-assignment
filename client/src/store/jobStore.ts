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

type CreateJobInput = Omit<Job, 'id' | 'createdAt'>;

type JobStore = {
    jobs: Job[];
    error: string | null;
    isLoading: boolean;
    hasFetched: boolean;

    getJobs: (filters?: JobFilters) => Promise<boolean>;
    addJobs: (job: CreateJobInput) => Promise<boolean>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const useJobStore = create<JobStore>((set) => ({
    jobs: [],
    error: null,
    isLoading: false,
    hasFetched: false,

    getJobs: async (filters?: JobFilters) => {
        try {
            const query = new URLSearchParams(
                Object.entries(filters || {})
                    .filter(([, value]) => value !== undefined && value !== '')
                    .map(([key, value]) => [key, String(value)])
            ).toString();
            const res = await axios.get(`${API_BASE_URL}/jobs?${query}`);
            set({ jobs: res.data, error: null, hasFetched: true })
            return true;
        } catch  {
            set({ error: "Failed to fetch job", jobs: [], hasFetched: true });
            return false;
        }
    },

    addJobs: async (job: CreateJobInput) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/jobs`, job);
            set((state) => ({
                jobs: [res.data, ...state.jobs],
                error: null,
            }));
            return true;
        } catch {
            const message ='Failed to add job';
            set({ error: message });
            throw new Error(message);
        }
    }
}))
