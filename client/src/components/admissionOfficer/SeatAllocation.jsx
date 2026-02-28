import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const SeatAllocation = () => {
	const [applicants, setApplicants] = useState([]);
	const [programs, setPrograms] = useState([]);
	const [selectedProgram, setSelectedProgram] = useState(null);
	const [remaining, setRemaining] = useState(null);

	const [formData, setFormData] = useState({
		applicant: "",
		program: "",
		quota: "",
		allotmentNumber: "",
	});

	// Set document title
	useEffect(() => {
		document.title = 'Seat Allocation';
	}, []);

	const allocationData = async () => {
		try {
			const res = await axios.get(`${import.meta.env.VITE_APPLICANT_ENDPOINT}/get`, { withCredentials: true });
			// console.log(res.data)
			setApplicants(res.data?.applicant);

			const response = await axios.get(`${import.meta.env.VITE_PROGRAM_ENDPOINT}/get`, { withCredentials: true });
			// console.log(response.data)
			setPrograms(response.data?.program);
		} catch (error) {
			console.error(error);
			toast.error("Failed to load data");
		}
	};

	// Fetch applicants and programs
	useEffect(() => {
		const fetchData = async () => {
			await allocationData();
		};
		fetchData();

		const interval = setInterval(fetchData, 2000);
		return () => clearInterval(interval);
	}, []);

	// Update remaining seats whenever program or quotaType changes
	useEffect(() => {
		if (formData.program && formData.quota) {
			const program = programs.find(p => p._id === formData.program);
			setSelectedProgram(program);

			if (program && program.quotas?.[formData.quota]) {
				const quota = program.quotas[formData.quota];
				setRemaining(quota.total - quota.filled);
			} else {
				setRemaining(null);
			}
		} else {
			setRemaining(null);
			setSelectedProgram(null);
		}
	}, [formData.program, formData.quota, programs]);

	// Handle form field changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	// Handle seat allocation submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (remaining <= 0) {
			toast.error("Quota is full for this program");
			return;
		}

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_ADMISSION_ENDPOINT}/create`,
				formData,
				{ withCredentials: true }
			);
			toast.success(response.data?.message);

			// Reset form
			setFormData({
				applicant: "",
				program: "",
				quota: "",
				allotmentNumber: "",
			});
			setRemaining(null);
			setSelectedProgram(null);
		} catch (error) {
			console.error(error.response?.data);
			toast.error(error.response?.data?.message);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
			<div className="card w-full max-w-3xl bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="card-title text-2xl justify-center mb-4">Seat Allocation Form</h2>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="flex flex-col md:flex-row gap-4">
							<input type="number" name="allotmentNumber" value={formData.allotmentNumber} onChange={handleChange} placeholder="allotmentNumber" className="input outline-none w-full pr-2" min="101" max="1000" required />

							{/* Applicant */}
							<select name="applicant" value={formData.applicant} onChange={handleChange} className="select w-full outline-none" required >
								<option value="">Select Applicant</option>
								{applicants.map(a => (
									<option key={a._id} value={a._id}>
										{a.firstName} {a.lastName}
									</option>
								))}
							</select>

							{/* Program */}
							<select name="program" value={formData.program} onChange={handleChange} className="select w-full outline-none" required >
								<option value="">Select Program</option>
								{programs.map(p => (
									<option key={p._id} value={p._id}>
										{p.name}
									</option>
								))}
							</select>

							{/* Quota */}
							<select name="quota" value={formData.quota} onChange={handleChange} className="select w-full outline-none" required >
								<option value="">Select Quota</option>
								<option value="KCET">KCET</option>
								<option value="COMEDK">COMEDK</option>
								<option value="Management">Management</option>
							</select>
						</div>

						{/* Remaining Seats */}
						{remaining !== null && (
							<div className={`p-2 mt-2 rounded ${remaining > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
								Remaining Seats: {remaining}
							</div>
						)}

						<button type="submit" className="btn btn-primary w-full" >Allocate Seat</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SeatAllocation;