import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import useUserData from '../../../Hooks/useUserData/useUserData';
import { RiCoinsLine } from 'react-icons/ri';

const Navbar = () => {

    const { user, logOut } = useAuth()
    const [userData, refetch] = useUserData()
    const routeLinks =
        <>
            {/* <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/register'>Register</NavLink></li> */}
            {!user && <li><NavLink to='/login'>Login</NavLink></li>}
            {!user && <li><NavLink to='/register'>Register</NavLink></li>}
            <li><NavLink to='https://youtu.be/usoQupzfGR0?si=kDGBBVUmwgpqRUJ0' target='_blank'>Watch Demo</NavLink></li>
            {user && <li> <NavLink to='/userprofile'>User Profile</NavLink> </li>}
            {user && <li> <NavLink to='/dashboard'>Dashboard</NavLink> </li>}
        </>

    const handleLogOut = () => {
        return logOut()
    }

    return (
        <div>
            <div className="navbar bg-base-100 max-w-screen-2xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {routeLinks}
                        </ul>
                    </div>
                    <Link to='/' className="text-3xl font-semibold">Snap Gig</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {routeLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user && <div className=' flex items-center gap-3'>
                        {userData && <p className=' flex items-center gap-1'>Total Coin : {userData?.coin} <RiCoinsLine className=' text-yellow-500 text-xl' /> </p>}
                        <div className=' overflow-hidden'>
                            <img className=' w-12  h-12 rounded-full' src={user.photoURL} alt="" />
                        </div>
                        <button onClick={handleLogOut} className=' btn bg-[#007bff] text-white'>Log Out</button>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;