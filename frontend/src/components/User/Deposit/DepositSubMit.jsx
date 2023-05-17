import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import GoBack from '../../../global/GoBack';
import { SubmitDetails } from './SubmitDetails';
import { TextField } from '@mui/material';
import DefaultLoader from '../../../global/DefaultLoader';
import { toast } from 'react-toastify';
import { useNewDepositMutation } from '../../../features/deposit/depositApi';
import { useEffect } from 'react';
import SuccessMessage from '../../../global/SuccessMessage';
import Upload from './Upload';

const DepositSubMit = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [newDeposit, { data, isLoading, isError, isSuccess, error }] =
		useNewDepositMutation();
	const { amount, sMethod } = location.state;
	console.log('sMethod', sMethod);
	const [transactionId, setTransactionId] = useState('');
	const [accountNumber, setAccountNumber] = useState('');
	const [success, setSuccess] = useState(false);
	const [image, setImage] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('amount', amount);
		formData.append('method_name', sMethod.name);
		formData.append('send_account', accountNumber);
		formData.append('receive_account', sMethod.number);
		formData.append('type', sMethod.type);
		formData.append('transactionId', transactionId);
		formData.append('image', image);
		newDeposit(formData);
	};

	useEffect(() => {
		if (isError) {
			toast.error(error.data.message);
		}
		if (isSuccess) {
			toast.success('Deposit Successful');
			setSuccess(true);
			setTimeout(() => {
				setSuccess(false);
				navigate('/user-dashboard');
			}, 5000);
		}
	}, [isSuccess, isError, error, navigate]);

	if (success) {
		return (
			<Layout>
				<SuccessMessage message={data?.message} />
			</Layout>
		);
	}
	return (
		<Layout>
			{isLoading ? (
				<DefaultLoader />
			) : (
				<div className='flex items-center justify-center mx-1 '>
					<div className='w-full md:w-7/12 mx-auto bg-slate-800 rounded-lg p-2 space-y-4 '>
						<h2 className='text-center text-sm'>
							<span>Recharge Details</span>
						</h2>
						<SubmitDetails amount={amount} sMethod={sMethod} />

						<div className=' space-y-4'>
							<TextField
								id='number'
								label={'Enter ' + sMethod.name + ' Number'}
								variant='outlined'
								type='text'
								value={accountNumber}
								onChange={(e) => setAccountNumber(e.target.value)}
								fullWidth
								size='small'
								required
							/>
							<TextField
								id='transactionId'
								label='Enter Transaction ID'
								variant='outlined'
								type='text'
								value={transactionId}
								onChange={(e) => setTransactionId(e.target.value)}
								fullWidth
								size='small'
								required
							/>
						</div>

						<Upload image={image} setImage={setImage} />

						<button
							className={`w-full py-1 bg-fuchsia-800 rounded-lg text-center disabled:cursor-not-allowed disabled:opacity-50`}
							onClick={handleSubmit}
							disabled={!transactionId || !accountNumber || !image}
						>
							<span className='text-sm'>Submit</span>
						</button>

						<div className='flex flex-col items-center justify-center'>
							<GoBack />
						</div>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default DepositSubMit;
