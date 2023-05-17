import React from 'react';

export const SubmitDetails = ({ amount, sMethod }) => {
	const { name, number, type } = sMethod;
	return (
		<div>
			<div className=' text-xs space-y-2 w-full rounded-lg border-slate-600  mx-auto border p-2'>
				<div className='grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Amount</span>
						<span>:</span>
					</li>
					<li>&#8354; {amount}</li>
				</div>
				<div className='grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Method</span>
						<span>:</span>
					</li>
					<li>{name}</li>
				</div>
				<div className='grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Number</span>
						<span>:</span>
					</li>
					<li className='flex italic flex-col'>
						<span>{number}</span>
						{type === 'personal' && (
							<span className='text-[0.6rem] capitalize text-yellow-500'>
								( please send money to this{' '}
								<span className='text-green-500'>{name}</span> personal number.
								)
							</span>
						)}
						{type === 'agent' && (
							<span className='text-[0.6rem] text-yellow-500'>
								( please cash out to this{' '}
								<span className='text-green-500'>{name}</span> agent number. )
							</span>
						)}
					</li>
				</div>
			</div>
			<p className='text-xs text-center  text-yellow-500 italic mt-1'>
				Not: Please enter Reference (1xluck24).
			</p>
		</div>
	);
};
