import React from 'react'
import Login from './pages/Login'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from './MainLayout';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Campus from './components/admin/Campus';
import Department from './components/admin/Department';
import Institution from './components/admin/Institution';
import Program from './components/admin/Program';
import Applicants from './components/admissionOfficer/Applicants';
import ConfirmAdmission from './components/admissionOfficer/ConfirmAdmission';
import SeatAllocation from './components/admissionOfficer/SeatAllocation';
import FeeUpdate from './components/admissionOfficer/FeeUpdate';
import DocumentVerify from './components/admissionOfficer/DocumentVerify';
import Dashboard from './pages/Dashboard';

const App = () => {

	const { user } = useSelector((store) => store.auth);


	const appRouter = createBrowserRouter([

		// PUBLIC ROUTES
		{
			path: "/",
			element: !user ? <Login /> : <Navigate to="/profile" />,
		},
		{
			path: "/signup",
			element: !user ? <Signup /> : <Navigate to="/" />,
		},

		// PROTECTED ROUTES
		{
			// element: <MainLayout />,
			element: user ? <MainLayout /> : <Navigate to="/" />,
			children: [
				{
					path: "/",
					element: <Profile />,
				},
				{
					path: "/profile",
					element: <Profile />,
				},
				{
					path: "/signup",
					element: <Signup />,
				},

				// admin part
				{
					path: "/institution",
					element: <Institution />,
				},
				{
					path: "/campus",
					element: <Campus />,
				},
				{
					path: "/department",
					element: <Department />,
				},
				{
					path: "/program",
					element: <Program />,
				},

				// admissionOfficer
				{
					path: "/applicant",
					element: <Applicants />,
				},

				{
					path: "/verify",
					element: <DocumentVerify />,
				}, {
					path: "/allocate",
					element: <SeatAllocation />,
				},
				{
					path: "/fee",
					element: <FeeUpdate />,
				},
				{
					path: "/confirm",
					element: <ConfirmAdmission />,
				},
				// management
				{
					path: "/dashboard",
					element: <Dashboard />,
				}
			]
		}

	]);



	return (
		<div>
			<RouterProvider router={appRouter} />
		</div>
	)
}

export default App