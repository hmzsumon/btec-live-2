import React from 'react';
import { formatDate } from '../../../utils/functions';
import GoBack from '../../../global/GoBack';

const Details = ({ withdraw }) => {
	const {
		status,
		name,
		amount,
		method,
		approved_method,
		createdAt,
		net_amount,
		charge,
		approved_at,
	} = withdraw || {};
	const { name: app_name, number, tnx_id } = approved_method || {};
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
							Withdraw Details
						</h1>
						{status === 'pending' && (
							<p className='text-xs text-center text-gray-400 my-1'>
								<span>
									Your withdraw is pending. Please wait for the admin to
									approve. We will notify you once your deposit is approved.
								</span>
							</p>
						)}

						<div className='border p-3'>
							<div className=' text-xs space-y-1'>
								<h2 className='text-center text-xs italic text-indigo-600'>
									Withdraw Information:
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
										<sup className='text-[0.5rem] text-orange-500'> 10%</sup>
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
										{method?.number ? method?.number : 'No Number'}
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

							{status === 'approved' && (
								<div className='text-xs'>
									<hr className='h-px bg-gray-700 my-4 border-0' />
									<div className=' grid grid-cols-2 list-none'>
										<li className='grid grid-cols-2 '>
											<span>Paid at</span>
											<span>:</span>
										</li>
										<li>{formatDate(approved_at)}</li>
									</div>
									<div className=' grid grid-cols-2 list-none'>
										<li className='grid grid-cols-2 '>
											<span>Paid by</span>
											<span>:</span>
										</li>
										<li>{app_name}</li>
									</div>
									<div className=' grid grid-cols-2 list-none'>
										<li className='grid grid-cols-2 '>
											<span>{app_name} number</span>
											<span>:</span>
										</li>
										<li>{number}</li>
									</div>

									<div className=' grid grid-cols-2 list-none'>
										<li className='grid grid-cols-2 '>
											<span>{app_name} Tnx ID </span>
											<span>:</span>
										</li>
										<li>{tnx_id}</li>
									</div>
								</div>
							)}
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
