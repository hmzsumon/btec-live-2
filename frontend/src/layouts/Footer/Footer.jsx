/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/lw-logo.png';

const Footer = () => {
	return (
		<footer className='py-3 space-y-10 text-gray-500 '>
			<div className='flex flex-col items-center space-y-2 '>
				<NavLink to='/' className='flex items-center mx-auto '>
					<img src={logo} alt='logo' className=' w-28' />
				</NavLink>
				<div className='md:w-2/5 '>
					<p className='text-sm italic text-center '>
						Lottery Players Can Play Virginia Lottery Games Online From Anywhere
						In Virginia On A Phone, Tablet Or Computer
					</p>
				</div>
			</div>

			<div className='flex items-center justify-center pt-4 border-t border-slate-700 '>
				<p className='text-sm italic text-center '>
					Copyright © 2022-2023 All Rights Reserved By Lottowin24
				</p>
			</div>
		</footer>
	);
};

export default Footer;
