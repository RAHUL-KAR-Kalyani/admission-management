import axios from 'axios';
import React, { useEffect, useState } from 'react'

const FeeUpdate = () => {
    useEffect(() => {
        document.title = 'Fee Update'
    }, []);

    const [admissions, setAdmissions] = useState([]);

    const loadAdmissions = async () => {
        const res = await axios.get(`${import.meta.env.VITE_ADMISSION_ENDPOINT}/get`, { withCredentials: true });
        // console.log(res.data)
        setAdmissions(res.data.admission);
    };


    useEffect(() => {
        const fetchData = async () => {
            await loadAdmissions();
        };
        fetchData();

        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleFeeStatusChange = async (id, feeStatus) => {
        try {
            await axios.patch(`${import.meta.env.VITE_ADMISSION_ENDPOINT}/fee-update/${id}`,
                { applicantId: id, feeStatus },
                { withCredentials: true }
            );
            loadAdmissions();
        } catch (error) {
            console.error(error);
        }
    }




    return (
        <div className="overflow-x-auto min-w-60">
            <h2 className="text-xl font-semibold mb-4 text-center">Fee Update</h2>
            <table className='min-w-full divide-y divide-gray-200 border border-gray-200 shadow-sm'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Applicant</th>
                        <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Program</th>
                        <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Quota</th>
                        <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Seat Status</th>
                        <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Fee Status</th>
                    </tr>
                </thead>
                <tbody>
                    {admissions?.map((admission) => (
                        <tr key={admission?._id}>
                            <td className='px-4 py-2 text-sm text-gray-700 capitalize'>{admission?.applicant?.firstName} {admission?.applicant?.lastName}</td>
                            <td className='px-4 py-2 text-sm text-gray-700'>{admission?.program?.name}</td>
                            <td className='px-4 py-2 text-sm text-gray-700'>{admission?.quota}</td>
                            <td className='px-4 py-2 text-sm text-gray-700'>{admission?.status}</td>

                            <td className='px-4 py-2 text-sm text-gray-700'>
                                {admission?.status === "Confirmed" && admission?.feeStatus === "Paid" ? (
                                    <span className='px-4 py-2 text-sm text-green-600'>Paid</span>
                                ) : (
                                    <select
                                        value={admission?.feeStatus}
                                        onChange={(e) => handleFeeStatusChange(admission._id, e.target.value)}
                                        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:border-blue-300"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Paid">Paid</option>
                                    </select>)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FeeUpdate