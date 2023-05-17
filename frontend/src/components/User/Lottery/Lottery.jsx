import React, { useState } from 'react';
import { useGetLotteriesQuery } from '../../../features/lottery/lotteryApi';
import FadeLoader from 'react-spinners/FadeLoader';
import LotteryContent from './LotteryContent';
import LotteryTop from './LotteryTop';
import { BsThreeDots } from 'react-icons/bs';
import LotteryBanner from './LotteryBanner';
import Layout from '../Layout/Layout';

const Lottery = () => {
	const [limit, setLimit] = useState(9);
	const { data, isError, isLoading } = useGetLotteriesQuery(limit);
	const { tickets } = data || [];

	// handle limit
	const handleLimit = (e) => {
		setLimit((prev) => prev + 6);
	};

	return (
		<Layout>
			{isLoading ? (
				<div className='flex items-center justify-center mt-44 '>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<>
					{isError ? (
						<div className='flex items-center justify-center mt-44 '>
							<h1 className='text-2xl text-yellow-500'>
								Tickets not available at this time. Please try again later!
							</h1>
						</div>
					) : (
						<div className='pb-10 space-y-2 '>
							<LotteryTop />
							<LotteryBanner tickets={tickets} />

							<LotteryContent tickets={tickets} />
							<div
								className='flex items-center justify-center'
								onClick={handleLimit}
							>
								<button className='flex items-center mt-10 justify-center underline hover:text-[#33b5f7]   mx-auto   text-gray-100  text-center  '>
									Load More <BsThreeDots className='text-xl' />
								</button>
							</div>
						</div>
					)}
				</>
			)}
		</Layout>
	);
};

export default Lottery;
