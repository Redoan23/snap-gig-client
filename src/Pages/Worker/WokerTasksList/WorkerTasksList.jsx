import React from 'react';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import { BsWallet2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const WorkerTasksList = () => {

    const axiosPrivate = useAxiosPrivate()
    const { data: taskList = [], refetch } = useQuery({
        queryKey: ['taskList'],
        queryFn: async () => {
            const res = await axiosPrivate.get('/worker/tasks/available')
            return res.data
        }
    })

    return (
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10'>
            {
                taskList.map(task =>
                    <div key={task._id} >
                        <div className="card w-80 rounded-none bg-base-100 shadow-xl border py-3">
                            <figure><BsWallet2 size={60} color='#007BFF' /></figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{task.taskTitle}</h2>
                                <p>{task.creatorName}</p>
                                <p>{task.completionDate}</p>
                                <p>{task.payableAmount}</p>
                                <p>{task.taskQuantity}</p>
                            </div>
                            <div className=' card-actions'>
                                <Link to={`/dashboard/taskDetails/${task._id}`} className=' btn btn-sm'>View Details</Link >
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default WorkerTasksList;