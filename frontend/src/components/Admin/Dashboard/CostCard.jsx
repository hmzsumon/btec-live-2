import React from 'react';

const CostCard = ({ title = 'Admin Info', cost }) => {
	return (
		<div className='p-2 border border-blue-700 rounded-md bg-slate-700'>
			<h3 className='text-xs italic text-orange-500 font-semibold text-center'>
				{title}
			</h3>
			<div className='my-2 space-y-2 '>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold'>
						Total Cost:&#8354; {cost?.total_cost}{' '}
						<sup className='text-orange-500'>{cost?.new_cost_count}</sup>
					</p>
					<p className='text-xs italic font-semibold'>
						Lottery Cost:&#8354; {cost?.lottery_cost}
					</p>
				</div>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold'>
						Today cost:&#8354; {cost?.today_cost}
						<sup className='text-orange-500'>{cost?.todaycostCount}</sup>
					</p>
					<p className='text-xs italic font-semibold'>
						Signup Cost:&#8354; {cost?.signup_bonus_cost}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CostCard;
