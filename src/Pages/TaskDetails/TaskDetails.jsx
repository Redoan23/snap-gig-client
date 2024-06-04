import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const TaskDetails = () => {

    const axiosPrivate = useAxiosPrivate()
    const { id } = useParams()
    const { user } = useAuth()
    const userEmail = user?.email
    const { data: tasksData = [] } = useQuery({
        queryKey: ['taskData'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/tasks/${id}`)
            return res.data
        }
    })
    const [loading, setLoading] = useState(false)
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const time = moment().format('MMMM Do YYYY, h:mm:ss a')
    const handleSubmit = (e) => {
        e.preventDefault()
        const taskId = tasksData._id
        const taskTitle = tasksData.taskTitle
        const taskDetail = tasksData.taskDetails
        const taskImg = tasksData.imgLink
        const payableAmount = tasksData.payableAmount
        const workerEmail = userEmail
        const submissionDetails = e.target.submission_details.value
        const workerName = user?.displayName
        const creatorName = tasksData.creatorName
        const creatorEmail = tasksData.creatorEmail
        const currentDate = time
        const status = 'pending'

        const submittedData = {
            taskId, taskTitle, taskDetail, taskImg, payableAmount, workerEmail,
            submissionDetails, workerName, creatorName, creatorEmail,
            currentDate, status
        }

        axiosPrivate.post('/submittedData', submittedData)
            .then(res => {
                console.log(res.data)
                setLoading(false)
                if (res.data.insertedId) {
                    Toast.fire({
                        text: 'Work submitted successfully',
                        icon: 'success'
                    })
                }
            })
            .catch(err => {
                setLoading(false)
                Toast.fire({
                    text: `Error, ${err.message}`,
                    icon: 'error'
                })
            })
        e.target.reset()
    }

    return (
        <div className='px-5'>
            <div>
                <h3 className=' text-4xl text-center font-semibold p-5'>Submit Your Task</h3>
            </div>
            <hr className=' border-black' />
            <div className="task-details text-left mx-auto p-5">
                <div>
                    <h3 className=' text-3xl font-semibold text-center underline py-5'>Task Details</h3>
                </div>
                <h1 className=' text-2xl font-semibold my-2'>Task Title : {tasksData.taskTitle}</h1>
                <p className=' pb-2'>{tasksData.taskDetails}</p>
                <div className=' overflow-hidden w-[600px] h-[380px] '> <img src={tasksData.imgLink} alt="Task" className="task-img w-full h-full mx-auto" /></div>
                <div className=' py-3'>
                    <p className=''><strong>Payable Amount:</strong> ${tasksData.payableAmount}</p>
                    <p><strong>Quantity:</strong> {tasksData.taskQuantity}</p>
                    <p><strong>Created by:</strong> {tasksData.creatorName} ({tasksData.creatorEmail})</p>
                    <p><strong>Creation Date:</strong> {tasksData.currentTime}</p>
                    <p><strong>Completion Date:</strong> {tasksData.completionDate}</p>
                </div>
            </div>
            <hr className=' border-black' />
            <div className=" mt-10">
                <h2 className=' text-2xl font-semibold pt-5 underline text-center'>Submit Your Work</h2>
                <form onSubmit={handleSubmit} className=' text-left p-5'>
                    <label htmlFor="submission_detail" className=' text-left font-semibold'>Submission Details:</label><br />
                    <textarea
                        id="submission_details"
                        name="submission_details"
                        rows="10"
                        cols="80"
                        className=' border-2 border-black p-2'
                        placeholder='give your task details here'
                        required
                    ></textarea>
                    <br />
                    <br />
                    <button onClick={() => setLoading(true)} type="submit" value="Submit" className=' btn bg-[#007bff] text-white'>{loading ? <span className="loading loading-dots loading-xs"></span> : 'Submit'}</button>
                </form>
            </div>
        </div>
    );
};

export default TaskDetails;

