import React from 'react';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate/useAxiosPrivate';
import useAuth from '../../../Hooks/useAuth';
import useUserData from '../../../Hooks/useUserData/useUserData';
import useAllUserData from '../../../Hooks/useAllUserData/useAllUserData';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AdminHome = () => {

    // api for all Payments
    const axiosPrivate = useAxiosPrivate()
    const [allUserData, refetch] = useAllUserData()
    const { user } = useAuth()

    const { data: payments = [], refetch: fetchAgain } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosPrivate.get('/allPayments')
            return res.data
        }
    })
    // api for all withdrawals
    const { data: allWithdrawal = [], refetch: fetchOnceMore } = useQuery({
        queryKey: ['allWithdrawal'],
        queryFn: async () => {
            const res = await axiosPrivate.get('/allWithdrawals')
            return res.data
        }
    })

    const totalCoin = allUserData.reduce((acc, user) => acc + (user.coin || 0), 0);

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

    const handleApprovePayment = (w) => {
        const id = w._id
        const workerEmail = w.workerEmail
        const deductCoin = w.withdrawCoin
        const data = { id, workerEmail, deductCoin }
        axiosPrivate.patch(`/withdrawal/delete/${id}`, data)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    fetchOnceMore()
                    Toast.fire({
                        text: 'Withdrawal approved',
                        icon: 'success'
                    })
                }
            })
            .catch(err => {
                fetchOnceMore()
                Toast.fire({
                    text: `Error, ${err.message}`,
                    icon: 'error'
                })
            })
    }

    return (
        <div>
            <div>
                <h3>Total Users: {allUserData.length}</h3>
                <h3>Total Coins: {totalCoin}</h3>
                <h3>Total Payments: {payments.length} </h3>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Worker Name</th>
                                <th>Withdrawn Coin</th>
                                <th>Withdraw Amount</th>
                                <th>Payment Number</th>
                                <th>Payment System</th>
                                <th>Withdraw Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allWithdrawal.map((withdrawal, i) =>
                                    <tr key={withdrawal._id}>
                                        <th>{i + 1}</th>
                                        <td>{withdrawal.workerName}</td>
                                        <td>{withdrawal.withdrawCoin}</td>
                                        <td>{withdrawal.withdrawAmount}</td>
                                        <td>{withdrawal?.paymentNumber}</td>
                                        <td>{withdrawal?.paymentSystem}</td>
                                        <td>{withdrawal?.withdrawTime}</td>
                                        <td>
                                            <button onClick={() => handleApprovePayment(withdrawal)} className=' btn btn-sm bg-green-500 text-white'>payment success</button>
                                        </td>
                                    </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;