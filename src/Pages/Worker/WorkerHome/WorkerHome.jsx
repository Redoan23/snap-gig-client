import React from 'react';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate/useAxiosPrivate';
import useAuth from '../../../Hooks/useAuth';
import useUserData from '../../../Hooks/useUserData/useUserData';
import { useQuery } from '@tanstack/react-query';
import useSubmittedData from '../../../Hooks/useSubmittedData/useSubmittedData';

const WorkerHome = () => {

    const axiosPrivate = useAxiosPrivate()
    const { user } = useAuth()
    const [userData] = useUserData()
    const [submittedData, refetch] = useSubmittedData()

    const { data: earning = [] } = useQuery({
        queryKey: ['earning'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/totalEarning/${user.email}`)
            return res.data
        }
    })

    const totalEarning = earning.reduce((acc, submissionData) => acc + submissionData.payableAmount, 0)

    return (
        <div>
            <div>
                <h3>Total coins : {userData.coin}</h3>
                <h3> Total submitted tasks: {submittedData.length}</h3>
                <h3> Total Earning: {totalEarning}</h3>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Task Title</th>
                                <th>Payable Amount</th>
                                <th>Creator Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                earning.map((approvedSub, i) =>
                                    <tr key={approvedSub._id} className="hover">
                                        <th>{i + 1}</th>
                                        <td>{approvedSub.taskTitle}</td>
                                        <td>{approvedSub.payableAmount}</td>
                                        <td>{approvedSub.creatorName}</td>
                                        <td>{approvedSub.status}</td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WorkerHome;