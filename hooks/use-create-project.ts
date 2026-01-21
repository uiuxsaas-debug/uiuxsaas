"use client"
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useCreateProject = () => {
    const { user } = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const createProject = async (userInput: string, device: string) => {
        if (!user) {
            router.push('/sign-in');
            return;
        }

        if (!userInput) {
            toast.warning("Please enter a description for your project.");
            return;
        }

        try {
            setLoading(true);
            const projectId = crypto.randomUUID();
            const result = await axios.post('/api/project', {
                userInput,
                device,
                projectId
            });

            if (result.data?.msg === 'Limit Exceed') {
                toast.error('Already reached 2 project limit!');
                return;
            }

            // toast.success("Project created successfully!");
            router.push('/project/' + projectId);
        } catch (error: any) {
            console.error("Failed to create project:", error);
            // Check for specific server-side limits/errors
            if (error.response?.data?.details) {
                toast.error(error.response.data.details);
            } else if (error.response?.data?.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Failed to create project. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        createProject,
        loading
    };
}
