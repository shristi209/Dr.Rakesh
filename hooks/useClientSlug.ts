"use client"
import { useParams } from 'next/navigation';

export const useClientSlug = () => {
    const params = useParams();
    return params?.slug as string | undefined;
};