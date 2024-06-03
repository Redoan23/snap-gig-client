import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate/useAxiosPrivate";
import useAuth from "../useAuth";

const axiosPrivate = useAxiosPrivate()

const useTaskCreatorTasks = () => {
    const { user } = useAuth()
    const email = user?.email

    const { data: taskCreatorTasks=[], refetch, isLoading } = useQuery({
        queryKey: ['taskCreatorTasks'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/taskCreatorTasks/${email}`)
            return res.data
        }
    })

    return [taskCreatorTasks, refetch, isLoading]
};

export default useTaskCreatorTasks;