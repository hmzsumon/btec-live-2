import React from 'react';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { useBuyTicketMutation } from '../../../features/lottery/lotteryApi';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { formatDate } from '../../../utils/functions';

const NewTicket = ({ ticket }) => {
	const [buyTicket, { isLoading, isError, isSuccess, error }] =
		useBuyTicketMutation();
	const {
		next_draw_date,
		_id,
		next_draw_time,
		ticketNumber,
		price,
		firstPrize,
	} = ticket;

	useEffect(() => {
		if (isError) {
			toast.error(error.data.message);
		}
		if (isSuccess) {
			toast.success('Ticket bought successfully');
		}
	}, [isError, error, isSuccess]);

	const array = Array.from(ticketNumber);
	return (
		<div className='new-ticket col-span-12 md:col-span-4 py-[0.3rem] h-full'>
			<div className='grid w-full grid-cols-3 '>
				<div className='flex items-center justify-center col-span-1'>
					<NavLink
						to='/prize-chart'
						className='px-3 py-1 text-xs bg-orange-500 rounded-md '
					>
						Prize Chart
					</NavLink>
				</div>
				<div className='col-span-2 pr-4 space-y-2 '>
					<p className=' text-[0.5rem] text-center text-gray-800 italic'>
						Contes No:0003
					</p>
					<div className='flex items-center justify-between text-xs '>
						<div className='mx-auto space-x-1 '>
							<span>No:</span>
							<span className='space-x-2 '>
								{array.map((number, i) => {
									return (
										<span
											key={i}
											className='w-4 h-4 text-xs text-center bg-red-600 rounded-full '
										>
											{number}
										</span>
									);
								})}
							</span>
						</div>
					</div>
					<div className='text-sm italic font-bold text-center text-orange-700 '>
						<p>1st Prize: &#8354; {Number(firstPrize).toLocaleString()}</p>
					</div>
					<div className='text-xs text-center '>
						<p>
							Draw Date: {formatDate(next_draw_date)}
							<sup className='text-gray-800'> {next_draw_time}</sup>
						</p>
					</div>
					<div className='flex items-center justify-around '>
						<button className='px-3 py-1 text-xs bg-orange-500 rounded-md cursor-none'>
							Price: &#8354; {price}
						</button>

						<button
							className='px-3 py-1 text-xs bg-orange-500 rounded-md '
							onClick={() => buyTicket(_id)}
							disabled={isLoading}
						>
							{isLoading ? (
								<BeatLoader size={8} color={'#fff'} />
							) : (
								'Buy Ticket'
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewTicket;
