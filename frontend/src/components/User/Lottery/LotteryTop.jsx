import React from 'react';
import LotteryImg from '../../../assets/lottery/lottery.png';

const LotteryTop = () => {
	return (
		<div>
			<div className='grid items-center justify-center grid-cols-12'>
				<div className='flex items-center justify-center col-span-12 md:hidden md:col-span-5'>
					<img src={LotteryImg} alt='' className='w-96' />
				</div>
				<div className='col-span-12 space-y-4 md:col-span-7'>
					<h1 className='text-2xl font-medium text-center text-gray-100 md:text-3xl'>
						Take the chance to change your life
					</h1>
					<p className='mx-auto text-center text-md md:w-9/12 text-gry-700'>
						Lottowin24 is online lottery platform inspired by few Lottowin24
						lover's fantasy of the ultimate lottery platform.
					</p>
				</div>
				<div className='items-center justify-center hidden col-span-12  md:flex md:col-span-5'>
					<img src={LotteryImg} alt='' className='w-96' />
				</div>
			</div>
		</div>
	);
};

export default LotteryTop;
