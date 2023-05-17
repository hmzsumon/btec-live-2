import React from 'react';
import {
	FaTicketAlt,
	FaCoins,
	FaHandHoldingUsd,
	FaHandshake,
} from 'react-icons/fa';
import { FcOnlineSupport } from 'react-icons/fc';
import { AiOutlineTeam, AiOutlineShareAlt } from 'react-icons/ai';
import { GrTransaction } from 'react-icons/gr';
import { IoTicketSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const menuItems = [
	{ id: 1, name: 'Referral', icon: <AiOutlineShareAlt />, link: '/referral' },
	{ id: 3, name: 'My Tickets', icon: <FaTicketAlt />, link: '/my-tickets' },
	{ id: 2, name: 'Deposits', icon: <FaCoins />, link: '/my-deposits' },
	{
		id: 4,
		name: 'Transactions',
		icon: <GrTransaction />,
		link: '/transactions',
	},
	{ id: 5, name: 'Live Chat', icon: <FcOnlineSupport />, link: '/support' },
	{
		id: 6,
		name: 'Withdraws',
		icon: <FaHandHoldingUsd />,
		link: '/my-withdraws',
	},
	{
		id: 7,
		name: 'My Team',
		icon: <AiOutlineTeam />,
		link: '/my-teams',
	},
	{ id: 8, name: 'Shares', icon: <FaHandshake />, link: '/shares' },
];

const Menu = () => {
	return (
		<div className='rounded-lg wallet-banner '>
			<div className='grid grid-cols-4 gap-6 p-2 '>
				{menuItems.map((item) => (
					<Link to={item.link} key={item.id}>
						<li className='flex flex-col items-center py-4 space-y-2 text-gray-100 rounded-md cursor-pointer hover:bg-slate-800'>
							<span className='text-xl text-white'>{item.icon}</span>
							<span className='text-[0.7rem] md:text-sm italic'>
								{item.name}
							</span>
						</li>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Menu;
