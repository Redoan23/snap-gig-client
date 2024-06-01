import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {

    const routeLinks =
        <>
            <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/register'>Register</NavLink></li>
            <li><NavLink to='https://youtu.be/usoQupzfGR0?si=kDGBBVUmwgpqRUJ0' target='_blank'>Watch Demo</NavLink></li>
        </>

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
                    <a className="btn bg-[#007bff] text-white">Login</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;