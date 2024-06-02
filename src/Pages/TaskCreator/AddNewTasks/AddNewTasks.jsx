import React from 'react';
import { useForm } from "react-hook-form"
import useUserData from '../../../Hooks/useUserData/useUserData';


const AddNewTasks = () => {

    const [userData] = useUserData()
    console.log(userData?.length)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        const taskTitle = data.tasktitle
        const taskDetails = data.taskdetails
        const taskQuantity = data.taskquantity
        const payableAmount = data.payableamount
        const completionDate = data.completiondate
        const submissionInfo = data.submissioninfo
        const taskImage = data.file[0]

        // console.log(taskTitle,
        //     taskDetails,
        //     taskQuantity,
        //     payableAmount,
        //     completionDate,
        //     submissionInfo,
        //     taskImage)
        const totalPayment = taskQuantity * payableAmount
        if (totalPayment > userData.length){
            console.log('beshi hoise maybe')
        }

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
                    <input type="number" placeholder="task quantity" className="input input-bordered"  {...register('payableamount', { required: true })} />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Completion Date</span>
                    </label>
                    <input type="date" placeholder="task quantity" className="input input-bordered"  {...register('completiondate', { required: true })} />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Submission Info</span>
                    </label>
                    <input type="date" placeholder="task quantity" className="input input-bordered"  {...register('submissioninfo', { required: true })} />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Task Image</span>
                    </label>
                    <input type="file" placeholder="task quantity" className="input input-bordered"  {...register('file', { required: true })} />
                </div>
                <div className="form-control mt-6">
                    <input type="submit" value='Add Task' className=' btn bg-[#007bff] text-white' />
                </div>
            </form>
        </div>

    )

};

export default AddNewTasks;