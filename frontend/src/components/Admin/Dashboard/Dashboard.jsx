import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import DashboardLayout from '../layouts/DashboardLayout';
import {
	useGetCompanyAdminQuery,
	useGetTopAgentAdminQuery,
} from '../../../features/admin/adminApi';

import LotteryCard from './DrawCard';
import WithdrawCard from './WithdrawCard';
import VerificationCard from './VerificationCard';
import LoanCard from './LoanCard';
import DepositCard from './DepositCard';
import UsersCard from './UsersCard';
import CostCard from './CostCard';
import TopCard from './TopCard';

const AdminDashboard = ({ user }) => {
	const { data, isLoading } = useGetCompanyAdminQuery();
	const { company } = data || {};

	const { data: topData, isLoading: top5Loading } = useGetTopAgentAdminQuery();

	const { topUsers } = topData || {};
	console.log(topUsers);
	return (
		<DashboardLayout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='px-2 py-4 space-y-4'>
					<h2>Admin Dashboard</h2>
					<div className='grid grid-cols-1 gap-4 md:grid-cols-4 '>
						<UsersCard title='Users Info' users={company?.users} />
						<CostCard title='Cost Info' cost={company?.cost} />
						<DepositCard title='Deposit Info' deposit={company?.deposit} />
						{/* <LotteryCard title='Lottery Info' lottery={company?.lottery} /> */}
						<WithdrawCard title='Withdraw Info' withdraw={company?.withdraw} />
						<VerificationCard title='Verification' verify={company?.verify} />
					</div>
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
				</div>
			)}
		</DashboardLayout>
	);
};

export default AdminDashboard;
