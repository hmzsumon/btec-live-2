import React from 'react';
import img from '../assets/lucky_draw.gif';

const Maintenance = () => {
	return (
		<div className='mt-20 text-center'>
			<h1 className='text-sm text-orange-500 md:text-2xl'>
				Now is Draw time,please wait!
			</h1>
			<div className='mt-10'>
				<img src={img} alt='maintenance' className='mx-auto md:w-2/5' />
			</div>
		</div>
	);
};

export default Maintenance;
