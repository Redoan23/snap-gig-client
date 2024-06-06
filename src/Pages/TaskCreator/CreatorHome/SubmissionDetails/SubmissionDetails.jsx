import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const SubmissionDetails = ({ task, state }) => {
    return (
        useEffect(() => {

            Swal.fire({
                html: `
            <div class='space-y-7'>
              <div class=' flex gap-5 justify-center items-center mx-auto'>
                <div><img src=${task.taskImg}/></div>
                <div class=' flex flex-col gap-5 w-full text-left'>
                <div><h1 ><span class=' text-[black] text-4xl font-semibold'>${task.taskTitle}</span></h1></div>
                <p class=' text-[black]'> ${task.taskDetail}</p>
                <div><h3><span class=' text-[black] font-semibold '>Task ID : </span>${task.taskId} </h3></div>
                <div><h3><span class=' text-[black] font-semibold '>Task Done By : </span>${task.workerName}(${task.workerEmail})</h3> </div>
                   <div><h3><span class=' text-[black] font-semibold '>Task Creator : </span>${task.creatorName}(${task.creatorEmail})</h3> </div>
                   <div><h3><span class=' text-[black] font-semibold '>Payable Amount(per task) : </span>${task.payableAmount} Coin</h3> </div>
                   <div><h3><span class=' text-[black] font-semibold '>Submission Details: </span>${task.submissionDetails}</h3> </div>
                   <div><h3><span class=' text-[black] font-semibold '>Completion Date : </span>${task.currentDate} </h3></div>
                   <div><h3><span class=' text-[black] font-semibold '>Task Status: </span>${task.status} </h3></div>
                </div>
              </div>
            </div>
            `,
                title: "Task Details",
                width: 1000,
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Okay"
            })
        }, [task, state])
    )
}
export default SubmissionDetails;