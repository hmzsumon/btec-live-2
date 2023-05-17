import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivetRoute = ({ isAdmin }) => {
	const { user, isAuthenticated } = useSelector((state) => state.auth);

	if (!isAuthenticated) {
		return <Navigate to='/login' />;
	}

	if (isAdmin) {
		return user.role === 'admin' || user?.role === 'manager' ? (
			<Outlet />
		) : (
			<Navigate to='/not-access' />
		);
	}

	if (user.role === 'user') {
		return <Outlet />;
	}
};

export default PrivetRoute;
