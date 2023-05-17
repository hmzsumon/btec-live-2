import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import img from '../../../assets/img/bg-shape/section-title-img.png';

import FadeLoader from 'react-spinners/FadeLoader';
import {
	useBuyShareCardMutation,
	useGetShareCardsQuery,
} from '../../../features/shareCard/shareCardApi';
import ShareCard from './ShareCard';
import { BsThreeDots } from 'react-icons/bs';
import RankList from './RankList';
import { toast } from 'react-toastify';
import RankCard from './RankCard';

const Shares = () => {
	const [limit, setLimit] = useState(9);
	const { data, isError, isLoading } = useGetShareCardsQuery(limit);
	const { shareCards } = data || [];
	const [
		buyShareCard,
		{ isLoading: buyLoading2, isError: buyError, isSuccess, error },
	] = useBuyShareCardMutation();

	const [buyLoading, setBuyLoading] = useState(false);

	// handle limit
	const handleLimit = (e) => {
		setLimit((prev) => prev + 6);
	};

	// handle buy share card
	const handleBuyShareCard = async (id) => {
		setBuyLoading(true);
		buyShareCard(id);
		console.log(buyLoading);
		setTimeout(() => {
			setBuyLoading(false);
			console.log(buyLoading);
		}, 5000);
	};

	useEffect(() => {
		if (buyError) {
			if (error.status === 901) {
				toast.warning('Please try again!');
			} else {
				toast.error(error?.data?.message);
			}
		}

		if (isSuccess) {
			toast.success('Share Card bought Successfully');
		}
	}, [buyError, error, isSuccess]);

	if (isError) {
		return (
			<Layout>
				<div className='flex items-center justify-center mt-44 '>
					<h1 className='text-2xl text-yellow-500'>
						Share Cards not available at this time. Please try again later!
					</h1>
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			{isLoading ? (
				<div className='flex items-center justify-center mt-40 '>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='p-1 '>
					<div className='flex flex-col items-center space-y-2'>
						<p className='font-bold text-center text-orange-500 uppercase sub-title'>
							Share Card
						</p>
						<img src={img} alt='' className='w-56 ' />
						<h2 className='text-xs md:text-xs font-[600] text-gray-400'>
							Buy a share card and become a shareholder of the company.
						</h2>
					</div>
					<div className='mx-auto my-2 md:w-1/2'>
						<p className='italic text-[0.6rem] text-justify text-orange-500 '>
							Dear customer, Lottowin24 has arranged a share card for you. By
							purchasing a share card you will become a shareholder of the
							company. 1% of the profits of each draw of the company will be
							paid to each shareholder.
						</p>
					</div>

					<div>
						<RankCard />
					</div>

					{buyLoading ? (
						<div className='flex items-center justify-center w-full h-screen'>
							<FadeLoader color={'#fbbf24'} />
						</div>
					) : (
						<div className='grid grid-cols-1 gap-4 my-6 md:grid-cols-3'>
							{shareCards.map((share) => (
								<div
									className=' h-auto p-2 space-y-2  rounded-[1.3rem]  share'
									key={share._id}
								>
									<ShareCard
										share={share}
										handleBuyShareCard={handleBuyShareCard}
									/>
								</div>
							))}
						</div>
					)}

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
		</Layout>
	);
};

export default Shares;

// Algerian;
