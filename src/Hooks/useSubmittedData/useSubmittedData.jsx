
import useAxiosPrivate from '../useAxiosPrivate/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../useAuth';

const useSubmittedData = () => {

    const axiosPrivate = useAxiosPrivate()
    const { user } = useAuth()

    const { data: submittedData = [], refetch } = useQuery({
        queryKey: ['submissionData'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/totalSubmission/${user.email}`)
            return res.data
        }
    })

    return [submittedData, refetch]
};

export default useSubmittedData;