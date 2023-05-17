import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { TextField } from '@mui/material';
import GoBack from '../../../global/GoBack';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	useGetUserByPhoneQuery,
	useSendMoneyMutation,
} from '../../../features/auth/authApi';
import { toast } from 'react-toastify';
import ButtonLoader from '../../../global/ButtonLoader';

const SendMoney = () => {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const [sendMoney, { isError, isLoading, error, isSuccess }] =
		useSendMoneyMutation();
	const [amount, setAmount] = useState(0);
	const [phone, setPhone] = useState('');
	const [find, setFind] = useState(false);

	const {
		data,
		isError: isFindError,
		isLoading: findLoading,
		isSuccess: findSuccess,
		error: findError,
	} = useGetUserByPhoneQuery(phone, { skip: !find });
	const { user: findUser } = data || {};

	// handle select method

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!user?.is_active) {
			toast.warning('Please active your account first');
			return;
		}
		if (!findUser?.is_active) {
			toast.warning('Receiver account is not active');
			return;
		}
		if (findUser?._id === user?._id) {
			toast.warning('You can not send money to yourself');
			return;
		}

		sendMoney({ amount, phone });
	};
	useEffect(() => {
		if (isSuccess) {
			toast.success('Convert Successfull');
			navigate('/user-dashboard');
		}
		if (isError) {
			if (error.status === 901) {
				toast.warning('Please try again!');
			} else {
				toast.error(error?.data?.message);
			}
		}
	}, [isSuccess, isError, error, navigate]);

	return (
		<Layout>
			<div className='flex items-center justify-center mx-1 '>
				<div className='w-full md:w-7/12 mx-auto bg-slate-800 rounded-lg p-2 space-y-4 '>
					<div>
						<h1 className='text-center text-sm flex flex-col'>
							<span>Send money </span>
						</h1>
						<div>
							<p className=' text-center text-xs text-green-500 italic'>
								You can send money to your friend
							</p>
						</div>
					</div>
					{!user?.is_active ? (
						<p className=' text-yellow-500 flex flex-col text-xs text-center italic'>
							Your account is not active. Please active your account first.
						</p>
					) : (
						<div>
							<div className=' space-y-3 '>
								<div>
									<TextField
										id='phone'
										label='Enter phone number to send money'
										variant='outlined'
										type='text'
										fullWidth
										size='small'
										required
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
									/>
									{/* <p className=' text-[0.5rem] text-yellow-500 text-center mt-1'>
										Minimum amount is &#8354; 50{' '}
									</p> */}
								</div>

								{findLoading ? (
									<div className='flex justify-center'>
										<ButtonLoader />
									</div>
								) : (
									<div>
										{isFindError && (
											<div className=' border border-slate-600 my-2 py-2 rounded-md'>
												<p className='text-red-500 text-center text-xs'>
													{findError?.data?.message}! Please try again.
												</p>
											</div>
										)}
										{findSuccess ? (
											<div className=' space-y-4'>
												<div className=' text-xs border border-slate-600 my-2 px-2 py-2 rounded-md'>
													<h2 className=' text-center text-xs mb-2 text-green-500'>
														Receiver Info
													</h2>
													<div className=' text-gray-400 grid grid-cols-2 list-none'>
														<li className='grid grid-cols-2 '>
															<span>Name</span>
															<span>:</span>
														</li>
														<li>
															<span>{findUser?.name}</span>
														</li>
													</div>
													<div className='text-gray-400 grid grid-cols-2 list-none'>
														<li className='grid grid-cols-2 '>
															<span>Phone</span>
															<span>:</span>
														</li>
														<li>
															<span>{findUser?.phone}</span>
														</li>
													</div>
												</div>

												<div>
													<TextField
														id='amount'
														label='Amount'
														variant='outlined'
														type='number'
														fullWidth
														size='small'
														required
														value={amount}
														onChange={(e) => setAmount(e.target.value)}
													/>
													<p className=' text-[0.5rem] text-yellow-500 text-center mt-1'>
														Minimum amount is &#8354; 50{' '}
													</p>
												</div>
											</div>
										) : (
											<button
												className={`w-full bg-fuchsia-800 py-1 rounded-lg text-center disabled:cursor-not-allowed disabled:opacity-50`}
												onClick={() => setFind(true)}
											>
												Find
											</button>
										)}
									</div>
								)}

								<button
									className={`w-full bg-fuchsia-800 py-1 rounded-lg text-center disabled:cursor-not-allowed disabled:opacity-50`}
									disabled={amount < 50 || !user?.is_active}
									onClick={handleSubmit}
								>
									{isLoading ? <ButtonLoader /> : 'Send'}
								</button>
							</div>
						</div>
					)}

					<div className='flex flex-col items-center justify-center'>
						<GoBack />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default SendMoney;
