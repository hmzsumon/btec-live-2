import React from 'react';
import PersonImg from '../../../assets/person.png';

const UserInfo = () => {
	return (
		<div>
			<div className='grid w-full grid-cols-5 '>
				<div className='flex items-center justify-center col-span-2 rounded-full w-9 h-9 ring-1 '>
					<img src={PersonImg} alt='person' className='w-8' />
				</div>
				<div className='flex flex-col col-span-3 text-xs '>
					<span>John Doe</span>
					<span>01757454532</span>
				</div>
			</div>
		</div>
	);
};

export default UserInfo;
