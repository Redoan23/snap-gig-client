import React from 'react';
import { FaTasks } from 'react-icons/fa';
import { FaSackDollar } from 'react-icons/fa6';
import { LuKey } from 'react-icons/lu';
import { MdDoubleArrow } from 'react-icons/md';

const HowItWorks = () => {
    return (
        <div className=' mt-24'>
            <div>
                <h3 className=' text-4xl text-center font-semibold'> How It Works?</h3>
            </div>
            <div className=' flex gap-5 mt-24 mx-auto justify-center items-center'>
                <div className="card w-96 h-60 rounded-none bg-base-100 shadow-xl border py-4">
                    <figure><LuKey size={60} color='#007bff' /></figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Register</h2>
                        <p>Register with valid credentials to access the earning process</p>
                    </div>
                </div>
                <MdDoubleArrow size={80} color='black' />
                <div className="card w-96 h-60 rounded-none bg-base-100 shadow-xl border py-4">
                    <figure><FaTasks size={60} color='#007bff' /></figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Complete Tasks</h2>
                        <p>Complete your given tasks carefully and submit it to get rewarded</p>
                    </div>
                </div>
                <MdDoubleArrow size={80} color='black' />
                <div className="card  w-96 h-60 rounded-none bg-base-100 shadow-xl border py-4">
                    <figure><FaSackDollar size={60} color='#007bff' /></figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Earn Rewards</h2>
                        <p>Earn rewards for each submission</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;