import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'sonner';

const Applicants = () => {
	useEffect(() => {
		document.title = 'Applicants'
	}, []);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		marks: "",
		category: "",
		entryType: "",
		quotaType: "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(formData);
		try {
			const response = await axios.post(`${import.meta.env.VITE_APPLICANT_ENDPOINT}/create`, formData, { withCredentials: true });
			console.log('Success:', response.data);
			if (response.data.success) {
				navigate('/verify');
				toast.success(response.data.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}

	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
			<div className="card w-full max-w-3xl bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="card-title text-2xl justify-center mb-4">
						Student Registration Form
					</h2>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="form-control w-full">
								{/* <label className="label">
									<span className="label-text">First Name</span>
								</label> */}
								<input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name" className="input outline-none w-full" required />
							</div>

							<div className="form-control w-full">
								{/* <label className="label">
									<span className="label-text">Last Name</span>
								</label> */}
								<input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" className="input outline-none w-full" required />
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="form-control w-full">
								{/* <label className="label">
									<span className="label-text">Email</span>
								</label> */}
								<input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="input outline-none w-full" required />
							</div>

							<div className="form-control w-full">
								{/* <label className="label">
									<span className="label-text">Marks</span>
								</label> */}
								<input type="number" name="marks" value={formData.marks} onChange={handleChange} placeholder="Marks" className="input outline-none w-full pr-2" min="0" max="100" required />
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="form-control w-full">
								{/* <label className="label">
									<span className="label-text">Category</span>
								</label> */}
								<select name="category" value={formData.category} onChange={handleChange} className="select outline-none w-full" required >
									<option value="">Category</option>
									<option value="General">General</option>
									<option value="OBC">OBC</option>
									<option value="SC">SC</option>
									<option value="ST">ST</option>
								</select>
							</div>

							<div className="form-control w-full">
								{/* <label className="label">
									<span className="label-text">Entry Type</span>
								</label> */}
								<select name="entryType" value={formData.entryType} onChange={handleChange} className="select outline-none w-full" required >
									<option>Entry Type</option>
									<option value="Regular">Regular</option>
									<option value="Lateral">Lateral</option>
								</select>
							</div>

							<div className="form-control w-full">
								{/* <label className="label">
									<span className="label-text">Quota Type</span>
								</label> */}
								<select name="quotaType" value={formData.quotaType} onChange={handleChange} className="select outline-none w-full" required >
									<option>Quota Type</option>
									<option value="KCET">KCET</option>
									<option value="COMEDK">COMEDK</option>
									<option value="Management">Management</option>
								</select>
							</div>
						</div>
						
						<div className="form-control mt-6">
							<button type="submit" className="btn btn-primary w-full">Submit</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Applicants