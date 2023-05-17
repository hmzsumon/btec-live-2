import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './components/User/Profile/Profile';
import PrivetRoute from './route/PrivetRoute';
import NotFound from './pages/NotFound';
import UserDashboard from './components/User/Dashboard/UserDashboard';
import NotAccess from './pages/NotAccess';
import Register from './pages/Register';
import EmailVerification from './components/User/Verification/EmailVerification';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './components/Admin/Dashboard/Dashboard';

import MyTeams from './components/User/Team/MyTeams';

import Users from './components/Admin/Users/Users';

import ForgotPassword from './components/User/ResetPass/ForgotPassword';
import PasswordReset from './components/User/ResetPass/PasswordReset';
import Agents from './components/Admin/Users/Agents';
import FamilySalary from './components/Admin/Users/FamilySalary';

const darkTheme = createTheme({
	// change the theme bg color to red
	palette: {
		mode: 'dark',
	},
});

const App = () => {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />

			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/1xLuck24/admin' element={<AdminLogin />} />
				<Route path='/register' element={<Register />} />
				<Route path='/email-verify' element={<EmailVerification />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
				<Route path='/password/reset/:token' element={<PasswordReset />} />
				{/* Admin Route */}
				<Route element={<PrivetRoute isAdmin={true} />}>
					<Route path='/admin-dashboard' element={<AdminDashboard />} />
					<Route path='/admin/users' element={<Users />} />
					<Route path='/admin/agents' element={<Agents />} />
					<Route path='/family/:id' element={<FamilySalary />} />
				</Route>
				{/* User Route */}
				<Route element={<PrivetRoute />}>
					<Route path='/user-dashboard' element={<UserDashboard />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/my-teams' element={<MyTeams />} />
				</Route>
				{/* Not Found Page */}

				<Route path='/not-access' element={<NotAccess />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
			<ToastContainer />
		</ThemeProvider>
	);
};

export default App;
