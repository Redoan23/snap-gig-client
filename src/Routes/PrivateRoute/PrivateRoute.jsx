import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    // const location = useLocation()

    if (loading) {
        return 'loading...'
    }
    if (user) {
        return children
    }
    return <Navigate to='/login' state={location.pathname} replace></Navigate>

};

export default PrivateRoute;