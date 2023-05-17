import React from 'react';

const CardDetails = ({ shareCardDetails }) => {
	const {
		name,
		status,
		total_card_qty,
		total_card_amount,
		total_profit,
		total_sold_card_qty,
		total_sold_card_amount,
		total_sold_bonus,
	} = shareCardDetails || {};
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
								{name}
							</span>
							Share Details
						</h1>

						<div className='space-y-2 '>
							<div className='p-3 border'>
								<div className='space-y-1 text-xs '>
									<h2 className='text-xs italic text-center text-indigo-600'>
										Share Information:
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
											<span>Total Card</span>
											<span>:</span>
										</li>
										<li>{total_card_qty}</li>
									</div>
									<div className='grid grid-cols-2 list-none '>
										<li className='grid grid-cols-2 '>
											<span>Total Card Amount</span>
											<span>:</span>
										</li>
										<li>{total_card_amount} &#8354; </li>
									</div>
									<div className='grid grid-cols-2 list-none '>
										<li className='grid grid-cols-2'>
											<span>Total Profit </span>
											<span>:</span>
										</li>
										<li className='text-[0.6rem] '>{total_profit} &#8354; </li>
									</div>
									<div className='grid grid-cols-2 list-none '>
										<li className='grid grid-cols-2 '>
											<span>Total Sold Card </span>
											<span>:</span>
										</li>
										<li>{total_sold_card_qty} </li>
									</div>
									<div className='grid grid-cols-2 list-none '>
										<li className='grid grid-cols-2 '>
											<span>Total Sold Card Amount </span>
											<span>:</span>
										</li>
										<li>{total_sold_card_amount} &#8354; </li>
									</div>
									<div className='grid grid-cols-2 list-none '>
										<li className='grid grid-cols-2 '>
											<span>Total Sold Card Profit </span>
											<span>:</span>
										</li>
										<li>{total_sold_bonus} &#8354; </li>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardDetails;
