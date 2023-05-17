import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';
import { useLogoutMutation } from '../../../features/auth/authApi';

import { FcSettings } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import PersonImg from '../../../assets/person.png';

export default function SideNave() {
	const navigate = useNavigate();

	const items = [
		// {
		// 	id: 3,
		// 	name: 'Profile',
		// 	icon: <ImProfile />,
		// 	link: () => navigate('/profile'),
		// },

		{
			id: 13,
			name: 'Settings',
			icon: <FcSettings />,
			link: () => navigate('/settings'),
		},
	];

	const [logout, { isSuccess }] = useLogoutMutation();
	const { user } = useSelector((state) => state.auth);
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor) => (
		<Box
			sx={{
				width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 180,
			}}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<div className='px-6 py-5'>
				<h1 className='text-sm font-semibold text-gray-100'>{user?.name}</h1>
				<h1 className='text-xs font-semibold text-gray-100'>{user?.email}</h1>
				<h1 className='text-xs font-semibold text-green-500'>
					{user?.is_identity_verified && 'Verified'}
				</h1>
				<h1 className='text-xs font-semibold text-red-500'>
					{!user?.is_identity_verified && 'Not Verified'}
				</h1>
			</div>
			<Divider />
			<List>
				{items.map((item, index) => (
					<ListItem key={item.id} disablePadding onClick={item.link}>
						<ListItemButton>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />

			<div className='px-6 py-5'>
				<Button variant='contained' color='secondary' onClick={() => logout()}>
					Logout
				</Button>
			</div>
		</Box>
	);

	React.useEffect(() => {
		if (isSuccess) {
			window.location.href = '/';
		}
	}, [isSuccess]);

	return (
		<div>
			{['left'].map((anchor) => (
				<React.Fragment key={anchor}>
					<button className='-ml-2' onClick={toggleDrawer(anchor, true)}>
						<div>
							<div className='flex items-center w-full gap-2 '>
								<div className='flex items-center justify-center col-span-1 rounded-full w-9 h-9 ring-1 '>
									<img src={PersonImg} alt='person' className='w-8' />
								</div>
								<div className='flex flex-col items-start text-[0.6rem] '>
									<span>{user?.name}</span>
									<span>{user?.phone}</span>
									{user?.is_active && (
										<span className='text-[0.5rem] text-green-500'>Active</span>
									)}
									{!user?.is_active && (
										<span className='text-[0.5rem] text-red-500'>Inactive</span>
									)}
								</div>
							</div>
						</div>
					</button>
					<Drawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
					>
						{list(anchor)}
					</Drawer>
				</React.Fragment>
			))}
		</div>
	);
}
