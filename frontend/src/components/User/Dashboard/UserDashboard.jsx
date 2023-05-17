import React from 'react';
import Layout from '../Layout/Layout';
import WalletCard from './WalletCard';
import Menu from './Menu';
import Carousel from './Carousel';
import { useLoadUserQuery } from '../../../features/auth/authApi';
import DefaultLoader from '../../../global/DefaultLoader';

const UserDashboard = () => {
	const { data, error, isError, isLoading } = useLoadUserQuery();
	const { user } = data || {};

	if (isError) {
		return (
			<Layout>
				<h1 className='text-red-500'>{error.data.message}</h1>
			</Layout>
		);
	}

	return (
		<Layout>
			{isLoading && <DefaultLoader />}
			<div className='space-y-3 '>
				<WalletCard user={user} />
				<Menu />
				<Carousel />
			</div>
		</Layout>
	);
};

export default UserDashboard;
