import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { useCreateWithdrawMutation } from '../../../features/withdraw/withdrawApi';
import { toast } from 'react-toastify';
import { FadeLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import GoBack from '../../../global/GoBack';
import { TextField } from '@mui/material';
import { BiLock } from 'react-icons/bi';

const withdrawMethods = [
	{
		id: 4,
		name: 'Bkash',
		icon: './images/bKash.svg',
	},
	{
		id: 5,
		name: 'Rocket',
		icon: './images/rocket.svg',
	},
	{
		id: 9,
		name: 'Nagad',
		icon: './images/nagad.svg',
	},
];

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});
const NewWithdraw = () => {
	const navigate = useNavigate();
	const [createWithdraw, { isLoading, isSuccess, isError, error }] =
		useCreateWithdrawMutation();
	const [method, setMethod] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const [amount, setAmount] = React.useState(null);
	const [accountNumber, setAccountNumber] = React.useState('');

	const handleClickOpen = (m) => {
		setOpen(true);
		setMethod(m);
	};

	const handleClose = (c) => {
		setOpen(false);
	};

	const handleWithdraw = (e) => {
		e.preventDefault();

		const myForm = new FormData();
		myForm.append('amount', amount);
		myForm.append('number', accountNumber);
		myForm.append('method_name', method.name);
		createWithdraw(myForm);
		if (!isLoading) {
			setAmount(0);
			setAccountNumber('');
			setOpen(false);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Withdrawal request sent successfully');
			// navigate('/user/withdraws');
		}
		if (isError) {
			toast.error(error.data.message);

			if (error.status === 901) {
				toast.warning(error?.data?.message);
			} else if (error.status === 902) {
				toast.error(error?.data?.message);
			} else {
				toast.error(error?.data?.message);
			}
		}
	}, [isSuccess, isError, error, navigate]);

	return (
		<Layout>
			<div className='h-screen'>
				<div className='px-4 py-2 mx-auto rounded md:w-7/12 bg-slate-800'>
					<h1 className='my-2 flex flex-col text-center'>
						<span>Withdraw</span>
						<span className='text-[0.5rem] md:text-xs text-orange-500'>
							Create a new withdraw request with your preferred method
						</span>
					</h1>
					<div className='space-y-6 '>
						{withdrawMethods.map((method) => (
							<div key={method.id} className='space-y-4'>
								<img
									src={method.icon}
									alt={method.name}
									className='w-20 mx-auto bg-white rounded-md'
								/>
								<button
									className='w-full py-2 text-center bg-green-500 rounded'
									onClick={() => handleClickOpen(method)}
								>
									<span>{method.name}</span>
								</button>
							</div>
						))}
					</div>
					<div className='flex flex-col my-2 items-center justify-center'>
						<GoBack />
					</div>
				</div>
			</div>
			{/* Dialog */}
			<div>
				<Dialog
					open={open}
					TransitionComponent={Transition}
					keepMounted
					onClose={handleClose}
					aria-describedby='alert-dialog-slide-description'
				>
					<DialogContent className=' min-w-[295px]'>
						<DialogContentText id='alert-dialog-slide-description'>
							<img
								src={method?.icon}
								alt={method?.name}
								className='w-20 mx-auto bg-white rounded-md'
							/>
						</DialogContentText>
						<DialogTitle>{` Withdraw By ${method?.name}`}</DialogTitle>
						<form className='flex flex-col gap-3 ' onSubmit={handleWithdraw}>
							<small className='text-[0.6rem] text-center  italic text-gray-400'>
								Min Withdraw: 200 &#8354; & Max Withdraw: 10,000 &#8354;
							</small>

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

							<TextField
								id='amount'
								label={`Your ${method?.name} number`}
								variant='outlined'
								type='number'
								fullWidth
								size='small'
								required
								value={accountNumber}
								onChange={(e) => setAccountNumber(e.target.value)}
							/>

							<button
								className='py-2 gap-1 flex items-center justify-center bg-green-500 rounded-sm disabled:cursor-not-allowed disabled:bg-slate-500'
								type='submit'
								disabled={
									!amount ||
									!accountNumber ||
									isLoading ||
									amount < 200 ||
									amount > 10000
								}
							>
								{isLoading ? <FadeLoader color='#fff' /> : 'Confirm'}
								{true && <BiLock className=' text-xs text-red-500' />}
							</button>
						</form>
						<button
							className='w-full py-2 my-2 bg-orange-500 rounded-sm'
							onClick={handleClose}
						>
							Cancel
						</button>
						<p className='text-[0.5rem] font-bold text-center text-orange-400'>
							Withdraw Fee 10%
						</p>
						<p className='text-xs italic font-bold text-center text-yellow-500'>
							Process Time: Up to 4 hours
						</p>
					</DialogContent>
				</Dialog>
			</div>
		</Layout>
	);
};

export default NewWithdraw;
