import React from 'react';
import { formatDate } from '../../../utils/functions';
import GoBack from '../../../global/GoBack';

const Details = ({ deposit }) => {
	const { status, name, amount, method, transactionId, createdAt } =
		deposit || {};
	return (
		<div>
			<div className=''>
				<div className='  mx-auto p-2  rounded bg-slate-800 my-4'>
					<div className=''>
						<h1 className='text-sm text-center my-4 space-x-2 font-bold text-gray-100'>
							<span
								className={`capitalize mr-2 ${
									status === 'pending' ? 'text-yellow-500' : 'text-green-500'
								}`}
							>
								{status}
							</span>
							Deposit Details
						</h1>
						{status === 'pending' && (
							<p className='text-xs text-center text-gray-400 my-1'>
								<span>
									Your deposit is pending. Please wait for the admin to approve.
									We will notify you once your deposit is approved.
								</span>
							</p>
						)}

						<div className='border p-3'>
							<div className=' text-xs space-y-1'>
								<h2 className='text-center text-xs italic text-indigo-600'>
									Deposit Information:
								</h2>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Full Name</span>
										<span>:</span>
									</li>
									<li>{name}</li>
								</div>

								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Amount</span>
										<span>:</span>
									</li>
									<li>{amount}&#8354;</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Method</span>
										<span>:</span>
									</li>
									<li>{method?.name}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2'>
										<span>
											Your {method?.name ? method?.name : 'Method'} Number
										</span>
										<span>:</span>
									</li>
									<li className='text-[0.6rem] '>
										{method?.send_account ? method?.send_account : 'No Number'}
									</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Transaction Id</span>
										<span>:</span>
									</li>
									<li>{transactionId}</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Paid At</span>
										<span>:</span>
									</li>
									<li>
										{method?.paidAt
											? formatDate(method?.paidAt)
											: 'Not Paid Yet'}
									</li>
								</div>
								<div className=' grid grid-cols-2 list-none'>
									<li className='grid grid-cols-2 '>
										<span>Request At</span>
										<span>:</span>
									</li>
									<li>{formatDate(createdAt)}</li>
								</div>
							</div>
						</div>
					</div>
					<div className='flex flex-col my-4 items-center justify-center'>
						<GoBack />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Details;
