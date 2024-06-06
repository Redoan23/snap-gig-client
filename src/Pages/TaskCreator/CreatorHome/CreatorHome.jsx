import React, { useState } from 'react';
import useUserData from '../../../Hooks/useUserData/useUserData';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import { RiCoinsLine } from 'react-icons/ri';
import { BiStats } from 'react-icons/bi';
import { MdDone } from 'react-icons/md';
import SubmissionDetails from './SubmissionDetails/SubmissionDetails';

const CreatorHome = () => {

    const [viewSubmission, setViewSubmission] = useState(null)
    const [state, setState] = useState(false)
    const [userData] = useUserData()
    const { user } = useAuth()
    const email = user?.email
    const axiosPrivate = useAxiosPrivate()
    const { data: workerData = [], refetch } = useQuery({
        queryKey: ['workerData'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/workerData/${email}`)
            return res.data
        }
    })

    // query for getting the payment done by the task-creator

    const { data: paymentData = [], refetch: fetchAgain } = useQuery({
        queryKey: ['paymentData'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/workerData/totalPayment/${email}`)
            return res.data
        }
    })
    const totalAmountPaid = paymentData.reduce((acc, paymentData) => acc + paymentData.payableAmount, 0)


    const handleTaskState = (id, taskId, workerEmail, payableAmount, status) => {
        const updatedTaskData = { id, taskId, workerEmail, payableAmount, status }
        axiosPrivate.patch(`/submittedTask/${id}`, updatedTaskData)
            .then(res => {
                refetch()
                fetchAgain()
                console.log(res.data)
            })
            .catch(err => {
                refetch()
                fetchAgain()
                console.log(err.message)
            })
    }

    const handleViewSubmission = (task) => {
        setViewSubmission(task)
        setState(!state)
    }
    return (
        <div className=' px-10'>
            <div>
                <h3 className=' text-center font-bold text-4xl pb-24'>Dashboard</h3>
            </div>
            <div>
                <h3 className=' text-xl text-center font-semibold pb-4'>Stats</h3>
            </div>
            <div className='pb-24 flex justify-center'>
                <div className="stats stats-vertical lg:stats-horizontal gap-20 shadow mx-auto">
                    <div className="stat flex items-center">
                        <div>
                            <div className="stat-title">Your Total Coins</div>
                            <div className="stat-value">{userData.coin}</div>
                        </div>
                        <div className="stat-desc text-yellow-400 "><RiCoinsLine size={50} /></div>
                    </div>

                    <div className="stat flex items-center">
                        <div>
                            <div className="stat-title">Pending Tasks</div>
                            <div className="stat-value">{workerData.length}</div>
                        </div>
                        <div>
                            <BiStats size={50} className='text-[#007bff]' />
                        </div>
                    </div>

                    <div className="stat flex items-center">
                        <div>
                            <div className="stat-title">Total Payment Paid</div>
                            <div className="stat-value">{totalAmountPaid}</div>
                        </div>
                        <div className="stat-desc">< MdDone size={50} className=' text-green-500' /></div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h3 className=' text-center text-xl font-semibold pb-4'>Tasks List</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name(email)</th>
                                <th>Task Title</th>
                                <th>Payable Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                workerData.map((data, i) =>
                                    <tr key={data._id}>
                                        <th>{i + 1}</th>
                                        <td>{data.workerName} ({data.workerEmail})</td>
                                        <td>{data.taskTitle}</td>
                                        <td>{data.payableAmount} coin</td>
                                        <td><button onClick={() => handleViewSubmission(data)} className=' btn btn-sm'> view submission</button></td>
                                        <td><button onClick={() => handleTaskState(data._id, data.taskId, data.workerEmail, data.payableAmount, 'approved',)} className=' btn btn-sm bg-green-500 text-white'> Approve</button></td>
                                        <td><button onClick={() => handleTaskState(data._id, data.taskId, data.workerEmail, 'void', 'rejected')} className=' btn btn-sm bg-red-500 text-white'> Reject</button></td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {viewSubmission && <SubmissionDetails task={viewSubmission} state={state}></SubmissionDetails>}
        </div>
    );
};

export default CreatorHome;