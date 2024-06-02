import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../useAxiosPrivate/useAxiosPrivate';
import useAuth from '../useAuth';

const useUserData = () => {

    const axiosPrivate = useAxiosPrivate()
    const { user } = useAuth()
    const email = user?.email

    const { data: userData = [], refetch } = useQuery({
        queryKey: ['usersData', user?.email],
        queryFn: async () => {
            const result = await axiosPrivate.get(`/users/${email}`)
            return result.data
        }
    })
    return [userData, refetch]
};

export default useUserData;