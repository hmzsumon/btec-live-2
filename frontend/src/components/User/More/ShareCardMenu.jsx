import React from 'react';
import { NavLink } from 'react-router-dom';

const ShareCardMenu = () => {
	return (
		<div className='grid grid-cols-1 '>
			<NavLink
				to='/my-card'
				className='py-1 text-center bg-green-500 rounded hover:text-gray-300 '
			>
				View Share Card
			</NavLink>
		</div>
	);
};

export default ShareCardMenu;
