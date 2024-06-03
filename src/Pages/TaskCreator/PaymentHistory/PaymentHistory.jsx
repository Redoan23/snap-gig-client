import React from 'react';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';

const PaymentHistory = () => {

    const axiosPrivate = useAxiosPrivate()
    const { user } = useAuth()
    const email = user?.email
    const { data: paymentHistory = [], refetch } = useQuery({
        queryKey: ['paymentHistory', user?.email],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/payment/${email}`)
            return res.data
        }
    })

    return (
        <div>
            <div className="overflow-x-auto p-10">
                <table className="table border">
                    {/* head */}
                    <thead>
                        <tr className=' bg-[#0000008f] text-white'>
                            <th>#</th>
                            <th>Email</th>
                            <th>Amount Paid</th>
                            <th>Transaction Id</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory.map((payment, i) => <tr key={payment._id} className='hover'>
                            <th>{i + 1}</th>
                            <td>{payment.email}</td>
                            <td>${payment.price}</td>
                            <td>{payment.transactionId}</td>
                            <td>{payment.date}</td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;