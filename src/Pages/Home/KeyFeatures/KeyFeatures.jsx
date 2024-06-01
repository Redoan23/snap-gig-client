import React from 'react';
import { BsWallet2 } from 'react-icons/bs';
import { ImCoinDollar } from 'react-icons/im';
import { ListDetails } from 'tabler-icons-react';

const KeyFeatures = () => {
    return (
        <div className=' flex gap-20 justify-center items-center mt-24'>
            <div className="card w-80 rounded-none bg-base-100 shadow-xl border py-3">
                <figure><ListDetails size={60} color='#007BFF'/></figure>
                <div className="card-body text-center items-center mx-auto">
                    <h2 className="card-title text-center">Tasks</h2>
                    <p>Create and Manage Tasks</p>
                </div>
            </div>
            <div className="card w-80 rounded-none bg-base-100 shadow-xl border py-3">
                <figure><ImCoinDollar size={60} color='#007BFF' className=' font-thin'/></figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Earn Coin</h2>
                    <p>Earn Coin by Completing Tasks</p>
                </div>
            </div>
            <div className="card w-80 rounded-none bg-base-100 shadow-xl border py-3">
                <figure><BsWallet2 size={60} color='#007BFF'/></figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Payment</h2>
                    <p>Get Your Payments Secured</p>
                </div>
            </div>
        </div>
    );
};

export default KeyFeatures;