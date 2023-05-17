import React from 'react';
import Layout from '../Layout/Layout';
import { formatDate } from '../../../utils/functions';
import GoBack from '../../../global/GoBack';
import Countdown from '../../../global/Countdown';
import { useGetActiveDrawQuery } from '../../../features/lottery/lotteryApi';
import PrizeList from './PrizeList';

const PrizeChart = () => {
	const { data } = useGetActiveDrawQuery();
	const { draw } = data || 0;
	console.log(draw);
	const { draw_no, draw_date, draw_time } = draw || 0;
	return (
		<Layout>
			<div className='flex items-center justify-center mx-1 '>
				<div className='w-full md:w-7/12 mx-auto bg-slate-800 rounded-lg p-2 space-y-4 '>
					<div>
						<h1 className='text-center text-sm  '>
							Contest No: <span className=' text-green-500'>000{draw_no}</span>{' '}
							Prize Chart
						</h1>
						<div>
							<p className='text-fuchsia-500  text-xs text-center italic'>
								Draw Date: {formatDate(draw_date)} {draw_time}
							</p>
							<Countdown drawDate={draw?.draw_date} />
						</div>
					</div>
					<div>
						<PrizeList draw={draw} />
					</div>

					<div className='flex flex-col items-center justify-center'>
						<GoBack />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default PrizeChart;
