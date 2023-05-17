import React from 'react';

const UsersCard = ({ title = 'Admin Info', users }) => {
	console.log(users);
	return (
		<div className='p-2 border border-blue-700 rounded-md bg-slate-700'>
			<h3 className='text-xs italic font-semibold text-center'>{title}</h3>
			<div className='my-2 space-y-2 '>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold'>
						New Users: {users?.new_users}
					</p>
					<p className='text-xs italic font-semibold'>
						Total Users: {users?.total_users}
						<sup className='text-green-500'> {users?.logged_in_users}</sup>
					</p>
				</div>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold'>
						Email Verified: {users?.email_verified_users}
					</p>
					<p className='text-xs italic font-semibold'>
						Active Users: {users?.total_active_users}
					</p>
				</div>
			</div>
		</div>
	);
};

export default UsersCard;
