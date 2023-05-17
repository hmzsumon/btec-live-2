import React from 'react';
import { formatDate } from '../../../utils/functions';
import GoBack from '../../../global/GoBack';

const DepositDetails = ({ deposit }) => {
	const {
		status,
		name,
		amount,
		method,
		transactionId,
		createdAt,
		screen_shot,
	} = deposit || {};
	return (
		<div>
			<div className=''>
				<div className='p-2 mx-auto my-4 rounded bg-slate-800'>
					<div className=''>
						<h1 className='my-4 space-x-2 text-sm font-bold text-center text-gray-100'>
							<span
								className={`capitalize mr-2 ${
									status === 'pending' ? 'text-yellow-500' : 'text-green-500'
								}`}
							>
								{status}
							</span>
							Deposit Details
						</h1>

						<div className='space-y-2 '>
							<div className='p-3 border'>
								<div className='space-y-1 text-xs '>
									<h2 className='text-xs italic text-center text-indigo-600'>
										Deposit Information:
									</h2>
									<div className='grid grid-cols-2 list-none '>
										<li className='grid grid-cols-2 '>
											<span>Full Name</span>
											<span>:</span>
										</li>
										<li>{name}</li>
									</div>

									<div className='grid grid-cols-2 list-none '>
										<li className='grid grid-cols-2 '>
											<span>Amount</span>
											<span>:</span>
										</li>
										<li>{amount}&#8354;</li>
									</div>
									<div className='grid grid-cols-2 list-none '>
										<li className='grid grid-cols-2 '>
											<span>Method</span>
											<span>:</span>
										</li>
										<li>{method?.name}</li>
									</div>
									<div className='grid grid-cols-2 list-none '>
										<li className='grid grid-cols-2'>
											<span>
												Your {method?.name ? method?.name : 'Method'} Number
											</span>
											<span>:</span>
										</li>
										<li className='text-[0.6rem] '>
											{method?.send_account
												? method?.send_account
												: 'No Number'}
										</li>
									</div>
									<div className='grid grid-cols-2 list-none '>
										<li className='grid grid-cols-2 '>
											<span>Transaction Id</span>
											<span>:</span>
										</li>
										<li>{transactionId}</li>
									</div>
									<div className='grid grid-cols-2 list-none '>
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
									<div className='grid grid-cols-2 list-none '>
										<li className='grid grid-cols-2 '>
											<span>Request At</span>
											<span>:</span>
										</li>
										<li>{formatDate(createdAt)}</li>
									</div>
								</div>
							</div>
							<div className='p-3 border'>
								<h2 className='text-xs italic text-center'>
									Screenshot of{' '}
									<span className='text-green-500'>
										{method?.name ? method?.name : 'Method'}
									</span>{' '}
									payment{' '}
								</h2>
								<div className='w-[50%] mx-auto my-2'>
									<img
										src={screen_shot ? screen_shot.url : ''}
										alt='screenshot'
										className='w-full '
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='flex flex-col items-center justify-center my-4'>
						<GoBack />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DepositDetails;
