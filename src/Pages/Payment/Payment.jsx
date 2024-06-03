import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm/CheckoutForm';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate/useAxiosPrivate';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_GATEWAY_PK)

const Payment = () => {

    const { amount } = useParams()
    const totalAmount = parseInt(amount)
    const axiosPrivate = useAxiosPrivate()
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        if (totalAmount > 0) {
            axiosPrivate.post('/create-payment-intent', { price: totalAmount })
                .then(res => {
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [])

    return (
        <div className=' px-20'>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} totalAmount={totalAmount} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;