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

const RankList = () => {
	return (
		<div className='relative overflow-x-auto shadow-md sm:rounded-lg '>
			<h1 className='text-xl font-bold text-center text-gray-400  uppercase bg-slate-800'>
				Rank List
			</h1>
			<table className='w-full text-sm text-left text-gray-400 '>
				<thead className='ml-4 text-xs text-gray-400 uppercase bg-slate-800'>
					<tr>
						<th className='pl-4'>Rank</th>
						<th> Card Amount</th>
						<th>Award</th>
						<th>Award of CR</th>
					</tr>
				</thead>
				<tbody>
					{ranks.map((rank) => (
						<tr
							key={rank._id}
							className='bg-white border-b  dark:bg-gray-900 dark:border-gray-700'
						>
							<td className='pl-4 py-2'>
								<img src={rank.img} alt='' className='w-14' />
								<p>{rank.title}</p>
							</td>
							<td> {rank.cardsAmount}</td>
							<td>{rank.award}</td>
							<td>&#8354; {Number(rank.award_value).toLocaleString()}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default RankList;
