"use client"
import { ProjectType } from "@/type/types";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useProjectList = () => {
    const { user, isLoaded } = useUser();
    const [projectList, setProjectList] = useState<ProjectType[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoaded && user) {
            getProjectList();
        }
    }, [isLoaded, user]);

    const getProjectList = async () => {
        setLoading(true);
        try {
            const result = await axios.get('/api/project');
            setProjectList(Array.isArray(result.data) ? result.data : []);
        } catch (error) {
            console.error("Failed to fetch project list:", error);
            toast.error("Failed to load projects. Please try again.");
            setProjectList([]);
        } finally {
            setLoading(false);
        }
    }

    return {
        projectList,
        loading,
        refreshProjects: getProjectList
    };
}
