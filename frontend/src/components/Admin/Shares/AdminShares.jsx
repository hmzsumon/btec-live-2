import React, { useEffect, useState } from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import DashboardLayout from '../layouts/DashboardLayout';
import { toast } from 'react-toastify';
import { TextField } from '@mui/material';
import { FiExternalLink } from 'react-icons/fi';

import {
	useAddProfitToShareCardsMutation,
	useGetAdminShareCardDetailsQuery,
} from '../../../features/shareCard/shareCardApi';
import ButtonLoader from '../../../global/ButtonLoader';
import { Link } from 'react-router-dom';

const AdminShares = ({ user }) => {
	const [
		addProfitToShareCards,
		{ isLoading: addLoading, isError, error, isSuccess },
	] = useAddProfitToShareCardsMutation();
	const { data, isLoading } = useGetAdminShareCardDetailsQuery();
	const { shareCardDetails } = data || {};
	const {
		todaySellAmount,
		todaySellQty,
		totalParticipatedUsers,
		totalSellAmount,
		totalSellQty,
		users,
	} = shareCardDetails || {};

	const [amount, setAmount] = useState(0);

	const handleProfit = () => {
		addProfitToShareCards({ profit: amount });
	};

	useEffect(() => {
		if (isError) {
			toast.error(error.data.message);
		}

		if (isSuccess) {
			toast.success('Profit added successfully');
			setAmount(0);
		}
	}, [isError, error, isSuccess]);

	return (
		<DashboardLayout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='px-2 py-4 space-y-4'>
					<h2>Shares Dashboard</h2>
					<div>
						<div className='space-y-2 '>
							<div className='p-3 border'>
								{/* Personal Info */}
								<div className='space-y-1 text-xs '>
									<h2 className='text-xs italic text-center text-indigo-600'>
										Shares Sell Information
									</h2>
									<div className='grid grid-cols-2 list-none '>
										<li className='grid grid-cols-2 '>
											<span>Total Sell Qty</span>
											<span>:</span>
										</li>
										<li>{totalSellQty} cards </li>
									</div>

									<div className='grid grid-cols-2 list-none '>
										<li className='grid grid-cols-2 '>
											<span>Total Sell Amount</span>
											<span>:</span>
										</li>
										<li>
											{Number(totalSellAmount).toLocaleString('en-US', {
												style: 'currency',
												currency: 'BDT',
											})}
										</li>
									</div>

									<div className='grid grid-cols-2 list-none '>
										<li className='grid grid-cols-2 '>
											<span>Users</span>
											<span>:</span>
										</li>
										<li>
											{totalParticipatedUsers} users
											<Link
												to='/admin/share-cards-users'
												state={{ users }}
												className='ml-1 text-blue-600 '
											>
												<FiExternalLink className='inline-block text-xs' />
											</Link>{' '}
										</li>
									</div>
								</div>
								{/*End Personal Info */}

								<hr className='h-px my-2 bg-gray-600 border-0' />

								{/* Balance Info */}
								<div className='space-y-1 text-xs '>
									<h2 className='text-xs italic text-center text-yellow-500'>
										Today Sell Information
									</h2>
									<div className='grid grid-cols-2 list-none '>
										<li className='grid grid-cols-2 '>
											<span>Total Sell Qty</span>
											<span>:</span>
										</li>
										<li>{todaySellQty} cards </li>
									</div>
									<div className='grid grid-cols-2 list-none '>
										<li className='grid grid-cols-2 '>
											<span>Total Sell Amount</span>
											<span>:</span>
										</li>
										<li>
											{Number(todaySellAmount).toLocaleString('en-US', {
												style: 'currency',
												currency: 'BDT',
											})}
										</li>
									</div>
								</div>
								{/*End balance Info */}

								{/* <hr className='h-px my-2 bg-gray-600 border-0' /> */}
							</div>

							<div>
								<h2 className='text-xs italic text-center text-indigo-600'>
									Add Profit to Share Card
								</h2>
								<div className='grid gap-2 my-2 md:grid-cols-2'>
									<TextField
										id='outlined-basic'
										label='Profit'
										variant='outlined'
										type='number'
										size='small'
										value={amount}
										onChange={(e) => setAmount(e.target.value)}
										fullWidth
									/>
									<button
										className={`w-full bg-fuchsia-800 py-1 rounded-lg text-center disabled:cursor-not-allowed disabled:opacity-50`}
										disabled={addLoading || amount <= 0 || amount === ''}
										onClick={handleProfit}
									>
										{addLoading ? <ButtonLoader /> : 'Submit'}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</DashboardLayout>
	);
};

export default AdminShares;
