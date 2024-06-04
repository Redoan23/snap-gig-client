import React, { useState } from 'react';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate/useAxiosPrivate';
import useUserData from '../../../Hooks/useUserData/useUserData';
import useAuth from '../../../Hooks/useAuth';
import moment from 'moment';
import Swal from 'sweetalert2';

const Withdrawal = () => {

    const axiosPrivate = useAxiosPrivate()
    const [userData, refetch] = useUserData()
    const { user } = useAuth()
    const workerName = user?.displayName
    const workerEmail = user?.email
    const coin = userData.coin
    const currencyRate = 20
    const maximumDollar = coin / currencyRate
    const [coinInserted, setCoinInserted] = useState(0)
    const insertedDollar = coinInserted / currencyRate
    const [loading, setLoading] = useState(false)

    //   Swal 
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

    const handleWithdraw = (e) => {
        e.preventDefault()
        const form = e.target
        const withdrawCoin = parseInt(form.amount.value)
        const paymentSystem = form.paymentSystem.value
        const number = parseInt(form.accountNumber.value)
        const withdrawAmount = parseFloat(form.dollars.value)
        const withdrawTime = moment().format('MMMM Do YYYY, h:mm:ss a')
        setLoading(true)


        const withdrawalData = {
            workerName, workerEmail, withdrawCoin, paymentSystem, withdrawAmount, withdrawTime
        }

        if (coin / currencyRate < withdrawAmount) {
            setLoading(false)
            return Toast.fire({
                text: 'Request failed, not enough coin ',
                icon: 'error'
            })
        }

        axiosPrivate.post('/withdraw', withdrawalData)
            .then(res => {
                setLoading(false)
                if (res.data.insertedId) {
                    Toast.fire({
                        text: 'Successful, please wait for the admin approval.',
                        icon: 'info'
                    })
                    refetch()
                }

            })
            .catch(err => {
                setLoading(false)
                Toast.fire({
                    text: `Error, ${err.message}`,
                    icon: 'error'
                })
                refetch()
            })
        form.reset()
    }


    return (
        <div className=' p-10'>
            <div>
                <h3 className=' text-3xl font-semibold '>You can withdraw maximum ${maximumDollar}</h3>
            </div>
            <div >
                <form onSubmit={handleWithdraw} className=' flex flex-col gap-3 p-10'>
                    <label htmlFor="amount" className=' w-full'>
                        Coin *
                        <input className=' bg-gray-100 p-2 rounded-lg w-full' type="number" name="amount" id="amount" onChange={(e) => setCoinInserted(e.target.value)} placeholder=' coin to withdraw' required />
                    </label>
                    <label htmlFor="dollars" className=' w-full'>
                        Dollars $
                        <input className=' bg-gray-100 p-2 rounded-lg w-full' type="text" name="dollars" placeholder='$' disabled value={insertedDollar} id="" required />
                    </label>
                    <label htmlFor="paymentSystem" className=' w-full'>
                        Payment System *
                        <select className=' bg-gray-100 p-2 rounded-lg w-full' name="paymentSystem" id="paymentSystem">
                            <option selected disabled>Select Payment System</option>
                            <option value="bkash">Bkash</option>
                            <option value="nagad">Nagad</option>
                            <option value="rocket">Rocket</option>
                        </select>
                    </label>
                    <label htmlFor="accountNumber" className=' w-full'>
                        Account Number*
                        <input className=' bg-gray-100 p-2 rounded-lg w-full' type="number" name="accountNumber" id="accountNumber" placeholder=' account number' required />
                    </label>
                    <div>
                        <button className=' btn bg-[#007bff] text-white'>{loading ? <span className="loading loading-dots loading-xs"></span>
                            : 'Withdraw'}</button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Withdrawal;