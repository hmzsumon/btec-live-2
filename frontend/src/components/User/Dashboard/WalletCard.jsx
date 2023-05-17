import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const WalletCard = ({ user }) => {
	return (
		<div className='p-2 rounded-lg wallet-banner '>
			<div className='grid items-center justify-between grid-cols-3 my-2 '>
				<div className='col-span-1 '>
					<p className=' text-[0.6rem] font-bold italic'>Main Balance</p>
					<p className='flex gap-1 '>
						<span className='text-[0.8rem] font-bold'>&#8354;</span>
						<span className='text-[0.8rem] font-bold'>
							{user?.m_balance
								? Number(user?.m_balance).toFixed(2)
								: Number(0).toFixed(2)}
						</span>
					</p>
				</div>

				<div className='grid grid-cols-3 col-span-2 gap-4'>
					<NavLink to='/new-deposit'>
						<button className='w-full py-2 text-[0.4rem]  md:text-xs bg-orange-500 rounded-xl hover:bg-orange-600'>
							Deposit
						</button>
					</NavLink>

					<NavLink to='/send-money'>
						<button className='w-full px-3 py-2 text-[0.4rem]  md:text-xs bg-cyan-700 rounded-xl hover:bg-cyan-800'>
							Send Money
						</button>
					</NavLink>

					<NavLink to='/lottery'>
						<button className='w-full px-3 py-2 text-[0.4rem]  md:text-xs bg-green-500 rounded-xl hover:bg-green-600'>
							Buy Ticket
						</button>
					</NavLink>
				</div>
			</div>

			<hr className='h-[1px] my-4 hr-bg border-0 ' />

			<div className='grid items-center justify-between grid-cols-3 my-2 '>
				<div className='col-span-1 '>
					<p className=' text-[0.6rem] font-bold italic'>Bonus Balance</p>
					<p className='flex gap-1 '>
						<span className='text-[0.8rem] font-bold'>&#8354;</span>
						<span className='text-[0.8rem] font-bold'>
							{user?.b_balance
								? Number(user?.b_balance).toFixed(2)
								: Number(0).toFixed(2)}
						</span>
					</p>
				</div>
				<div className='grid grid-cols-2 col-span-2 gap-4'>
					<button className='py-2 text-xs bg-red-600 rounded-xl hover:bg-yellow-600'>
						<Link to='/referral'>Earn Bonus</Link>
					</button>
					<NavLink to='/convert' state={{ type: 'bonus' }}>
						<button className='w-full py-2 text-xs bg-blue-500 rounded-xl hover:bg-green-600'>
							Convert
						</button>
					</NavLink>
				</div>
			</div>

			<hr className='h-[1px] my-4 hr-bg border-0 ' />

			<div className='grid items-center justify-between grid-cols-3 my-2 '>
				<div className='col-span-1 '>
					<p className=' text-[0.6rem] font-bold italic'>Withdraw Balance</p>
					<p className='flex gap-1 '>
						<span className='text-[0.8rem] font-bold'>&#8354;</span>
						<span className='text-[0.8rem] font-bold'>
							{user?.w_balance
								? Number(user?.w_balance).toFixed(2)
								: Number(0).toFixed(2)}
						</span>
					</p>
				</div>
				<div className='grid grid-cols-2 col-span-2 gap-4 '>
					<NavLink to='/new-withdraw'>
						<button className='w-full py-2 text-xs bg-pink-600 rounded-xl hover:bg-pink-700'>
							Withdraw
						</button>
					</NavLink>
					<NavLink to='/convert' state={{ type: 'withdraw' }}>
						<button className='w-full py-2 text-xs bg-blue-500 rounded-xl hover:bg-green-600'>
							Convert
						</button>
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default WalletCard;
