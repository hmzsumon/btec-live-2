import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';

import { formatDate } from '../../../utils/functions';
import { DataGrid } from '@mui/x-data-grid';

import Actions from './Actions';

import { useGetSalaryAdminQuery } from '../../../features/admin/adminApi';

const Users = () => {
	const { data, isLoading, isError, isSuccess, error } =
		useGetSalaryAdminQuery();
	const { users, totalUsers } = data || [];

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
			renderCell: (params) => {
				return (
					<div className='flex items-center'>
						{decodeURIComponent(params.row.name)}
					</div>
				);
			},
		},

		{
			field: 'id',
			headerName: 'Bteclive ID',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			width: 160,
		},
		{
			field: 'coin',
			headerName: 'Received Coin',
			width: 150,
		},
		{
			field: 'base_pay',
			headerName: 'Base Pay',
			width: 150,
		},
		{
			field: 'day_bonus',
			headerName: 'Day Bonus',
			width: 150,
		},
		{
			field: 'extra_bonus',
			headerName: 'Extra Bonus',
			width: 150,
		},
		{
			field: 'grosSalary',
			headerName: 'Host Salary',
			width: 150,
		},
		{
			field: 'merchant_pay',
			headerName: 'Merchant Pay',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='text-[0.6rem]'>
						<p className='text-green-500'>
							<span className='text-green-500'>Base: </span>
							{params.row.merchant_pay}
						</p>

						<p className='text-blue-500'>
							<span className='text-blue-500'>Extra: </span>
							{params.row.merchant_extra}
						</p>
						<p className='text-orange-500'>
							<span className='text-orange-500'>Total: </span>
							{params.row.merchant_total}
						</p>
					</div>
				);
			},
		},

		// {
		// 	field: 'balance',
		// 	headerName: 'Balance',
		// 	width: 150,
		// 	renderCell: (params) => {
		// 		console.log(params.row.balance);
		// 		return (
		// 			<div className='text-[0.5rem]'>
		// 				<p className='text-orange-500'>
		// 					M: {params.row.balance.m} &#8354;
		// 				</p>
		// 				<p className='text-green-500'>
		// 					W: {params.row.balance.b} &#8354;
		// 				</p>
		// 				<p className='text-blue-500'>B: {params.row.balance.w} &#8354;</p>
		// 			</div>
		// 		);
		// 	},
		// },

		// {
		// 	field: 'action',
		// 	headerName: 'Action',
		// 	width: 160,
		// 	renderCell: (params) => {
		// 		return (
		// 			<Actions
		// 				editRoute={'user'}
		// 				deleteHandler={handleDelete}
		// 				cancelWithdraw={cancelWithdraw}
		// 				status={params.row.status}
		// 				id={params.row.id}
		// 				method={params.row.method}
		// 			/>
		// 		);
		// 	},
		// },
	];

	const rows = [];

	users &&
		users.map((user) => {
			return rows.unshift({
				id: user.id,
				name: user.nickname,
				coin: user.coin,
				salary_amount: user.salary_amount,
				base_pay: user.base_pay,
				merchant_pay: user.merchant_pay,
				grosSalary: user.grosSalary,
				day_bonus: user.day_bonus,
				extra: user.extra,
				extra_bonus: user.extra_bonus,
				merchant_extra: user.merchant_extra,
				merchant_total: user.merchant_total,
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

export default Users;
