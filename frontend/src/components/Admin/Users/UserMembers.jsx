import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';

import { formatDate } from '../../../utils/functions';
import { DataGrid } from '@mui/x-data-grid';

import { useGetMembersBySponsorQuery } from '../../../features/auth/authApi';
import { useLocation } from 'react-router-dom';

const UserMembers = () => {
	const location = useLocation();
	const id = location.state;
	const { data, isLoading } = useGetMembersBySponsorQuery(id);
	const { users } = data || [];
	console.log(users);
	const columns = [
		{
			field: 'join_date',
			headerName: 'Join Date',
			width: 150,
		},
		{
			field: 'name',
			headerName: 'Name',
			width: 160,
		},

		{
			field: 'phone',
			headerName: 'Phone',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			width: 160,
			renderCell: (params) => (
				<div className='flex items-center gap-2'>
					<p>{params.row.phone}</p>
				</div>
			),
		},
		{
			field: 'email',
			headerName: 'Email',
			width: 150,
			renderCell: (params) => (
				<div className='flex flex-col items-start text-[0.6rem] gap-1'>
					<p>{params.row.email}</p>
					<div>
						{params.row.emailVerified ? (
							<p className='text-green-500'>Verified</p>
						) : (
							<p className='text-red-500'>Not Verified</p>
						)}
					</div>
				</div>
			),
		},
		{
			field: 'status',
			headerName: 'Status',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='flex items-center'>
						{!params.row.status && <p className='text-red-500'>Inactive</p>}
						{params.row.status && (
							<p className='text-green-500'>
								<span>Active</span>
							</p>
						)}
					</div>
				);
			},
		},
		{
			field: 'cards_qty',
			headerName: 'Cards Qty',
			width: 150,
		},
	];

	const rows = [];

	users &&
		users.map((user) => {
			return rows.unshift({
				id: user._id,
				name: user.name,
				phone: user.phone,
				email: user.email,
				emailVerified: user.email_verified,
				join_date: formatDate(user.join_date),
				balance: user.balance,
				role: user.role,
				status: user.is_active,
				cards_qty: user.share_card_qty,
			});
		});
	return (
		<DashboardLayout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='p-4'>
					<div>
						<h1 className='text-2xl font-semibold'>
							Members: {users && users.length}
						</h1>
					</div>
					<div className='w-full shadow-lg rounded-xl' style={{ height: 470 }}>
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={20}
							rowsPerPageOptions={[20]}
							checkboxSelection={false}
							onSelectionModelChange={(id) => {}}
						/>
					</div>
				</div>
			)}
		</DashboardLayout>
	);
};

export default UserMembers;
