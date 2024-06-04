import React, { useState } from 'react';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { BiMinus } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import TaskDetailsPopup from './TaskDetailsPopup/TaskDetailsPopup';

const ManageTasks = () => {

    const axiosPrivate = useAxiosPrivate()
    const [taskInfo, setTaskInfo] = useState(null)

    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axiosPrivate.get('/tasks')
            return res.data
        }
    })

    const handleDeleteTask = (task) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You are going to delete the task ${task.taskTitle}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPrivate.delete(`/taskCollection/tasks/${task._id}`)
                if (res.data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: `The task ${task.taskTitle} has been deleted.`,
                        icon: "success"
                    });
                    return res.data
                }
                else {
                    refetch()
                    return res.data
                }
            }
        });
    }


    const handleViewTask = (task) => {
        setTaskInfo(task)
    }

    return (
        <div>
            <div className="overflow-x-auto p-5">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Task Title</th>
                            <th>Task Creator</th>
                            <th>Task Count</th>
                            <th>Coin Needed</th>
                            <th>Availability</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, i) => <tr key={task._id} className='hover'>
                            <th>{i + 1}</th>
                            <td>{task.taskTitle}</td>
                            <td>{task.creatorName}</td>
                            <td>{task.taskQuantity}</td>
                            <td>{task.totalPayment}</td>
                            <td>{task.completionDate}</td>
                            <td>

                                <button onClick={() => handleViewTask(task)} className=' btn btn-sm text-white bg-[#007bff9e]'> <FaEye /> View Task</button>

                            </td>
                            <td><button onClick={() => handleDeleteTask(task)} className=' btn btn-sm bg-red-500 text-white'> <BiMinus /> Delete Task</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            {taskInfo && <TaskDetailsPopup task={taskInfo} />}
        </div>
    );
};

export default ManageTasks;