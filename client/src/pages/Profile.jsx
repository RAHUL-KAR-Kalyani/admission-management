import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IdCard, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const Profile = () => {
    useEffect(() => {
        document.title = "Profile";
    }, []);

    const { user } = useSelector(store => store.auth);

    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : "U";
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-200">
                    <div className="h-32 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 relative"></div>
                    <div className="px-8 pb-8 relative">

                        <div className="flex flex-col md:flex-row gap-6 -mt-12 mb-8">
                            <div className="shrink-0">
                                <div className="h-32 w-32 rounded-2xl border-4 border-white bg-linear-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-lg">
                                    <span className="text-5xl font-bold text-white">
                                        {getInitials(user?.name)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col justify-end flex-1 pb-2">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2 capitalize">{user?.name}</h1>
                                <div className="flex items-center gap-2">
                                    <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full font-semibold text-sm">
                                        {user?.role}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-200">

                            <div className="flex items-start gap-4">
                                <div className="mt-1 p-3 bg-indigo-100 rounded-lg">
                                    <Mail className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Email</p>
                                    <p className="text-gray-900 font-medium">{user?.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="mt-1 p-3 bg-purple-100 rounded-lg">
                                    <IdCard className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">User ID</p>
                                    <p className="text-gray-900 font-medium">{user?._id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;