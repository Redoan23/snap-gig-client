import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const TaskDetailsPopup = ({ task }) => {

  useEffect(() => {

    Swal.fire({
      html: `
            <div class='space-y-7'>
              <div class=' flex gap-5 justify-center items-center mx-auto'>
                <div><img src=${task.imgLink}/></div>
                <div class=' flex flex-col gap-5 w-full text-left'>
                <div><h1 ><span class=' text-[black] text-4xl font-semibold'>${task.taskTitle}</span></h1></div>
                <p class=' text-[black]'> ${task.taskDetails}</p>
                <div><h3><span class=' text-[black] font-semibold '>Task count : </span>${task.taskQuantity} </h3></div>
                   <div><h3><span class=' text-[black] font-semibold '>Task Creator Name : </span>${task.creatorName}</h3> </div>
                   <div><h3><span class=' text-[black] font-semibold '>Task Creator Email : </span>${task.creatorEmail}</h3> </div>
                   <div><h3><span class=' text-[black] font-semibold '>Payable Amount(per task) : $</span>${task.payableAmount}</h3> </div>
                   <div><h3><span class=' text-[black] font-semibold '>Submission Info: </span>${task.submissionInfo}</h3> </div>
                   <div><h3><span class=' text-[black] font-semibold '>Completion Date : </span>${task.completionDate} </h3></div>
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

  }, [])


};

export default TaskDetailsPopup;