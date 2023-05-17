import React from 'react';
import { formatDate } from '../../../utils/functions';

const WithdrawDetails = ({ withdraw, withdrawDetails }) => {
	const {
		status,
		name,
		email,
		phone,
		amount,
		method,
		createdAt,
		net_amount,
		charge,
	} = withdraw || {};

	const { last_withdraw_date } = withdrawDetails || {};
	return (
		<div className='my-4 text-xs'>
			<div className='border px-3 py-2 space-y-1'>
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Full Name</span>
						<span>:</span>
					</li>
					<li>{name}</li>
				</div>
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Email</span>
						<span>:</span>
					</li>
					<li>{email}</li>
				</div>
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Phone</span>
						<span>:</span>
					</li>
					<li>{phone}</li>
				</div>
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Amount</span>
						<span>:</span>
					</li>
					<li>
						{Number(amount).toLocaleString('en-US', {
							style: 'currency',
							currency: 'BDT',
						})}
					</li>
				</div>
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Charge</span>
						<span>:</span>
					</li>
					<li>
						{Number(charge).toLocaleString('en-US', {
							style: 'currency',
							currency: 'BDT',
						})}
					</li>
				</div>
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Net Amount </span>
						<span>:</span>
					</li>
					<li>
						{Number(net_amount).toLocaleString('en-US', {
							style: 'currency',
							currency: 'BDT',
						})}
					</li>
				</div>
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Status</span>
						<span>:</span>
					</li>
					<li className=' capitalize'>
						{status === 'approved' && (
							<span className='text-green-500'>{status}</span>
						)}
						{status === 'pending' && (
							<span className='text-red-500'>{status}</span>
						)}
					</li>
				</div>
				{/* Withdraw Date */}
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Date</span>
						<span>:</span>
					</li>
					<li>{formatDate(createdAt)}</li>
				</div>
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Method</span>
						<span>:</span>
					</li>
					<li>{method?.name}</li>
				</div>
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>{method?.name} number</span>
						<span>:</span>
					</li>
					<li>{method?.number}</li>
				</div>
				<hr className=' h-px my-8 bg-gray-200 border-0 dark:bg-gray-700' />
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Last Withdraw</span>
						<span>:</span>
					</li>
					<li>
						{Number(withdrawDetails?.last_withdraw_amount).toLocaleString(
							'en-US',
							{
								style: 'currency',
								currency: 'BDT',
							}
						)}
					</li>
				</div>
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Total Withdraw</span>
						<span>:</span>
					</li>
					<li>
						{Number(withdrawDetails?.total_withdraw).toLocaleString('en-US', {
							style: 'currency',
							currency: 'BDT',
						})}
					</li>
				</div>
				{last_withdraw_date && (
					<div className=' grid grid-cols-2 list-none'>
						<li className='grid grid-cols-2 '>
							<span>Last Withdraw Date</span>
							<span>:</span>
						</li>
						<li>{formatDate(createdAt)}</li>
					</div>
				)}
			</div>
		</div>
	);
};

export default WithdrawDetails;
