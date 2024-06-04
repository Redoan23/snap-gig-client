import React from 'react';
import useUserData from '../../../Hooks/useUserData/useUserData';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';

const CreatorHome = () => {

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

    return (
        <div>
            <div>
                <div>
                    {`Your Total Coins : ${userData.coin}`}
                </div>
                <div>
                    {`Pending Tasks : ${workerData.length}`}
                </div>
                <div>
                    total payment Paid: {totalAmountPaid}
                </div>
            </div>
            <div>
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
                                        <td><button className=' btn btn-sm'> view submission</button></td>
                                        <td><button onClick={() => handleTaskState(data._id, data.taskId, data.workerEmail, data.payableAmount, 'approved',)} className=' btn btn-sm bg-green-500 text-white'> Approve</button></td>
                                        <td><button onClick={() => handleTaskState(data._id, data.taskId, data.workerEmail, 'void', 'rejected')} className=' btn btn-sm bg-red-500 text-white'> Reject</button></td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CreatorHome;