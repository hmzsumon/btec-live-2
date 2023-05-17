import React from 'react';
import R1 from '../../../assets/images/rank/r1.png';
import R2 from '../../../assets/images/rank/r2.png';
import R3 from '../../../assets/images/rank/r3.png';
import R4 from '../../../assets/images/rank/r4.png';
import R5 from '../../../assets/images/rank/r5.png';
import R6 from '../../../assets/images/rank/r6.png';
import R7 from '../../../assets/images/rank/r7.png';

const ranks = [
	{
		id: 1,
		title: 'Lotto-01',
		cardsAmount: ' 50 + 50 + 50',
		award: '1% of 150,000',
		award_value: 1500,
		img: R1,
	},
	{
		id: 2,
		title: 'Lotto-02',
		cardsAmount: 'L1 + L1 + L1',
		award: '1% of 450,000',
		award_value: 450000 * 0.01,
		img: R2,
	},
	{
		id: 3,
		title: 'Lotto-03',
		cardsAmount: 'L2 + L2 + L2',
		award: '1% of 1,350,000',
		award_value: 1350000 * 0.01,
		img: R3,
	},
	{
		id: 4,
		title: 'Lotto-04',
		cardsAmount: 'L3 + L3 + L3',
		award: '1% of 4,050,000',
		award_value: 4050000 * 0.01,
		img: R4,
	},
	{
		id: 5,
		title: 'Lotto-05',
		cardsAmount: 'L4 + L4 + L4',
		award: '1% of 12,150,000',
		award_value: 12150000 * 0.01,
		img: R5,
	},

	{
		id: 6,
		title: 'Lotto-06',
		cardsAmount: 'L5 + L5 + L5',
		award: '1% of 36,450,000',
		award_value: 36450000 * 0.01,
		img: R6,
	},
	{
		id: 7,
		title: 'Lotto-07',
		cardsAmount: 'L6 + L6 + L6',
		award: '1% of 109,350,000',
		award_value: 109350000 * 0.01,
		img: R7,
	},
];

const RankCard = () => {
	return (
		<div className='py-2 my-6'>
			<div>
				<h2 className='my-3 text-xl text-center '>Rank List</h2>
				<div className='space-y-4 '>
					{ranks.map((rank) => (
						<div className='flex items-center space-x-4 bg-white rounded-md '>
							<div>
								<img src={rank.img} alt='' className='w-24 ' />
								<h3 className='text-xl text-center text-gray-500'>
									{rank.title}
								</h3>
							</div>
							<div>
								<div className='text-xs text-left md:text-xl '>
									<p className='text-gray-500 '>
										Total Cards: {rank.cardsAmount}
									</p>
									<p className='text-gray-500 '>Total Award: {rank.award}</p>
									<p>
										<span className='text-gray-500 '>
											Total Award Value: {rank.award_value}/month
										</span>
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default RankCard;
