import { Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
// import { AiTwotoneGift } from 'react-icons/ai';
import React from 'react';
// import { NavLink } from 'react-router-dom';

// import { useGetLuckyBoxesQuery } from '../../../features/lottery/lotteryApi';

const Icons = () => {
	// const { data } = useGetLuckyBoxesQuery();
	// const { luckyBoxesCount } = data || 0;
	return (
		<div className=''>
			<div className='flex items-center justify-between h-full grid-cols-3 list-none '>
				<li>
					<Badge badgeContent={0} color='secondary'>
						<NotificationsIcon color='action' />
					</Badge>
				</li>
				{/* <NavLink to='/lucky-boxes'>
					<Badge
						badgeContent={luckyBoxesCount}
						color='secondary'
						sx={{
							cursor: 'pointer',
						}}
					>
						<AiTwotoneGift className='text-xl ' />
					</Badge>
				</NavLink> */}

				<li>
					<SearchIcon color='action' />
				</li>
			</div>
		</div>
	);
};

export default Icons;
