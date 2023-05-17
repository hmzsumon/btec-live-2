import React from 'react';

const PrizeList = ({ draw }) => {
	return (
		<div className='relative overflow-x-auto shadow-md sm:rounded-lg '>
			<table className='w-full text-sm text-left text-gray-400 '>
				<thead className='ml-4 text-xs text-gray-400 uppercase bg-gray-700'>
					<tr>
						<th className='pl-4 '>Prize</th>
						<th>Amount</th>
						<th>Qty</th>
					</tr>
				</thead>
				<tbody>
					{draw?.prizes.map((prize) => (
						<tr
							key={prize._id}
							className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'
						>
							<td className='pl-4'>{prize.prize_title}</td>
							<td>&#8354; {Number(prize.prize_amount).toLocaleString()}</td>
							<td>{prize.qty}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default PrizeList;
