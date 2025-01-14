import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../../Pages/Shared/Footer/Footer';
import DashboardNavbar from './DashboardNavbar/DashboardNavbar';
import useUserData from '../../Hooks/useUserData/useUserData';

const Dashboard = () => {

    // const user = 'taskcreator'
    const [userData] = useUserData()
    const user = userData?.role

    return (
        <div>
            <DashboardNavbar></DashboardNavbar>
            <div className=' flex'>
                <div className=' bg-blue-500 min-h-screen w-52 p-4'>

                    {
                        user === 'admin' &&
                        <ul className='menu text-white space-y-4'>
                            <li><NavLink to='/dashboard/adminHome'>Home</NavLink></li>
                            <li><NavLink to='/dashboard/manageUsers'>Manage Users</NavLink></li>
                            <li><NavLink to='/dashboard/manageTasks'>Manage Tasks</NavLink></li>
                        </ul>
                    }

                    {user === 'taskcreator' &&
                        <ul className='menu text-white space-y-4'>
                            <li><NavLink to='/dashboard/creatorhome'>Home</NavLink></li>
                            <li><NavLink to='/dashboard/addnewtasks'>Add New Tasks</NavLink></li>
                            <li><NavLink to='/dashboard/mytasks'>My Tasks</NavLink></li>
                            <li><NavLink to='/dashboard/purchasecoin'>Purchase Coin</NavLink></li>
                            <li><NavLink to='/dashboard/paymenthistory'>Payment History</NavLink></li>
                        </ul>
                    }
                    {
                        user === 'worker' &&
                        <ul className='menu text-white space-y-4'>
                            <li><NavLink to='/dashboard/workerHome'>Home</NavLink></li>
                            <li><NavLink to='/dashboard/workerTasksList'>Task List</NavLink></li>
                            <li><NavLink to='/dashboard/workerSubmissions'>My Submission</NavLink></li>
                            <li><NavLink to='/dashboard/withdrawal'>Withdraw Coin</NavLink></li>
                        </ul>
                    }
                </div>
                <div className=' w-full '>
                    <div className='min-h-screen'>
                        <Outlet></Outlet>
                    </div>
                    <div className=''>
                        <Footer></Footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;