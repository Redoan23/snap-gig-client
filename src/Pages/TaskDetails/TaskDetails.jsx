import React from 'react';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const TaskDetails = () => {

    const axiosPrivate = useAxiosPrivate()
    const { id } = useParams()
    const { data: tasksData } = useQuery({
        queryKey: ['taskData'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/task/${id}`)
            return res.data
        }
    })

    return (
        <div>
            <div>
                <p>{tasksData._id}</p>
                <h3>{tasksData.taskTitle}</h3>
                <h3>{tasksData.TaskDetails}</h3>
                <h3>{tasksData.TaskDetails}</h3>
                <h3>{tasksData.imglink}</h3>
                <h3>{tasksData.payableAmount}</h3>
                <h3>{tasksData.submissionInfo}</h3>
                <h3>{tasksData.creatorName}</h3>
                <h3>{tasksData.creatorEmail}</h3>
                <h3>Current Time: {moment.format('MMMM Do YYYY, h:mm:ss a')}</h3>
            </div>
        </div>
    );
};

export default TaskDetails;