import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Main from '../Layouts/Main/Main';
import Home from '../Pages/Home/Home';
import Register from '../Pages/UserAuthentication/Register/Register';
import Login from '../Pages/UserAuthentication/Login/Login';
import Dashboard from '../Layouts/Dashboard/Dashboard';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import UserProfile from '../Pages/UserProfile/UserProfile';
import AddNewTasks from '../Pages/TaskCreator/AddNewTasks/AddNewTasks';
import CreatorHome from '../Pages/TaskCreator/CreatorHome/CreatorHome';
import MyTasks from '../Pages/TaskCreator/MyTasks/MyTasks';
import UpdateTask from '../Pages/TaskCreator/MyTasks/UpdateTask/UpdateTask';
import PurchaseCoin from '../Pages/TaskCreator/PurchaseCoin/PurchaseCoin';
import Payment from '../Pages/Payment/Payment';
import PaymentHistory from '../Pages/TaskCreator/PaymentHistory/PaymentHistory';
import AdminHome from '../Pages/Admin/AdminHome/AdminHome';
import ManageUsers from '../Pages/Admin/ManageUsers/ManageUsers';
import ManageTasks from '../Pages/Admin/ManageTasks/ManageTasks';
import WorkerHome from '../Pages/Worker/WorkerHome/WorkerHome';
import WorkerTasksList from '../Pages/Worker/WokerTasksList/WorkerTasksList';
import WorkerSubmissions from '../Pages/Worker/WorkerSubmissions/WorkerSubmissions';






const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/userprofile',
                element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>
            },
            {
                path: '/payment/:amount',
                element: <Payment></Payment>
            }
        ]
    },

    // Dashboard layout section

    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // Task creator related children
            {
                path: '/dashboard/creatorhome',
                element: <CreatorHome></CreatorHome>
            },
            {
                path: '/dashboard/addnewtasks',
                element: <AddNewTasks></AddNewTasks>
            },
            {
                path: '/dashboard/mytasks',
                element: <MyTasks></MyTasks>
            },
            {
                path: '/dashboard/updatetask/:id',
                element: <UpdateTask></UpdateTask>
            },
            {
                path: '/dashboard/purchasecoin',
                element: <PurchaseCoin></PurchaseCoin>
            },
            {
                path: '/dashboard/paymenthistory',
                element: <PaymentHistory></PaymentHistory>
            },

            // admin related children
            {
                path: '/dashboard/adminHome',
                element: <AdminHome></AdminHome>
            },
            {
                path: '/dashboard/manageUsers',
                element: <ManageUsers></ManageUsers>
            },
            {
                path: '/dashboard/manageTasks',
                element: <ManageTasks></ManageTasks>
            },

            // worker related children
            {
                path: '/dashboard/workerHome',
                element: <WorkerHome></WorkerHome>,
            },
            {
                path: '/dashboard/workerTasksList',
                element: <WorkerTasksList></WorkerTasksList>
            },
            {
                path: '/dashboard/workerSubmissions',
                element: <WorkerSubmissions></WorkerSubmissions>
            }

        ]
    },

]);


export default router;