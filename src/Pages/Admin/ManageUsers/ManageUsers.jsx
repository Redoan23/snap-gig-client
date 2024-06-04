import React, { useRef, useState } from 'react';
import useAllUserData from '../../../Hooks/useAllUserData/useAllUserData';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate/useAxiosPrivate';
import Swal from 'sweetalert2';

const ManageUsers = () => {

    // this is not the best practice, user data should have been filtered from the backend, using this just for now to save time. From the next time i must use backend

    const axiosPrivate = useAxiosPrivate()
    const [allUserData, refetch] = useAllUserData()
    const filterWorker = allUserData?.filter(user => user.role === 'worker')


    const handleDeleteUser = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPrivate.delete(`/worker/${id}`)
                if (res.data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your task has been deleted.",
                        icon: "success"
                    });
                    return res.data
                }
                else {
                    refetch()
                    return res.data
                }
            }
        });
    }

    const handleRoleChange = e => {

        const role = e.target.value

        Swal.fire({
            title: "Are you sure?",
            text: `This user's role will be updated to ${role}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPrivate.patch(`/worker/${id}`, { role })
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Updated!",
                        text: `The role has been successfully updated to ${role}`,
                        icon: "success"
                    });
                    return res.data
                }
                else {
                    refetch()
                    return res.data
                }
            }
        });
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>img</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Coin</th>
                            <th>Update Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterWorker.map(worker => <tr key={worker._id}>
                            <th>1</th>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={worker.photoUrl} />
                                    </div>
                                </div>
                            </td>
                            <td>{worker.name}</td>
                            <td>{worker.email}</td>
                            <td>{worker.role}</td>
                            <td>{worker.coin}</td>
                            <td>
                                <select onChange={handleRoleChange}>
                                    <option disabled selected value="">Select Role</option>
                                    <option value="admin">admin</option>
                                    <option value="taskcreator">Task Creator</option>
                                    <option value="worker">Worker</option>
                                </select>
                            </td>
                            <td><button onClick={() => handleDeleteUser(worker._id)} className=' btn btn-sm bg-red-500 text-white'> - Remove</button></td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;