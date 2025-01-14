import React from 'react';
import useTaskCreatorTasks from '../../../Hooks/useTaskCreatorTasks/useTaskCreatorTasks';
import { AiOutlineMinus } from 'react-icons/ai';
import { MdOutlineUpdate } from 'react-icons/md';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate/useAxiosPrivate';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useUserData from '../../../Hooks/useUserData/useUserData';

const MyTasks = () => {

    const [taskCreatorTasks, refetch] = useTaskCreatorTasks()
    const [, refetchUserData] = useUserData()
    const axiosPrivate = useAxiosPrivate()
    const { user } = useAuth()
    const email = user?.email

    const handleDeleteTask = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosPrivate.delete(`/tasks/${id}`)
                if (res.data.deletedCount > 0) {
                    refetch()
                    refetchUserData()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your task has been deleted.",
                        icon: "success"
                    });
                    return res.data
                }
                else {
                    refetch()
                    refetchUserData()
                    return res.data
                }
            }
        });
    }


    return (
        <div>
            <div>
                <h3 className=' text-4xl text-center font-bold pb-24'>Your Tasks</h3>
            </div>
            <div>
                <h3 className=' text-center font-semibold text-xl pb-4'>Tasks List</h3>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Task Title</th>
                                <th>Task Count</th>
                                <th>Payable Amount</th>
                            </tr>
                        </thead>
                        <tbody>

                            {taskCreatorTasks.map((task, i) => <tr key={task._id}>
                                <th>{ }</th>
                                <td>{task.taskTitle}</td>
                                <td>{task.taskQuantity}</td>
                                <td>{task.payableAmount} coin</td>
                                <td><Link to={`/dashboard/updatetask/${task._id}`} className=' btn btn-sm bg-orange-500 text-white'> <MdOutlineUpdate /> Update</Link></td>
                                <td><button onClick={() => handleDeleteTask(task._id)} className=' btn btn-sm bg-red-500 text-white'><AiOutlineMinus /> Delete</button></td>
                            </tr>)
                            }
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    );
};

export default MyTasks;