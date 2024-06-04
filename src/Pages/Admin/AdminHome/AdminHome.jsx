import React from 'react';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate/useAxiosPrivate';
import useAuth from '../../../Hooks/useAuth';

const AdminHome = () => {

    const axiosPrivate = useAxiosPrivate()
    const { user } = useAuth()

    return (
        <div>
            this is admin home
        </div>
    );
};

export default AdminHome;