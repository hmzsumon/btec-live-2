import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import DashboardLayout from '../layouts/DashboardLayout';
import {
	useGetTopAgentAdminQuery,
	useGetTopHostAdminQuery,
} from '../../../features/admin/adminApi';

import TopCard from './TopCard';
import TopHost from './TopHost';

const AdminDashboard = ({ user }) => {
	const { data: topData, isLoading: top5Loading } = useGetTopAgentAdminQuery();
	const { topUsers } = topData || {};
	const { data: top10, isLoading: top10Loading } = useGetTopHostAdminQuery();
	const { top10Host } = top10 || {};

	return (
		<DashboardLayout>
			{top5Loading || top10Loading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='px-2 py-4 space-y-4'>
					<div>
						<h2 className='my-4 text-2xl font-semibold text-center '>
							Top 5 Agent
						</h2>
						<div className='grid grid-cols-1 gap-4 md:grid-cols-4 '>
							{top5Loading ? (
								<div className='flex items-center justify-center w-full h-screen'>
									<FadeLoader color={'#fbbf24'} />
								</div>
							) : (
								topUsers?.map((agent, i) => (
									<TopCard key={agent._id} agent={agent} index={i} />
								))
							)}
						</div>
					</div>

					<div>
						<h2 className='my-4 text-2xl font-semibold text-center '>
							Top 10 Hosts
						</h2>
						<div className='grid grid-cols-1 gap-4 md:grid-cols-4 '>
							{top10Loading ? (
								<div className='flex items-center justify-center w-full h-screen'>
									<FadeLoader color={'#fbbf24'} />
								</div>
							) : (
								top10Host?.map((host, i) => (
									<TopHost key={host._id} host={host} index={i} />
								))
							)}
						</div>
					</div>
				</div>
			)}
		</DashboardLayout>
	);
};

export default AdminDashboard;
