import React, { useEffect } from 'react';
import CardNo from './CardNo';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { useBuyShareCardMutation } from '../../../features/shareCard/shareCardApi';
import Logo from '../../../assets/img/lotto-wi-logo.png';

const ShareCard = ({ share, handleBuyShareCard }) => {
	return (
		<div className='py-2 space-y-3'>
			<div className='flex items-center justify-between'>
				<div className='w-16'>
					<img src={Logo} alt='Lotto Win' />
				</div>
				<div>
					<h1 className='text-2xl font-bold text-center text-white uppercase md:text-3xl '>
						Lotto Win 24
					</h1>
				</div>
				<div className='w-16'>
					<img src={Logo} alt='Lotto Win' />
				</div>
			</div>

			<div>
				<h1 className='text-xl font-bold text-center text-white uppercase '>
					1% Share Card
				</h1>
			</div>
			<div className=''>
				<div className='text-xs text-gray-100 '>
					<div className='text-xs italic font-bold text-center text-white '>
						<CardNo cardNo={share.card_no} />
					</div>
					<div className='flex items-center justify-between my-2 italic font-bold text-center text-white '>
						<p> Price: &#8354; {share.price}</p>
						<p className='font-bold text-white '>
							Profit: 1% of the profits of each draw.
						</p>
					</div>
				</div>
				<div className='mt-3 text-xs '>
					<button
						className='w-full py-2 italic text-gray-100 border border-gray-800 rounded-md'
						onClick={() => handleBuyShareCard(share._id)}
						// disabled={isLoading}
					>
						Buy Now
					</button>
				</div>
			</div>
		</div>
	);
};

export default ShareCard;
