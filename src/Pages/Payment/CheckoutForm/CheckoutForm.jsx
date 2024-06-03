import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate/useAxiosPrivate";
import useAuth from "../../../Hooks/useAuth";
import {
    useStripe,
    useElements,
    CardElement
} from "@stripe/react-stripe-js";
import Swal from "sweetalert2";

const CheckoutForm = ({ clientSecret, totalAmount }) => {
    const axiosPrivate = useAxiosPrivate()
    const stripe = useStripe();
    const { user } = useAuth()
    const elements = useElements();
    const [err, setErr] = useState('')
    const [transactionId, setTransactionId] = useState(null)


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

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setErr(error.message)
        } else {
            setErr('')
            console.log('[PaymentMethod]', paymentMethod);
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id)

                const payment = {
                    email: user.email,
                    price: totalAmount,
                    transactionId: paymentIntent.id,
                    date: new Date()
                }
                const res = await axiosPrivate.post('/payments', payment)
                console.log(res)
                if (res.data.modifiedCount > 0) {
                    Toast.fire({
                        text: 'Payment Successful, you got',
                        icon: 'success'
                    })
                }

            }
        }
    }



    return (
        <div className=''>
            <form onSubmit={handleSubmit} className=' w-1/2 mx-auto border shadow-xl p-6' >
                <CardElement className=' border border-gray-500 p-4 mx-auto'
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className=''>
                    <button className=' btn  w-32 rounded-2xl mt-5 bg-orange-500 text-white' type="submit" disabled={!stripe || !clientSecret}>
                        Pay
                    </button>
                </div>
                <p className="text-red-500 pt-3">{err}</p>
                {transactionId && <p><span className=' text-green-500'>Your Transaction ID :</span> {`${transactionId}`}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;