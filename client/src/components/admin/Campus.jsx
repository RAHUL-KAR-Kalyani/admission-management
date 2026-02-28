import axios from 'axios';
import { useEffect, useState } from 'react'
import { toast } from 'sonner';

const Campus = () => {
    useEffect(() => {
        document.title = 'Campus'
    }, [])

    const [institutes, setInstitutes] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        institute: "",
    });

    const fetchInstitutes = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_INSTITUTE_ENDPOINT}/get`, { withCredentials: true });
            // console.log(res.data)
            setInstitutes(res.data.institute);
        } catch (error) {
            console.log("error", error);
            toast.error(error.response?.data?.message);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchInstitutes();
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
            console.log(import.meta.env.VITE_CAMPUS_ENDPOINT)
            const res = await axios.post(`${import.meta.env.VITE_CAMPUS_ENDPOINT}/create`, formData, { withCredentials: true });
            // console.log(res.data);
            toast.success(res.data.message);
            setFormData({ name: "", institute: "" });

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

                    <select name="institute" value={formData.institute} onChange={handleChange} className="select outline-none w-full">
                        <option value="">Select Institute</option>
                        {institutes?.map((institute) => (
                            <option key={institute?._id} value={institute?._id}>{institute?.name}</option>
                        ))}
                    </select>

                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter campus name" className="input w-full outline-none" />
                    <button type="submit" className="btn btn-primary w-full">Create</button>
                </form>
            </div>
        </div>
    )
}

export default Campus