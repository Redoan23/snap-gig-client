import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../../Pages/Shared/Footer/Footer';
import Navbar from '../../Pages/Shared/Navbar/Navbar';

const Dashboard = () => {
    return (
        <div>
            <div className=' flex'>
                <div className=' bg-blue-500 h-screen w-52 p-10'>
                    <ul className='menu text-white'>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/'>Home</NavLink></li>
                    </ul>
                </div>
                <div>
                    <div>
                        <Outlet></Outlet>
                    </div>
                    <div>
                        <Footer></Footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;