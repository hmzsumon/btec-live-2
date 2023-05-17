import React from 'react';
import { formatDate } from '../../../utils/functions';

const DrawCard = ({ title = 'Admin Info', draw }) => {
	return (
		<div className='my-4 text-xs'>
			<h2 className=' text-center text-sm italic text-green-500 my-2'>
				<span className='text-orange-500'>{draw?.title}</span> Info
			</h2>
			<div className='border px-3 py-2 space-y-1'>
				{/* Withdraw Date */}
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Draw Title</span>
						<span>:</span>
					</li>
					<li>{draw?.title}</li>
				</div>
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Draw No</span>
						<span>:</span>
					</li>
					<li>{draw?.draw_no}</li>
				</div>

				{/* Profit Info */}
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Sold Tickets Qty</span>
						<span>:</span>
					</li>
					<li>{draw?.ticket_sold_qty}</li>
				</div>

				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Tickets Price</span>
						<span>:</span>
					</li>
					<li>&#8354; {draw?.ticket_price}</li>
				</div>
				<div className=' grid grid-cols-2 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Sold Tickets</span>
						<span>:</span>
					</li>
					<li>&#8354; {draw?.ticket_sold_amount}</li>
				</div>

				<hr className='h-[0.5px] my-2 bg-slate-700 border-0' />

				<div className=' grid grid-cols-2 text-green-500 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Profit</span>
						<span>:</span>
					</li>
					<li>
						<span>&#8354; {Number(draw?.profit).toLocaleString()} </span>
					</li>
				</div>

				<div className=' grid grid-cols-2 text-yellow-500 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Potential Profit</span>
						<span>:</span>
					</li>
					<li>
						<span>
							&#8354; {Number(draw?.potential_profit).toLocaleString()}{' '}
						</span>
					</li>
				</div>

				<div className=' grid grid-cols-2 text-red-500 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Total Cost</span>
						<span>:</span>
					</li>
					<li>
						<span>&#8354; {Number(draw?.total_cost).toLocaleString()} </span>
					</li>
				</div>

				<div className=' grid grid-cols-2 text-red-400 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Prize Cost</span>
						<span>:</span>
					</li>
					<li>&#8354; {Number(draw?.prize_cost).toLocaleString()}</li>
				</div>

				<div className=' grid grid-cols-2 text-red-400 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Box Cost</span>
						<span>:</span>
					</li>
					<li>
						<span>
							&#8354; {Number(draw?.lucky_box_cost).toLocaleString()}{' '}
						</span>
					</li>
				</div>

				<div className=' grid grid-cols-2 text-red-400 list-none'>
					<li className='grid grid-cols-2 '>
						<span>Other Cost</span>
						<span>:</span>
					</li>
					<li>
						<span>&#8354; {Number(draw?.other_cost).toLocaleString()} </span>
					</li>
				</div>

				{/* End Profit Info */}
				<hr className='h-[0.5px] my-2 bg-slate-700 border-0' />

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
						<span>Participants</span>
						<span>:</span>
					</li>
					<li>{draw?.participants_count}</li>
				</div>
			</div>
		</div>
	);
};

export default DrawCard;
