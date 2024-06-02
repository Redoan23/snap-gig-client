import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate/useAxiosPrivate";


const useAllUserData = () => {

    const axiosPrivate = useAxiosPrivate()
    const { data: allUserData, refetch } = useQuery({
        queryKey: ['allUserData'],
        queryFn: async () => {
            const res = await axiosPrivate.get('/users')
            return res.data
        }

    })

    return [allUserData, refetch]


};

export default useAllUserData;