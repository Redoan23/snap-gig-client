import React from 'react';
import { useForm } from "react-hook-form"
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../../Hooks/useAxiosPrivate/useAxiosPrivate';
import Swal from 'sweetalert2';

const UpdateTask = () => {

    const { id } = useParams()
    const axiosPrivate = useAxiosPrivate()



    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        Swal.fire({
            title: "Update?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Update"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosPrivate.patch(`/task/${id}`, data)
                console.log(res.data)
                Swal.fire({
                    title: "Updated!",
                    text: "The Task has been updated.",
                    icon: "success"
                });
                return res.data
            }
        });


    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Task Title</span>
                    </label>
                    <input type="text" placeholder="task title" className="input input-bordered" {...register("taskTitle", { required: true })} />
                    {errors.taskTitle && <span className=' text-red-500'>This field is required*</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Task Details</span>
                    </label>
                    <input type="text" placeholder="task details" className="input input-bordered" {...register("taskDetails", { required: true })} />
                    {errors.taskDetails && <span className=' text-red-500'>This field is required*</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Submission Details</span>
                    </label>
                    <input type="text" placeholder="submission details" className="input input-bordered" {...register("submissionInfo", { required: true })} />
                    {errors.submissionDetails && <span className=' text-red-500'>This field is required*</span>}
                </div>
                <div className="form-control mt-6">
                    <button className="btn  text-white bg-[#007bff]">Update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateTask;