import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';

import { formatDate } from '../../../utils/functions';
import { DataGrid } from '@mui/x-data-grid';

import Actions from './Actions';

import { useGetAgentAdminQuery } from '../../../features/admin/adminApi';
import { NavLink } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';

const Agents = () => {
	const { data, isLoading, isError, isSuccess, error } =
		useGetAgentAdminQuery();
	const { familyUser } = data || {};
	console.log(familyUser);
	// handle delete user
	const handleDelete = () => {
		console.log('delete');
	};

	// handle cancel withdraw
	const cancelWithdraw = () => {
		console.log('cancel');
	};

	const columns = [
		// {
		// 	field: 'join_date',
		// 	headerName: 'Join Date',
		// 	width: 150,
		// },
		{
			field: 'name',
			headerName: 'Name',
			width: 160,
		},

		{
			field: 'user_id',
			headerName: 'Family ID',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			width: 160,
		},

		{
			field: 'action',
			headerName: 'Action',
			width: 160,
			renderCell: (params) => {
				return (
					<div className='flex items-center justify-center'>
						<NavLink to={`/family/${params.row.id}`}>
							<FiEye />
						</NavLink>
					</div>
				);
			},
		},
	];

	const rows = [];

	familyUser &&
		familyUser.map((user) => {
			return rows.unshift({
				id: user.id,
				name: user.name,
				user_id: user.user_id,
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
					<div className='w-full shadow-lg rounded-xl' style={{ height: 470 }}>
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={100}
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

export default Agents;
