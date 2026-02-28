import axios from 'axios';
import { useEffect, useState } from 'react'
import { toast } from 'sonner';

const Institution = () => {
    useEffect(() => {
        document.title = 'Institution'
    }, []);
    const [formData, setFormData] = useState({
        name: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res=await axios.post(`${import.meta.env.VITE_INSTITUTE_ENDPOINT}/create`, formData, { withCredentials: true });
            // console.log(res.data);
            toast.success(res.data.message);
            setFormData({name: ""});

        } catch (error) {
            console.log("error", error);
            toast.error(error.response?.data?.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-base-100 rounded-lg shadow-lg p-6 space-y-4">
                    <h1 className="text-2xl font-bold text-center">Create Institution</h1>

                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter institution name" className="input w-full outline-none" />
                    <button type="submit" className="btn btn-primary w-full">Create</button>
                </form>
            </div>
        </div>
    )
}

export default Institution