import React from 'react';
import CardNo from '../Share/CardNo';
import { formatDate } from '../../../utils/functions';
import Logo from '../../../assets/img/lotto-wi-logo.png';

const ShareCard = ({ share }) => {
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
					<div className='flex items-center justify-between my-2 italic text-center text-green-500 '>
						<p> Price: &#8354; {share.price}</p>
						<p className='text-green-500 '>
							Profit: 1% of the profits of each draw.
						</p>
					</div>
					<div className='flex items-center justify-between pb-4 italic text-[0.6rem]'>
						<p className='text-green-500 '>
							Buy Date: {formatDate(share.buy_date)}
						</p>
						<p className='text-orange-500 '>
							Expiry Date: {formatDate(share.expire_date)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShareCard;
