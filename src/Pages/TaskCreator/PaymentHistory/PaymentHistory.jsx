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
            <div>
                <h3 className=' text-center font-bold text-4xl pb-24'>Your Payment History</h3>
            </div>
            <div>
                <h3 className='text-xl text-center pb-4'>Payment List</h3>
            </div>
            <div className="overflow-x-auto px-10">
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