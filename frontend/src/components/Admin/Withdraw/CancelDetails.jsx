import React from 'react';
import { formatDate } from '../../../utils/functions';

const CancelDetails = ({ withdraw }) => {
	return (
		<div className='my-4 text-xs'>
			<h2 className='my-2 text-sm italic text-center text-green-500 '>
				Cancel Info
			</h2>
			<div className='px-3 py-2 space-y-1 border'>
				{/* Withdraw Date */}
				<div className='grid grid-cols-2'>
					<p> Cancel Date:</p>
					<p>{formatDate(withdraw?.cancelled_at)}</p>
				</div>
				<div className='grid grid-cols-2'>
					<p>Cancel By:</p>
					<p>Admin</p>
				</div>

				<div className='grid grid-cols-2'>
					<p>Cancel Reason:</p>
					<p className='italic text-red-500 '>{withdraw?.cancelled_reason}</p>
				</div>

				<div className='grid grid-cols-2'>
					<p>Status:</p>
					<p
						className={`${withdraw.status === 'approved' && 'text-green-500'} ${
							withdraw.status === 'pending' && 'text-red-500'
						} ${withdraw.status === 'cancelled' && 'text-orange-500'}`}
					>
						{withdraw?.status}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CancelDetails;
