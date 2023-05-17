import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { TextField } from '@mui/material';
import GoBack from '../../../global/GoBack';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNewConvertMutation } from '../../../features/auth/authApi';
import { toast } from 'react-toastify';
import ButtonLoader from '../../../global/ButtonLoader';

const Convert = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { type } = location.state;
	const { user } = useSelector((state) => state.auth);
	const [newConvert, { isError, isLoading, error, isSuccess }] =
		useNewConvertMutation();

	const [amount, setAmount] = useState(0);
	// handle select method

	const handleSubmit = (e) => {
		e.preventDefault();
		if (type === 'bonus' && amount > user.b_bonus) {
			return toast.error('Insufficient Balance');
		}
		if (type === 'withdraw' && amount > user.w_referral) {
			return toast.error('Insufficient Balance');
		}
		newConvert({ amount, type });
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
							<span>Convert </span>
						</h1>
						<div>
							{type === 'bonus' && (
								<p className='text-fuchsia-500 flex flex-col text-xs text-center italic'>
									You can convert your bonus balance to main balance
									<span className=' text-[0.6rem] italic text-green-500'>
										Your bonus balance is{' '}
										<span className=' text-orange-500'>
											&#8354; {Number(user?.b_bonus).toFixed(2)}
										</span>
										<sup className='text-red-500'> C-5%</sup>
									</span>
								</p>
							)}

							{type === 'withdraw' && (
								<p className=' text-yellow-500 flex flex-col text-xs text-center italic'>
									You can convert your withdraw balance to main balance
									<span className=' text-[0.6rem] italic text-green-500'>
										Your bonus balance is{' '}
										<span className=' text-orange-500'>
											&#8354; {Number(user?.w_balance).toFixed(2)}
										</span>
										<sup className='text-red-500'> C-10%</sup>
									</span>
								</p>
							)}
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

								<button
									className={`w-full bg-fuchsia-800 py-1 rounded-lg text-center disabled:cursor-not-allowed disabled:opacity-50`}
									disabled={amount < 50 || !user?.is_active}
									onClick={handleSubmit}
								>
									{isLoading ? <ButtonLoader /> : 'Convert'}
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

export default Convert;
