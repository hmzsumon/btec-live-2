import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Actions = ({
	id,
	deleteHandler,
	status,
	editRoute,
	cancelWithdraw,
	method,
}) => {
	const btnRef = useRef(null);
	const [open, setOpen] = useState(false);
	const [action, setAction] = useState('');

	const handleClose = () => {
		setOpen(false);
	};

	// handle change action
	const handleChangeAction = (action) => {
		if (action === 'delete') {
			setAction('delete');
		} else if (action === 'cancel') {
			setAction('cancel');
		}
		setOpen(true);
	};

	// handle action
	const handleAction = () => {
		if (action === 'delete') {
			deleteHandler(id);
		} else if (action === 'cancel') {
			cancelWithdraw(id);
		}
		setOpen(false);
	};

	return (
		<>
			<div className='flex items-center justify-between gap-3'>
				<Link
					to={`/user/card-details/${id}`}
					ref={btnRef}
					name='cancel'
					className='p-1 text-orange-500 bg-red-100 rounded-full hover:bg-red-200'
				>
					<VisibilityIcon />
				</Link>
				<button
					ref={btnRef}
					name='delete'
					onClick={() => handleChangeAction('delete')}
					className='p-1 text-red-600 bg-red-100 rounded-full disabled:cursor-not-allowed hover:bg-red-200'
					disabled
				>
					<LockIcon />
				</button>
			</div>

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
							{action === 'delete' ? 'Delete' : 'Cancel'}
						</span>{' '}
						This process cannot be undone.
					</p>
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
						className='px-6 py-2 ml-4 text-white bg-red-600 rounded shadow hover:bg-red-700'
					>
						Yeas
					</button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default Actions;
