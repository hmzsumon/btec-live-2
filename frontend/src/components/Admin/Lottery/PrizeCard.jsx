import React from 'react';
import { formatDate } from '../../../utils/functions';
import PrizeList from '../../User/Lottery/PrizeList';

const PrizeCard = ({ title = 'Admin Info', draw }) => {
	return (
		<div className='my-4 text-xs'>
			<h2 className=' text-center text-sm italic text-green-500 my-2'>
				<span className='text-orange-500'>{draw?.title}</span> Prize Info
			</h2>
			<div className='border px-3 py-2 space-y-4'>
				{/* Withdraw Date */}

				<div className=' space-y-1'>
					<div className=' grid grid-cols-2 text-red-400 list-none'>
						<li className='grid grid-cols-2 '>
							<span>Prize Cost</span>
							<span>:</span>
						</li>
						<li>&#8354; {Number(draw?.prize_cost).toLocaleString()}</li>
					</div>
					<div className=' grid grid-cols-2 list-none'>
						<li className='grid grid-cols-2 '>
							<span>Prize Qty</span>
							<span>:</span>
						</li>
						<li>
							{draw?.prize_qty} <sup className='text-blue-500'>*</sup>
						</li>
					</div>

					<div className=' grid grid-cols-2 list-none'>
						<li className='grid grid-cols-2 '>
							<span>Tickets Qty</span>
							<span>:</span>
						</li>
						<li>{draw?.ticket_qty}</li>
					</div>

					<div className=' grid grid-cols-2 list-none'>
						<li className='grid grid-cols-2 '>
							<span>
								Remaining Tickets <sup className='text-blue-500'>*</sup>
							</span>
							<span>:</span>
						</li>
						<li>{draw?.remaining_tickets}</li>
					</div>

					<div className=' grid grid-cols-2 list-none'>
						<li className='grid grid-cols-2 '>
							<span>Next Draw Date</span>
							<span>:</span>
						</li>
						<li className='text-[0.6rem]'>
							<span>{formatDate(draw?.draw_date)} </span>
							<sup className='text-blue-600'>{draw?.draw_time}</sup>
						</li>
					</div>

					<div className=' grid grid-cols-2 list-none'>
						<li className='grid grid-cols-2 '>
							<span>Participants</span>
							<span>:</span>
						</li>
						<li>{draw?.participants_count}</li>
					</div>
				</div>

				<hr className='h-[0.5px] my-2 bg-slate-700 border-0' />
				<div className=' my-6'>
					<PrizeList draw={draw} />
				</div>
			</div>
		</div>
	);
};

export default PrizeCard;
