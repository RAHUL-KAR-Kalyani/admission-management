import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ConfirmAdmission = () => {
    useEffect(() => {
        document.title = 'Confirm Admission'
    }, []);

    const [admissions, setAdmissions] = useState([]);

    const loadAdmissions = async () => {
        const res = await axios.get(`${import.meta.env.VITE_ADMISSION_ENDPOINT}/get`, { withCredentials: true });
        // console.log(res.data)
        setAdmissions(res.data.admission);
    };

    // useEffect(() => {
    //     loadAdmissions();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            await loadAdmissions();
        };
        fetchData();

        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, []);

    const confirmAdmission = async (id) => {
        try {
            const confirmedAdmissions = admissions.filter(a => a.status === "Confirmed");
            const nextNumber = confirmedAdmissions.length + 1;
            const admissionNo = nextNumber.toString().padStart(3, "0");
            await axios.patch(`${import.meta.env.VITE_ADMISSION_ENDPOINT}/confirm-admission/${id}`,
                { status: "Confirmed", admissionNumber: admissionNo },
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
                        <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Fee Status</th>
                        <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Seat Status</th>
                        <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Admission No</th>
                        <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {admissions?.map((admission) => (
                        <tr key={admission?._id}>
                            <td className='px-4 py-2 text-sm text-gray-700 capitalize'>{admission?.applicant?.firstName} {admission?.applicant?.lastName}</td>
                            <td className='px-4 py-2 text-sm text-gray-700'>{admission?.program?.name}</td>
                            <td className='px-4 py-2 text-sm text-gray-700'>{admission?.quota}</td>
                            <td className={`px-4 py-2 text-sm ${admission?.feeStatus === "Paid" ? "text-green-600 font-bold" : "text-red-600 font-bold"}`}>{admission?.feeStatus}</td>
                            <td className={`px-4 py-2 text-sm ${admission?.status === "Confirmed" ? "text-green-600 font-bold" : "text-red-600 font-bold"}`}><span value={admission?.status}>{admission?.status}</span></td>
                            <td className='px-4 py-2 text-sm text-gray-700'>{admission?.admissionNumber}</td>

                            <td className='px-4 py-2 text-sm text-gray-700'>
                                {admission?.status === "Confirmed" ? (
                                    <span className="text-green-600 font-bold">Done</span>
                                ) : (
                                    <button
                                        className={`${admission?.feeStatus?.toLowerCase() === "paid"
                                            ? "bg-blue-500 hover:bg-blue-700 cursor-pointer"
                                            : "bg-gray-400 cursor-not-allowed"
                                            } text-white font-bold py-1 px-2 rounded text-xs`}
                                        onClick={() => confirmAdmission(admission?._id)}
                                        disabled={admission?.feeStatus?.toLowerCase() !== "paid"}>
                                        Confirm
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ConfirmAdmission