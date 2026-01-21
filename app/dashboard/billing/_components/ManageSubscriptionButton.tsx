"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

export default function ManageSubscriptionButton() {
    const [loading, setLoading] = useState(false);

    const handleManageSubscription = async () => {
        setLoading(true);
        try {
            const result = await axios.post('/api/stripe/create-portal');
            if (result.data?.url) {
                window.location.href = result.data.url;
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load billing portal. You might not have an active subscription yet.")
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            onClick={handleManageSubscription}
            className="w-full bg-white hover:bg-gray-200 text-black font-semibold mt-2"
            disabled={loading}
        >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Manage Subscription
        </Button>
    )
}
