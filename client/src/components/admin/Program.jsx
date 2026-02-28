import axios from 'axios';
import { useEffect, useState } from 'react'
import { toast } from 'sonner';

const Program = () => {
    useEffect(() => {
        document.title = 'Program'
    }, [])

    const [departments, setDepartments] = useState([]);

    const fetchDepartments = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_DEPARTMENT_ENDPOINT}/get`, { withCredentials: true });
            // console.log(res.data)
            setDepartments(res.data.department);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchDepartments();
        };
        fetchData();

        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, [])

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        department: "",
        academicYear: "",
        courseType: "",
        entryType: "",
        admissionMode: "",
        intake: "",
        quotas: {
            KCET: { total: "" },
            COMEDK: { total: "" },
            Management: { total: "" }
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // If quota fields
        if (["KCET", "COMEDK", "Management"].includes(name)) {
            setFormData((prev) => ({
                ...prev,
                quotas: {
                    ...prev.quotas,
                    [name]: { total: Number(value) }
                }
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: name === "intake" ? Number(value) : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const totalQuota =
                formData.quotas.KCET.total +
                formData.quotas.COMEDK.total +
                formData.quotas.Management.total;

            if (totalQuota !== Number(formData.intake)) {
                alert("Quota total must equal intake");
                return;
            }
            const res = await axios.post(`${import.meta.env.VITE_PROGRAM_ENDPOINT}/create`, formData, { withCredentials: true });
            // console.log(res.data);
            toast.success(res.data.message);
            setFormData({
                name: "",
                code: "",
                department: "",
                academicYear: "",
                courseType: "",
                entryType: "",
                admissionMode: "",
                intake: "",
                quotas: {
                    KCET: { total: "" },
                    COMEDK: { total: "" },
                    Management: { total: "" }
                }
            });

        } catch (error) {
            console.log("error", error);
            toast.error(error.response?.data?.message);
        }
    }



    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
            <div className="w-full max-w-4xl bg-base-100 shadow-xl rounded-xl p-6 sm:p-8">

                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                    Create Program / Branch
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Program Name" className="input outline-none w-full" required />

                        <input type="text" name="code" value={formData.code} onChange={handleChange} placeholder="Code" className="input outline-none w-full" required />
                    </div>

                    <div>
                        <select name="department" value={formData.department} onChange={handleChange} className="select outline-none w-full" required >
                            <option value="">Select Department</option>
                            {departments?.map((department) => (
                                <option key={department?._id} value={department?._id}>{department?.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="academicYear" value={formData.academicYear} onChange={handleChange} placeholder="Academic Year" className="input outline-none w-full" required />

                        <select name="courseType" value={formData.courseType} onChange={handleChange} className="select outline-none w-full" required >
                            <option value="">Course Type</option>
                            <option value="UG">UG</option>
                            <option value="PG">PG</option>
                        </select>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select name="entryType" value={formData.entryType} onChange={handleChange} className="select outline-none w-full" required >
                            <option value="">Entry Type</option>
                            <option value="Regular">Regular</option>
                            <option value="Lateral">Lateral</option>
                        </select>

                        <select name="admissionMode" value={formData.admissionMode} onChange={handleChange} className="select outline-none w-full" required >
                            <option value="">admissionMode</option>
                            <option value="Government">Government</option>
                            <option value="Management">Management</option>
                        </select>
                    </div>

                    {/* Intake */}
                    <div>
                        <input type="number" name="intake" value={formData.intake} onChange={handleChange} placeholder="Total Intake" className="input outline-none w-full" required />
                    </div>


                    {/* Seats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <input
                            type="number"
                            name="KCET"
                            value={formData.quotas.KCET.total}
                            onChange={handleChange}
                            placeholder="KCET Seats"
                            className="input outline-none w-full"
                            required
                        />

                        <input
                            type="number"
                            name="COMEDK"
                            value={formData.quotas.COMEDK.total}
                            onChange={handleChange}
                            placeholder="COMEDK Seats"
                            className="input outline-none w-full"
                            required
                        />

                        <input
                            type="number"
                            name="Management"
                            value={formData.quotas.Management.total}
                            onChange={handleChange}
                            placeholder="Management Seats"
                            className="input outline-none w-full"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <div>
                        <button type="submit" className="btn btn-primary w-full sm:w-auto sm:px-10" >
                            Submit
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Program