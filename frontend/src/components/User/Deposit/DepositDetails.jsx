import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { useGetSingleDepositQuery } from '../../../features/deposit/depositApi';
import FadeLoader from 'react-spinners/FadeLoader';
import Details from './Details';

const DepositDetails = () => {
	const { id } = useParams();

	const { data, isLoading } = useGetSingleDepositQuery(id);
	const { deposit } = data || {};

	return (
		<Layout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-[65vh]'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div>
					<Details deposit={deposit} />
				</div>
			)}
		</Layout>
	);
};

export default DepositDetails;
