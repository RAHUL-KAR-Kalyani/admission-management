import axios from 'axios';
import { useEffect, useState } from 'react'
import { toast } from 'sonner';

const Department = () => {
    useEffect(() => {
        document.title = 'Department'
    }, [])

    const [campuses, setCampuses] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        campus: "",
    });

    const fetchCampuses = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_CAMPUS_ENDPOINT}/get`, { withCredentials: true });
            // console.log(res.data)
            setCampuses(res.data.campus);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchCampuses();
        };
        fetchData();

        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_DEPARTMENT_ENDPOINT}/create`, formData, { withCredentials: true });
            // console.log(res.data);
            toast.success(res.data.message);
            setFormData({ name: "", campus: "" });

        } catch (error) {
            console.log("error", error);
            toast.error(error.response?.data?.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-base-100 rounded-lg shadow-lg p-6 space-y-4">
                    <h1 className="text-2xl font-bold text-center">Create Campus</h1>

                    <select name="campus" value={formData.campus} onChange={handleChange} className="select outline-none w-full">
                        <option value="">Select Campus</option>
                        {campuses?.map((campus) => (
                            <option key={campus?._id} value={campus?._id}>{campus?.name}</option>
                        ))}
                    </select>

                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Department name" className="input w-full outline-none" />
                    <button type="submit" className="btn btn-primary w-full">Create</button>
                </form>
            </div>
        </div>
    )
}

export default Department