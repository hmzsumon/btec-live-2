import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/images/lw-logo.png';
import { BsFacebook, BsTelegram } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';

const Navbar = () => {
	const location = useLocation();
	const path = location.pathname;

	const [colorChange, setColorchange] = useState(false);
	const changeNavbarColor = () => {
		if (window.scrollY >= 75) {
			setColorchange(true);
		} else {
			setColorchange(false);
		}
	};
	window.addEventListener('scroll', changeNavbarColor);
	return (
		<>
			<nav
				className={`fixed  ${
					colorChange ? ' bg-slate-800' : 'bg-transparent'
				} inset-x-0 top-0 z-30 flex-col flex pb-4 shadow-lg  md:px-6`}
			>
				<div className='flex items-center justify-around my-3 italic text-gray-400 list-none '>
					<li className='relative text-[#1871E7] '>
						<a
							href='https://www.facebook.com/profile.php?id=100090147440537&mibextid=ZbWKwL'
							target='_blank'
							rel='noreferrer'
						>
							Facebook
						</a>
						<span className='absolute text-[#1871E7] ml-1 -mt-[0.1rem] text-xs '>
							<BsFacebook />
						</span>
					</li>
					<li className='text-[#249CD7] '>
						<a
							href='https://meet.google.com/xig-pvvf-kkj'
							target='_blank'
							rel='noreferrer'
						>
							Telegram
						</a>
						<span className='absolute text-[#249CD7] ml-1 -mt-[0.1rem] text-xs '>
							<BsTelegram />
						</span>
					</li>
					<li className='text-[#297733] '>
						<a
							href='https://chat.whatsapp.com/EZT4qbVmplrGhnSgfHbz7r'
							target='_blank'
							rel='noreferrer'
						>
							WhatsApp
						</a>
						<span className='absolute text-[#297733] ml-1 -mt-[0.1rem] text-xs '>
							<FaWhatsapp />
						</span>
					</li>
				</div>
				<hr className='h-px bg-gray-500 border-0' />

				<div className='flex flex-wrap items-center justify-between px-4 mt-2'>
					<div className='flex items-center justify-start space-x-2 md:space-x-6 '>
						<NavLink to='/' className='flex items-center'>
							<img src={logo} alt='logo' className='w-24' />
						</NavLink>
					</div>

					{path === '/login' ? (
						<div>
							<NavLink to='/register' className='flex items-center login-btn'>
								Register
							</NavLink>
						</div>
					) : (
						<div>
							<NavLink to='/login' className='flex items-center login-btn'>
								Login
							</NavLink>
						</div>
					)}
				</div>
			</nav>
		</>
	);
};

export default Navbar;
