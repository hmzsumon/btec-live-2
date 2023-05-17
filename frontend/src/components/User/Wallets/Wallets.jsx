import React from 'react';
import Layout from '../Layout/Layout';
import WalletCard from '../Dashboard/WalletCard';
import { useLoadUserQuery } from '../../../features/auth/authApi';
import DefaultLoader from '../../../global/DefaultLoader';
import GoBack from '../../../global/GoBack';

const Wallets = () => {
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
			<h1 className='text-center my-2'>
				<span className=' text-green-500'>{user?.name}</span> Wallets Info
			</h1>
			<WalletCard user={user} />
			<div className='flex flex-col my-2 items-center justify-center'>
				<GoBack />
			</div>
		</Layout>
	);
};

export default Wallets;
