import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import DashboardLayout from '../layouts/DashboardLayout';

import LotteryCard from '../Dashboard/DrawCard';
import Menu from './Menu';
import { useGetActiveDrawForAdminQuery } from '../../../features/lottery/lotteryApi';
import PrizeCard from './PrizeCard';

const AdminLotteries = () => {
	const { data, isLoading } = useGetActiveDrawForAdminQuery();
	const { draw } = data || {};
	return (
		<DashboardLayout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='px-2 py-4 space-y-4'>
					<div>
						<Menu />
					</div>
					<div className='grid grid-cols-1 gap-4 md:grid-cols-2 '>
						<LotteryCard title='Lottery Info' draw={draw} />
						<PrizeCard title='Lottery Info' draw={draw} />
					</div>
				</div>
			)}
		</DashboardLayout>
	);
};

export default AdminLotteries;
