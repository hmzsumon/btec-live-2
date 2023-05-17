import React from 'react';

import Icons from './Icons';
import Logo from '../../../assets/images/lw-logo.png';

import SideNave from './SideNave';

const Header = () => {
	return (
		<div className='fixed top-0 z-50 w-full p-4 nav-bg '>
			<div className='grid grid-cols-3 '>
				<SideNave />
				{/* <UserInfo /> */}

				<div className='flex items-center justify-center'>BTEC Live</div>
				<Icons />
			</div>
		</div>
	);
};

export default Header;
