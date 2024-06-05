import React from 'react';
import useSubmittedData from '../../../Hooks/useSubmittedData/useSubmittedData';

const WorkerSubmissions = () => {
    const [submittedData] = useSubmittedData()
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Task Title</th>
                            <th>Submitted From</th>
                            <th>Payable Amount</th>
                            <th>Creator Name</th>
                            <th>Date Submitted</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            submittedData.map((approvedSub, i) =>
                                <tr key={approvedSub._id} className="hover">
                                    <th>{i + 1}</th>
                                    <td>{approvedSub.taskTitle}</td>
                                    <td>{approvedSub.workerEmail}</td>
                                    <td>{approvedSub.payableAmount}</td>
                                    <td>{approvedSub.creatorName} ({approvedSub.creatorEmail})</td>
                                    <td>{approvedSub.currentDate}</td>
                                    <td>{approvedSub.status}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WorkerSubmissions;