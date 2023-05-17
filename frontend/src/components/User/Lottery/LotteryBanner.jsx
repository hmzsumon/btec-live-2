import React from 'react';
import PrizeList from './PrizeList';
import { NavLink } from 'react-router-dom';
import { useGetActiveDrawQuery } from '../../../features/lottery/lotteryApi';
import Countdown from '../../../global/Countdown';

const LotteryBanner = () => {
	const { data } = useGetActiveDrawQuery();
	const { draw } = data || 0;
	return (
		<div className='w-full px-2 py-6 mx-auto'>
			<div className='grid items-center justify-center w-full grid-cols-1 gap-4 '>
				<div>
					<div className='grid items-center gap-2'>
						<NavLink to='/my-tickets'>
							<button className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'>
								My Tickets
							</button>
						</NavLink>

						<NavLink to='/draws'>
							<button className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'>
								Show Result
							</button>
						</NavLink>

						<button className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'>
							Total Sold Tickets: {draw?.ticket_sold_qty}
						</button>
						<Countdown drawDate={draw?.draw_date} />
					</div>
				</div>
				<div>
					<h1 className='mb-2 text-center text-orange-500 '>Prize List</h1>
					<PrizeList draw={draw} />
				</div>
			</div>
		</div>
	);
};

export default LotteryBanner;
