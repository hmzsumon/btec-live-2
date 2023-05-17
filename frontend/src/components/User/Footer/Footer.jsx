import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaTicketAlt, FaGift, FaWallet } from 'react-icons/fa';
import { BiMenu } from 'react-icons/bi';

const menuItems = [
	{
		id: 1,
		name: 'Home',
		path: '/user-dashboard',
		icon: <FaHome />,
	},
	{
		id: 2,
		name: 'Lottery',
		path: '/lottery',
		icon: <FaTicketAlt />,
	},
	{
		id: 3,
		name: 'Draws',
		path: '/draws',
		icon: <FaGift />,
	},
	{
		id: 4,
		name: 'Wallets',
		path: '/wallets',
		icon: <FaWallet />,
	},
	{
		id: 5,
		name: 'More',
		path: '/more',
		icon: <BiMenu />,
	},
];

const Footer = () => {
	return (
		<div className='fixed bottom-0 w-full py-2 bg-slate-800'>
			<div className='flex items-center justify-around '>
				{menuItems.map((item) => (
					<NavLink
						key={item.id}
						to={item.path}
						className={({ isActive }) =>
							isActive ? ' text-yellow-400' : 'text-gray-100'
						}
					>
						<div className='flex flex-col items-center justify-center gap-1'>
							<span className='text-xl '>{item.icon}</span>
							<span className='text-xs'>{item.name}</span>
						</div>
					</NavLink>
				))}
			</div>
		</div>
	);
};

export default Footer;

// className={(nav) =>
// 						`flex flex-col items-center justify-center w-1/5 gap-1 ${
// 							nav.isActive ? 'text-sky-500' : 'text-slate-400'
// 						}}`
