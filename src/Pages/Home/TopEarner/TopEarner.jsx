import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const TopEarner = () => {

    const axiosPublic = useAxiosPublic()
    const { data = [] } = useQuery({
        queryKey: ['topEarners'],
        queryFn: async () => {
            
        }
    })

    return (
        <div>

        </div>
    );
};

export default TopEarner;