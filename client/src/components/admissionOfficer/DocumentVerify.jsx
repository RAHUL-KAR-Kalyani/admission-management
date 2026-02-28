import axios from 'axios';
import React, { useEffect, useState } from 'react'

const DocumentVerify = () => {
	useEffect(() => {
		document.title = 'Document Verification'
	}, []);

	const [applicants, setApplicants] = useState([]);

	const loadApplicants = async () => {
		const res = await axios.get(`${import.meta.env.VITE_APPLICANT_ENDPOINT}/get`, { withCredentials: true });
		// console.log(res.data)
		setApplicants(res.data?.applicant);
	};
	
	useEffect(() => {
		const fetchData = async () => {
			await loadApplicants();
		};
		fetchData();

		const interval = setInterval(fetchData, 2000);

		return () => clearInterval(interval);
	}, []);

	const handleStatusChange = async (id, status) => {
		try {
			await axios.patch(`${import.meta.env.VITE_APPLICANT_ENDPOINT}/update/${id}`,
				{ applicantId: id, status },
				{ withCredentials: true }
			);
			loadApplicants();
		} catch (error) {
			console.error(error);
		}
	};


	return (
		<div className="overflow-x-auto min-w-60">
			<h2 className="text-xl font-semibold mb-4 text-center">Document Verification</h2>
			<table className='min-w-full divide-y divide-gray-200 border border-gray-200 shadow-sm'>
				<thead className='bg-gray-50'>
					<tr>
						<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
						<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Category</th>
						<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Marks</th>
						<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
					</tr>
				</thead>
				<tbody>
					{applicants?.map((applicant) => (
						<tr key={applicant?._id}>
							<td className='px-4 py-2 text-sm text-gray-700 capitalize'>{applicant?._id} {applicant?.firstName} {applicant?.lastName}</td>
							<td className='px-4 py-2 text-sm text-gray-700'>{applicant?.category}</td>
							<td className='px-4 py-2 text-sm text-gray-700'>{applicant?.marks}</td>
							{/* <td className='px-4 py-2 text-sm text-gray-700'>{applicant.documents?.status}</td> */}
							<td className='px-4 py-2 text-sm text-gray-700'>
								<select
									value={applicant.documents?.status}
									onChange={(e) => handleStatusChange(applicant._id, e.target.value)}
									className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:border-blue-300"
								>
									<option value="Pending">Pending</option>
									<option value="Submitted">Submitted</option>
									<option value="Verified">Verified</option>
								</select>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default DocumentVerify