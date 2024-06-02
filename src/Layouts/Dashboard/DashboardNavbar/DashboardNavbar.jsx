import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate/useAxiosPrivate';
import useAxiosPublic from '../../../Hooks/useAxiosPublic/useAxiosPublic';
import { Link } from 'react-router-dom';
import { RiCoinsLine } from 'react-icons/ri';
import useUserData from '../../../Hooks/useUserData/useUserData';

const DashboardNavbar = () => {

    const { user } = useAuth()
    const [userData] = useUserData()

    return (
        <div className=' flex justify-between p-5 text-center h-20 '>
            <div className=' text-center'>
                <Link to='/' className=' text-3xl font-semibold '>Snap Gig</Link>
            </div>
            <div className=' flex gap-5'>
                <div className=' flex items-center gap-3 '>
                    <div className=' flex flex-col items-center justify-between'>
                        <div className=' flex items-center justify-center text-center text-black'>
                           {userData.role !=='admin' && <p className=' flex items-center gap-1'>Total Coins : {userData?.coin} <RiCoinsLine className=' text-yellow-500' /> </p>}
                        </div>
                        <p>{userData?.role}</p>

                    </div>
                    <div className=' flex flex-col items-center justify-between'>
                        <img className=' w-12 h-12 rounded-full' src={user?.photoURL} alt="" />
                        <p>{user?.displayName}</p>
                    </div>
                </div>
                <div>
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <span className="badge badge-xs badge-primary indicator-item">1</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardNavbar;