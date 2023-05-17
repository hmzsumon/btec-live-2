import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import {
	useApproveWithdrawMutation,
	useCancelWithdrawMutation,
} from '../../../features/withdraw/withdrawApi';
import { BeatLoader } from 'react-spinners';

const Update = ({ id, methodName }) => {
	const [
		approveWithdraw,
		{ isLoading, isSuccess: a_success, isError: a_isError, error: a_error },
	] = useApproveWithdrawMutation();

	const [
		cancelWithdraw,
		{
			isLoading: c_loading,
			isSuccess: c_success,
			isError: c_isError,
			error: c_error,
		},
	] = useCancelWithdrawMutation();

	const btnRef = useRef(null);
	const [open, setOpen] = useState(false);
	const [action, setAction] = useState('');

	const [number, setNumber] = useState('');
	const [tnxId, settTnxId] = useState('');
	const [reason, setReason] = useState('');

	// handle change action
	const handleChangeAction = (action) => {
		if (action === 'approve') {
			setAction('approve');
		} else if (action === 'cancel') {
			setAction('cancel');
		}
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// delete handler
	const approveHandler = () => {
		approveWithdraw({ id, methodName, number, tnxId });
		setNumber('');
		settTnxId('');
	};

	// cancel withdraw
	const handleCancelWithdraw = () => {
		cancelWithdraw({ id, reason });
		setReason('');
	};

	// handle action
	const handleAction = () => {
		if (action === 'approve') {
			approveHandler();
		} else if (action === 'cancel') {
			handleCancelWithdraw();
		}
		setOpen(false);
	};

	// useEffect
	useEffect(() => {
		if (a_success) {
			toast.success('Withdraw Approved');
		}
		if (a_isError) {
			toast.error(a_error.data.message);
		}
		if (c_success) {
			toast.success('Withdraw Canceled Successfully');
		}
		if (c_isError) {
			toast.error(c_error.data.message);
		}
	}, [a_success, a_isError, a_error, c_success, c_isError, c_error]);

	return (
		<div className='grid grid-cols-2'>
			<button
				type='button'
				ref={btnRef}
				name='delete'
				onClick={() => handleChangeAction('approve')}
				className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
			>
				Approve
			</button>
			<button
				type='button'
				ref={btnRef}
				name='cancel'
				onClick={() => handleChangeAction('cancel')}
				className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
			>
				Canceled
			</button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
			>
				<DialogTitle id='alert-dialog-title'>{'Are you sure?'}</DialogTitle>

				<DialogContent>
					<p className='text-gray-500'>
						Do you really want to{' '}
						<span
							className={`${
								action === 'delete' ? 'text-red-500' : 'text-orange-500'
							}`}
						>
							{action === 'approve' ? 'Approve' : 'Cancel'}
						</span>{' '}
						This process cannot be undone.
					</p>
					{action === 'approve' && (
						<Box className='my-2 space-y-3'>
							<TextField
								id='outlined-basic'
								label={`${methodName} name`}
								variant='outlined'
								type='text'
								fullWidth
								size='small'
								defaultValue={methodName}
								inputProps={{ readOnly: true }}
							/>

							<TextField
								id='outlined-basic'
								label={`${methodName} number`}
								variant='outlined'
								type='text'
								fullWidth
								size='small'
								value={number}
								onChange={(e) => setNumber(e.target.value)}
							/>

							<TextField
								id='outlined-basic'
								label={`Transaction ID`}
								variant='outlined'
								type='text'
								fullWidth
								size='small'
								value={tnxId}
								onChange={(e) => settTnxId(e.target.value)}
							/>
						</Box>
					)}

					{action === 'cancel' && (
						<Box className='my-2 space-y-2'>
							<TextField
								id='outlined-basic'
								label='Please Enter Reason'
								variant='outlined'
								type='text'
								fullWidth
								size='small'
								value={reason}
								onChange={(e) => setReason(e.target.value)}
							/>
						</Box>
					)}
				</DialogContent>

				<DialogActions>
					<button
						onClick={handleClose}
						className='px-6 py-2 text-white bg-gray-400 rounded shadow hover:bg-gray-500'
					>
						No
					</button>
					<button
						onClick={handleAction}
						className='px-6 py-2 ml-4 text-white bg-red-600 rounded shadow hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50'
						disabled={
							action === 'approve' && (number === '' || tnxId === '')
								? true
								: action === 'cancel' && reason === ''
								? true
								: false
						}
					>
						{isLoading ? <BeatLoader color='#000' size={10} /> : 'Yes'}
					</button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Update;
