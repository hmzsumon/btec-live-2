import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';

import { formatDate } from '../../../utils/functions';
import { DataGrid } from '@mui/x-data-grid';

// import Actions from './Actions';

import { useGetAgentAdminQuery } from '../../../features/admin/adminApi';
import { NavLink } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';

const Agents = () => {
	const { data, isLoading, isError, isSuccess, error } =
		useGetAgentAdminQuery();
	const {
		familyUser,
		totalSalary,
		totalHostSalary,
		totalReceiveCoins,
		successUsers,
	} = data || {};

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
			field: 'coins',
			headerName: 'Coins',
			width: 160,
			renderCell: (params) => {
				return (
					<div className='flex items-center justify-center'>
						{Number(params.row.coins).toLocaleString()}
					</div>
				);
			},
		},

		{
			field: 'base_pay',
			headerName: 'Base Pay',
			width: 160,
			renderCell: (params) => {
				return (
					<div className='flex items-center justify-center'>
						{Number(params.row.base_pay).toLocaleString('en-US', {
							style: 'currency',
							currency: 'bdt',
						})}
					</div>
				);
			},
		},

		{
			field: 'extra_pay',
			headerName: 'Extra Pay',
			width: 160,
			renderCell: (params) => {
				return (
					<div className='flex items-center justify-center'>
						{Number(params.row.extra_pay).toLocaleString('en-US', {
							style: 'currency',
							currency: 'bdt',
						})}
					</div>
				);
			},
		},
		{
			field: 'salary',
			headerName: 'Salary',
			width: 160,
			renderCell: (params) => {
				return (
					<div className='flex items-center justify-center'>
						{Number(params.row.salary).toLocaleString('en-US', {
							style: 'currency',
							currency: 'bdt',
						})}
					</div>
				);
			},
		},

		{
			field: 'host_salary',
			headerName: 'Host Salary',
			width: 160,
			renderCell: (params) => {
				return (
					<div className='flex items-center justify-center'>
						{Number(params.row.host_salary).toLocaleString('en-US', {
							style: 'currency',
							currency: 'bdt',
						})}
					</div>
				);
			},
		},

		{
			field: 'total_pay',
			headerName: 'Total Pay',

			width: 160,
			renderCell: (params) => {
				return (
					<div className='flex items-center justify-center'>
						{Number(params.row.total_pay).toLocaleString('en-US', {
							style: 'currency',
							currency: 'bdt',
						})}
					</div>
				);
			},
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
			return rows.push({
				id: user.id,
				name: user.name,
				user_id: user.user_id,
				coins: user.receive_coins,
				salary: user.salary,
				host_salary: user.host_salary,
				base_pay: user.base_pay,
				extra_pay: user.extra_bonus,
				total_pay: user.salary + user.host_salary,
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
					<h1 className='my-4 text-center text-bold'>
						All Agents Salary List{' '}
					</h1>
					<div>
						<div className='p-3 my-6 border'>
							<div className='space-y-3 text-xs '>
								<h2 className='text-sm italic text-center text-orange-300 '>
									{formatDate('5-2-23')} To {formatDate('5-16-23')} Salary
									Information:
								</h2>
								<div className='grid grid-cols-2 list-none '>
									<li className='grid grid-cols-2 '>
										<span>Total Agent</span>
										<span>:</span>
									</li>
									<li>{familyUser?.length} </li>
								</div>

								<div className='grid grid-cols-2 list-none '>
									<li className='grid grid-cols-2 '>
										<span>Total Success Agent</span>
										<span>:</span>
									</li>
									<li>{successUsers}</li>
								</div>

								<div className='grid grid-cols-2 list-none '>
									<li className='grid grid-cols-2 '>
										<span>Total Receive Coins</span>
										<span>:</span>
									</li>
									<li>{Number(totalReceiveCoins).toLocaleString('en-US')}</li>
								</div>

								<div className='grid grid-cols-2 list-none '>
									<li className='grid grid-cols-2 '>
										<span>Total Agent Salary</span>
										<span>:</span>
									</li>
									<li>
										{Number(totalSalary).toLocaleString('en-US', {
											style: 'currency',
											currency: 'bdt',
										})}
									</li>
								</div>

								<div className='grid grid-cols-2 list-none '>
									<li className='grid grid-cols-2 '>
										<span>Total Host Salary</span>
										<span>:</span>
									</li>
									<li>
										{Number(totalHostSalary).toLocaleString('en-US', {
											style: 'currency',
											currency: 'bdt',
										})}
									</li>
								</div>

								<div className='grid grid-cols-2 list-none '>
									<li className='grid grid-cols-2 '>
										<span>Total Pay</span>
										<span>:</span>
									</li>
									<li>
										{Number(totalHostSalary + totalSalary).toLocaleString(
											'en-US',
											{
												style: 'currency',
												currency: 'bdt',
											}
										)}
									</li>
								</div>
							</div>
						</div>
					</div>
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
