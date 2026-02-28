import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalPrograms: 0,
        pendingDocuments: 0,
        feePending: 0,
        programs: [],
        admissions: [],
        applicants: [],
        admissionStats: { pending: 0, confirmed: 0 },
        seatStats: [],
        quotaStats: [],
        intakeVsAdmitted: { totalIntake: 0, totalAdmitted: 0 }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'Dashboard';
    }, []);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [programRes, applicantRes, admissionRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_PROGRAM_ENDPOINT}/get`, { withCredentials: true }),
                    axios.get(`${import.meta.env.VITE_APPLICANT_ENDPOINT}/get`, { withCredentials: true }),
                    axios.get(`${import.meta.env.VITE_ADMISSION_ENDPOINT}/get`, { withCredentials: true })
                ]);

                const programs = programRes.data?.program || [];
                const applicants = applicantRes.data?.applicant || [];
                const admissions = admissionRes.data?.admission || [];

                const pendingDocs = applicants.filter(a => a.documents?.status === 'Pending').length;
                const feePending = admissions.filter(a => a.feeStatus === 'Pending').length;

                const admissionStats = {
                    pending: admissions.filter(a => a.status !== 'Confirmed').length,
                    confirmed: admissions.filter(a => a.status === 'Confirmed').length
                };

                const seatStats = programs.map(p => ({
                    name: p.name,
                    intake: Object.values(p.quotas || {}).reduce((sum, q) => sum + q.total, 0),
                    filled: Object.values(p.quotas || {}).reduce((sum, q) => sum + q.filled, 0),
                })).map(p => ({ ...p, remaining: p.intake - p.filled }));


                const quotaStats = [];
                programs.forEach(p => {
                    Object.entries(p.quotas || {}).forEach(([quota, data]) => {
                        quotaStats.push({
                            name: `${p.name} - ${quota}`,
                            filled: data.filled,
                            remaining: data.total - data.filled
                        });
                    });
                });


                const totalIntake = seatStats.reduce((sum, s) => sum + s.intake, 0);
                const totalAdmitted = seatStats.reduce((sum, s) => sum + s.filled, 0);


                const pendingDocApplicants = applicants.filter(a => a.documents?.status === 'Pending')
                    .slice(0, 5);


                const feePendingList = admissions.filter(a => a.feeStatus === 'Pending').slice(0, 5);

                setStats({
                    totalPrograms: programs.length,
                    pendingDocuments: pendingDocs,
                    feePending,
                    programs,
                    admissions,
                    applicants,
                    admissionStats,
                    seatStats,
                    quotaStats,
                    intakeVsAdmitted: { totalIntake, totalAdmitted },
                    pendingDocApplicants,
                    feePendingList
                });
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                toast.error(error.response?.data?.message);
            }
        };

        fetchDashboardData();
        const interval = setInterval(fetchDashboardData, 5000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="text-center p-8">Loading...</div>;

    const COLORS = ['#3b82f6', '#10b981'];
    const admissionData = [
        { name: 'Pending', value: stats.admissionStats.pending },
        { name: 'Confirmed', value: stats.admissionStats.confirmed }
    ];

    const intakeVsAdmittedData = [
        { name: 'Total Intake', value: stats.intakeVsAdmitted.totalIntake },
        { name: 'Admitted', value: stats.intakeVsAdmitted.totalAdmitted }
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;

            return (
                <div className="bg-white p-3 shadow rounded text-sm">
                    <p><strong>{data.name}</strong></p>
                    <p>Intake: {data.intake}</p>
                    <p>Filled: {data.filled}</p>
                    <p>Remaining: {data.remaining}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="card bg-blue-500 text-white shadow-lg">
                    <div className="card-body">
                        <p className="text-sm opacity-80">Total Programs</p>
                        <p className="text-3xl font-bold">{stats.totalPrograms}</p>
                    </div>
                </div>
                <div className="card bg-yellow-500 text-white shadow-lg">
                    <div className="card-body">
                        <p className="text-sm opacity-80">Pending Documents</p>
                        <p className="text-3xl font-bold">{stats.pendingDocuments}</p>
                    </div>
                </div>
                <div className="card bg-red-500 text-white shadow-lg">
                    <div className="card-body">
                        <p className="text-sm opacity-80">Fee Pending</p>
                        <p className="text-3xl font-bold">{stats.feePending}</p>
                    </div>
                </div>
                <div className="card bg-green-500 text-white shadow-lg">
                    <div className="card-body">
                        <p className="text-sm opacity-80">Total Admissions</p>
                        <p className="text-3xl font-bold">{stats.admissions.length}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Total Intake vs Admitted</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={intakeVsAdmittedData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={100} fill="#8884d8" dataKey="value">
                                    <Cell fill="#3b82f6" />
                                    <Cell fill="#10b981" />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Admission Status</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={admissionData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={100} fill="#8884d8" dataKey="value">
                                    {admissionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-xl mb-8">
                <div className="card-body">
                    <h2 className="card-title">Programs Seat Status</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats.seatStats}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />

                            {/* Stacked bars */}
                            <Bar dataKey="filled" stackId="a" fill="#10b981" />
                            <Bar dataKey="remaining" stackId="a" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Quota-wise Filled Seats</h2>
                        <div className="overflow-x-auto">
                            <table className="table table-compact w-full">
                                <thead>
                                    <tr>
                                        <th>Quota</th>
                                        <th>Filled</th>
                                        <th>Remaining</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.quotaStats.map((quota, idx) => (
                                        <tr key={idx}>
                                            <td>{quota.name}</td>
                                            <td className="font-semibold text-green-600">{quota.filled}</td>
                                            <td className="font-semibold text-orange-600">{quota.remaining}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Remaining Seats</h2>
                        <div className="overflow-x-auto">
                            <table className="table table-compact w-full">
                                <thead>
                                    <tr>
                                        <th>Program</th>
                                        <th>Remaining</th>
                                        <th>% Available</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.seatStats.map((seat, idx) => (
                                        <tr key={idx}>
                                            <td>{seat.name}</td>
                                            <td className="font-semibold text-orange-600">{seat.remaining}</td>
                                            <td>{((seat.remaining / seat.intake) * 100).toFixed(1)}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Applicants with Pending Documents</h2>
                        <div className="overflow-x-auto">
                            <table className="table table-compact w-full">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.pendingDocApplicants && stats.pendingDocApplicants.length > 0 ? (
                                        stats.pendingDocApplicants.map((applicant, idx) => (
                                            <tr key={idx}>
                                                <td>{applicant.firstName} {applicant.lastName}</td>
                                                <td>{applicant.email}</td>
                                                <td><span className="badge badge-warning">Pending</span></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center">No pending documents</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Fee Pending List</h2>
                        <div className="overflow-x-auto">
                            <table className="table table-compact w-full">
                                <thead>
                                    <tr>
                                        <th>Program</th>
                                        <th>Student</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.feePendingList && stats.feePendingList.length > 0 ? (
                                        stats.feePendingList.map((admission, idx) => (
                                            <tr key={idx}>
                                                <td>{admission.programName || (typeof admission.program === 'object' ? admission.program?.name : admission.program)}</td>
                                                <td>{admission?.applicant?.firstName} {admission?.applicant?.lastName}</td>
                                                <td><span className="badge badge-error">Fee Pending</span></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center">No pending fees</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-xl mt-8">
                <div className="card-body">
                    <h2 className="card-title mb-4">Seat Allocation Details</h2>
                    <div className="overflow-x-auto">
                        <table className="table table-compact w-full">
                            <thead>
                                <tr>
                                    <th>Program</th>
                                    <th>Intake</th>
                                    <th>Filled</th>
                                    <th>Remaining</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.seatStats.map((seat, idx) => (
                                    <tr key={idx}>
                                        <td>{seat.name}</td>
                                        <td>{seat.intake}</td>
                                        <td>{seat.filled}</td>
                                        <td>{seat.remaining}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;