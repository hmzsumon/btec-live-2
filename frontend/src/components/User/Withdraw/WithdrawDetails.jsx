import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';

import FadeLoader from 'react-spinners/FadeLoader';
import Details from './Details';
import { useGetSingleWithdrawQuery } from '../../../features/withdraw/withdrawApi';

const WithdrawDetails = () => {
	const { id } = useParams();

	const { data, isLoading } = useGetSingleWithdrawQuery(id);
	const { withdraw } = data || {};

	return (
		<Layout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-[65vh]'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div>
					<Details withdraw={withdraw} />
				</div>
			)}
		</Layout>
	);
};

export default WithdrawDetails;
