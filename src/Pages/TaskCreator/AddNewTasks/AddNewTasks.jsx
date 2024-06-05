import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import useAllUserData from '../../../Hooks/useAllUserData/useAllUserData';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import moment from 'moment';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate/useAxiosPrivate';
import useUserData from '../../../Hooks/useUserData/useUserData';


const AddNewTasks = () => {

    const [allUserData] = useAllUserData()
    const [userData, refetch] = useUserData()
    const axiosPrivate = useAxiosPrivate()
    const { user } = useAuth()
    const [loadingUpdate, setLoadingUpdate] = useState(false)

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const taskTitle = data.tasktitle
        const taskDetails = data.taskdetails
        const taskQuantity = parseInt(data.taskquantity)
        const payableAmount = parseInt(data.payableamount)
        const completionDate = data.completiondate
        const submissionInfo = data.submissioninfo
        const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a')
        const taskImage = { image: data.file[0] }
        const creatorEmail = user?.email
        const creatorName = user?.displayName
        const imgBBUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`
        const totalPayment = taskQuantity * payableAmount

        setLoadingUpdate(true)

        if (totalPayment > userData?.coin) {
            setLoadingUpdate(false)
            return Toast.fire({
                text: 'Not enough Coin. Purchase Coin',
                icon: 'error'
            })
        }
        axiosPrivate.post(imgBBUrl, taskImage, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
            .then(res => {
                setLoadingUpdate(false)
                const imgLink = res.data.data.display_url
                const taskData = {
                    taskTitle, taskDetails, taskQuantity, payableAmount, totalPayment, completionDate,
                    submissionInfo, currentTime, imgLink, creatorEmail, creatorName
                }

                axiosPrivate.patch(`/users/${creatorEmail}`, { totalPayment })
                    .then(res => {
                        axiosPrivate.post('/tasks', taskData)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Toast.fire({
                                        text: 'your tasks has been submitted',
                                        icon: "success"
                                    })
                                }
                                refetch()
                            })
                            .catch(err => {
                                Toast.fire({
                                    text: `${err.message}`,
                                    icon: 'error'
                                })
                            })
                    })
            })
            .catch(err => {
                setLoadingUpdate(false)
                Toast.fire({
                    text: `${err.message}`,
                    icon: 'error'
                })
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Task Title</span>
                    </label>
                    <input type="text" placeholder="task title" className="input input-bordered" {...register('tasktitle', { required: true })} />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Task Details</span>
                    </label>
                    <input type="text" placeholder="task details" className="input input-bordered"  {...register('taskdetails', { required: true })} />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Task Quantity</span>
                    </label>
                    <input type="number" placeholder="task quantity" className="input input-bordered"  {...register('taskquantity', { required: true })} />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Payable Amount Per Task</span>
                    </label>
                    <input type="number" placeholder="payable amount" className="input input-bordered"  {...register('payableamount', { required: true })} />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Completion Date</span>
                    </label>
                    <input type="date" className="input input-bordered"  {...register('completiondate', { required: true })} />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Submission Info</span>
                    </label>
                    <input type="text" placeholder="submission info" className="input input-bordered"  {...register('submissioninfo', { required: true })} />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Task Image</span>
                    </label>
                    <input type="file" className="input input-bordered"  {...register('file', { required: true })} />
                </div>
                <div className="form-control mt-6">
                    {/* <input type="submit" onClick={() => setLoadingUpdate(true)} value={loadingUpdate ? <span className="loading loading-dots loading-xs"></span> : 'Add Task'} className=' btn bg-[#007bff] text-white' /> */}
                    <button className=' btn bg-[#007bff] text-white'>{loadingUpdate ? <span className="loading loading-dots loading-xs"></span> : 'Add Task'} </button>
                </div>
            </form>
        </div>

    )

};

export default AddNewTasks;