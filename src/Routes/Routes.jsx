import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Main from '../Layouts/Main/Main';
import Home from '../Pages/Home/Home';
import Register from '../Pages/UserAuthentication/Register/Register';
import Login from '../Pages/UserAuthentication/Login/Login';






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
            }
        ]
    },
]);


export default router;