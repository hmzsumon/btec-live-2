import React from 'react';
import Layout from '../Layout/Layout';
import { useGetShareDetailsQuery } from '../../../features/shareCard/shareCardApi';
import { FadeLoader } from 'react-spinners';
import img from '../../../assets/img/bg-shape/section-title-img.png';
import CardDetails from './CardDetails';
import ShareCard from './ShareCard';

const MyShareCard = () => {
	const { data, isLoading, isError } = useGetShareDetailsQuery();
	const { shareCardDetails } = data || {};
	const { shareCards } = data || [];

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
				<div className='flex items-center justify-center mt-44 '>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='space-y-2 '>
					<div className='flex flex-col items-center space-y-2'>
						<p className='font-bold text-center text-orange-500 uppercase sub-title'>
							Share Card
						</p>
						<img src={img} alt='' className='w-56 ' />
						<h2 className='text-xs md:text-xs font-[600] text-gray-400'>
							Buy a share card and become a shareholder of the company.
						</h2>
					</div>
					<div>
						<CardDetails shareCardDetails={shareCardDetails} />
						<div className='grid grid-cols-1 gap-4 my-6 md:grid-cols-3'>
							{shareCards.map((share) => (
								<div
									className=' h-auto p-2 space-y-2 border rounded-[1.3rem] border-slate-600 share'
									key={share._id}
								>
									<ShareCard share={share} />
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default MyShareCard;
