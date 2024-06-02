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
                path: '/dashboard',
                element: <CreatorHome></CreatorHome>
            },
            {
                path: '/dashboard/addnewtasks',
                element: <AddNewTasks></AddNewTasks>
            }
        ]
    }
]);


export default router;